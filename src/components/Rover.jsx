import {useContext} from "react";
import {ProfileContext} from "../context/profileContext";

export const baseURL = "http://localhost:4000/profiles";
export const currentURL = "http://localhost:4000/currentProfile";
export function getProfiles() {
  return fetch(baseURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export function getProfile(id) {
  return fetch(`${baseURL}/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export function getCurrentProfile() {
  return fetch(`${currentURL}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .catch(error => console.log(error.message));
}

export async function createProfile(data) {
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
export function updateProfile(id, data) {
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
//PATCH URL
export function updateCurrentProfile(data) {
  return fetch(`${currentURL}`, {
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
export function deleteProfile(id) {
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
