import { useReducer,useEffect } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import Manifest from '@mnfst/sdk';
import { todoReducer } from "./reducer";
import { FILL_ITEMS } from "./constants";

import "./app.css";
export function App() {
    const [todos, dispatch] = useReducer(todoReducer,[]);
    useEffect(async () => {
       // Init SDK.
        const manifest = new Manifest();
    
        // Fetch the list of Todos.
        await manifest.from("todos")
          .find()
          .then((res) => {
            for(const todo of res.data){
                const { title, completed, id } = todo;
                dispatch({ type: FILL_ITEMS, payload: { id,title,completed } }); 
            }
          });
      }, []);


    return (
        <>
            <Header dispatch={dispatch} />
            <Main todos={todos} dispatch={dispatch} />
            <Footer todos={todos} dispatch={dispatch} />
        </>
    );
}
