import React, { ReactNode } from 'react';
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from '../utils/localStorage';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { MessengerSpec } from '../types';

const initialState = {
  web3: {
    account: '',
    chainId: '0x0',
    networkIdentifier: '',
  },
  deploySLA: {
    selectedMessenger: {},
    ipfsHash: '',
  },
};

export type State = typeof initialState;

export enum ActionTypes {
  'SET_ACCOUNT' = 'SET_ACCOUNT',
  'SET_CHAIN_ID' = 'SET_CHAIN_ID',
  'SET_NETWORK_IDENTIFIER' = 'SET_NETWORK_IDENTIFIER',
  'SET_SELECTED_MESSENGER' = 'SET_SELECTED_MESSENGER',
  'SET_IPFS_HASH' = 'SET_IPFS_HASH',
}

type Action =
  | { type: ActionTypes.SET_ACCOUNT; payload: string }
  | { type: ActionTypes.SET_CHAIN_ID; payload: string }
  | { type: ActionTypes.SET_NETWORK_IDENTIFIER; payload: string }
  | { type: ActionTypes.SET_SELECTED_MESSENGER; payload: MessengerSpec }
  | { type: ActionTypes.SET_IPFS_HASH; payload: string };

export function reducer(
  state: State = getCurrentState(),
  action: Action
): State {
  switch (action.type) {
    case ActionTypes.SET_ACCOUNT: {
      return {
        ...state,
        web3: {
          ...state.web3,
          account: action.payload,
        },
      };
    }
    case ActionTypes.SET_CHAIN_ID: {
      return {
        ...state,
        web3: {
          ...state.web3,
          chainId: action.payload,
        },
      };
    }
    case ActionTypes.SET_NETWORK_IDENTIFIER: {
      saveState(LOCAL_STORAGE_KEYS.SELECTED_NETWORK, action.payload);
      return {
        ...state,
        web3: {
          ...state.web3,
          networkIdentifier: action.payload,
        },
      };
    }
    case ActionTypes.SET_SELECTED_MESSENGER: {
      return {
        ...state,
        deploySLA: {
          ...state.deploySLA,
          selectedMessenger: action.payload,
        },
      };
    }
    case ActionTypes.SET_IPFS_HASH: {
      return {
        ...state,
        deploySLA: {
          ...state.deploySLA,
          ipfsHash: action.payload,
        },
      };
    }
  }
  saveState('appState', state);
  return state;
}

function getLocalState(): State | undefined {
  const localState = loadState('appState') as State;
  if (!localState) {
    return;
  }

  return localState || initialState;
}

function getCurrentState(): State {
  return getLocalState() || initialState;
}
const store = createStore(reducer, getCurrentState(), composeWithDevTools());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function AppProvider(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
