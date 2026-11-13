import { Router } from 'express'

interface FrameLike {
  timestamp: number
  ball?: { confidence: number }
  players?: { confidence: number }[]
}

interface DeadZone {
  start: number
  end: number
  duration: number
}

const router = Router()

router.post('/', (req, res) => {
  const frames: FrameLike[] = Array.isArray(req.body?.frames) ? req.body.frames : []
  const deadTimeZones: DeadZone[] = []
  let zoneStart: number | null = null

  for (const frame of frames) {
    const hasMovement =
      (frame.ball?.confidence ?? 0) > 0.5 ||
      (frame.players ?? []).some((p) => p.confidence > 0.7)

    if (!hasMovement && zoneStart === null) {
      zoneStart = frame.timestamp
    } else if (hasMovement && zoneStart !== null) {
      deadTimeZones.push({ start: zoneStart, end: frame.timestamp, duration: frame.timestamp - zoneStart })
      zoneStart = null
    }
  }

  res.json({
    deadTimeZones,
    totalDeadTime: deadTimeZones.reduce((sum, z) => sum + z.duration, 0),
  })
})

export default router