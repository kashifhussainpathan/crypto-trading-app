import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { FC, ReactNode, useState } from "react";

const Modal: FC<{
  children: ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  const handleClose = () => {
    setHidden(true);

    setTimeout(() => {
      onClose();
      setHidden(false);
    }, 200);
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 modal-container ${
        hidden ? "hide" : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-[300px]  modal-content`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <div
          className="border-2 border-[#3B4043] rounded-md p-1 cursor-pointer absolute right-4 top-4"
          onClick={handleClose}
        >
          <X className="w-[15px] h-[15px]" />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
