import React, { useState, useEffect } from 'react';

async function save(savedBy, title, image, url) {
  const response = await fetch('http://localhost:3001/addRecipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      savedBy,
      title,
      image,
      url,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save recipe');
  }

  const data = await response.json();
  return data; 
}

const logUrl = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/getRecipeInstructions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.sourceUrl;
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    throw error;
  }
};

function Recomend({ recipes, user}) {
  const [recipeUrls, setRecipeUrls] = useState({});

  useEffect(() => {
    if (Array.isArray(recipes) && recipes.length > 0) {
      const fetchUrls = async () => {
        const urls = {};
        await Promise.all(
          recipes.map(async (recipe) => {
            try {
              const url = await logUrl(recipe.id);
              urls[recipe.id] = url;
            } catch (error) {
              console.error('Error fetching URL:', error);
            }
          })
        );
        setRecipeUrls(urls);
      };

      fetchUrls();
    }
  }, [recipes]);

  const handleSave = async (recipe, savedBy) => {
    if (savedBy) {
      try {
        const { title, image } = recipe;
        const url = recipeUrls[recipe.id];
        if (url) {
          const result = await save(savedBy, title, image, url);
          console.log('Recipe saved:', result);
        } else {
          console.error('No URL found for recipe:', recipe);
        }
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    } else {
      //prompt user to login
    }

  };

  return (
    <div className='recomend-container'>    
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} className='recipe'>
              <div className='recipe-left'>
                <h3>{recipe.title}</h3>
                {recipe.image && (
                  <img className='recipe-image'src={recipe.image} alt={recipe.title} />)}
              </div>

              {recipeUrls[recipe.id] && (
                <div className='recipe-url'>
                  <a href={recipeUrls[recipe.id]} target="_blank" rel="noopener noreferrer">
                    {recipeUrls[recipe.id]}
                  </a>
                </div>
              )}
              <button onClick={() => handleSave(recipe, user)}>save</button>
            </div>
          ))
        ) : (
          <p> Search for recipes!</p>
        )}
      </div>
  );
}

export default Recomend;
