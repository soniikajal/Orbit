// src/app/api/osrm/route.ts
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rest = searchParams.toString()

  const osrmUrl = `https://nsut-osrm.onrender.com/route/v1/foot?${rest}`

  const response = await fetch(osrmUrl)
  const data = await response.text()

  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
