import './TodoListCardList.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    useQuery, useQueryClient, useMutation
} from 'react-query'
import {
    getAll,
    remove,
    create
} from '../../Api/TodoListAPI'
import TodoListCard from "../TodoListCard/TodoListCard";


function TodoListCardList() {
    const { data: todoLists, isLoading, isError } = useQuery('todoLists', () => getAll())
    const [criandoTodoList, setCriandoTodoList] = useState(false)
    let navigate = useNavigate();
    const queryClient = useQueryClient();

    const removeTodoListMutation = useMutation(remove, {
        onMutate: async todoList => {
            await queryClient.cancelQueries('todoLists')
            const previousTodoLists = queryClient.getQueryData('todoLists')
            queryClient.setQueryData('todoLists', () => {
                let tempTodoLists = todoLists;
                tempTodoLists = tempTodoLists.filter(t => t.id !== todoList.id)
                return tempTodoLists;
            })
            return { previousTodoLists }
        },
        onError: (err, todoList, context) => {
            queryClient.setQueryData('todoLists', context.previousTodoLists)
        },
        onSettled: (data, err, todoList) => {
            queryClient.invalidateQueries('todoLists')
        }
    });

    const createTodoListMutation = useMutation(create, {
        onSuccess: async todoList => {
            await queryClient.cancelQueries('todoLists')
            setCriandoTodoList(false)
            navigate(`/todo-lists/${todoList.id}`)
        }
    });

    const removeTodoList = (todoList) => {
        removeTodoListMutation.mutate(todoList)
    }

    const createTodoList = () => {
        setCriandoTodoList(true)
        createTodoListMutation.mutate({
            title: 'Nova lista',
        })
    }
    if (isLoading) {
        return (
            <div className="todo-list-card-list">
                <h1>{ '//TODO' }</h1>
                <div className="todo-list-container">
                    <h3>Carregando...</h3>
                </div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="todo-list-card-list">
                <h1>{ '//TODO' }</h1>
                <div className="todo-list-container">
                    <h3>Error...</h3>
                </div>
            </div>
        )
    }
    if (criandoTodoList) {
        return (
            <div className="todo-list-card-list">
                <h1>{ '//TODO' }</h1>
                <div className="todo-list-container">
                    <h3>Criando TodoList...</h3>
                </div>
            </div>
        )
    }
    return (
        <div className="todo-list-card-list">
            <h1>{ '//TODO' }</h1>
            <div className="todo-list-card-list-container">
                <div className="todo-list-card" onClick={createTodoList}>
                        <h3>+</h3>
                </div>
                {isLoading && <div><h3>Carregando...</h3></div>}
                {isError && <div><h3>Error</h3></div>}
                {todoLists && todoLists.length && todoLists.map(todoList => (
                    <TodoListCard
                        key={todoList.id}
                        todoList={todoList}
                        onRemove={removeTodoList}
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoListCardList