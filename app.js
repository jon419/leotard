document.addEventListener("DOMContentLoaded", () => {
    const leotards = ["The Georgia", "The Addie Mae", "The Addison"];

    // Automatically creates an array of '/images/1.jpg' through '/images/20.jpg'
    // If you download more or fewer than 20 images, just change the number below.
    const totalImages = 10;
    const images = Array.from({ length: totalImages }, (_, i) => `/images/${i + 1}.jpg`);

    // 1. Pick and set a random background image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;

    // 2. Calculate Weekly Rotation
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