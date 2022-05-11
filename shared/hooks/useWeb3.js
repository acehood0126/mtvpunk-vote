import { useContext } from 'react'
import { Web3Context } from '../context/Web3'

const useWeb3 = () => {
  return {
    ...useContext(Web3Context),
  }
}

export default useWeb3
