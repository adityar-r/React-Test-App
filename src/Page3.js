import React, { useEffect } from "react";
import { Fab, Paper, CircularProgress } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import { useObserver, useLocalStore } from "mobx-react";
import axios from "axios";

function Page3() {
  const store = useLocalStore(() => ({
    names: [],
    namesLoaded: false,
    requestNames() {
      axios
        .get(
          "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
        )
        .then((res) => {
          console.log(res.data[0]);
          if (res.status == 200) {
            store.names = res.data
            .map((element,index) => ([
              element.first,element.last,
            ]));
            console.log(store.names[0][0])
            store.namesLoaded = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get getNames() {
      return store.names;
    },
    get loadStatus() {
      return store.namesLoaded;
    },
  }));
  useEffect(() => {
    setTimeout(() => {
      store.requestNames();
    }, 1000);
  }, []);

  const nameCard = (firstName, lastName) => {
    return <Paper style={{
      padding:10,
      width:200,
      margin:5
    }}>{firstName + " " + lastName}</Paper>;
  };
  const ViewNames = () => (
    <Paper style={{
      padding:20,
      paddingLeft:50,
      paddingRight:50,
      margin:10,
      overflowY:'scroll',
      height:'75%'
    }}>
      {store.getNames.map((element) => {
        // console.log(element);
        return nameCard(element[0], element[1]);
      })}
      {/* "hello" */}
    </Paper>
  );

  const RenderContent = () =>
    useObserver(() => (
      <div
        style={{
          height: "100vh",
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        {store.loadStatus ? (
          ViewNames()
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                margin: 5,
              }}
            >
              Loading...
            </div>
            <CircularProgress />
          </div>
        )}
      </div>
    ));
  return (
    <div style={{
    }}>
      {RenderContent()}
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
        <Link to="/time">
          <Fab color="primary" variant="extended">
            Previous
            <ArrowBackIosIcon
              style={{
                marginLeft: 5,
              }}
            />
          </Fab>
        </Link>
        <Link to="/currency">
          <Fab color="primary" variant="extended">
            <ArrowForwardIosIcon />
            Next
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Page3;
