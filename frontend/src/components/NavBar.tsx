import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CHAIN_IDS } from '../utils/constants';
import { ActionTypes, useAppDispatch, useAppSelector } from '../store';
import detectEthereumProvider from '@metamask/detect-provider';

export function NavBar() {
  const dispatch = useAppDispatch();

  function handleAccount(account: string) {
    dispatch({
      type: ActionTypes.SET_ACCOUNT,
      payload: account,
    });
  }

  function handleChainId(chainId: string) {
    dispatch({
      type: ActionTypes.SET_CHAIN_ID,
      payload: chainId,
    });
  }

  function handleNetworkIdentifier(networkIdentifier: string) {
    dispatch({
      type: ActionTypes.SET_NETWORK_IDENTIFIER,
      payload: networkIdentifier,
    });
  }

  const account = useAppSelector((state) => state.web3.account);
  const networkIdentifier = useAppSelector(
    (state) => state.web3.networkIdentifier
  );
  let provider;

  async function handleConnect() {
    try {
      provider = await detectEthereumProvider();
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }

      // @ts-ignore
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      // @ts-ignore
      const chainId = await provider.request({ method: 'eth_chainId' });
      handleNetworkIdentifier(CHAIN_IDS[chainId]);
      handleAccount(accounts[0]);
      handleChainId(chainId);

      // @ts-ignore
      provider.on('accountsChanged', (accounts) => {
        handleAccount(accounts[0]);
      });

      // @ts-ignore
      provider.on('chainChanged', (chainId) => {
        handleChainId(chainId);
        handleNetworkIdentifier(CHAIN_IDS[chainId]);
        // window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Ramito de violetas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="align-self-end">
            {account === '' ? (
              <Nav.Link onClick={handleConnect}>Connect</Nav.Link>
            ) : (
              <>
                <Nav.Link>
                  {networkIdentifier.split('')[0].toUpperCase() +
                    networkIdentifier.slice(1 - networkIdentifier.length) ||
                    'Unknown network'}
                </Nav.Link>
                <Nav.Link>{account}</Nav.Link>
                <Nav.Link onClick={() => handleAccount('')}>
                  Disconnect
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
