import React, { useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket(){
    return useContext(SocketContext);
}

export function SocketProvider({id,children}){
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:3001',{
            query:{id}
        });
        setSocket(newSocket);
        newSocket.emit('test','test');
        return () => newSocket.close();
    },[id]);

    return(    
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}