import React, {useContext, useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useFetcher,
  useRouteLoaderData,
} from "react-router-dom";
import {
  getProfile,
  getFriends,
  getMyPending,
  clearPending,
  getAllPendingFriendings,
} from "../components/Rover";
import {getAllItems, getOne, getRecommendations} from "../components/spotify";
import NavButtons from "../components/NavButtons";
import {ProfileContext} from "../context/profileContext";
import FavoriteTrackList from "../components/Users/FavoriteTrackList";
import FavoriteArtistList from "../components/Users/FavoriteArtistList";
import FavoriteAlbumList from "../components/Users/FavoriteAlbumList";
import Recommendations from "../components/Recommendations/Recommendations";
import PartyMix from "../components/Users/PartyMix";
import FriendsList from "../components/Profile/FriendsList";
import FriendRequest from "../components/Profile/FriendRequests";
export async function loader({params}) {
  if (parseInt(localStorage.getItem("currentUser")) !== parseInt(params.id)) {
    console.log("not matching user");
    return redirect("../login");
  }
  let profile = await getProfile(params.id);
  let pendingFriendings = await getAllPendingFriendings();

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
    : "";

  return {
    profile,
    artistDetails,
    albumList,
    tracksDetails,
    friendsIDs,
    requestString,
    pendingFriendings,
  };
}

function Profile() {
  const {state, dispatch} = useContext(ProfileContext);
  let {profile, tracksDetails, artistDetails, pendingFriendings} =
    useLoaderData();
  const {profiles} = useRouteLoaderData("root");
  const navigate = useNavigate();
  const [partyMix, setPartyMix] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [tracksList, setTracksList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load();
    let friendsDetails = profiles.filter(profile =>
      userProfile.friends.includes(profile.id),
    );
    console.log(friendsDetails);
    setFriends(friendsDetails);
    setTracksList(tracksDetails.tracks);
    setArtistList(artistDetails.artists);
    setPendingFriendRequests(state.pendingRequests);
  }, []);
  useEffect(() => {}, [pendingFriendRequests]);
  // let {favoriteAlbums, favoriteArtists, favoriteTracks} = profile;
  // const newFriend = () =>
  //   toast.info("🦄 New friend request!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  //ANCHOR - displayFavoriteTracks
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
  //ANCHOR - displayFavoriteArtist
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
  //ANCHOR - displayPartyMix
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
  let displayFriends;
  //ANCHOR - displayFriends
  if (friends && friends.length > 0) {
    displayFriends = friends.map(friend => (
      <FriendsList
        key={friend.id}
        friend={friend}
        profile={userProfile}
        onHandleRemoveFriend={onHandleRemoveFriend}
      />
    ));
  }

  //ANCHOR - displayPending
  let displayPending;

  if (pendingFriendRequests && pendingFriendRequests.length > 0) {
    displayPending = pendingFriendRequests
      .filter(request => request.target === profile.id)
      .map(newFriend => (
        <FriendRequest
          key={newFriend.id}
          friend={
            profiles.filter(profile => profile.id === newFriend.initiatedBy)[0]
          }
          profile={userProfile}
          pendingRequestID={newFriend.id}
          onHandleAcceptFriend={onHandleAcceptFriend}
          onHandleDeclineFriend={onHandleDeclineFriend}
        />
      ));
  }
  let numberOfMyPendingRequests;
  if (pendingFriendRequests && pendingFriendRequests.length > 0) {
    numberOfMyPendingRequests = pendingFriendRequests.filter(
      request => request.target === userProfile.id,
    );
  }

  //ANCHOR - What happens when we click add to party button
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
  //ANCHOR - if we have recommendation`
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
    console.log(artistID);
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
  const completeFriendRequest = async pendingID => {
    console.log(pendingID);
    await fetch(`http://localhost:4000/clearPending/${pendingID[0].id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(() => console.log("deleted"))
      .catch(error => console.log("error", error.message));
  };

  // handle accepting of friend requests
  function onHandleAcceptFriend(updatedProfile, pendingID, friend) {
    //regularDELETE
    let updatedPendingRequests = [...pendingFriendRequests].filter(
      request => request.id !== pendingID,
    );

    dispatch({type: "UPDATE", payload: updatedProfile});
    fetcher.load();
    let updatedFriends = [...friends, friend];
    setFriends(updatedFriends);
    dispatch({type: "FRIENDREQUESTREMOVE", payload: pendingID});
    setPendingFriendRequests(updatedPendingRequests);
  }
  //handle decline of friend requests
  function onHandleDeclineFriend(pendingRequestID) {
    //regularDELETE
    let updatedPendingRequests = [...pendingFriendRequests].filter(
      request => request.id !== pendingRequestID,
    );
    setPendingFriendRequests(updatedPendingRequests);
  }

  function onHandleRemoveFriend(updatedFriends, friendID) {
    let requestString = updatedFriends.friends
      ? `?id=${updatedFriends.friends[0]}&id=${updatedFriends.friends
          .slice(1)
          .join("&id=")}`
      : false;
    const friendsDetails = async () => {
      await getFriends(requestString).then(data => setFriends(data));
    };
    console.log(updatedFriends);
    friendsDetails();
    dispatch({type: "UPDATE", payload: updatedFriends});
    dispatch({type: "UPDATECURRENT", payload: updatedFriends});
  }

  return (
    <>
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
          <article className="w-fit max-h-[280px] overflow-auto">
            {displayPending && displayPending.length > 0 ? (
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box items-start justify-start">
                <input type="checkbox" />
                <div className="collapse-title text-xl w-full font-medium flex after:ml-auto after:w-full">
                  Pending Friending
                  <span className="stat-value text-right ml-auto text-secondary">
                    {state.pendingRequests &&
                    state.pendingRequests.length > 0 &&
                    pendingFriendRequests.length > 0
                      ? numberOfMyPendingRequests.length
                      : ""}
                  </span>
                </div>
                <div className="collapse-content">{displayPending}</div>
              </div>
            ) : (
              ""
            )}
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box items-start justify-start">
              <input type="checkbox" className="ml-auto w-full" />
              <div className="collapse-title text-xl w-full font-medium flex justify-between after:ml-auto after:w-full gap-14">
                <span>Friends</span>{" "}
                <span className="stat-value text-right">
                  {friends && friends.length > 0 ? friends.length : 0}
                </span>
              </div>
              <div className="collapse-content">{displayFriends}</div>
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

export const NewFriendRequestReady = () => {
  return (
    <div>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }>
        This is a success alert — check it out!
      </Alert>
    </div>
  );
};
