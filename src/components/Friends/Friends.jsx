import React, {useContext, useState} from "react";
import {getCurrentProfile, getProfiles} from "../Rover";
import {useLoaderData, Link, useRouteLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";

export async function action() {}
function Friends() {
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles} = useRouteLoaderData("root");

  let userProfile = profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];
  console.log(userProfile);
  let displayProfiles;

  function onHandleRequestFriend() {
    console.log("hello");
  }

  function onHandleRemoveFriend(friend) {}
  if (profiles && profiles.length > 0) {
    displayProfiles = profiles
      .filter(profile => profile.id !== state.userLoggedIn)
      .map(profile => (
        <FriendsCard
          key={profile.id}
          profile={profile}
          loggedInUser={state.userLoggedIn}
          friend={userProfile.friends.includes(profile.id)}
          onHandleRequestFriend={onHandleRequestFriend}
          onHandleRemoveFriend={onHandleRemoveFriend}
        />
      ));
  }

  return (
    <>
      <NavButtons />
      <div className="grid grid-cols-3 gap-4 mx-auto">{displayProfiles}</div>
    </>
  );
}

export default Friends;

export function FriendsCard({
  profile,
  loggedInUser,
  friend,
  onHandleRequestFriend,
  onHandleRemoveFriend,
}) {
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles} = useRouteLoaderData("root");
  function handleRequestFriend() {}
  function handleRemoveFriend() {
    let updatedFriendFriendList = profiles
      .filter(profile => profile.id === friend.id)
      .filter(byeFriend => bye);
    //remove friend from logged in user
    let updatedFriendList = profile.friends.filter(
      profiledFriend => profiledFriend !== friend.id,
    );
    console.log(updatedFriendList);
    fetch(`http://localhost:4000/profiles/${profile.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...profile, friends: updatedFriendList}),
    })
      .then(response => response.json())
      .then(updatedFriends => {
        onHandleRemoveFriend(updatedFriends);
      });
  }

  return (
    <div className=" shadow-sm flex border border-slate-700 rounded-md p-4 items-center justify-center">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={profile.avatar} alt="Shoes" />
        </div>
      </div>
      <div className="flex flex-col items-start ml-2">
        {" "}
        <h2 className="text-lg font-semibold">
          <Link to={`../profile/${profile.id}`}>{profile.username}</Link>
        </h2>
        <p>{`${profile.firstName} ${profile.lastName}`}</p>
      </div>

      {friend ? (
        <div className="mr-0 ml-auto flex justify-center items-center">
          <button className="btn btn-secondary" onClick={handleRemoveFriend}>
            Remove Friend
          </button>
        </div>
      ) : (
        <div className="mr-0 ml-auto flex justify-center items-center">
          <button className="btn btn-primary" onClick={handleRequestFriend}>
            Follow
          </button>
        </div>
      )}
    </div>
  );
}
