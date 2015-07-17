	/**
	 * FlexMate �ν��Ͻ�
	 * �������� �� ��
	 */
	var parser = new URLParser();
	var MYHOST = parser.hostname;
	var MYPORT = parser.port;
	var ajaxobj = new jjxweb(MYHOST, MYPORT);
	var dbname = "SPOCLUB";
	var usesqlid = true;
	openSession();
	
	/**
	 * FlexMate Session Open
	 */
	function openSession() {
		var rcode = -1;
		rcode = ajaxobj.HR_SESSIONOPEN(true);
		if(rcode<0) {
			alert("Failed open session\nError Code : " + ajaxobj.errcode + "\nError Msg : " + ajaxobj.errmsg);
			return;
		}
	}
	
	/**
	 * =====================================================
	 * ���Ͱ���ü ���� ��ȸ
	 * =====================================================
	 */
	function loadClassList() {
		var rcode = -1;
		var sql = "SPOSTAR.COMMON.CLASS.LIST";
		var param = new Array();
		
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}	
	
	/**
	 * =====================================================
	 * ������̵� ��ȸ(�̹� ��ϵ� ���)
	 * =====================================================
	 */
	function loadTeacherId(userId) {
		var rcode = -1;
		var sql = "SPOSTAR.TEACHER.ID.SELECT";
		var param = new Array();
		
		param[param.length] = userId;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}	
	
	/**
	 * =====================================================
	 * ������̵� ����
	 * =====================================================
	 */
	function createTeacherId() {
		var rcode = -1;
		var sql = "SPOSTAR.TEACHER.ID.CREATE";
		var param = new Array();
		
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}	
	
	/**
	 * =====================================================
	 * ������̵� ��ȸ(�̹� ��ϵ� ���)
	 * =====================================================
	 */
	function loadTeacherCareerList(teacherId) {
		var rcode = -1;
		var sql = "SPOSTAR.TEACHER.CAREER.LIST";
		var param = new Array();
		
		param[param.length] = teacherId;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}	
	
	/**
	 * =====================================================
	 * ������ ����
	 * =====================================================
	 */
	function deleteTeacherCareer(teacherId, seq, remoteAddr) {
		var rcode = -1;
		var sql = "SPOSTAR.TEACHER.CAREER.DELETE";
		var param = new Array();
		
		param[param.length] = remoteAddr;
		param[param.length] = teacherId;
		param[param.length] = seq;
		
		rcode = ajaxobj.HR_SQLTRANS(dbname, sql, param, true, 1, false);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return rcode;
		}
		
		rcode = ajaxobj.HR_COMMIT(dbname);
		if(rcode<0) {
			alert(ajaxobj.errmsg);
			return rcode;
		}
		
		return rcode;
	}	
	
	/**
	 * =====================================================
	 * ������ �ű� ���
	 * =====================================================
	 */
	function insertTeacherCareer(param) {
		var rcode = -1;
		var sql = "SPOSTAR.TEACHER.CAREER.INSERT";
		
		rcode = ajaxobj.HR_SQLTRANS(dbname, sql, param, true, 1, false);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return;
		}
		
		rcode = ajaxobj.HR_COMMIT(dbname);
		if(rcode<0) {
			alert(ajaxobj.errmsg);
			return;
		}
	}	
	
	/**
	 * =====================================================
	 * �̸��� �ߺ�Ȯ��
	 * �⵵���� Ȯ���ϵ��� ������
	 * =====================================================
	 */
	function emailDupCheck(email, regYear) {
		if(!isValidStr(regYear)){
			alert("�⵵���� �����ϴ�.");
			return false;
		}
		if(!isValidStr(email.split("@").join(""))){
			alert("E-MAIL�ּҸ� �Է��Ͽ� �ּ���.");
			return false;
		}
		
		var rcode = -1;
		var sql = "SPOCLUB.INDEX.EMAIL.CHK";
		var param = new Array();
		
		param[param.length] = regYear;
		param[param.length] = email;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return false;
		}
		
		if(ajaxobj.results.length > 0){
			alert("�Է��Ͻ� E-MAIL�� ȸ������ �����մϴ�. �ٸ� �̸��� �ּҸ� �Է��Ͽ� �ּ���.");
			return false;
		}else{
			alert("�Է��Ͻ� E-MAIL�� ��밡���մϴ�.");
			return true;
		}
	}	
	
	
	/**
	 * =====================================================
	 * ���ڿ� ���� ��ȿ�� ������ �˻��Ѵ�.
	 * @ Parameter
	 *	val : �˻��� ���ڿ�
	 * @ Return
	 *	boolean : true(��ȿ�� ���ڿ�) / false(��ȿ���� ���� ���ڿ�)
	 * =====================================================
	 */
	function isValidStr(val) {
		if(val!=undefined && val!=null && String(val).length>0 && val!="undefined" && val!="null")
			return true;
		else
			return false;
	}
	
	/**
	 * =====================================================
	 * ��ȿ�� ������Ʈ���� �˻��Ѵ�.
	 * @ Parameter
	 *	val : �˻��� ��ü
	 * @ Return
	 *	boolean : true(��ȿ�� ��ü) / false(��ȿ���� ���� ��ü)
	 * =====================================================
	 */
	function isValidObj(obj) {
		if(obj!=undefined && obj!=null)
			return true;
		else
			return false;
	}
	
	
	/**
	 * =====================================================
	 * Object�� ã�Ƽ� �����Ѵ�.
	 * @ Parameter
	 *	objName : ��ü ���̵�
	 * @ Return
	 *	Object : ID�� ��ġ�ϴ� Object
	 * =====================================================
	 */
	function findObject(objName) {
		var obj = document.getElementById(objName);
		//if(obj==null || obj==undefined)
		//	alert(objName);
		
		return obj;
	}
	
	
	/**
	 * =====================================================
	 * Select �ڽ��� Ư������ ã�� ���õ� ���·� ó��
	 * =====================================================
	 */
	function setSelectValue(obj, val) {
		if(obj==null || obj==undefined) {
			alert("Object is null");
			return;
		}
		
		for(var idx=0; idx<obj.options.length; idx++) {
			if(obj.options[idx].value==val) {
				obj.options.selectedIndex = idx;
				break;
			}
		}
	}
	
	/**
	 * =====================================================
	 * Select �ڽ��� ���õ� ���� ���� 
	 * =====================================================
	 */
	function getSelectValue(obj) {
		var retVal = "";
		
		if(obj==null || obj==undefined) {
			alert("Object is null");
			return null;
		}
		
		for(var idx=0; idx<obj.options.length; idx++) {
			if(obj.options[idx].selected) {
				retVal = obj.options[idx].value;
				break;
			}
		}
		return retVal;
	}
	
	/**
	 * =====================================================
	 * Select �ڽ��� ���õ� �ؽ�Ʈ�� ���� 
	 * =====================================================
	 */
	function getSelectText(obj) {
		var retVal = "";
		
		if(obj==null || obj==undefined) {
			alert("Object is null");
			return null;
		}
		
		for(var idx=0; idx<obj.options.length; idx++) {
			if(obj.options[idx].selected) {
				retVal = obj.options[idx].text;
				break;
			}
		}
		return retVal;
	}
	
	/**
	 * =====================================================
	 * Input ����
	 * @ Parameter
	 *	oType : Input type(hidden, text ...)
	 *	oName : Input �̸�
	 *	oValue : Input Object�� ���õ� �ʱⰪ
	 * =====================================================
	 */
	function createInput(oType, oName, oValue) {		
		var obj = document.createElement("input");
		obj.setAttribute("type", oType);
		obj.setAttribute("class", "form2");
		obj.setAttribute("name", oName);
		obj.setAttribute("id", oName);
		obj.setAttribute("value", oValue);
		
		
		return obj;
	}
	
	/**
	 * =====================================================
	 * ȸ���̸��� ��ȿ���� Ȯ���Ѵ�.
	 * �� �Լ��� ���� ������ ����ϹǷ� ���̻� ������� ����
	 * =====================================================
	 */
	function isValid_name(str) {
		str = str.replace(/(^\s*)|(\s*$)/g, "");
		if( str == '' ){
			alert("�̸��� �Է��ϼ���.");
			return false;
		}
		
		var retVal = checkSpace( str );
		
		if( retVal ){
			alert("�̸��� ���� ���� �Է��ϼ���.");
			return false;
		}
		
		if( !isHangul(str) ) {
			alert("�̸��� ��Ȯ�ϰ� �Է��� �ּ���.");
			return false;
		}
		if( str.length > 10 ) {
			alert("�̸��� 10�ڱ����� ����� �� �ֽ��ϴ�.");
			return false;
		}
		
		return true;
	}
	
	/**
	 * =====================================================
	 * �ѱ����� Ȯ�� 
	 * =====================================================
	 */
	function isHangul(s){
		var len;
		len = s.length;
		
		for (var i = 0; i < len; i++)  {
			if (s.charCodeAt(i) != 32 && (s.charCodeAt(i) < 44032 || s.charCodeAt(i) > 55203))
			return false;
		}
		
		return true;
	}
	
	/**
	 * =====================================================
	 * ��й�ȣ ��ȿ�� �˻� 
	 * =====================================================
	 */
	function isValid_passwd(str) {
		var cnt = 0;
		
		if( str == ""){
			alert("��й�ȣ�� �Է��ϼ���.");
			return false;
		}
		
		/* check whether input value is included space or not  */
		var retVal = checkSpace( str );
		if( retVal ) {
			alert("��й�ȣ�� ������� �Է��� �ּ���.");
			return false;
		}
		if( str.length < 6 ){
			alert("��й�ȣ�� 6~16���� ���� ��ҹ��ڿ� ����, Ư�����ڸ� ����� �� �ֽ��ϴ�.");
			return false;
		}
		
		for( var i=0; i < str.length; ++i){
			if( str.charAt(0) == str.substring( i, i+1 ) ) ++cnt;
		}
		if( cnt == str.length ) {
			alert("�������� �ʹ� �����ϴ�. �ٸ� ��й�ȣ�� �Է��� �ּ���.");
			return false;
		}
		
		var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{6,16}$/;
		if( !isPW.test(str) ) {
			alert("��й�ȣ�� 6~16���� ���� ��ҹ��ڿ� ����, Ư�����ڸ� ����� �� �ֽ��ϴ�.");
			return false;
		}
		return true;
	}
	
	/**
	 * =====================================================
	 * ��й�ȣ ��ȿ�� �˻� 
	 * =====================================================
	 */
	function isValid_email(str){
		/* check whether input value is included space or not  */
		if(str == ""){
			alert("�̸��� �ּҸ� �Է��� �ּ���.");
			return false;
		}
		var retVal = checkSpace( str );
		if( retVal ) {
			alert("�̸����ּҸ� ��Ȯ�ϰ� �Է��� �ּ���..");
			return false;
		}
		
		if( -1 == str.indexOf('.') ) {
			alert("�̸��� �ּҸ� ��Ȯ�ϰ� �Է��� �ּ���.");
			return false;
		}
		
		/* checkFormat */
		var isEmail = /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
		if( !isEmail.test(str) ) {
			alert("�̸��� �ּҸ� ��Ȯ�ϰ� �Է��� �ּ���.");
			return false;
		}
		if( str.length > 60 ) {
			alert("�̸��� �ּҸ� ��Ȯ�ϰ� �Է��� �ּ���.");
			return false;
		}
		
		return true;
	}
	
	/**
	 * =====================================================
	 * �̸��� ����ŷ 1 
	 * =====================================================
	 */
	function maskEmail(email, firstLen, lastLen) {
		//alert(email + "/" + firstLen + "/" + lastLen);
		
		if(email==null || email.length==0)
			return "";
		
		var tmpA = email.split("@");
		
		if(tmpA.length < 2)
			return email;
		
		var email_id = tmpA[0];
		var email_host = tmpA[1];
		
		var dispLen = firstLen + lastLen;
		var idLen = email_id==null ? 0 : email_id.length;
		
		if(idLen <= dispLen)
			return email;
		
		//alert(email_id);
		
		
		var retStr = "";
		var prefix = email_id.substring(0, firstLen);
		var surfix = email_id.substring(email_id.length-lastLen, email_id.length);
		var remain = email_id.length - (firstLen + lastLen);
		
		//alert(prefix + "/" + surfix + "/"  + remain);		
		for(var idx=0; idx<remain; idx++) {
			retStr += "*";
		}
		
		retStr = prefix + retStr + surfix + "@" + email_host;
		//alert(retStr);
		
		return retStr;
	}
	
	/**
	 * =====================================================
	 * �̸��� ����ŷ 2
	 * =====================================================
	 */
	function maskEmail2(email, firstLen, lastLen) {
		//alert(email + "/" + firstLen + "/" + lastLen);
		
		if(email==null || email.length==0)
			return "";
		
		var tmpA = email.split("@");
		
		if(tmpA.length < 2)
			return email;
		
		var email_id = tmpA[0];
		var email_host = tmpA[1];
		
		var dispLen = firstLen + lastLen;
		var idLen = email_id==null ? 0 : email_id.length;
		
		if(idLen <= dispLen)
			return email;
		
		//alert(email_id);
		
		
		var retStr = "";
		var prefix = email_id.substring(0, firstLen);
		var surfix = email_id.substring(email_id.length-lastLen, email_id.length);
		var remain = email_id.length - (firstLen + lastLen);
		
		//alert(prefix + "/" + surfix + "/"  + remain);		
		for(var idx=0; idx<remain; idx++) {
			retStr += "*";
		}
		
		//retStr = prefix + retStr + surfix + "@" + email_host;
		//alert(retStr);
		
		var maskHost = "";
		var hostA = email_host.split(".");
		if(hostA==null || hostA.length<2) 
			return email;
			
		for(var idx=0; idx<hostA.length; idx++) {
			var tmp = hostA[idx];
			var len = tmp.length;
			
			if(idx==0) {
				maskHost += tmp.substring(0,1);
				for(var sidx=1; sidx<tmp.length; sidx++) {
					maskHost += "*";
				}
			} else if(idx==hostA.length-1) {
				maskHost += tmp;
			} else {
				for(var sidx=0; sidx<tmp.length; sidx++) {
					maskHost += "*";
				}
			}
			if(idx<hostA.length-1)
				maskHost += ".";
		}
		
		retStr = prefix + retStr + surfix + "@" + maskHost;
		//alert(retStr);
		
		return retStr;
	}
	
	/**
	 * =====================================================
	 * �ڵ��� ����ŷ
	 * =====================================================
	 */
	function maskMobile(mobile) {
		
		mobile = mobile.split("-").join("").split(" ").join("");
		
		if(mobile==null || mobile.length==0 )
			return "";
		
		if(mobile.length < 10)
			return mobile;
		
		var retStr = "";
		var str1 = mobile.substring(0, 3);
		var str2 = mobile.substring(3, (mobile.length-4));
		var str3 = mobile.substring(mobile.length-4, mobile.length);
		
		//alert(str1 + "/" + str2 + "/" + str3);		
		for(var idx=0; idx<str2.length; idx++) {
			retStr += "*";
		}
		
		retStr = str1 + "-" + retStr + "-" + str3;
		//alert(retStr);
		
		return retStr;
	}
	
	/**
	 * =====================================================
	 * �Ϲ���ȭ ����ŷ 
	 * =====================================================
	 */
	function maskPhone(mobile) {
		
		// '-' ������ ����
		mobile = mobile.split("-").join("").split(" ").join("");
		
		if(mobile==null || mobile.length==0 )
			return "";
		
		// @�� ������ �׳� ���� 
		if(mobile.length < 9)
			return mobile;
		
		var retStr = "";
		var str1 = mobile.substring(0,2)=="02" ? mobile.substring(0,2) : mobile.substring(0, 3);
		var str2 = mobile.substring((mobile.substring(0,2)=="02" ? 2 : 3), (mobile.length-4));
		var str3 = mobile.substring(mobile.length-4, mobile.length);
		
		//alert(str1 + "/" + str2 + "/" + str3);		
		for(var idx=0; idx<str2.length; idx++) {
			retStr += "*";
		}
		
		retStr = str1 + "-" + retStr + "-" + str3;
		//alert(retStr);
		
		return retStr;
	}
	
	/**
	 * =====================================================
	 * �ڵ��� split
	 * =====================================================
	 */
	function splitMobile(mobile) {
		
		mobile = mobile.split("-").join("").split(" ").join("");
		
		if(mobile==null || mobile.length==0 )
			return "";
		
		if(mobile.length < 10)
			return mobile;
		
		var retStr = "";
		var str1 = mobile.substring(0, 3);
		var str2 = mobile.substring(3, (mobile.length-4));
		var str3 = mobile.substring(mobile.length-4, mobile.length);
		
		return str1 + "-" + str2 + "-" + str3;
	}
	
	/**
	 * =====================================================
	 * ������ �ԷµǾ����� �˻� 
	 * =====================================================
	 */
	function checkSpace( str ) {
		if(str.search(/\s/) != -1){
			return true;
		} else {
			return false;
		}
	}
	
	function onlyNumberInput(obj) 
	{ 
		var str = obj.value;
		str = new String(str);
		var rex = /[^0-9]/g;
		str=str.replace(rex,'');
		obj.value = str;
	}
	
	
	/**
	 * =====================================================
	 * Added by CWYOO at 2014.09.02
	 * �� 14�� �̸� Ȯ��(������Ϸ� ��)
	 * =====================================================
	 */
	function calculateAge2(birthDt){		
		var rcode = -1;
		var sql = "SPOCLUB.GET.SERVER.DATE";
		var param = new Array();
		rcode = ajaxobj.HR_SELECTINTO(dbname, sql, param, true);
		        
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return;
		}
		
		var now = ajaxobj.results[0][0];
		
		var todayYear = Number(now.substr(0,4));
		var todayMonth = Number(now.substr(4,2));
		var todayDay = Number(now.substr(6,2));
				
		var ssnYear = Number(birthDt.substr(0,4));
		var ssnMonth = Number(birthDt.substr(4,2));
		var ssnDay = Number(birthDt.substr(6,2));
		
		var manAge = todayYear - ssnYear;
		
		if(todayMonth < ssnMonth){
			manAge = manAge -1;
		}else if(todayMonth == ssnMonth){
			if(todayDay < ssnDay){
				manAge = manAge -1;
			}
		}
		return manAge;
	}	
	
	/**
	 * =====================================================
	 * ���������� - �õ� ��ȸ
	 * =====================================================
	 */
	function findSidoCd() {
		rcode = -1;
		sql = "SPOSTAR.APP.KIKCD.SIDO";
		param = new Array();		
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}
	
	/**
	 * =====================================================
	 * ���������� - �ñ��� ��ȸ
	 * =====================================================
	 */
	function findSigunCd(sidoCd) {
		rcode = -1;
		sql = "SPOSTAR.APP.KIKCD.SIGUN";
		param = new Array();
		param[param.length] = sidoCd;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}
	
	/**
	 * =====================================================
	 * ���������� - ���鵿 ��ȸ
	 * =====================================================
	 */
	function findDongCd(sidoCd, sigunCd) {
		rcode = -1;
		sql = "SPOSTAR.APP.KIKCD.DONG";
		param = new Array();
		param[param.length] = sidoCd;
		param[param.length] = sigunCd;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}
	
	/**
	 * =====================================================
	 * ���������� - �� ��ȸ
	 * =====================================================
	 */
	function findRiCd(sidoCd, sigunCd, dongCd) {
		rcode = -1;
		sql = "SPOSTAR.APP.KIKCD.RI";
		param = new Array();
		param[param.length] = sidoCd;
		param[param.length] = sigunCd;
		param[param.length] = dongCd;
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		return ajaxobj.results;
	}
	
	/**
	 * =====================================================
	 * �б���� ��ȸ
	 * =====================================================
	 */
	function getSchoolList(){		
		if(findObject("selectSchoolSido").selectedIndex == 0){
			alert("�õ��� �����Ͽ� �ּ���.");
			return;
		}
		if(findObject("selectSchoolGubun").selectedIndex == 0){
			alert("������ �����Ͽ� �ּ���.");
			return;
		}
		if(!isValidStr(findObject("inputSchoolNm").value)){
			alert("�б����� �Է��Ͽ� �ּ���.");
			return;
		}
		if(findObject("inputSchoolNm").value.length < 2){
			alert("�б����� 2�� �̻� �Է��Ͽ� �ּ���.");
			return;
		}
		var rcode = -1;
		var sql = "SPOCLUB.INDEX.SCHOOL.LIST";
		var param = new Array();
		param[param.length] = "%"+findObject("inputSchoolNm").value+"%";
		param[param.length] = findObject("selectSchoolSido").options[findObject("selectSchoolSido").selectedIndex].value;
		param[param.length] = findObject("selectSchoolGubun").options[findObject("selectSchoolGubun").selectedIndex].value;
		rcode = ajaxobj.HR_SELECTINTO(dbname, sql, param, true);
		if(rcode < 0){
			alert(ajaxobj.errmsg);
			return;
		}
		makeSchoolList(ajaxobj.results);
	}	
	
	/**
	 * =====================================================
	 * ���İ˻� ���� �Լ�
	 * =====================================================
	 */
	// 0 ~ 9
	function CheckNumber(){
		//alert(event.keyCode);
		//if ((event.keyCode>=48 && event.keyCode<=57)) { event.returnValue=true;  }
		if ((event.keyCode>=48 && event.keyCode<=57) || event.keyCode==8 || event.keyCode==46 || event.keyCode==37 || event.keyCode==39 || event.keyCode==9) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// 0 ~ 9,"-"(45)
	function CheckNumberBar(){
		if ((48<=event.keyCode && event.keyCode<=57) || (event.keyCode==45)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// 0 ~ 9,"."(46)
	function CheckNumberDot(){
		if ((48<=event.keyCode && event.keyCode<=57) || (event.keyCode==46)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// 0 ~ 9,"."(46),"-"(45)
	function CheckNumberBarDot(){
		if ((48<=event.keyCode && event.keyCode<=57) || (event.keyCode==45) || (event.keyCode==46)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// 0 ~ 9,"-"," "(32),":"(58),"/"(47)
	function CheckNumberDateTime(){
		if ((48<=event.keyCode && event.keyCode<=58) || (event.keyCode==45) || (event.keyCode==47) || (event.keyCode==32)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// 0 ~ 9,"-", "."(46)
	function CheckMoney(){
		if ((48<=event.keyCode && event.keyCode<=57) || (event.keyCode==45) || (event.keyCode==46)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// A~Z, " "(SPACE)
	function CheckCapital(){
		if ((65<=event.keyCode && event.keyCode<=90) || (event.keyCode==32)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}
	
	// A~Z, a~z, " "(SPACE)
	function CheckAlphabet(){
		if ((65<=event.keyCode && event.keyCode<=90) || (97<=event.keyCode && event.keyCode<=122) || (event.keyCode==32)) { event.returnValue=true;  }
		else  { event.returnValue=false;  }
	}


	/**
	 * =====================================================
	 * �б��˻� �˾�â ǥ�� 
	 * Modified by CWYOO at 2012.08.28
	 * ���̾��˾� �ϴ��� �̹��� �߸��� ���� 
	 * =====================================================
	 */
	function schoolChk(){
		removeAll(findObject("selectSchoolSido"));
		loadSido();
		
		// ǥ�õ� �˾� ������Ʈ
		var layerObj = findObject("all_popup5");
		
		// ǥ�õ� �˾�â�� ��� ������Ʈ
		var layerBackObj = findObject("popupBackLayer");
		var scrollHeight = document.documentElement.scrollHeight;
		
		popupBackLayer.style.height = scrollHeight;
		layerObj.style.display="block";
	}
	
	
	/**
	 * =====================================================
	 * ��ȸ�� �б�������� �б����� html ����
	 * =====================================================
	 */
	function makeSchoolList(noticeList) {
		
		var noticeDiv = findObject("schoolDiv");
		var header = '<table summary="" class="tb_popup1">';
		header += '<colgroup><col width="53px;"/><col width="103px;"/><col width="96px;"/><col/><col width="144px;"/></colgroup>';
		header += '<tbody><tr><th style="text-align:center">��ȣ</th><th style="text-align:center">�б��ڵ�</th><th style="text-align:center">�õ�</th><th style="text-align:center">�б���</th><th style="text-align:center">����</th></tr></tbody></table>';
		header += '<div class="table_scroll" style="height:400px;"><table summary="" class="tb_popup2"><caption></caption><colgroup><col width="53px;"/>';
		header += '<col width="103px;"/><col width="96px;"/><col/><col width="144px;"/></colgroup><tbody>';
		var footer = '</tbody></table>';	
		var list = "";
	    
	    
		if(noticeList==null || noticeList.length==0) {			
			list = "<tr>";
			list += "<td colspan='5' style='text-align:center'>�˻��� ���ǰ� ��ġ�ϴ� �׸��� �����ϴ�.</td>";
			list += "</tr>";
		} else {
			list = "";
			for(var idx=0; idx<noticeList.length; idx++) {
					var tourLink = "javascript:confirmSchool2(\""+noticeList[idx][2]+"\",\""+noticeList[idx][1]+"\",\""+noticeList[idx][5]+"\");";
					list += "<tr>";	      	
	      	list += "  <td style='width:53px;text-align:center'>" + noticeList[idx][0] + "</td>";
	      	list += "  <td style='width:103px;text-align:center'>" + noticeList[idx][1] + "</td>";
	      	list += "  <td style='width:96px;text-align:center'>" + noticeList[idx][3] + "</td>";
	      	list += "  <td style='text-align:center'><a href='"+tourLink+"'>"+noticeList[idx][2] + "</a></td>";
	      	list += "  <td style='width:144px;text-align:center'>" + noticeList[idx][4] + "</td>";	      	
	        list += "</tr>";
			}
		}
		noticeDiv.innerHTML = header + list + footer;	
	}
	

	/**
	 * =====================================================
	 * �ʼ��Է��׸� üũ 
	 * =====================================================
	 */
	function requiredField(obj,errMsg){
		if (trim(obj.value) == ""){
			alert(errMsg);
			obj.focus();
			return false;
		}
		return true;
	}
		
	/**
	 * =====================================================
	 * ��/�ڿ��� White Space�� ���ŵ� ����ȯ  
	 * =====================================================
	 */
	function trim(value)  {  
  		return value.replace(/^\s+|\s+$/g,"");  
	}

	
	/**
	 * =====================================================
	 * RADIO BUTTON Checked value get : set  ....
	 * =====================================================
	 */
	function getRadioCheckedValue(radioObj) {
		if(!radioObj)
			return "";
		var radioLength = radioObj.length;
		if(radioLength == undefined)
			if(radioObj.checked)
				return radioObj.value;
			else
				return "";
		for(var i = 0; i < radioLength; i++) {
			if(radioObj[i].checked) {
				return radioObj[i].value;
			}
		}
		return "";
	}

	function setRadioCheckedValue(radioObj, newValue) {
		if(!radioObj)
			return;
		var radioLength = radioObj.length;
		if(radioLength == undefined) {
			radioObj.checked = (radioObj.value == newValue.toString());
			return;
		}
		for(var i = 0; i < radioLength; i++) {
			radioObj[i].checked = false;
			if(radioObj[i].value == newValue.toString()) {
				radioObj[i].checked = true;
			}
		}
	}		

	/**
	 * =====================================================
	 * ������ ���
	 * =====================================================
	 */
	function videoView(name){
		window.open(name,'video','toolbar=no,left=50,top=110,height=480,width=640');
	}
	