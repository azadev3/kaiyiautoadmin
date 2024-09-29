import React from "react";

type props = {
  isLoading?: boolean;
};

const ButtonSubmit: React.FC<props> = (props) => {
  return (
    <button type="submit" disabled={props?.isLoading}>
      {props.isLoading ? "Saxlanılır..." : "Yadda saxla"}
    </button>
  );
};

export default ButtonSubmit;
