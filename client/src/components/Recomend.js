import React, { useState, useEffect } from 'react';

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

function Recomend({ recipes }) {
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

  return (
    <div className='recomend-container'>
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className='recipe'>
            <div className='recomend-left'>
              <h3>{recipe.title}</h3>
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              {recipeUrls[recipe.id] && (
                <div>
                  <a href={recipeUrls[recipe.id]} target="_blank" rel="noopener noreferrer">
                    {recipeUrls[recipe.id]}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default Recomend;
