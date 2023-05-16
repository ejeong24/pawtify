import React, {useContext, useState} from "react";
import {getProfiles} from "../Rover";
import {useLoaderData, Link} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";
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
    <>
      <NavButtons />
      <div className="grid grid-cols-3 gap-4 mx-auto">{displayProfiles}</div>
    </>
  );
}

export default Users;

export function UserCard({profile, loggedInUser}) {
  const {state, dispatch} = useContext(ProfileContext);
  function handleClick(event) {
    profile.id === loggedInUser
      ? dispatch({type: "USERLOGOUT", payload: 0})
      : dispatch({type: "USERLOGIN", payload: profile.id});
  }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={profile.avatar} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`../profile/${profile.id}`}>{profile.username}</Link>
          {profile.id === loggedInUser ? (
            <div className="badge badge-secondary">LOGGED IN</div>
          ) : (
            <div></div>
          )}
        </h2>
        <p>{`${profile.firstName} ${profile.lastName}`}</p>
        <div className="card-actions justify-end">
          {profile.id === loggedInUser ? (
            <button className="btn" onClick={handleClick}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
