import { useGlobalContext } from "../context";

const Favorites = () => {
    const { favorites, removeFromFavorites, selectMeal } = useGlobalContext();

    const showFavorites = favorites.map(favorite => {
        const { idMeal, strMealThumb: image, strMeal: title  } = favorite;
        
        return (
            <div key={idMeal} className='favorite-item'>
                <img src={image} alt={title} className='favorites-img img'/>
                <button 
                    className="remove-btn" 
                    onClick={() => removeFromFavorites(idMeal)}>
                    remove
                </button>
            </div>
        )
    })

    return ( 
        <section className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {showFavorites}
                </div>
            </div>
        </section>
     );
}
 
export default Favorites;