import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useAuth } from "./useAuth";

export const useSocket = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.on("connect", () => {
        console.log("Connected to WebSocket server with ID:", socket.id);
        socket.emit("join_user_room", user.id);
      });

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
    } else {
      if (socket.connected) {
        socket.disconnect();
      }
    }

    return () => {
      socket.off("connect");
      socket.off("subscription_updated");
      socket.off("subscription_canceled");
    };
  }, [user]);
};
