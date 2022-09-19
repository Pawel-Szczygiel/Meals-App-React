import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AppContext = React.createContext();


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
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

    
    useEffect(() => {
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return ( 
        <AppContext.Provider value= { { loading, meals, setSearchTerm} }>
            {children} 
        </AppContext.Provider>
     );
}




export const useGlobalContext = () => useContext(AppContext);
 
export { AppProvider };
