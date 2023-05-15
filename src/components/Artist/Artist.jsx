import React, {useContext} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";
import {getOne, getRecommendations} from "../spotify";
import AlbumListings from "../Album/AlbumListings";
import {Users as Followers} from "@styled-icons/fa-solid/Users";
import {Spotify} from "@styled-icons/fa-brands/Spotify";
export async function loader({params}) {
  const artistInfo = await getOne("artists", params.id, "?market=US");
  const artistAlbums = await getOne("artists", params.id, "/albums?market=US");
  const arrayOfAlbums = artistAlbums.items.map(album => album.id).join(",");
  const allTracks = await getRecommendations(
    "albums",
    `?ids=${arrayOfAlbums}&market=US`,
  );
  return {artistInfo, artistAlbums, arrayOfAlbums, allTracks};
}
function Artist() {
  const {artistInfo, artistAlbums, arrayOfAlbums, allTracks} = useLoaderData();
  let {images, name, followers, genres, external_urls, popularity} = artistInfo;
  let {items} = artistAlbums;
  let {albums} = allTracks;
  // const trackListing = tracks.items.map(track => (
  //   <Tracks key={track.id} track={track} />
  // ));
 const albumsAndTracksList = albums.map(album=>(
  <AlbumListings key={album.id} album={album} />
 ))
  return (
    <article className="container mx-auto max-w-3xl">
      <header className="flex">
        <figure>
          <img src={images[0].url} alt="Movie" className="w-48" />
        </figure>
        <div className="card-body">
          <h2 className="text-5xl">{name}</h2>
          <p></p>
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
