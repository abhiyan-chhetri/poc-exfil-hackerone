# PixelToe - Retro Arcade Tic Tac Toe

[cloudflarebutton]

PixelToe is a visually stunning, nostalgia-inducing Tic-Tac-Toe web application that immerses users in a 90s arcade aesthetic. The application transforms the classic pencil-and-paper game into a vibrant, neon-soaked digital experience complete with CRT monitor effects, scanlines, and pixel-art typography.

## Features

- **Game Modes**: Player vs Player (Local) and Player vs CPU (with smart random logic)
- **Visual Engine**: Custom 'Retro-CRT' visual layer with scanlines, screen curvature effects, and chromatic aberration (glitch effects)
- **Interactive Board**: Responsive 3x3 grid with glowing cells; 'X' (Neon Pink) and 'O' (Cyan) markers
- **Score Tracking**: Persistent session-based scores in an arcade-style leaderboard header
- **Game States**: Visual feedback for turns, victory, defeat, and draws with confetti explosions and glitch animations
- **Responsive Design**: Optimized for all devices with smooth mobile interactions
- **Retro Aesthetic**: Deep purple/black backgrounds, neon glows, pixelated fonts, and vignette effects

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **UI Library**: shadcn/ui, Tailwind CSS v3, Headless UI, Radix UI primitives
- **Animations & Effects**: Framer Motion, canvas-confetti, lucide-react icons
- **State Management**: Zustand, React Query
- **Deployment**: Cloudflare Workers & Pages
- **Utilities**: clsx, tailwind-merge, Zod, Sonner (toasts), React Hook Form
- **Development**: ESLint, Bun, Wrangler

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (v1.0+)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (optional for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pixel-toe-arcade
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- **Play PvP**: Select cells alternately with another player
- **Play vs CPU**: Choose CPU mode; AI makes random valid moves
- **Controls**: Click/tap cells to place marks; use "Reset Game" or "Switch Mode" buttons
- **Scoring**: Wins increment player scores; persists across sessions via localStorage
- **Visual Feedback**: Glitch effects on win/loss, confetti on victory

The app is fully playable out-of-the-box with no backend required.

## Development

### Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (http://localhost:3000) |
| `bun build` | Build for production |
| `bun lint` | Run ESLint |
| `bun preview` | Preview production build |
| `wrangler dev` | Run with Cloudflare Workers emulation |
| `wrangler deploy` | Deploy to Cloudflare |

### Project Structure

```
src/
├── components/     # UI components (shadcn/ui + custom)
├── hooks/          # Custom React hooks
├── lib/            # Utilities & error reporting
├── pages/          # Route pages (HomePage.tsx is main app)
└── main.tsx        # App entry (React Router)
worker/             # Cloudflare Workers backend (optional)
```

### Customization

- **Styling**: Edit `src/index.css` and `tailwind.config.js`
- **Fonts**: Uses Inter (system fonts fallback); add Google Fonts if needed
- **Routing**: Add routes in `src/main.tsx` using `createBrowserRouter`
- **Backend**: Extend `worker/userRoutes.ts` for API endpoints

### Best Practices

- Prefer shadcn/ui components from `@/components/ui/*`
- Use `cn()` utility for Tailwind class merging
- Follow ZERO-TOLERANCE rules for React hooks/Zustand to prevent infinite loops
- Ensure responsive design with Tailwind breakpoints

## Deployment

Deploy to Cloudflare Workers/Pages with one command:

```bash
bun build
wrangler deploy
```

[cloudflarebutton]

### Configuration

- Edit `wrangler.jsonc` and `wrangler.toml` for custom bindings/domains
- Assets are served via Cloudflare Pages with SPA fallback
- API routes auto-routed through `/api/*`

For production:

1. Authenticate: `wrangler login`
2. Generate types: `wrangler types`
3. Deploy: `wrangler deploy --name pixel-toe-arcade`

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- Report issues via GitHub Issues

Built with ❤️ for retro gaming enthusiasts. 🚀