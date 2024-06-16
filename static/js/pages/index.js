/**
 * This file is about the main page of /index.html
 * 
 * Including : 
 *  - Iinit information fetch logic 
 *  - DOM control & Page information disply 
 *  - Action functions
 */

/**
 * Global datas
 */
var balances = {
    ton : 0,
    solana  :0,
    evm : 0,
    card : 0 ,
}

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
function action_connect(data)
{
    //display part

    const mount = document.getElementById('menu_confirm_content');
        
    const raw = `
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Wallet</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${wallets.evm}</h5>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Action</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">Connect to site ${data.d}</h5>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Permission</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">
                            See address|balance|activity|transactions
                        </h5>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Create Time</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${(new Date(Date.now())).toLocaleString()}</h5>
                    </div>
                    <div class="divider my-2"></div>
                    `
    document.getElementById('action_type').innerHTML = 'Connect'
    mount.innerHTML = raw
}
function action_sign(data)
{
    const mount = document.getElementById('menu_confirm_content');
        
    const raw = `
                        <div class="d-flex">
                            <h5 class="mb-0 font-600 font-14">Wallet</h5>
                            <h5 class="mb-0 ms-auto font-600 font-14">${wallets.evm}</h5>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="d-flex">
                            <h5 class="mb-0 font-600 font-14">Sign message</h5>
                            <h5 class="mb-0 ms-auto font-600 font-14">${data.d}</h5>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="d-flex">
                            <h5 class="mb-0 font-600 font-14">Permission</h5>
                            <h5 class="mb-0 ms-auto font-600 font-14">
                                See address|balance|activity|transactions
                            </h5>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="d-flex">
                            <h5 class="mb-0 font-600 font-14">Create Time</h5>
                            <h5 class="mb-0 ms-auto font-600 font-14">${(new Date(Date.now())).toLocaleString()}</h5>
                        </div>
                        <div class="divider my-2"></div>
                        `
        document.getElementById('action_type').innerHTML = 'Sign Message'
    mount.innerHTML = raw
}
function action_send(data)
{
    
}

function action_router_chain(data)
{
    const rawData = JSON.parse(storage_get_user_tg_data())
    const wallets = rawData.wallets;
    switch(data.c.t)
    {
        case 0 :
            balances['card'] =  balances['evm']
            wallet_card_connected("card", wallets.evm,'evm')
            break;
        case 1 :
            balances['card'] =  balances['solana']
            wallet_card_connected("card", wallets.sol,'solana')
            break;
        case 2 :
            balances['card'] =  balances['ton']
            wallet_card_connected("card", wallets.ton,'ton')
            break;
        default :
            break;
    }

}

function action_router(router)
{
    if(router)
        {
            try{
                var data = JSON.parse(
                    Buffer.from(base58.decode(id)).toString()
                )
                action_router_chain(data)
                if ( data.t == 0)
                    {
                        return action_connect(data);
                    }

                if ( data.t == 1)
                    {
                        return action_sign(data);
                    }
                if ( data.t == 2)
                    {
                        return action_send(data);
                    }
            }catch(e)
            {

            }
        }
}

async function action_display() {
    try{
        // console.log(document.getElementById('menu-bill').show)
        const rawData = JSON.parse(storage_get_user_tg_data())
        const wallets = rawData.wallets;

        //TON
        balances['ton'] = (await api_balance_ton(wallets.ton)).balance || 0;
        //SOL
        balances['solana'] = (await api_balance_sol(wallets.sol))  || 0;
        //EVM
        balances['evm'] = (await api_balance_arb(wallets.evm))  || 0;


        //Action router 
        const router = (new URLSearchParams(window.location.search)).get('tgWebAppStartParam');

        console.log("🚧 Balance " , balances)
        
    }catch(e){
        console.error(e)
    }
}


async function wallets_display() {
    try{
        const rawData = JSON.parse(storage_get_user_tg_data())
        const wallets = rawData.wallets;

        //TON
        balances['ton'] = (await api_balance_ton(wallets.ton)).balance || 0;
        wallet_card_connected("ton", wallets.ton)

        //SOL
        balances['solana'] = (await api_balance_sol(wallets.sol))  || 0;
        wallet_card_connected("solana", wallets.sol)

        //EVM
        balances['evm'] = (await api_balance_arb(wallets.evm))  || 0;
        wallet_card_connected("evm", wallets.evm)

        console.log("🚧 Balance " , balances)
    }catch(e){
        console.error(e)
    }
}

//Change the card status & type
function wallet_card_connect_button(id) {

    const mount_connected = document.getElementById(id + '_card_connect_status_connected')
    const mount_connected_address = document.getElementById(id + '_card_connect_status_connected_address')
    const mount_connected_disconnect = document.getElementById(id + '_card_connect_status_connected_disconnect')
    const mount_unconnected = document.getElementById(id + '_card_connect_status_unconnected')

    if (mount_unconnected.style.display == "none") {
        //Connected
        mount_unconnected.style.display = "inline"
        mount_connected.style.display = "none"
        mount_connected_address.style.display = "none"
        mount_connected_disconnect.style.display = "none"
    } else {
        //Unconnected

        mount_unconnected.style.display = "none"
        mount_connected.style.display = "inline"
        mount_connected_address.style.display = "inline"
        mount_connected_disconnect.style.display = "inline"
        console.log("unconnect", mount_connected_address)
    }

    return 0;
}
//New connected card draws
function wallet_card_connected(id, address ,display_type) {
    const mount_connected_address = document.getElementById(id + '_card_address')
    mount_connected_address.innerHTML = `${address}`
    wallet_card_connect_button(id)
    wallet_card_connect_balance(id,display_type)
    return 0;
}
//Get the connected card balance
function wallet_card_connect_balance(id,display_type) {
    console.log('Balance disply',id,display_type)
    const mount_connected = document.getElementById(id + '_card_balance')
    if(display_type)
        {
            id = display_type;
        }
    const balance = amount_to_display(id,balances[id]);
    console.log(balance)
    mount_connected.innerHTML = `${balance}`
    return 0;
}
//Disconnect the card
async function solana_disconnect_wallet(id) {
    await api_disconnect_solana()
    wallet_card_connect_button('solana')
    return 0;
}
async function ton_disconnect_wallet(id) {
    console.log("🐞Disconnect ton")
    await api_disconnect_ton()
    wallet_card_connect_button('ton')
    return 0;
}
async function evm_disconnect_wallet(id) {
    await api_disconnect_evm()
    wallet_card_connect_button('evm')
    return 0;
}


function debug() {
    console.log("🔥 Debug")
    wallet_card_connect_button("ton")
}