function showSection(section) {
    const title = document.getElementById('section-title');
    const view = document.getElementById('main-view');
    
    if(section === 'podcasts') {
        title.innerText = 'Podcasts - 7mo Básico';
        view.innerHTML = '<p>Aquí aparecerán los podcasts de los 7mos.</p>';
    } else if(section === 'videos') {
        title.innerText = 'Videos - 8vo Básico';
        view.innerHTML = '<p>Aquí aparecerán los videos de los 8vos.</p>';
    } else {
        title.innerText = 'Bienvenidos al Blog';
        view.innerHTML = '<p>Selecciona una sección del menú para visualizar los trabajos.</p>';
    }
}