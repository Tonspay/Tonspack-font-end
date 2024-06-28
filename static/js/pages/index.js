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
function action_connect(data,chain)
{
    //display part
    const rawData = JSON.parse(storage_get_user_tg_data())
    const wallets = rawData.wallets;
    const mount = document.getElementById('menu_confirm_content');
        
    const raw = `
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Wallet</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.address}</h5>
                    </div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Chain</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.type}</h5>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Action</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">Connect to : ${data.d}</h5>
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
    document.getElementById('action_confirm_button').onclick = async function(){
        await action_request(data)
    }
    mount.innerHTML = raw
}
function action_sign(data,chain)
{
    const rawData = JSON.parse(storage_get_user_tg_data())
    const wallets = rawData.wallets;
    const mount = document.getElementById('menu_confirm_content');
        
    const raw = `
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Wallet</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.address}</h5>
                    </div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Chain</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.type}</h5>
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
        document.getElementById('action_confirm_button').onclick = async function(){
            await action_request(data)
        }
        mount.innerHTML = raw
}
function action_send(data,chain)
{
    const rawData = JSON.parse(storage_get_user_tg_data())
    const wallets = rawData.wallets;
    const mount = document.getElementById('menu_confirm_content');
        
    const raw = `
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Wallet</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.address}</h5>
                    </div>
                    <div class="d-flex">
                        <h5 class="mb-0 font-600 font-14">Chain</h5>
                        <h5 class="mb-0 ms-auto font-600 font-14">${chain.type}</h5>
                    </div>
                        <div class="divider my-2"></div>
                        <div class="d-flex">
                            <h5 class="mb-0 font-600 font-14">Transaction Details</h5>
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
        document.getElementById('action_type').innerHTML = 'Send transactions'
        document.getElementById('action_confirm_button').onclick = async function(){
            await action_request(data)
        }
        mount.innerHTML = raw
}
async function action_request(data)
{   
    const ret = await api_action(data);
    console.log(ret)

    //Callback by the data.c or just redirect or close windows

    if(data.c && data.c.length>5)
        {
            location.href = data.c
        }else{
            await Telegram.WebApp.close()
        }
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
            return {
                type:"evm",
                address:wallets.evm
            }
            break;
        case 1 :
            balances['card'] =  balances['solana']
            wallet_card_connected("card", wallets.sol,'solana')
            return {
                type:"solana",
                address:wallets.sol
            }
            break;
        case 2 :
            balances['card'] =  balances['ton']
            wallet_card_connected("card", wallets.ton,'ton')
            return {
                type:"ton",
                address:wallets.ton
            }
            break;
        default :
        return "NA"
            break;
    }
}

async function action_router(router)
{
    if(router)
        {
            try{
                var data = JSON.parse(
                    Buffer.from(base58.decode(router)).toString()
                )
                console.log("🚧",data)
                if(data?.p)
                {
                    var tmpData = await api_preconnect();
                    console.log("🚧",tmpData)
                    if(data?.data)
                    {
                        data = JSON.parse(
                            Buffer.from(base58.decode(data.data)).toString()
                        )
                    }else
                    {
                        window.alert("Connection Timeout");
                    }

                }
                var chain = action_router_chain(data)
                console.log(chain)
                if ( data.t == 0)
                    {
                        return action_connect(data,chain);
                    }

                if ( data.t == 1)
                    {
                        return action_sign(data,chain);
                    }
                if ( data.t == 2)
                    {
                        return action_send(data,chain);
                    }
            }catch(e)
            {
                console.error(e)
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
        console.log("🚧",router);

        await action_router(router)

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