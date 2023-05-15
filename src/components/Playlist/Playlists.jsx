import React, {useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";
import Tracks from "../Track/Tracks";

export async function loader({params}) {
  //   const tracks = await getOne(
  //     "playlistTracks",
  //     params.id,
  //     "/tracks?offset=0&limit=20",
  //   );
  //   return {tracks};
}

function Playlists({playlist}) {
  const {tracks} = useLoaderData();

  const [trackList, setTrackList] = useState({});
  let displayTracks = [];
  let showDisplayTracks;
  useEffect(() => {
    //regularGET
    let access_token = localStorage.getItem("access_token");
    fetch(`${playlist.tracks.href}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${access_token}`},
    })
      .then(resp => resp.json())
      .then(trackList => setTrackList(trackList))
      .catch(error => console.log("error", error.message));
  }, []);
  if (trackList.items) {
    for (let i = 0; i < 10; i++) {
      displayTracks.push(trackList.items[i]);
    }
    showDisplayTracks = displayTracks.map(track => (
      <Tracks
        key={track.track.id !== null ? track.track.id : index}
        track={track.track}
      />
    ));
  }

  return (
    <div className="card max-w-[480px] bg-base-100 shadow-xl">
      <figure>
        <img src={playlist.images[0].url} alt={playlist.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{playlist.name}</h2>
        <h4>{playlist.description}</h4>
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-0 px-0">
          <div className="collapse-title text-xl font-medium">Tracks</div>
          <div className="collapse-content mx-0 px-0">
            <ol>{showDisplayTracks ? showDisplayTracks : "Nothing Here"}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
