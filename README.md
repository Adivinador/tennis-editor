# OpenCut Tennis Editor

**AI-powered tennis video editor for automated match highlights and dead-time removal**

Built with OpenCut's architecture, Roboflow Supervision for player/ball tracking, and Claude AI for intelligent editing suggestions.

## Features

✨ **AI-Powered Detection**
- Automatic player tracking
- Ball detection with confidence scoring
- Court line recognition

🎬 **Smart Editing**
- Auto-detect and remove dead time
- Claude AI-powered cut suggestions
- Interactive timeline with overlays

📤 **One-Click Deployment**
- Deploy to GitHub with one command
- Automatic Vercel deployment
- Shareable video links

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Roboflow API key
- Claude API key
- Cloudflare R2 credentials (optional)

### Development

```bash
# Clone and install
git clone https://github.com/[user]/OpenCut-TennisEditor
cd OpenCut-TennisEditor
npm install

# Start development servers
npm run dev
# Frontend: http://localhost:5173
# API: http://localhost:3000
```

### Environment Setup

Create `.env.local` in each app:

**apps/web/.env.local:**
```
VITE_API_URL=http://localhost:3000
```

**apps/api/.env.local:**
```
ROBOFLOW_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
CLOUDFLARE_ACCOUNT_ID=your_id
CLOUDFLARE_ACCESS_KEY=your_key
CLOUDFLARE_SECRET_KEY=your_secret
```

## Project Structure

```
├── apps/
│   ├── web/              # React frontend
│   │   └── src/
│   │       ├── features/tennis-editor/
│   │       ├── routes/
│   │       └── components/
│   └── api/              # Node.js backend
│       └── src/
│           ├── routes/tennis/
│           ├── services/
│           └── config/
└── docs/                 # Documentation
```

## Deployment

### To Vercel

```bash
npm run deploy:vercel
```

### To GitHub

```bash
npm run deploy:github
```

## API Endpoints

### POST `/api/tennis/analyze`
Upload and analyze tennis video for player/ball detection.

**Request:**
```json
{
  "videoUrl": "s3://bucket/video.mp4",
  "confidenceThreshold": 0.7
}
```

**Response:**
```json
{
  "jobId": "job_123",
  "status": "processing",
  "frames": [
    {
      "timestamp": 0,
      "players": [{x, y, w, h, confidence}],
      "ball": {x, y, confidence}
    }
  ]
}
```

### POST `/api/tennis/deadtime`
Detect dead-time zones in tracking data.

### POST `/api/tennis/suggest`
Get Claude AI editing suggestions.

## Tech Stack

- **Frontend:** React 19, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Node.js, Express, Hono
- **AI:** Roboflow Supervision, Claude API (Opus 5.5)
- **Video:** FFmpeg, OpenCut's media layer
- **Deployment:** Vercel, Cloudflare Workers
- **Storage:** Cloudflare R2

## Contributing

We welcome contributions! Please open an issue or PR.

## License

MIT - See LICENSE file

## Support

- 💬 [Discord](https://discord.gg/zmR9N35cjK) (OpenCut)
- 📧 Email: support@opencut.app
- 🐛 Issues: GitHub Issues

---

**Built with ❤️ on OpenCut**
