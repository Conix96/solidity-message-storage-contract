require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Environment variables validation
const requiredEnvVars = ['MNEMONIC', 'INFURA_API_KEY', 'INITIAL_MESSAGE'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Error: Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`- ${envVar}`));
  console.error('\nPlease check your .env file');
  process.exit(1);
}

// Network configuration
const NETWORKS = {
  rinkeby: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
  mainnet: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  // Add more networks as needed
};

// Gas configuration
const GAS_LIMIT = '1000000';
const GAS_PRICE = '20000000000'; // 20 Gwei

/**
 * Deploys the smart contract to the specified network
 * @param {string} network - The network to deploy to (e.g., 'rinkeby', 'mainnet')
 * @returns {Promise<void>}
 */
const deploy = async (network = 'rinkeby') => {
  console.log(`\nStarting deployment to ${network.toUpperCase()}...`);
  console.log('----------------------------------------');

  if (!NETWORKS[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  // Initialize provider and Web3 instance
  const provider = new HDWalletProvider({
    mnemonic: process.env.MNEMONIC,
    providerOrUrl: NETWORKS[network],
    addressIndex: 0,
    numberOfAddresses: 1
  });

  const web3 = new Web3(provider);

  try {
    // Get deployment account
    const accounts = await web3.eth.getAccounts();
    const deployerAccount = accounts[0];

    console.log('Deployer account:', deployerAccount);
    
    // Check account balance
    const balance = await web3.eth.getBalance(deployerAccount);
    const balanceEth = web3.utils.fromWei(balance, 'ether');
    console.log('Account balance:', balanceEth, 'ETH');

    if (parseFloat(balanceEth) < 0.1) {
      throw new Error('Insufficient funds for deployment');
    }

    // Deploy contract
    console.log('\nDeploying contract...');
    console.log('Initial message:', process.env.INITIAL_MESSAGE);

    const contract = new web3.eth.Contract(JSON.parse(interface));
    const deploy = contract.deploy({
      data: bytecode,
      arguments: [process.env.INITIAL_MESSAGE]
    });

    const gasEstimate = await deploy.estimateGas();
    console.log('Estimated gas:', gasEstimate);

    const deployedContract = await deploy.send({
      from: deployerAccount,
      gas: Math.min(gasEstimate * 1.2, GAS_LIMIT), // Add 20% buffer to estimated gas
      gasPrice: GAS_PRICE
    });

    // Log deployment success
    console.log('\nDeployment successful!');
    console.log('----------------------------------------');
    console.log('Contract address:', deployedContract.options.address);
    console.log('Transaction hash:', deployedContract._requestManager.provider.lastResponse.result);
    console.log('Network:', network);
    console.log('Gas used:', gasEstimate);
    
    // Save deployment info to a file
    const fs = require('fs');
    const deploymentInfo = {
      network,
      contractAddress: deployedContract.options.address,
      deploymentTime: new Date().toISOString(),
      deployer: deployerAccount,
      initialMessage: process.env.INITIAL_MESSAGE
    };

    fs.writeFileSync(
      `deployment-${network}-${deploymentInfo.deploymentTime.split('T')[0]}.json`,
      JSON.stringify(deploymentInfo, null, 2)
    );

  } catch (error) {
    console.error('\nDeployment failed!');
    console.error('----------------------------------------');
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    provider.engine.stop();
  }
};

// Execute deployment
const network = process.argv[2] || 'rinkeby';
deploy(network).catch(console.error);
