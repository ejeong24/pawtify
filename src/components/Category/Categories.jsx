import React from "react";
import {useLoaderData} from "react-router-dom";
import {getAll, getDirect, getOne} from "../spotify";
import Playlists from "../Playlist/Playlists";
import NavButtons from "../NavButtons";
export async function loader({params}) {
  const playlists = await getOne("category", params.id, "/playlists");
  return {playlists};
}

function Categories() {
  const {playlists} = useLoaderData();

  const displayPlaylists = playlists.playlists.items
    .filter(playlist => playlist !== null)
    .map(playlist => (
      <Playlists
        key={playlist.id !== null ? playlist.id : index}
        playlist={playlist}
      />
    ));

  return (
    <React.Fragment>
      <NavButtons />
      <div className="flex flex-col flex-wrap w-full border-opacity-50">
        <div className="grid card bg-base-300 rounded-box place-items-center">
          <section id="categories" className="grid grid-cols-3 gap-10">
            {displayPlaylists}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Categories;
