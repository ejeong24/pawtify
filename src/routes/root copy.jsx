import React, {useState, useEffect, useContext} from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
// these are styling components

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
//ROVER calls
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../components/Rover";
import {getANewToken} from "../components/auth";

// we can hide this in a config file later
// const clientId = "1f3d9dd466cd400784c8476e6cf4a80d";
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
const access_token = localStorage.getItem("access_token");
let profile = {};
const expiresAt = localStorage.getItem("expiresAt");

if (!expiresAt && !access_token) {
  // if ((!expiresAt && !access_token) || Date.now() > expiresAt) {
  // redirectToAuthCodeFlow(clientId);
  getANewToken();
}

async function fetchProfile(token) {
  // TODO: Call Web API
  const result = await fetch(`https://api.spotify.com/v1/me`, {
    method: "GET",
    headers: {Authorization: `Bearer ${token}`},
  });
  return await result.json();
}
export async function loader({params}) {
  console.log("loader called");
  const newReleases = await getAll("newReleases");
  return {newReleases};
}


// loader/action calls that will be changed to reducer
export async function loader({request}) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const items = await getItems(q);
  return {items, q};
}
export async function action() {
  const data = {username: ""};
  const item = await createItem(data);
  return redirect(`/items/${item.id}/edit`);
}
const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Root() {
  // get data from loader
  const {items, q} = useLoaderData();
  // to manage history in browser
  const navigation = useNavigation();
  // manage form submissions
  const submit = useSubmit();
  const {newReleases} = useLoaderData();
  console.log(newReleases);
  // search spinner
  const searching =
    navigation.location && // IF there is aURL
    new URLSearchParams(navigation.location.search).has("q"); // AND it has q= in it

  // ensure that query value is updated with change
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar />
        </Grid>

        <Grid item xs={3} id="sidebar" marginLeft={2}>
          <h2>Item List</h2>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search items"
                placeholder="Placen van Holden"
                type="search"
                name="q"
                defaultValue={q}
                onChange={event => {
                  // is q already defined
                  const isFirstSearch = q === null;
                  submit(event.currentTarget.form, {replace: !isFirstSearch});
                }}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
              <div className="sr-only" aria-live="polite"></div>
            </Form>
          </div>
          <Form method="post">
            <button type="submit">Add New Item</button>
          </Form>

          <nav>
            <List component="nav">
              {items.length ? (
                <ul>
                  {items.map(item => (
                    <ListItemButton key={item.id}>
                      <NavLink
                        to={`items/${item.id}`}
                        className={({isActive, isPending}) =>
                          isActive ? "active" : isPending ? "pending" : ""
                        }>
                        {`${item.name}`}
                      </NavLink>
                    </ListItemButton>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No Items</i>
                </p>
              )}
            </List>
          </nav>
        </Grid>
        <Grid
          item
          xs={8}
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}>
          <Outlet />
        </Grid>
        <Grid item xs={12}>
          <Item>FOOTER</Item>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Root;
