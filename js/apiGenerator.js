const clientID = "08d0df8ef27b4572adde7d940ac6b0b9";
const clientSecret = "88753f9306f940d2a1a8d29a98871ba5";

async function getToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(clientID + ":" + clientSecret)
      },
      body: "grant_type=client_credentials",  
    });
    const data = await result.json();
    console.log("Token", data.access_token);
    return data.access_token;
}

async function searchTrack(name) {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track`,
    { headers: { Authorization: "Bearer " + token } }
  );
  const data = await result.json();
  console.log("Search result:", data.tracks.items[0]);
  return data.tracks.items[0].id; // Grab the first track ID
}

async function getTrackDetails(trackId) {
    const token = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: "Bearer " + token }
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

(async () => {
  const trackId = await searchTrack("Last Last Burna Boy");
  await getTrackDetails(trackId);
})();

