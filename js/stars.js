/**
 * Interactive Stars Animation for Claire Lin's Portfolio
 * This script creates and manages the interactive star elements on the homepage
 */

// Configuration for stars
const starsConfig = {
    count: 50,            // Number of stars to generate
    minSize: 2,           // Minimum star size in pixels
    maxSize: 6,           // Maximum star size in pixels
    colors: [             // Array of possible star colors
        '#ffffff',        // White
        '#90e0ef',        // Light blue
        '#00b4d8',        // Aqua
        '#48cae4',        // Blue
    ],
    twinkleSpeed: 2000,   // Speed of twinkling animation in milliseconds
    popupDuration: 3000   // How long popups stay visible in milliseconds
};

// Star content - add your information and GIFs here
const starContent = [
    {
        title: "Coffee Enthusiast",
        description: "I'm a barista who loves crafting the perfect cup.",
        gifUrl: "images/coffee.gif"
    },
    {
        title: "Coding Journey",
        description: "Learning to bring designs to life with code.",
        gifUrl: "images/coding.gif"
    },
    {
        title: "Music Lover",
        description: "Guitar player with a passion for melodies.",
        gifUrl: "images/piano.gif"
    },
    {
        title: "Adventure Seeker",
        description: "Traveling by train to discover new places.",
        gifUrl: "images/train.gif"
    },
    {
        title: "Creator",
        description: "Designing experiences with intention and purpose.",
        gifUrl: "images/design.gif"
    }
];

// DOM Elements
const starsContainer = document.querySelector('.stars-container');
let activePopup = null;

// Initialize stars on page load
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    animateStars();
});

/**
 * Creates the star elements and adds them to the DOM
 */
function createStars() {
    for (let i = 0; i < starsConfig.count; i++) {
        // Create star element
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between min and max
        const size = Math.random() * (starsConfig.maxSize - starsConfig.minSize) + starsConfig.minSize;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random color from our color array
        const colorIndex = Math.floor(Math.random() * starsConfig.colors.length);
        star.style.backgroundColor = starsConfig.colors[colorIndex];
        
        // Add opacity for twinkling effect
        star.style.opacity = Math.random();
        
        // Add content data for popups (if available)
        if (starContent.length > 0) {
            const contentIndex = i % starContent.length;
            star.dataset.content = JSON.stringify(starContent[contentIndex]);
        }
        
        // Add event listeners
        star.addEventListener('click', handleStarClick);
        
        // Add to container
        starsContainer.appendChild(star);
    }
}

/**
 * Handles the star click event to show content popup
 * @param {Event} e - The click event
 */
function handleStarClick(e) {
    const star = e.target;
    
    // Close any active popup first
    if (activePopup) {
        activePopup.remove();
        activePopup = null;
    }
    
    try {
        // Get the content data from the star
        const contentData = JSON.parse(star.dataset.content);
        
        // Create popup
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        // Add content to popup
        popup.innerHTML = `
            <img src="${contentData.gifUrl}" alt="${contentData.title}" class="popup-gif">
            <h3>${contentData.title}</h3>
            <p>${contentData.description}</p>
        `;
        
        // Position popup near the star
        const starRect = star.getBoundingClientRect();
        const starCenterX = starRect.left + starRect.width / 2;
        const starCenterY = starRect.top + starRect.height / 2;
        
        popup.style.left = `${starCenterX}px`;
        popup.style.top = `${starCenterY - 10}px`;
        popup.style.transform = 'translate(-50%, -100%)';
        
        // Add to DOM
        document.body.appendChild(popup);
        activePopup = popup;
        
        // Activate the popup
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);
        
        // Set timeout to remove popup
        setTimeout(() => {
            if (popup === activePopup) {
                popup.classList.remove('active');
                setTimeout(() => {
                    popup.remove();
                    if (activePopup === popup) {
                        activePopup = null;
                    }
                }, 300);
            }
        }, starsConfig.popupDuration);
    } catch (error) {
        console.error('Error displaying star content:', error);
    }
}

/**
 * Animates the stars with a twinkling effect
 */
function animateStars() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        // Random delay for twinkling
        const delay = Math.random() * starsConfig.twinkleSpeed;
        
        // Animate opacity for twinkling
        setInterval(() => {
            const newOpacity = 0.3 + Math.random() * 0.7; // Keep minimum opacity at 0.3
            star.style.opacity = newOpacity;
        }, starsConfig.twinkleSpeed + delay);
    });
}