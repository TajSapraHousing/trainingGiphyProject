import Home from "./src/components/pages/Home";
import Results from "./src/components/pages/Results";
import React from "react";
import { tokens } from "./tokens";
import { getTrendingResults } from "./src/components/pages/Home";
import { getInitialSearchData } from "./src/components/pages/Results";
const routes=[
        {
            path:'/',
            component: Home,    
            loadData:getTrendingResults,
        }, {
            path:'/search/:id',
            component: Results ,
            loadData:getInitialSearchData
        }        
]
export default routes