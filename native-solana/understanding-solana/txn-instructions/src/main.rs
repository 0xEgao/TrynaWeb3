//key points for txn and instructions


// txns are atomic that is if any instruction fails the txn fails,
//maximum size of txn is 1232 bytes.

//instructions are those request which invoke programs to the network.


// each instruction has 3piece of info -: 
//    a-) address of program to invoke
//    b-) the account of instruction the program will read /write to.
//    c-) any additional data required like funtion agrs, etc.
 

//wallets are owned by system program ,so  like for example sending sol from one account to another
//involve invoking the system program.
//


//Decoinf txn in solana
//      a-)Signatures -: array of 64byes of signatures
//      b-) messages -: 
//                  1-)Message header-: (3bytes) specifies the number of signer and read-only
//                  account
//                  2-)Account addresses array each of 32byes
//                  3-)Recent blockchash (32bytes)
//                  3-) array of instruction

//message struct 

pub struct Message {
    /// The message header, identifying signed and read-only `account_keys`.
    pub header: MessageHeader,
 
    /// All the account keys used by this transaction.
    #[serde(with = "short_vec")]
    pub account_keys: Vec<Pubkey>,
 
    /// The id of a recent ledger entry.
    pub recent_blockhash: Hash,
 
    /// Programs that will be executed in sequence and committed in
    /// one atomic transaction if all succeed.
    #[serde(with = "short_vec")]
    pub instructions: Vec<CompiledInstruction>,
}


//example showcasing mesasge header

pub struct MessageHeader {
    /// The number of signatures required for this message to be considered
    /// valid. The signers of those signatures must match the first
    /// `num_required_signatures` of [`Message::account_keys`].
    pub num_required_signatures: u8,
 
    /// The last `num_readonly_signed_accounts` of the signed keys are read-only
    /// accounts.
    pub num_readonly_signed_accounts: u8,
 
    /// The last `num_readonly_unsigned_accounts` of the unsigned keys are
    /// read-only accounts.
    pub num_readonly_unsigned_accounts: u8,
}

