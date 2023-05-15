import {Buffer} from "buffer";
import {clientId, clientSecret} from "./config";
export async function getANewToken() {
  console.log("getting a new token");
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      Authorization:
        `Basic ` +
        new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: params,
  })
    .then(response => response.json())
    .then(token => {
      localStorage.setItem("access_token", token.access_token);
      const expiresAt = Date.now() + 3500;
      localStorage.setItem("expiresAt", expiresAt);
    });
}

// export async function redirectToAuthCodeFlow(clientId) {
//   const verifier = generateCodeVerifier(128);
//   const challenge = await generateCodeChallenge(verifier);

//   localStorage.setItem("verifier", verifier);

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("response_type", "code");
//   params.append("redirect_uri", "http://localhost:5173/home");
//   params.append(
//     "scope",
//     "user-read-private user-read-email app-remote-control streaming playlist-read-private user-top-read user-read-recently-played user-read-playback-position user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing",
//   );
//   params.append("code_challenge_method", "S256");
//   params.append("code_challenge", challenge);
//   // DONE: Redirect to Spotify authorization page
//   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }
// export async function getAccessToken(clientId, code) {
//   // TODO: Get access token for code
//   const verifier = localStorage.getItem("verifier");
//   console.log("here! waves");
//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", "http://localhost:5173/home");
//   params.append("code_verifier", verifier);

//   const result = await fetch(`https://accounts.spotify.com/api/token`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//     },
//     body: params,
//   });
//   console.log(result);
//   const {access_token} = await result.json();
//   localStorage.setItem("access_token", access_token);
//   return access_token;
// }
// function generateCodeVerifier(length) {
//   let text = "";
//   let possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// export async function generateCodeChallenge(codeVerifier) {
//   const data = new TextEncoder().encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }
