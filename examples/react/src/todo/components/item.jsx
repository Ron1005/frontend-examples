import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import Manifest from '@mnfst/sdk';

export const Item = memo(function Item({ todo, dispatch, index }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;
    const manifest = new Manifest()

   // const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
   const toggleItem = async () =>{
    const toggledTodo = await manifest.from('todos').update(id,{
        completed : !completed
    })
    if(toggledTodo){
     dispatch({ type: TOGGLE_ITEM, payload: { id } })
    }
   }

   // const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const removeItem = async () =>{
        const removetodo = await manifest.from('todos').delete(id)
        if(removetodo){
            dispatch({ type: REMOVE_ITEM, payload: { id } })
        }
    }

    //const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    const updateItem = async (id,title) =>{
        const updatetodo = await manifest.from('todos').update(id,{
            title:title
        })
        if(updatetodo){
            dispatch({ type: UPDATE_ITEM, payload: { id, title } })
        } 
    }

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
