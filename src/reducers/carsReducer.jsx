export const initialState = {cars: [], isLoaded: false};

//make a reducer function

export default function carsReducer(state, action) {
  const {type, payload} = action;
  // define action types

  switch (type) {
    case "Loading_Car_Lot":
      console.log("loading car data");
      return {...state, cars: payload, isLoaded: true};
      break;
    case "Adding_New_Car":
      console.log("Adding new car", payload);
      break;
    case "Updating_Car_Listing":
      console.log("Updating listing", payload);
      break;
    case "Deleting_Car_Listing":
      console.log("Deleting listing", payload);
      break;
    case "errorFetch":
      console.log(error);
      break;
    default:
      throw new Error(`No case was found for ${type} in carsReducer.`);
  }
}
