"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface LiquidImageProps {
  src: string
  alt: string
  className?: string
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;        // pointer in uv space
  uniform float uHover;       // 0..1 eased hover state
  uniform float uTime;
  uniform vec2 uPlaneAspect;  // cover-fit correction

  void main() {
    // cover-fit uv
    vec2 uv = (vUv - 0.5) * uPlaneAspect + 0.5;

    // distance from pointer, aspect-corrected so ripples stay circular
    vec2 d = (uv - uMouse) * uPlaneAspect;
    float dist = length(d);

    // concentric ripple radiating from the cursor, fading with distance
    float ripple = sin(dist * 22.0 - uTime * 4.0) * exp(-dist * 6.0);
    float amt = ripple * 0.028 * uHover;
    vec2 dir = normalize(d + 1e-4);
    vec2 disp = dir * amt;

    // subtle chromatic split driven by the same displacement
    float ca = 0.006 * uHover + amt * 0.6;
    float r = texture2D(uTexture, uv + disp + dir * ca).r;
    float g = texture2D(uTexture, uv + disp).g;
    float b = texture2D(uTexture, uv + disp - dir * ca).b;

    vec3 col = vec3(r, g, b);
    gl_FragColor = vec4(col, 1.0);
  }
`

/**
 * Renders an image on a WebGL plane and applies a fluid displacement ripple
 * that follows the cursor on hover (with a light chromatic split). Falls back
 * to a plain <img> when WebGL is unavailable or reduced motion is requested.
 */
export function LiquidImage({ src, alt, className }: LiquidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return // WebGL unavailable — keep the <img> fallback
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)
    camera.position.z = 1

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uPlaneAspect: { value: new THREE.Vector2(1, 1) },
    }

    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let imgAspect = 1
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin("anonymous")
    loader.load(src, (tex) => {
      tex.minFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      uniforms.uTexture.value = tex
      imgAspect = tex.image.width / tex.image.height
      resize()
      setReady(true)
    })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      // cover-fit: shrink the larger axis in uv space
      const boxAspect = w / h
      if (boxAspect > imgAspect) {
        uniforms.uPlaneAspect.value.set(1, imgAspect / boxAspect)
      } else {
        uniforms.uPlaneAspect.value.set(boxAspect / imgAspect, 1)
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const targetMouse = new THREE.Vector2(0.5, 0.5)
    let targetHover = 0

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouse.set((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height)
    }
    const onEnter = () => (targetHover = 1)
    const onLeave = () => (targetHover = 0)

    container.addEventListener("pointermove", onMove)
    container.addEventListener("pointerenter", onEnter)
    container.addEventListener("pointerleave", onLeave)

    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      uniforms.uHover.value += (targetHover - uniforms.uHover.value) * 0.08
      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.1
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.1
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerenter", onEnter)
      container.removeEventListener("pointerleave", onLeave)
      geometry.dispose()
      material.dispose()
      uniforms.uTexture.value?.dispose()
      renderer.dispose()
    }
  }, [src])

  return (
    <div ref={containerRef} className={className} data-cursor="hover">
      {/* SSR / fallback / LCP image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
