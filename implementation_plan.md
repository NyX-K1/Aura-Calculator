# Visual Effects Implementation Plan

## User Review Required
- **Shader Library**: I will be using `@react-three/fiber` and `@react-three/drei`.
- **Performance**: High particle count + dual shaders might impact performance.

## Proposed Changes

### Brainrot Side: Skull 'Look-At' Effect
- **File**: `src/components/SkullImage.jsx`
- **Change**: Use `useMotionValue` and `useTransform` to track mouse and tilt the skull (±25 deg).

### Zen Side: Increase Particle Density
- **File**: `src/effects/GoldParticles.jsx`
- **Change**: Increase `particles.number.value` to `250`.

### Background Shaders
- **New File**: `src/effects/ZenShader.jsx` (White & Gold Silk shader)
- **New File**: `src/effects/BrainrotShader.jsx` (Toxic Plasma shader)
- **File**: `src/components/ZenSide.jsx` (Integrate ZenShader)
- **File**: `src/components/BrainrotSide.jsx` (Integrate BrainrotShader)

## Verification
- Verify Skull interaction.
- Verify Particle density.
- Verify Shader rendering.
