let favorites = [];
try {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (Array.isArray(storedFavorites)) {
    favorites = storedFavorites;
  }
} catch (e) {
  console.error("Error parsing favorites from localStorage:", e);
  favorites = [];
}

export function toggleFavorite(song) {
  const exists = favorites.find(fav => fav.id === song.id);

  if (exists) {
    favorites = favorites.filter(fav => fav.id !== song.id);
  } else {
    favorites.push(song);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

export function renderFavorites() {
  const favContainer = document.getElementById("favorites");
  if (!favContainer) return;

  favContainer.innerHTML = "";
  favorites.forEach(song => {
    const div = document.createElement("div");
    div.className = "favo"
    div.innerHTML = `
      <a href="${song.external_urls.spotify}" target="_blank">
        ${song.name} by ${song.artists.map(a => a.name).join(", ")}
      </a>
      <button class="remove-btn">Remove</button>
    `;
    div.querySelector(".remove-btn").addEventListener("click", () => {
      favorites = favorites.filter(fav => fav.id !== song.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });
    favContainer.appendChild(div);
  });
}
