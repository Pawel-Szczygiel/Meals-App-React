import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    const [text, setText] = useState('');
    const { setSearchTerm } = useGlobalContext();

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!text.trim()) return;
        
        setSearchTerm(text);
        setText('');
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
                <button className="btn btn-hipster" type="button">suprise me</button>
            </form>
        </header>
     );
}
 
export default Search;