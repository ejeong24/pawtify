import React, {useContext, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";
import {getOne, getRecommendations} from "../spotify";
import AlbumListings from "../Album/AlbumListings";
import {Users as Followers} from "@styled-icons/fa-solid/Users";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {Spotify} from "@styled-icons/fa-brands/Spotify";
import {getCurrentProfile} from "../Rover";
import {ProfileContext} from "../../context/profileContext";

export async function loader({params}) {
  const artistInfo = await getOne("artists", params.id, "?market=US");
  const artistAlbums = await getOne("artists", params.id, "/albums?market=US");
  const arrayOfAlbums = artistAlbums.items.map(album => album.id).join(",");
  const allTracks = await getRecommendations(
    "albums",
    `?ids=${arrayOfAlbums}&market=US`,
  );
  const current = await getCurrentProfile();
  return {artistInfo, artistAlbums, arrayOfAlbums, allTracks, current};
}

function Artist() {
  const {state, dispatch} = useContext(ProfileContext);

  const {artistInfo, artistAlbums, arrayOfAlbums, allTracks, current} =
    useLoaderData();
  const [isFavoriteArtist, setIsFavoriteArtist] = useState(
    current.favoriteArtists.includes(artistInfo.id),
  );
  let {images, name, followers, genres, external_urls, popularity, id} =
    artistInfo;
  let {items} = artistAlbums;
  let {albums} = allTracks;
  let {favoriteArtists, favoriteTracks, favoriteAlbums} = current;

  // const trackListing = tracks.items.map(track => (
  //   <Tracks key={track.id} track={track} />
  // ));
  const albumsAndTracksList = albums.map(album => (
    <AlbumListings
      key={album.id}
      album={album}
      favoriteAlbums={favoriteAlbums}
      favoriteTracks={favoriteTracks}
      favoriteArtists={favoriteArtists}
    />
  ));

  function handleFavoriteButtonClick() {
    // let favoriteToUpdate;
    let updatedFavorite;
    if (state.currentProfile.favoriteArtists.includes(id)) {
      updatedFavorite = [...state.currentProfile.favoriteArtists].filter(
        track => track != id,
      );
    } else {
      updatedFavorite = [...state.currentProfile.favoriteArtists, id];
    }

    // //regularPATCH
    fetch(`http://localhost:4000/currentProfile/`, {
      method: "PATCH",
      body: JSON.stringify({
        ...state.currentProfile,
        favoriteArtists: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        dispatch({type: "UPDATECURRENT", payload: updatedProfile});
      })
      .catch(error => console.log("error", error.message));
    setIsFavoriteArtist(prevFavorite => !prevFavorite);
  }
  return (
    <article className="container mx-auto max-w-3xl">
      <header className="flex">
        <figure>
          <img src={images[0].url} alt="Movie" className="w-48" />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl flex items-center">
            {name}{" "}
            {isFavoriteArtist ? (
              <StarIcon
                onClick={handleFavoriteButtonClick}
                sx={{fontSize: 40}}
              />
            ) : (
              <StarOutlineIcon
                onClick={handleFavoriteButtonClick}
                sx={{fontSize: 40}}
              />
            )}
          </h2>
          <p>Popularity: {popularity}</p>
          <div>
            <a href={external_urls.spotify}>
              <Spotify className="w-8" /> See on Spotify
            </a>
          </div>
        </div>
      </header>
      <article className="mt-6 pt-6 border-t-[1px] border-opacity-30 border-solid border-slate-600">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-center text-3xl">Album Title</h1>
          <span>Released on:</span>
        </div>
        <div className="flex w-full">
          <div className="text-[18px] mr-6">Like</div>
          <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
            <span className="w-full text-[18px]">Track</span>

            <span className="justify-end text-[18px]">Length</span>
          </div>
        </div>
        {/* {trackListing} */}
      </article>
      {albumsAndTracksList}
    </article>
  );
}

export default Artist;
