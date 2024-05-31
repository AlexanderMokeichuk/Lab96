import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {fetchMyCocktails} from "./cocktailsThunks";
import {useNavigate} from "react-router-dom";
import {selectCocktails, selectCocktailsLauding} from "./cocktailsSlice";
import {Grid} from "@mui/material";
import CocktailCard from "./components/CocktailCard/CocktailCard";
import Spinner from "../../UI/components/Spinner/Spinner";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert";

const MyCocktails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const lauding = useAppSelector(selectCocktailsLauding);
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
      {lauding
        ? <Spinner/>
        : cocktails.length
          ? (
            cocktails.map((item) => {
              return <CocktailCard key={item._id} item={item}/>;
            })
          )
          : (
            <OwnAlert>
              You don't have cocktails
            </OwnAlert>
          )
      }
    </Grid>
  );
};

export default MyCocktails;