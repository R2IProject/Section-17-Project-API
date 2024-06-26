import { createContext } from "react";

const NotificationContext = createContext({
    notification: null, //{title, message, status}

    showNotification: function (notificationData) {
        setActiveNotification(notificationData);
    },

    hideNotificaation: function () {
        setActiveNotification(null);
    }
});

export function NotificationContactProvider(props) {
    const [activeNotification, setActiveNotification] = useState();

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() { }
    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    };
    return (
        <NotificationContactProvider value={context}>
            {props.children}
        </NotificationContactProvider>
    )
}

export default NotificationContext; 