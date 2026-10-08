/*
  AC NEW — catálogo inicial
  CAMBIA SOLO estas partes al comenzar:
  1) whatsapp: tu número con código de país, sin + ni espacios.
  2) productos: nombres, precios, fotos y stock.
*/

const whatsapp = "573001234567"; // <-- REEMPLAZA ESTE NÚMERO

const productos = [
  {
    id: 1,
    marca: "TISSOT",
    nombre: "PRX Digital",
    categoria: "Relojes",
    precio: 1299000,
    stock: 1,
    imagen: "images/tissot.jpg"
  },
  {
    id: 2,
    marca: "MICHAEL KORS",
    nombre: "Jet Set Travel Wristlet",
    categoria: "Accesorios",
    precio: 199000,
    stock: 1,
    imagen: "images/mk-wristlet.jpg"
  },
  {
    id: 3,
    marca: "MICHAEL KORS",
    nombre: "Jet Set Coin Pouch",
    categoria: "Accesorios",
    precio: 149000,
    stock: 1,
    imagen: "images/mk-coin-pouch.jpg"
  },
  {
    id: 4,
    marca: "MICHAEL KORS",
    nombre: "Cooper Card Case",
    categoria: "Accesorios",
    precio: 139000,
    stock: 1,
    imagen: "images/mk-card-case.jpg"
  },
  {
    id: 5,
    marca: "MICHAEL KORS",
    nombre: "Jet Set Small Crossbody",
    categoria: "Bolsos",
    precio: 329000,
    stock: 1,
    imagen: "images/mk-crossbody.jpg"
  }
];

const grid = document.getElementById("product-grid");

function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts(filter = "Todos") {
  const visibles = productos.filter(p =>
    filter === "Todos" || p.categoria === filter
  );

  grid.innerHTML = visibles.map(p => {
    const agotado = p.stock <= 0;

    return `
      <article class="product-card ${agotado ? "sold" : ""}">
        <div class="product-image">
          ${agotado ? '<span class="badge">Agotado</span>' : '<span class="badge">1 unidad</span>'}
          <img src="${p.imagen}" alt="${p.marca} ${p.nombre}" loading="lazy"
               onerror="this.style.display='none'">
        </div>
        <div class="product-info">
          <div class="product-brand">${p.marca}</div>
          <div class="product-name">${p.nombre}</div>
          <div class="product-price">${money(p.precio)}</div>
          <div class="product-stock">${agotado ? "Agotado" : `${p.stock} unidad disponible`}</div>
          ${
            agotado
              ? '<button class="interest" disabled>AGOTADO</button>'
              : `<button class="interest" onclick="interest(${p.id})">ME INTERESA</button>`
          }
        </div>
      </article>
    `;
  }).join("");
}

function interest(id) {
  const p = productos.find(item => item.id === id);
  if (!p || p.stock <= 0) return;

  const message = `Hola AC NEW, estoy interesado en el ${p.marca} ${p.nombre}.`;
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.getElementById("general-whatsapp").href =
  `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola AC NEW, quiero conocer los productos disponibles.")}`;

renderProducts();
