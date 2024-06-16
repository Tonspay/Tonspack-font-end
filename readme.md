# Tonspack font-end 

This repo is to storage the font-end wallet part of Tonspack

We might try something cool .

## Chains support 

- EVM base chain
    - ETH
    - ARB
    - BASE
    - BSC
    - POLYGON

- Solana chain

- TON chain

- Aptos chain

- Cosmos chains

- TRON

- Lighting network 

## Wallet connect base logic 

- Dapp generate a random key (32 lenght)
 
- Dapp params key into webapp link 

- Dapp loop call api interface with random Key for callback/webhook

- User open Webapp with generated link

- Tonspack server update information of callback address

Basically speaking , it requir for bot font-end & back-end to process the router . 

## Action router 

```

/**
 * Router struct :
 * {
 * t : 0, // Action type . 0 connect  . 1 sign message . 2.sign and send transaction
 * d : {}. // Struct for different actions
 * }
 * 
 * Chain information struct
 * {
 * t:0 , // chain type . 0 evm , 1 solana , 2 ton , 3 aptos ,4 tron , 5 cosmos 
 * i:0 , // chain id 
 * }
 * 
 * //Wallet connect action
 * {
 * i:"", //event ID . font-end generate uuid
 * d:"", //Data Connect to who
 * c:{}, //Chain struct
 * r:"" // redirect address . null will not reqirect.
 * }
 * 
 * //Sign message
 * {
 * i:"", //event ID . font-end generate uuid
 * d:"", //Data Sign message . Base58encode . 
 * c:"", // Chain struct
 * r:""// redirect address
 * }
 * 
 * //Sign and send transaction
 * {
 * i:"", //event ID . font-end generate uuid
 * d:"", //Data transactions
 * c:{}, //Chain struct
 * r:"" // redirect address . null will not reqirect.
 * }
 */

 ```