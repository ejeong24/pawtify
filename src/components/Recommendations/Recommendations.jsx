import React, {useState, useContext} from "react";
import {Link, redirect, useLoaderData} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {ProfileContext} from "../../context/profileContext";
export async function loader() {
  if (state.userLoggedIn === 0) {
    return redirect("/login");
  } else {
    const current = await getCurrentProfile(state.userLoggedIn);
  }

  return {current};
}

function Recommendations({track}) {
  const {state, dispatch} = useContext(ProfileContext);
  const {current} = useLoaderData();
  
  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];
  const [isTrackFavorite, setIsTrackFavorite] = useState(
    userProfile.favoriteTracks.includes(track.id),
  );

  let {artists, id, name, duration_ms, album} = track;
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
    let userProfile = state.profiles.filter(
      profile => profile.id === parseInt(localStorage.getItem("currentUser")),
    )[0];
    console.log(userProfile);
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
        <div className="mr-8">
          {isTrackFavorite ? (
            <StarIcon onClick={handleFavoriteButtonClick} />
          ) : (
            <StarOutlineIcon onClick={handleFavoriteButtonClick} />
          )}
        </div>
        <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
          <>
            <img src={album.images[1].url} alt={track.name} width="100px" />
            <span className="w-1/2">
              <Link to={`../tracks/${id}`}>{name}</Link>
            </span>
            <span className="w-1/3">
              <Link to={`../artists/${artists[0].id}`}>{artists[0].name}</Link>
            </span>
            <span className="justify-end">{formattedTime}</span>
          </>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Recommendations;
