import React from "react";
import { Fab, Paper } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useLocalStore, useObserver } from "mobx-react";
import { Link } from "react-router-dom";
// console.log(value);

function Page1() {
  const value = useLocalStore(() => ({
    _value: 0,
    increaseValue() {
      // console.log(value.val)
      value._value++;
    },
    decreaseValue() {
      if (value._value > 0) value._value--;
    },
    get getValue() {
      return value._value;
    },
  }));
  // const counterStore = React.useContext(StoreContext);
  const DisplayValue = (value) => {
    // console.log(value.valuee);
    return useObserver(() => (
      <Paper
        style={{
          padding: 10,
          margin: 20,
        }}
        elevation={3}
      >
        {value.getValue}
      </Paper>
    ));
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          //   backgroundColor:'red'
        }}
      >
        <Paper
          style={{
            padding: 5,
          }}
        >
          <div
            style={{
              padding: 5,
              fontWeight: 600,
              fontSize: "150%",
            }}
          >
            Counter
          </div>
          <div
            style={{
              height: 1,
              backgroundColor: "black",
            }}
          ></div>

          {DisplayValue(value)}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Fab
              onClick={value.decreaseValue}
              style={{
                margin: 10,
              }}
              color="secondary"
            >
              <RemoveIcon />
            </Fab>
            <Fab
              onClick={
                // counterStore.changeValue(true);
                value.increaseValue
              }
              style={{
                margin: 10,
              }}
            >
              <AddIcon />
            </Fab>
          </div>
        </Paper>
      </div>
      <Link to="/time">
        <Fab
          style={{
            margin: 10,
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
          color="primary"
          variant="extended"
        >
          <ArrowForwardIosIcon />
          Next
        </Fab>
      </Link>
    </div>
  );
}

export default Page1;
