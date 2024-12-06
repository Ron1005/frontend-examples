import { useCallback } from "react";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";
import Manifest from '@mnfst/sdk';

export function Header({ dispatch }) {
    //const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);
    const addItem = async (title) =>{
        //console.log(title)
        const manifest = new Manifest();
        const newtodo = await manifest.from('todos').create({
            title:title,
            completed:false
        })
        if(newtodo){
            dispatch({ type: ADD_ITEM, payload: { title } })
        }
    }
    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </header>
    );
}
