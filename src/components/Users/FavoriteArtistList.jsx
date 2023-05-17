import React, {useContext, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export default function FavoriteArtistList({artist, onHandleAddToPartyMix}) {
  const {state, dispatch} = useContext(ProfileContext);
  //   artist = artist.artist;

  function handleDeleteArtistButton() {
    // let favoriteToUpdate;
    let updatedFavorite;
    let userProfile = state.profiles.filter(
      profile => profile.id === parseInt(state.userLoggedIn),
    )[0];

    updatedFavorite = [...userProfile.favoriteArtists].filter(
      favoriteArtist => favoriteArtist != artist.id,
    );

    // //regularPATCH
    fetch(`http://localhost:4000/profiles/${userProfile.id}/`, {
      method: "PATCH",
      body: JSON.stringify({
        ...userProfile,
        favoriteArtists: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        dispatch({type: "UPDATE", payload: updatedProfile});
      })
      .catch(error => console.log("error", error.message));
  }
  function handleAddToPartyMix() {
    onHandleAddToPartyMix(artist, "artist");
  }
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-shrink-0">
            <img
              className="w-16 h-16"
              src={artist.images[2].url}
              alt={artist.name}
            />
          </div>
          <div className="flex-1 min-w-0 items-center">
            <p className="text-2xl font-medium text-gray-900 truncate dark:text-white">
              {artist.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button
              className="btn btn-primary justify-end"
              onClick={handleAddToPartyMix}>
              Add to party
            </button>
            <button
              className="btn justify-end"
              onClick={handleDeleteArtistButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
