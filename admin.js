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

async function displayPendingComments() {
    const container = document.getElementById("pending-comments-container");
    container.innerHTML = "";

    const {data, error} = await supabaseClient
    .from("comments")
    .select(`
         id,
            comment_text,
            students (first_name, class),
            Productos (product_name)
        `)
        .eq("approved", false);

        if(error){
            console.log("Error cargando comentarios:", error);
            return;
        }

        if(data.length === 0){
        container.innerHTML = "<p>No hay comentarios pendientes 🎉</p>";
        return;
        }

        data.forEach((comment) => {
        const card = document.createElement("div");
        card.classList.add("comment-card");
        card.dataset.id = comment.id;
        

        card.innerHTML = `
            <p class="comment-meta">${comment.students.first_name} - ${comment.students.class} comentó en "${comment.Productos.product_name}"</p>
            <p class="comment-body">"${comment.comment_text}"</p>
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