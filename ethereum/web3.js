import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // we are in the browser and metamask is running
    console.log('on client');
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else {
    // we are on the server *OR* the user is not running metamask
    // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
    const provider = new Web3.providers.HttpProvider("https://goerli.infura.io/v3/1e9e716253134c85924216c52f9f8070");
    web3 = new Web3(provider);
}

export default web3;