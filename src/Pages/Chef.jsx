import { useState, useRef, useEffect } from "react";
import ItemsList from "../components/ItemsList";
import SolutionSection from "../components/SolutionSection";
import { getRecipeFromMistral } from "../Ais/ai";

const Chef = () => {
  const [ingredients, setIngredients] = useState([
    "Pizza",
    "Cheese",
    "Tomato",
    "Basic Ingredients",
  ]);
  const [recipe, setRecipe] = useState("");

  const viewRecipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && viewRecipeSection.current !== null) {
      viewRecipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }
  return (
    <main>
      <form action={addIngredient} className="form">
        <input
          type="text"
          aria-label="Add Ingredient"
          placeholder="e.g. oregano"
          className="input-field"
          name="ingredient"
        />
        <button className="input-btn">Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <ItemsList
          ingredients={ingredients}
          toggle={getRecipe}
          ref={viewRecipeSection}
        />
      )}
      {recipe && <SolutionSection recipe={recipe} />}
    </main>
  );
};

export default Chef;
