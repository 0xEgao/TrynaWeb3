import { useState } from "react";
import axios from "axios";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [balance, setBalance] = useState("");

    return (
        <div>
            <button onClick={async function() {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                 const hdNode = HDNodeWallet.fromSeed(seed);
                 const child = hdNode.derivePath(derivationPath);
                 const privateKey = child.privateKey;
                 const wallet = new Wallet(privateKey);
                 setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, wallet.address]);
            }} className="bg-blue-500 p-3 text-white rounded-sm  text-center m-3">
                Add ETH wallet
            </button>

            {addresses.map(p => <div className="text-white text-xl">
                ETH public key {currentIndex}-: {p}
                <button onClick={async function () {
                    const response = await axios.post("https://worldchain-mainnet.g.alchemy.com/v2/zEqt3CLpTNouKY7ycqhGZiobMnRtae5O", {
                            "jsonrpc": "2.0",
                            "id": 1,
                            "method": "eth_getBalance",
                            "params": [p]
                    })
                    setBalance(response.data.result);
                }
                }  className="bg-blue-500 p-3 text-white rounded-sm  text-center m-3">
                    Get Balance
                </button>
             <h1 className="text-white text-xl">
                 {parseInt(balance,16)}
            </h1>

            </div>)}
        </div>
    )
}