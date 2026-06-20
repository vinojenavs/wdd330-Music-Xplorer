import { searchTracks } from "./search.mjs";

export async function playlist() {
    const fixedQuery1 = "davido";
    const tracks1 = await searchTracks(fixedQuery1);

    const fixedQuery2 = "wizkid";
    const tracks2 = await searchTracks(fixedQuery2);

    const fixedQuery3 = "burnaboy";
    const tracks3 = await searchTracks(fixedQuery3);

    function createPlaylist(query, tracks) {
        const list = document.getElementById(query);
        list.innerHTML = "";
        tracks.forEach(track => {
            const card = buildListTemplate(track);
            list.appendChild(card);
        });
    }

    createPlaylist(fixedQuery1, tracks1);
    createPlaylist(fixedQuery2, tracks2);
    createPlaylist(fixedQuery3, tracks3);
}

function buildListTemplate(track) {
  const playlist = document.createElement('div');
  playlist.className = "lists"
  playlist.innerHTML = `
  <a href="${track.external_urls.spotify}" target="_blank">
    <img src="${track.album.images[0]?.url}" alt="Album Art" width="10"><br>
    <p><strong>${track.name}</strong></p>
    <p>Artist(s): ${track.artists.map(a => a.name).join(", ")}</p>
    <p>Album: ${track.album.name}</p>
    </a>
  `;
  return playlist;
}
