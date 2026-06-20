import { searchTracks } from "./search.mjs";
import { loadHeaderFooter } from "./headerfooter.mjs";
import { playlist } from "./playlists.mjs";

async function init() {
  await loadHeaderFooter();

  const hamButton = document.getElementById("ham-btn");
  const navigation = document.getElementById("nav-Btn");
  hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
    navigation.classList.toggle('show');
  })

  //Waits for header and footer to exist, so listeners can be attached
  const searchButton = document.getElementById("searchBtn");
  if (searchButton) {
    searchButton.addEventListener("click", async () => {
      const query = document.getElementById("searchInput").value;
      const tracks = await searchTracks(query);
      const list = document.getElementById("trackList");
      list.innerHTML = "";
      tracks.forEach(track => {
        const card = buildTrackTemplate(track);
        list.appendChild(card);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", init);

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
  `;
  return card;
}

const plcon = document.getElementById("playlist");

if (plcon) {
  playlist();
}

const carousel = document.querySelector('.news-carousel');

if (carousel) {
  function autoScroll() {
    carousel.scrollLeft += 1;
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
    }
  }

  setInterval(autoScroll, 20);
}
