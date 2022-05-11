import React, { useCallback, useMemo, useEffect, useState } from 'react'
import abis from '../../abis'
import useWeb3 from '../../hooks/useWeb3'
import { Contract, BigNumber, utils } from 'ethers'

import Context from './Context'
import addresses from '../../addresses'

const Provider = ({ children }) => {
  
  const PROPOSAL_LIFETIME = 3600 * 24 * 7 * 1000;  // 7 days
  // const PROPOSAL_LIFETIME = 60 * 1 * 1000;  // 1 mins

  const [mtvpunksContract, setMTVPunksContract] = useState(
    new Contract(addresses.MtvPunks, abis.MtvPunks)
  )  

  const [votingContract, setVotingContract] = useState(
    new Contract(addresses.Voting, abis.Voting)
  )  

  const { wallet, walletAddress, chainId, connected } = useWeb3()  

  useEffect(() => {
    if (!!wallet && !votingContract.signer) {
      setVotingContract(votingContract.connect(wallet))
    }
    if (!!wallet && !mtvpunksContract.signer) {
      setMTVPunksContract(mtvpunksContract.connect(wallet))
    }
  }, [wallet])

  const getBalance = useCallback(async () => {
    if (!walletAddress || !mtvpunksContract?.signer) return null
    
    try {
      const balance = await mtvpunksContract.balanceOf(walletAddress)
      return parseFloat(utils.formatUnits(balance, 0))
    } catch (e) {}
    return null
  }, [walletAddress, mtvpunksContract] )
  
  const getTotalSupply = useCallback(async () => {
    if (!walletAddress || !mtvpunksContract?.signer) return null
    
    try {
      const totalSupply = await mtvpunksContract.totalSupply()
      return parseFloat(utils.formatUnits(totalSupply, 0))
    } catch (e) {}
    return null
  }, [walletAddress, mtvpunksContract] )
  
  const startVoting = useCallback(async (title) => {
    if (!walletAddress || !votingContract?.signer) return false
    
    try {
      await votingContract.startVoting(PROPOSAL_LIFETIME / 1000, title)
      return true
    } catch (e) {}
    return false
  }, [walletAddress, votingContract] )

  const getVoting = useCallback(async (votingID) => {
    if (!walletAddress || !votingContract?.signer) return false
    
    try {
      const result = await votingContract.getVoting(votingID)
      const accepted = parseFloat(utils.formatUnits(result.totalAccepted, 0))
      const rejected = parseFloat(utils.formatUnits(result.totalRejected, 0))
      return {
        accepted: accepted,
        rejected: rejected,
        total: accepted + rejected
      }
    } catch (e) {}
    return false
  }, [walletAddress, votingContract] )

  const getVoteOf = useCallback(async (votingID) => {
    if (!walletAddress || !votingContract?.signer) return false
    
    try {
      const result = await votingContract.getVoteOf(votingID, walletAddress)
      return result
    } catch (e) {}
    return false
  }, [walletAddress, votingContract] )

  const voteProposal = useCallback(async (votingID, status) => {
    if (!walletAddress || !votingContract?.signer) return false
    
    try {
      return await votingContract.vote(votingID, status)
    } catch (e) {}
    return false
  }, [walletAddress, votingContract] )
  
  const executeVoting = useCallback(async (votingID) => {
    if (!walletAddress || !votingContract?.signer) return false
    try {
      return await votingContract.executeVoting(votingID)
    } catch (e) {
      console.log(e)
    }
    return false
  }, [walletAddress, votingContract] )
  
  return (
    <Context.Provider
      value={{
        getBalance,
        getTotalSupply,
        startVoting,
        getVoting,
        getVoteOf,
        voteProposal,
        executeVoting,
        PROPOSAL_LIFETIME
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
