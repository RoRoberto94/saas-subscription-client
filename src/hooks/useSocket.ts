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

      const handleConnect = () => {
        console.log("Connected to WebSocket server with ID:", socket.id);
        socket.emit("join_user_room", user.id);
      };

      const handleSubscriptionChanged = (data?: { status?: string }) => {
        // Emit a local event that other components can listen to.
        socket.emit("local_subscription_changed", data);
      };

      socket.on("connect", handleConnect);
      socket.on("subscription_changed", handleSubscriptionChanged);
    } else {
      if (socket.connected) {
        socket.disconnect();
      }
    }

    return () => {
      socket.off("connect");
      socket.off("subscription_changed");
    };
  }, [user]);
};
