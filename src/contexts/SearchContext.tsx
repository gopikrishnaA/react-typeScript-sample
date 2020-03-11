import React, { createContext } from "react";

export const SearchContext = createContext<{
  query: string;
  updateQuery: React.Dispatch<React.SetStateAction<string>>;
}>({
  query: "",
  updateQuery: (q) => {}
});

export const useSearchContext = () => React.useContext(SearchContext);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [query, updateQuery] = React.useState("pizza");

  return (
    <SearchContext.Provider value={{ query, updateQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchConsumer = SearchContext.Consumer;
