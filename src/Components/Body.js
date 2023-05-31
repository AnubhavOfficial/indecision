import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Input, Modal, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  main: {
    background: "#333745",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    minHeight: "calc(100vh - 9.5rem)",
    paddingTop: "4rem",
  },
  titleBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    background: "#8357C5",
    height: "11vh",
    width: "44rem",
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      background: "#8357C5",
    },
    "&:disabled": {
      background: "#5B4785",
      color: "#999BA2",
    },
  },
  optionsBody: {
    marginTop: "5rem",
    width: "44rem",
    minHeight: "17rem",
    background: "#464B5E",
  },
  optionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#3C4251",
    padding: "1rem",
  },
  removeAll: {
    textTransform: "none",
    fontSize: "1.3rem",
    padding: 0,
    minWidth: "1.5rem",
    color: "#A5AFD7",
    "&:hover": {
      background: "#3C4251",
    },
  },
  options: {
    minHeight: "6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsFooter: {
    borderTop: "0.1rem solid #5C627B",
    padding: "1rem",
  },
  optionsSubFooter: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: "75%",
    background: "#333745",
    color: "#A5AFD7",
    height: "3.5rem",
    padding: "0 1rem",
    fontSize: "1.2rem",
    "&:hover": {
      borderBottom: "none",
    },
    "&.Mui-focused": {
      outline: "0.15rem solid white",
      borderRadius: "0.2rem",
    },
    "&.MuiOutlinedInput-notchedOutline": {
      borderBottom: "none",
    },
  },
  addOption: {
    background: "#8357C5",
    minWidth: "1.5rem",
    width: "7.5rem",
    textTransform: "none",
    color: "white",
    fontSize: "1.2rem",
    height: "3.5rem",
    borderRadius: 0,
    padding: 0,
    "&:hover": {
      background: "#8357C5",
    },
  },
  noOptionsText: {
    color: "#A5AFD7",
    fontSize: "1.2rem",
  },
  optionValues: {
    maxWidth: "44rem",
    width: "41rem",
    padding: "0 1.5rem",
    height: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "0.1rem solid #5C627B",
  },
  optionNameAndIndex: {
    color: "white",
    fontSize: "1.6rem",
  },
  removeOne: {
    color: "#A5AFD7",
    textTransform: "none",
    fontSize: "1.4rem",
    padding: 0,
    minWidth: "1.5rem",
    "&:hover": {
      background: "#464B5E",
    },
  },
  errorText: {
    paddingLeft: "1rem",
    paddingBottom: "1rem",
    color: "#A5AFD7",
    fontSize: "1.3rem",
    fontStyle: "italic",
  },
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "15rem",
    height: "15rem",
    padding: "2rem 1rem",
    background: "#464B5E",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
});
const Body = () => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [showExists, setShowExists] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addOptionFunc = () => {
    const value = document.getElementById("newOption").value;
    if (options.indexOf(value) !== -1) {
      setShowExists(true);
      setShow(false);
    } else {
      setShowExists(false);
      if (value.length > 0) {
        setOptions([...options, value]);
        localStorage.setItem("options", JSON.stringify([...options, value]));
      } else {
        setShow(true);
        setShowExists(false);
      }
      document.getElementById("newOption").value = "";
    }
  };
  const removeAll = () => {
    setOptions([]);
    localStorage.setItem("options", JSON.stringify([]));
  };
  const removeOne = (index) => {
    console.log(index);
    if (options.length === 1) {
      setOptions([]);
      localStorage.setItem("options", [...options]);
    } else {
      var removed = options.splice(index, 1);
      setOptions((prevState) => options.filter((option) => option !== removed));
      localStorage.setItem(
        "options",
        JSON.stringify(options.filter((option) => option !== removed))
      );
    }
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      addOptionFunc();
    }
  };

  useEffect(() => {
    options.length > 0 ? setDisabled(false) : setDisabled(true);
    options.length > 0 && setShow(false);
    console.log(options);
  }, [options]);

  useEffect(() => {
    const option = JSON.parse(localStorage.getItem("options"));
    option && setOptions(option);
  }, []);
  return (
    <div className={classes.main}>
      <div className={classes.titleBody}>
        <Button
          disableRipple
          className={classes.titleText}
          disabled={disabled}
          onClick={handleOpen}
        >
          What should I do?
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          BackdropProps={{
            style: { backgroundColor: "white", opacity: "0.6" },
          }}
        >
          <div className={classes.box}>
            <Typography
              style={{ fontSize: "1.6rem", color: "white", fontWeight: "bold" }}
            >
              Selected Option
            </Typography>
            <Typography
              style={{
                fontSize: "1.5rem",
                color: "white",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {options[Math.floor(Math.random() * options.length)]}
            </Typography>
            <Button
              className={classes.addOption}
              disableRipple
              onClick={handleClose}
            >
              {" "}
              Okay
            </Button>
          </div>
        </Modal>
      </div>
      <div className={classes.optionsBody}>
        <div className={classes.optionsHeader}>
          <Typography
            style={{ color: "#A5AFD7", fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Your Options
          </Typography>
          <Button
            className={classes.removeAll}
            disableRipple
            onClick={removeAll}
          >
            Remove All
          </Button>
        </div>
        <div className={classes.options}>
          {options.length === 0 ? (
            <Typography className={classes.noOptionsText}>
              Please add an option to get started!
            </Typography>
          ) : (
            <div>
              {options &&
                options.map((option, index) => {
                  return (
                    <div className={classes.optionValues}>
                      <Typography className={classes.optionNameAndIndex}>
                        {index + 1 + ".   " + option}{" "}
                      </Typography>
                      <Button
                        onClick={() => removeOne(index)}
                        className={classes.removeOne}
                        disableRipple
                      >
                        remove
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className={classes.optionsFooter}>
          {show ? (
            <Typography className={classes.errorText}>
              Enter valid value to add item
            </Typography>
          ) : (
            <></>
          )}
          {showExists ? (
            <Typography className={classes.errorText}>
              This option already exists
            </Typography>
          ) : (
            <></>
          )}
          <div className={classes.optionsSubFooter}>
            <Input
              placeholder="Enter the option here"
              className={classes.input}
              id="newOption"
              onKeyDown={enterHandler}
            ></Input>
            <Button
              className={classes.addOption}
              disableRipple
              onClick={addOptionFunc}
            >
              Add Option
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
