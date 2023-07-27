import React, { useRef, useEffect, FC } from "react";
import { useField } from "@unform/core";
import { DebounceFactory } from "../../services/utils/index";
import { AsyncCustomSelect } from "../../styles/global";
import { SelectContainer } from "./styles";

interface AsyncFormSelectProps {
  name: string;
  label: string;
  onChangeFn?: (selectedOption: any) => void;
  loadOptions: (inputValue: string, callback: (options: any[]) => void) => void;
  readOnly?: boolean;
  isRequired: boolean;
  [key: string]: any;
}

 const AsyncFormSelect: FC<AsyncFormSelectProps> = ({
  name,
  label,
  onChangeFn,
  loadOptions,
  readOnly,
  isRequired,
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const selectStyles: any = {
    container: (base: React.CSSProperties, _state: any) => ({
      ...base,
      backgroundColor: "transparent",
      zIndex: "150",
    }),
    control: (
      base: React.CSSProperties,
      { _data, isDisabled, isFocused }: any
    ) => {
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
        borderColor: bdColor,
        backgroundColor: isDisabled ? "#f9f9f9" : "#fefcff",
        "&:hover": {
          borderColor: bdColor,
        },
      };
    },
    option: (
      styles: React.CSSProperties,
      { _data, _isDisabled, _isFocused, _isSelected }: any
    ) => ({
      ...styles,
      fontSize: "14px",
    }),
    menuPortal: (styles: React.CSSProperties) => ({ ...styles, zIndex: 999 }),
  };

  function customTheme(theme: any) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: "#b196d0",
        primary25: "#e6d4fb",
      },
    };
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.selectValue) {
            return [];
          }
          return ref.state.selectValue.map((option: any) => option.value);
        }
        if (!ref.state.selectValue) {
          return "";
        }
        return ref.state.selectValue[0]?.value
          ? ref.state.selectValue[0]?.value
          : "";
      },
      setValue: (ref: any, Value: any) => {
        if (Value && Value instanceof Object) {
          ref.setValue(Value);
        } else {
          ref.setValue(null);
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti, defaultValue]);

  const loadOptionsDebounced = DebounceFactory(loadOptions, 400);

  return (
    <SelectContainer isRequired={isRequired}>
      <div className="select-label">
        <label htmlFor={fieldName}>{label}</label>
        {error && (
          <span style={{ color: "#f00", display: "block" }}>{error}</span>
        )}
      </div>
      <div className="select">
        <AsyncCustomSelect
          ref={selectRef}
          styles={selectStyles}
          theme={customTheme}
          onChange={onChangeFn}
          placeholder=""
          loadOptions={loadOptionsDebounced}
          classNamePrefix="Select"
          menuPortalTarget={document.getElementById("modal")}
          // isDisabled={readOnly}
          // isClearable={isClearable}
          {...rest}
        />
      </div>
    </SelectContainer>
  );
};

export default AsyncFormSelect;