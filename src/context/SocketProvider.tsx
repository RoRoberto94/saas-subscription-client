import React, { useEffect } from "react";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/auth";
import { SocketContext } from "./SocketContext";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      if (!socket.connected) {
        socket.connect();
      }

      const handleConnect = () => socket.emit("join_user_room", user.id);

      const handleSubscriptionChanged = (data?: { status?: string }) => {
        console.log("WebSocket event received, storing notification:", data);

        if (data?.status === "canceled") {
          localStorage.setItem(
            "pending_notification",
            JSON.stringify({
              type: "error",
              message: "Your subscription will be canceled.",
            })
          );
        } else if (data?.status === "updated") {
          localStorage.setItem(
            "pending_notification",
            JSON.stringify({
              type: "success",
              message: "Your subscription has been updated!",
            })
          );
        } else if (data?.status === "deleted") {
          localStorage.setItem(
            "pending_notification",
            JSON.stringify({
              type: "error",
              message: "Your subscription has been removed.",
            })
          );
        } else {
          localStorage.setItem(
            "pending_notification",
            JSON.stringify({
              type: "success",
              message: "Your new subscription is active!",
            })
          );
        }
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

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
