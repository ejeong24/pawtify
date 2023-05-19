import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import {ProfileContext} from "../../context/profileContext";

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .test("username", "This username is already taken.", function (username) {
      return checkUsername(username);
    })
    .required("Required"),
});
const checkUsername = username => {
  return fetch(`http://localhost:4000/username/${username}/available`)
    .then(response => response.json())
    .then(data => {
      return data.length === 0;
    });
};
export const ProfileForm = ({toggleForm}) => {
  const {state, dispatch} = useContext(ProfileContext);
  const navigate = useNavigate();
  function handleNewProfileSubmit(values) {
    // POST fetch to dispatch
    fetch(`http://localhost:4000/profiles`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values),
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
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      favoriteAlbums: [],
      favoriteTracks: [],
      favoriteArtists: [],
      followedBy: [],
      following: [],
      friends: [],
      avatar: `../assets/avatar${Math.ceil(Math.random()) * 6}.jpg`,
    },
    validationSchema: ProfileSchema,
    onSubmit: values => handleNewProfileSubmit(values),
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 text-sm font-bold mb-2">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
      </div>

      <div className="flex justify-around">
        <button
          className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit">
          Save
        </button>
        <button
          type="button"
          className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          onClick={toggleForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};
