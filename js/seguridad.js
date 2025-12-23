document.addEventListener("DOMContentLoaded", () => {
  fetch("https://raw.githubusercontent.com/jhonnmv19/tecnologia_web_I/main/Json/seguridad.json")
    .then(response => response.json())
    .then(data => {

      // HERO
      document.getElementById("heroTitulo").textContent = data.hero.titulo;
      document.getElementById("heroDescripcion").textContent = data.hero.descripcion;

      // CARDS
      const cardsContainer = document.getElementById("seguridadCards");
      data.cards.forEach(card => {
        cardsContainer.innerHTML += `
          <div class="card">
            <div class="card-content">
              <h3 class="card-title">${card.icono} ${card.titulo}</h3>
              <p class="card-description">${card.descripcion}</p>
            </div>
          </div>
        `;
      });

      // NORMAS
      cargarLista("listaPermitido", data.normas.permitido);
      cargarLista("listaNoPermitido", data.normas.no_permitido);
      cargarLista("listaRecomendaciones", data.normas.recomendaciones);

    })
    .catch(error => console.error("Error cargando seguridad.json:", error));
});

function cargarLista(id, items) {
  const ul = document.getElementById(id);
  items.forEach(texto => {
    ul.innerHTML += `<li>${texto}</li>`;
  });
}
