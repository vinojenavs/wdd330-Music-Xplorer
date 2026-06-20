import { getToken } from "./auth.mjs";

export async function searchTracks(query) {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    { headers: { Authorization: "Bearer " + token } }
  );
  const data = await result.json();
  if (!data.tracks) {
    console.error("Spotify API error:", data);
    return [];
  }
  return data.tracks.items;
}


//Popularity: ${track.popularity}<br></br>