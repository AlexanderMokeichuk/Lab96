import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCocktailById} from "./cocktailsThunks";
import {useSelector} from "react-redux";
import {selectCocktail, selectCocktailsLauding} from "./cocktailsSlice";
import {Box, Grid, Typography} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner";
import {API_URL} from "../../constants";

const Cocktail: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const lauding = useAppSelector(selectCocktailsLauding);
  const cocktail = useSelector(selectCocktail);

  useEffect(() => {
    if (id) {
      dispatch(fetchCocktailById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {
        lauding
          ? (
            <Grid container justifyContent={"center"}>
              <Spinner/>
            </Grid>
          )
          : (
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Grid item sx={{
                display: "flex",
                gap: 5,
                mt: 3,
              }}>
                {cocktail?.image
                  ? (
                    <Box
                      component="img"
                      sx={{
                        height: 200,
                        width: 250,
                        borderRadius: 2
                      }}
                      src={`${API_URL}/${cocktail.image}`}
                    />
                  )
                  : undefined
                }
                <Grid item>
                  <Typography gutterBottom variant="h5" component="div" color={"white"}>
                    {cocktail?.name}
                  </Typography>
                  <Grid item sx={{
                    color: "white"
                  }}>
                    <Typography variant="h5" color={"white"} mb={2}>
                      Ingredients
                    </Typography>
                    <Grid item>
                      {cocktail?.ingredients.map((item) => {
                        return (
                          <div key={item.id}>
                            <strong style={{marginRight: 20}}>{item.name}</strong>
                            <strong>{item.quantity}</strong>
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item color={"white"}>
                <Typography variant="h5" color={"white"} mb={2}>
                  Recipe:
                </Typography>
                <div>
                  {cocktail?.recipe}
                </div>
              </Grid>
            </Grid>
          )
      }
    </>
  );
};

export default Cocktail;