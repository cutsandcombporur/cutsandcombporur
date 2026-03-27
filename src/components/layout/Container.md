# Container Component

A reusable layout wrapper component that provides consistent max-width and responsive padding across all pages.

## Features

- **Mobile-first responsive design**: Implements progressive padding from mobile to desktop
- **Flexible sizing**: Supports multiple max-width options (sm, md, lg, xl, full)
- **Centered content**: Automatically centers content with horizontal margins
- **Customizable**: Accepts additional className for custom styling

## Usage

### Basic Usage

```tsx
import { Container } from '@/components/layout';

function MyPage() {
  return (
    <Container>
      <h1>Page Title</h1>
      <p>Page content goes here...</p>
    </Container>
  );
}
```

### With Custom Size

```tsx
<Container size="sm">
  <p>Narrow content area</p>
</Container>

<Container size="xl">
  <p>Wide content area</p>
</Container>

<Container size="full">
  <p>Full width content</p>
</Container>
```

### With Custom Classes

```tsx
<Container className="py-8 bg-gray-50">
  <p>Container with custom padding and background</p>
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Content to be wrapped |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Maximum width of container |

## Size Reference

- `sm`: max-w-3xl (768px)
- `md`: max-w-5xl (1024px)
- `lg`: max-w-7xl (1280px) - default
- `xl`: max-w-screen-2xl (1536px)
- `full`: max-w-full (no limit)

## Responsive Padding

The Container automatically applies responsive padding:

- Mobile (<640px): 16px (px-4)
- Small (≥640px): 24px (sm:px-6)
- Medium (≥768px): 32px (md:px-8)
- Large (≥1024px): 48px (lg:px-12)

## Requirements

Addresses requirements 6.1 and 6.2:
- Mobile-first responsive design
- Consistent layout across pages
