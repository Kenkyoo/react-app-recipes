import React, { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ShowResults from './results';

const Search = () => {
    const [results, setResults] = useState([]);
    const [random, setRandom] = useState([]);
    const [query, setQuery] = useState('');
    const [cuisine, setCuisin] = useState('none');
    const [diet, setDiet] = useState('');
    const [types, setTypes] = useState('');
    const [sorts, setSorts] = useState('');
    const [vegan, setVegan] = useState(false);
    const [maxReadyTime, setMaxReadyTime] = useState(15);
    const [loading, setLoading] = useState(false);

    const getRandom = async () => {
      try {
      const res = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: '1dc1fbdc41eb48eab255a1670dab9c28',
          number: 1
        } // Sending parameters to our API
      });
      const {data} = res; // Object destructuring to extract data from our response
      console.log(data.recipes);
      setRandom(data.recipes);      
      } catch (error) {
        console.log(error);    
      }
    }

    const getRecipes = async () => {

      if (!query.trim()) return;
      
      try {
        if (cuisine === 'none') setCuisin('');
        setLoading(true);
        const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: '1dc1fbdc41eb48eab255a1670dab9c28',
            number: 20,
            query,
            cuisine,
            diet,
            maxReadyTime,
            sorts,
            types
          } // Sending parameters to our API
        });
        const {data} = res; // Object destructuring to extract data from our response
        setResults(data.results); // Store results in the response state
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
  <>
  <div className='p-2 mx-auto rounded border-2 border-primary shadow-xl'>
  	<form
        className='flex flex-col justify-center items-center p-2 gap-4'
				onSubmit={e => {
					getRecipes(); // Trigger getRecipes function when search button is clicked
					e.preventDefault();
					e.stopPropagation();
				}}
			>

      <h2 className="text-base font-semibold leading-7">Profile</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
        <div className='relative'>     
        <input
          className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
  
        <div className="absolute right-0 inset-y-0 flex items-center">
           <svg
      xmlns="http://www.w3.org/2000/svg"
      className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => setQuery(query)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
           </svg>
        </div>

        <div className="absolute left-0 inset-y-0 flex items-center">
          <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
          </svg>
        </div>

      </div>
      <div>
      <select 
        onChange={e => setCuisin(e.target.value)}
        className="select select-bordered w-96 max-w-xs"
      >
        {[
                'none', 
								'african',
								'asian',
								'chinese',
								'european',
								'indian',
								'mexican',
                'mediterranean',
                'spanish',
                'thai'
							].map(cuisine => {
								return <option key={nanoid()} value={cuisine}>{cuisine}</option>;
					})}
      </select> 
      </div>

      <div>
      <select 
        onChange={e => setTypes(e.target.value)}
        className="select select-bordered w-96 max-w-xs"
      >
        {[
								'breakfast',
								'bread',
								'appetizer',
								'sauce',
								'soup',
								'snack',
                'drink'
							].map(types => {
								return <option key={nanoid()} value={types}>{types}</option>;
					})}
      </select>
      </div>

      <div>
      <select 
        onChange={e => setSorts(e.target.value)}
        className="select select-bordered w-96 max-w-xs"
      >
        {[
								'popularity',
								'random',
								'price',
								'meta-score',
								'time'
							].map(sorts => {
								return <option key={nanoid()} value={sorts}>{sorts}</option>;
					})}
      </select>
      </div>

      <div>
      <h3>Ready time: {maxReadyTime}</h3>
      <input 
        type="range" 
        min={0} 
        max={100} 
        value={maxReadyTime} 
        onChange={e => setMaxReadyTime(parseInt(e.target.value, 10))} 
        className="range mt-2" 
      />
      </div>

      <div>
      <label className="label cursor-pointer">
        <span className="label-text">Vegan?</span>
        <input
          checked={vegan}
          onChange={e => {
            setVegan(e.target.checked)
            setDiet(e.target.checked ? 'vegan' : '')
          }}   
          type="checkbox" 
          defaultChecked 
          className="toggle" 
        />
      </label>
      </div>

        <button
          className="btn btn-primary mx-auto"
					type="submit"
				>
					Search
				</button>
        
    </form>
  </div>

  <div className="divider my-8">OR</div>

  <div className='flex items-stretch'>
    <button className="btn btn-primary mx-auto self-center text-center" onClick={getRandom}>Random</button>
  </div>
  

    {loading ? (
  <p>Cargando...</p>
) : results.length > 0 ? (
  <ShowResults data={results} /> // Si hay resultados de búsqueda, se muestran
) : random.length > 0 ? (
  <ShowResults data={random} /> // Si no hay resultados de búsqueda pero sí una receta aleatoria, se muestra
) : (
  <p>Sin resultados</p> // Si ambos están vacíos, mostrar mensaje de sin resultados
)}
  </>  
      );
}

export default Search;