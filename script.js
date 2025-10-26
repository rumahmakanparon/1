// ====== Dark mode handling ======
const body = document.body;
const darkToggle = document.getElementById("darkToggle");

// apply saved preference on load
const savedTheme = localStorage.getItem("theme"); // "dark" or "light" or null
if (savedTheme === "dark") {
  body.classList.add("dark");
  darkToggle && darkToggle.setAttribute("aria-pressed", "true");
} else if (savedTheme === "light") {
  body.classList.remove("dark");
  darkToggle && darkToggle.setAttribute("aria-pressed", "false");
} else {
  // no saved preference -> we can try to use prefers-color-scheme
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    body.classList.add("dark");
    darkToggle && darkToggle.setAttribute("aria-pressed", "true");
  }
}

// toggle listener
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    darkToggle.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ====== Menu rendering & WhatsApp link ======
const menuData = [
  { name: "Fuyunghai", desc: "fuyunghai", price: 20000, img: "fuyunghai.png", category: "makanan" },
  { name: "TEh", desc: "TEh", price: 12000, img: "teh.png", category: "minuman" },
];

const menuGrid = document.getElementById("menuGrid");
const categories = document.querySelectorAll(".category");

function renderMenu(filter = "all") {
  menuGrid.innerHTML = "";
  const filtered = menuData.filter(item => filter === "all" || item.category === filter);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price">Rp ${item.price.toLocaleString("id-ID")}</div>
        <span class="status">Pre Order</span>
        <button class="btn-add">+ Pesan</button>
      </div>
    `;
    menuGrid.appendChild(card);

    // WhatsApp button behavior
    const btnPesan = card.querySelector(".btn-add");
    btnPesan.addEventListener("click", () => {
      const nomorWA = "6281230044881"; // GANTI dengan nomor kamu (format: 62xxxx)
      const pesan = `Halo, saya mau pesan ${item.name} seharga Rp ${item.price.toLocaleString("id-ID")}`;
      const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
      window.open(url, "_blank");
    });
  });
}

categories.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category.active").classList.remove("active");
    btn.classList.add("active");
    renderMenu(btn.dataset.filter);
  });
});

renderMenu();
