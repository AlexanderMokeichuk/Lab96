import React, {ChangeEvent, FormEvent, useState} from "react";
import {CocktailInForm, Ingredient} from "../../../../type";
import {Box, Button, Grid, IconButton, Snackbar, TextField} from "@mui/material";
import FileInput from "../../../../UI/components/FileInput/FileInput";
import DeleteIcon from "@mui/icons-material/Delete";
import {nanoid} from "nanoid";
import {useAppDispatch} from "../../../../app/hooks";
import {postCocktail} from "../../cocktailsThunks";
import CloseIcon from "@mui/icons-material/Close";

const defaultCocktail: CocktailInForm = {
  name: "",
  image: null,
  recipe: "",
};

const defaultIngredients: Ingredient[] = [
  {id: "111", name: "", quantity: ""},
  {id: "222", name: "", quantity: ""},
];

const AddNewCocktail: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState<CocktailInForm>(defaultCocktail);
  const [ingredients, setIngredients] = useState<Ingredient[]>(defaultIngredients);

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOpen(true);
    await dispatch(postCocktail({...formState, ingredients: ingredients}));
    setFormState(defaultCocktail);
    setIngredients(defaultIngredients);
  };

  const addIngredients = () => {
    setIngredients(prevState => [...prevState, {id: nanoid(), name: "", quantity: ""}]);
  };

  const deleteIngredients = (id: string) => {
    const newIngredients: Ingredient[] = ingredients.filter(ingredient => ingredient.id !== id);
    setIngredients(newIngredients);
  };

  const changeIngredients = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const {name, value} = e.target;

    const newIngredients = ingredients.map((item) => {
      if (id === item.id) {
        return {...item, [name]: value};
      }
      return item;
    });
    setIngredients(newIngredients);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}/>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid
      container
      justifyContent={"center"}
      bgcolor={"white"}
      padding={5}
      borderRadius={4}
      mt={5}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your cocktail is being checked by the administrator"
        action={action}
      />
      <form onSubmit={onSubmit}>
        <Grid
          item
          sx={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            id="input-with-sx"
            name={"name"}
            label="name"
            required

            value={formState.name}
            onChange={onChangeForm}
          />


          <Box sx={{minWidth: 120, padding: 1}}>
            {ingredients.map((ingredient, index) => {
              return (
                <Grid key={index} item sx={{
                  display: "flex",
                  gap: 1,
                }}>
                  <TextField
                    id="input-with-sx"
                    name={"name"}
                    label="Name"
                    required

                    sx={{
                      width: "60%",
                    }}
                    defaultValue={ingredient.name}
                    onChange={(e) => changeIngredients(e, ingredient.id)}
                  />
                  <TextField
                    id="input-with-sx"
                    name={"quantity"}
                    label="Quantity"
                    required

                    sx={{
                      width: "30%",
                    }}
                    defaultValue={ingredient.quantity}
                    onChange={(e) => changeIngredients(e, ingredient.id)}

                  />
                  <IconButton onClick={() => deleteIngredients(ingredient.id)} aria-label="delete">
                    <DeleteIcon/>
                  </IconButton>
                </Grid>
              );
            })}

            <Button
              type={"button"}
              variant={"outlined"}
              color={"info"}
              sx={{mt: 1}}
              onClick={addIngredients}
            >
              Add ingredient
            </Button>
          </Box>

          <FileInput
            name={"image"}
            onChange={onChangeFileInput}
          />

          <TextField
            id="input-with-sx"
            name={"recipe"}
            multiline
            fullWidth={true}
            minRows={2}
            maxRows={10}
            label="Recipe"
            required

            value={formState.recipe}
            onChange={onChangeForm}
          />

          <Button
            variant="contained"
            aria-label="Basic button group"
            type={"submit"}
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: "auto"
            }}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddNewCocktail;