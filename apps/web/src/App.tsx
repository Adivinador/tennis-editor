import { useState } from 'react'
import VideoUpload from './features/tennis-editor/components/VideoUpload'
import VideoTimeline from './features/tennis-editor/components/VideoTimeline'
import SuggestionsPanel from './features/tennis-editor/components/SuggestionsPanel'

interface VideoData {
  id: string
  url: string
  duration: number
  fps: number
  detections?: any
}

function App() {
  const [video, setVideo] = useState<VideoData | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [detections, setDetections] = useState<any>(null)

  const handleVideoUpload = async (file: File) => {
    // Upload video to storage and get URL
    const videoData: VideoData = {
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      duration: 0,
      fps: 30,
    }
    setVideo(videoData)
  }

  const handleAnalyze = async () => {
    if (!video) return
    setAnalyzing(true)
    try {
      const response = await fetch('/api/tennis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: video.url })
      })
      const data = await response.json()
      setDetections(data)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ðŸŽ¾ Tennis Editor</h1>
          <p className="text-slate-400">AI-powered video editing for tennis matches</p>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Upload & Timeline */}
          <div className="col-span-2 space-y-6">
            {!video ? (
              <VideoUpload onUpload={handleVideoUpload} />
            ) : (
              <>
                <div className="bg-slate-800 rounded-lg p-4">
                  <video src={video.url} controls className="w-full rounded" />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-2 rounded-lg font-medium transition"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Video (AI Detection)'}
                </button>
                {detections && <VideoTimeline detections={detections} />}
              </>
            )}
          </div>

          {/* Right: Suggestions & Controls */}
          <div className="col-span-1">
            {detections && <SuggestionsPanel detections={detections} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
