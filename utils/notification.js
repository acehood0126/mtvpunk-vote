import { Store } from 'react-notifications-component';

export const notificationSuccess = (message, title = '') => {
  Store.addNotification({
        message: message,
        title: title,
        type: "success",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true
        }
    });
}

export const notificationWarning = (message, title = '') => {
  Store.addNotification({
        message: message,
        title: title,
        type: "warning",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__flipOutX"],
        dismiss: {
          duration: 3000,
          // onScreen: true
        }
    });
}

export const notificationDanger = (message, title = '') => {
  Store.addNotification({
        message: message,
        title: title,
        type: "danger",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__bounceIn"],
        animationOut: ["animate__animated", "animate__bounceOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true
        }
    });
}