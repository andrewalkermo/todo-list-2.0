import './Todo.css';
import React, { useState }  from 'react';
import {useMutation, useQueryClient} from "react-query";
import {update, remove} from "../../Api/TodoAPI";


function Todo({todo, onNewTodo, onDelete}) {

    const [content, setContent] = useState(todo.content);
    const [isCompleted, setIsCompleted] = useState(todo.completed);
    const queryClient = useQueryClient();

    const updateTodoMutation = useMutation(update, {
        onSuccess: () => {
            queryClient.invalidateQueries('todoList');
        }
    });

    const deleteTodoMutation = useMutation(remove, {
        onSuccess: () => {
            queryClient.invalidateQueries('todoList');
        }
    });

    const updateTodo = () => {
        if (content.trim().length === 0 || content.trim().length > 100 || content === todo.content) {
            return;
        }
        updateTodoMutation.mutate({
            id: todo.id,
            content: content,
            completed: isCompleted,
        })
    }

    const removeTodo = () => {
        onDelete(todo);
        deleteTodoMutation.mutate(todo);
    }

    const handleCompletedChange = (event) => {
        setIsCompleted(event.target.checked);
        updateTodo();
    }
    const handleDelete = () => {
        removeTodo();
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            if (content.trim().length > 0 && content.trim().length <= 100 && content !== todo.content) {
                updateTodo();
            }
            onNewTodo(todo);
        }
    }

    return (
        <div className="todo">
            <span
                className="delete"
                onClick={handleDelete}
            >
                X
            </span>
            <input
                type="checkbox"
                name="task-completed[]"
                checked={isCompleted}
                onChange={handleCompletedChange}
            />
            <input
                type="text"
                name="task-description[]"
                placeholder="Nova tarefa"
                value={content}
                onChange={handleContentChange}
                onKeyPress={handleKeyPress}
                onBlur={updateTodo}
                autoFocus={todo?.new}
            />
        </div>
    );
}

export default Todo