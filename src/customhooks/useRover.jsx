import {useEffect, useState} from "react";
// set a reducer function here for all of this??

function useRoverToGet(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("data");
        setData(data);
        setIsLoaded(true);
      })
      .catch(error => console.log(error.message));
  }, [url]);
  return {data, isLoaded};
}

function useRoverToPost(url, data) {
  useEffect(() =>
    //POST URL
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => console.log(error.message)),
  ),
    [];
}

function useRoverToPatch(url, data) {
  useEffect(() =>
    //POST URL
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => console.log(error.message)),
  ),
    [];
}

function useRoverToDelete(url) {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error.message)),
    [];
}

export {useRoverToGet, useRoverToPost, useRoverToPatch, useRoverToDelete};
