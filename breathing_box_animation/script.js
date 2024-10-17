document.addEventListener('DOMContentLoaded', function() {
    const dot = document.querySelector('.dot');
    const gradient = document.querySelector('.gradient');
    const centerText = document.querySelector('.center-text');
    const countdown = document.getElementById('countdown');
    const refreshIcon = document.querySelector('.refresh-icon');
    const popupOverlay = document.getElementById('popup-overlay');
    const startButton = document.getElementById('start-animation');

    // Input fields for durations
    const inhaleInput = document.getElementById('inhale-duration');
    const hold1Input = document.getElementById('hold1-duration');
    const exhaleInput = document.getElementById('exhale-duration');
    const hold2Input = document.getElementById('hold2-duration');

    let animationTimeouts = [];
    
    let inhaleDuration = 6000;
    let hold1Duration = 6000;
    let exhaleDuration = 6000;
    let hold2Duration = 6000;

    function fadeInText(text, fadeDuration) {
        centerText.textContent = text;
        centerText.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
        centerText.style.opacity = '1';
    }

    function fadeOutText(fadeDuration) {
        centerText.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
        centerText.style.opacity = '0';
    }

    function runInhale() {
        fadeInText("Inhale", inhaleDuration * 0.15);
        dot.style.transition = `top ${inhaleDuration}ms linear`;
        gradient.style.transition = `height ${inhaleDuration}ms linear`;
        dot.style.top = '0';
        dot.style.left = '0';
        gradient.style.height = '100%';
        animationTimeouts.push(setTimeout(() => fadeOutText(inhaleDuration * 0.15), inhaleDuration * 0.85));
        animationTimeouts.push(setTimeout(runHold1, inhaleDuration));
    }

    function runHold1() {
        fadeInText("Hold", hold1Duration * 0.15);
        dot.style.transition = `left ${hold1Duration}ms linear`;
        dot.style.left = '100%';
        animationTimeouts.push(setTimeout(() => fadeOutText(hold1Duration * 0.15), hold1Duration * 0.85));
        animationTimeouts.push(setTimeout(runExhale, hold1Duration));
    }

    function runExhale() {
        fadeInText("Exhale", exhaleDuration * 0.15);
        dot.style.transition = `top ${exhaleDuration}ms linear`;
        gradient.style.transition = `height ${exhaleDuration}ms linear`;
        dot.style.top = '100%';
        gradient.style.height = '0';
        animationTimeouts.push(setTimeout(() => fadeOutText(exhaleDuration * 0.15), exhaleDuration * 0.85));
        animationTimeouts.push(setTimeout(runHold2, exhaleDuration));
    }

    function runHold2() {
        fadeInText("Hold", hold2Duration * 0.15);
        dot.style.transition = `left ${hold2Duration}ms linear`;
        dot.style.left = '0';
        animationTimeouts.push(setTimeout(() => fadeOutText(hold2Duration * 0.15), hold2Duration * 0.85));
        animationTimeouts.push(setTimeout(runInhale, hold2Duration));
    }

    function countdownTimer(callback) {
        countdown.style.display = 'block';
        let counter = 3;
        countdown.textContent = counter;

        const interval = setInterval(() => {
            counter--;
            countdown.textContent = counter;

            if (counter === 0) {
                clearInterval(interval);
                countdown.style.display = 'none';
                callback();
            }
        }, 1000);
    }

    function resetAnimation() {
        // Clear all timeouts to stop ongoing animations
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];

        // Reset styles to initial states
        dot.style.transition = 'none';
        gradient.style.transition = 'none';
        dot.style.top = '50%';
        dot.style.left = '50%';
        gradient.style.height = '0';
        centerText.style.opacity = '0';

        // Show popup to get user input
        popupOverlay.classList.add('active');
    }

    // Event listener for the refresh icon to reset animation
    refreshIcon.addEventListener('click', function(event) {
        event.preventDefault();
        resetAnimation();
    });

    // Event listener for the start button in the popup
    startButton.addEventListener('click', function() {
        // Get values from input fields (convert to milliseconds)
        inhaleDuration = (parseInt(inhaleInput.value) || 6) * 1000;
        hold1Duration = (parseInt(hold1Input.value) || 6) * 1000;
        exhaleDuration = (parseInt(exhaleInput.value) || 6) * 1000;
        hold2Duration = (parseInt(hold2Input.value) || 6) * 1000;

        // Hide the popup and start the animation
        popupOverlay.classList.remove('active');
        countdownTimer(runInhale);
    });

    // Show the popup when the page loads
    popupOverlay.classList.add('active');
});
