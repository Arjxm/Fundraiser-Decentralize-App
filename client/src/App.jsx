import { useEffect, useState } from "react";
import Home from "./components/Home";
import NewFundraiser from "./components/NewFundraiser";
import Receipts from "./components/Receipts";
import { BrowserRouter, Link, NavLink, Route, Router, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import getWeb3 from "./utils/getWeb3";

import FundraiserFactoryContract from "./contracts/FundraiserFactory.json";

const AApBAr = () => {
  return (
    <> <AppBar position="static" color="default" style={{ margin: 0 }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          <Link className="nav-link" to="/">Home</Link>
        </Typography>
        <Link className="nav-link" to="new">New</Link>
      </Toolbar>
    </AppBar>

    </>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });
  const [storageValue, setStorageValue] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, accounts, contract: instance });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract.
              Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  const runExample = async () => {
    const { accounts, contract } = state;
  };
  return (
    <div>
      <BrowserRouter>
        <AApBAr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new" element={<NewFundraiser />} />
          <Route path="receipts" element={<Receipts />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}


export default App;
