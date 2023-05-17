import {useState} from "react";
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
import {Formik, useFormik} from "formik";
import {ProfileForm} from "../components/Form/Form";
export async function loader({params}) {
  // console.log("loader called");
  // const newReleases = await getAll("newReleases");
  // return {newReleases};
}

export default function Index() {
  const {state, dispatch} = useContext(ProfileContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    favoriteAlbums: [],
    favoriteTracks: [],
    favoriteArtists: [],
    followedBy: [],
    following: [],
    friends: [],
    avatar: `../assets/avatar${Math.ceil(Math.random()) * 6}.jpg`,
  });

  function handleChange(event) {
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({...formData, [name]: value});
  }

  // show the create user form
  function toggleForm() {
    setShowForm(prevShowForm => !prevShowForm);
  }

  // manage new user creation
  function handleNewProfileSubmit(event) {
    event.preventDefault();

    // POST fetch to dispatch
    fetch(`http://localhost:4000/profiles`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
      .then(resp => resp.json())
      .then(newProfile => {
        console.log(newProfile.id);
        // ensure we update the local cookie before sending off other data
        localStorage.setItem("currentUser", newProfile.id);
        dispatch({type: "CREATE", payload: newProfile});
        navigate(`../profile/${newProfile.id}`);
      })

      .catch(error => console.log("error", error.message));
  }
  return (
    <main>
      {/* HERO in a GRId XS={12}*/}
      <section id="hero">
        <div className="hero min-h-screen relative" id="heroImage">
          <div className="hero-overlay bg-opacity-60"></div>
          {!showForm ? (
            <div className="hero-content text-center text-neutral-content align-baseline">
              <div className="max-w-lg">
                <h1 className="mt-48 mb-5 text-4xl font-bold">
                  Music's new best friend
                </h1>
                <p className="mb-5"></p>

                <div
                  id="callToAction"
                  className="justify-center items-center mx-auto">
                  {parseInt(localStorage.getItem("currentUser")) === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary w-fit mx-auto"
                      onClick={toggleForm}>
                      Create Profile and Get Started
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary w-fit mx-auto"
                      onClick={() => {
                        navigate(
                          `../profile/${parseInt(
                            localStorage.getItem("currentUser"),
                          )}`,
                        );
                      }}>
                      My Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // <form
            //   onSubmit={handleNewProfileSubmit}
            //   id="profileForm"
            //   className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
            //   <div className="mb-4">
            //     <label
            //       className="block text-gray-700 text-sm font-bold mb-2"
            //       htmlFor="firstName">
            //       First Name
            //     </label>
            //     <input
            //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            //       type="text"
            //       id="firstName"
            //       name="firstName"
            //       placeholder="John"
            //       required
            //       minLength="2"
            //       defaultValue={formData.firstName}
            //       onChange={handleChange}
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label
            //       className="block text-gray-700 text-sm font-bold mb-2"
            //       htmlFor="lastName">
            //       Last Name
            //     </label>
            //     <input
            //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            //       type="text"
            //       id="lastName"
            //       name="lastName"
            //       placeholder="Doe"
            //       required
            //       minLength="2"
            //       defaultValue={formData.lastName}
            //       onChange={handleChange}
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label
            //       className="block text-gray-700 text-sm font-bold mb-2"
            //       htmlFor="username">
            //       Username
            //     </label>
            //     <input
            //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            //       type="text"
            //       id="username"
            //       name="username"
            //       required
            //       minLength="6"
            //       maxLength="25"
            //       defaultValue={formData.username}
            //       onChange={handleChange}
            //     />
            //   </div>

            //   <div className="flex justify-around">
            //     <button
            //       className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            //       type="submit">
            //       Save
            //     </button>
            //     <button
            //       type="button"
            //       className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            //       onClick={toggleForm}>
            //       Cancel
            //     </button>
            //   </div>
            // </form>
            <ProfileForm toggleForm={toggleForm} />
          )}
        </div>
      </section>
    </main>
  );
}
