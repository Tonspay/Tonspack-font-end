/**
 * Wallet logic :
 * 
 * - Url params analyze
 * - Support actions :
 *      - Connect wallet
 *      - Sign Data
 *      - Sign and send transaction
 */


async function init(router) {
    await authToken()
    if(router == "wallet")
        {
            await wallets_display()
        }

    if(router == "action")
        {
            await action_display()
        }
    hiddenLoadingMask()
    // wallet_page_init()
}
function hiddenLoadingMask()
{
    console.log("hidden the loading mask")
    document.getElementById('loading_mask').style.display='none'
}

async function authToken() {
    const initData = (await miniapp_init())
    if (initData) {
        //Open in telegram , new auth
        console.log("🚀 Login from telegram")
        const doauth = await api_connect({ initData: initData.initData });
        const token = doauth.token
        console.log("🚀 doauth : ",doauth)
        storage_set_authkey(token)
        storage_set_uid(
            doauth.data.id
        )
        storage_set_user_tg_data(JSON.stringify(doauth.data))
    }else{
        // window.alert("Go to tg ")
    }
}


// init()