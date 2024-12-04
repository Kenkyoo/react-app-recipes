import { useState } from 'react';
import { motion } from "framer-motion"

const Cards = ({ data }) => {

  const [selectedRecipe, setSelectedRecipe] = useState(null);

if (selectedRecipe) {
  return (

  <motion.div
    animate={{ x: 100 }}
    transition={{ type: "spring", stiffness: 100 }}
  >  
  <div className="bg-primary mx-auto p-6 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4 ">{selectedRecipe.title}</h1>
    <img
      className="max-w-sm mx-auto my-4 rounded-lg shadow"
      src={selectedRecipe.image}
      alt={selectedRecipe.title}
    />
    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
    <ul className="list-disc list-inside mb-4">
      {selectedRecipe.extendedIngredients.map((ingredient) => (
        <li className="mb-2" key={ingredient.id}>{ingredient.original}</li>
      ))}
    </ul>
    <h2 className="text-xl font-semibold mb-2">Instructions</h2>
    <ol className="list-decimal list-inside mb-6">
      {selectedRecipe.analyzedInstructions[0].steps.map((instruction) => (
        <li key={instruction.number} className="mb-2">{instruction.step}</li>
      ))}
    </ol>
    <p className="text-gray-700 mb-4">
      Serve the cake with your favorite frosting or enjoy it plain!
    </p>
    <div className="text-center">
      <button onClick={() => setSelectedRecipe(null)} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        Back
      </button>
    </div>
  </div>
  </motion.div>
  )
}  

    const recipes =  data.map((recipe) => {

        return (

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            key={recipe.id} 
            className="rounded overflow-hidden shadow-lg flex flex-col"
          >
            <a href={recipe.image}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
                className="w-full" 
                src={recipe.image} 
                alt="Recipe" 
              ></motion.img>
            </a>
            <div className="px-6 py-4 mb-auto">
              <a onClick={() => setSelectedRecipe(recipe)} href="#" className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                {recipe.title}
              </a>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
  <span
    href="#"
    className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
  >
    <svg
      height="13px"
      width="13px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
        </g>
      </g>
    </svg>
    <span className="ml-1">{recipe.readyInMinutes}</span>
  </span>
  <span
    href="#"
    className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
  >
    <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      ></path>
    </svg>
    <span className="ml-1">{recipe.likes}</span>
  </span>
</div>

          </motion.div>
        );
      })

      return (
        <>  
          {data ? recipes : "No data to display"}
        </>  
        );  
};

export default Cards;
