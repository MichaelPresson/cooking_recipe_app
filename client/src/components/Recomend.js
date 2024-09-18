import React, { useState, useEffect } from 'react';
import { ReactComponent as HeartIcon } from '../assets/svg-heart.svg';

async function save(recipeId, savedBy, title, image, url) {
  const response = await fetch('http://localhost:3001/addRecipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipeId,
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
    console.log(`Fetching recipe instructions for ID: ${id}`);
    const response = await fetch(`http://localhost:3001/getRecipeInstructions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch:', response.status, response.statusText);
      throw new Error(`Failed to fetch instructions for recipe ID: ${id}`);
    }

    const data = await response.json();
    return data.sourceUrl;
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    throw error;
  }
};


function Recomend({ recipes, user, savedRecipes, updateSavedRecipes }) {
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

async function deleteRecipe(id, savedBy) {
  const response = await fetch(`http://localhost:3001/deleteRecipe/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedBy })  // Include the savedBy in the request body
  });

  if (response.ok) {
      console.log('Recipe deleted successfully');
    } else {
      console.error('Failed to delete the recipe:', await response.json());
    } 
  }


  const handleSave = async (recipe, user) => {

    //if logged in
    if (user) {
      const { id, title, image } = recipe;
      const url = recipeUrls[id];
      
      //save recipe if not saved otherwise delete
      if (!isRecipeSaved(recipe)) {
        try {

          if (url) {
            await save(id, user, title, image, url);
            updateSavedRecipes()
          } else {
            console.error('No URL found for recipe:', recipe);
          }
          } catch (error) {
           console.error('Error saving recipe:', error);
          }
      } else {
        try {
          await deleteRecipe(id, user)
          updateSavedRecipes()
          console.log('succesfully deleted recipe: ', id)
        } catch (error) {
          console.error('Error deleting recipe', error)
        }
      }
    } else {
        //prompt user to login
    }
  }


  const isRecipeSaved = (recipe) => {
    const id = recipe.id
    for (const element of savedRecipes) {
      if (element.recipeId === id) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className='recomend-container'>
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className='recipe'>
            <div className='recipe-left'>
              <h3>{recipe.title}</h3>
              {recipe.image && (
                <img className='recipe-image' src={recipe.image} alt={recipe.title} />
              )}
            </div>

            {recipeUrls[recipe.id] && (
              <div className='recipe-url'>
                <a href={recipeUrls[recipe.id]} target="_blank" rel="noopener noreferrer">
                  {recipeUrls[recipe.id]}
                </a>
              </div>
            )}
            <HeartIcon
              alt='heart'
              className={`save-image ${isRecipeSaved(recipe) ? 'saved' : ''}`}
              onClick={() => handleSave(recipe, user)}
            />
          </div>
        ))
      ) : (
        <p>Search for recipes!</p>
      )}
    </div>
  );
}

export default Recomend;
