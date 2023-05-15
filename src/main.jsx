import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root.jsx";
import {action as destroyAction} from "./routes/destroy";
import Index, {loader as indexLoader} from "./routes/index";
import ErrorPage from "./ErrorPage";
import Profile, {loader as profileLoader} from "./routes/profile";
import EditProfile, {action as editAction} from "./routes/edit";
import Home, {loader as homeLoader} from "./routes/home";
import Artists, {loader as artistsLoader} from "./components/Artist/Artists";
import {
  ProfileContext,
  ProfilesContextProvider,
} from "./context/profileContext";
import Categories, {
  loader as categoryLoader,
} from "./components/Category/Categories";
import Playlists, {
  loader as tracksLoader,
} from "./components/Playlist/Playlists";
import Playlist, {loader as trackLoader} from "./components/Playlist/Playlist";
// create the router

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    id: "root",
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "home",
            element: <Home />,
            loader: homeLoader,
            errorElement: <div>Oops! There must be an error somewhere.</div>,
          },
          {
            path: "profile/:id",
            element: <Profile />,
            loader: profileLoader,
          },
          {
            path: "profile/:id/edit",
            element: <EditProfile />,
            loader: profileLoader,
            action: editAction,
          },
          {
            path: "profile/:id/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There must be an error somewhere.</div>,
          },
          {
            path: "artists",
            element: <Artists />,
            loader: artistsLoader,
            errorElement: <div>Oops! There must be an error somewhere.</div>,
          },
          {
            path: "artists/:id",
            element: <Artists />,
            loader: artistsLoader,
            errorElement: <div>Oops! There must be an error somewhere.</div>,
          },
          {
            path: "categories",
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "categories/:id",
            element: <Categories />,
            loader: categoryLoader,
          },
          {
            path: "playlists/:id",
            element: <Playlist />,
            loader: trackLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfilesContextProvider>
      <RouterProvider router={router} />
    </ProfilesContextProvider>
  </React.StrictMode>,
);
