import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import {ProfileContext} from "../../context/profileContext";

function Tracks({track}) {
  const {state, dispatch} = useContext(ProfileContext);
  const [isFavorite, setIsFavorite] = useState(false);

  //   {
  //     "album": {
  //         "album_type": "single",
  //         "artists": [
  //             {
  //                 "external_urls": {
  //                     "spotify": "https://open.spotify.com/artist/2fgl3me4n9diODTrVfruF3"
  //                 },
  //                 "href": "https://api.spotify.com/v1/artists/2fgl3me4n9diODTrVfruF3",
  //                 "id": "2fgl3me4n9diODTrVfruF3",
  //                 "name": "Balance And Composure",
  //                 "type": "artist",
  //                 "uri": "spotify:artist:2fgl3me4n9diODTrVfruF3"
  //             }
  //         ],
  //         "external_urls": {
  //             "spotify": "https://open.spotify.com/album/7ECEe6gQMlJNjykkX7F7RY"
  //         },
  //         "href": "https://api.spotify.com/v1/albums/7ECEe6gQMlJNjykkX7F7RY",
  //         "id": "7ECEe6gQMlJNjykkX7F7RY",
  //         "images": [
  //             {
  //                 "height": 640,
  //                 "url": "https://i.scdn.co/image/ab67616d0000b2737b7f5d6748b474375958b780",
  //                 "width": 640
  //             },
  //             {
  //                 "height": 300,
  //                 "url": "https://i.scdn.co/image/ab67616d00001e027b7f5d6748b474375958b780",
  //                 "width": 300
  //             },
  //             {
  //                 "height": 64,
  //                 "url": "https://i.scdn.co/image/ab67616d000048517b7f5d6748b474375958b780",
  //                 "width": 64
  //             }
  //         ],
  //         "is_playable": true,
  //         "name": "Too Quick to Forgive",
  //         "release_date": "2023-04-11",
  //         "release_date_precision": "day",
  //         "total_tracks": 2,
  //         "type": "album",
  //         "uri": "spotify:album:7ECEe6gQMlJNjykkX7F7RY"
  //     },
  //     "artists": [
  //         {
  //             "external_urls": {
  //                 "spotify": "https://open.spotify.com/artist/2fgl3me4n9diODTrVfruF3"
  //             },
  //             "href": "https://api.spotify.com/v1/artists/2fgl3me4n9diODTrVfruF3",
  //             "id": "2fgl3me4n9diODTrVfruF3",
  //             "name": "Balance And Composure",
  //             "type": "artist",
  //             "uri": "spotify:artist:2fgl3me4n9diODTrVfruF3"
  //         }
  //     ],
  //     "disc_number": 1,
  //     "duration_ms": 261345,
  //     "episode": false,
  //     "explicit": false,
  //     "external_ids": {
  //         "isrc": "QZTA32303601"
  //     },
  //     "external_urls": {
  //         "spotify": "https://open.spotify.com/track/0G6fFMKdbf7fI3S1gLHSRK"
  //     },
  //     "href": "https://api.spotify.com/v1/tracks/0G6fFMKdbf7fI3S1gLHSRK",
  //     "id": "0G6fFMKdbf7fI3S1gLHSRK",
  //     "is_local": false,
  //     "is_playable": true,
  //     "name": "Savior Mode",
  //     "popularity": 57,
  //     "preview_url": "https://p.scdn.co/mp3-preview/0a961d440fb295a3551e03f0fa35c517126b0d8e?cid=1f3d9dd466cd400784c8476e6cf4a80d",
  //     "track": true,
  //     "track_number": 1,
  //     "type": "track",
  //     "uri": "spotify:track:0G6fFMKdbf7fI3S1gLHSRK"
  // }
  let {artists, id, name, duration_ms} = track;
  const seconds = Math.floor((duration_ms / 1000) % 60);
  const minutes = Math.floor((duration_ms / 1000 / 60) % 60);
  const formattedTime = [
    minutes.toString().padStart(1, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  // if (
  //   state.currentProfile &&
  //   state.currentProfile.favoriteTracks.includes(track.id)
  // ) {
  //   setIsFavorite(true);
  // }

  function handleFavoriteButtonClick(id) {
    // console.log(id);
    // let favoriteToUpdate;
    // let updatedFavorite;
    // if (state.currentProfile.favoriteTracks.includes(id)) {
    //   favoriteToUpdate = "favoriteTracks";
    //   updatedFavorite = [...state.currentProfile.favoriteTracks].filter(
    //     track => track != id,
    //   );
    // } else {
    //   favoriteToUpdate = "favoriteTracks";
    //   updatedFavorite = [...state.currentProfile.favoriteTracks, id];
    // }

    setIsFavorite(prevFavorite => !prevFavorite);

    //regularPATCH
    // fetch(`http://localhost:4000/currentProfile/`, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     favoriteTracks: updatedFavorite,
    //   }),
    //   headers: {"content-type": "application/json"},
    // })
    //   .then(resp => resp.json())
    //   .then(updatedProfile => {
    //     // onHandleFavoriteClick(updatedProfile);
    //     console.log(updatedProfile);
    //   })
    //   .catch(error => console.log("error", error.message));
  }

  return (
    <div className="flex w-full">
      <div className="mr-8">
        {isFavorite ? (
          <PlaylistRemoveIcon onClick={handleFavoriteButtonClick} />
        ) : (
          <PlaylistAddIcon onClick={handleFavoriteButtonClick} />
        )}
      </div>
      <div className="ml-6 border-b-[1px] border-solid border-slate-500 border-opacity-40 pb-2 flex w-full">
        <span className="w-1/2">
          <Link to={`../tracks/${id}`}>{name}</Link>
        </span>
        <span className="w-1/3">
          <Link to={`../artists/${artists[0].id}`}>{artists[0].name}</Link>
        </span>
        <span className="justify-end">{formattedTime}</span>
        <span className="justify-end"></span>
      </div>
    </div>
  );
}

export default Tracks;
