import {redirect} from "react-router-dom";
import {deleteProfile} from "../components/Rover";
import {ProfileContext} from "../context/profileContext";

export async function action({params}) {
  const {state, dispatch} = useContext(ProfileContext);
  console.log(params);
  const deleted = await deleteProfile(params.id).then(deletedString => {
    localStorage.setItem("currentUser", 0);
    dispatch({type: "DELETE", payload: params.id});
  });
}
