import styled from "styled-components";
import Select from "react-select";
import { device } from "../../styles/mediaQuery";

export const CustomSelect = styled(Select)`
  & .Select__control {
    background-color: #fefcff;
  }
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
  }

  @media ${device.mobileS} {
    & .Select__control {
      height: 26px;
      min-height: 26px;
    }
    & .Select__indicator {
      margin-top: -6px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 32px;
      min-height: 32px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 15px;
      top: 50%;
    }
    & .Select__indicator-separator {
      margin-top: 8px;
    }
  }
`;

type PropsSelectContainer = {
  isRequired: boolean;
};

export const SelectContainer = styled.div<PropsSelectContainer>`
  display: flex;
  flex-direction: column;

  .select-label {
    display: flex;
    justify-content: space-between;
    padding-left: 2px;
    padding-right: 2px;
    width: 100%;
  }

  .select {
    width: auto;
  }

  label {
    color: #6b6565;
    font-weight: ${(props) => (props.isRequired ? 500 : 500)};
    font-size: 13px;
  }
`;

export const FormLabel = styled.label`
  color: #9e9e9e;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
`;

type PropsFormInput = {
  inputWidth: number;
};

export const FormInput = styled.input<PropsFormInput>`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #9e9e9e;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.2;
  color: #495057;
  background-color: #fff;
  /* width: 16rem; */
  width: ${(props) => props.inputWidth || 16}vw;

  &:focus {
    background-color: #fff;
    border: 1px solid #b196d0;
    outline: 0;
    box-shadow: 0 0 0 0.2rem #b196d0;
  }
`;
