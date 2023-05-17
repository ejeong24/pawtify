import React, {useState, useReducer, createContext, useEffect} from "react";
// create the context
export const ProfileContext = createContext();

//reducer function
export const reducer = (state, action) => {
  // see what is happening
  switch (action.type) {
    // GET
    case "PROFILES":
      console.log("GETPROFILES");
      return {...state, profiles: action.payload};
    case "GETCURRENT":
      console.log("GETCURRENT");

      return {...state, currentUser: action.payload};
    // POST
    case "CREATE":
      console.log("CREATE");
      // return newItem into the array
      return {
        ...state,
        profiles: [action.payload, ...state.profiles],
      };
    case "SETCURRENTPROFILE":
      console.log("SETCURRENTPROFILE");
      return {
        ...state,
        currentProfile: action.payload,
      };
    // PATCH
    case "UPDATE":
      console.log("UPDATE");
      // if id = newItem.id then newItem, else item
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile.id === action.payload.id ? action.payload : profile,
        ),
      };
    case "UPDATECURRENT":
      console.log("UPDATECURRENT");
      // if id = newItem.id then newItem, else item
      return {...state, currentProfile: action.payload};
    // DELETE
    case "DELETE":
      console.log("DELETE");
      return {
        ...state,
        profiles: state.profiles.filter(
          profile => profile.id !== action.payload.id,
        ),
      };
    case "EDITNEWPROFILE":
      console.log("profile changing");

      const newProfile = state.profiles.filter(
        profile => profile.username === parseInt(action.payload),
      );
      return {
        ...state,
        currentProfile: currentUser,
      };
    case "USERLOGIN":
      console.log("USERLOGGEDIN");
      return {...state, userLoggedIn: parseInt(action.payload)};
    case "USERLOGOUT":
      console.log("USERLOGOUT");
      return {...state, userLoggedIn: parseInt(action.payload)};
    case "CHANGEPROFILE":
      console.log("profile changing");

      const currentUser = state.profiles.filter(
        profile => profile.id === parseInt(action.payload),
      );
      return {
        ...state,
        currentProfile: currentUser,
      };
    default:
      return state;
  }
};
// context provider
export const ProfilesContextProvider = ({children}) => {
  // create the reducer definition
  const [initialized, setInitialized] = useState(false);
  // const initialState = {
  //   username: "",
  //   firstName: "",
  //   lastName: "",
  //   favoriteTracks: [],
  //   favoriteArtists: [],
  //   following: [],
  //   followedBy: [],
  //   avatar: `../src/assets/avatar${Math.ceil(Math.random() * 6)}.jpg`,
  //   favoriteAlbums: [],
  //   loggedIn: false,
  //   id: "",
  // };
  const [state, dispatch] = useReducer(reducer, {
    profiles: [],
    userLoggedIn: 1,
    partyMix: {tracks: [], artists: [], genres: []},
  });
  // localStorage.setItem("currentUser", state.userLoggedIn);

  useEffect(() => {
    localStorage.setItem("currentUser", state.userLoggedIn);
  }, [state.userLoggedIn]);

  useEffect(() => {
    // GET fetch to dispatch
    fetch(`http://localhost:4000/profiles`)
      .then(resp => resp.json())
      .then(profiles => dispatch({type: "PROFILES", payload: profiles}))
      .catch(error => console.log("error", error.message));
  }, []);
  useEffect(() => {
    // GET fetch to dispatch
    fetch(`http://localhost:4000/profiles/${state.userLoggedIn}`)
      .then(resp => resp.json())
      .then(profile => dispatch({type: "GETCURRENT", payload: profile}))
      .catch(error => console.log("error", error.message));
  }, [state.userLoggedIn]);
  return (
    <ProfileContext.Provider value={{state, dispatch}}>
      {children}
    </ProfileContext.Provider>
  );
};
// don't forget to import the contextProvider, useContext AND the constants
// make sure that the constants are in curly brackets {}
