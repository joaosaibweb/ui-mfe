import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { StyledFormControlLabel } from "./styles";
import { withStyles, Theme } from "@material-ui/core/styles";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const StyledCheckbox = withStyles((theme: Theme) => ({
  root: {
    color: "#543676",
    "&$checked": {
      color: "#543676",
    },
  },
  checked: {},
}))(Checkbox);

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={handleCheckboxChange}
          name="custom-checkbox"
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
