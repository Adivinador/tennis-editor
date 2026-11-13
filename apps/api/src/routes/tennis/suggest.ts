import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()
const client = new Anthropic()

interface Suggestion {
  type: 'cut' | 'keep' | 'slowmo'
  timeStart: number
  timeEnd: number
  reason: string
  confidence: number
}

router.post('/', async (req, res) => {
  const frames: { players?: { confidence: number }[]; ball?: { confidence: number } }[] =
    Array.isArray(req.body?.detections?.frames) ? req.body.detections.frames : []
  const duration = Number(req.body?.detections?.duration) || 0

  const avg = (values: number[]) =>
    values.length ? values.reduce((s, v) => s + v, 0) / values.length : 0
  const playerAvg = avg(frames.map((f) => f.players?.[0]?.confidence ?? 0))
  const ballAvg = avg(frames.map((f) => f.ball?.confidence ?? 0))

  try {
    const message = await client.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Video de tenis analizado:
- Frames: ${frames.length}
- Duracion: ${duration}s
- Confianza media jugador: ${playerAvg.toFixed(2)}
- Confianza media pelota: ${ballAvg.toFixed(2)}

Sugiere entre 5 y 10 cortes de edicion. Responde SOLO con un array JSON:
[{"type": "cut" | "keep" | "slowmo", "timeStart": segundos, "timeEnd": segundos, "reason": "explicacion breve", "confidence": 0.0-1.0}]
Prioriza: quitar tiempos muertos, conservar peloteos y puntos decisivos, marcar camara lenta en momentos clave.`,
        },
      ],
    })

    const block = message.content[0]
    const text = block?.type === 'text' ? block.text : ''
    const match = text.match(/\[[\s\S]*\]/)
    const suggestions: Suggestion[] = match ? JSON.parse(match[0]) : []
    res.json({ suggestions })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    res.status(500).json({ error: message })
  }
})

export default router