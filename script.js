const scareButton = document.getElementById('scareButton');
const jumpscare = document.getElementById('jumpscare');
const scream = document.getElementById('scream');

scareButton.addEventListener('click', () => {
    jumpscare.classList.remove('hidden');
    setTimeout(() => {
        jumpscare.style.opacity = 1;
        scream.play();
    }, 100); // Slight delay to allow CSS transition
});
