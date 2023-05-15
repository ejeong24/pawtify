import React from "react";
import {Form, useLoaderData} from "react-router-dom";
import {getProfile} from "../components/Rover";

export async function loader({params}) {
  const profile = await getProfile(params.id);
  return {profile};
}
function Profile() {
  const {profile} = useLoaderData();

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <section className="flex justify-center">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src={profile.avatar} alt="Avatar" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{profile.username}</h2>
            <p>Hello {`${profile.firstName} ${profile.lastName}`}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Follow</button>
            </div>
          </div>{" "}
          <Form action="edit">
            <button type="submit" className="btn btn-secondary">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={event => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}>
            <button type="submit" className="btn btn-secondary">
              Delete
            </button>
          </Form>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-14 mt-8">
        <article>Artists</article>
        <article>Tracks</article>
        <article>Genres</article>
      </section>
    </div>
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
