import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    const [state, setstate] = useState('');

    const { meals } = useGlobalContext();

    return ( 
        <header className="search-container">
            <form>
                <input type="text" placeholder="type favorite meal" className="form-input" />
                <button className="btn" type="submit">search</button>
                <button className="btn btn-hipster" type="button">suprise me</button>
            </form>
        </header>
     );
}
 
export default Search;