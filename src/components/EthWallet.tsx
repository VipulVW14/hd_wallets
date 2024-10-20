import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }: {mnemonic: string}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    const addEthWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address]);
    };

    return (
        <div>
            <button onClick={addEthWallet}>
                Add ETH wallet
            </button>

            {addresses.map((address, index) => (
                <div key={index}>
                    Eth - {address}
                </div>
            ))}
        </div>
    );
};
