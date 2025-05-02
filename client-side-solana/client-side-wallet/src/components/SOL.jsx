import { useState} from "react";
import axios from "axios";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pubkey, setPubkey] = useState([]);
    const [balance,setBalance] = useState("");
    return <div>
         <button onClick={async function() {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPubkey([...pubkey, keypair.publicKey]);
        }}className="bg-blue-500 p-3 text-white rounded-sm  text-center m-3">Add Solana Wallet</button>
        <br/>
        {pubkey.map(p => <div className="text-white text-xl">
            SOL Public key{currentIndex}-:{p.toBase58()}
            <button onClick={async function () { 
                const response = await axios.post("https://solana-devnet.g.alchemy.com/v2/Tzv2mIgg8zkW1Jur3VUYDJ-XvmlnfS3Q", {
                        "jsonrpc": "2.0",
                        "id": 1,
                        "method": "getAccountInfo",
                        "params": [p.toBase58()]
                })
                setBalance(response.data.result.value);
                if (response.data.result.value === null) {
                    setBalance("0");
                }
                console.log(balance);
            }} className="bg-blue-500 p-3 text-white rounded-sm  text-center m-3">
             Get Balance
            </button>
            <h1 className="text-white text-xl">
                 {balance}
            </h1>
        </div>)}
    </div>
}