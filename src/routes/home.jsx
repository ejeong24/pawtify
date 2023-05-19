import React, {useState, useContext} from "react";
import {useLoaderData} from "react-router-dom";
import {getAll, getOne} from "../components/spotify";
// import {getAccessToken, redirectToAuthCodeFlow} from "../components/auth";
import Card from "../components/Card";
import {getProfile, getProfiles} from "../components/Rover";
import {ProfileContext} from "../context/profileContext";
import Category from "../components/Category/Category";
import NavButtons from "../components/NavButtons";
export async function loader({params}) {
  const categories = await getAll("browse");

  return {categories};
}
export default function Home({onHandleFavoriteClick}) {
  const {categories} = useLoaderData();
  const {state, dispatch} = useContext(ProfileContext);

  return (
    <React.Fragment>
      <NavButtons />
      <div className="flex flex-col flex-wrap w-full border-opacity-50">
        <div className="grid card bg-base-300 rounded-box place-items-center">
          <span id="categoriesText" className="text-4xl">
            Which category are we starting with?
          </span>
          <section
            id="categories"
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {categories.categories.items.map(category => (
              <Category key={category.id} category={category} />
            ))}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}
