import {redirect} from "react-router-dom";
import {deleteProfile} from "../components/Rover";

export async function action({params}) {
  await deleteProfile(params.id);
  return redirect("/");
}
