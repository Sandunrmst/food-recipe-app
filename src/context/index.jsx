import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const [defaultRecipeList, setDefaultRecipeList] = useState([]);

  const navigate = useNavigate();

  //default recipe List
  async function defaultList() {
    const def = "apple";
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${def}`
      );

      const data = await response.json();
      if (data?.data?.recipes) {
        setDefaultRecipeList(data?.data?.recipes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    defaultList();
  }, []);

  console.log(defaultRecipeList, "default List");

  //user search and submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddFavorite(getCurrentItem) {
    let copyFavoritesList = [...favoritesList];
    //Check that current item in the copyFavoritesList array or not
    const index = copyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    //If it not exist add to list
    if (index === -1) {
      copyFavoritesList.push(getCurrentItem);
    } else {
      copyFavoritesList.splice(index);
    }

    setFavoritesList(copyFavoritesList);

    // console.log(getCurrentItem);
  }
  console.log(favoritesList, "favorites list");

  // console.log(loading, recipeList);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddFavorite,
        favoritesList,
        defaultRecipeList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
