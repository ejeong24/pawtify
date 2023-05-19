import React, {useState, useContext} from "react";
import {Link, redirect, useLoaderData, useParams} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {ProfileContext} from "../../context/profileContext";
import {getCurrentProfile} from "../Rover";

function TracksResults({track, skipArtist}) {
  const {state, dispatch} = useContext(ProfileContext);

  //refers to the user that is logged in. userProfile becomes representative of whichever profile is logged in.
  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];

  const [isTrackFavorite, setIsTrackFavorite] = useState(
    userProfile.favoriteTracks.includes(track.id),
  );

  //these are the items that we are going to display on the page when the search comes back. For Artists we will do Artist name with small image and for Album we will do album name, artist name, and album image
  let {artists, id, name, duration_ms} = track;
  //below is formating time from milliseconds to hours, minutes, seconds
  const seconds = Math.floor((duration_ms / 1000) % 60);
  const minutes = Math.floor((duration_ms / 1000 / 60) % 60);
  const formattedTime = [
    minutes.toString().padStart(1, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  function handleFavoriteButtonClick() {
    console.log(id);
    // let favoriteToUpdate;

    let updatedFavorite;
    //determines if it is already a favorite or not
    if (userProfile.favoriteTracks.includes(id)) {
      console.log("already in array");
      updatedFavorite = [...userProfile.favoriteTracks].filter(
        track => track != id,
      );
    } else {
      console.log("not in array");
      updatedFavorite = [...userProfile.favoriteTracks, id];
    }

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
    setIsTrackFavorite(prevFavorite => !prevFavorite);
  }

  return (
    <React.Fragment>
      <div className="flex w-full">
        <div className="ml-8">
          {isTrackFavorite ? (
            <StarIcon onClick={handleFavoriteButtonClick} />
          ) : (
            <StarOutlineIcon onClick={handleFavoriteButtonClick} />
          )}
        </div>
        <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
          {skipArtist ? (
            <>
              <span className="w-full text-[18px]">{name}</span>
              <span className="justify-end text-[18px]">{formattedTime}</span>
            </>
          ) : (
            <>
              <span className="w-1/2">
                <Link to={`../tracks/${id}`}>{name}</Link>
              </span>
              <span className="w-1/3">
                <Link to={`../artists/${artists[0].id}`}>
                  {artists[0].name}
                </Link>
              </span>
              <span className="justify-end">{formattedTime}</span>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default TracksResults;
