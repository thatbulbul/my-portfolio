# 3D Portfolio Text Animation

A premium, lightweight 3D text animation component for website footers featuring the word "PORTFOLIO" with futuristic aesthetics and smooth animations.

## Features

- **Lightweight & Performant**: Optimized for 60fps with efficient rendering
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Interactive**: Mouse hover effects and subtle parallax movement
- **Looping Animations**: Seamless infinite loops with organic timing
- **Premium Aesthetics**: Glossy materials, neon glow effects, and smooth motion

## Installation

Make sure you have the required dependencies:

```bash
npm install three gsap
npm install --save-dev @types/three
```

## Usage

### Basic Implementation

```tsx
import Portfolio3DText from '@/components/portfolio-3d-text'

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Your footer content */}
        
        {/* 3D Portfolio Text */}
        <div className="mt-12 mb-8">
          <Portfolio3DText className="mx-auto max-w-4xl" />
        </div>
        
        {/* Copyright etc */}
      </div>
    </footer>
  )
}
```

### Advanced Integration with Scroll Trigger

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Portfolio3DText from '@/components/portfolio-3d-text'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current || !textRef.current) return

    // Animate text on scroll into view
    gsap.fromTo(textRef.current, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        <div ref={textRef} className="mb-12">
          <Portfolio3DText className="mx-auto max-w-5xl" />
        </div>
        
        {/* Rest of footer content */}
      </div>
    </footer>
  )
}
```

## Animation Behaviors

### Idle Animations
- **Gentle Floating**: Each letter floats up and down independently
- **Subtle Rotation**: Soft Y and Z-axis rotation for depth
- **Pulsing Glow**: Breathing glow effect on materials

### Jump Animations
- **Organic Timing**: Random 3-9 second intervals per letter
- **Squash & Stretch**: Anticipation, jump, and landing with elastic deformation
- **Glow Burst**: Intensity spike on impact
- **Smooth Easing**: Power and bounce easing for natural motion

### Interactive Features
- **Hover Effects**: Enhanced glow and slight lift on mouse enter
- **Parallax Movement**: Subtle camera movement following mouse
- **Performance Optimized**: Throttled to 60fps with efficient event handling

## Customization

### Colors & Materials
```tsx
// Modify materials in createLetterMaterials()
const mainMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x00aaff,        // Primary color
  emissive: 0x001144,     // Glow color
  emissiveIntensity: 0.3, // Glow strength
  metalness: 0.1,         // Metallic look
  roughness: 0.2,         // Surface roughness
  clearcoat: 1.0,         // Glossy coating
})
```

### Animation Timing
```tsx
// Adjust in setupAnimations()
const jumpDelay = Math.random() * 6 + 3  // 3-9 seconds
const floatDuration = 2.5 + Math.random() * 0.8  // 2.5-3.3 seconds
```

### Dimensions
```tsx
// Modify in createLetterGeometry()
const geometry = new THREE.BoxGeometry(1.2, 1.8, 0.4)  // width, height, depth
group.position.x = (index - 4) * 2.2  // letter spacing
```

## Performance Considerations

- **Optimized Rendering**: Uses `requestAnimationFrame` with 60fps throttling
- **Efficient Materials**: Physical materials with minimal complexity
- **No Shadows**: Disabled for better performance
- **Responsive Pixel Ratio**: Capped at 2x for high-DPI displays
- **Memory Management**: Proper cleanup of Three.js resources

## Browser Compatibility

- **WebGL Support**: Requires WebGL-enabled browsers
- **Modern Browsers**: Chrome 51+, Firefox 51+, Safari 10+, Edge 79+
- **Mobile Support**: iOS Safari 10+, Chrome Mobile 51+

## Troubleshooting

### Performance Issues
- Reduce `setPixelRatio` to 1 for lower-end devices
- Decrease geometry complexity in `createLetterGeometry()`
- Reduce number of lights or use simpler materials

### Visual Issues
- Ensure container has proper dimensions
- Check WebGL support: `renderer.capabilities.isWebGL2`
- Verify Three.js version compatibility

## License

This component is part of your portfolio project and follows your project's license terms.