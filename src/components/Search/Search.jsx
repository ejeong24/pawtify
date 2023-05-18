import React, {useState, useEffect, useContext} from "react";
import {useLoaderData, redirect} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
import {getCurrentProfile} from "../Rover";
import TracksResults from "./TracksResults";
export async function loader({params}) {
  if (parseInt(localStorage.getItem("currentUser")) === 0) {
    return redirect("../login");
  }
  const {current} = getCurrentProfile(
    parseInt(localStorage.getItem("currentUser")),
  );
  return {current};
}
function Searcher() {
  const {state, dispatch} = useContext(ProfileContext);
  const {current} = useLoaderData();
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const access_token = localStorage.getItem("access_token");

  const searchPawtify = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchKey}&market=US&type=album,artist,track&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      const data = await response.json().then(data => {
        setTracks(data.tracks.items);
        setAlbums(data.albums.items);
        setArtists(data.artists.items);
      });
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <>
      <div className="SearchForm mx-auto flex">
        <input
          className="Name w-[500px] h-12 my-4 px-4 rounded-full"
          type="text"
          placeholder="Search By Artist Name ..."
          onChange={e => {
            setSearchKey(e.target.value);
          }}
        />
        <button className="btn btn-accent my-4 ml-4" onClick={searchPawtify}>
          Search
        </button>
      </div>

      <div className="grid grid-cols-4 mx-auto">
        <div className="card">
          {tracks && tracks.length > 0 ? (
             tracks.map(track => (
             <TracksResults key={track.id} track={track} />
             ))
            ) : ("nothing here")}
        </div>
        <div className="card">{/* <ul>{displayArtists}</ul> */}</div>
        <div className="card">{/* <ul>{displayAlbums}</ul> */}</div>
      </div>
    </>
  );
}

export default Searcher;
