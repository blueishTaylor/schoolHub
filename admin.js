const SUPABASE_URL = "https://nyyyjcdcolvnamubjiwc.supabase.co/";
const SUPABASE_KEY = "sb_publishable_GprnG-cyVpyKmmAfXsnfNw_iXL3BRiD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginSection = document.getElementById("login-section");
const panelSection = document.getElementById("panel-section");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        loginError.textContent = "Correo o contraseña incorrectos.";
        loginError.style.display = "block";
        return;
    }

    loginSection.style.display = "none";
    panelSection.style.display = "block";

    displayPendingComments();
});

const pendingCommentsData = [
    {
        id: 1,
        studentName: "Sofia",
        studentClass: "8A",
        productName: "Explorando Torres del Paine",
        commentText: "Me encanto el video, se ve un lugar hermoso!"
    },
    {
        id: 2,
        studentName: "Mateo",
        studentClass: "5B",
        productName: "Un viaje a Isla de Pascua",
        commentText: "Yo fui ahi el año pasado, lo recomiendo full"
    }
];

function displayPendingComments() {
    const container = document.getElementById("pending-comments-container");
    container.innerHTML = "";

    pendingCommentsData.forEach((comment) => {
        const card = document.createElement("div");
        card.classList.add("comment-card");
        card.dataset.id = comment.id;

        card.innerHTML = `
            <p class="comment-meta">${comment.studentName} - ${comment.studentClass} comentó en "${comment.productName}"</p>
            <p class="comment-body">"${comment.commentText}"</p>
        `;

        const approveBtn = document.createElement("button");
        approveBtn.classList.add("approve-btn");
        approveBtn.textContent = "✅ Aprobar";
        approveBtn.addEventListener("click", () => {
            console.log(`Aprobar comentario id: ${comment.id}`);
        });

        const rejectBtn = document.createElement("button");
        rejectBtn.classList.add("reject-btn");
        rejectBtn.textContent = "❌ Rechazar";
        rejectBtn.addEventListener("click", () => {
            console.log(`Rechazar comentario id: ${comment.id}`);
        });

        card.appendChild(approveBtn);
        card.appendChild(rejectBtn);
        container.appendChild(card);
    });
}