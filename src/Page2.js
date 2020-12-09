import React, { useEffect } from "react";
import { Fab, Paper } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import { useLocalStore, useObserver } from "mobx-react";

function Page2() {
  const timeStore = useLocalStore(() => ({
    time: "" + new Date(),
    updateTime() {
      timeStore.time = "" + new Date();
    },
    get getTime() {
      return timeStore.time;
    },
  }));
  useEffect(() => {
    setTimeout(() => {
      timeStore.updateTime();
    }, 1000);
  }, [timeStore.time]);
  const DisplayTime = (timeStore) => {
    return useObserver(()=>(
      <Paper
        style={{
          width: "fit-content",
          height: "fit-content",
          padding: 15,
          fontSize: "200%",
        }}
      >
        {timeStore.getTime}
      </Paper>
    ));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        // backgroundColor:'black',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      {DisplayTime(timeStore)}
      <div
        style={{
          margin: 10,
          position: "fixed",
          bottom: 0,
          width: "98.5%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/home">
          <Fab color="primary" variant="extended">
            Previous
            <ArrowBackIosIcon
              style={{
                marginLeft: 5,
              }}
            />
          </Fab>
        </Link>
        <Link to="/data">
          <Fab color="primary" variant="extended">
            <ArrowForwardIosIcon />
            Next
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Page2;
