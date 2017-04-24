var $ = function() {
    var obj = {}
    return obj
}
$.bom = {
    openAtCenter: function(url, width, height) {
        var newWin = window.open(url,
            'newWinName',
            `width=${width},
            height=${height},
            screenX=${window.screen.width / 2 - width / 2},
            screenY=${window.screen.height / 2 - height / 2}`
        )
    },


    //$.bom.search('a',1).search('b',2)  //'?a=1&b=2'
    //如果有两个参数，即添加这个URI的查询字符串；可多次调用，每次传入不同的参数连接成查询字符串
    //name和value，如果只有一个参数，即是name，即得到这个 参数name的值；可多次调用，得到不同name的值
    //如果没有参数，即得到所有的查询字符串的name和value
    search: function(name, value) {
        if (location.search === '') { //如果没有查询字符串，直接就添加1
            console.log('走这一次')
            if (name === undefined && value === undefined) {
                alert('没有设置查询字符串')
            } else {
                location.search += `?${name}=${value}`
            }

        } else {
            var obj = {}

            function getValue() {
                var query = location.search
                if (query[0] === '?') {
                    query = query.slice(1)
                }
                query = query.split('&')
                query.forEach(function(ele) {
                    var newArr = ele.split('=')
                    obj[newArr[0]] = newArr[1]
                })
                return obj
            }
            obj = getValue()
            if (name !== undefined && value !== undefined) { //如果有查询字符串，就获取或者设置

                // var n = 0 本意是清除原来的查询字符串，但是既然原来查询字符串的存在，那么存在即合理，不应该清除
                // if(n===0){ 本意是第一次执行时，清除查询字符串，设置状态码，当n>0时，就不再清除。
                //     location.search = ''
                // }

                if (obj[encodeURIComponent(name)] === undefined) { //如果不存在这个name的值，就是添加
                    location.search += `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`
                } else { //  如果存在，就是重新设置这个name的值
                    obj[encodeURIComponent(name)] = encodeURIComponent(value)
                    newValue = '?'
                    for (key in obj) {
                        newValue += `${name}=${value}&`
                    }
                    location.search = newValue.slice(0, newValue.length - 1)
                }
            } else if (name !== undefined && value === undefined) { //只有一个参数，即获取该参数的值；注：如果只有一个参数，则只能是name
                return obj[encodeURIComponent(name)]
            } else {
                return obj
            }
        }
    }
}
