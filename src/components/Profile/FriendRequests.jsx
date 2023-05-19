import React, {useContext} from "react";
import {useFetcher} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export async function loader(id) {}
function FriendRequests({
  friend,
  onHandleAcceptFriend,
  onHandleDeclineFriend,
  pendingRequestID,
  profile,
}) {
  const {state, dispatch} = useContext(ProfileContext);
  console.log(pendingRequestID);
  function handleAcceptFriend() {
    // complete the request

    fetch(`http://localhost:4000/clearPending/${pendingRequestID}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(() => console.log("deleted"))
      .catch(error => console.log("error", error.message));

    // clean up the friends friends lists
    let friendFriendsList = [...friend.friends, profile.id];
    fetch(`http://localhost:4000/profiles/${friend.id}`, {
      method: "PATCH",
      body: JSON.stringify({...friend, friends: friendFriendsList}),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedFriendFriends =>
        dispatch({type: "UPDATE", payload: updatedFriendFriends}),
      )
      .catch(error => console.log("error", error.message));

    //clean up our friends list
    let updatedFriendList = [...profile.friends, friend.id];

    console.log(updatedFriendList);
    fetch(`http://localhost:4000/profiles/${profile.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...profile, friends: updatedFriendList}),
    })
      .then(response => response.json())
      .then(updatedFriendList => {
        // console.log(updatedFriendList);
        onHandleAcceptFriend(updatedFriendList, pendingRequestID,friend);
      });
  }
  function handleDeclineFriend() {
    // complete the request

    fetch(`http://localhost:4000/clearPending/${pendingRequestID}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(() => onHandleDeclineFriend(pendingRequestID))
      .catch(error => console.log("error", error.message));
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
        <div className="justify-end items-end ml-auto btn-group">
          <button className="btn btn-primary" onClick={handleAcceptFriend}>
            Accept
          </button>
          <button className="btn btn-accent" onClick={handleDeclineFriend}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
