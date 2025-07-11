"use client"

import { Card } from "@/components/ui/card"
import { SiFlutter, SiDart, SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython, SiHtml5, SiCss3, SiFigma, SiJavascript } from "react-icons/si"

export function Languages() {
  return (
    <section className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Languages & Tools</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4"></div>
        </div>
        <div className="flex justify-center">
          <Card className="glass-card-premium rounded-3xl p-10 hover:scale-105 transition-all duration-500 shadow-2xl cursor-crosshair w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {/* Flutter */}
              <div className="flex flex-col items-center">
                <SiFlutter className="text-blue-400" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">Flutter</span>
              </div>
              {/* Dart */}
              <div className="flex flex-col items-center">
                <SiDart className="text-cyan-400" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">Dart</span>
              </div>
              {/* MERN Stack */}
              <div className="flex flex-col items-center">
                <div className="flex space-x-2">
                  <SiMongodb className="text-green-500" size={32} />
                  <SiExpress className="text-gray-300" size={32} />
                  <SiReact className="text-cyan-400" size={32} />
                  <SiNodedotjs className="text-green-600" size={32} />
                </div>
                <span className="mt-3 text-white font-bold text-lg tracking-wide">MERN Stack</span>
              </div>
              {/* Python */}
              <div className="flex flex-col items-center">
                <SiPython className="text-yellow-400" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">Python</span>
              </div>
              {/* HTML */}
              <div className="flex flex-col items-center">
                <SiHtml5 className="text-orange-500" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">HTML</span>
              </div>
              {/* CSS */}
              <div className="flex flex-col items-center">
                <SiCss3 className="text-blue-500" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">CSS</span>
              </div>
              {/* JavaScript */}
              <div className="flex flex-col items-center">
                <SiJavascript className="text-yellow-400" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">JavaScript</span>
              </div>
              {/* Figma */}
              <div className="flex flex-col items-center">
                <SiFigma className="text-pink-400" size={64} />
                <span className="mt-3 text-white font-bold text-lg tracking-wide">Figma</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
