import React, {useContext, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {getOne, getRecommendations} from "../spotify";
import {ProfileContext} from "../../context/profileContext";
import NavButtons from "../NavButtons";
export async function loader({params}) {
  const trackDetails = await getOne("tracks", params.id, "?market=US");
  //   const trackAnalysis = await getOne("analysis", params.id);
  //   const trackFeatures = await getOne("features", params.id);
  const similarMusic = await getRecommendations(
    "recommend",
    `?limit=5&seed_tracks=${params.id}`,
  );
  return {trackDetails, similarMusic};
}

function Track() {
  const {state, dispatch} = useContext(ProfileContext);
  const {trackDetails, similarMusic} = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(false);
  let {
    name,
    album,
    artists,
    external_urls,
    duration_ms,
    popularity,
    preview_url,
    explicit,
  } = trackDetails;
  let {tracks} = similarMusic;

  const seconds = Math.floor((duration_ms / 1000) % 60);
  const minutes = Math.floor((duration_ms / 1000 / 60) % 60);
  const formattedTime = [
    minutes.toString().padStart(1, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return (
    <React.Fragment>
      <NavButtons />
      <article className="container flex max-w-2xl mx-auto">
        <img src={album.images[1].url} />
        album details:
        <Link to={`../albums/${album.id}`}>
          {album.name} {album.release_date}
        </Link>
        artist details:
        <Link to={`../artists/${artists[0].id}`}>{artists[0].name}</Link>
        <a href={external_urls.spotify}>See on spotify</a>
        {preview_url}
        {explicit}
        {popularity}
        {name}
        {formattedTime}
      </article>
    </React.Fragment>
  );
}

export default Track;
