export type Network = {
  name: string;
  provider: string;
  ticker: string;
};

export type MessengerSpec = {
  useCaseName: string;
  symbol: string;
  ownerUrl: string;
  useCaseDocs: string;
  externalAdapterRepo: string;
  externalAdapterURL: string;
  unit: string;
  keywords: Array<string>;
  timestamp: Date;
  ipfsData: {
    [key: string]: IPFSDataField;
  };
  version: {
    major: 1;
    minor: 0;
    patch: 0;
  };
};

export type IPFSDataField = {
  name: string;
  type: string;
  description: string;
  values?: Array<string>;
};

export enum IPFSDataTypes {
  STRING = 'string',
  NUMBER = 'number',
}
