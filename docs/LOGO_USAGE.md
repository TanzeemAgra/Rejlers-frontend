# Logo Component Usage Guide

The `Logo` component provides a smart, reusable way to display the REJLERS logo throughout the application with consistent styling and behavior.

## Basic Usage

```tsx
import Logo from '@/components/ui/Logo';

// Simple logo with default settings
<Logo />

// Logo with specific size
<Logo size="large" />

// Logo with text
<Logo showText={true} />
```

## Context-Based Usage (Recommended)

Use predefined contexts for consistent styling across the application:

```tsx
// Dashboard header
<Logo context="dashboard" />

// Sidebar
<Logo context="sidebar" />

// Main navigation header
<Logo context="header" />

// Footer
<Logo context="footer" />

// Login page
<Logo context="login" />
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'main' \| 'footer' \| 'favicon' \| 'light' \| 'dark' \| 'icon'` | `'main'` | Logo variant to use |
| `size` | `'icon' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| 'hero' \| number` | `'medium'` | Logo size |
| `className` | `string` | `''` | Additional CSS classes |
| `showText` | `boolean` | `false` | Whether to show company name text |
| `textClassName` | `string` | `''` | CSS classes for the text |
| `priority` | `boolean` | `false` | Next.js Image priority prop |
| `alt` | `string` | Auto-generated | Alt text for accessibility |
| `fallbackIcon` | `boolean` | `true` | Show Building2 icon if logo fails to load |
| `context` | Context key | `undefined` | Use predefined context configuration |

## Available Contexts

### Dashboard
- Size: 32px
- No text by default
- Hover scale effect

### Sidebar
- Size: 28px
- Shows text by default
- Hover opacity effect

### Header
- Size: 40px
- No text by default
- Hover scale effect

### Footer
- Size: 36px
- Shows text by default
- White text styling

### Login
- Size: 64px
- Shows text by default
- Large format for login pages

## Customization

### Adding New Contexts

Edit `/src/config/logoConfig.ts`:

```typescript
contexts: {
  // ... existing contexts
  myNewContext: {
    size: 44,
    variant: 'main',
    showText: true,
    className: 'custom-logo-styles',
    textClassName: 'text-xl font-bold',
  },
}
```

### Adding New Logo Variants

Update the `paths` object in `/src/config/logoConfig.ts`:

```typescript
paths: {
  // ... existing paths
  newVariant: '/path-to-new-logo.png',
}
```

## Smart Features

### Fallback Handling
If the logo image fails to load, the component automatically falls back to a Building2 icon (can be disabled with `fallbackIcon={false}`).

### Performance Optimization
- Uses Next.js Image component for optimization
- Supports priority loading for above-the-fold logos
- Automatic alt text generation

### Accessibility
- Proper alt text for screen readers
- ARIA labels where appropriate
- Semantic HTML structure

## Examples

### Dashboard Header (Current Implementation)
```tsx
<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border p-1">
  <Logo context="dashboard" priority={true} />
</div>
```

### Sidebar with Company Name
```tsx
<Logo context="sidebar" />
```

### Custom Size and Styling
```tsx
<Logo 
  size={60}
  showText={true}
  className="hover:opacity-80 transition-opacity"
  textClassName="text-2xl font-bold text-blue-900"
/>
```

## File Structure

```
src/
├── components/ui/Logo.tsx          # Main Logo component
├── config/
│   ├── logoConfig.ts              # Logo configuration
│   └── finixpaTheme.ts           # Theme configuration (legacy)
└── public/
    └── Logo.png                   # Logo image file
```

## Best Practices

1. **Use contexts when possible** - They ensure consistency across the application
2. **Set priority={true}** for above-the-fold logos (dashboard, headers)
3. **Include alt text** for accessibility when using custom alt prop
4. **Test fallback behavior** - Ensure the Building2 icon appears when logo fails
5. **Keep logo files optimized** - Use appropriate image formats and sizes

## Migration Notes

This replaces the previous hardcoded `Building2` icon in the dashboard with the actual REJLERS logo while maintaining the same visual structure and behavior.