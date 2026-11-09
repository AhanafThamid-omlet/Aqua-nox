/* navbar.js - one navigation bar for every page.
   Edit the links or icons here once and all pages update. */

(function () {
  const links = [
    { text: "Marine",     href: "marine.html" },
    { text: "Freshwater", href: "freshwater.html" },
    { text: "Foods",                   href: "foods.html" },
    { text: "Aquariums &amp; Supplies", href: "aquariums_and_supplies.html" },
    { text: "Store",                   href: "store.html" }
  ];

  // which page are we on? (index.html when the address ends with "/")
  const current = location.pathname.split("/").pop() || "index.html";

  const menuLinks = links.map(l =>
    `<a href="${l.href}"${l.href === current ? ' class="active" aria-current="page"' : ""}>${l.text}</a>`
  ).join("");

  const html = `
  <nav class="navbar" id="navbar">
  
    <a class="name" href="index.html">Aqua.nox</a>

    <div class="menu" id="menu">${menuLinks}</div>

    <div class="contact-links">

        <a href="" target="_blank">
            <img src="images/search.png" alt="search logo" width="20" height="20">
        </a>

        <a href="" target="_blank">
            <img src="images/customer.png" alt="profile logo" width="20" height="20">
        </a>
        
        <a href="" target="_blank">
            <img src="images/cart.png" alt="cart logo" width="20" height="20">
        </a>
    </div>

    <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu">
      <span></span><span></span><span></span>
    </button>
    
  </nav>`;

  document.body.insertAdjacentHTML("afterbegin", html);

  // hamburger (phones)
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
})();