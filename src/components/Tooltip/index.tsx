
import React, { Ref } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";

function arrowGenerator(color: string) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

export function ToolTipLight() {
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  return LightTooltip;
}

const useStylesArrow = makeStyles((theme) => ({
  tooltip: {
    position: "relative",
  },
  arrow: {
    position: "absolute",
    fontSize: 6,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  popper: arrowGenerator(theme.palette.grey[700]),
}));

type ArrowTooltipProps = TooltipProps & {
  title: string;
};

export function ArrowTooltip(props: ArrowTooltipProps): JSX.Element {
  const { arrow, ...classes } = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

  const { title } = props;

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <>
          {title}
          <span className={arrow} ref={setArrowRef as Ref<HTMLSpanElement>} />
        </>
      }
    />
  );
}


const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    position: "absolute",
    fontSize: 13,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  popper: arrowGenerator(theme.palette.common.black),
  tooltip: {
    position: "relative",
    backgroundColor: theme.palette.common.black,
    fontSize: "13px",
  },
  tooltipPlacementLeft: {
    margin: "0 8px",
  },
  tooltipPlacementRight: {
    margin: "0 8px",
  },
  tooltipPlacementTop: {
    margin: "8px 0",
  },
  tooltipPlacementBottom: {
    margin: "8px 0",
  },
}));

interface BootstrapTooltipProps<P = {}> extends Omit<TooltipProps, "title"> {
  arrow?: boolean;
  title: string;
}

export function BootstrapTooltip<P>(props: BootstrapTooltipProps<P>) {
  const { arrow, ...classes } = useStylesBootstrap();
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const { title, ...restProps } = props;

  return (
    <Tooltip
      title={
        <>
          {title}
          <span className={arrow} ref={setArrowRef} />
        </>
      }
      classes={classes}
      {...restProps}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
    />
  );
}
export function ToolTipHtml() {
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  return HtmlTooltip;
}
