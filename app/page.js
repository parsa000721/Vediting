
'use client'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const upload = async () => {
    const form = new FormData()
    form.append('video', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })
    alert('Uploaded')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Video Editing Web App</h1>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Upload Video
      </button>
      <div className="mt-4">Export Progress: {progress}%</div>
    </main>
  )
}
