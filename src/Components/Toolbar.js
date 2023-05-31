import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  main: {
    background: "#20222B",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "5.5rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bolder",
    lineHeight: "1.2",
  },
});
const Toolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div style={{ width: "29.5%" }}>
        <Typography className={classes.heading}>Indecision</Typography>
        <Typography
          style={{ lineHeight: 1, color: "#A5AFD7", fontSize: "1rem" }}
        >
          Put your life in the hands of a computer
        </Typography>
      </div>
    </div>
  );
};

export default Toolbar;
