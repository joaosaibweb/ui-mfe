import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaperBox = styled(Paper)`
  padding: 5px;
  border: 1px solid rgb(238, 233, 244);
  cursor: pointer;
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
export const CustomTypography = styled(Typography)`
  font-size: 0.7px; // Defina o tamanho da fonte desejado aqui
`;
