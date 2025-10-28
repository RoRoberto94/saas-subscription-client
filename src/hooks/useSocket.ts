import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/auth";

export const useSocket = () => {
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
        console.log(
          "WebSocket event received on hook, storing notification:",
          data
        );

        // Store notification in localStorage to be displayed when the tab becomes active.
        if (data?.status === "canceled") {
          localStorage.setItem(
            "pending_notification_error",
            "Your subscription will be canceled at the end of the period."
          );
        } else if (data?.status === "updated") {
          localStorage.setItem(
            "pending_notification_success",
            "Your subscription has been successfully updated!"
          );
        } else if (data?.status === "deleted") {
          localStorage.setItem(
            "pending_notification_error",
            "Your subscription has been removed."
          );
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
};
