import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }: {mnemonic:string}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

    const addWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const { key: derivedSeed } = derivePath(path, seed.toString("hex"));
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        
        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keypair.publicKey]);
    };

    return (
        <div>
            <button onClick={addWallet}>
                Add Solana Wallet
            </button>
            {publicKeys.map((p, index) => (
                <div key={index}>
                    {p.toBase58()}
                </div>
            ))}
        </div>
    );
}
