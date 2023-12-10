import { ReactNode } from "react";

type Button = {
  style?: string;
  icon?: ReactNode;
  text?: string;
};

function Button({ style, icon, text }: Button) {
  return (
    <button
      className={`flex ${style} gap-2 hover:bg-indigo-700 rounded-lg  px-4 py-2`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
