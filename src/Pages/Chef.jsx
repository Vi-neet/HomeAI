import { useState, useRef, useEffect } from "react";
import ItemsList from "../components/ItemsList";
import SolutionSection from "../components/SolutionSection";
import { getRecipeFromMistral } from "../Ais/ChefAi";

const Chef = () => {
  const [ingredients, setIngredients] = useState([
    "Pizza",
    "Cheese",
    "Tomato",
    "Basic Ingredients",
  ]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

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
    setLoading(true); // Set loading to true when fetching starts
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false); // Set loading to false when fetching is complete
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
          items={ingredients}
          toggle={getRecipe}
          ref={viewRecipeSection}
          title="Ingredients on Hand:"
          readyTitle="Ready for a Recipe?"
          readyDescription="Generate a recipe for your list of ingredients."
          buttonText="Get a Recipe"
        />
      )}
      {loading && <p>Loading...</p>}
      {recipe && (
        <SolutionSection item={recipe} solutionTitle="Chef Recommends:" />
      )}
    </main>
  );
};

export default Chef;
