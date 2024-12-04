import { useState, useEffect } from 'react';
import Cards from './cards.jsx';

const Fetch = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=1dc1fbdc41eb48eab255a1670dab9c28')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.recipes);
        setRecipes(data.recipes);
      });
  }, []);
  return (
    <>
      {recipes.length > 0 ? <Cards data={recipes} /> : <p>Loading recipes...</p>}
    </>  
  );
};
export default Fetch;
