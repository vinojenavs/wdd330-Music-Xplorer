import { getToken } from "./auth.mjs";

const clientID = "08d0df8ef27b4572adde7d940ac6b0b9";
const clientSecret = "88753f9306f940d2a1a8d29a98871ba5";


export async function searchTracks(query) {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    { headers: { Authorization: "Bearer " + token } }
  );
  const data = await result.json();
  return data.tracks.items;
}

export function buildTrackCard(track) {
  const div = document.createElement("div");
  div.className = "track-card";
  div.innerHTML = `
    <img src="${track.album.images[0]?.url}" alt="Album Art" width="100"><br>
    <strong>${track.name}</strong><br>
    Artist(s): ${track.artists.map(a => a.name).join(", ")}<br>
    Album: ${track.album.name}<br>
    Popularity: ${track.popularity}<br>
    <a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a>
  `;
  return div;
}

