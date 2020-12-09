import React from "react";
import {
  Fab,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import { useObserver, useLocalStore } from "mobx-react";
import axios from "axios";
import { action } from "mobx";

const currencyAllowed = [
  { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
  { currency: "EUR", name: "European euro", symbol: "€" },
  { currency: "GEL", name: "Georgian lari", symbol: "₾" },
  { currency: "HTG", name: "Haitian gourde", symbol: "G" },
  { currency: "ILS", name: "Israeli new sheqel", symbol: "₪" },
  { currency: "KZT", name: "Kazakhstani tenge", symbol: "лв" },
  { currency: "KWD", name: "Kuwaiti dinar", symbol: "د.ك" },
  { currency: "LSL", name: "Lesotho loti", symbol: "L" },
  { currency: "INR", name: "Indian rupee", symbol: "₹" },
  { currency: "USD", name: "U.S. Dollar", symbol: "$" },
];
const currencySymbolMap = {
  XCD: "$",
  EUR: "€",
  GEL: "₾",
  HTG: "G",
  ILS: "₪",
  KZT: "лв",
  KWD: "د.ك",
  LSL: "L",
  INR: "₹",
  USD: "$",
};
window.csm = currencySymbolMap;
function Page4() {
  const currencyStore = useLocalStore(() => ({
    fromCUR: "",
    toCUR: "",
    fromCURSymbol: "",
    toCURSymbol: "",
    conversionFactor: 0,
    inputValue: 0,
    conversionStarted: false,
    convert() {
      axios
        .get(
          "https://free.currconv.com/api/v7/convert?q=" +
            this.fromCUR +
            "_" +
            this.toCUR +
            "&compact=ultra&apiKey=dd8e835c3d0a875afe5e"
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.conversionFactor = parseFloat(
              res.data[this.fromCUR + "_" + this.toCUR]
            );
            this.toCURSymbol = currencySymbolMap[this.toCUR];
          }
        });
    },
    setInputValue(value) {
      this.inputValue = parseFloat(value);
    },
    setFromCurrency(value) {
      this.fromCUR = value;
      this.fromCURSymbol = currencySymbolMap[value.trim()];
    },
    setToCurrency(value) {
      this.toCUR = value;

    },
    get inputVal() {
      return this.inputValue;
    },
    get outputVal() {
      return (this.outputValue = this.inputValue * this.conversionFactor);
    },
    get isConversionOnGoing() {
      return this.conversionStarted;
    },
    get fromSymbol() {
      return this.fromCURSymbol;
    },
    get toSymbol() {
      return this.toCURSymbol;
    },
  }));
  window.cs = currencyStore;
  const InputCurSymbol = () =>
    useObserver(() => (
      <InputAdornment position="start">
        {currencyStore.fromCURSymbol}
      </InputAdornment>
    ));
  const OutputCurSymbol = () =>
    useObserver(() => <div>{currencyStore.toSymbol}</div>);
  const OutputValue = () =>
    useObserver(() => <div>{currencyStore.outputVal}</div>);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        style={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            padding: 10,
            paddingBottom: 5,
            fontSize: "125%",
          }}
        >
          Currency Convertor
        </div>

        <div
          style={{
            height: 2,
            backgroundColor: "gray",
            margin: 5,
          }}
        ></div>
        <div
          style={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            margin: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "85vh",
              margin: 10,
            }}
          >
            <FormControl
              style={{
                flex: 1,
                margin: 10,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Currency Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={currencyStore.fromCUR}
                onChange={(event) => {
                  currencyStore.setFromCurrency(event.target.value);
                  currencyStore.convert();
                }}
              >
                {currencyAllowed.map((element) => {
                  return (
                    <MenuItem
                      style={{ display: "flex" }}
                      value={element.currency}
                    >
                      <div style={{ flex: 1 }}>
                        {element.name + " [" + element.currency + "]"}
                      </div>
                      <div>{element.symbol}</div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <ArrowForwardIcon
              style={{
                margin: 10,
                alignSelf: "center",
              }}
            />
            <FormControl
              style={{
                flex: 1,
                margin: 10,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Currency Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
                onChange={(event) => {
                  currencyStore.setToCurrency(event.target.value);
                  currencyStore.convert();
                }}
              >
                {currencyAllowed.map((element) => {
                  return (
                    <MenuItem
                      style={{ display: "flex" }}
                      value={element.currency}
                    >
                      <div style={{ flex: 1 }}>
                        {element.name + " [" + element.currency + "]"}
                      </div>
                      <div>{element.symbol}</div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <FormControl style={{}} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Input</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              // value={0}
              onChange={(event)=>currencyStore.setInputValue(event.target.value)}
              startAdornment={InputCurSymbol()}
              labelWidth={60}
            />
          </FormControl>
          <div
            style={{
              justifyContent: "center",
              alignSelf: "center",
              fontSize: "250%",
              display: "flex",
            }}
          >
            {OutputCurSymbol()} &nbsp;
            {OutputValue()}
          </div>
        </div>
      </Paper>
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
        <Link to="/data">
          <Fab color="primary" variant="extended">
            Previous
            <ArrowBackIosIcon
              style={{
                marginLeft: 5,
              }}
            />
          </Fab>
        </Link>
        <Link to="/home">
          <Fab color="primary" variant="extended">
            <ArrowForwardIosIcon />
            Next
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Page4;
