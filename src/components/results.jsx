import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const ShowResults = ({ data }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null); // Para almacenar los detalles completos de la receta

  // Efecto para obtener los detalles de la receta cuando `selectedRecipe` cambia
  useEffect(() => {
    if (selectedRecipe) {
      // Realizar llamada a la API con el `id` de la receta seleccionada
      fetch(`https://api.spoonacular.com/recipes/${selectedRecipe}/information?&apiKey=1dc1fbdc41eb48eab255a1670dab9c28`)
        .then((res) => res.json())
        .then((data) => {
          setRecipeDetails(data); // Almacena los detalles de la receta en el estado
        })
        .catch((error) => console.error(error));
    }
  }, [selectedRecipe]);

  if (recipeDetails) {
    // Renderizar los detalles de la receta seleccionada
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto p-6 rounded-lg shadow-lg w-full">
          <h1 className="text-2xl font-bold mb-4">{recipeDetails.title}</h1>
          <img
            className="max-w-sm mx-auto my-4 rounded-lg shadow"
            src={recipeDetails.image}
            alt={recipeDetails.title}
          />
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {recipeDetails.extendedIngredients.map((ingredient) => (
              <li className="mb-2" key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside mb-6">
            {recipeDetails.analyzedInstructions.length > 0 &&
              recipeDetails.analyzedInstructions[0].steps.map((instruction) => (
                <li key={instruction.number} className="mb-2">{instruction.step}</li>
              ))
            }
          </ol>
          <div className="text-center">
            <button
              onClick={() => {
                setSelectedRecipe(null); // Reinicia el estado para volver a la lista de resultados
                setRecipeDetails(null); // Limpia los detalles de la receta
              }}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Mapeo de los resultados de búsqueda para mostrar las recetas
  const recipes = data.map((recipe) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      key={recipe.id}
      className="rounded overflow-hidden shadow-lg flex flex-col"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-full"
        src={recipe.image}
        alt="Recipe"
      />
      <div className="px-6 py-4 mb-auto">
        <a
          onClick={() => setSelectedRecipe(recipe.id)} // Al hacer clic, guarda el id de la receta seleccionada
          href="#"
          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
        >
          {recipe.title}
        </a>
      </div>
    </motion.div>
  ));

  return (
    <div className="container mx-auto px-4">

  <div className="hero-content text-center my-3">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Mostrando resultados:</h1>
    </div>
  </div>

      <div className='columns-1 md:columns-3 gap-6'>
        {data.length ? recipes : "No data to display"}
      </div>
    </div>
  );
};

export default ShowResults;
