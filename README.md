# Simple Message Storage Smart Contract

A beginner-friendly Ethereum smart contract demonstrating fundamental Solidity concepts including state variables, constructors, and public functions. This project serves as an introduction to blockchain development and smart contract deployment.

## 🚀 Features

- Store and retrieve messages on the Ethereum blockchain
- Update stored messages through a public function
- Fully tested implementation
- Deployment support for Rinkeby testnet

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MetaMask](https://metamask.io/) browser extension
- A code editor (e.g., VSCode, Sublime Text)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Conix96/solidity-message-storage-contract.git
   cd solidity-message-storage-contract
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. Create an account on [Infura](https://infura.io) to get an API key
2. Create a `.env` file in the project root:
   ```
   INFURA_API_KEY=your_infura_api_key
   MNEMONIC=your_metamask_mnemonic_phrase
   ```
3. Ensure you have enough test ETH in your MetaMask wallet:
   - Visit [Rinkeby Faucet](https://faucets.chain.link/rinkeby) to get test ETH
   - Connect your MetaMask wallet
   - Request test ETH

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 🚀 Deployment

1. Deploy to Rinkeby testnet:
   ```bash
   npm run deploy
   ```

2. The contract address will be displayed in the console after successful deployment

## 📝 Contract Usage

### Using Remix IDE

1. Visit [Remix Ethereum IDE](https://remix.ethereum.org/)
2. Create a new file named `MessageStorage.sol`
3. Copy and paste the contract code
4. Compile the contract
5. Deploy using "Injected Web3" environment
6. Interact with the contract through Remix's interface

### Using Web3.js

```javascript
const Web3 = require('web3');
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

// Set a new message
await contract.methods.setMessage("Hello, Blockchain!").send({ from: YOUR_ADDRESS });

// Get the current message
const message = await contract.methods.message().call();
```

## 🔍 Code Structure

```solidity
// Message storage smart contract
contract MessageStorage {
    string public message;  // Public message storage
    
    // Constructor: Sets initial message
    function MessageStorage(string initialMessage) public {
        message = initialMessage;
    }
    
    // Updates the stored message
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/message-storage-contract](https://github.com/yourusername/message-storage-contract)

## 🙏 Acknowledgments

- [Ethereum Documentation](https://ethereum.org/developers/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin](https://openzeppelin.com/) for smart contract best practices
