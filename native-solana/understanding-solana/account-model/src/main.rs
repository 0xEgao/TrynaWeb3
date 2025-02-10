//solana accout-model
//
//data -: byte array that stores data for an account,for non executable it stores read only state.
//For executable (program accounts) it stores the executable porfram code.(account data)

//executable-: if it's a program or not.
//lamports-: how much lamports this solana account hold

//owner:The program id(pubkey) which owns this account.Only owner can modify the account's data deduct any lamports.

//rent_epoch: depracated thing used to collect rent from account time to time.

pub struct Account{
    pub lamports:u64,

    #[cfg_attr(#feature="serde",serde(with= "serde_bytes"))]
   pub data: Vec<u8>,
   pub ownere:Pubkey,
   pub executable:bool,
   pub rent_epoch:Epoch, //it is depracated now

}

//native program in solana

// 1.System Program
//    -:
// 2.Bpf loader program
