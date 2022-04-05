import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message }) => {

    useEffect(() => {
        toast(message);
    }, [message]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default Toast;