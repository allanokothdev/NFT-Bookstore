import React, { Component } from "react";
import BookStoreContract from "./contracts/Bookstore.json";
import getWeb3 from "./getWeb3";
import PublishingList from "./components/PublishingList";
import "./App.css";

class App extends Component {

  state = { 
    storageValue: 0,
    web3: null, 
    accounts: null, 
    contract: null, 
    publishingList: [
      {
        id: 'dbjbjbdbjhbdbjbd',
        title: "Getting Started with React", 
        copiesRemaining: "2000",
        totalCopies: "2000",
        published: "No"
      },

      {
        id: 'hhbhbshbhbsh',
        title: "Ruby on Rails Dummies", 
        copiesRemaining: "20",
        totalCopies: "250",
        published: "Yes"
      },

      {
        id: 'jhjdjndjnjd',
        title: "Javascript Basics", 
        copiesRemaining: "200",
        totalCopies: "200",
        published: "Yes"
      } 
    ]
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BookStoreContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BookStoreContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    // const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(23).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App bg-light">
        <div className="container">
          <div className="p-5">
            <PublishingList list  = {this.state.publishingList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
