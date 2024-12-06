import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";
import Manifest from '@mnfst/sdk';
import { TOGGLE_ALL } from "../constants";

export function Main({ todos, dispatch }) {
    const { pathname: route } = useLocation();
    const manifest = new Manifest();
    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );

    //const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), [dispatch]);

    const toggleAll = async(e) =>{
        const togglevalue  = e.target.checked
        for(const todo of visibleTodos){
            if(togglevalue!=todo.completed){
            await manifest.from('todos').update(todo.id,{
                completed:!todo.completed
            })
            }
        }
       dispatch({ type: TOGGLE_ALL, payload: { completed: togglevalue } })
    }

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" id="toggle-all" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
}
