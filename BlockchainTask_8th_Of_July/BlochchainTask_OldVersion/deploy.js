const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('../build/my_token.json');
import "./constants";

const provider = new HDWalletProvider(
	'peanut lizard salute husband regret spell lamp orange cotton august rookie food', //metamask seed phrase
	'https://rinkeby.infura.io/v3/ea0452c6c48d42c185fb5217ad20faf1' //my infura API key
);

const web3 = new Web3(provider);

(async () => {
	const accounts = await web3.eth.getAccounts();

	console.log(`Attempting to deploy from account: ${accounts[0]}`);

	const deployedContract = await new web3.eth.Contract(compiledContract.abi)
		.deploy({
			data: '0x' + compiledContract.evm.bytecode.object,
			arguments: [3, 5]
		})
		.send({
			from: accounts[0],
			gas: '2000000'
		});

	console.log(
		`Contract deployed at address: ${deployedContract.options.address}`
	);

	provider.engine.stop();
})();