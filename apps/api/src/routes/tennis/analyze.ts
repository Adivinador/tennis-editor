import { Router } from 'express'

const router = Router()

// MOCK: sin Roboflow real. Devuelve datos aleatorios con la forma final del contrato.
router.post('/', (req, res) => {
  const videoUrl = typeof req.body?.videoUrl === 'string' ? req.body.videoUrl : null
  const frames = Array.from({ length: 300 }, (_, i) => ({
    timestamp: i * 0.033,
    frameNumber: i,
    players: [
      {
        x: Math.random() * 640,
        y: Math.random() * 480,
        w: 100,
        h: 200,
        confidence: Math.random() * 0.9 + 0.4,
        playerId: 1,
      },
    ],
    ball: {
      x: Math.random() * 640,
      y: Math.random() * 480,
      confidence: Math.random() * 0.95 + 0.3,
    },
  }))

  res.json({
    jobId: `mock_${Date.now().toString(36)}`,
    status: 'completed',
    mock: true,
    frames,
    duration: 10,
    videoUrl,
  })
})

export default router