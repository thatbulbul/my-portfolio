import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch(
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.text()

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
