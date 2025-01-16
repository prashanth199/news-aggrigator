
import React from "react"
import Header from "../../components/common/Header";
import { Outlet } from "react-router";


 const Layout = ()=>{
    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // Add logic to perform search or update the state
      };
    //   const handleReadMore = () => {
    //     console.log('Read More clicked!');
    //     // Redirect or open article link here
    //   };
    return(
        <>
        <Header onSearch={handleSearch}/>
        <Outlet/>
        
        </>
    )

}

export default Layout;