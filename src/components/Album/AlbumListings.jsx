import React from "react";
import Tracks from "../Track/Tracks";
function AlbumListings({album}) {
  let {tracks, image, external_urls, artists, label, name, popularity,release_date, total_tracks } = album;
  const trackListing = tracks.items.map(track => (
    <Tracks key={track.id} track={track} />
  ));
  return (
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
  );
}

export default AlbumListings;
