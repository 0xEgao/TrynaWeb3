import { useState } from 'react'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black'>
      <h1 className='text-blue-500 font-bold text-3xl'>Solana Faucet</h1>
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                <Airdrop />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

function Airdrop() {
  const wallet= useWallet()
  const { connection } = useConnection()

  async function requestAirdrop() {
    let amount = document.getElementById('amount').value;
    await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
    alert('Airdrop requested'+amount +"SOL to "+wallet.publicKey.toBase58());
  }
  return (
    <div>
      <br></br>
      <input id="amount" type="text" placeholder='amount' className='m-3 p-3'></input>
      <button onClick={requestAirdrop} className='text-white bg-blue-500 m-3 p-3'>Request Airdrop</button>
    </div>
  )
}

export default App
