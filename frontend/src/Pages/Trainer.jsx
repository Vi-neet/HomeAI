import { useState, useRef, useEffect } from "react";
import ItemsList from "../components/ItemsList";
import SolutionSection from "../components/SolutionSection";
import { getWorkoutRoutineFromMistral } from "../Ais/TrainerAi";
import SyncLoader from "react-spinners/SyncLoader";

const Trainer = () => {
  const [exercises, setExercises] = useState([
    "bench",
    "barbell",
    "squat rack",
    "plates upto 200kg",
    "4 day routine",
  ]);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const viewWorkoutSection = useRef(null);
  const override = {
    display: "block",
    margin: "2rem auto",
    textAlign: "center",
    position: "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  };

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
    setLoading(true);
    const workoutMarkdown = await getWorkoutRoutineFromMistral(exercises);
    setWorkoutPlan(workoutMarkdown);
    setLoading(false);
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
      {loading && (
        <SyncLoader
          color="#495057"
          speedMultiplier={0.8}
          size={20}
          loading={loading}
          cssOverride={override}
        />
      )}
      <div className={loading ? "blurred" : ""}>
        {workoutPlan && (
          <SolutionSection
            item={workoutPlan}
            solutionTitle="Trainer Recommends:"
          />
        )}
      </div>
    </main>
  );
};

export default Trainer;