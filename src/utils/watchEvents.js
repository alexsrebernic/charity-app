const ethers = require('ethers')
const { abi } = require('../contracts/abis/Factory.json')
const networkData = require('../utils/networksData')
async function main(chainId){
    const wbsProvider = networkData[chainId].webSocketProvider;
    if(!wbsProvider) return
    let address = networkData[chainId].factoryContractAddress;
    const provider = new ethers.providers.WebSocketProvider(wbsProvider);
    const contract = new ethers.Contract(address,abi,provider)
    contract.on("newDonee", (from,to,value,event) => {
        let info = {
            from,
            to,
            value: ethers.utils.formatUnits(value,6),
            data:event,
        }
        console.log(info)
    })
}
export default main