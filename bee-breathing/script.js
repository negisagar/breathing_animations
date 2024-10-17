function createSinePath() {
    const width = 1000; // Width to match SVG viewBox
    const height = 400; // Height to match SVG viewBox
    const amplitude = 150; // Adjusted amplitude for the larger height
    const frequency = 2;
    let path = `M 0 ${height / 2}`;
    for (let x = 0; x <= width; x++) {
        const y = amplitude * Math.sin((x / width) * Math.PI * 2 * frequency) + height / 2;
        path += ` L ${x} ${y}`;
    }
    return path;
}

document.addEventListener("DOMContentLoaded", () => {
    const sinePath = document.getElementById('sinePath');
    const dot = document.querySelector('.dot');
    const pathData = createSinePath();

    if (sinePath) {
        sinePath.setAttribute('d', pathData);

        // Set stroke-dasharray and stroke-dashoffset dynamically to the path length
        const pathLength = sinePath.getTotalLength();
        sinePath.style.strokeDasharray = pathLength;
        sinePath.style.strokeDashoffset = pathLength;

        // Animation logic to reveal the path progressively
        const duration = 8000; // 8 seconds

        let startTime;

        function animateLineReveal(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // Calculate the current position of the dot based on the elapsed time
            const progress = elapsed / duration;
            const offset = pathLength * (1 - progress);

            // Update stroke-dashoffset to reveal the path up to the current dot position
            sinePath.style.strokeDashoffset = offset;

            // Move the dot along the path
            const pointAtLength = sinePath.getPointAtLength(pathLength * progress);
            dot.style.transform = `translate(${pointAtLength.x}px, ${pointAtLength.y}px)`;

            if (elapsed < duration) {
                requestAnimationFrame(animateLineReveal);
            } else {
                // Loop the animation
                startTime = null;
                requestAnimationFrame(animateLineReveal);
            }
        }

        requestAnimationFrame(animateLineReveal);
    }
});
