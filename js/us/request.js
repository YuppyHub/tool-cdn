function htmlMinified(data) {
    return request({
        url: 'http://localhost:10000/api/formatter/html',
        method: 'post',
        data: data
    })
}

function codeOperator (data) {
    return request({
        url: 'http://localhost:10000/api/formatter/code',
        method: 'post',
        data: data
    })
}

function j2t(json, language) {
    const data = JSON.stringify({ "json": json,"type": language })
    return request({
        url: 'http://localhost:10000/api/j2t',
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        data: data
    })
}

function checkImageURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function testImage(url, timeoutT) {
    return new Promise(function (resolve, reject) {
        let timeout = timeoutT || 5000;
        let timer, img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject("error");
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve("success");
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            reject("timeout");
        }, timeout);
        img.src = url;
    });
}

function jsformatter(data) {
    return request({
        url: 'http://localhost:10000/format/js',
        method: 'put',
        data: data
    })
}

function compress(data) {
    return request({
        url: 'http://localhost:10000/api/code/compress',
        method: 'post',
        data: data
    })
}

function removeBg(url, base64) {
    const data = { url: url, base64: base64 };
    return request({
        url: 'http://localhost:10000/api/image/rebg',
        method: 'post',
        data: data
    })
}

function imageRemoveBg(file) {
    const formData = new FormData();
    formData.append('file', file)
    return request.post('http://localhost:10000/api/image/rebg/upload',
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
}

 function downloadFile (content, filename) {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

// base64 start
function image2base64 (file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result )
        };
        fr.readAsDataURL(file);
    })
}

function toDataURL (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result)
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url)
    xhr.responseType = 'blob';
    xhr.send();
}

function imageBase64Handler(text) {
    if (text.length > 5000) {
        return `${text.substr(0, 5000)}...(由于消息过长，这里只显示部分内容)`
    }
    return text
}

function predictImageType(src) {
    if (src.length < 500) {
        return false
    }
    if (src.indexOf('data:image') === -1) {
        return `data:${typePredict(src) || 'image/jpeg'};base64,${src}`;
    }
    return src;
}

function typePredict(src) {
    switch(src.charAt(0)) {
        case '/':
            return 'image/jpeg';
        case 'i':
            return 'image/png';
        case 'R':
            return 'image/gif';
        case 'U':
            return 'image/webp';
        case 'Q':
            return 'image/bmp';
        default:
            return null;
    }
}

function downloadHandler(href, name) {
    const a = document.createElement('a')
    a.href = href
    a.download = href
    a.download = (undefined === name? '下载图片': name)
    a.click()
}

// base64 end

function requestData (language, operator, context) {
    return { "type": language, "operator": operator, "context": context }
}

function article() {
    return request({
        url: 'https://interface.meiriyiwen.com/article/random?dev=1',
        method: 'get'
    })
}