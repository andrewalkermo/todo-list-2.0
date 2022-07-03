import './TodoListCard.css';
import React from 'react';
import {Link} from "react-router-dom";

function TodoListCard({todoList, onRemove}) {
    return (
        <div className="todo-list-card">
            <span onClick={() => onRemove(todoList)}>X</span>
            <Link to={`/todo-lists/${todoList.id}`}>
                <h3>{ todoList.title }</h3>
            </Link>
        </div>
    )
}

export default TodoListCard