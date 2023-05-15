import React, {useEffect, useState} from "react";
import {useLoaderData, Link} from "react-router-dom";
import Tracks from "../Track/Tracks";

function Playlists({playlist}) {
  return (
    <Link to={`../playlists/${playlist.id}`}>
      <div className="card max-w-[480px] bg-base-100 shadow-xl hover:transition-transform hover:scale-105 hover:ease-in-out hover:duration-300">
        <figure>
          <img src={playlist.images[0].url} alt={playlist.name} width="360px" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{playlist.name}</h2>
          <h4>{playlist.description}</h4>
        </div>
      </div>
    </Link>
  );
}

export default Playlists;
