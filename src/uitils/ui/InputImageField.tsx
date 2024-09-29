import React, { ChangeEvent } from "react";

type Props = {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: any;
  labelTitle?: string;
  req?: any;
  accepting?: any;
  multiple?: any;
};

const InputImageField: React.FC<Props> = (props) => {
  return (
    <div className="image-input-field">
      <span className="form-title">{props?.labelTitle || "Şəkil yüklə"}</span>
      <p className="form-paragraph">Yükləmək üçün sıxın</p>
      <label htmlFor="file-input" className="drop-container">
        <input
          multiple={props.multiple}
          onChange={props.onChange}
          type="file"
          accept={props.accepting ? props.accepting : "image/*"}
          required={props.req ? false : true}
          id="file-input"
          name={props?.name}
          value={props.value}
        />
      </label>
    </div>
  );
};

export default InputImageField;
