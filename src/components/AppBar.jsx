import React, {useContext} from "react";
import {useLoaderData, Link, NavLink} from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
const pages = ["Home", "New Releases", "Genres", "Albums"];
const settings = ["Profile", "Dashboard", "Logout"];
import {getProfiles} from "./Rover";
import {ProfileContext} from "../context/profileContext";
import NavButtons from "./NavButtons";
export async function loader() {
  const profiles = await getProfiles();
  return {profiles};
}

function AppBar({onHandleUserChange}) {
  const {state, dispatch} = useContext(ProfileContext);
  function handleChange(event) {
    if (event.target.value === 0) {
      dispatch({type: "USERLOGOUT", payload: 0});
    } else {
      dispatch({type: "USERLOGIN", payload: event.target.value});
    }
  }

  return (
    <>
      <div className="navbar sticky top-0 z-10 bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to={`../`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`../home`}>Categories</NavLink>
              </li>
              <li>
                <NavLink to={`../new`}></NavLink>
              </li>
              {/* <li>
                <NavLink to={`../search`}>Search [WIP]</NavLink>
              </li> */}
            </ul>
          </div>

          <Link to={`../`} className="btn btn-ghost normal-case text-xl">
            <PetsIcon />
            PAWTIFY
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={`../`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`../home`}>Categories</NavLink>
            </li>
            <li>
              <NavLink to={`../new`}>New Releases</NavLink>
            </li>
            {/* <li>
              <NavLink to={`../search`}>Search [WIP]</NavLink>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {state.userLoggedIn !== 0 ? (
            <>
              <Link to={`../profile/${state.userLoggedIn}`}>
                <button className="btn btn-accent">My Profile</button>
              </Link>
              <Link to={`../login`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleChange}
                  value="0">
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <Link to={`../login`}>
              <button type="button" className="btn">
                Log In
              </button>
            </Link>
          )}
          {/* <select
            id="currentUser"
            defaultValue={state.userLoggedIn || 0}
            onChange={handleChange}>
            <option value="0">Choose a user</option>
            {state.profiles.map(profile => (
              <option key={profile.id} value={profile.id}>
                {profile.firstName}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </>
  );
}
export default AppBar;
