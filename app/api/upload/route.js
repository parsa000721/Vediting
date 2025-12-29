
import { NextResponse } from 'next/server'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import fs from 'fs'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath)

export async function POST(req) {
  const data = await req.formData()
  const file = data.get('video')

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const inputPath = `/tmp/input.mp4`
  const outputPath = `/tmp/output.mp4`
  fs.writeFileSync(inputPath, buffer)

  return new Promise((resolve) => {
    ffmpeg(inputPath)
      .setStartTime(0)
      .setDuration(5)
      .output(outputPath)
      .on('end', () => {
        resolve(NextResponse.json({ success: true }))
      })
      .on('error', (err) => {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }))
      })
      .run()
  })
}
