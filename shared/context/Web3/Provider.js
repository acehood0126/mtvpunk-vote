import React, { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import addresses from "../../addresses"
import Context from './Context'
import AuthApi from '../../../api/AuthApi'

const Provider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(undefined)
  const [installed, setInstalled] = useState(false)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [walletBalance, setWalletBalance] = useState(undefined)
  const [chainId, setChainId] = useState(undefined)
  const [signInOnProgress, setSignInOnProgress] = useState(true)
  const [jwt, setJWT] = useState()

  const [currentProvider, setCurrentProvider] = useState(undefined)

  const handleConnect = async () => {

    setConnecting(true)
    let provider = null
    try {
      provider = await web3Modal?.connect();
    } catch(e) {

    }

    if (provider) {
      const newWeb3 = new ethers.providers.Web3Provider(provider)
      const accounts = await newWeb3.listAccounts()
      const balance = await newWeb3.getBalance(accounts[0])
      
      const signer = newWeb3.getSigner()
      const savedJWT = window.localStorage.getItem("jwt")
      let loggedIn = false;
      
      const onCompleteConnect = () => {
        setWalletBalance(ethers.utils.formatEther(balance))
        setWalletAddress(accounts[0])
        setWallet(newWeb3.getSigner())
        setConnected(true)
        if(newWeb3.provider.chainId === addresses.networkNumID)
          setChainId(addresses.networkID)
        else
          setChainId(newWeb3.provider.chainId)
        setCurrentProvider(provider)

        provider.on('accountsChanged', (newAccounts) => {
          if (Array.isArray(newAccounts) && newAccounts.length) {
            setWalletAddress(newAccounts[0])
          } else if(newAccounts?.length === 0) {
            handleDisconnect()
          }
        }) 
        
        provider.on('chainChanged', (chainId, oldChainId) => {
          setChainId(chainId)
        })
      }


      if(savedJWT && savedJWT.length > 0) {
        try {
          const resp = await AuthApi.checkJwt(accounts[0], savedJWT)
          if(resp.data?.success) {
            setJWT(savedJWT)
            onCompleteConnect();
            loggedIn = true;
          }
        } catch (err) {
          console.log(err);
          window.localStorage.setItem("jwt", "")
          setSignInOnProgress(false)
        }
      } else {
        setSignInOnProgress(false)
      }

      if(!loggedIn) {
        AuthApi.getNonce(accounts[0])
        .then(async (resp) => {      
          let signature = '';  
          try {
            if( resp.data.nonce ) {
              signature = await signer.signMessage(resp.data.nonce);
            } else {
              throw new Error(
                'Failed to get nonce from server.'
              );
            }
          } catch (err) {
            throw new Error(
              'You need to sign the message to be able to log in.'
            );          
          }

          return signature
        }).then(async (signature) => {
          AuthApi.signin(accounts[0], signature)
          .then((resp) => {
            setJWT(resp.data.jwt)
          
            if(window.localStorage) {
              window.localStorage.setItem("wallet_connect", true);
              window.localStorage.setItem("jwt", resp.data.jwt)
            }
          })
          .catch((e) => {
            console.log(e);
            setConnected(false)
            setSignInOnProgress(false)
          })
        }).then(() => {
          onCompleteConnect();
        })
        .catch((err) => {
          console.log(err);
          setConnected(false)
          setSignInOnProgress(false)
        });
      }

    } else {
      await handleDisconnect()
    }

    setConnecting(false)
  }

  const switchNetwork = async () => {  
    if(currentProvider) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: addresses.networkID }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ 
                chainId: addresses.networkID, 
                chainName: 'MultiVAC Mainnet', 
                nativeCurrency:
                {
                    name: 'MTV',
                    symbol: 'MTV',
                    decimals: 18
                },
                rpcUrls: ['https://rpc.mtv.ac']
              }],
            });
          } catch (addError) {
            // handle "add" error
            console.log(addError)
          }
        }
        // handle other "switch" errors
      }
    }
  }

  const handleDisconnect = async () => {
    setConnected(false)
    setWalletAddress(undefined)
    setWallet(undefined)
    if(web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    if(window.localStorage)
      window.localStorage.setItem("wallet_connect", false);
  }

  const checkTransaction = async (hash) => {
    if(currentProvider) {       
      
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider, "any")
      return await newWeb3.perform('getTransactionReceipt', {transactionHash: hash})
    }
    return null
  }

  const waitForTransaction = (hash, timeOut = 1000) => {
    return new Promise((resolve, reject) => {
      if(hash === null || hash === undefined) { 
        reject()
        return
      }
      const interval = setInterval(async () => {
          const result = await checkTransaction(hash)
          if(result) {   
              if(result.status === '0x1' || result.status === 1) {
                resolve();
              } else {
                reject();
              }
              
              clearInterval(interval)
          }
      }, timeOut)
    })
  }

  const initWeb3Modal = async () => {
    try {
        if (!web3Modal) {
            const providerOptions = {
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask",
                }
            };

            const web3Modal = new Web3Modal({
                network: "MultiVAC Mainnet",
                cacheProvider: true,
                providerOptions,
                theme: 'light',
            })

            setWeb3Modal(web3Modal)
        }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setInstalled(true)
      if (web3Modal && web3Modal.connected)
        handleConnect()

      if (connected){
        handleConnect()
      }
    }
    else {
      setInstalled(false)
    }
  }, [setWeb3Modal, web3Modal])

  useEffect(() => {    
    if(window.localStorage)
      setConnected(JSON.parse(localStorage.getItem('wallet_connect')))
    initWeb3Modal()
  }, [])

  return (
    <Context.Provider
      value={{
        handleConnect,
        handleDisconnect,
        switchNetwork,
        installed,
        connected,
        connecting,
        walletAddress,
        walletBalance,
        wallet,
        chainId,
        signInOnProgress,
        jwt,
        checkTransaction,
        waitForTransaction
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
