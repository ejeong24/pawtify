import {getAll} from "../components/spotify";
import {
  useLoaderData,
  Form,
  redirect,
  useSubmit,
  useNavigate,
  Link,
} from "react-router-dom";
import Card from "../components/Card";
import Hero from "../assets/dog.jpg";
import {createProfile, getProfiles} from "../components/Rover";
import ".././index.css";
import {useContext} from "react";
import {ProfileContext} from "../context/profileContext";

export async function loader({params}) {
  // console.log("loader called");
  // const newReleases = await getAll("newReleases");
  // return {newReleases};
}

// export async function action() {
//   const {state, dispatch} = useContext(ProfileContext);
//   const data = {
//     username: "",
//     firstName: "",
//     lastName: "",
//     favoriteAlbums: [],
//     favoriteTracks: [],
//     favoriteArtists: [],
//     avatar: `../assets/avatar${Math.ceil(Math.random()) * 6}.jpg`,
//   };
//   const profile = await createProfile(data).then(
//     newProfile =>
//       function () {
//         dispatch({type: "CREATE", payload: newProfile});
//       },
//   );

//   return redirect(`/profile/${profile.id}/edit`);
// }

export default function Index() {
  const {state, dispatch} = useContext(ProfileContext);
  const navigate = useNavigate();
  async function handleNewUserSubmit(event) {
    event.preventDefault();
    const data = {
      username: "",
      firstName: "",
      lastName: "",
      favoriteAlbums: [],
      favoriteTracks: [],
      favoriteArtists: [],
      avatar: `../assets/avatar${Math.ceil(Math.random()) * 6}.jpg`,
    };
    const profile = await createProfile(data);

    dispatch({type: "CREATE", payload: profile});
    navigate(`/profile/${profile.id}/edit`);
  }
  return (
    <main>
      {/* HERO in a GRId XS={12}*/}
      <section id="hero">
        <div className="hero min-h-screen relative" id="heroImage">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content align-baseline">
            <div className="max-w-lg">
              <h1 className="mt-48 mb-5 text-4xl font-bold">
                Music for every party animal
              </h1>
              <p className="mb-5"></p>

              <div id="callToAction" onSubmit={handleNewUserSubmit}>
                <Link to="/home">
                  <button className="btn btn-primary w-[150px]">
                    Get Started
                  </button>
                </Link>
                <form method="post">
                  <button type="submit" className="btn btn-primary w-[150px]">
                    Create Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
