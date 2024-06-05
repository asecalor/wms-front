import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import toast from "react-hot-toast";

const socket = io('http://localhost:3001', { transports: ['websocket'] });

const StockAlertComponent = () => {


    useEffect(() => {
        // Escuchar el evento 'stock' emitido desde el servidor
        socket.on('stock', (data) => {
            toast.error(data.message,{duration:20000})
        });

        // Limpiar el listener cuando el componente se desmonta
        return () => {
            socket.off('stock');
        };
    }, []);

    return (
        <div></div>
    );
};

export default StockAlertComponent;
