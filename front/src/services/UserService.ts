const getAll = async () => {
    return fetch('http://localhost:4000/api/users')
        .then(res => res.json())
}

const get = async (id: number) => {
    return fetch(`http://localhost:4000/api/users/${id}`)
        .then(res => res.json())
}

const create = async (user: any) => {
    return fetch('http://localhost:4000/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

const update = async (user: any) => {
    return fetch('http://localhost:4000/api/users', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

const remove = async (id: number) => {
    return fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
}

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default UserService;