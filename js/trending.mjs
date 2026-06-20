import { searchTracks } from "./search.mjs";
import { toggleFavorite } from "./favorites.mjs";

export async function trending() {
  const fixedQuery = "trending";
  const tracks = await searchTracks(fixedQuery);

  function createPlaylist(query, tracks) {
    const list = document.getElementById(query);
    list.innerHTML = "";
    tracks.forEach(track => {
      const card = buildTrackTemplate(track);
      list.appendChild(card);
    });
  }

  createPlaylist(fixedQuery, tracks);
}

function buildTrackTemplate(track) {
  const card = document.createElement("div");
  card.className = "track-card";
  card.innerHTML = `
    <a href="${track.external_urls.spotify}" target="_blank">
    <img src="${track.album.images[0]?.url}" alt="Album Art" width="100"><br>
    <p><strong>${track.name}</strong></p>
    <p>Artist(s): ${track.artists.map(a => a.name).join(", ")}</p>
    <p>Album: ${track.album.name}</p>
    </a>
    <button class="fav-btn">Add to favorite</button>
      `;
  card.querySelector(".fav-btn").addEventListener("click", () => {
    toggleFavorite(track)
  })
  return card;
}
