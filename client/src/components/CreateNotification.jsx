import {toast} from "react-toastify"


const CreateNotification = (message,type)=>{
    const options={
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        };
    switch(type){
        case 'success':
            toast.success(message,options);
            break;
        case 'warning':
            toast.warn(message,options);
            break;
        case "error":
            toast.error(message,options);
            break;
        case "info":
            toast.info(message,options);
            break;
    }
}

export default CreateNotification;