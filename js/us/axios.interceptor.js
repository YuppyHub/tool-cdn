let encrypt = new JSEncrypt();
encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAto6wnmn/g2pqTOc4PEqTferESWkuAyPbRmVIU06KOK6l9BJRCy+Xk5OElESQ0MPReT+ofvGio9uhpfIiO9YgmlwE5QdHDVgjuXpoeWDIxtMX3daTPhSFoAHHbaid7xSBuXyJ87zlP5yRelB2ewKTOLNZ6PEJB4KpXqkUrPvDxUcWfNB2yCmg22ypoH2AeObGlk28FOKU94V/TEqx2zivy0v34yTHg5SIXUjpu+m4zsmGr+V49CkZ2TV4nbU83u+xf5v490PmmMS9UKPexBDIGVrj2N6Me0Ox1pOdghadA86RqvfwFuetC5bZPllI6Pve33V7pZT/s+e41Ao+dI4/aQIDAQAB');

let request = axios.create({
    // baseURL: 'https://api.example.com'
});

request.interceptors.request.use(function (config) {
    config.headers['auth'] = encrypt.encrypt(formatter(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    return config;
}, function (error) {
    return Promise.reject(error);
});

function formatter (time, format) {
    let t = new Date(time);
    let tf = function(i){return (i < 10 ? '0' : "") + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}