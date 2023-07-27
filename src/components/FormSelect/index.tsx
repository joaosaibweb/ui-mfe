import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import Select, { StylesConfig, CSSObjectWithLabel } from "react-select";

import { SelectContainer, CustomSelect } from "./styles";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  name: string;
  optionsList: Option[];
  invalid?: string;
  clearable?: boolean;
  readOnly?: boolean;
  label: string;
  isRequired: boolean;
  [key: string]: any;
}

interface SelectStyles {
  container: (
    base: CSSObjectWithLabel,
    state: { isDisabled: boolean }
  ) => CSSObjectWithLabel;
  control: StylesConfig["control"];
  option: StylesConfig["option"];
  menuPortal: StylesConfig["menuPortal"];
  dropdownIndicator: StylesConfig["dropdownIndicator"];
  indicatorSeparator: StylesConfig["indicatorSeparator"];
  clearIndicator: StylesConfig["clearIndicator"];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  optionsList,
  clearable = true,
  readOnly,
  label,
  isRequired,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const selectStyles: SelectStyles = {
    container: (base, _state) => ({
      ...(base as {}),
      backgroundColor: "transparent",
      zIndex: "150",
    }),
    control: (base: any, { isDisabled, isFocused }) => {
      let bdColor = "hsl(0, 0%, 80%)";

      if (isDisabled) {
        bdColor = "#ccc";
      }
      if (isFocused && error) {
        bdColor = "#f00";
      }
      if (error) {
        bdColor = "#f00";
      }

      return {
        ...base,
        height: 28,
        minHeight: 28,
        borderColor: bdColor,
        backgroundColor: isDisabled ? "#f9f9f9" : "#fefcff",
        "&:hover": {
          borderColor: bdColor,
        },
      };
    },
    option: (styles) => ({
      ...styles,
      fontSize: "14px",
    }),
    menuPortal: (styles) => ({ ...styles, zIndex: 999 }),
    dropdownIndicator: (provided) => ({
      ...provided,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
    }),
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.getValue()) {
            return [];
          }
          return ref.props.options.map((option: Option) => option.value);
        }
        if (!ref.getValue()) {
          return [];
        }
        return ref.getValue().length > 0 ? ref.getValue()[0].value : "";
      },
      setValue: (ref: any, Value: any) => {
        if (Value) {
          if (Value instanceof Object) {
            ref.setValue({ ...Value });
          } else {
            const objValue = optionsList.find((opt) => opt.value === Value);
            ref.setValue({ ...objValue });
          }
        } else {
          ref.setValue(null);
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti, defaultValue, optionsList]);

  return (
    <SelectContainer isRequired={isRequired}>
      <div className="select-label">
        <label htmlFor={fieldName}>{label}</label>
        {error && (
          <span style={{ color: "#f00", display: "block" }}>{error}</span>
        )}
      </div>

      <div className="select">
        <CustomSelect
          invalid={error}
          isClearable={clearable}
          isDisabled={readOnly}
          ref={selectRef}
          classNamePrefix="Select"
          options={optionsList}
          styles={selectStyles}
          menuPortalTarget={document.getElementById("modal")}
          placeholder=""
          menuPlacement="auto"
          {...rest}
          theme={(theme: any) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#b196d0",
              primary25: "#e6d4fb",
            },
          })}
        />
      </div>
    </SelectContainer>
  );
};

export default FormSelect;
