import React, {useContext, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export default function PartyMix({track, onRemoveFromPartyMix, partyMix}) {
  function handleRemoveFromMixButton() {
    onRemoveFromPartyMix(track.id);
  }

  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          {track.type === "track" ? (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {track.name}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {track.artists[0].name}
              </p>
            </div>
          ) : (
            <>
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16"
                  src={track.images[2].url}
                  alt={track.name}
                />
              </div>
              <div className="flex-1 min-w-0 items-center">
                <p className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                  {track.name}
                </p>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button
              className="btn justify-end"
              onClick={handleRemoveFromMixButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
