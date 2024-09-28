document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            data.projects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const link = document.createElement('a');
    link.href = project.link;
    link.textContent = 'explore.';

    const source = document.createElement('a');
    source.href = project.source;
    source.textContent = 'source.'

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(link);
    card.appendChild(source);

    return card;
}