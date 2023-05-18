import React, {useContext, useState} from "react";
import {getCurrentProfile, getProfiles} from "../Rover";
import {useLoaderData, Link} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";
export async function loader() {
  const profiles = await getProfiles();
  const current = await getCurrentProfile(
    parseInt(localStorage.getItem("currentUser")),
  );
  return {profiles, current};
}

export async function action() {}
function Friends() {
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles, current} = useLoaderData();
  console.log(current);
  const displayProfiles = profiles
    .filter(profile => profile.id !== state.userLoggedIn)
    .map(profile => (
      <FriendsCard
        key={profile.id}
        profile={profile}
        loggedInUser={state.userLoggedIn}
        friend={current.friends.includes(profile.id)}
      />
    ));
  return (
    <>
      <NavButtons />
      <div className="grid grid-cols-3 gap-4 mx-auto">{displayProfiles}</div>
    </>
  );
}

export default Friends;

export function FriendsCard({profile, loggedInUser, friend}) {
  const {state, dispatch} = useContext(ProfileContext);
  function handleClick(event) {
    profile.id === loggedInUser
      ? dispatch({type: "USERLOGOUT", payload: 0})
      : dispatch({type: "USERLOGIN", payload: profile.id});
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
               <button className="btn btn-secondary">Remove Friend</button>
             </div>
      ) : (
        <div className="mr-0 ml-auto flex justify-center items-center">
          <button className="btn btn-primary">Follow</button>
        </div>
      )}
    </div>
  );
}
