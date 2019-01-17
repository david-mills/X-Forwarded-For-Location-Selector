import iconLarge from '../img/icon-128.png'
import iconSmall from '../img/icon-34.png'
import storage from './storage'

function setBadge(region)
{
    if(region && region != "None") {
        chrome.browserAction.setIcon({path: iconLarge});
        chrome.browserAction.setTitle({title: 'Spoofing ' + region});
    } else {
        chrome.browserAction.setIcon({path: iconSmall});
        chrome.browserAction.setTitle({title: 'Currently not spoofing any region. Click to set region.'});
    }
}

function clearCookies(){
    var cookies = document.cookie;

    for (var i = 0; i < cookies.split(";").length; ++i)
    {
        var myCookie = cookies[i];
        var pos = myCookie.indexOf("=");
        var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}  

function runOptions(){
    storage.getOptions(options => {
        
        if(options){
            if(options.sessionChkbox){
                sessionStorage.clear();
            }
            if(options.localChkbox){
                localStorage.clear();
            }
            if(options.cookiesChkbox){
                clearCookies();
            }
        }
    });
}

let selectedIp = '';
storage.getSettings((data) =>{
    selectedIp = data.ip;
    setBadge(data.name);
})
    chrome.webRequest.onBeforeSendHeaders.addListener(
        (details) => {
            if (selectedIp)
            {
                let index = details.requestHeaders.findIndex((el) => {
                    return (el.name === 'X-Forwarded-For')
                });
                if(index > -1)
                {
                    details.requestHeaders[index].value = selectedIp;
                }
                else
                {
                    details.requestHeaders.push({
                        'name': 'X-Forwarded-For',
                        'value': selectedIp
                    });
                }
            }
            return {requestHeaders: details.requestHeaders};
        },
        {urls: ['<all_urls>']},
        ['blocking', 'requestHeaders']
    );

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (typeof changes['ip'] === 'object')
        {
            selectedIp = changes['ip'].newValue;
            const region = changes['name'].newValue;
            setBadge(region);
            runOptions();
        }
    });
