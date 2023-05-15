import React from "react";
import {useLoaderData} from "react-router-dom";
import {getAll} from "../components/spotify";

export async function loader({params}) {
  console.log("loader called");
  const recentTracks = await getAll("recently-played");
  console.log(recentTracks);
  return {recentTracks};
}
export default function RecentlyPlayed() {
  const {recentTracks} = useLoaderData();
  console.log(recentTracks);
  return (
    <section>
      HELLO FROM RECENTLY PLAYED
      {/* {recentTracks.items.map(track => (
        <li key={track.id}>
          {track.name} | {track.artists.map(artist => `${artist.name} `)}
        </li>
      ))} */}
    </section>
  );
}
