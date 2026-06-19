import { searchTracks } from "./search.mjs";
//import { buildTrackCard } from "./search.mjs";
const searchButton = document.getElementById("searchBtn");

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
