
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
        title.innerText = 'Tour Guide Videos - 8th grade';
        view.innerHTML = `
            <div class="section-intro">

                <h2>Tour Guide Videos: Discover Chile 🇨🇱🗺️</h2>

                <p>
                  Welcome to the 8th-grade Tour Guide Video section!
                Working in teams, our students chose a place in Chile
                and created a video to introduce it to visitors.
                </p>

                <p>
                 In their videos, students share essential information
                about their chosen destination, explain what visitors
                can see and do there, and share their own experiences
                when they have visited the place.
               </p>
                
               <p>
                They also share their opinions about the destination
                and explain whether they would recommend visiting it.
                Explore their videos, discover new places in Chile,
                and leave your feedback in the comments!
                </p>
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

function displayTeams(){
    const container = document.querySelector(".products-container");
    if (!container) return;

    container.innerHTML="";
    
    teams.forEach((team)=> {
        const card = document.createElement("div");
        card.classList.add("team-card");
        card.dataset.id=team.id;

        card.innerHTML = `
        <img src= "${team.photoUrl}" alt = "Foto de ${team.teamName}" class="team-photo">
        <div class="team-info">
            <h3>${team.teamName}</h3>
            <p class="product-name">${team.productName}</p>
            <p class= "team-description">${team.description}</p>
        </div>
        `;

        const commentBtn = document.createElement("button");
        commentBtn.classList.add("comment-btn");
        commentBtn.textContent="💬 Comment";

        commentBtn.addEventListener("click", ()=> {


            alert(`Sistema de comentarios para "${team.productName}" proximamente`);
        });
        card.appendChild(commentBtn);
        container.appendChild(card);
    });
}