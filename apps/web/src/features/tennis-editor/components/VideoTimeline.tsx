import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface VideoTimelineProps {
  detections: any
}

export default function VideoTimeline({ detections }: VideoTimelineProps) {
  const [selectedFrame, setSelectedFrame] = useState(0)

  const timelineData = detections.frames
    ?.slice(0, 300)
    .map((frame: any, idx: number) => ({
      time: idx,
      playerConfidence: frame.players?.[0]?.confidence || 0,
      ballConfidence: frame.ball?.confidence || 0,
    })) || []

  return (
    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold">Detection Timeline</h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
          />
          <Bar dataKey="playerConfidence" fill="#3b82f6" name="Player" />
          <Bar dataKey="ballConfidence" fill="#ef4444" name="Ball" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-slate-700 p-2 rounded">
          <p className="text-slate-400">Total Frames</p>
          <p className="text-xl font-semibold">{detections.frames?.length || 0}</p>
        </div>
        <div className="bg-slate-700 p-2 rounded">
          <p className="text-slate-400">Duration</p>
          <p className="text-xl font-semibold">{Math.round(detections.duration || 0)}s</p>
        </div>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
        Detect Dead Time
      </button>
    </div>
  )
}
