import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SavedRecipes({ user }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3001/getSavedRecipes?savedBy=${user}`)
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
                setError('Failed to fetch saved recipes');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [user]);

    if (!user) {
        return <div className='recomend-container'><p>Login to save recipes</p></div>
    }

    if (loading) {
        return <div className='recomend-container'>Loading...</div>;
    }

    if (error) {
        return <div className='recomend-container'>{error}</div>;
    }

    return (
        <div className='recomend-container'>
            {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe) => (
                <div className='recipe'>
                    <h2>{recipe.title}</h2>
                    <div className='recipe-url'>
                        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                            {recipe.url}
                        </a>
                    </div>
                </div>
            ))
        ): ( 
            <p> Your saved recipes will apear here</p>
        )}

        </div>
    );
};

