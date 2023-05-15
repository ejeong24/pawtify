import React, {useContext} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";
import {getOne} from "../spotify";

import {Users as Followers} from "@styled-icons/fa-solid/Users";
export async function loader({params}) {
  const playlistInfo = await getOne("playlists", params.id, "?market=US");
  return {playlistInfo};
}
function Playlist() {
  const {playlistInfo} = useLoaderData();
  let {description, images, name, followers, tracks} = playlistInfo;

  return (
    <article className="container mx-auto">
      <header className="flex">
        <figure>
          <img src={images[0].url} alt="Movie" className="w-48" />
        </figure>
        <div className="card-body">
          <h2 className="text-5xl">{name}</h2>
          <p>{description}</p>
          <div className="justify-end">
            <Followers className="w-4" /> {followers.total}
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </header>
    </article>
  );
}

export default Playlist;
