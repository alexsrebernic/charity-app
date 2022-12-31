const FACTORY_CONTRACT_ADDRESS_GOERLI = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS_GOERLI
const FACTORY_CONTRACT_ADDRESS_BNB_TEST = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS_BNB_TEST
const WEB_SOCKET_PROVIDER_GOERLI = import.meta.env.VITE_WEB_SOCKET_PROVIDER_GOERLI
export default {
    5: {
        name: "Goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        factoryContractAddress: FACTORY_CONTRACT_ADDRESS_GOERLI,
        JSONRPCProvider: "https://rpc.ankr.com/eth_goerli",
        id: "5",
        token: "GoerliETH",
        type:"Testnet",
        webSocketProvider: WEB_SOCKET_PROVIDER_GOERLI
    },
    97: {
        name: "Binance-testnet",
        ethUsdPriceFeed: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
        factoryContractAddress: FACTORY_CONTRACT_ADDRESS_BNB_TEST,
        JSONRPCProvider: "https://rpc.ankr.com/bsc_testnet_chapel",
        id: "97",
        token: "BNB",
        type:"Testnet",
        webSocketProvider:null
    }
}