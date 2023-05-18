import React, {useContext, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {getOne, getRecommendations} from "../spotify";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";
import {Spotify} from "styled-icons/fa-brands";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import {getCurrentProfile} from "../Rover";
export async function loader({params}) {
  const trackDetails = await getOne("tracks", params.id, "?market=US");
  //   const trackAnalysis = await getOne("analysis", params.id);
  //   const trackFeatures = await getOne("features", params.id);
  const similarMusic = await getRecommendations(
    "recommend",
    `?limit=5&seed_tracks=${params.id}`,
  );
  return {trackDetails, similarMusic};
}

function Track() {
  const {state, dispatch} = useContext(ProfileContext);
  const {trackDetails, similarMusic} = useLoaderData();
  const [isTrackFavorite, setIsTrackFavorite] = useState(false);
  let {
    id,
    name,
    album,
    artists,
    external_urls,
    duration_ms,
    popularity,
    preview_url,
    explicit,
  } = trackDetails;
  let {tracks} = similarMusic;

  const seconds = Math.floor((duration_ms / 1000) % 60);
  const minutes = Math.floor((duration_ms / 1000 / 60) % 60);
  const formattedTime = [
    minutes.toString().padStart(1, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  function handleFavoriteButtonClick() {
    console.log(id);
    // let favoriteToUpdate;
    // let updatedFavorite;
    // if (state.currentProfile.favoriteTracks.includes(id)) {
    //   console.log("already in array");
    //   updatedFavorite = [...state.currentProfile.favoriteTracks].filter(
    //     track => track != id,
    //   );
    // } else {
    //   updatedFavorite = [...state.currentProfile.favoriteTracks, id];
    // }

    let updatedFavorite;
    let userProfile = state.profiles.filter(
      profile => profile.id === parseInt(localStorage.getItem("currentUser")),
    )[0];
    if (userProfile.favoriteTracks.includes(id)) {
      updatedFavorite = [...userProfile.favoriteTracks].filter(
        track => track != id,
      );
    } else {
      updatedFavorite = [...userProfile.favoriteTracks, id];
    }

    // regularPATCH;
    fetch(`http://localhost:4000/profiles/${userProfile.id}`, {
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
    setIsTrackFavorite(prevFavorite => !prevFavorite);
  }
  return (
    <React.Fragment>
      <NavButtons />
      <article className="mx-auto">
        <div className="container flex mx-auto gap-6">
          <div>
            <img src={album.images[1].url} className="w-[300px]" />
          </div>
          <div className="flex flex-col gap-2 justify-around">
            <div className="text-3xl">Title: {name}</div>
            <div className="text-3xl">
              Album:{" "}
              <Link to={`../albums/${album.id}`}>
                {album.name} <span className="text-2xl">by</span>
              </Link>
              <Link to={`../artists/${artists[0].id}`}> {artists[0].name}</Link>
              <div className="text-xl mt-4">
                Released:{" "}
                {new Date(album.release_date).toLocaleDateString("en-US")}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>
                <a href={external_urls.spotify}>
                  <Spotify className="w-8" /> See on Spotify
                </a>
              </div>
              <div className="stats ">
                {" "}
                <div className="stat">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-title">Popularity</div>
                  <div className="stat-value text-secondary">{popularity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {preview_url} */}
        {explicit}

        <div className="flex w-full">
          <div className="mr-8">
            {isTrackFavorite ? (
              <StarIcon onClick={handleFavoriteButtonClick} />
            ) : (
              <StarOutlineIcon onClick={handleFavoriteButtonClick} />
            )}
          </div>
          <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
            <span className="w-full text-[18px]">{name}</span>
            <span className="justify-end text-[18px]">{formattedTime}</span>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
}

export default Track;
