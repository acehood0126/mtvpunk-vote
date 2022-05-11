import { useContext } from 'react'
import { ContractsContext } from '../context/Contracts'

const useContracts = () => {
  return {
    ...useContext(ContractsContext),
  }
}

export default useContracts