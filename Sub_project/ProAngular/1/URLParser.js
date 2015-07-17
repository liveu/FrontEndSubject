URLParser = function() {
	this.LF = "\n";
	this.debugData = "";
	
	this.href = document.location.href;
	this.protocol = document.location.protocol;
	this.host = document.location.host;
	this.hostname = document.location.hostname;
	this.port = document.location.port;
	this.pathname = document.location.pathname;
	this.search = document.location.search;
	this.hash = document.location.hash;
	
	this.paramList = new Array();
	this.parseParams();
}

URLParser.prototype = {
	/**
	 * =====================================================
	 * Parse parameters
	 * =====================================================
	 */
	parseParams: function() {
		if(this.search=="" || 
			this.search=="?" || 
			this.search=="undefined" || 
			this.search==null || 
			this.search=="null")
				return;
		
		var item = null;
		var param = null;
		var tmp = this.search.substr(1);
		var tmpArr = tmp.split("&");
		if(tmpArr.length==0)
			return;
		
		for(var idx=0; idx<tmpArr.length; idx++) {
			item = tmpArr[idx].split("=");
			if(item.length!=2) {
				alert("Incorrect Parameter - " + item);
				continue;
			}
			
			param = new URLParameter(item[0], item[1]);
			this.paramList[this.paramList.length] = param;
		}
	},
	
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	getParamString: function() {
		var buf = "";
		if(this.paramList.length==0)
			return buf;
		
		buf = "?";
		for(var idx=0; idx<this.paramList.length; idx++) {
			buf += this.paramList[idx].getString();
		}
		return buf;
	},
	
	/**
	 * =====================================================
	 * return full url to string
	 * =====================================================
	 */
	getFullString: function() {
		var buf = "";
		buf += this.getProtocol() + "//";
		buf += this.getHost();
		buf += this.getPort()=="" || this.getPort()==80 ? "" : ":" + this.getPort();
		buf += this.getPathName();
		buf += this.getParamString();
		buf += this.getHash()=="" || this.getHash().length==0 ? "" : this.getHash();
		return buf;
	},
	
	/**
	 * =====================================================
	 * check parameter if existing
	 * =====================================================
	 */
	existParam: function(key) {
		var result = false;
		if(this.paramList.length==0)
			return result;
		
		for(var idx=0; idx<this.paramList.length; idx++) {
			var param = this.paramList[idx];
			if(param.getKey()==key) {
				result = true;
				break;
			}
		}
		return result;
	},
	
	/**
	 * =====================================================
	 * return parameter value
	 * =====================================================
	 */
	getParamValue: function(key) {
		if(!this.existParam(key))
			return "";
			
		var result = "";
		for(var idx=0; idx<this.paramList.length; idx++) {
			var param = this.paramList[idx];
			if(param.getKey()==key) {
				result = param.getValue();
				break;
			}
		}
		return result;
	},
	
	/**
	 * =====================================================
	 * get function
	 * =====================================================
	 */
	getHref: function() {
		return this.href;
	},
	getProtocol: function() {
		return this.protocol;
	},
	getHost: function() {
		return this.host;
	},
	getHostName: function() {
		return this.hostname;
	},
	getPort: function() {
		return this.port;
	},
	getPathName: function() {
		return this.pathname;
	},
	getSearch: function() {
		return this.search;
	},
	getHash: function() {
		return this.hash;
	},
	
	/**
	 * =====================================================
	 * set function
	 * =====================================================
	 */
	setHref: function(val) {
		this.href = val;
	},
	setProtocol: function(val) {
		this.protocol = val;
	},
	setHost: function(val) {
		this.host = val;
	},
	setHostName: function(val) {
		this.hostname = val;
	},
	setPort: function(val) {
		this.port = val;
	},
	setPathName: function(val) {
		this.pathname = val;
	},
	setSearch: function(val) {
		this.search = val;
	},
	setHash: function(val) {
		this.hash = val;
	},
	
	/**
	 * =====================================================
	 * debug information
	 * =====================================================
	 */
	debug: function() {
		this.debugData = "";
		this.debugData += "HREF : " + this.href + this.LF;
		this.debugData += "PROTOCOL : " + this.protocol + this.LF;
		this.debugData += "HOST : " + this.host + this.LF;
		this.debugData += "HOSTNAME : " + this.hostname + this.LF;
		this.debugData += "PORT : " + this.port + this.LF;
		this.debugData += "PATHNAME : " + this.pathname + this.LF;
		this.debugData += "SEARCH : " + this.search + this.LF;
		this.debugData += "HASH : " + this.hash + this.LF;
		return this.debugData;
	}
}

URLParameter = function(key, value) {
	this.key = key;
	this.value = value;
}

URLParameter.prototype = {
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	setKey: function(key) {
		this.key = key;
	},
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	getKey: function() {
		return this.key;
	},
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	setValue: function(val) {
		this.value = val;
	},
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	getValue: function() {
		return this.value;
	},
	/**
	 * =====================================================
	 * 
	 * =====================================================
	 */
	getString: function() {
		return this.key + "=" + this.value;
	}
}