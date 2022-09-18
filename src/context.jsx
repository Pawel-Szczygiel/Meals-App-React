import React, { useContext } from 'react'

const AppContext = React.createContext();

const state = {name: 'pawel', age: 36};

const AppProvider = ({children}) => {
    return ( 
        <AppContext.Provider value= { state }>
            {children} 
        </AppContext.Provider>
     );
}


export const useGlobalContext = () => useContext(AppContext);
 
export { AppProvider };
