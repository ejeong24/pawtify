import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {grey} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Form, useLoaderData, useFetcher} from "react-router-dom";
import {Widgets} from "@mui/icons-material";
import {baseURL, getItem, getItems, updateItem} from "../components/Rover";

const ExpandMore = styled(props => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
// get data on a SINGLE item
export async function loader({params}) {
  const item = await getItem(params.id);
  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return {item};
}

// update the favorite
export async function action({request, params}) {
  let formData = await request.formData();
  return updateItem(params.id, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Item() {
  const {item} = useLoaderData();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="item">
      <Card sx={{maxWidth: 345}}>
        <CardHeader
          title={`${item.car_model_year} ${item.car_make} ${item.car_model}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={item.user_image_url || item.image || null}
          alt={`${item.car_model_year} ${item.car_make} ${item.car_model}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This {item.condition} {item.car_model} is yours for ${item.price}!
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Favorite item={item} />

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Condition: {item.condition}</Typography>
            <Typography paragraph>Mileage: {item.mileage}</Typography>
            <Typography paragraph>Color: {item.color}</Typography>
            <Typography paragraph>Transmission: {item.transmission}</Typography>
            <Typography paragraph>Fuel Type: {item.fuel_type}</Typography>
          </CardContent>
        </Collapse>
      </Card>

      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
      <Form
        method="post"
        action="destroy"
        onSubmit={event => {
          if (!confirm("Please confirm you want to delete this listing.")) {
            event.preventDefault();
          }
        }}>
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}

function Favorite({item}) {
  const fetcher = useFetcher();
  let favorite = item.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
