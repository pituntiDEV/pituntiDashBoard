import { useEffect } from 'react';
import { useState } from 'react';
import socketIOClient from 'socket.io-client';

const useSocketIO = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState({
        on: () => { }
    })
    useEffect(() => {
        const socketIO = socketIOClient(process.env.REACT_APP_IO_URL, { query: { token: localStorage.getItem("access-token") } });
        setSocket(socketIO)
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on("disconnect", () => {
            setIsConnected(false)
        })


        return () => socketIO.close();
    }, [])
    return [socket, isConnected]
}
export default useSocketIO;

