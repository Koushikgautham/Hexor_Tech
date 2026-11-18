# Globe Component for Next.js

A 3D interactive globe component built with Three.js and React for Next.js projects.

## Installation

First, install the required dependencies:

```bash
npm install three topojson-client
npm install -D @types/three @types/topojson-client
```

## Usage

### Basic Usage

```tsx
import Globe from '@/components/Globe';

export default function Page() {
  return <Globe />;
}
```

### With Custom Props

```tsx
import Globe from '@/components/Globe';

export default function Page() {
  return (
    <Globe
      title="Based in New York, USA"
      subtitle="Serving clients worldwide"
      markerLat={40.7128}
      markerLng={-74.006}
      autoRotate={true}
      className="my-custom-class"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Based in Quebec, Canada"` | Main heading text |
| `subtitle` | `string` | `"Available Worldwide"` | Subtitle with status indicator |
| `markerLat` | `number` | `46.8` | Latitude for the location marker |
| `markerLng` | `number` | `-71.2` | Longitude for the location marker |
| `autoRotate` | `boolean` | `true` | Enable/disable auto rotation |
| `className` | `string` | `""` | Additional CSS classes for the container |

## Features

- 🌍 Accurate country borders from Natural Earth data
- 📍 Customizable location marker with pulse animation
- 🖱️ Interactive drag-to-rotate
- 📱 Touch support for mobile devices
- 🔄 Smooth auto-rotation
- 🎨 Dark theme with grid lines
- 💫 Dot pattern only on land masses

## Notes

- The component uses `'use client'` directive for Next.js App Router
- Tailwind CSS classes are used for styling
- The globe data is loaded from jsDelivr CDN (world-atlas package)
