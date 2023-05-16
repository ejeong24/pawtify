import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

function Category({category}) {
  const navigate = useNavigate();

  let {href, icons, id, name} = category;

  return (
    <Link to={`../categories/${id}`}>
      <div className="card card-compact w-96 bg-base-100 shadow-xl pt-4 px-2 hover:transition-transform hover:scale-105 hover:ease-in-out hover:duration-300 hover:underline">
        <figure>
          <img src={icons[0].url} alt={name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl">{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Category;
