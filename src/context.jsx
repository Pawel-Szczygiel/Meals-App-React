import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AppContext = React.createContext();


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({children}) => {
    const getFavoritesFromLocalStorage = JSON.parse( window.localStorage.getItem('favorites') );

    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);    
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState( getFavoritesFromLocalStorage || [] );


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
        console.log('idMeal ' + idMeal )
        console.log('favoriteMeal ' + favoriteMeal )
        let meal;
        if (favoriteMeal) {
            meal = favorites.find(meal => meal.idMeal === idMeal);
        } else {
            meal = meals.find(meal => meal.idMeal === idMeal);
        }
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
        window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    
    function removeFromFavorites(idMeal){
        const updatedFavorites = favorites.filter(meal => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
