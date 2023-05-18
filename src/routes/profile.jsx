import React, {useContext, useEffect, useState} from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useFetcher,
} from "react-router-dom";
import {getProfile, getFriends, getMyPending} from "../components/Rover";
import {getAllItems, getOne, getRecommendations} from "../components/spotify";
import NavButtons from "../components/NavButtons";
import {ProfileContext} from "../context/profileContext";
import FavoriteTrackList from "../components/Users/FavoriteTrackList";
import FavoriteArtistList from "../components/Users/FavoriteArtistList";
import FavoriteAlbumList from "../components/Users/FavoriteAlbumList";
import Recommendations from "../components/Recommendations/Recommendations";
import PartyMix from "../components/Users/PartyMix";
import FriendsList from "../components/Profile/FriendsList";

export async function loader({params}) {
  if (parseInt(localStorage.getItem("currentUser")) !== parseInt(params.id)) {
    console.log("not matching user");
    return redirect("../login");
  }
  let profile = await getProfile(params.id);
  let pendingFriends = await getMyPending(params.id)
  let albumList =
    profile.favoriteAlbums.length > 0
      ? await getAllItems(
          "albums",
          `?ids=${profile.favoriteAlbums.join(",")}&market=US`,
        )
      : [];
  let artistDetails =
    profile.favoriteArtists.length > 0
      ? await getAllItems(
          "artists",
          `?ids=${profile.favoriteArtists.join(",")}&market=US`,
        )
      : [];
  let tracksDetails =
    profile.favoriteTracks.length > 0
      ? await getAllItems(
          "tracks",
          `?ids=${profile.favoriteTracks.join(",")}&market=US`,
        )
      : [];
  let friendsIDs = profile.friends.length > 0 ? profile.friends : false;
  let requestString = friendsIDs
    ? `?id=${friendsIDs[0]}&id=${friendsIDs.slice(1).join("&id=")}`
    : false;
  let friendsDetails = await getFriends(requestString);
  return {
    profile,
    artistDetails,
    albumList,
    tracksDetails,
    friendsIDs,
    requestString,
    friendsDetails,
    pendingFriends
  };
}

