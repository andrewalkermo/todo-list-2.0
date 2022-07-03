const url = process.env.REACT_APP_API_URL;

export const getAll = () => {
    return fetch(`${url}/todo-lists/`)
        .then(response => response.json())
        .then(data => {
                return data;
            }
        );
}

export const getById = (todoListId) => {
    return fetch(`${url}/todo-lists/${todoListId}`)
        .then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const create = (todoList) => {
    return fetch(`${url}/todo-lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoList)
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const update = (todoList) => {
    return fetch(`${url}/todo-lists/${todoList.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoList)
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const remove = (todoList) => {
    return fetch(`${url}/todo-lists/${todoList.id}`, {
        method: 'DELETE',
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}