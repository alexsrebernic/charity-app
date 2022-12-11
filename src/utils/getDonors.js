import { ethers, utils } from 'ethers'
import {abi} from '../contracts/abis/Factory.json'
import networksData from '../helpers/networksData'
export default async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress =  networksData[networkId].factoryContractAddress;
    const contract = new ethers.Contract(contractAddress, abi, provider)
    const transactionResponse = await contract.getDonors()
    return transactionResponse
}