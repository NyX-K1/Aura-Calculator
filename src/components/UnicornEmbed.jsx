import { useEffect, useRef } from 'react';

const UnicornEmbed = ({ active = true }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const initUnicorn = () => {
            if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                try {
                    // Slight delay to ensure DOM is ready and prevent potential race conditions
                    setTimeout(() => {
                        window.UnicornStudio.init({ pixelRatio: 1.0 });
                    }, 100);
                } catch (err) {
                    console.warn("UnicornStudio init failed:", err);
                }
            }
        };

        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false };
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js";
            script.async = true; // Ensure async load
            script.onload = () => {
                window.UnicornStudio.isInitialized = true;
                initUnicorn();
            };
            script.onerror = (e) => console.error("Unicorn script failed to load", e);
            document.body.appendChild(script);
        } else {
            // Already loaded, just init
            initUnicorn();
        }

        // Cleanup? Unicorn doesn't seem to provide a destroy method easily.
        // We will just let it be.
    }, []);

    return (
        <div
            style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                visibility: active ? 'visible' : 'hidden', // Optimize overlay
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            {/* 
               Restored clean version without any masking hacks or injected styles.
            */}
            <div
                ref={containerRef}
                data-us-project="PxpOsGifO5QlVxm3AG9r"
                style={{ width: '100%', height: '100%' }}
            ></div>
        </div>
    );
};

export default UnicornEmbed;
