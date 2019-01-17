export default {
    getOptions: (cb) => {
        chrome.storage.sync.get({
            sessionChkbox: false,
            localChkbox: false,
            cookiesChkbox: false
        }, cb);
    },
    getSettings: (cb) => {
        chrome.storage.sync.get({
            ip: '',
            name: ''
        }, cb);
    },
    setSettings: (ip, name, cb) => {
        chrome.storage.sync.set({
            ip: ip,
            name: name
        }, cb);
    },
    setOptions: (options, cb) => {
        chrome.storage.sync.set({
            sessionChkbox: options.sessionChkbox,
            localChkbox: options.localChkbox,
            cookiesChkbox: options.cookiesChkbox
        }, cb);
    }
}