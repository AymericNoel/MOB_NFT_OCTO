require("dotenv").config();
const { PRIVATE_KEY, RPC_API_KEY_ALCHEMY, ETHERSCAN_API_KEY } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [PRIVATE_KEY],
          providerOrUrl: `https://eth-goerli.g.alchemy.com/v2/${RPC_API_KEY_ALCHEMY}`,
        }),
      network_id: 5, // Goerli's id
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",
    },
  },

  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
  },
};
