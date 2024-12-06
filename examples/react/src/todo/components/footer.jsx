import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import Manifest from '@mnfst/sdk';
import { REMOVE_COMPLETED_ITEMS } from "../constants";

export function Footer({ todos, dispatch }) {
    const { pathname: route } = useLocation();
    const manifest = new Manifest();
    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
    const removeCompleted = async () =>{
        for(const todo of todos){
            if(todo.completed){
                await manifest.from('todos').delete(todo.id)
            }
        }
        dispatch({ type: REMOVE_COMPLETED_ITEMS })
    }

    // prettier-ignore
    if (todos.length === 0)
        return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <a className={classnames({ selected: route === "/" })} href="#/">
                        All
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/active" })} href="#/active">
                        Active
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/completed" })} href="#/completed">
                        Completed
                    </a>
                </li>
            </ul>
            <button className="clear-completed" disabled={activeTodos.length === todos.length} onClick={removeCompleted}>
                Clear completed
            </button>
        </footer>
    );
}
