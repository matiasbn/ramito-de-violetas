export enum NETWORK_NAMES {
  DEVELOP = 'develop',
  MUMBAI = 'mumbai',
  HARMONYTESTNET = 'harmonytestnet',
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  HARMONY = 'harmony',
  KOVAN = 'kovan',
  FUJI = 'fuji',
  RINKEBY = 'rinkeby',
}

export const CHAIN_IDS: { [index: string]: any } = {
  '0x1': NETWORK_NAMES.ETHEREUM,
  '0x4': NETWORK_NAMES.RINKEBY,
  '0x6357d2e0': NETWORK_NAMES.HARMONYTESTNET,
  '0x63564c40': NETWORK_NAMES.HARMONY,
  '0x89': NETWORK_NAMES.POLYGON,
  '0x13881': NETWORK_NAMES.MUMBAI,
  '0x539': NETWORK_NAMES.DEVELOP,
};

export enum LOCAL_STORAGE_KEYS {
  SELECTED_NETWORK = 'selected-network',
}
