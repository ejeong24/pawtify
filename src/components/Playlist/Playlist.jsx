import React, {useContext} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";
import {getOne} from "../spotify";

import {Users as Followers} from "@styled-icons/fa-solid/Users";
import {Spotify} from "@styled-icons/fa-brands/Spotify";
import {getCurrentProfile} from "../Rover";
export async function loader({params}) {
  const playlistInfo = await getOne("playlists", params.id, "?market=US");
  const current = await getCurrentProfile();
  return {playlistInfo, current};
}
function Playlist() {
  const {playlistInfo, current} = useLoaderData();
  let {description, images, name, followers, tracks, external_urls} =
    playlistInfo;
  const trackListing = tracks.items.map(track => (
    <Tracks key={track.track.id} track={track.track} />
  ));
  return (
    <article className="container mx-auto max-w-3xl">
      <header className="flex">
        <figure>
          <img src={images[0].url} alt="Movie" className="w-48" />
        </figure>
        <div className="card-body">
          <h2 className="text-5xl">{name}</h2>
          <p>{description}</p>
          <div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Followers className="w-4" />
                </div>
                <div className="stat-title">Followers</div>
                <div className="stat-value text-primary">
                  {followers.total.toLocaleString()}
                </div>
              </div>
            </div>
            <a href={external_urls.spotify}>
              <Spotify className="w-8 ml-10" /> See on Spotify
            </a>
          </div>
        </div>
      </header>
      <article className="mt-6 pt-6 border-t-[1px] border-opacity-30 border-solid border-slate-600">
        <div className="flex w-full">
          <div className="text-[18px] mr-6">Like</div>
          <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
            <span className="w-1/2 text-[18px]">Track</span>
            <span className="w-1/3 text-[18px]">Artist</span>
            <span className="justify-end text-[18px]">Length</span>
          </div>
        </div>
        {trackListing}
      </article>
    </article>
  );
}

export default Playlist;
