"use client"

import { toast } from 'react-toastify';

export const notify = (type = "default", messagge = "") => {

    switch (type) {
        case "default":
            toast("");
            break;
        case "success":
            toast.success(messagge, {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case "error":
            toast.error(messagge, {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case "warn":
            toast.warn(messagge, {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case "info": "info"
            toast.info(messagge, {
                position: toast.POSITION.TOP_RIGHT
            });

            break;

        default:
            break;
    }

};