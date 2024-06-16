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

        balances['card'] = (await api_balance_arb(wallets.evm))  || 0;
        wallet_card_connected("card", wallets.evm,'evm')

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