/*
*拦截浏览器XMLHttpRequest
*参考Ajax-hook(https://github.com/wendux/Ajax-hook) 
*/


// intercept ajax
Ajax({
    onreadystatechange: function (xhr) {
        
    },
    onload: function (xhr) {
        
    },
    open: function (arg, xhr) {
        
    }, 
    onerror: function (xhr) {
        //An error has occurred here. You can report it
        console.log(xhr)
    },
})

// rewrite ajax 
function Ajax(proxy) {
    window.ahrealxhr = window.ahrealxhr || XMLHttpRequest;
    XMLHttpRequest = function () {
        this.xhr = new window.ahrealxhr;
        for (let attr in this.xhr) {
            let type = "";
            try {
                type = typeof this.xhr[attr]
            } catch (e) { }
            if ("function" === type) {
                this[attr] = hookFunction(attr);
            } else {
                Object.defineProperty(this, attr, {
                    get: getterFactory(attr),
                    set: setterFactory(attr)
                })
            }
        }
    }

    function getterFactory(attr) {
        return function () {
            let v = this.hasOwnProperty(attr + "_") ? this[attr + "_"] : this.xhr[attr];
            let attrGetterHook = (proxy[attr] || {})["getter"]
            return attrGetterHook && attrGetterHook(v, this) || v
        }
    }

    function setterFactory(attr) {
        return function (v) {
            let xhr = this.xhr;
            let that = this;
            let hook = proxy[attr];
            if (typeof hook === "function") {
                xhr[attr] = function () {
                    proxy[attr](that) || v.apply(xhr, arguments);
                }
            } else {
                let attrSetterHook = (hook || {})["setter"];
                v = attrSetterHook && attrSetterHook(v, that) || v
                try {
                    xhr[attr] = v;
                } catch (e) {
                    this[attr + "_"] = v;
                }
            }
        }
    }

    function hookFunction(fun) {
        return function () {
            var args = [].slice.call(arguments)
            if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
                return;
            }
            return this.xhr[fun].apply(this.xhr, args);
        }
    }
    return window.ahrealxhr;
}