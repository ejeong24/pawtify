import React, {useContext, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export default function FavoriteTrackList({
  track,
  onHandleAddToPartyMix,
  partyMix,
  onRemoveFromPartyList,
}) {
  const {state, dispatch} = useContext(ProfileContext);
  function handleDeleteTrackButton() {
    // let favoriteToUpdate;

    let updatedFavorite;
    let userProfile = state.profiles.filter(
      profile => profile.id === parseInt(state.userLoggedIn),
    )[0];
    updatedFavorite = [...userProfile.favoriteTracks].filter(
      favoriteTracks => favoriteTracks != track.id,
    );

    // //regularPATCH
    fetch(`http://localhost:4000/profiles/${userProfile.id}/`, {
      method: "PATCH",
      body: JSON.stringify({
        ...userProfile,
        favoriteTracks: updatedFavorite,
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
    console.log(track.id);
    onHandleAddToPartyMix(track, "tracks");
  }
  let isInPartyList = false;
  if (partyMix) {
    isInPartyList = partyMix.includes(track);
  }

  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {track.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {track.artists[0].name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            {!isInPartyList ? (
              <button
                className="btn btn-primary justify-end"
                onClick={handleAddToPartyMix}>
                Add to party
              </button>
            ) : (
              <button className="btn btn-disabled justify-end">
                Added to party
              </button>
            )}
            <button
              className="btn justify-end"
              onClick={handleDeleteTrackButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
