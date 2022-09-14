import "./Modal.scss";
import ReactDOM from "react-dom";
import { CloseIcon } from "../icons/CloseIcon";
const Modal = ({ children,title="Modal TITLe",setOpenModal,reset=()=>{}}={}) => {
  return ReactDOM.createPortal(
    <div className="modal__container">
      <div className="modal_content">
        <div className="modal__header">
          <div className="modal__title">
            <h3>{title}</h3>
          </div>
          <div className="modal__close" onClick={()=>setOpenModal(false)}><CloseIcon/></div>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
  </div>
    ,
    document.getElementById("modal")
  )
}

export default Modal