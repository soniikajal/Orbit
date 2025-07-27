import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile, readFile, access, constants } from 'fs/promises'
import { existsSync } from 'fs'

const FILE_PATH = join(process.cwd(), 'public', 'subscribers.csv')

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
  }

  try {
    let existingEmails: string[] = []

    if (existsSync(FILE_PATH)) {
      const content = await readFile(FILE_PATH, 'utf8')
      existingEmails = content.split('\n').filter(Boolean)
    }

    if (existingEmails.includes(email)) {
      return NextResponse.json({ success: false, message: 'Email already subscribed' }, { status: 409 })
    }

    const entry = `${email}\n`
    await writeFile(FILE_PATH, (existsSync(FILE_PATH) ? entry : 'email\n' + entry), { flag: 'a' })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (err) {
    console.error('Error writing to CSV:', err)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
