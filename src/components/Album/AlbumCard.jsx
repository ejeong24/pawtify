import React, {useState} from "react";

function AlbumCard({card}) {
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
  } = card;
  return (
    <div className="card card-compact w-96 glass shadow-xl hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-in-out">
      <figure>
        <img src={images[1].url} alt={artists[0].name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>{artists.map(artist => (<a href=""`${artist.name} `)))}</h3>
        <div className="card-actions justify-center items-base">
          <button className="btn btn-primary">Add to favorite</button>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
