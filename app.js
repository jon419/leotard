document.addEventListener("DOMContentLoaded", () => {
    const leotards = ["The Georgia", "The Addie Mae", "The Addison"];

    // 20 high-quality royalty-free dance/ballet images
    const images = [
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1516475429286-465d1201e6a5?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1518834107812-6a4506b5d95e?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1518062534571-0814bdffedb7?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1519892300165-cb5542ff5ecf?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1493021950462-ea9eb9e7a835?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1510607147321-27ce3bd164f9?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1502621743132-bb448ce76975?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1522864696084-2a6c38b2512f?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1512401662924-f7bbf6ebfb31?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1478144592100-9f0e137c7844?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1519782559495-a13a89150035?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1552503932-d1d87e5b6088?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1546816041-94ef1f071e62?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1508215167739-16625ff743b1?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1500259571355-332ebf1eb08b?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1485600468940-2792d29486df?auto=format&fit=crop&w=1080&q=80"
    ];

    // 1. Pick and set a random background image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;

    // 2. Calculate Weekly Rotation
    // The rotation automatically rolls over to the next index every Monday.
    const epochDate = new Date('2026-10-12T00:00:00'); // Starting Monday
    const currentDate = new Date();

    const diffTime = currentDate.getTime() - epochDate.getTime();
    
    let weeksPassed = 0;
    if (diffTime > 0) {
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        weeksPassed = Math.floor(diffDays / 7);
    }

    const leotardIndex = weeksPassed % leotards.length;
    document.getElementById("leotard-name").textContent = leotards[leotardIndex];

    // 3. Register Service Worker for PWA Installation
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => console.error("SW failed:", err));
    }
});