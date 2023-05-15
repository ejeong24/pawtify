export const spotifyAPI = "https://api.spotify.com/v1";
const endpoints = {
  recentlyPlayed: "/me/player/recently-played",
  artist: "/artists",
  artists: "/artists",
  newReleases: "/browse/new-releases",
  browse: "/browse/categories?country=US&local=en_US",
  category: "/browse/categories",
  playlists: `/playlists`,
  featured: "/browse/featured-playlists?country=US&locale=en_US",
};

export function getAll(endpoint) {
  // console.log(endpoints[endpoint]);
  let access_token = localStorage.getItem("access_token");
  return fetch(`${spotifyAPI}${endpoints[endpoint]}`, {
    method: "GET",
    headers: {Authorization: `Bearer ${access_token}`},
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export function getOne(endpoint, id, extension = "") {
  let access_token = localStorage.getItem("access_token");
  return fetch(`${spotifyAPI}${endpoints[endpoint]}/${id}${extension}`, {
    method: "GET",
    headers: {Authorization: `Bearer ${access_token}`},
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export function getDirect(url) {
  let access_token = localStorage.getItem("access_token");
  return fetch(`${url}?offset=0&limit=20`, {
    method: "GET",
    headers: {Authorization: `Bearer ${access_token}`},
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export function createOne(data) {
  return fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

//PATCH URL
export function updateOne(id, data) {
  return fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

//DELETE URL
export function deleteOne(id) {
  console.log(id);
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}
