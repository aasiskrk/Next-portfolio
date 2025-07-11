import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const response = await axios.get(
      'https://api.github.com/users/aasiskrk/repos?sort=created',
      githubToken
        ? { headers: { Authorization: `token ${githubToken}` } }
        : undefined
    );
    if (Array.isArray(response.data)) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ error: 'Unexpected response from GitHub', data: response.data }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message, data: error.response?.data }, { status: 500 });
  }
} 