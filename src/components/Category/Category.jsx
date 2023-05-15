import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

function Category({category}) {
  const navigate = useNavigate();

  let {href, icons, id, name} = category;

  return (
    <Link to={`../categories/${id}`}>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={icons[0].url} alt={name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Category;
