window.setCurl = function() {
  return new Curl();
};
function Curl() {
  this.xhl = null;
}

Curl.prototype.create = function() {
  if (window.XMLHttpRequest) {
    this.xhl = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    this.xhl = new ActiveXObject("Microsoft.XMLHTTP");
  }
};

Curl.prototype.params = function(data) {
  if (Object.prototype.toString.call(data) == "[object Object]") {
    var str = "";
    for (const key in data) {
      var val = data[key];
      str += "&" + key + "=" + val;
    }
    str = str.substr(1, str.length);
    return str;
  }
};

Curl.prototype.onready = function(cb) {
  this.xhl.onreadystatechange = function(a) {
    if (this.readyState == 4 && this.status == 200) {
      cb && cb(JSON.parse(this.response));
    }
  };
};

Curl.prototype.get = function(url, data, cb) {
  this.create();
  this.onready(cb);
  var send = url + "?" + this.params(data);
  this.xhl.open("GET", send, true);
  this.xhl.send();
};

window.setCache = function() {
  return new Cache();
};

function Cache() {
  this.curl = setCurl();
  this.CacheVersion = "123456789";
  this.hedge = 50000000;
  this.CacheList = [
    {
      id: "123",
      url: "box.js",
      type: "javascript"
    }
  ];
}

Cache.prototype.isUpdate = function() {
  // var newV = this.curl.get();
  return localStorage.getItem("CacheVersion") === CacheVersion;
};

Cache.prototype.isIE = function() {};

Cache.prototype.checkHedge = function() {
  var keyLen = localStorage.length;
  var allLen = 0;
  for (var i = 0; i < keyLen; i++) {
    var key = localStorage.key(i);
    var len = localStorage.getItem(key).length;
    allLen = allLen + len;
  }
  return allLen > this.hedge ? false : true;
};

Cache.prototype.start = function() {
    
};

Cache.prototype.save = function() {
    try {
        localStorage.setItem("CacheVersion",this.CacheVersion);
    } catch (error) {
        if(error.name == 'QuotaExceededError'){
            localStorage.clear();
            localStorage.setItem("CacheVersion",this.CacheVersion);
        };
    }

    for(var i;i<this.CacheList.length;i++){
        var el = this.CacheList[i];
        var id = el["di"];
        var url = el["url"];
        this.curl.get(url,null,function(data){
            try {
                localStorage.setItem(id,data);
            } catch (error) {
                if(error.name == 'QuotaExceededError'){
                    localStorage.clear();
                    localStorage.setItem(id,data);
                };
            }
        })
    }
};
