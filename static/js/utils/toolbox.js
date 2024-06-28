

 function amount_to_display(type, amount) {
     switch (type) {
         case 0 : case "ton":
             return Number((amount / Math.pow(10, 9)).toFixed(4)) + " TON"
             break;
         case 1 : case "solana":
             return Number((amount / Math.pow(10, 9)).toFixed(5)) + " SOL"
         case 2 : case "evm":
            return Number((amount / Math.pow(10, 1e18)).toFixed(6)) + ` BNB`
         default:
             return false;
             break;
     }
 }

 function isMobile() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}


function close_window_webapp()
{
    try{
        Telegram.WebApp.close();
    }catch(e)
    {}
    try{
        window.close();
    }catch(e)
    {}
}