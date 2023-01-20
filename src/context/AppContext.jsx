import React from 'react'
import { createContext, useEffect, useState } from "react";
import { fetchDataFromYoutubeApi } from "../utils/api";

export function AppContext(props) {
  const [loading, setLoading] = useState(false);
  const [searchReasult, setSearchResults] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories)
  }, [selectCategories]);

  console.log(searchReasult);

  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromYoutubeApi(query).then(data => {
        console.log("AppContext.jsx");
        const {contents} = data;
        setSearchResults([...contents]);
        setLoading(false);
    }).catch(error => {
      console.log('app context file');
      console.log(error);
    });
  }

  return (
    <Context.Provider value={{
        loading,
        setLoading,
        searchReasult, setSearchResults,
        selectCategories, setSelectCategories,
        mobileMenu, setMobileMenu
    }}>
        {props.children}
    </Context.Provider>
  );
};

export const Context = createContext();


