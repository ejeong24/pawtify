import {Form, useLoaderData, redirect, useNavigate} from "react-router-dom";
import {updateProfile} from "../components/Rover";

export async function action({request, params}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateProfile(params.id, updates);
  return redirect(`/profile/${params.id}`);
  // return redirect(`/home`);
}

export default function EditProfile({currentProfile}) {
  const {profile} = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <Form
        method="post"
        id="profileForm"
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John Doe"
            defaultValue={profile.firstName}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            defaultValue={profile.lastName}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="username"
            name="username"
            defaultValue={profile.username}
          />
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
            onClick={() => {
              navigate(-1);
            }}>
            Cancel
          </button>
        </div>
      </Form>
      <div>Your favorites and stuff show here</div>
    </div>
  );
}
