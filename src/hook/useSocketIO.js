import { useState } from 'react';
import { io } from 'socket.io-client';
const useSocketIO = () => {
    const connect = () => {
        return new Promise(async(resolve, reject) => {
            const socketio = await io("192.168.1.38:1992", {
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

