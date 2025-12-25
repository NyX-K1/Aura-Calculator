# Repairs & Refinements

- [x] Landing Page Logic
    - [x] Implement Hover Expansion (70/30 split) in `App.jsx` <!-- id: 36 -->
    - [x] Pass hover handlers to `ZenSide` and `BrainrotSide` <!-- id: 37 -->
- [x] Cursor Restoration
    - [x] Brainrot: "Red & Blue Circles"
        - [x] Fix Visibility: Hide when leaving Brainrot Side <!-- id: 44 -->
    - [x] Zen: Fix Offset & Styling
        - [x] Switch `ZenCursor` to `state.pointer`
        - [x] Darken Leaf Color <!-- id: 45 -->
    - [x] Fix "Plus Sign" issue
- [x] Zen Tuning
    - [x] `ZenShader`: Fix "Stopped" animation (Restore speed to 0.5) <!-- id: 46 -->
    - [x] `ProceduralLotus`: Reduced breathing amplitude
- [x] Interaction Tuning
    - [x] `ZenShader`: Increase speed (0.5 -> 0.8) <!-- id: 47 -->
    - [x] `BrainrotSide`:
        - [x] Aura Counter: Faster jitter/move on hover <!-- id: 48 -->
        - [x] Meme Banner: Faster scroll on hover <!-- id: 49 -->
- [x] Logic Tuning
    - [x] `BrainrotSide`: Accelerate Aura Decrease on Hover <!-- id: 50 -->
    - [x] `ZenShader`: Balance Speed (0.8 -> 0.4) <!-- id: 51 -->
- [x] Debugging
    - [x] `ZenShader`: Fix speed reduction (Use Delta Time, set 0.25) <!-- id: 52 -->
- [x] Visual Redesign (Redirect Page)
    - [/] `BeamShader`: Waterfall Style (Sleek top, Wide bottom) <!-- id: 55 -->

- [x] Aura Reveal Page
    - [x] Add "Return to Sanctuary" option
    - [x] Make "Save Sigil" functional (download image)

- [x] Visual & UX Refinements
    - [x] Replace Sigil PNGs with SVGs
    - [x] Update Footer (Remove Twitter, Ensure Instagram)
    - [x] Fix "Return to Sanctuary" Black Screen Bug (Robust Reset)
    - [x] Fix Split Screen Divider Jump
    - [x] Smooth Zen Mode Transition (Cross-fade)
    - [x] Fix Sigil Download Background (Force Dark BG)
    
- [x] Deep Debugging & Polish
    - [x] Robust Reset (App-level Remount)
    - [x] Sigil Capture Visibility Fix (z-index)
    - [x] Robust Reset (App-level Remount)
    - [x] Sigil Capture Visibility Fix (z-index)
    - [x] Zen Transition Z-Index Fix
    
- [x] Feature Request
    - [x] Gold Dust Transition (3s White Screen)
    - [x] Update Social Links (Insta: relativexmemes, Contact: Rickroll)
    - [x] Fix Mindfulness Animation (Refactored to Pure CSS Keyframes)
    - [x] Fix Offering Animation (Scroller Proxy Sync Race Condition)

- [x] Performance Optimization
    - [x] Remove SVG Noise Filter (Major GPU bottleneck)
    - [x] Optimize ZenSide WebGL (Clamp DPR to 1.5)
- [x] Performance Optimization
    - [x] Remove SVG Noise Filter (Major GPU bottleneck)
    - [x] Optimize ZenSide WebGL (Clamp DPR to 1.5)
    - [x] Optimize UnicornEmbed (Visibility Toggling)

# Brainrot Mode (Maximalist Reconstruction)
- [x] Glitch Descent Transition
    - [x] `GlitchOverlay` Component (CSS clip-path, hue-rotate)
    - [x] Audio Integration (Placeholder for "Yeet" sound)
    - [x] `App.jsx` Integration (Navigation Logic)
- [x] Brainrot Dashboard (Fixed Viewport)
    - [x] `BrainrotDashboard` Component (Scrapbook Layout, CRT Overlay)
    - [x] Neon Navbar (Glitch Hover)
    - [x] Custom Cursor (Emoji Transform)
- [x] Brainrot Ritual (Spam-to-Rizz)
    - [x] CPS Tracker Logic
    - [x] Slang Intent Input
- [x] Brainrot Ritual (Spam-to-Rizz)
    - [x] CPS Tracker Logic
    - [x] Slang Intent Input
    - [x] "Gemini" Analysis Logic (Simulated)
- [x] Hall of Sigmas & Dictionary
    - [x] Slang Dictionary Sidebar (Marquee, Press Start 2P)
    - [x] Stalwart Reveal Logic (Madara, Aizen, etc.)
    - [x] Update Brainrot Logic (Keyword bonuses)
- [x] Hall of Sigmas & Dictionary
    - [x] Slang Dictionary Sidebar (Marquee, Press Start 2P)
    - [x] Stalwart Reveal Logic (Madara, Aizen, etc.)
    - [x] Update Brainrot Logic (Keyword bonuses)
    - [x] Performance: Low-res GIF Background

# Dominance Redesign (Dark Luxury UX)
- [x] Aesthetic Overhaul (Matte Black + Grain)
- [x] Dominance Navbar (Ascend/Vault/Void, JetBrains Mono)
- [x] Stalwart Gallery (Horizontal Scroll, Grayscale->Color Hover)
- [x] Aura UI V2 (MOG Button, Military CPS)

# Brainrot V3 Overhaul (The Final Form)
- [x] Structure & Navigation
    - [x] Main Dashboard Container (Navbar + content area)
    - [x] Navigation Logic (State-based view switching)
- [x] Aura Calculator (Main View)
    - [x] Inputs: Slang (scored), Tricky Yes/No, Height (m->Ly), Weight (kg->MN)
    - [x] Mogging Click Counter (CPS integration)
    - [x] Volatile Algorithm (-Inf to +Inf)
- [x] Sub-Pages
    - [x] Hall of Fame (20 Farmers, Stats, Links)
    - [x] Dictionary (Expanded terms)
- [x] Aura Calculator Enhancements
    - [x] Hide Scrollbar (keep functionality)
    - [x] Add Scroll Animations & Visual Polish
    - [x] Gemini API Integration for Slang Scoring
    - [x] Implement 25 Defined Questions (Yes/No scoring)
    - [x] Logic Update (Gemini + Questions + Clicks)
