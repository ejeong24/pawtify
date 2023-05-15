import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ProfileContext} from "../context/profileContext";

function Card({card, onHandleFavoriteClick}) {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(ProfileContext);
  console.log(state);

  let {
    id,
    images,
    name,
    release_date,
    uri,
    artists,
    href,
    external_urls,
    type,
  } = card;

  function handleFavoriteButtonClick(type, id) {
    let favoriteToUpdate;
    let updatedFavorite;
    switch (type) {
      case "album":
        if (favoriteAlbums.includes(id)) {
          updatedFavorite = [...favoriteAlbums].filter(album => album != id);
          favoriteToUpdate = "favoriteAlbums";
        } else {
          favoriteToUpdate = "favoriteAlbums";
          updatedFavorite = [...favoriteAlbums, id];
        }
        break;
      case "artist":
        if (favoriteArtists.includes(id)) {
          favoriteToUpdate = "favoriteArtists";
          updatedFavorite = [...favoriteArtists].filter(artist => artist != id);
        } else {
          favoriteToUpdate = "favoriteArtists";
          updatedFavorite = [...favoriteArtists, id];
        }
      case "track":
        if (favoriteTracks.includes(id)) {
          favoriteToUpdate = "favoriteTracks";
          updatedFavorite = [...favoriteTracks].filter(track => track != id);
        } else {
          favoriteToUpdate = "favoriteTracks";
          updatedFavorite = [...favoriteTracks, id];
        }
    }
    setIsFavorite(prevFavorite => !prevFavorite);

    //regularPATCH
    fetch(`http://localhost:4000/profiles/${currentProfile.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...currentProfile,
        [favoriteToUpdate]: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        onHandleFavoriteClick(updatedProfile);
      })
      .catch(error => console.log("error", error.message));
  }

  return (
    <div className="card card-compact w-96 glass shadow-xl hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-in-out">
      <figure>
        <img src={images[1].url} alt={artists[0].name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`../albums/${card.id}`}>{name}</Link>
        </h2>
        <h3>
          {artists.map(artist => (
            <Link to={`../artists/${artist.id}`} key={artist.id}>
              {artist.name}{" "}
            </Link>
          ))}
        </h3>
        <div className="card-actions justify-center items-base">
          <button
            className="btn btn-primary"
            onClick={() => handleFavoriteButtonClick(type, id)}>
            {/* {isFavorite ? "Remove from favorites" : "Add to favorites"} */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
