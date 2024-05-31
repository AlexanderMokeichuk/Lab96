import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCocktails, selectCocktailsLauding} from "./cocktailsSlice";
import {fetchCocktails} from "./cocktailsThunks";
import Spinner from "../../UI/components/Spinner/Spinner";
import {Button, Grid} from "@mui/material";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert";
import {CHECKING_PUBLICATIONS} from "../../constants";
import {selectUser} from "../Users/usersSlice";
import CocktailCard from "./components/CocktailCard/CocktailCard";
import {Link} from "react-router-dom";

const Cocktails: React.FC = () => {
  const dispatch = useAppDispatch();
  const lauding = useAppSelector(selectCocktailsLauding);
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const check = CHECKING_PUBLICATIONS(cocktails);

  return (
    <Grid
      container
      marginTop={5}
      flexDirection={"column"}
    >
      {lauding
        ? <Spinner/>
        : (
          <>
            <Link to={"/my-cocktails"} style={{marginLeft: "auto", marginBottom: 20,}}>
              <Button color="secondary" variant="outlined">
                My cocktails
              </Button>
            </Link>
            <Grid item sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}>
              {check || user?.role === "admin"
                ? cocktails.map((item) => {
                  return <CocktailCard key={item._id} isPermissionsChecked={true} item={item}/>;
                })
                : (
                  <OwnAlert>
                    There is no published cocktail!!
                  </OwnAlert>
                )
              }
            </Grid>
          </>
        )
      }
    </Grid>
  );
};

export default Cocktails;