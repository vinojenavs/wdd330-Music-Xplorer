const clientID = "08d0df8ef27b4572adde7d940ac6b0b9";
const clientSecret = "88753f9306f940d2a1a8d29a98871ba5";

export async function getToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientID + ":" + clientSecret)
    },
    body: "grant_type=client_credentials"
  });
  const data = await result.json();
  return data.access_token;
}

