import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import {ProfileContext} from "../../context/profileContext";

function Tracks({track}) {
  const {state, dispatch} = useContext(ProfileContext);
  const [isFavorite, setIsFavorite] = useState(false);

  let {album, artists, href, id, name, type, external_urls, track_number} =
    track;

  if (
    state.currentProfile &&
    state.currentProfile.favoriteTracks.includes(track.id)
  ) {
    setIsFavorite(true);
  }

  function handleFavoriteButtonClick(id) {
    console.log(id);
    let favoriteToUpdate;
    let updatedFavorite;
    if (state.currentProfile.favoriteTracks.includes(id)) {
      favoriteToUpdate = "favoriteTracks";
      updatedFavorite = [...state.currentProfile.favoriteTracks].filter(
        track => track != id,
      );
    } else {
      favoriteToUpdate = "favoriteTracks";
      updatedFavorite = [...state.currentProfile.favoriteTracks, id];
    }

    setIsFavorite(prevFavorite => !prevFavorite);

    //regularPATCH
    fetch(`http://localhost:4000/currentProfile/9999/`, {
      method: "PATCH",
      body: JSON.stringify({
        favoriteTracks: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        // onHandleFavoriteClick(updatedProfile);
        console.log(updatedProfile);
      })
      .catch(error => console.log("error", error.message));
  }

  return (
    <>
      <li className="pb-2, border-b-[1px] border-slate-600 text-sm">
        {isFavorite ? (
          <PlaylistRemoveIcon onClick={handleFavoriteButtonClick} />
        ) : (
          <PlaylistAddIcon onClick={handleFavoriteButtonClick} />
        )}
        <Link to={`../track/${id}`}>{name}</Link> by{" "}
        <Link to={`../artist/${artists[0].id}`}>{artists[0].name}</Link>
      </li>
    </>
  );
}

export default Tracks;
