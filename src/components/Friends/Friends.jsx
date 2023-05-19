import React, {useContext, useEffect, useState} from "react";
import {getCurrentProfile, getProfiles} from "../Rover";
import {
  useLoaderData,
  Link,
  useRouteLoaderData,
  useFetcher,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";
import {FriendsCard} from "./FriendsCard";

export async function action() {}
function Friends() {
  const navigate = useNavigate();
  if (localStorage.getItem("currentUser") === 0) {
    return navigate("../login");
  }
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles, pendingFriendRequests} = useRouteLoaderData("root");
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [pendingFriends, setPendingFriends] = useState([]);
  const fetcher = useFetcher();

  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];

  let myFriends;
  let myPendingRequests;
  useEffect(() => {
    myFriends = profiles.filter(profile =>
      userProfile.friends.includes(profile.id),
    );
    myPendingRequests = pendingFriendRequests
      .filter(pend => pend.initiatedBy === userProfile.id)
      .map(pend => pend.target);
    console.log(myPendingRequests);
    setPendingFriends(myPendingRequests);
    setFriends(myFriends);
  }, []);

  let displayProfiles = profiles;
  let displayMyFriends;
  function onHandleRequestFriend(newRequest) {
    console.log("hello");
    let updatedPending = [...pendingFriends, newRequest.target];
    setPendingFriends(updatedPending);
  }

  function onHandleRemoveFriend(updatedProfile) {
    console.log(updatedProfile);
    let updatedList = friends.filter(friend =>
      updatedProfile.friends.includes(friend.id),
    );
    dispatch({type: "UPDATE", payload: updatedProfile});
    fetcher.load();
    setFriends(updatedList);
  }

  // displayProfiles = profiles
  //   .filter(profile => profile.id !== state.userLoggedIn)
  //   .map(profile => (
  //     <FriendsCard
  //       key={profile.id}
  //       friendProfile={profile}
  //       loggedInUser={state.userLoggedIn}
  //       userProfile={userProfile}
  //       friend={userProfile.friends.includes(profile.id)}
  //       onHandleRequestFriend={onHandleRequestFriend}
  //       onHandleRemoveFriend={onHandleRemoveFriend}
  //     />
  //   ));
  // console.log(displayProfiles);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  let filteredProfiles = displayProfiles;
  if (search) {
    filteredProfiles = displayProfiles.filter(
      profile =>
        profile.firstName.toLowerCase().includes(search.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(search.toLowerCase()) ||
        profile.username.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return (
    <>
      <NavButtons />

      <div className="grid grid-cols-3 gap-4 mx-auto">
        {friends && friends.length > 0 ? (
          friends.map(friend => (
            <FriendsCard
              key={friend.id}
              friendProfile={friend}
              loggedInUser={state.userLoggedIn}
              isFriend={userProfile.friends.includes(friend.id)}
              onHandleRequestFriend={onHandleRequestFriend}
              onHandleRemoveFriend={onHandleRemoveFriend}
              friends={friends}
              isPending={pendingFriends.includes(friend.id)}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="divider w-1/2 mx-auto"></div>
      </div>
      <div className=" flex flex-col mx-auto text-center">
        <div className="text-xl font-medium mx-auto">
          <div className="SearchForm mx-auto flex">
            <input
              className="Name w-[500px] h-12 my-4 px-4 rounded-full"
              type="text"
              placeholder="Search for new friends"
              onChange={e => {
                handleChange(e);
              }}
              value={search}
            />
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-4 mx-auto">
          {profiles && profiles.length > 0 ? (
            filteredProfiles
              .filter(profile => profile.id !== state.userLoggedIn)
              .map(profile => (
                <FriendsCard
                  key={profile.id}
                  friendProfile={profile}
                  loggedInUser={state.userLoggedIn}
                  userProfile={userProfile}
                  friend={userProfile.friends.includes(profile.id)}
                  onHandleRequestFriend={onHandleRequestFriend}
                  onHandleRemoveFriend={onHandleRemoveFriend}
                  isPending={pendingFriends.includes(profile.id)}
                />
              ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}

export default Friends;
