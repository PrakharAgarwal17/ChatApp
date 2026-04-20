import { io } from "socket.io-client";

const BACKEND_URL=import.meta.env.BACKEND_URL


const socket = io(`${BACKEND_URL}`, {
    withCredentials: true
});

export default socket;