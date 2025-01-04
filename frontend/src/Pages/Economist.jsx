import { useState, useRef, useEffect } from "react";
import ItemsList from "../components/ItemsList";
import SolutionSection from "../components/SolutionSection";
import { getBudgetFromMistral } from "../Ais/EconomistAI";
import LinearWithValueLabel from "../components/LinearProgressWithLabel";

const Economist = () => {
  const [prices, setPrices] = useState([
    "Rent: 1000",
    "Groceries: 200",
    "Utilities: 100",
    "Income:20000",
  ]);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const viewBudgetSection = useRef(null);


  useEffect(() => {
    if (budget !== "" && viewBudgetSection.current !== null) {
      viewBudgetSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [budget]);

  function addPrice(formData) {
    const newPrice = formData.get("ingredient");

    setPrices((prevPrices) => [...prevPrices, newPrice]);
  }

  async function getBudget() {
    setLoading(true);
    const budgetMarkdown = await getBudgetFromMistral(prices);
    setBudget(budgetMarkdown);
    setLoading(false);
  }

  return (
    <main>
      <form action={addPrice} className="form">
        <input
          type="text"
          aria-label="Add Price"
          placeholder="e.g. rent is 1000"
          className="input-field"
          name="ingredient"
        />
        <button className="input-btn">Add Price</button>
      </form>
      {prices.length > 0 && (
        <ItemsList
          items={prices}
          toggle={getBudget}
          ref={viewBudgetSection}
          title="Prices on Hand:"
          readyTitle="Ready for a Budget?"
          readyDescription="Generate a recipe for your list of prices."
          buttonText="Get a Budget"
        />
      )}
      {loading && (
        <LinearWithValueLabel/>
      )}
      <div className={loading ? "blurred" : ""}>
        {budget && (
          <SolutionSection
            item={budget}
            solutionTitle="Economist Recommends:"
          />
        )}
      </div>
    </main>
  );
};

export default Economist;
