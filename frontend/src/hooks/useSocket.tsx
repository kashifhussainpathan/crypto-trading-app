import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io("ws://localhost:3000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
