
const itemsPerPage = 88;
const articles = document.querySelectorAll('.row > article');
const pagination = document.getElementById('custom-pagination');
const totalPages = Math.ceil(articles.length / itemsPerPage);
let currentPage = 1;

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    articles.forEach((article, index) => {
        article.style.display = (index >= start && index < end) ? '' : 'none';
    });

    renderPagination();
}

function renderPagination() {
    pagination.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&lt;';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => showPage(currentPage - 1);
    pagination.appendChild(prevBtn);

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = () => showPage(i);
        pagination.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&gt;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => showPage(currentPage + 1);
    pagination.appendChild(nextBtn);
}

showPage(1);

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    articles.forEach((article, index) => {
        article.style.display = (index >= start && index < end) ? '' : 'none';
    });

    articles[start]?.scrollIntoView({ behavior: 'smooth' });

    renderPagination();
}

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a');

    links.forEach(function (link) {
        if (link.textContent.trim() === 'Pesan') {
            link.removeAttribute('href');

            link.addEventListener('click', function (e) {
                e.preventDefault(); 
                window.location.href = 'https://elmanuk.vercel.app/paket.html';
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    if (!form) return;

    const input = form.querySelector('input[name="search"]');
    const cards = document.querySelectorAll("article");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const keyword = input.value.trim().toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector("h2").innerText.toLowerCase();
            card.style.display = title.includes(keyword) ? "block" : "none";
        });
    });
});
