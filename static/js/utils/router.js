const siteBaseUrl = 'https://pack.tons.ink/'
const botBaseUrl = 'https://t.me/tonspaydev_bot'
const botWebappBaseUrl = `${botBaseUrl}/wallet`
const botWebappInvoiceBaseUrl = `${botBaseUrl}/invoice`
const botShareBaseUrl = `https://t.me/share/url?url=`

function router_to_index() {
    location.href = "./"
}

function router_to_webapp_index() {
    location.href = botWebappBaseUrl
}

function router_to_inner_any(url) {
    location.href = "./" + url
}

function router_to_outter_any(url) {
    location.href = url
}

function router_to_bot() {
    location.href = botBaseUrl
}

function router_to_share(path,message)
{
    location.href = encodeURI(`${botShareBaseUrl}${path}&text=${message}`)
}