import { useGlobalContext } from "../context";


const Meals = () => {
    
    const context = useGlobalContext();
    const {name, age } = context;
    console.log(context);

    return ( 
        <> 
            <h2>Creating meals by {name} who have {age} yea  s</h2>
        </>
     );
}
      
export default Meals;