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
    }, [recipes]);

    return (
        <div className='recomend-container'>
            {recipes.map(recipe => (
                <div key={recipe.id} className='recipe'>
                    <div className='recomend-left'>
                    <h3>{recipe.title}</h3>
                        {recipeUrls[recipe.id] && (
                            <div>
                                <a href={recipeUrls[recipe.id]} target="_blank" rel="noopener noreferrer">
                                    {recipeUrls[recipe.id]}
                                </a>
                            </div>
                        )}
                    </div>
                    <button className='recomend-save-button'>
                        <img src="/favorite-svgrepo-com.svg" alt='SVG-Image'></img>
                    </button>
                </div>
            ))}

        </div>
    );
}

export default Recomend;
