import React, {useContext, useState} from "react";
import {getProfiles} from "../Rover";
import {useLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
export async function loader() {
  const profiles = await getProfiles();
  return {profiles};
}

export async function action() {}
function Users() {
  const {state, dispatch} = useContext(ProfileContext);
  const {profiles} = useLoaderData();
  const displayProfiles = profiles.map(profile => (
    <UserCard
      key={profile.id}
      profile={profile}
      loggedInUser={state.userLoggedIn}
    />
  ));
  return (
    <div className="grid grid-cols-4 gap-4 mx-auto">{displayProfiles}</div>
  );
}

export default Users;

export function UserCard({profile, loggedInUser}) {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img src={profile.avatar} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {profile.username}
          {profile.id === loggedInUser ? (
            <div className="badge badge-secondary">LOGGED IN</div>
          ) : (
            <div></div>
          )}
        </h2>
        <p>{`${profile.firstName} ${profile.lastName}`}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
