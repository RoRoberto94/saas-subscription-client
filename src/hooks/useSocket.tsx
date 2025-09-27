import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./useAuth";

let socket: Socket | null = null;
export const useSocket = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user && socket === null) {
      socket = io("http://localhost:3001", { autoConnect: false });
      socket.connect();
      socket.on("connect", () => socket?.emit("join_user_room", user.id));
      socket.on("subscription_updated", () => {
        localStorage.setItem(
          "pending_notification_success",
          "Your subscription has been updated!"
        );
      });
      socket.on("subscription_canceled", () => {
        localStorage.setItem(
          "pending_notification_error",
          "Your subscription will be canceled at the end of the period."
        );
      });
    }
  }, [user]);
};
