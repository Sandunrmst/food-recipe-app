import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe";

const Home = () => {
  const { loading, recipeList, defaultRecipeList } = useContext(GlobalContext);

  if (loading) return <div>Loading...</div>;

  //default items loading
  if (recipeList && recipeList.length < 1)
    return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {defaultRecipeList && defaultRecipeList.length > 0 ? (
          defaultRecipeList.map((item, index) => (
            <RecipeItem key={item.id} item={item} />
          ))
        ) : (
          <div>
            <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
              Something went wrong
            </p>
          </div>
        )}
      </div>
    );

  //Loading searched items
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item, index) => (
          <RecipeItem key={item.id} item={item} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            No Items found please search something
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
