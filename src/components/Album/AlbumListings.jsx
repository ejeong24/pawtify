import React, {useState, useContext} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {ProfileContext} from "../../context/profileContext";
import {rgbToHex} from "@mui/material";
import {getCurrentProfile} from "../Rover";

export async function loader() {
  const current = await getCurrentProfile();
  return {current};
}

function AlbumListings({
  album,
  current,
  favoriteAlbums,
  favoriteArtists,
  favoriteTracks,
}) {
  const {state, dispatch} = useContext(ProfileContext);
  //   const {current} = useLoaderData();
  const [isAlbumFavorite, setIsAlbumFavorite] = useState(
    favoriteAlbums.includes(album.id),
  );
  let {
    id,
    tracks,
    images,
    external_urls,
    artists,
    label,
    name,
    popularity,
    release_date,
    total_tracks,
  } = album;

  const trackListing = tracks.items.map(track => (
    <Tracks
      key={track.id}
      track={track}
      skipArtist={true}
      favoriteTracks={favoriteTracks}
    />
  ));

  function handleFavoriteAlbumButtonClick() {
    // console.log(id);

    let updatedFavorite;
    if (state.currentProfile.favoriteAlbums.includes(id)) {
      updatedFavorite = [...state.currentProfile.favoriteAlbums].filter(
        album => album != id,
      );
    } else {
      updatedFavorite = [...state.currentProfile.favoriteAlbums, id];
    }

    setIsAlbumFavorite(prevFavorite => !prevFavorite);

    // regularPATCH;
    fetch(`http://localhost:4000/currentProfile/`, {
      method: "PATCH",
      body: JSON.stringify({
        ...state.currentProfile,
        favoriteAlbums: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        dispatch({type: "UPDATECURRENT", payload: updatedProfile});
      })
      .catch(error => console.log("error", error.message));
  }
  return (
    <article className="my-6 pt-6 border-t-[1px] border-opacity-30 border-solid border-slate-600">
      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <img src={images[1].url} alt={name} />
        </div>
        <div>
          <h1 className="text-center text-3xl">
            <Link to={`../albums/${id}`}>{name}</Link>
          </h1>
          <span>Released on: {release_date}</span>
        </div>
        <div>
          {" "}
          {isAlbumFavorite ? (
            <StarIcon
              onClick={handleFavoriteAlbumButtonClick}
              sx={{fontSize: 48, color: "rgb(102, 26, 230)"}}
            />
          ) : (
            <StarOutlineIcon
              onClick={handleFavoriteAlbumButtonClick}
              sx={{fontSize: 48, color: "rgb(102, 26, 230)"}}
            />
          )}
        </div>
      </div>

      <div className="flex w-full">
        <div className="text-[18px] mr-6">Like</div>
        <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
          <span className="w-full text-[18px]">Track</span>

          <span className="justify-end text-[18px]">Length</span>
        </div>
      </div>
      {trackListing}
    </article>
  );
}

export default AlbumListings;
