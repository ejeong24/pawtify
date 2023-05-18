import React from "react";
import {useFetcher} from "react-router-dom";
function FriendsList({friend, onHandleRemoveFriend, profile}) {
  function handleRemoveFriend() {
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
      
        onHandleRemoveFriend(updatedFriends, friend.id);
      });
  }
  return (
    <div className="flex flex-col mb-2">
      <div className="flex gap-2">
        <div className="avatar">
          <div className="w-12 rounded">
            <img src={friend.avatar} alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
        <div>
          <p>{friend.username}</p>
        </div>{" "}
        <div className="justify-end items-end ml-auto">
          <button className="btn btn-accent" onClick={handleRemoveFriend}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
