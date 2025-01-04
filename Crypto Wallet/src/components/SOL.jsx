import { useState ,useEffect} from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pubkey, setPubkey] = useState([]);
    useEffect(() => {
        console.log("Received mnemonic:", mnemonic);
    }, [mnemonic]);
    return <div>
         <button onClick={async function() {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            console.log("seed (hex)",seed.toString("hex"));
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPubkey([...pubkey, keypair.publicKey]);
        }}className="bg-blue-500 p-3 text-white rounded-sm  text-center">Add Solana Wallet</button>
        <br/>
        {pubkey.map(p => <div className="text-white text-2xl">
            Public key{currentIndex}-:{p.toBase58()}
        </div>)}
    </div>
}