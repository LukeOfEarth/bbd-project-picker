import React, { useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const SocketContext = React.createContext();

export function useSocket(){
    return useContext(SocketContext);
}

export function SocketProvider({id,children}){
    console.log(id);
    const [sessionId] = useState(id);
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:5000',{
            query:{id}
        });
        setSocket(newSocket);
        return () => newSocket.close();
    },[id,sessionId]);

    return(    
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}