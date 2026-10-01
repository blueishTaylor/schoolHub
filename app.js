
const SUPABASE_URL = "https://nyyyjcdcolvnamubjiwc.supabase.co/";
const SUPABASE_KEY= "sb_publishable_GprnG-cyVpyKmmAfXsnfNw_iXL3BRiD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const accessForm = document.getElementById("access-form");
const accessError = document.getElementById("access-error");
const accessDialog = document.getElementById("access-dialog");
const commentDialog = document.getElementById("comment-dialog");
const commentForm = document.getElementById("comment-form");
const commentError = document.getElementById("comment-error");
const commentCancelBtn = document.getElementById("comment-cancel-btn");
let currentTeamForComment = null;
let  currentStudent = null;
let pendingTeam = null;

const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(\s[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;


accessForm.addEventListener("submit", async(event)=> {
    event.preventDefault();

    const firstName = document.getElementById("access-first-name").value.trim();
    const lastName = document.getElementById("access-last-name").value.trim();
    const studentClass = document.getElementById("access-class").value.trim();

    if(!nameRegex.test(firstName)|| !nameRegex.test(lastName)){
        accessError.textContent="El nombre y apellido puede contener solo letras.";
        accessError.style.display = "block";
        return;
    }

    accessError.style.display="none";

    const{data, error} = await supabaseClient
    .from("students")
    .select("*")
    .eq("first_name", firstName)
    .eq("last_name", lastName)
    .eq("class", studentClass);


    if(error){
        accessError.textContent = "Hubo un error al conectar. Intenta de nuevo";
        accessError.style.display = "block";
        return;
    }

    if(data.length === 0){
        accessError.textContent = "No encontramos esos datos.Revisa tu nombre, apellido y curso.";
        accessError.style.display = "block";
        return;
    }
console.log("Esto es 'data' completo:", data);
console.log("Cuántos elementos tiene:", data.length);
    
    currentStudent = data[0];
    console.log("¡Estudiante válido!", data[0]);
    accessDialog.close();
    
    if(pendingTeam){
    abrirFormularioComentario(pendingTeam);
    pendingTeam = null;
    }

   

})


document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

async function showSection(section) {
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

        await displayTeams();
    } else {
        title.innerText = 'Bienvenidos al Blog';
        view.innerHTML = '<p>Selecciona una sección del menú para visualizar los trabajos.</p>';
    }
}
function abrirFormularioComentario(team){
    currentTeamForComment = team;
    document.getElementById("comment-product-title").textContent= team.product_name;
    document.getElementById("comment-as").textContent = `Comentando como ${currentStudent.first_name} - ${currentStudent.class}`;
    commentError.style.display= "none";
    commentForm.reset();
    commentDialog.showModal();
}


async function displayTeams(){
    const container = document.querySelector(".products-container");
    if (!container) return;

const {data, error} = await supabaseClient
.from("Productos")
.select("*")
.eq("class", "8°A")
.eq("product_type", "video");

if(error){
    console.log("Error cargando productos", error);
    return;
}


    container.innerHTML="";

    data.forEach((team)=>{
        const card = document.createElement("div");
        card.classList.add("team-card");
        card.dataset.id= team.id;
    
        card.innerHTML= `
        <img src="https://placehold.co/150" alt="Foto de ${team.team_name}" class="team-photo">
        <div class="team-info">
            <h3>${team.team_name}</h3>
            <p class="product-name">${team.product_name}</p>
            <p class="team-description">${team.description}</p>
        </div>
        `;

        const commentBtn = document.createElement("button");
        commentBtn.classList.add("comment-btn");
        commentBtn.textContent="💬 Comment";

        commentBtn.addEventListener("click", ()=> {
            if(currentStudent){
               abrirFormularioComentario(team);
            } else{
                pendingTeam = team;
                accessDialog.showModal();
            }
        });
        card.appendChild(commentBtn);
        container.appendChild(card);
    });
}


async function probarConexion() {
    const { data, error } = await supabaseClient
        .from("students")
        .select("*");

    console.log("Datos:", data);
    console.log("Error:", error);
}

probarConexion();
