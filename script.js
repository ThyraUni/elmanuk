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

document.addEventListener("DOMContentLoaded", function () {
    const filterLinks = document.querySelectorAll('#filter-buttons a');
    const allArticles = Array.from(document.querySelectorAll("article[data-category]"));
    const pagination = document.getElementById('custom-pagination');
    const itemsPerPage = 88;
    let currentPage = 1;

    function showPage(page, articles) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        allArticles.forEach(article => article.style.display = 'none'); // sembunyikan semua

        articles.forEach((article, index) => {
            if (index >= start && index < end) {
                article.style.display = '';
            }
        });

        articles[start]?.scrollIntoView({ behavior: 'smooth' });

        renderPagination(articles);
    }

    function renderPagination(articles) {
        pagination.innerHTML = '';

        const totalPages = Math.ceil(articles.length / itemsPerPage);

        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'flex';

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&lt;';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => showPage(currentPage - 1, articles);
        pagination.appendChild(prevBtn);

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);

        for (let i = start; i <= end; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');
            btn.onclick = () => showPage(i, articles);
            pagination.appendChild(btn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&gt;';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => showPage(currentPage + 1, articles);
        pagination.appendChild(nextBtn);
    }

    filterLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const filter = link.getAttribute("data-filter");

            filterLinks.forEach(btn => btn.classList.add("btn-secondary"));
            filterLinks.forEach(btn => btn.classList.remove("btn-active"));
            link.classList.remove("btn-secondary");
            link.classList.add("btn-active");

            const filteredArticles = allArticles.filter(card => {
                const category = card.getAttribute("data-category") || "";
                return filter === "all" || category.split(" ").includes(filter);
            });

            if (filter === "all") {
                showPage(1, filteredArticles); // Jalankan pagination
            } else {
                pagination.innerHTML = ''; // Kosongkan pagination
                pagination.style.display = 'none'; // Sembunyikan pagination

                allArticles.forEach(card => {
                    const category = card.getAttribute("data-category") || "";
                    card.style.display = category.split(" ").includes(filter) ? "" : "none";
                });
            }
        });
    });

    // Initial Load
    showPage(1, allArticles);
});
