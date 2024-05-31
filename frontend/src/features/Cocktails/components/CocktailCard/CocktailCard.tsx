import React from "react";
import {CocktailApi} from "../../../../type";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectUser} from "../../../Users/usersSlice";
import {Link} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import imageNotAvailable from "../../../../../public/noImage.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {API_URL, PERMISSIONS_CHECK} from "../../../../constants";
import {Box, Button, Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import {deleteCocktail, editIsPublishCocktail, fetchCocktails} from "../../cocktailsThunks";


interface Props {
  item: CocktailApi;
  isPermissionsChecked?: boolean;
}

const CocktailCard: React.FC<Props> = ({item, isPermissionsChecked}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let cardImage = imageNotAvailable;

  if (item.image !== null) {
    cardImage = API_URL + '/' + item.image;
  }

  const deleteAlbumApi = async () => {
    if (confirm("Should I delete this cocktail?")) {
      await dispatch(deleteCocktail(item._id));
      await dispatch(fetchCocktails());
    }
  };

  const publish = async () => {
    await dispatch(editIsPublishCocktail(item._id));
    await dispatch(fetchCocktails());
  };


  let permissionsCheck = true;
  if (isPermissionsChecked) {
    permissionsCheck = PERMISSIONS_CHECK(user, item.isPublished);
  }

  return (
    <Grid
      item
      xs
      md={4}
      lg={3}
      style={
        permissionsCheck
          ? {display: "block"}
          : {display: "none"}
      }
    >
      <Card sx={{
        background: "##00FFFF",
        border: 4,
        borderColor: "#9932CC",
        width: 250,
      }}>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          src={cardImage}
        />
        <CardContent>
          {item.name}
        </CardContent>
        <Grid item sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <CardActions>
            <IconButton component={Link} to={`/cocktail/${item._id}`}>
              <ArrowForwardIcon/>
            </IconButton>
          </CardActions>
          {user?.role === "admin"
            ? (
              <Grid item>
                <IconButton type={"button"} onClick={deleteAlbumApi}>
                  <DeleteIcon/>
                </IconButton>
                <Button type={"button"} onClick={publish} color={"secondary"}>
                  {!item.isPublished
                    ? "Publish"
                    : "Deactivate"
                  }
                </Button>
              </Grid>
            )
            : undefined
          }
        </Grid>
      </Card>
    </Grid>
  );
};

export default CocktailCard;