import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzXKFdCbC-0RtrBwFyOE8dpj08op8hd1nsz5I2ZJ85pwYPV46f95K_hY1-wny1FB-q1QQ/exec",
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
