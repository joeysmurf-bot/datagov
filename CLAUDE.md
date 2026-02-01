# CLAUDE.md - AI Assistant Guide for Durable Hub | Data Compass

## Project Overview

**Durable Hub | Data Compass** is a React-based single-page application for data visualization and analysis. The project uses a CDN-first, zero-build architecture with ES modules loaded directly in the browser.

### Key Characteristics
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Build System**: None - direct ESM imports via esm.sh
- **Deployment**: Static file hosting compatible

## Project Structure

```
/home/user/datagov/
├── index.html      # HTML entry point with module configuration
├── index.tsx       # React application entry point
├── App.tsx         # Main application component (to be created)
└── CLAUDE.md       # This file
```

### Entry Points

| File | Purpose |
|------|---------|
| `index.html` | HTML shell, CDN imports, import maps, global error handling |
| `index.tsx` | React DOM mounting with StrictMode |

## Technology Stack

### Frontend Dependencies (via esm.sh CDN)

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI library |
| react-dom | 18.3.1 | DOM rendering |
| lucide-react | 0.344.0 | Icon components |
| recharts | 2.12.7 | Data visualization charts |
| @google/genai | 0.1.2 | Google Generative AI integration |
| prop-types | 15.8.1 | Runtime type checking |

### Styling
- **Tailwind CSS**: Loaded from cdn.tailwindcss.com
- **Fonts**:
  - Inter (UI text)
  - JetBrains Mono (monospace data display)

## Development Workflow

### Running Locally

Since this project uses ESM imports from CDN, you need a local server that:
1. Serves static files
2. Supports TypeScript/TSX transpilation in-browser

Options:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (with appropriate server)
npx serve .

# Using VS Code Live Server extension
```

### No Build Step Required

All dependencies are loaded via import maps from esm.sh. There is no npm install, webpack, or bundling required.

## Code Conventions

### File Naming
- **Components**: PascalCase (e.g., `App.tsx`, `DataChart.tsx`)
- **Entry files**: lowercase (e.g., `index.html`, `index.tsx`)
- **Utilities**: camelCase (e.g., `formatData.ts`)

### React Patterns
- **StrictMode**: Always enabled for development safety
- **Error Boundaries**: Global error handler in `index.html`
- **Functional Components**: Preferred over class components

### TypeScript
- Use TypeScript (.tsx/.ts) for all new files
- Define prop types with TypeScript interfaces
- Export types alongside components when reusable

### Styling Guidelines
- Use Tailwind CSS utility classes
- Custom CSS only when Tailwind is insufficient
- Use `.font-mono-data` class for numerical/technical data display

### Color Palette (from existing styles)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #3b82f6 | Interactive elements, loading states |
| Background | #f8fafc | Page background |
| Text Gray | #64748b | Secondary text |
| Error Red | #ef4444 | Error states |

## Error Handling

### Global Error Handler
The application includes a global `window.onerror` handler that:
1. Logs errors to console
2. Displays user-friendly error UI in the root element
3. Shows file location and line number for debugging

### Mount Error Handling
`index.tsx` catches mounting failures and displays fallback error UI.

## Environment Variables

Polyfilled in browser via `window.process.env`:
- `NODE_ENV`: Defaults to 'production'
- `API_KEY`: For Google Generative AI (set externally)

## AI Assistant Guidelines

### When Adding New Features
1. Create new components in the root directory (flat structure for now)
2. Use existing CDN dependencies when possible
3. Follow React 18 patterns (hooks, functional components)
4. Use Tailwind CSS for styling

### When Modifying Code
1. Read existing files before making changes
2. Maintain the zero-build architecture
3. Keep imports compatible with esm.sh import maps
4. Preserve error handling patterns

### When Adding Dependencies
If a new dependency is needed:
1. Add it to the import map in `index.html`
2. Use the format: `"package-name": "https://esm.sh/package-name@version"`
3. Include `?deps=react@18.3.1` for React-dependent packages

### Common Tasks

**Creating a new component:**
```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
  );
}
```

**Adding a chart (using recharts):**
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
```

**Using icons:**
```tsx
import { Search, Settings, ChevronRight } from 'lucide-react';
```

## Testing

Currently no testing framework is configured. When adding tests:
- Consider Vitest for unit testing (compatible with ESM)
- Use React Testing Library for component tests
- Add test files with `.test.tsx` suffix

## Git Workflow

- **Main development**: Use feature branches with `claude/` prefix
- **Commits**: Use clear, descriptive commit messages
- **Push**: Always use `git push -u origin <branch-name>`

## Known Gaps / TODOs

1. `App.tsx` component needs to be created (imported but not committed)
2. `index.css` is referenced but doesn't exist
3. No README.md documentation
4. No testing infrastructure
5. No package.json (intentional - CDN-based architecture)

## Quick Reference

### Import Map Location
`index.html` lines 47-63

### Root Element
`<div id="root">` in `index.html` line 82

### React Version
18.3.1 (ensure compatibility when adding packages)

### Tailwind Version
Latest from CDN (cdn.tailwindcss.com)
