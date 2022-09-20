import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AppContext = React.createContext();


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);    
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState([]);


    async function fetchMeals(url) {
        setLoading(true);
        try {
            const { data } = await axios(url);
            if (data.meals) setMeals(data.meals);
            else setMeals([]);
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }; 

    function fetchRandomMeal() {
        fetchMeals(randomMealUrl);
    }
    
    function selectMeal(idMeal, favoriteMeal) {
        const meal = meals.find(meal => meal.idMeal === idMeal);
        setSelectedMeal(meal);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    function addToFavorites(idMeal){
        const meal = meals.find(meal => meal.idMeal === idMeal);
        const alredyFavorite = favorites.find(meal => meal.idMeal === idMeal);
        if (alredyFavorite) return;
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
    }

    function removeFromFavorites(idMeal){
        const updatedfavorites = favorites.filter(meal => meal.idMeal !== idMeal);
        setFavorites(updatedfavorites);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return ( 
        <AppContext.Provider 
            value= { { loading, meals, setSearchTerm, fetchRandomMeal, setShowModal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites} } >
            {children} 
        </AppContext.Provider>
     );
}




export const useGlobalContext = () => useContext(AppContext);
 
export { AppProvider };
