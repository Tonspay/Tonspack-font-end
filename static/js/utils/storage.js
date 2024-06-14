/**
 * Storage util
 * 
 * Control cookies * local storage
 */

const router_storage = {
    authkey: "user_authkey",
    uid: "user_uid",
    user_data_tg: "user_data_telegram"
}

function storage_get_authkey() {
    var key = router_storage.authkey;
    if (key) {
        return key
    }
    return false;
}

function storage_set_authkey(key) {
    router_storage.authkey = key
}

function storage_get_uid() {
    var key = router_storage.uid
    if (key) {
        return key
    }
    return false;
}

function storage_set_uid(uid) {
    router_storage.uid=uid
}

function storage_get_user_tg_data() {
    var key = router_storage.user_data_tg
    if (key) {
        return key
    }
    return false;
}

function storage_set_user_tg_data(uid) {
    router_storage.user_data_tg = uid
}