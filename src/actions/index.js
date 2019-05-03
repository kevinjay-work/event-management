import axios from "axios";
export function categoryAction(category){
    return { 
        type:'CATEGORY_ACTION',
        payload:category
    }
}

