document.addEventListener("DOMContentLoaded", () => {
    const leotards = ["The Georgia", "The Addie Mae", "The Addison"];

    // Automatically creates an array of '/images/1.jpg' through '/images/20.jpg'
    // If you download more or fewer than 20 images, just change the number below.
    const totalImages = 10;
    const images = Array.from({ length: totalImages }, (_, i) => `/images/${i + 1}.jpg`);

    // 1. Pick and set a random background image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;

    // 2. Calculate Weekly Rotation (updates every Sunday)
    function updateLeotardName() {
        const epochDate = new Date(2026, 9, 11); // Sunday, Oct 11, 2026 (month is 0-indexed)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const diffTime = today.getTime() - epochDate.getTime();

        let weeksPassed = 0;
        if (diffTime > 0) {
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
            weeksPassed = Math.floor(diffDays / 7);
        }

        const leotardIndex = weeksPassed % leotards.length;
        document.getElementById("leotard-name").textContent = leotards[leotardIndex];
    }

    updateLeotardName();

    // Re-evaluate whenever the PWA/tab is brought back to the foreground
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            updateLeotardName();
        }
    });
    window.addEventListener("focus", updateLeotardName);
    window.addEventListener("pageshow", updateLeotardName);

    // 3. Force Refresh Button
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", async () => {
            refreshBtn.classList.add("spinning");
            try {
                if ('caches' in window) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map(key => caches.delete(key)));
                }
                if ('serviceWorker' in navigator) {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(registrations.map(reg => reg.update()));
                }
            } catch (err) {
                console.error("Refresh cleanup failed:", err);
            }
            window.location.reload();
        });
    }

    // 4. Register Service Worker for PWA Installation & force update checks
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
            .then(reg => {
                reg.update();
                document.addEventListener("visibilitychange", () => {
                    if (document.visibilityState === "visible") {
                        reg.update();
                    }
                });
            })
            .catch(err => console.error("SW failed:", err));

        // Reload once if a new service worker takes control so cached code updates immediately
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }
});