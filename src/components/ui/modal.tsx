import { X } from "lucide-react";
import { ReactNode } from "react";

type Modal = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
function Modal({ open, onClose, children }: Modal) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20 " : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 hover:text-black"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
