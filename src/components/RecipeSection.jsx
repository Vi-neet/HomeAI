/* eslint-disable react/prop-types */
import Markdown from 'react-markdown'

const RecipeSection = (props) => {
  const markdown= props.recipe
  return (
    <section className='suggested-recipe-container' aria-live="polite">
    <h2>Chef Claude Reccomends:</h2>
    <Markdown>{markdown}</Markdown>
    </section>
  )
}

export default RecipeSection
