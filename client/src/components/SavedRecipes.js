import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getSavedRecipes');
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
                setError('Failed to fetch saved recipes');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='recomend-container'>
            {recipes.map((recipe) => (
                <div className='recipe'>
                    <h2>{recipe.title}</h2>
                    <div className='recipe-url'>
                        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                            {recipe.url}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

