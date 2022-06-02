import React, { memo } from "react";

const Button = memo(({ type, onClick, disabled, className, content }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {content}
    </button>
  );
});

export default Button;
