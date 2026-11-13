import { useState } from 'react'
import { Upload } from 'lucide-react'

interface VideoUploadProps {
  onUpload: (file: File) => void
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      onUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${
        isDragging
          ? 'border-blue-400 bg-blue-900/20'
          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
      }`}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
      <h3 className="text-lg font-semibold mb-2">Upload Tennis Video</h3>
      <p className="text-slate-400 mb-4">Drag & drop your video or click to select</p>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
        id="video-input"
      />
      <label htmlFor="video-input" className="inline-block">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
          Browse Files
        </button>
      </label>
    </div>
  )
}
