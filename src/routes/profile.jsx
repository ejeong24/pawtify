import React from "react";
import {Form, useLoaderData} from "react-router-dom";
import {getProfile} from "../components/Rover";
import {getAllItems, getOne} from "../components/spotify";
import NavButtons from "../components/NavButtons";
export async function loader({params}) {
  const profile = await getProfile(params.id);
  const albumList =
    profile.favoriteAlbums.length > 0
      ? await getAllItems(
          "albums",
          `?ids=${profile.favoriteAlbums.join(",")}&market=US`,
        )
      : [];
  const artistList =
    profile.favoriteArtists.length > 0
      ? await getAllItems(
          "artists",
          `?ids=${profile.favoriteArtists.join(",")}&market=US`,
        )
      : [];
  const tracksList =
    profile.favoriteTracks.length > 0
      ? await getAllItems(
          "tracks",
          `?ids=${profile.favoriteTracks.join(",")}&market=US`,
        )
      : [];
  return {profile, albumList, artistList, tracksList};
}
function Profile() {
  const {profile, albumList, tracksList, artistList} = useLoaderData();
  let {favoriteAlbums, favoriteArtists, favoriteTracks} = profile;

  const displayFavoriteAlbums =
    albumList.albums.length > 0
      ? albumList.albums.map(album => (
          <MiniFavoriteAlbumList key={album.id} album={album} />
        ))
      : "No Album Favorites";

  const displayFavoriteArtists =
    artistList.length > 0
      ? artistList.items.map(track => (
          <MiniFavoriteArtistList key={artist.id} artist={artist} />
        ))
      : "No Artist Favorites";
  const displayFavoriteTracks =
    tracksList.tracks.length > 0
      ? tracksList.tracks.map(track => (
          <MiniFavoriteTrackList key={track.id} track={track} />
        ))
      : "No Track Favorites";

  return (
    <>
      <NavButtons />
      <div className="flex flex-col justify-center items-center mt-10">
        <section className="flex justify-center">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img src={profile.avatar} alt="Avatar" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{profile.username}</h2>
              <p>Hello {`${profile.firstName} ${profile.lastName}`}</p>
              <div className="card-actions justify-end md:justify-start">
                <button className="btn btn-primary">Follow</button>
              </div>
            </div>{" "}
            <div className="flex justify-end gap-4">
              <Form action="edit">
                <button type="submit" className="btn btn-secondary">
                  Edit
                </button>
              </Form>
              <Form
                method="post"
                action="destroy"
                onSubmit={event => {
                  if (
                    !confirm("Please confirm you want to delete this record.")
                  ) {
                    event.preventDefault();
                  }
                }}>
                <button type="submit" className="btn btn-secondary">
                  Delete
                </button>
              </Form>
            </div>
          </div>
        </section>
        <section className="grid lg:grid-cols-3 md:grid-cols-1 gap-8 mt-8 px-10 mx-4 max-w-full">
          <article>
            <span className="text-center text-bold text-3xl">Tracks</span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {" "}
              {displayFavoriteTracks}
            </ul>
          </article>
          <article>
            <span className="text-center text-bold text-3xl">Artists</span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {displayFavoriteArtists}
            </ul>
          </article>
          <article>
            <span className="text-center text-bold text-3xl">Albums</span>
            <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {displayFavoriteAlbums}
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}

export default Profile;

function FollowUser({profile}) {
  // yes, this is a `let` for later
  let following = profile.following;
  return (
    <Form method="post">
      <button
        name="follow"
        value={following ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
        {following ? "★" : "☆"}
      </button>
    </Form>
  );
}

export function MiniFavoriteAlbumList(album) {
  function handleDeleteAlbumButton() {}
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-shrink-0">
            <img
              className="w-16 h-16"
              src={album.album.images[2].url}
              alt={album.album.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {album.album.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {album.album.artists[0].name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button className="btn btn-primary justify-end">
              Add to party
            </button>
            <button
              className="btn justify-end"
              onClick={handleDeleteAlbumButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
export function MiniFavoriteArtistList(artist) {
  function handleDeleteArtistButton() {}
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-shrink-0">
            {/* <img
              className="w-16 h-16"
              src={album.album.images[2].url}
              alt={album.album.name}
            /> */}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {/* {album.album.name} Album Name */}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {/* {album.album.artists[0].name} */} artist Name
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button className="btn btn-primary justify-end">
              Add to party
            </button>
            <button
              className="btn justify-end"
              onClick={handleDeleteArtistButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
export function MiniFavoriteTrackList(track) {
  function handleDeleteTrackButton() {}
  console.log(track);
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {track.track.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {track.track.artists[0].name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button className="btn btn-primary justify-end">
              Add to party
            </button>
            <button
              className="btn justify-end"
              onClick={handleDeleteTrackButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
