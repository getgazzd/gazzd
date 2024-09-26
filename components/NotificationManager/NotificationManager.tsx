import { useSocket } from "hooks/sockets";
import { ToastContainer, Zoom } from "react-toastify";

const NotificationManager = () => {
  useSocket();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        closeButton={false}
      />
      <style>
        {`
        .Toastify__toast-container {
          margin-top: 15px;
          padding: 0px;
          width: auto;
          height: auto
        }
        .Toastify__toast {
          width: auto;
          height: auto;
          background: transparent;
          padding: 0px;
          margin: 20 0px;
          border-radius: 0px;
        }

        .Toastify__toast-body{
          width: auto;
          height:auto;
          padding: 0px;
        }
        `}
      </style>
    </>
  );
};

export default NotificationManager;
