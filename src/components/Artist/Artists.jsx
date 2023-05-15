import React from "react";
import {useLoaderData} from "react-router-dom";
import {getAll, getOne} from "../spotify";

export async function loader({params}) {
  const profile = await getOne("artists", params.id);
}
function Artists() {
  return <div>Artists</div>;
}

export default Artists;
