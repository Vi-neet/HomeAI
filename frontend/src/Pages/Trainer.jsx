import { useState, useRef, useEffect } from "react";
import ItemsList from "../components/ItemsList";
import SolutionSection from "../components/SolutionSection";
import { getWorkoutRoutineFromMistral } from "../Ais/TrainerAi";

const Trainer = () => {
  const [exercises, setExercises] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const viewWorkoutSection = useRef(null);

  useEffect(() => {
    if (workoutPlan !== "" && viewWorkoutSection.current !== null) {
      viewWorkoutSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [workoutPlan]);

  function addExercise(formData) {
    const newExercise = formData.get("exercise");

    setExercises((prevExercises) => [...prevExercises, newExercise]);
  }

  async function getWorkoutPlan() {
    setLoading(true); // Set loading to true when fetching starts
    const workoutMarkdown = await getWorkoutRoutineFromMistral(exercises);
    setWorkoutPlan(workoutMarkdown);
    setLoading(false); // Set loading to false when fetching is complete
  }

  return (
    <main>
      <form action={addExercise} className="form">
        <input
          type="text"
          aria-label="Add Exercise"
          placeholder="e.g. push-ups"
          className="input-field"
          name="exercise"
        />
        <button className="input-btn">Add Exercise</button>
      </form>
      {exercises.length > 0 && (
        <ItemsList
          items={exercises}
          title="Exercises on Hand:"
          readyTitle="Ready for a Workout Plan?"
          readyDescription="Generate a workout plan for your list of exercises."
          buttonText="Get a Workout Plan"
          toggle={getWorkoutPlan}
          ref={viewWorkoutSection}
        />
      )}
      {loading && <p>Loading...</p>}
      {workoutPlan && (
        <SolutionSection
          item={workoutPlan}
          solutionTitle="Trainer Recommends:"
        />
      )}
    </main>
  );
};

export default Trainer;
