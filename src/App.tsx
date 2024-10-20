import { useState } from 'react';
import './App.css';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <>
      <input type="text" value={mnemonic} readOnly />

      <button onClick={handleGenerateMnemonic}>
        Create Seed Phrase
      </button>

      {/* Pass mnemonic as prop directly */}
      <EthWallet mnemonic={mnemonic} />
      <SolanaWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
