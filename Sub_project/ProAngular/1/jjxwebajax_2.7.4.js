jjxweb = function(hostip, port, currentTimeStamp) {

	// Modified version at 2011.04.11
	// Modified function jjajaxRequest() at 2010.11.09(Added parameter for avoid ajax cache)
	// Modified function HR_SQLTRANS at 2010.10.19(Added Merge option)

	// Modified by CWYOO at 2013.09.15
	//		The typing error found in HR_GETSESSVAR
	//		serssvalvalue ==> sessvarvalue
	//		Version changed : 2.7.2 ==> 2.7.3
	//		changed encodeBase64()
	//		Only return encoded data when input string is not null
	//
	// Modified by CWYOO at 2013.09.13
	//		Version changed : 2.7.0 ==> 2.7.1
	// Modified by CWYOO at 2013.09.11
	//		Version changed : 2.5.9 ==> 2.7.0
	// Modified by CWYOO at 2011.04.11
	// jjxwebajax.js version
	this.version = "2.7.4";

	// jjxwebservlet  version
	this.serverversion = "";

	// debug flag
	this.debug = false;

	// target host ip
	this.hostip = hostip;

	// server port
	this.port = port;

	// paremeter delimeter
	this.dlm = unescape("%1f");

	// Modified by CWYOO at 2011.08.04
	// since 2.5.9
	// changed delimiter %1d-->%1f
	// ----------------------------------------------
	// Added by CWYOO at 2011.04.11
	// since 2.5.8
	// result delimiter
	//this.rdlm = unescape("%1d");
	this.rdlm = unescape("%1f");

	// server full url
	this.url = "";

	// Added by CWYOO at 2010.09.17
	// Flag for encode data
	// since 2.5.5
	this.encode_base64 = false;

	// Modified by CWYOO at 2010.02.18
	//		Set current protocol from document.location
	// Modifed by CWYOO at 2009.07.07
	if(this.port !=null && this.port != "" && this.port != "80") {
		if(this.hostip.indexOf(":")==-1) {
			this.url = document.location.protocol + "//" + this.hostip + ":" + this.port + "/jjxweb/jjxwebservlet";
			// Added by CWYOO at 2010.03.15 for push
			this.url_send = document.location.protocol + "//" +  this.hostip + ":" + this.port + "/jjxweb/chat";
			this.url_poll = document.location.protocol + "//" + this.hostip + ":" + this.port + "/jjxweb/broadcaster";
		} else {
			this.url = document.location.protocol + "//"  + this.hostip + "/jjxweb/jjxwebservlet";
			// Added by CWYOO at 2010.03.15 for push
			this.url_send = document.location.protocol + "//"  + this.hostip + "/jjxweb/chat";
			this.url_poll = document.location.protocol + "//"  +  this.hostip + "/jjxweb/broadcaster";
		}
	} else {
		this.url = document.location.protocol + "//"  + this.hostip + "/jjxweb/jjxwebservlet";
		// Added by CWYOO at 2010.03.15 for push
		this.url_send = document.location.protocol + "//"  + this.hostip + "/jjxweb/chat";
		this.url_poll = document.location.protocol + "//"  + this.hostip + "/jjxweb/broadcaster";
	}

	// Added by CWYOO at 2008.05.09
	this.rcvtext = "";

	// Added by JHS at 2014.06.13
	this.rcvtextJSON = null;

	// Added by CWYOO at 2008.06.18
	this.licenseMsg = "License is expired. Please contact site administrator";

	// Added by CWYOO at 2008.05.19 for HR_PROXY
	this.httpStatusCode = "";
	this.httpStatusText = "";

	this.tmpresult = null; // array of two dimension
	this.fetchresult = [null,null,null,null,null,null,null,null,null,null]; // array of three dimension
	this.fetchrcnt = [0,0,0,0,0,0,0,0,0,0];
	this.fetchidx = [0,0,0,0,0,0,0,0,0,0];
	this.arrsize = [0,0,0,0,0,0,0,0,0,0];

	this.errcode = null;
	this.errmsg = null;
	this.result = null; //array of one dimension SQLEXECUTE or EXECPGM, GETCLOB
	this.results = null; //array of two dimension SELECTINTO
	this.resultone = [null,null,null,null,null,null,null,null,null,null]; // array of two dimension,FETCH
	this.cursor = -1;
	this.rcnt = 0;
	this.sessvarvalue = null;
	this.sessionid = null;
	this.remote_addr = "";

	// Added by CWYOO at 2011.04.11
	this.server_addr = "";
	// Added by JHS at 2014.06.19
	this.req = null;
}
jjxweb.prototype = {
	/**
	 * retrieve jjxwebajax.js version
	 */
	HR_VERSION: function() {
		return this.version;
	},

	/**
	 * retrieve server version
	 */
	HR_SERVERVERSION: function() {
		var parm = "v" + this.dlm;
		var parms = "kind=2&data=" + encodeBase64(parm);
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.serverversion = this.errmsg;
		else this.serverversion = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * retrieve client ip address
	 */
	HR_REMOTEADDR: function() {
		var parm = "z" + this.dlm;
		var parms = "kind=2&data=" + encodeBase64(parm);
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.remote_addr = this.errmsg;
		else this.remote_addr = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Modified by CWYOO at 2011.04.11
	 * 		Added host ip address as result
	 *
	 * Modified by CWYOO at 2010.03.26
	 * Added parameter pool, userid, password
	 * create user session
	 * @param forced: true:create, false:don't create
	 * @param pool: db pool name
	 * @param userid user id
	 * @param password: user password
	 * @return result 0: success
	 */
	HR_SESSIONOPEN: function(forced, pool, userid, password, authClass) {
		// Added by CWYOO at 2011.04.11
		if(pool=="undefined") pool = "";
		if(userid=="undefined") userid = "";
		if(password=="undefined") password = "";
		if(authClass=="undefined") authClass = "";

		this.errcode = null;
		this.errmsg = null;
		this.sessionid = null;
		this.sessvarvalue = null;
		// Added by CWYOO at 2011.04.11
		this.server_addr = null;

		if (forced==false) var parm = "a" + this.dlm + "false";
		else  var parm = "a" + this.dlm + "true";
		// Added by CWYOO at 2010.03.26
		parm += this.dlm + pool + this.dlm + userid + this.dlm + password + this.dlm + authClass;

		var parms = "kind=0&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);

		// Modified by CWYOO at 2011.04.11
		// parse host ip address
		// Modified by CWYOO at 2010.04.12
		// Changed HR_SESSIONOPEN spec
		//if (this.errcode=='0000000') this.sessionid = this.errmsg;
		//if (this.errcode=='0000000' || this.errcode=='0000001') this.sessionid = this.errmsg;
		if (this.errcode=='0000000' || this.errcode=='0000001') {
			var tmp = this.errmsg.split(this.rdlm);
			if(tmp==null || tmp.length<2) {
				//alert("Not valid result format : " + this.errmsg);
				this.sessionid = this.errmsg;
			} else {
				this.sessionid = tmp[0];
				this.server_addr = tmp[1];
			}
			//this.sessionid = this.errmsg;
		} else {
			this.sessionid = null;
			this.server_addr = null;
		}

		if (this.errcode=="0000000") return 0;
		// Added by CWYOO at 2010.04.12
		else if (this.errcode=="0000001") return 1;
		else return -1;
	},

	/**
	 * close user session
	 * @return result 0:success
	 */
	HR_SESSIONCLOSE: function() {
		this.errcode = null; this.errmsg = null;
		var parm = "b" + this.dlm;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Modified by CWYOO at 2011.04.11
	 * 		Added host ip address as result
	 *
	 * set session variable
	 * @param sessvarname: session variable name
	 * @param sessvarvalue: session variable value
	 * @return result 0:success
	 */
	HR_PUTSESSVAR: function(sessvarname,sessvarvalue) {
		this.errcode = null;
		this.errmsg = null;
		// Added by CWYOO at 2011.04.11
		this.server_addr = null;

		var parm = "c" + this.dlm + sessvarname + this.dlm + sessvarvalue;
		//var parms = "kind=0&data=" + window.encodeURIComponent(encodeBase64(parm));
		var parms = "kind=0&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") {
			this.server_addr = this.errmsg;
			this.errmsg = "";
		} else {
			this.server_addr = null;
		}

		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Modified by CWYOO at 2011.04.11
	 * 		Added host ip address as result
	 *
	 * retrieve session variable
	 * @param sessvarname: session variable name
	 * @return result 0:success
	 */
	HR_GETSESSVAR: function(sessvarname) {
		this.errcode = null;
		this.errmsg = null;
		this.sessvarvalue = null;
		// Added by CWYOO at 2011.04.11
		this.server_addr = null;

		var parm = "d" + this.dlm + sessvarname;
		var parms = "kind=0&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		//alert("HR_SESSIONOPEN : " + this.errcode + "/" + this.errmsg);

		if (this.errcode=='0000000') {
			//this.sessvarvalue = this.errmsg;
			var tmp = this.errmsg.split(this.rdlm);
			//alert("SPLIT : " + tmp.toString());

			if(tmp==null || tmp.length<2) {
				//alert("Not valid result format : " + this.errmsg);
				this.sessvarvalue = this.errmsg;
			} else {
				this.sessvarvalue = tmp[0];
				this.server_addr = tmp[1];
			}
		} else {
			this.sessvarvalue = null;
			this.server_addr = null;
		}
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * execute command on target server
	 * @param command: command for execute
	 * @return result 0:success
	 */
	HR_EXECPGM: function(command) {
		this.errcode = null; this.errmsg = null; this.result = null;
		var parm = "t" + this.dlm + command;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * execute shell command on target server
	 * @param command: shell command
	 * @return result 0:success
	 */
	HR_SHELL: function(command) {
		this.errcode = null; this.errmsg = null; this.result = null;
		var parm = "u" + this.dlm + command;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Added by CWYOO at 2010.03.23
	 */
	HR_SELECT: function(dbname, sqlstring, sqlparamarray, usesqlid, useXml) {
		return this.HR_SELECTINTO(dbname, sqlstring, sqlparamarray, usesqlid, useXml);
	},

	/**
	 * Modified by CWYOO at 2013.09.13
	 *		removed decode sqlparamarray using base64
	 *
	 * Modified by CWYOO at 2013.09.11
	 *		Decode sqlparamarray using base64
	 *
	 * retrieve from dbms
	 * Modified by CWYOO at 2008.12.09
	 *	Added useXml parameter
	 *	0 : retrieve data by TEXT format
	 *	1 : retrieve data by JSON format
	 * @param dbname: pool
	 * @param sqlstring: SQLID / SQL
	 * @param sqlparamarray: parameter list
	 * @param usesqlid: flag for use SQLID
	 * @return result 0:success
	 */
	HR_SELECTINTO: function(dbname, sqlstring, sqlparamarray, usesqlid, useXml) {
		if(useXml==null || useXml.split(" ").join("")=="")
			useXml = "1";

		//alert("useXml : " + useXml);

		this.rcnt = 0; this.result = null; this.results = null; this.errcode = null; this.errmsg = null;
		for (i=0,sqlparamarray_str="";i<sqlparamarray.length;i++) {
			sqlparamarray_str += sqlparamarray[i];

			if(i<sqlparamarray.length-1)
				sqlparamarray_str += unescape("%1d");
		}
		var parm = "";
		if (usesqlid==false) parm = "e";
		else parm = "n";
		parm += this.dlm + dbname + this.dlm + sqlstring + this.dlm + sqlparamarray_str + this.dlm + (useXml=="1" ? useXml : "0");
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, useXml=="1" ? true : false);

		// Modified by CWYOO at 2008.06.18 for check license error(License Error Code : 7000900)
		// Modified by CWYOO at 2008.07.11 for ignore no record
		/*
		if (this.rcnt<1) {
			if(this.errcode=="3000200") {
				this.errcode = "0000000";
				this.errmsg = "";
			}
		}
		*/

		if(useXml=="1") {
			if (this.errcode=="0000000") {
				this.result = this.tmpresult[0];
				this.results = this.tmpresult;
				return 0;
			} else return -1;
		} else {
			if (this.errcode=="0000000") {
				this.rcnt = parseInt(this.rcvtext.substr(7,6));
				//this.errmsg = this.rcvtext.substr(13);
			} else {
				this.errmsg = this.rcvtext.substr(7, this.rcvtext.length-1);
			}

			if (this.errcode=="0000000")
				return 0;
			else
				return -1;
		}
	},

	/**
	 * Execute transaction job
	 * @see HR_SQLTRANS()
	 * @param dbname: pool
	 * @param sqlstring: SQLID /  SQL
	 * @param sqlparamarray: parameter list
	 * @param usesqlid: flag for use SQLID
	 * @param autocommit: true: auto commit, false: manual commit
	 * @return result 0:success
	 */
	HR_SQLEXECUTE: function(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit) { /*---mod 2007.05.13----*/
		return HR_SQLTRANS(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit);
	},

	/**
	 * Modified by CWYOO at 2013.09.11
	 *		Decode sqlparamarray using base64
	 *
	 * Execute transaction job
	 * @param dbname: pool
	 * @param sqlstring: SQLID /  SQL
	 * @param sqlparamarray: parameter list
	 * @param usesqlid: flag for use SQLID
	 * @param arrsize: record count for transaction(deprecated)
	 * @param usexml: result format(0: TEXT, 1: JSON)
	 * @param autocommit: true: auto commit, false: manual commit
	 * @return result 0:success
	 */
	HR_SQLTRANS: function(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit) { /*---mod 2007.05.13----*/
		var trans_wait = "0";
		var _usexml = "1";
		this.rcnt = 0; this.errcode = null; this.errmsg = null;
		var sqlparamarray_str = "";
		var multiRow = false;
		var firstRow;
		if(sqlparamarray==null ||
			sqlparamarray==undefined ||
			sqlparamarray=="undefined" ||
			sqlparamarray.length==0) {
				multiRow = false;
		} else if(sqlparamarray.length>0) {
			firstRow = sqlparamarray[0];
			if(firstRow instanceof Array) {
				multiRow = true;
			}
		}

		if(multiRow==true) {
			for(var idx=0; idx<sqlparamarray.length; idx++) {
				var tmpRow = sqlparamarray[idx];
				for (i=0; i<tmpRow.length; i++) {
					sqlparamarray_str += tmpRow[i];

					//if(i<tmpRow.length-1)
						sqlparamarray_str += unescape("%1d");
				}
				sqlparamarray_str += unescape("%1e");
			}
		} else {
			for (var i=0,sqlparamarray_str="";i<sqlparamarray.length;i++) {
				sqlparamarray_str += sqlparamarray[i];

				//if(i<sqlparamarray.length-1)
					sqlparamarray_str += unescape("%1d");
			}
		}

		if (usesqlid==false) var parm = "g";
		else var parm = "p";

		if (autocommit==1) trans_wait="0";
		else trans_wait = "1";

		//parm += this.dlm + dbname + this.dlm + sqlstring + this.dlm + trans_wait + this.dlm + sqlparamarray_str + this.dlm + "0";
		parm += this.dlm + dbname + this.dlm + sqlstring + this.dlm + arrsize + this.dlm + sqlparamarray_str + this.dlm;
		//var parms = "kind=0&data=" + window.encodeURIComponent(parm);
		var parms = "kind=2&data=";

		/*----2007.05.10----*/
		var tmpsql = sqlstring.substr(0,4).toUpperCase();
		/* Commented by CWYOO at 2009.07.15
		if (tmpsql == "CALL") {
			//alert("call");
			// useXml
			parm += "0" + this.dlm;
			parms += window.encodeURIComponent(parm);
			this.jjajaxRequest(this.url, parms, false);
		} else {
			// useXml
			parm += "1" + this.dlm;
			//parm += trans_wait;
			parms += window.encodeURIComponent(parm);
			this.jjajaxRequest(this.url, parms, true);
		}
		*/
		parm += "0" + this.dlm; //useXML
		parm += trans_wait + this.dlm; // autocimmit
		parms += window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);

		if (this.errcode=='0000000') {
			// Modified by CWYOO at 2010.10.19
			// Added MERGE
			//if ((tmpsql=="DELE") || (tmpsql=="INSE") ||(tmpsql=="UPDA"))
			if ((tmpsql=="DELE") || (tmpsql=="INSE") ||(tmpsql=="UPDA") || (tmpsql=="MERG"))
				this.rcnt = parseInt(this.errmsg);
			// Modified by CWYOO at 2008.12.09
			// this row replaced for fix bug...
			//else if (tmpsql == "CALL") this.result = this.tmpresult[0];
			else if (tmpsql == "CALL") this.result = this.errmsg;
		}
		else this.rcnt = 0;

		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Commit transaction job
	 * @param dbname: pool
	 * @return result 0: success
	 */
	HR_COMMIT: function(dbname) {
		this.errcode = null; this.errmsg = null;
		var parm = "j" + this.dlm + dbname;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Rollback transaction job
	 * @param dbname: pool
	 * @return result 0:success
	 */
	HR_ROLLBACK: function(dbname) {
		this.errcode = null; this.errmsg = null;
		var parm = "k"  + this.dlm + dbname;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Retrieve Oracle BLOB column data
	 * @param dbname: pool
	 * @param table: table name
	 * @param column: BLOB column name
	 * @param rsftfile: return url
	 * @param condition: sql where statement for retrieve BLOB column
	 * @return result 0:success
	 */
	HR_LOBREAD: function(dbname,table,column,rsltfile,condition) {
		this.errcode = null; this.errmsg = null;
		var parm = "l" + this.dlm + dbname + this.dlm + table + this.dlm + column + this.dlm + "READ" + this.dlm + condition + this.dlm + rsltfile;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Save data to Oracle BLOB column
	 * @param dbname: pool
	 * @param table: table name
	 * @param column: BLOB column name
	 * @param fromstr: filename on server for save to BLOB column
	 * @param condition: sql where statement for BLOB column
	 * @return result 0:success
	 */
	HR_LOBWRITE: function(dbname, table,column,fromfile,condition) {
		this.errcode = null; this.errmsg = null;
		var parm = "m" + this.dlm + dbname + this.dlm + table + this.dlm + column + this.dlm + "WRITE" + this.dlm + condition + this.dlm + fromfile;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Retrieve Oracle CLOB column data
	 * @param dbname: pool
	 * @param table: table name
	 * @param column: CLOB column name
	 * @param condition: sql where statement for CLOB
	 * @return result 0:success
	 */
	HR_GETCLOB: function(dbname, table, column, condition) {
		this.errcode = null; this.errmsg = null;
		var parm = "l" + this.dlm + dbname + this.dlm + table + this.dlm + column + this.dlm + "CLOBREAD" + this.dlm + condition + this.dlm + "DUMMY";
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Save data to Oracle CLOB column
	 * @param dbname: pool
	 * @param table: table name
	 * @param column: CLOB clumn name
	 * @param fromstr: filename on server for save to CLOB column
	 * @param condition: sql where statement for CLOB column
	 * @return result 0:success
	 */
	HR_PUTCLOB: function(dbname, table, column, fromstr, condition) {
		this.errcode = null; this.errmsg = null;
		var parm = "m" + this.dlm + dbname + this.dlm + table + this.dlm + column + this.dlm + "CLOBWRITE" + this.dlm + condition + this.dlm + fromstr;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Call web report
	 * @param modulename: name of web report
	 * @param sendstr: parameter
	 * @return result 0:success
	 */
	HR_WEBREPORT: function(modulename, sendstr) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var parm = "J" + this.dlm + modulename + this.dlm + sendstr;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Added by CWYOO at 2010.03.09
	 * Call web report
	 * @param modulename: name of web report
	 * @param sendstr: parameter
	 * @return result 0:success
	 */
	HR_WEBREPORT_SCK: function(modulename, sendstr) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var parm = "q" + this.dlm + modulename + this.dlm + sendstr;
		var parms = "kind=0&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Save text file
	 * @param filenm file name
	 * @param contents contents
	 * @return result 0:success
	 */
	HR_WRITEF: function(filenm, contents) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var parm = "W" + this.dlm + filenm + this.dlm + contents;
		//var parms = "kind=0&data=" + window.encodeURIComponent(parm);
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Read file from server
	 * @param filenm file name
	 * @return result 0:success
	 */
	HR_READF: function(filenm) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var parm = "R" + this.dlm + filenm;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * Retrieve last modified data and file size specified file
	 * @param filenm file name
	 * @return result 0:success
	 */
	HR_RHDRINFO: function(filenm) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var parm = "r" + this.dlm + filenm;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * call external web page and receive result
	 * @param method GET, POST
	 * @parma uri URI to execute
	 * @param paramList paramters
	 * @return result 0: success
	 */
	HR_PROXY: function(method, uri , paramList) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var paramstr = "";
		for(var idx=0; idx<paramList.length; idx++) {
			paramstr += paramList[idx];
			if(idx<paramList.length-1)
				paramstr += unescape("%1d");
		}
		var parm = "x" + this.dlm + method + this.dlm + uri + this.dlm + paramstr;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * call internal web page and receive result
	 * @parma uri URI to connect
	 * @param paramList parameters
	 * @return result 0:success
	 */
	HR_CALLJSP: function(uri , paramList) {
		this.result = null; this.errcode = null; this.errmsg = null;
		var paramstr = "";
		for(var idx=0; idx<paramList.length; idx++) {
			paramstr += paramList[idx];
			if(idx<paramList.length-1)
				paramstr += "&";
		}
		var parm = "X" + this.dlm + uri + this.dlm + paramstr;
		var parms = "kind=2&data=" + window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);
		if(this.httpStatusCode!=200) return -1;
		else {
			if(this.errcode=="7000900") {
				this.errmsg = licenseMsg;
				return -1;
			} else {
				return 0;
			}
		}
	},

	// Added by CWYOO at 2010.03.15 for push
	HR_SENDMESSAGE: function( sendstr) {
		var params = "text=" + window.encodeURIComponent(encodeBase64(sendstr));
		this.jjajaxRequest(this.url_send, params, false);
		if (this.errcode=='0000000') this.result = this.errmsg;
		else this.result = null;
		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * call internal spring controller and receive result 2014.06.19 added
	 * @param uri : controller mapping
	 * @param param : Object, Object Array
	 * @param useRequestbody : 1:requestbody, 0:requestparam,modelAttribute
	 * @return result 0:success
	 */

	HR_SQLSELECT: function(dbname, sqlstring, paramObject, fieldArray, usesqlid) {
		var i,j, t_pos,s_pos;
		var iChars = "()|\';,\"";
		var tmpstr;
		var sqlparamarray = [];

		var paramNameArray = Object.keys(paramObject);
		var paramValueArray = [];

		for(var key in paramObject) {
				paramValueArray.push([paramObject[key]]);
		}

		tmpstr=sqlstring;
		if (tmpstr.indexOf("::")>=0) {
			ajaxobj.errcode = "7000310";
			ajaxobj.errmsg = "Parameter :: in SQL not allowed. Use HR_SELECTINTO, instead";
			return -1;
		}
		for (j=0;;j++) {
			t_pos = tmpstr.indexOf(":");
			if (t_pos > 0) {
				tmpstr = tmpstr.substring(t_pos+1);
				///////////////////////////////////////
				s_pos = -1;
				for (var i = 0; i < tmpstr.length; i++) {
					if (iChars.indexOf(tmpstr.charAt(i)) != -1) {
						s_pos = i;
						break;
					}
				}
				/////////////////////////////////
				if (s_pos>0) {
					tmpparam = tmpstr.substring(0, s_pos);
					tmpstr = tmpstr.substring(s_pos+1);
				} else {
					tmpparam = tmpstr;
				}
				for (i=0,found=0;i<paramNameArray.length;i++) {
					if (tmpparam == paramNameArray[i]) {
						found = 1;
						sqlparamarray[j] = paramValueArray[i];
						break;
					}
				}
				if (found == 0) {
					ajaxobj.errcode = "7000307";
					ajaxobj.errmsg = "Parameter in SQL not found in parameter name array";
					return -1;
				}

			} else {
				break;
			}
		}

		if (0> ajaxobj.HR_SELECTINTO(dbname, sqlstring, sqlparamarray, usesqlid)) return -1;
		for (i=0;i<ajaxobj.rcnt;i++)
		{
			for (j=0;j<fieldArray.length;j++) {

				fieldArray[j][i] = ajaxobj.results[i][j];
			}
		}
		return 0;
	},

	/**
	 * call internal spring controller and receive result 2014.06.19 added
	 * @param dbname : string
	 * @param sqlstring : string
	 * @param sqlparam : Object or Array Object
	 * @param usesqlid : boolean
	 * @param arrsize : int
	 * @param autocommit : boolean
	 * @return result 0:success
	 */
	HR_SQLEXEC: function(dbname, sqlstring, sqlparam, usesqlid, arrsize, autocommit) { /*---mod 2014.06.23---sqlparam:Object Array or Object, -*/
		var trans_wait = "0";
		this.rcnt = 0; this.errcode = null; this.errmsg = null;
		var sqlparamarray_str = "";
		var keyArr = new Array();
		var t_pos = -1;
		var s_pos = -1;
		var iChars = "()|\';,\"";

		////// get firldname array from sqlstring
		tmpstr=sqlstring;
		if (tmpstr.indexOf("::")>=0) {
			ajaxobj.errcode = "7000310";
			ajaxobj.errmsg = "Parameter :: in SQL not allowed. Use HR_SQLEXECUTE, instead";
			return -1;
		}
		for (var j=0;;j++) {
			t_pos = tmpstr.indexOf(":");
			if (t_pos >= 0) {
				tmpstr = tmpstr.substring(t_pos+1);
				///////////////////////////////////////
				s_pos = -1;
				for (var i = 0; i < tmpstr.length; i++) {
					if (iChars.indexOf(tmpstr.charAt(i)) != -1) {
						s_pos = i;
						break;
					}
				}
				/////////////////////////////////
				if (s_pos>0) {
					tmpparam = tmpstr.substring(0, s_pos);
					tmpstr = tmpstr.substring(s_pos+1);
				} else {
					tmpparam = tmpstr;
				}

				keyArr[j]=tmpparam;
			} else {
				break;
			}
		}

		if (sqlparam.length == null) {	// sqlparam:object
			for (j=0; j<keyArr.length; j++) {
				for (var prop in sqlparam) {
					if (keyArr[j]==prop) {
						found=1;
						sqlparamarray_str += sqlparam[prop];
						sqlparamarray_str += unescape("%1d");
						break;
					}

				}
				if (found == 0) {
					ajaxobj.errcode = "7000307";
					ajaxobj.errmsg = "Parameter in SQL not found in parameter name array";
					return -1;
				}

			}
		} else { //sqlparam:Array of object, multirow = true
			for(var obj in sqlparam){
				if (sqlparamarray_str.length > 0) sqlparamarray_str += unescape("%1e");

				for (j=0; j<keyArr.length; j++) {
					for (var prop in sqlparam[obj]) {
						if (keyArr[j]==prop) {
							found=1;
							sqlparamarray_str += sqlparam[obj][prop];
							sqlparamarray_str += unescape("%1d");
							break;
						}

					}
					if (found == 0) {
						ajaxobj.errcode = "7000307";
						ajaxobj.errmsg = "Parameter in SQL not found in parameter name array";
						return -1;
					}

				}
			}
		}
		if (usesqlid==false) var parm = "g";
		else var parm = "p";

		if (autocommit==true) trans_wait="0";
		else trans_wait = "1";

		parm += this.dlm + dbname + this.dlm + sqlstring + this.dlm + arrsize + this.dlm + sqlparamarray_str + this.dlm;
		var parms = "kind=2&data=";

		var tmpsql = sqlstring.substr(0,4).toUpperCase();
		parm += "0" + this.dlm; // useXML = 0
		parm += trans_wait + this.dlm; // autocommit
		parms += window.encodeURIComponent(encodeBase64(parm));
		this.jjajaxRequest(this.url, parms, false);

		if (this.errcode=='0000000') {
			if ((tmpsql=="DELE") || (tmpsql=="INSE") ||(tmpsql=="UPDA") || (tmpsql=="MERG"))
				this.rcnt = parseInt(this.errmsg);
			else if (tmpsql == "CALL") this.result = this.errmsg;
		}
		else this.rcnt = 0;

		if (this.errcode=="0000000") return 0;
		else return -1;
	},

	/**
	 * call internal spring controller and receive result 2014.06.19 added
	 * @param uri : controller mapping
	 * @param param : Object, Object Array
	 * @param useRequestbody : 1:requestbody, 0:requestparam,modelAttribute
	 * @return result 0:success
	 */

	HR_CALLSPRING: function(uri , param, useRequestbody) {//String, Object Array or Object, boolean
		if(useRequestbody==null) useRequestbody = true;

		this.rcnt = 0; this.result = null; this.results = null; this.errcode = null; this.errmsg = null;
		var paramstr = "";

		if (useRequestbody== true) {
			paramstr = JSON.stringify(param);
		} else {
			var paramtxt = "";
			if (param.length != null) {
				for(var obj in param){
					if(param.hasOwnProperty(obj)){
						for(var prop in param[obj]){
							if(param[obj].hasOwnProperty(prop)){
								if (paramtxt.length>0) paramtxt += '&';
								paramtxt += prop + '=' + param[obj][prop];
							}
						}
					}
				}
			} else {
				for(var prop in param){
					if(param.hasOwnProperty(prop)){
						if (paramtxt.length>0) paramtxt += '&';
						paramtxt += prop + "=" + param[prop];
					}
				}
			}
			paramstr = encodeURI(paramtxt);
		}
		this.req = this.jjgetXMLHttpRequest();
		this.req.open("POST", uri, false);
		if (useRequestbody==true) this.req.setRequestHeader("Content-Type", "application/json");
		else	this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.req.send(paramstr);

		if (this.req.readyState == 4) {
			this.httpStatusCode = this.req.status;

			if (this.req.status == 200) {
				if(this.debug)
					alert(this.req.responseText);

				this.rcvtext = this.req.responseText;
				this.rcvtextJSON = JSON.parse(this.req.responseText);
				this.errcode = "0000000";
				this.errmsg = "";


			} else {
				this.errcode = "7000" + this.req.status;
				this.errmsg = this.req.statusText;

				if(this.debug)
					alert("errcode : " + this.errcode + " / errmsg : " + this.errmsg);
			}
		}


		if(this.httpStatusCode!=200) return -1;
		else return 0;

	},

	/**
	 * call internal spring controller and receive result 2014.06.19 added
	 * @param uri : controller mapping
	 * @param param : Object, Object Array
	 * @param useRequestbody : 1:requestbody, 0:requestparam,modelAttribute
	 * @param callbackfunc : function
	 * @return result 0:success
	 */

	HR_CALLSPRINGASYNC: function(uri , param, useRequestbody, callbackfunc) {
		if(useRequestbody==null) useRequestbody = true;
		this.rcnt = 0; this.result = null; this.results = null; this.errcode = null; this.errmsg = null;
		var paramstr = "";

		if (useRequestbody== true) {
			paramstr = JSON.stringify(param);
		} else {
			var paramtxt = "";
			if (param.length != null) {
				for(var obj in param){
					if(param.hasOwnProperty(obj)){
						for(var prop in param[obj]){
							if(param[obj].hasOwnProperty(prop)){
								if (paramtxt.length>0) paramtxt += '&';
								paramtxt += prop + '=' + param[obj][prop];
							}
						}
					}
				}
			} else {
				for(var prop in param){
					if(param.hasOwnProperty(prop)){
						if (paramtxt.length>0) paramtxt += '&';
						paramtxt += prop + "=" + param[prop];
					}
				}
			}
			paramstr = encodeURI(paramtxt);
		}

		this.req = this.jjgetXMLHttpRequest();

		this.req .onreadystatechange = (function(xhttp,ufunc) {
			return function() {
				if (xhttp.readyState == 4) {
					if (xhttp.status == 200) {
						if(ajaxobj.debug) alert( "xhttp.responseText=" + xhttp.responseText);
						ajaxobj.rcvtext = xhttp.responseText;
						ajaxobj.rcvtextJSON = JSON.parse(xhttp.responseText);
						ajaxobj.errcode = "0000000";
						ajaxobj.errmsg = "";
					} else {
						ajaxobj.errcode = "7000" + xhttp.status;
						ajaxobj.errmsg = xhttp.statusText;
						if(ajaxobj.debug) alert("errcode : " + ajaxobj.errcode + " / errmsg : " + ajaxobj.errmsg);
					}
					ufunc();
				}
			}
		})(this.req, callbackfunc );

		this.req.open("POST", uri, true);
		if (useRequestbody==true) this.req.setRequestHeader("Content-Type", "application/json");
		else	this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.req.send(paramstr);
	},

	/**
	 * Create HTTP Object
	 * @return XMLHttpRequest
	 */
	jjgetXMLHttpRequest: function() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) { return null; }
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else return null;
	},

	/**
	 * Send data to server
	 * @param url: URL
	 * @param param: parameters
	 * @param xml: result data format true:JSON, false:TEXT
	 */
	jjajaxRequest: function(url, param, xml) {
		if(this.debug)
			alert("jjajaxRequest:" + url + "/" + param + "/" + xml);

		// Added by CWYOO at 2010.11.09
		this.req = null;
		this.req = this.jjgetXMLHttpRequest();
		this.errcode = "";
		this.req.open("POST", url + "?curdate=" + Math.floor(Math.random()*99999), false);
		this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var request = this;
		this.req.send(param);
		if (xml)
			this.jjgetResultxml(this.req);
		else
			this.jjgetResult(this.req);
	},



	/**
	 * Modified by CWYOO at 2009.04.03
	 * Convert received data to JSON
	 * @param req: XMLHttpRequest
	 */
	jjgetResultxml: function(req) {
		if (req.readyState == 4) {
			this.httpStatusCode = req.status;

			if(this.debug)
				alert("HTTPStatusCode : " + this.httpStatusCode);

			if (req.status == 200) {
				if(this.debug)
					alert("ResponseText : " + req.responseText);

				this.rcvtext = req.responseText.replace(/&quot;/g, "\\\"");
				// Added by CWYOO at 2010.11.08
				// Replace New Line Character
				this.rcvtext = this.rcvtext.replace(/\r/g, "").replace(/\n/g, "\\\n");
				//alert(this.rcvtext);

				var docJSON = eval("(" + this.rcvtext + ")");
				this.errcode = docJSON.errcode;
				this.errmsg = docJSON.errmsg;
				this.rcnt = docJSON.rcnt;
				this.tmpresult = docJSON.data;

				if(this.errcode=="7000900")
					this.errmsg = this.licenseMsg;

				if(this.debug)
					alert("JSON : " + docJSON);
			} else {
				this.errcode = "7000" + req.status;
				this.errmsg = req.statusText;

				if(this.debug)
					alert("errcode : " + this.errcode + " / errmsg : " + this.errmsg);
			}
		}
	},

	/**
	 * Convert received data to TEXT
	 * @param req: XMLHttpRequest
	 */
	jjgetResult: function(req) {
		if (req.readyState == 4) {
			this.httpStatusCode = req.status;

			if (req.status == 200) {
				if(this.debug)
					alert(req.responseText);

				this.rcvtext = req.responseText;
				var docText = req.responseText;
				this.errcode = docText.substr(0,7);
				this.errmsg = docText.substr(7);

				if(this.errcode=="7000900")
					this.errmsg = this.licenseMsg;

				if(this.debug)
					alert("TEXT : " + docText);
			} else {
				this.errcode = "7000" + req.status;
				this.errmsg = req.statusText;

				if(this.debug)
					alert("errcode : " + this.errcode + " / errmsg : " + this.errmsg);
			}
		}
	}
}

if (typeof window.encodeURIComponent === 'undefined') {
	DWREngine._utf8 = function(wide) {
		wide = "" + wide; // Make sure it is a string
		var c;
		var s;
		var enc = "";
		var i = 0;
		while (i < wide.length) {
			c = wide.charCodeAt(i++);
			// handle UTF-16 surrogates
			if (c >= 0xDC00 && c < 0xE000) continue;
			if (c >= 0xD800 && c < 0xDC00) {
				if (i >= wide.length) continue;
				s = wide.charCodeAt(i++);
				if (s < 0xDC00 || c >= 0xDE00) continue;
				c = ((c - 0xD800) << 10) + (s - 0xDC00) + 0x10000;
			}
			// output value
			if (c < 0x80) {
				enc += String.fromCharCode(c);
			}
			else if (c < 0x800) {
				enc += String.fromCharCode(0xC0 + (c >> 6), 0x80 + (c & 0x3F));
			}
			else if (c < 0x10000) {
				enc += String.fromCharCode(0xE0 + (c >> 12), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
			}
			else {
				enc += String.fromCharCode(0xF0 + (c >> 18), 0x80 + (c >> 12 & 0x3F), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
			}
		}
		return enc;
	}

	DWREngine._hexchars = "0123456789ABCDEF";

	DWREngine._toHex = function(n) {
		return DWREngine._hexchars.charAt(n >> 4) + DWREngine._hexchars.charAt(n & 0xF);
	}

	DWREngine._okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.!~*'()";
	// test DWREngine._okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	window.encodeURIComponent = function(s)  {
		s = DWREngine._utf8(s);
		var c;
		var enc = "";
		for (var i= 0; i<s.length; i++) {
			if (DWREngine._okURIchars.indexOf(s.charAt(i)) == -1) {
				enc += "%" + DWREngine._toHex(s.charCodeAt(i));
			}
			else {
				enc += s.charAt(i);
			}
		}
		return enc;
	}
}



//-------------------------------------------------------------------
// Start Wrapping, Utility module
//-------------------------------------------------------------------
var _ajaxReady = false;
var ajaxobj = new jjxweb(document.location.host, document.location.port);
var resultArray = new Array();

/**
 * Added by CWYOO at 2013.09.11
 * return ajaxobj.encode_base64
 */
function isEncodeBase64() {
	return ajaxobj.encode_base64 ? "Y" : "N";
}

function _HR_SERVERVERSION() {
	resultArray = new Array();
	var result = ajaxobj.HR_SERVERVERSION();
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	resultArray[2] = ajaxobj.serverversion;

	return resultArray;
}

function _HR_REMOTEADDR() {
	resultArray = new Array();
	var result = ajaxobj.HR_REMOTEADDR();
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	resultArray[2] = ajaxobj.remote_addr;

	return resultArray;
}

/**
 * Modified  by CWYOO at 2013.09.13
 *		Encode result
 * Modified by CWYOO at 2011.04.11
 *		Added host ip address
 * Modified by CWYOO at 2010.03.26
 *		Added parameter : pool, userid, password
 */
function _HR_SESSIONOPEN(forced, pool, userid, password, authClass) {
	resultArray = new Array();

	var result = ajaxobj.HR_SESSIONOPEN(forced, pool, userid, password, authClass);

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	if(ajaxobj.result<0) {
		// Modified by CWYOO at 2013.09.13
		//resultArray[2] = ajaxobj.errmsg;
		resultArray[2] = encodeBase64(ajaxobj.errmsg, true);
		//--------------------------------------------
		resultArray[3] = null;
	} else {
		// Modified by CWYOO at 2011.04.11
		//resultArray[2] = ajaxobj.errmsg;
		resultArray[2] = ajaxobj.sessionid;
		resultArray[3] = ajaxobj.server_addr;
	}

	return resultArray;
}

/**
 * Modified  by CWYOO at 2013.09.13
 *		Encode result
 */
function _HR_SESSIONCLOSE() {
	resultArray = new Array();
	var result = ajaxobj.HR_SESSIONCLOSE();
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Decode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 * Modified by CWYOO at 2011.04.11
 * 		Added host ip address
 */
function _HR_PUTSESSVAR(sKey, sValue) {
	resultArray = new Array();

	//var result = ajaxobj.HR_PUTSESSVAR(sKey, sValue);
	var result = ajaxobj.HR_PUTSESSVAR(decodeBase64(sKey), decodeBase64(sValue));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	// Added by CWYOO at 2011.04.11
	resultArray[3] = ajaxobj.server_addr;

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 * Modified by CWYOO at 2011.04.11
 * 		Added host ip address
 */
function _HR_GETSESSVAR(sKey) {
	resultArray = new Array();

	//var result = ajaxobj.HR_GETSESSVAR(sKey);
	var result = ajaxobj.HR_GETSESSVAR(decodeBase64(sKey));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.sessvarvalue;
	resultArray[2] = encodeBase64(ajaxobj.sessvarvalue, true);

	// Added by CWYOO at 2011.04.11
	resultArray[3] = ajaxobj.server_addr;

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_EXECPGM(cmd) {
	resultArray = new Array();

	//var result = ajaxobj.HR_EXECPGM(cmd);
	var result = ajaxobj.HR_EXECPGM(decodeBase64(cmd));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_SHELL(cmd) {
	resultArray = new Array();

	//var result = ajaxobj.HR_SHELL(cmd);
	var result = ajaxobj.HR_SHELL(decodeBase64(cmd));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode result
 */
function _HR_COMMIT(dbname) {
	resultArray = new Array();
	var result = ajaxobj.HR_COMMIT(dbname);
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode result
 */
function _HR_ROLLBACK(dbname) {
	resultArray = new Array();
	var result = ajaxobj.HR_ROLLBACK(dbname);
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * deprecated
 */
function _HR_LOBREAD(dbname,table,column,rsltfile,condition) {
	return ajaxpbj.HR_LOBREAD(dbname,table,column,rsltfile,condition);
}

/**
 * deprecated
 */
function _HR_LOBWRITE(dbname, table,column,fromfile,condition) {
	return ajaxobj.HR_LOBWRITE(dbname, table,column,fromfile,condition);
}

/**
 * Modified by CWYOO at 2013.09.13
 * 		Encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_GETCLOB(dbname, table, column, condition) {

	//var result = ajaxobj.HR_GETCLOB(dbname, table, column, condition);
	var result = ajaxobj.HR_GETCLOB(dbname, decodeBase64(table), decodeBase64(column), decodeBase64(condition));

	resultArray = new Array();
	resultArray[0] = result
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 * 		Encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_PUTCLOB(dbname, table, column, fromstr, condition) {

	//var result = ajaxobj.HR_PUTCLOB(dbname, table, column, fromstr, condition);
	var result = ajaxobj.HR_PUTCLOB(dbname, decodeBase64(table), decodeBase64(column), decodeBase64(fromstr), decodeBase64(condition));

	resultArray = new Array();
	resultArray[0] = result
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode return value
 *		since flash player 11.9.900.93
 *		Decode parameter in wrapping module
 *			removed decoding logic in HR_SELECTINTO
 *
 * Modified by CWYOO at 2013.09.11
 *		Decode parameter
 *		sqlparamarray : decode in HR_SELECTINFO
 *
 * Modified by CWYOO at 2008.12.09
 *		Enhance speed in flex code
 */
function _HR_SELECTINTO(dbname, sqlstring, sqlparamarray, usesqlid) {
	resultArray = new Array();
	// Added by CWYOO at 2008.12.09
	// Added useXml paramter
	//	0 : NO
	//	1 : YES

	// Modified by CWYOO at 2013.09.13
	for (var i=0; sqlparamarray!=null && i<sqlparamarray.length; i++) {
		sqlparamarray[i] = decodeBase64(sqlparamarray[i]);
	}

	//var result = ajaxobj.HR_SELECTINTO(dbname, sqlstring, sqlparamarray, usesqlid, "0");
	var result = ajaxobj.HR_SELECTINTO(dbname, decodeBase64(sqlstring), sqlparamarray, usesqlid, "0");

	resultArray[0] = result;

	// Modified by CWYOO at 2013.09.13
	// Flash Player 11.9 error handling
	// Korean characters crash in Flex
	//resultArray[1] = ajaxobj.rcvtext;
	resultArray[1] = encodeBase64(ajaxobj.rcvtext, true);
	//--------------------------------------------------

	return resultArray;
}

/**
 * Deprecated since 2.5
 * Call _HR_SQLTRANS
 */
function _HR_SQLEXECUTE(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit) {
	return _HR_SQLTRANS(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit);
}

/**
 * Modified by CWYOO at 2013.09.13
 *		Encode return value
 *		since flash player 11.9.900.93
 *		Decode parameter in wrapping module
 *			removed decoding logic in HR_SELECTINTO
 *
 * Modified by CWYOO at 2013.09.13
 *		Encode return value
 *		since flash player 11.9.900.93
 *
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 *		sqlparamarray : decode in HR_SQLTRANS
 */
function _HR_SQLTRANS(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit) {
	//------------------------------------------------------
	// Modified by CWYOO at 2013.09.13
	var multiRow = false;

	if(sqlparamarray==null ||
			sqlparamarray==undefined ||
			sqlparamarray=="undefined" ||
			sqlparamarray.length==0) {
				multiRow = false;
	} else if(sqlparamarray.length>0) {
		firstRow = sqlparamarray[0];
		if(firstRow instanceof Array) {
			multiRow = true;
		}
	}

	if(multiRow==true) {
		for(var idx=0; idx<sqlparamarray.length; idx++) {
			var tmpRow = sqlparamarray[idx];
			for (i=0; i<tmpRow.length; i++) {
				tmpRow[i] = decodeBase64(tmpRow[i]);
			}
			sqlparamarray[idx] = tmpRow;
		}
	} else {
		for (var idx=0; sqlparamarray!=null && idx<sqlparamarray.length; idx++) {
			sqlparamarray[idx] = decodeBase64(sqlparamarray[idx]);
		}
	}
	//------------------------------------------------------

	resultArray = new Array();

	//var result = ajaxobj.HR_SQLTRANS(dbname, sqlstring, sqlparamarray, usesqlid, arrsize, autocommit);
	var result = ajaxobj.HR_SQLTRANS(dbname, decodeBase64(sqlstring), sqlparamarray, usesqlid, arrsize, autocommit);

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_READF(filenm) {
	//filenm = decodeURIComponent(filenm);
	filenm = decodeURIComponent(decodeBase64(filenm));

	resultArray = new Array();
	var result = ajaxobj.HR_READF(filenm);
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_WRITEF(filenm, contents) {
	//filenm = decodeURIComponent(filenm);
	filenm = decodeURIComponent(decodeBase64(filenm));

	resultArray = new Array();
	//var result = ajaxobj.HR_WRITEF(filenm, contents);
	var result = ajaxobj.HR_WRITEF(filenm, decodeBase64(contents));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Deprecated since 2.3
 */
function _HR_RHDRINFO(filenm) {
	filenm = decodeURIComponent(filenm);
	resultArray = new Array();
	var result = ajaxobj.HR_RHDRINFO(filenm);
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_WEBREPORT(modulename, sendstr) {
	resultArray = new Array();

	//var result = ajaxobj.HR_WEBREPORT(modulename, sendstr);
	var result = ajaxobj.HR_WEBREPORT(decodeBase64(modulename), decodeBase64(sendstr));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 * Added by CWYOO at 2010.03.09
 */
function _HR_WEBREPORT_SCK(modulename, sendstr) {
	resultArray = new Array();

	//var result = ajaxobj.HR_WEBREPORT_SCK(modulename, sendstr);
	var result = ajaxobj.HR_WEBREPORT_SCK(decodeBase64(modulename), decodeBase64(sendstr));

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_PROXY(method, uri, paramList) {
	resultArray = new Array();

	//-----------------------------------
	// Added by CWYOO at 2013.09.11
	var tmpA = new Array();
	var tmp = "";
	for(var idx=0; paramList!=null && idx<paramList.length; idx++) {
		var tmp = paramList[idx];
		if(tmp!=null && tmp.length>0) {
			tmp = decodeBase64(tmp);
		} else {
			tmp = "";
		}
		tmpA[tmpA.length] = tmp;
	}
	//-----------------------------------

	//var result = ajaxobj.HR_PROXY(method, uri, paramList);
	var result = ajaxobj.HR_PROXY(method, decodeBase64(uri), tmpA);

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	//resultArray[3] = ajaxobj.rcvtext;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);
	resultArray[3] = encodeBase64(ajaxobj.rcvtext, true);

	return resultArray;
}

/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 * 		Decode parameter
 */
function _HR_CALLJSP(uri, paramList) {
	resultArray = new Array();

	//-----------------------------------
	// Added by CWYOO at 2013.09.11
	var tmpA = new Array();
	var tmp = "";
	for(var idx=0; paramList!=null && idx<paramList.length; idx++) {
		var tmp = paramList[idx];
		if(tmp!=null && tmp.length>0) {
			tmp = decodeBase64(tmp);
		} else {
			tmp = "";
		}
		tmpA[tmpA.length] = tmp;
	}
	//-----------------------------------

	//var result = ajaxobj.HR_CALLJSP(uri, paramList);
	var result = ajaxobj.HR_CALLJSP(decodeBase64(uri), tmpA);

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	//resultArray[3] = ajaxobj.rcvtext;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);
	resultArray[3] = encodeBase64(ajaxobj.rcvtext, true);

	return resultArray;
}

/**
 * Added by JHS at 2014.06.13
 */

function _HR_CALLSPRING(uri, paramstr, useRequestbody) {
	resultArray = new Array();


	var tmp =  decodeBase64(paramstr);
	var param = JSON.parse(tmp);

	var result = ajaxobj.HR_CALLSPRING(decodeBase64(uri), param, useRequestbody);

	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;
	resultArray[2] = ajaxobj.errmsg;
	resultArray[3] = encodeBase64(ajaxobj.rcvtext, true);

	return resultArray;
}
/**
 * Modified by CWYOO at 2013.09.13
 *		encode result
 * Modified by CWYOO at 2013.09.11
 *		Decode parameter
 * Added by CWYOO at 2010.03.15 for message push
 */
function _HR_SENDMESSAGE(sendstr) {
	resultArray = new Array();

	//var result = ajaxobj.HR_SENDMESSAGE(sendstr);
	var result = ajaxobj.HR_SENDMESSAGE(decodeBase64(sendstr));
	resultArray[0] = result;
	resultArray[1] = ajaxobj.errcode;

	// Modified by CWYOO at 2013.09.13
	//resultArray[2] = ajaxobj.errmsg;
	resultArray[2] = encodeBase64(ajaxobj.errmsg, true);

	return resultArray;
}

function _HR_POLLMESSAGE() {
	resultArray = new Array();
	var result = HR_POLLMESSAGE();
	resultArray[0] = result;
	//	resultArray[1] = ajaxobj.errcode;
	//	resultArray[2] = ajaxobj.errmsg;
	return resultArray;
}

function HR_POLLMESSAGE() {
	jjpollMessage();
	return 0;
}

var trequest;

/**
 * Send Long Poll Message
 */
function jjpollMessage() {
	trequest = ajaxobj.jjgetXMLHttpRequest();
	if (trequest) {
		trequest.onreadystatechange = handleResponse;
		trequest.open("GET", ajaxobj.url_poll, true);
		trequest.send();
	} else {
		alert("Your browser does not permit this feature");
	}
}

/**
 * Handle long poll message result
 */
function handleResponse() {
	if (trequest.readyState == 4) {
		if (trequest.status == 200) {
			jjRecvMessage(trequest.responseText);
			jjpollMessage();
		} else {
			alert("pollMessage Error:" + trequest.status);
		}
	}
}
// to here
//================================

/**
 * Added by CWYOO at 2009.12.11
 * return default flexmate pool name
 */
function getDefaultPoolName() {
	return "flexmate";
}

function getErrCode() {
	return ajaxobj.errcode;
}

function getErrMsg() {
	return ajaxobj.errmsg;
}

function getRecordCount() {
	return ajaxobj.rcnt;
}

function getRemoteAddr() {
	return ajaxobj.remote_addr;
}

function getSessionId() {
	return ajaxobj.sessionid;
}

function getSessVar() {
	return ajaxobj.sessvarvalue;
}

function getVersion() {
	return ajaxobj.version;
}

function getServerVersion() {
	return ajaxobj.serverversion;
}

function getResult() {
	return ajaxobj.result;
}

function getResults() {
	return ajaxobj.results;
}

function getResponseText() {
	return ajaxobj.rcvtext;
}
/**
 * Added by JHS at 2014.06.13
*/
function getResponseTextJSON() {
	return ajaxobj.rcvtextJSON;
}

function isReady() {
	return _ajaxReady;
}

function setReady() {
	_ajaxReady = true;
}

/**
 * Added by CWYOO at 2010.09.17
 * Handle base64 format
 *		getBase64Key()
 *		encodeBase64()
 *		decodeBase64()
 *		_utf8_encide()
 *		_utf8_decode()
 */
function getBase64KeyString() {
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return _keyStr;
}

/**
 * Modified by CWYOO at 2013.09.13
 * 		since 11.9.900.93
 *		paramter added : forced
 */
function encodeBase64(input, forced) {
	//if(!ajaxobj.encode_base64)
	if(!ajaxobj.encode_base64 && (forced==undefined || forced=='undefined' || forced==null || forced==false))
		return input;

	//------------------------------------
	// Added by CWYOO at 2013.09.15
	if(input==null || input.length==0)
		return input;
	//------------------------------------

	var _keyStr = getBase64KeyString();
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	input = _utf8_encode(input);

	while (i < input.length) {

		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

	}
	return output;
}

/**
 * Modified by CWYOO at 2013.09.13
 * input == null ==> error
 */
// public method for decoding
function decodeBase64(input) {
	//------------------------------------
	// Added by CWYOO at 2013.09.13
	if(input==null || input.length==0)
		return input;
	//------------------------------------

	var _keyStr = getBase64KeyString();
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {

		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = _utf8_decode(output);
	return output;
}
// private method for UTF-8 encoding
function _utf8_encode(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}
// private method for UTF-8 decoding
function _utf8_decode(utftext) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while ( i < utftext.length ) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
 //----------------------------------------

document.onload = setReady();
