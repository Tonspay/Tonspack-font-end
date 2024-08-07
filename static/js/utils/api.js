/**
 * Network request util
 * 
 * Using fetch async/await . 
 * 
 * Making fetch request router . 
 */

const request_baseurl = `${siteBaseUrl}api/`
const tonapi_baseurl = "https://tonapi.io/"
const tonsbrige_baseurl = `${siteBaseUrl}/bridge/`
const request_router = {
    ping: request_baseurl + "ping",
    debug: request_baseurl + "debug",
    auth: request_baseurl + "auth",
    action: request_baseurl + "action",
    preconnection: request_baseurl + "preconnect",
    preconnect: {
        phantom: request_baseurl + "preconnect/phantom",
        metamask: request_baseurl + "preconnect/metamask",
    },
    connect: request_baseurl + "connect",
    info: {
        connection: request_baseurl + "info/connection",
        invoices: request_baseurl + "info/invoices",
        invoice: request_baseurl + "info/invoice",
    },
    scan  :{
        tonapi :{
            balance  : tonapi_baseurl+"v2/blockchain/accounts/",
        },
        solscan : {
            balance  : "",
        },
        arbscan : {
            balance  : ""
        }
    },
    bridge : {
        quote: tonsbrige_baseurl+"quote",
        swap: tonsbrige_baseurl+"swap"
    }
}

async function requester(url, requestOptions) {
    try {
        return (await fetch(url, requestOptions)).json()
    } catch (e) {
        console.log("🐞 req error", e)
    }
    return false;
}

function request_method_get(headers) {
    var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: 'follow'
    };
    return requestOptions
}

function request_method_post(bodys, headers) {
    var requestOptions = {
        method: "POST",
        headers: headers,
        body: bodys,
        redirect: 'follow'
    };
    return requestOptions
}

function auth_header() {
    var myHeaders = new Headers();
    myHeaders.append("token", storage_get_authkey());
    return myHeaders;
}

function request_get_unauth() {
    return request_method_get({});
}

function request_get_auth() {
    return request_method_get(auth_header());
}

function request_post_unauth(data) {
    var h = new Headers();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}

function request_post_auth(data) {
    var h = auth_header();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}


async function api_ping() {
    return await requester(request_router.ping, request_get_auth())
}

async function api_debug(data) {
    return await requester(
        request_router.debug,
        request_post_unauth(data)
    )
}

//Get auth token
async function api_auth(data) {
    return await requester(
        request_router.auth,
        request_post_unauth(data)
    )
}

async function api_connect(data) {
    return await requester(
        request_router.connect,
        request_post_unauth(data)
    )
}

//Post connection method
async function api_action(data) {
    return await requester(
        request_router.action,
        request_post_auth(data)
    )
}

async function api_preconnect(actionId) {
    return await requester(
        request_router.preconnection+"/"+actionId,
        request_get_unauth()
    )
}

//Price fetch
async function api_balance_ton(data) {
    return await requester(
        request_router.scan.tonapi.balance+data,
        request_get_unauth()
    )
}

async function api_balance_sol(data) {
    const connection = new solanaWeb3.Connection('https://solana-mainnet.g.alchemy.com/v2/FBe0x24tZfDGyFcdLwBtD2IOtqsgf07d');
    return await connection.getBalance(new solanaWeb3.PublicKey(data));
}

async function api_balance_arb(data) {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://arbitrum.llamarpc.com'));
    return web3.eth.getBalance(data);
}

async function api_balance_evm(data,chain) {
    var web3;
    switch (chain){
        case "bsc":case56:
        web3 = new Web3(new Web3.providers.HttpProvider('https://binance.llamarpc.com'))
            break
        default : 
        web3 = new Web3(new Web3.providers.HttpProvider('https://arbitrum.llamarpc.com'));
        break;
    }
    return web3.eth.getBalance(data);
}