import { searchTracks } from "./search.mjs";
import { buildTrackCard } from "./search.mjs";
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  const tracks = await searchTracks(query);

  const list = document.getElementById("trackList");
  list.innerHTML = "";

  tracks.forEach(track => {
    const card = buildTrackCard(track);
    list.appendChild(card);
  });
});
