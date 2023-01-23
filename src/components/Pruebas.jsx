import React, { useEffect, useState } from 'react'

import './Pruebas.scss';

function Pruebas() {
    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bobjohnson@example.com',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
        }
    ];
    

    useEffect(() => {
        // lógica para obtener los usuarios de una API
    }, []);

    const handleEdit = (user) => {
        // lógica para editar un usuario
    }

    const handleDelete = (user) => {
        // lógica para eliminar un usuario
    }

    

    return (
        <div className="user-list">
            {users.map(user => (
                <div key={user.id} className="user">
                <img src={user.profilePictureUrl} alt={user.name} className="user-picture" />
                <div className="user-info">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
                <div className="user-actions">
                    <button className="btn-action" onClick={() => {}}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-action" onClick={() => {}}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <button className="btn-action" onClick={() => {}}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Pruebas;

