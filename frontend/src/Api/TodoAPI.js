const url = process.env.REACT_APP_API_URL;

export const getAll = () => {
    return fetch(`${url}/todos/`)
        .then(response => response.json())
        .then(data => {
                return data;
            }
        );
}

export const getById = (todoId) => {
    return fetch(`${url}/todos/${todoId}`)
        .then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const create = (todo) => {
    return fetch(`${url}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const update = (todo) => {
    return fetch(`${url}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}
export const remove = (todo) => {
    return fetch(`${url}/todos/${todo.id}`, {
        method: 'DELETE',
    }).then(response => response.json())
        .then(data => {
                return data;
            }
        );
}