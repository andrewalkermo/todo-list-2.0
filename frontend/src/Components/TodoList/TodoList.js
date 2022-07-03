import './TodoList.css';
import React, {useState} from 'react';
import Todo from '../Todo/Todo'
import {
    useMutation,
    useQuery, useQueryClient,
} from 'react-query'
import {
    getById,
} from '../../Api/TodoListAPI'
import {create} from "../../Api/TodoAPI";
import {update} from "../../Api/TodoListAPI";
import {Link, useParams} from "react-router-dom";

function TodoList() {
    return (
        <Todos />
    )
}

function Todos() {
    const { todoListId } = useParams();
    const [title, setTitle] = useState('');

    const { data: todoList, isLoading, isError } = useQuery(['todoList', todoListId], () => getById(todoListId), {
        onSuccess: (todoList) => {
            setTitle(todoList.title);
        }
    })

    const queryClient = useQueryClient();

    const createTodoMutation = useMutation(create, {
        onMutate: async newTodo => {
            await queryClient.cancelQueries('todoList')
            const previousTodos = queryClient.getQueryData('todoList')
            queryClient.setQueryData('todoList', () => {
                let tempTodos = todoList.todos;
                tempTodos.push(newTodo);
                tempTodos.sort((a, b) => a.order - b.order - 1);
                todoList.todos = tempTodos;
            })
            return { previousTodos }
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData('todoList', context.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todoList')
        }
    });

    const updateTodoListMutation = useMutation(update, {
        onSuccess: () => {
            queryClient.invalidateQueries('todoList');
        }
    });

    const updateTodoList = () => {
        if (title.trim().length === 0 || title.trim().length > 100 || title === todoList.title) {
            return;
        }
        updateTodoListMutation.mutate({
            id: todoList.id,
            title: title,
        })
    }

    const createTodo = (todo) => {
        createTodoMutation.mutate({
            content: '',
            todo_list_id: todo.todo_list_id,
            completed: false,
            order: todo.order + 1,
            new: true,
        })
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            updateTodoList();
        }
    }

    if (isLoading) {
        return (
            <div className="todo-list">
                <div className="todo-list-container">
                    <h3>Loading...</h3>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="todo-list">
                <div className="todo-list-container">
                    <h3>Error...</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="todo-list">
            <span className="voltar"><Link to="/todo-lists">{'<'}</Link></span>
            <input
                type="text"
                placeholder="Nova lista"
                value={title}
                onChange={handleTitleChange}
                onKeyPress={handleKeyPress}
                onBlur={updateTodoList}
            />
            <div className="todo-list-container">
                {todoList?.todos && todoList.todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onNewTodo={createTodo}
                        onDelete={(todo) => {todoList.todos = todoList.todos.filter(t => t.id !== todo.id)} }
                    />
                ))}
            </div>
        </div>
    );
}
export default TodoList