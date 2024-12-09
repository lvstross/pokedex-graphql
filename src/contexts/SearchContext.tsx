import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react';
  
type SearchContextValue = {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
};
  
const SearchContext = createContext<SearchContextValue>({
    searchText: '',
    setSearchText: () => null,
});
  
export const SearchProvider: React.FC = ({ children }) => {
    const [searchText, setSearchText] = useState('');
  
    return (
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        {children}
      </SearchContext.Provider>
    );
};
  
export const useSearch = () => {
    return useContext(SearchContext);
};
  