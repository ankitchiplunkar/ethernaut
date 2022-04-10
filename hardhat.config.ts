import { task } from 'hardhat/config';

import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(__dirname, './.env') });

import { HardhatUserConfig } from 'hardhat/types';
import { NetworkUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import path from 'path';
import fs from 'fs';

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const PRIVATE_KEY = process.env.PK || '';
const PRIVATE_KEY2 = process.env.PK2 || '';


function createTestnetConfig(
  network: keyof typeof chainIds,
): NetworkUserConfig {
  const url: string = 'https://' + network + '.infura.io/v3/' + INFURA_API_KEY;
  return {
    accounts: [PRIVATE_KEY, PRIVATE_KEY2],
    chainId: chainIds[network],
    url,
  };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    goerli: createTestnetConfig('goerli'),
    kovan: createTestnetConfig('kovan'),
    rinkeby: createTestnetConfig('rinkeby'),
    ropsten: createTestnetConfig('ropsten'),
    mainnet: createTestnetConfig('mainnet'),
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
      },
      {
        version: '0.6.6',
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    // enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;
