import React from "react";
import Select from "react-select";

type Props = {
     onChange: (selectedOption: any) => void;
     selectedStatus: string;
}

const options = [
  { label: "Aktiv", value: "active" },
  { label: "Deaktiv", value: "deactive" },
];

const SelectStatus: React.FC<Props> = ({ onChange, selectedStatus,  }) => {


  return (
    <div className="select-status-field">
      <label>Status</label>
      <Select
        defaultValue={options?.find((option) => option?.value === selectedStatus)}
        onChange={onChange}
        options={options}
        isSearchable={false}
        placeholder="Status"
        name="status"
        id="status"
      />
    </div>
  );
};

export default SelectStatus;
