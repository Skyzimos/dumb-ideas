let originalHTML = '';
let originalCSS = '';
let pagesList = []; // Cache of pages
let hasSavedOriginal = false;

function saveOriginalContent() {
    if (hasSavedOriginal) return;

    const mainContainer = document.getElementById('main-container');
    originalHTML = mainContainer.innerHTML;

    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    originalCSS = Array.from(linkTags).map(link => link.href).join(' ');

    hasSavedOriginal = true;
}

function renderMainPage() {
    const mainContainer = document.getElementById('main-container');
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = '';

    // Restore original HTML
    mainContainer.innerHTML = originalHTML;

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    pagesList.forEach(page => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => loadPage(`/pages/${page.path}`);

        const image = document.createElement('img');
        image.src = `/pages/${page.directory}/preview.png`;
        image.alt = page.name;

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = page.name;

        card.appendChild(image);
        card.appendChild(title);
        grid.appendChild(card);
    });

    mainContainer.appendChild(grid);
}

function loadPages() {
    fetch('/pages/pages.json')
        .then(response => response.json())
        .then(pages => {
            pagesList = pages;
            saveOriginalContent();
            renderMainPage();
        })
        .catch(error => console.error('Error loading pages:', error));
}

function loadPage(page) {
    const mainContainer = document.getElementById('main-container');
    const pageContainer = document.getElementById('page-container');

    saveOriginalContent();

    mainContainer.innerHTML = '';
    pageContainer.innerHTML = '';

    const goBackButton = document.createElement('button');
    goBackButton.className = 'go-back-button';
    goBackButton.textContent = 'Go Back';
    goBackButton.onclick = goBack;
    Object.assign(goBackButton.style, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: '100',
        padding: '0.6rem 1.5rem',
        cursor: 'pointer'
    });

    document.body.appendChild(goBackButton);

    // Dynamically load the page
    loadCSS(`${page}.css`);
    loadScript(`${page}.js`);
    loadContent(`${page}.html`);
}

function goBack() {
    document.querySelector('.go-back-button')?.remove();

    // Remove current CSS
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());

    // Restore original CSS
    originalCSS.split(' ').forEach(cssFile => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    });

    renderMainPage(); // Use the renderer instead of resetting HTML manually
}

// CSS/JS/HTML loader
function loadCSS(file) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = file;
    document.head.appendChild(link);
}
function loadScript(file) {
    const script = document.createElement('script');
    script.src = file;
    script.defer = true;
    document.body.appendChild(script);
}
function loadContent(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById('page-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading content:', error));
}

// Call once on page load
window.addEventListener('DOMContentLoaded', loadPages);