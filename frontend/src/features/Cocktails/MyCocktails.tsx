import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {fetchMyCocktails} from "./cocktailsThunks";
import {useNavigate} from "react-router-dom";
import CocktailCard from "./components/CocktailCard/CocktailCard";
import {selectCocktails} from "./cocktailsSlice";
import {Grid} from "@mui/material";

const MyCocktails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyCocktails(user._id));
    } else {
      navigate("/");
    }
  }, [dispatch, user, navigate]);

  return (
    <Grid
      container
      mt={4}
      gap={2}
      alignItems={"center"}
      justifyContent={"center"}
      flexWrap={"wrap"}
    >
      {
        cocktails.map((item) => {
          return <CocktailCard key={item._id} item={item}/>;
        })
      }
    </Grid>
  );
};

export default MyCocktails;