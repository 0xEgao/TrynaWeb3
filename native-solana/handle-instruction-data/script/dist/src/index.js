"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("@coral-xyz/borsh");
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("@solana-developers/helpers");
dotenv_1.default.config();
const movieInstructionLayout = (0, borsh_1.struct)([
    (0, borsh_1.u8)("variant"),
    (0, borsh_1.str)("title"),
    (0, borsh_1.u8)("rating"),
    (0, borsh_1.str)("description"),
]);
function sendTestMovieReview(signer, programId, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let buffer = Buffer.alloc(1000);
        const movieTitle = `Jab tak hai jaan`;
        movieInstructionLayout.encode({
            variant: 0,
            title: movieTitle,
            rating: 5,
            description: "A great movie",
        }, buffer);
        buffer = buffer.subarray(0, movieInstructionLayout.getSpan(buffer));
        const [pda] = yield web3_js_1.PublicKey.findProgramAddressSync([signer.publicKey.toBuffer(), Buffer.from(movieTitle)], programId);
        console.log("PDA is:", pda.toBase58());
        const transaction = new web3_js_1.Transaction();
        const instruction = new web3_js_1.TransactionInstruction({
            programId: programId,
            data: buffer,
            keys: [
                {
                    pubkey: signer.publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: web3_js_1.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                },
            ],
        });
        transaction.add(instruction);
        const tx = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [signer]);
        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
        const signer = yield (0, helpers_1.initializeKeypair)(connection, {
            airdropAmount: web3_js_1.LAMPORTS_PER_SOL,
            envVariableName: "PRIVATE_KEY",
        });
        const movieProgramId = new web3_js_1.PublicKey("DKAzff5txTjCW3TG8uGrFYaFthqrhtRx7Qv1YBvdbZwW");
        yield sendTestMovieReview(signer, movieProgramId, connection);
        console.log("Finished successfully");
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}))();
