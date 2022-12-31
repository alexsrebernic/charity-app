<template >
    <div>
        <div class="border-b w-4/6 border-gray-300 border-solid ">
            <div class="font-semibold my-2 tracking-tighter">
                <h1 class="text-3xl  ">
                    Documentation
                </h1>
                <span class="text-gray-300 text-md">
                    Last updated 12/28/2022
                </span>
            </div>
        </div>
        <div class="mt-10  ">
            <h2 class="font-semibold my-2">Welcome to CryptoFund web app!</h2>
            <p>An app where you can donate crypto and receive crypto</p> <br>
            <p>
                <ul>
                    <li>
                        * This project is a project which uses Vue 3 
                            framework as frontend and Hardhat as backend.
                    </li>
                    <li>
                        * The design for reference is a app from  FreeCodeCamp.org blockchain course in Youtube 
                        (<a class="text-blue-500 hover:underline" href="https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=39534s&ab_channel=freeCodeCamp.org">Link</a>)
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </p>
            <br>
                <p>
                    The links of the factory contracts are:
                            <a class="text-blue-500 hover:underline" href="https://goerli.etherscan.io/address/0xcdfDbaB13af39beDED2957fede6eF5F40091240b#code">Goerli</a>,
                            <a class="text-blue-500 hover:underline" href="https://testnet.bscscan.com/address/0x3b30FB1e5D493ec4bB2607B98841A9f251550aF5#code">Binance-testnet</a> 
                        
                </p>
            <br>
            <p>
                In order to run this project locally you have to: <br> <br>
                Clone the <a class="text-blue-500 hover:underline" href="https://github.com/alexsrebernic/crypto-fund-app">front end </a>repository  from GH. 
                <pre>
                    <code>git clone git@github.com:alexsrebernic/crypto-fund-app.git</code>
                </pre>
                Clone the <a href="https://github.com/alexsrebernic/crypto-fund-contract" class="text-blue-500 hover:underline">contract</a> repository from GH.
                <pre>
                    <code>git@github.com:alexsrebernic/crypto-fund-contract.git</code>
                </pre>
                Change current working directory to the frontend project directory.
                <pre>
                    <code>cd  crypto-fund-app/</code>
                </pre>
                Checking out the latest development branch.
                As of writing this guide the main branch used for development is: dev.<br>
                To switch to this branch run:
                <pre>
                    <code>git checkout dev</code>
                </pre>
                Install all dependencies.
                <pre>
                    <code>npm install</code>
                </pre>
                And run locally.
                <pre>
                    <code>npm run dev</code>
                </pre>
                The enviroment variables needed are:  <br>
                <pre>
                    <code>VITE_FACTORY_CONTRACT_ADDRESS_GOERLI=YOUR_FACTORY_CONTRACT_ADDRESS_GOERLI <br>VITE_FACTORY_CONTRACT_ADDRESS_BNB_TEST=YOUR_FACTORY_CONTRACT_ADDRESS_BINANCE_TESTNET<br>VITE_WEB_SOCKET_PROVIDER_GOERLI=YOUR_WEBSOCKET_PROVIDER
                    </code>
                </pre>
                Change current working directory to the contract project directory.
                <pre>
                    <code>cd ../crypto-fund-contract</code>
                </pre>
                Install all dependencies.
                <pre>
                    <code>npm install</code>
                </pre>
                The enviroment needed are: <br>
                <pre>
                    <code>GOERLI_RPC_URL=YOUR_GOERLI_RPC_URL<br>BSCTESTNET_RPC_URL=YOUR_BINANCE_TESTNET_RPC_URL<br>PRIVATE_KEY=YOUR_PRIVATE_KEY<br>ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY<br>BSCSCAN_API_KEY=YOUR_BSCSCAN_API_KEY
                    </code>
                </pre>
                To deploy 
                <pre>
                    <code>npx hardhat deploy</code>
                </pre>
                To run test
                <pre>
                    <code>npx hardhat test</code>
                </pre>
            </p>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.first-letter {
  font-size: 35px;
}
code {
    font-family: monospace;
    background: #ffeff0;
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: .1rem .3rem .2rem;
    border-radius: .2rem;
}
pre code {
  display: block;
  background: none;
  white-space: pre;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  max-width: 100%;
  min-width: 100px;
}
</style>