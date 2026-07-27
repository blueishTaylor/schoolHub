
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

function showSection(section) {
    const title = document.getElementById('section-title');
    const view = document.getElementById('main-view');
    
    if(section === 'home'){
        title.innerText= 'Welcome to the School Hub 🌟';
        view.innerHTML = `
           <div class="home-intro">
                <p>Welcome to the official digital space of our School Project (PBL). Here, you can explore the amazing work created by our 7th and 8th-grade students in their English class.</p>
                <p>Our <strong>7th graders</strong> have put their voices into action through creative and engaging podcasts, while our <strong>8th graders</strong> take you on a virtual tour with their edited videos sharing their experiences at the airport.</p>
                <p>Take a look at their products, listen to their stories, and leave your thoughts and comments below! (Remember: all comments must be in English and follow our respectful community guidelines).</p>
            </div>
            `;
    }else if(section === 'podcasts') {
        title.innerText = 'Podcasts - 7th graders';
        view.innerHTML = `
            <div class="section-intro">
                <h2>Healthy Lifestyle Podcasts 🎙️</h2>
                <p>Welcome to the 7th-grade podcast section! <br> Here, student teams share their voices, knowledge, and personal experiences regarding a <strong>healthy lifestyle</strong>.</p>
                <p>Listen to how they discuss wellness, daily habits, and healthy choices—all entirely in English! Stay tuned to check out their audio projects and leave your constructive comments below.</p>
            </div>
            <div class="products-container">
                <!-- Aquí se cargarán dinámicamente las tarjetas de los equipos más adelante -->
                <p class="placeholder-text">Student podcasts will appear here soon.</p>
            </div>
        `;
    }else if(section === 'videos') {
        title.innerText = 'Airport Videos - 8th grade';
        view.innerHTML = `
            <div class="section-intro">
                <h2>Airport Adventures & Travel Stories ✈️🧳</h2>
                <p>Welcome to the 8th-grade video section! Working in teams, our students recorded their journey, the airport facilities, and their own travel experiences.</p>
                <p>Watch how they bring their adventures to life by combining original footage of the airport with creative voice-overs, sharing their personal stories—all spoken entirely in English!</p>
                <p>Explore their video projects below, enjoy their work, and leave your feedback in the comments!</p>
            </div>
            <div class="products-container">
                <!-- Aquí se cargarán dinámicamente las tarjetas de los videos más adelante -->
                <p class="placeholder-text">Student videos will appear here soon.</p>
            </div>
        `;
    } else {
        title.innerText = 'Bienvenidos al Blog';
        view.innerHTML = '<p>Selecciona una sección del menú para visualizar los trabajos.</p>';
    }
}