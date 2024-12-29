/* eslint-disable react/prop-types */
import { useState } from "react";
import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Modal from "./Modal";

const SolutionSection = ({ item, solutionTitle }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const renderedMarkdown = marked(item);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    const response = await fetch("http://localhost:4000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("Item saved");
    }
  };

  return (
    <section className="suggested-solution-container" aria-live="polite">
      <div className="solution-header">
        <h2>{solutionTitle}</h2>
        <button
          className="heart-button"
          aria-label="Like"
          onClick={toggleSelection}
          style={{ color: isSelected ? "#c92a2a" : "#000" }}
        >
          <FontAwesomeIcon icon={isSelected ? faHeartSolid : faHeartRegular} />
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </section>
  );
};

export default SolutionSection;
