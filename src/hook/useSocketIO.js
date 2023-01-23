import { useState } from 'react';
import { io } from 'socket.io-client';
const useSocketIO = () => {
    const connect = () => {
        return new Promise(async(resolve, reject) => {
            
            const socketio = await io(process.env.REACT_APP_IO_UR, {
                query: {
                    _id: localStorage.getItem("_id") || ""
                }
            });
            resolve(socketio);
        });
    }
    return [connect]
}

export default useSocketIO;

