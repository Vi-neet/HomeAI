/* eslint-disable react/prop-types */
// import Markdown from "react-markdown";
import { marked } from "marked";

const SolutionSection = ({item, solutionTitle}) => {
  const renderedMarkdown = marked(item);
  return (
    <section className="suggested-solution-container" aria-live="polite">
      <h2>{solutionTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
    </section>
  );
};

export default SolutionSection;
