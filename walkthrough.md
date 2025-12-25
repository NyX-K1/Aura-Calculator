# Walkthrough - Zen vs Brainrot Landing Page

I have successfully updated the landing page with advanced visual effects, transforming the environment into a fully 3D interactive experience using React Three Fiber.

## Visual Effects Upgrades

### 1. The Zen Side (Right)
- **Background**: Implemented a **"White & Gold Silk" Shader** (`ZenShader.jsx`) for the landing preview.
- **Particles**: `GoldParticles.jsx` renders 250+ gold dust particles using `InstancedMesh`.
- **Atmosphere**: **Gold Leaf Cursor** (`ZenCursor.jsx`) emits twinkling gold flakes.
- **Polish**: Premium typography with glowing shadows.

### 2. The Brainrot Side (Left)
- **Background**: **"Toxic Plasma" Shader** (`BrainrotShader.jsx`): glitch lines, RGB splitting, color inversion.
- **Interactive Skull**: Responsive **3D Skull Component** (`SkullImage.jsx`) with aggressive mouse tracking (±45°).
- **Chaos**: Neon **Aura Counter** (starts at 1M), **Hyper-Banner** with expanded slang, **Camera Shake**, and **Text Jitter** on hover.
- **Cursor**: **Glitch Pointer** (`BrainrotCursor.jsx`) – neon green crosshair with ghost trails.

### 3. Zen Garden Redirect (Reverted to Silk)
- **Navigation**: Transitions from Zen Side to a full-screen **Silk Garden**.
- **Environment**: A pure 3D scene (`ZenGarden.jsx`) featuring a procedurally generated **Breathing Lotus**, a "Stone-variant" Skull sculpture, and a rippling silk floor shader.
- **Interactivity**: 
    - Hovering the Lotus intensifies its glow.
    - Floating UI labels (REFLECT, CALCULATE, BREATHE).
    - "CALCULATE" opens a glassmorphic **Aura Input Modal**.

### 4. Core Tech
- **React Three Fiber**: Both sides now utilize a `<Canvas>` integration, allowing for high-performance WebGL rendering of shaders and meshes.
- **Shaders**: Custom GLSL shaders implemented via `@react-three/drei`'s `shaderMaterial`.

## Usage

To start the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```
