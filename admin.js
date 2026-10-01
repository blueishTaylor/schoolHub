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

displayPendingComments();