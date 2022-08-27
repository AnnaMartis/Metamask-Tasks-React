import { ethers } from 'ethers';
import React, {useState, useEffect} from 'react';

export interface IAppProps {
}


declare global {
    interface Window {
      ethereum?: any;
    }
}

export default function SimpleStore (props: IAppProps) {

   
    const [errorMessage, setErrorMessage] = useState<any>(null);
    const [defaultAccount, setDefaultAccount] = useState<any>(null);
    const [connButtonText, setConnButtonText] = useState<string>("Connect Wallet");

   

    const ethereum = global?.window?.ethereum;
  
    const connectWalletHandler = () => {
        if (connButtonText === "Connect Wallet") {
            if (ethereum) { 
                ethereum.request({method : "eth_requestAccounts"})
                    .then((result :any)  => {
                        console.log(result);
                        accountChangedHandler(result[0]);
                        setConnButtonText("Disconnect")
                    })
    
                changeNetworkToTest()
            } else {
               
                setErrorMessage("Need To Install Metamask")
            }

        } else {
            // await web3Modal.clearCachedProvider()
        }
        
    }


    const accountChangedHandler = (newAccount:any) => {
        setDefaultAccount(newAccount);
       
    }

   

    // Network Change

 
   
    // const web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
   

   

    const chainId = 1;
    const testChainId = 5;


    
    const [balance, setBalance] = useState<any>(null);

    const changeNetworkToTest = async () => {
        console.log("yees")
        if (window.ethereum.networkVersion !== testChainId) {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(testChainId) }]
              });
            } catch (err : any) {
                // This error code indicates that the chain has not been added to MetaMask
                alert("Wallet is not included")
            }
          }
         
         
          web3.eth.getBalance("0xACFb8046715afa601aA03F3B8A7b8F30E5C6e166")
                .then((bal:number)=> setBalance(bal/1000000000000000000));

        }
        

        const changeNetwork = async () => {
            if (window.ethereum.networkVersion !== chainId) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: Web3.utils.toHex(chainId) }]
                  });
                } catch (err : any) {
                    // This error code indicates that the chain has not been added to MetaMask
                  alert("Wallet is not included")
                }
              }
              web3.eth.getBalance("0xACFb8046715afa601aA03F3B8A7b8F30E5C6e166")
              .then((bal:number)=> setBalance(bal/1000000000000000000));

            }
            

        



       




  return (
    <div>
        <button onClick={connectWalletHandler}>{connButtonText}</button>
        <h3>Current Network: </h3>
        <button onClick={changeNetworkToTest}>Switch to GoerliETH</button>
        <button onClick={changeNetwork}>Switch to Ethereum Mainnet</button>
        <h3>Address: {defaultAccount} </h3>
        <h3>{errorMessage}</h3>
        <h3>Balance : {balance}</h3>
    </div>
  );
}
