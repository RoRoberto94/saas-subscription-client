import React, { useEffect } from "react";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { SocketContext } from "./SocketContext";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useAuthStore((state) => state.user);
  const triggerSubscriptionUpdate = useAuthStore(
    (state) => state.triggerSubscriptionUpdate
  );

  useEffect(() => {
    if (user) {
      if (!socket.connected) {
        socket.connect();
      }
      const handleConnect = () => socket.emit("join_user_room", user.id);
      const handleSubscriptionChanged = (data?: { status?: string }) => {
        console.log("WebSocket event received by provider:", data);
        if (data?.status === "canceled") {
          toast.error(
            "Your subscription will be canceled at the end of the period."
          );
        } else if (data?.status === "updated") {
          toast.success("Your subscription has been successfully updated!");
        } else if (data?.status === "deleted") {
          toast.error("Your subscription has been removed.");
        }
        triggerSubscriptionUpdate();
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
  }, [user, triggerSubscriptionUpdate]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
