import React, {useContext, useEffect, useState} from "react";
import {Link, useRouteLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export function FriendsCard({
  friendProfile,
  loggedInUser,
  isFriend,
  onHandleRequestFriend,
  onHandleRemoveFriend,
  friends,
  isPending,
}) {
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles, pendingFriendsRequests} = useRouteLoaderData("root");
  let userProfile = state.profiles.filter(
    profile => profile.id === parseInt(localStorage.getItem("currentUser")),
  )[0];
  console.log(isPending);
  function handleRequestFriend() {
    //regularPOST
    let data = {initiatedBy: loggedInUser, target: friendProfile.id};
    fetch(`http://localhost:4000/pending`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(newFriendRequest => onHandleRequestFriend(newFriendRequest))
      .catch(error => console.log("error", error.message));
  }

  function handleRemoveFriend() {
    let updatedFriendFriendList = friendProfile.friends.filter(
      friend => friend !== loggedInUser,
    );
    //regularPATCH
    fetch(`http://localhost:4000/profiles/${friendProfile.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...friendProfile,
        friends: updatedFriendFriendList,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile =>
        dispatch({type: "UPDATE", payload: updatedProfile}),
      )
      .catch(error => console.log("error", error.message));
    //remove friend from logged in user
    let updatedFriendList = userProfile.friends.filter(
      friend => friend !== friendProfile.id,
    );
    console.log(updatedFriendList);

    fetch(`http://localhost:4000/profiles/${loggedInUser}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...userProfile, friends: updatedFriendList}),
    })
      .then(response => response.json())
      .then(updatedProfile => {
        console.log(updatedProfile);
        dispatch({type: "UPDATE", payload: updatedProfile});
        onHandleRemoveFriend(updatedProfile);
      });
  }

  return (
    <div className=" shadow-sm flex border border-slate-700 rounded-md p-4 items-center justify-center">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={friendProfile.avatar} alt="Shoes" />
        </div>
      </div>
      <div className="flex flex-col items-start ml-2">
        {" "}
        <h2 className="text-lg font-semibold">
          <Link to={`../profile/${friendProfile.id}`}>
            {friendProfile.username}
          </Link>
        </h2>
        <p>{`${friendProfile.firstName} ${friendProfile.lastName}`}</p>
      </div>
      {isFriend ? (
        <div className="mr-0 ml-auto flex justify-center items-center">
          <button className="btn btn-secondary" onClick={handleRemoveFriend}>
            Remove Friend
          </button>
        </div>
      ) : isPending ? (
        <div className="mr-0 ml-auto flex justify-center items-center">
          <button className="btn btn-disabled">Requested</button>
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
