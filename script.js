
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

    // ← Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&lt;';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => showPage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Determine range of page numbers
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

    // → Next Button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&gt;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => showPage(currentPage + 1);
    pagination.appendChild(nextBtn);
}

// Initialize
showPage(1);

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    articles.forEach((article, index) => {
        article.style.display = (index >= start && index < end) ? '' : 'none';
    });

    // Scroll ke artikel teratas dari halaman baru
    articles[start]?.scrollIntoView({ behavior: 'smooth' });

    renderPagination();
}

document.addEventListener('DOMContentLoaded', function () {
    // Ambil semua elemen <a>
    const links = document.querySelectorAll('a');

    links.forEach(function (link) {
        // Cek jika teks dalam tag <a> adalah "Pesan"
        if (link.textContent.trim() === 'Pesan') {
            // Hapus href lama
            link.removeAttribute('href');

            // Tambahkan event klik untuk arahkan ke URL baru
            link.addEventListener('click', function (e) {
                e.preventDefault(); // Cegah link lama
                window.location.href = 'https://elmanuk.vercel.app/paket.html'; // Arahkan ke link baru
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form[action="/tema.html"]');
    const input = form.querySelector('input[name="search"]');
    const cards = document.querySelectorAll("article");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Mencegah form refresh halaman

        const keyword = input.value.trim().toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector("h2").innerText.toLowerCase();

            // Tampilkan jika cocok, sembunyikan jika tidak
            if (title.includes(keyword)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
