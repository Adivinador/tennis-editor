import { useState } from 'react'
import { Sparkles, Loader } from 'lucide-react'

interface SuggestionsPanelProps {
  detections: any
}

interface Suggestion {
  type: 'cut' | 'keep' | 'slowmo'
  timeStart: number
  timeEnd: number
  reason: string
  confidence: number
}

export default function SuggestionsPanel({ detections }: SuggestionsPanelProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)

  const handleGetSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tennis/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ detections })
      })
      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Failed to get suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 space-y-4 h-fit">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">AI Suggestions</h3>
      </div>

      <button
        onClick={handleGetSuggestions}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Get AI Suggestions
          </>
        )}
      </button>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {suggestions.length === 0 ? (
          <p className="text-slate-400 text-sm">No suggestions yet. Click the button above.</p>
        ) : (
          suggestions.map((s, idx) => (
            <div key={idx} className="bg-slate-700 p-3 rounded text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  s.type === 'cut' ? 'bg-red-900 text-red-200' :
                  s.type === 'keep' ? 'bg-green-900 text-green-200' :
                  'bg-yellow-900 text-yellow-200'
                }`}>
                  {s.type.toUpperCase()}
                </span>
                <span className="text-slate-400">{s.timeStart}s - {s.timeEnd}s</span>
              </div>
              <p className="text-slate-300">{s.reason}</p>
              <p className="text-slate-500 text-xs mt-1">
                Confidence: {Math.round(s.confidence * 100)}%
              </p>
            </div>
          ))
        )}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
        Apply Suggestions
      </button>

      <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition">
        Export Video
      </button>
    </div>
  )
}
