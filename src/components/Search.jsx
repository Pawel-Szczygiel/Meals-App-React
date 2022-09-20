import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    const [text, setText] = useState('');
    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!text.trim()) return
        setSearchTerm(text);
    }

    function handleRandom() {
        setText('');
        setSearchTerm('');
        fetchRandomMeal();
    }

    return ( 
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text" 
                    placeholder="type favorite meal" className="form-input"
                    onChange={handleChange} 
                    value={text}
                />
                <button className="btn" type="submit">search</button>
                <button className="btn btn-hipster" onClick={handleRandom}>
                    suprise me
                </button>
            </form>
        </header>
     );
}
 
export default Search;