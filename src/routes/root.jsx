import React, {useState, useEffect, useContext} from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

//ROVER calls
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  getAllPendingFriendings,
} from "../components/Rover";
import {getANewToken} from "../components/auth";
import AppBar from "../components/AppBar";
import NavButtons from "../components/NavButtons";
import {ProfileContext} from "../context/profileContext";
const access_token = localStorage.getItem("access_token");
import Drawer from "../components/Drawer/Drawer";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let profile = {};
const expiresAt = localStorage.getItem("expiresAt");

if (!expiresAt && !access_token) {
  getANewToken();
} else if (expiresAt < Date.now()) {
  getANewToken();
}
export async function loader({params}) {
  const profiles = await getProfiles();
  const pendingFriendRequests = await getAllPendingFriendings();
  return {profiles, pendingFriendRequests};
}
export async function action() {
  const data = {
    username: "",
    firstName: "",
    lastName: "",
    favoriteAlbums: [],
    favoriteTracks: [],
    favoriteArtists: [],
    avatar: `../assets/avatar${Math.ceil(Math.Random()) * 6}.jpg`,
  };
  const profile = await createProfile(data);
  return redirect(`/profile/${profile.id}/edit`);
}

function Root() {
  const {state, dispatch} = useContext(ProfileContext);

  const [currentUser, setCurrentUser] = useState("");

  const navigation = useNavigation();
  // manage form submissions
  const submit = useSubmit();

  function onHandleUserChange(newUser) {
    const loggedIn = allProfiles.filter(profile => profile.id === newUser);
    setCurrentProfile(prevUser => loggedIn);
    localStorage.setItem("currentUser", newUser);
  }

  function onHandleFavoriteClick(updatedProfile) {
    setCurrentProfile(updatedProfile);
  }
  return (
    <React.Fragment>
      <AppBar
        currentUser={currentUser}
        onHandleUserChange={onHandleUserChange}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Outlet />
    </React.Fragment>
  );
}

export default Root;
