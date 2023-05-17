import React from "react";
import {Link, useLoaderData} from "react-router-dom";
import {getAllItems} from "./spotify";
export async function loader({params}) {
  console.log("loader called");
  const newReleases = await getAllItems("newReleases", "?limit=15&market=US");
  return {newReleases};
}
function NewReleases() {
  const {newReleases} = useLoaderData();
  console.log(newReleases);
  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="grid card bg-base-300 rounded-box place-items-center">
        <span id="newReleaseText">The newest hits for your party</span>
        <section id="newReleases">
          {newReleases.albums.items.map(release => (
            <NewReleaseCard key={release.id} card={release} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default NewReleases;

function NewReleaseCard(release) {
  console.log(release);
  let {
    id,
    images,
    name,
    release_date,
    uri,
    artists,
    href,
    external_urls,
    type,
  } = release.card;
  return (
    <div className="card card-compact w-96 glass shadow-xl hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-in-out">
      <figure>
        <img src={images[1].url} alt={artists[0].name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`../albums/${id}`}>{name}</Link>
        </h2>
        <h3>
          {artists.map(artist => (
            <Link to={`../artists/${artists[0].id}`} key={id}>
              {artist.name}{" "}
            </Link>
          ))}
        </h3>
      </div>
    </div>
  );
}
