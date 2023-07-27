import React, { useState, ReactNode } from "react";
import { IconButton, Collapse } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Container, PaperBox, CustomTypography } from "./styles";

interface Props {
  title: string;
  children: ReactNode;
  disabled: boolean;
  index: number;
  expandedIndex: number;
  setExpandedIndex: (index: number) => void;
}

const Collapsible = ({
  title,
  children,
  disabled,
  index,
  expandedIndex,
  setExpandedIndex,
}: Props): JSX.Element => {
  const isExpanded = index === expandedIndex;

  const handleExpandClick = (): void => {
    setExpandedIndex(isExpanded ? -1 : index);
  };

  return (
    <div>
      <PaperBox className={disabled ? "" : "disabled"}>
        <Container onClick={handleExpandClick}>
          <CustomTypography>{title}</CustomTypography>

          <IconButton
            aria-expanded={isExpanded}
            aria-label="show more"
            size="small"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Container>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div>{children}</div>
        </Collapse>
      </PaperBox>
    </div>
  );
};

export default Collapsible;
