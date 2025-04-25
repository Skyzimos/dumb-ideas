let originalHTML = '';
let originalCSS = '';
let pagesList = [];
let hasSavedOriginal = false;
let clickedFromMainPage = false;
let development = false;

function saveOriginalContent() {
    if (hasSavedOriginal) return;

    const mainContainer = document.getElementById('main-container');
    originalHTML = mainContainer.innerHTML;

    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    originalCSS = Array.from(linkTags).map(link => link.href).join(' ');

    hasSavedOriginal = true;
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function renderMainPage() {
    const mainContainer = document.getElementById('main-container');
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = '';

    // Restore original HTML
    mainContainer.innerHTML = originalHTML;

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time differences

    pagesList.forEach(page => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = `${development == false ? '/dumb-ideas' : ''}/pages/${page.directory}/preview.png`;
        image.alt = page.name;

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = page.name;

        // Check if the page has an unlock date
        if (page.unlockWhen) {
            const unlockDate = new Date(page.unlockWhen);
            unlockDate.setHours(0, 0, 0, 0);
        
            if (today < unlockDate) {
                card.classList.add('locked');
                title.textContent = `Available on ${page.unlockWhen}`;
                card.onclick = () => showToast(`⚠️ "${page.name}" unlocks on ${page.unlockWhen}`);
            } else {
                card.onclick = () => {
                    clickedFromMainPage = true;
                    history.pushState(null, '', `?share=${page.path.replace('.html', '')}`);
                    loadPage(`${development == false ? '/dumb-ideas' : ''}/pages/${page.path.replace('.html', '')}`, { hideGoBack: true });
                };
            }
        } else {
            card.onclick = () => {
                clickedFromMainPage = true;
                history.pushState(null, '', `?share=${page.path.replace('.html', '')}`);
                loadPage(`${development == false ? '/dumb-ideas' : ''}/pages/${page.path.replace('.html', '')}`, { hideGoBack: true });
            };
        }

        card.appendChild(image);
        card.appendChild(title);
        grid.appendChild(card);
    });

    mainContainer.appendChild(grid);
}

function loadPages() {
    fetch(`${development == false ? '/dumb-ideas' : ''}/pages/pages.json`)
        .then(response => response.json())
        .then(pages => {
            pagesList = pages;
            saveOriginalContent();

            const sharedPage = getQueryParam('share');
            if (sharedPage) {
                const matchedPage = pages.find(p => p.path.replace('.html', '') === sharedPage);
                if (matchedPage) {
                    loadPage(`${development == false ? '/dumb-ideas' : ''}/pages/${matchedPage.path.replace('.html', '')}`, { hideGoBack: true });
                    return;
                } else {
                    showToast("❌ Shared page not found");
                }
            }

            renderMainPage();
        })
        .catch(error => console.error('Error loading pages:', error));
}

function loadPage(page, options = {}) {
    const mainContainer = document.getElementById('main-container');
    const pageContainer = document.getElementById('page-container');

    saveOriginalContent();

    mainContainer.innerHTML = '';
    pageContainer.innerHTML = '';

    // Only show Go Back button if not suppressed by options
    if (!options.hideGoBack || clickedFromMainPage == true) {
        clickedFromMainPage = false;
        
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
    }

    loadCSS(`${page}.css`);
    loadContent(`${page}.html`);
    loadScript(`${page}.js`);
}

function goBack() {
    document.querySelector('.go-back-button')?.remove();

    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());

    originalCSS.split(' ').forEach(cssFile => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    });

    renderMainPage();
}

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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.addEventListener('DOMContentLoaded', loadPages);