function Profile() {
  const {state, dispatch} = useContext(ProfileContext);
  let {
    profile,
    tracksDetails,
    artistDetails,
    friendsDetails,
    requestString,
    friendsIDs,pendingFriends
  } = useLoaderData();
  const navigate = useNavigate();
  const [partyMix, setPartyMix] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const fetcher = useFetcher();
  const [friends, setFriends] = useState([]);

  const [pending, setPending] = useState();
  const [tracksList, setTracksList] = useState(tracksDetails.tracks);
  const [artistList, setArtistList] = useState(artistDetails.artists);

  // Whenever the loader gives us new data
  // (for example, after a form submission),
  // update our `data` state.
  useEffect(() => setTracksList(tracksDetails.tracks), [tracksList]);
  useEffect(() => setArtistList(artistDetails.artists), [artistList]);
  useEffect(() => console.log("profile updated"), [state.profiles]);

  useEffect(() => {
 
    if (fetcher.data) {
      setFriends(fetcher.data.friendsDetails);
    } else {
      setFriends(friendsDetails);
    }
  }, [fetcher.data]);

 
  // let {favoriteAlbums, favoriteArtists, favoriteTracks} = profile;
  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];

  const displayFavoriteTracks =
    profile.favoriteTracks.length > 0
      ? tracksList.map(track => (
          <FavoriteTrackList
            key={track.id}
            track={track}
            onHandleAddToPartyMix={onHandleAddToPartyMix}
            onRemoveFromPartyMix={onRemoveFromPartyMix}
            onDeleteTrackFromFavorites={onDeleteTrackFromFavorites}
          />
        ))
      : "No Track Favorites";

  // const displayFavoriteAlbums =
  //   profile.favoriteAlbums.length > 0
  //     ? albumList.albums.map(album => (
  //         <FavoriteAlbumList key={album.id} album={album} />
  //       ))
  //     : "No Album Favorites";

  const displayFavoriteArtists =
    profile.favoriteArtists.length > 0
      ? artistList.map(artist => (
          <FavoriteArtistList
            key={artist.id}
            artist={artist}
            onHandleAddToPartyMix={onHandleAddToPartyMix}
            onDeleteArtistFromFavorites={onDeleteArtistFromFavorites}
          />
        ))
      : "No Artist Favorites";

  let displayPartyMix = "Nothing Selected";
  if (partyMix.length > 0) {
    displayPartyMix = partyMix.map(track => {
      return (
        <PartyMix
          key={track.id}
          track={track}
          partyMix={partyMix}
          onRemoveFromPartyMix={onRemoveFromPartyMix}
        />
      );
    });
  }
  // function getTrackList(tracks){
  //   let tracksList =
  //   profile.favoriteTracks.length > 0
  //     ? await getAllItems(
  //         "tracks",
  //         `?ids=${profile.favoriteTracks.join(",")}&market=US`,
  //       )
  //     : [];
  // }
  const displayFriends =
    friends && friends.length > 0
      ? friends.map(friend => (
          <FriendsList
            key={friend.id}
            friend={friend}
            profile={profile}
            onHandleRemoveFriend={onHandleRemoveFriend}
          />
        ))
      : "Loading...";
  function onHandleAddToPartyMix(media, type) {
    setPartyMix([...partyMix, media]);
  }
  let recommendedMusic;
  let displayRecommendations;
  async function handleGetMusicButton() {
    let seed_tracks = [];
    let seed_artists = [];
    partyMix.map(entry =>
      entry.type === "track"
        ? seed_tracks.push(entry.id)
        : seed_artists.push(entry.id),
    );
    const extension = `?limit=10&market=US&seed_tracks=${seed_tracks.join(
      ",",
    )}&seed_artists=${seed_artists.join(",")}`;
    let access_token = localStorage.getItem("access_token");
    return fetch(`https://api.spotify.com/v1/recommendations${extension}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${access_token}`},
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .then(recommendations => setRecommendations(recommendations.tracks))
      .catch(error => console.log(error.message));
  }
  if (recommendations) {
    displayRecommendations = recommendations.map(track => (
      <Recommendations key={track.id} track={track} />
    ));
  }

  function onRemoveFromPartyMix(id) {
    const updatedMix = [...partyMix].filter(track => track.id !== id);
    setPartyMix(updatedMix);
  }

  function onDeleteTrackFromFavorites(trackID) {
    const updatedTracks = [...tracksList].filter(track => track.id !== trackID);
    setTracksList(updatedTracks);
  }
  function onDeleteArtistFromFavorites(artistID) {
    const updatedArtists = [...artistList].filter(
      artist => artist.id !== artistID,
    );
    setArtistList(updatedArtists);
  }

  function handleDeleteProfile(event) {
    event.preventDefault();
    // DELETE fetch to dispatch
    console.log(profile.id);
    fetch(`http://localhost:4000/profiles/${profile.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
      .then(resp => resp.json())
      .then(() => dispatch({type: "DELETE", payload: profile.id}))
      .then(() => dispatch({type: "USERLOGOUT", payload: 0}))
      .then(() => navigate("../"))
      .catch(error => console.log("error", error.message));
  }

  function onHandleRemoveFriend(updatedFriends, friendID) {
    dispatch({type: "UPDATE", payload: updatedFriends});
    dispatch({type: "UPDATECURRENT", payload: updatedFriends});
    fetcher.load();
  }
  return (
    <>
      <NavButtons />
      <div className="flex flex-col justify-center items-center mt-10">
        <section className="flex justify-center gap-4 max-w-full">
          <div className="card lg:card-side bg-base-100 shadow-xl flex-shrink">
            <figure>
              <img src={profile.avatar} alt="Avatar" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{profile.username}</h2>
              <p>Hello {`${profile.firstName} ${profile.lastName}`}</p>
            </div>{" "}
            <div className="flex justify-end gap-4">
              <Form action="edit">
                <button type="submit" className="btn btn-secondary">
                  Edit
                </button>
              </Form>
              <form onSubmit={() => handleDeleteProfile}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDeleteProfile}>
                  Delete
                </button>
              </form>
            </div>
          </div>{" "}
          <article className="w-fit">
            <div
              tabIndex={0}
              className="collapse collapse-arrow collapse-open border border-base-300 bg-base-100 rounded-box items-start justify-start">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Friends</div>
              <div className="collapse-content">{displayFriends} hi </div>
            </div>
          </article>
        </section>
        <section className="grid lg:grid-cols-3 md:grid-cols-1 gap-8 mt-8 px-10 mx-4 max-w-full">
          <article>
            <span className="text-center text-bold text-3xl">Tracks</span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {" "}
              {displayFavoriteTracks}
            </ul>
          </article>
          <article>
            <span className="text-center text-bold text-3xl">
              Party Mix <span className="text-lg">(max 5)</span>
              {partyMix.length > 0 ? (
                <button
                  className="btn btn-secondary ml-4"
                  onClick={handleGetMusicButton}>
                  Let's Party
                </button>
              ) : (
                ""
              )}
            </span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {displayPartyMix}
            </ul>
          </article>
          <article>
            <span className="text-center text-bold text-3xl">Artists</span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {displayFavoriteArtists}
            </ul>
          </article>
        </section>

        <section className="flex flex-col mx-auto mt-10">
          {recommendations.length > 0 ? (
            <p className="text-2xl text-center mb-4">Here's your party mix!</p>
          ) : (
            <p></p>
          )}
          {displayRecommendations}
        </section>
      </div>
    </>
  );
}

export default Profile;

function FollowUser({profile}) {
  // yes, this is a `let` for later
  let following = profile.following;
  return (
    <Form method="post">
      <button
        name="follow"
        value={following ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
        {following ? "★" : "☆"}
      </button>
    </Form>
  );
}
