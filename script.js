// Typing effect for About section
const aboutText = `I'm a passionate software engineer with experience in JavaScript, C++, and various other technologies. From a young age, I’ve been fascinated by technology and its potential to shape the future. I specialize in building efficient, scalable, and innovative software solutions, always striving to push the boundaries of what's possible.

I studied technology in Sweden and later pursued software engineering at university in Bari, Italy. My journey has been fueled by a love for creating websites, developing software, and exploring new technologies that can make an impact. Whether it's designing interactive web applications, optimizing performance, or working on exciting projects, I enjoy every step of the process.

Beyond coding, I'm deeply interested in entrepreneurship and aspire to create a successful tech business. I believe in constant learning and innovation, and I’m always looking for new ways to grow, develop, and contribute to the ever-evolving world of technology.`;

let index = 0;
const typingSpeed = 50;

// Typing effect function
function typeText() {
    const typingElement = document.querySelector('.typing-text');
    if (index < aboutText.length) {
        typingElement.innerHTML += aboutText.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        startHackingEffect();
    }
}

// Hacking effect function
function startHackingEffect() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?`~";
    let hackIndex = 0;
    const maxHackCycles = 10;
    const typingElement = document.querySelector('.typing-text');

    function hack() {
        if (hackIndex < maxHackCycles) {
            let hackText = '';
            for (let i = 0; i < 20; i++) {
                hackText += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            typingElement.innerHTML = aboutText + `<br><span class="hacking-effect">${hackText}</span>`;
            hackIndex++;
            setTimeout(hack, 100);
        } else {
            typingElement.innerHTML = aboutText;
        }
    }

    hack();
}

// Show Home section
function showHome() {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    const homeSection = document.getElementById('home');
    homeSection.classList.add('active');
    homeSection.style.display = 'block';

    const video = document.querySelector('video');
    if (video) video.play().catch(error => console.error("Video play failed:", error));

    window.location.hash = 'home';
}

// Show specified section
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    const section = document.getElementById(sectionId);
    section.classList.add('active');
    section.style.display = 'block';

    // Initialize typing effect if About section is shown
    if (sectionId === 'about') {
        initAboutText();
    }
}

// Initialize typing effect for About section
function initAboutText() {
    const typingElement = document.querySelector('.typing-text');
    typingElement.innerHTML = '';
    index = 0;
    typeText();
}

// Event listener for menu clicks
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('onclick').match(/'(.+?)'/)[1];
        showSection(section);
    });
});

// Initialize Home on DOM load
document.addEventListener("DOMContentLoaded", showHome);

// Start About typing effect when window loads
window.onload = () => {
    initAboutText();
};
function getLocation() {
    const locationElement = document.getElementById("user-location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationElement.textContent = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.textContent = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        locationElement.textContent = "The request to get user location timed out.";
                        break;
                    default:
                        locationElement.textContent = "An unknown error occurred.";
                        break;
                }
            }
        );
    } else {
        locationElement.textContent = "Geolocation is not supported by this browser.";
    }
}
