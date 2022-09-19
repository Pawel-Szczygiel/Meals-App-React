import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from 'react-icons/bs';

import Loader from "./Loader";

const Meals = () => {
    
    const { loading, meals } = useGlobalContext();
    
    if (loading) {
        return <Loader />
    }
    
    if (meals.length < 1) {
        return (
            <section className="section">
                <h4>No meals matched your term. Please try again.</h4>
            </section>
        )
    }
    
    
    const showMeals = meals.map(meal => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;
    
        return  (
            <article key={idMeal} className='single-meal' >
                <img src={image} className='img' alt={title}/>
                <footer>
                    <h5>{title}</h5>
                    <button className='like-btn' ><BsHandThumbsUp/></button>
                </footer>
            </article>
        )
    });



    

    return ( 
        <section className='section-center'> 
            { showMeals }
        </section>
     );
}
      
export default Meals;       