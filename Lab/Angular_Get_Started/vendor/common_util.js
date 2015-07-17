	/**
	 * FlexMate 인스턴스
	 * 수정하지 말 것
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
	 * 가맹경기단체 종목 조회
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
	 * 강사아이디 조회(이미 등록된 경우)
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
	 * 강사아이디 생성
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
	 * 강사아이디 조회(이미 등록된 경우)
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
	 * 강사경력 삭제
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
	 * 강사경력 신규 등록
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
	 * 이메일 중복확인
	 * 년도별로 확인하도록 수정함
	 * =====================================================
	 */
	function emailDupCheck(email, regYear) {
		if(!isValidStr(regYear)){
			alert("년도값이 없습니다.");
			return false;
		}
		if(!isValidStr(email.split("@").join(""))){
			alert("E-MAIL주소를 입력하여 주세요.");
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
			alert("입력하신 E-MAIL은 회원으로 존재합니다. 다른 이메일 주소를 입력하여 주세요.");
			return false;
		}else{
			alert("입력하신 E-MAIL은 사용가능합니다.");
			return true;
		}
	}	
	
	
	/**
	 * =====================================================
	 * 문자열 값이 유효한 값인지 검사한다.
	 * @ Parameter
	 *	val : 검사할 문자열
	 * @ Return
	 *	boolean : true(유효한 문자열) / false(유효하지 않은 문자열)
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
	 * 유효한 오브젝트인지 검사한다.
	 * @ Parameter
	 *	val : 검사할 객체
	 * @ Return
	 *	boolean : true(유효한 객체) / false(유효하지 않은 객체)
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
	 * Object를 찾아서 리턴한다.
	 * @ Parameter
	 *	objName : 객체 아이디
	 * @ Return
	 *	Object : ID가 일치하는 Object
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
	 * Select 박스에 특정값을 찾아 선택된 상태로 처리
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
	 * Select 박스에 선택된 값을 리턴 
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
	 * Select 박스에 선택된 텍스트를 리턴 
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
	 * Input 생성
	 * @ Parameter
	 *	oType : Input type(hidden, text ...)
	 *	oName : Input 이름
	 *	oValue : Input Object에 셋팅될 초기값
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
	 * 회원이름이 유효한지 확인한다.
	 * 이 함수는 본인 인증을 사용하므로 더이상 사용하지 않음
	 * =====================================================
	 */
	function isValid_name(str) {
		str = str.replace(/(^\s*)|(\s*$)/g, "");
		if( str == '' ){
			alert("이름을 입력하세요.");
			return false;
		}
		
		var retVal = checkSpace( str );
		
		if( retVal ){
			alert("이름은 띄어쓰기 없이 입력하세요.");
			return false;
		}
		
		if( !isHangul(str) ) {
			alert("이름을 정확하게 입력해 주세요.");
			return false;
		}
		if( str.length > 10 ) {
			alert("이름은 10자까지만 사용할 수 있습니다.");
			return false;
		}
		
		return true;
	}
	
	/**
	 * =====================================================
	 * 한글인지 확인 
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
	 * 비밀번호 유효성 검사 
	 * =====================================================
	 */
	function isValid_passwd(str) {
		var cnt = 0;
		
		if( str == ""){
			alert("비밀번호를 입력하세요.");
			return false;
		}
		
		/* check whether input value is included space or not  */
		var retVal = checkSpace( str );
		if( retVal ) {
			alert("비밀번호는 공백없이 입력해 주세요.");
			return false;
		}
		if( str.length < 6 ){
			alert("비밀번호는 6~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.");
			return false;
		}
		
		for( var i=0; i < str.length; ++i){
			if( str.charAt(0) == str.substring( i, i+1 ) ) ++cnt;
		}
		if( cnt == str.length ) {
			alert("안전도가 너무 낮습니다. 다른 비밀번호를 입력해 주세요.");
			return false;
		}
		
		var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{6,16}$/;
		if( !isPW.test(str) ) {
			alert("비밀번호는 6~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.");
			return false;
		}
		return true;
	}
	
	/**
	 * =====================================================
	 * 비밀번호 유효성 검사 
	 * =====================================================
	 */
	function isValid_email(str){
		/* check whether input value is included space or not  */
		if(str == ""){
			alert("이메일 주소를 입력해 주세요.");
			return false;
		}
		var retVal = checkSpace( str );
		if( retVal ) {
			alert("이메일주소를 정확하게 입력해 주세요..");
			return false;
		}
		
		if( -1 == str.indexOf('.') ) {
			alert("이메일 주소를 정확하게 입력해 주세요.");
			return false;
		}
		
		/* checkFormat */
		var isEmail = /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
		if( !isEmail.test(str) ) {
			alert("이메일 주소를 정확하게 입력해 주세요.");
			return false;
		}
		if( str.length > 60 ) {
			alert("이메일 주소를 정확하게 입력해 주세요.");
			return false;
		}
		
		return true;
	}
	
	/**
	 * =====================================================
	 * 이메일 마스킹 1 
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
	 * 이메일 마스킹 2
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
	 * 핸드폰 마스킹
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
	 * 일반전화 마스킹 
	 * =====================================================
	 */
	function maskPhone(mobile) {
		
		// '-' 구분자 제거
		mobile = mobile.split("-").join("").split(" ").join("");
		
		if(mobile==null || mobile.length==0 )
			return "";
		
		// @가 없으면 그냥 리턴 
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
	 * 핸드폰 split
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
	 * 공백이 입력되었는지 검사 
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
	 * 만 14세 미만 확인(생년월일로 비교)
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
	 * 행정소재지 - 시도 조회
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
	 * 행정소재지 - 시군구 조회
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
	 * 행정소재지 - 읍면동 조회
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
	 * 행정소재지 - 리 조회
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
	 * 학교목록 조회
	 * =====================================================
	 */
	function getSchoolList(){		
		if(findObject("selectSchoolSido").selectedIndex == 0){
			alert("시도를 선택하여 주세요.");
			return;
		}
		if(findObject("selectSchoolGubun").selectedIndex == 0){
			alert("구분을 선택하여 주세요.");
			return;
		}
		if(!isValidStr(findObject("inputSchoolNm").value)){
			alert("학교명을 입력하여 주세요.");
			return;
		}
		if(findObject("inputSchoolNm").value.length < 2){
			alert("학교명을 2자 이상 입력하여 주세요.");
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
	 * 형식검사 관련 함수
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
	 * 학교검색 팝업창 표시 
	 * Modified by CWYOO at 2012.08.28
	 * 레이어팝업 하단의 이미지 잘리는 현상 
	 * =====================================================
	 */
	function schoolChk(){
		removeAll(findObject("selectSchoolSido"));
		loadSido();
		
		// 표시될 팝업 오브젝트
		var layerObj = findObject("all_popup5");
		
		// 표시될 팝업창의 배경 오브젝트
		var layerBackObj = findObject("popupBackLayer");
		var scrollHeight = document.documentElement.scrollHeight;
		
		popupBackLayer.style.height = scrollHeight;
		layerObj.style.display="block";
	}
	
	
	/**
	 * =====================================================
	 * 조회된 학교목록으로 학교정보 html 생성
	 * =====================================================
	 */
	function makeSchoolList(noticeList) {
		
		var noticeDiv = findObject("schoolDiv");
		var header = '<table summary="" class="tb_popup1">';
		header += '<colgroup><col width="53px;"/><col width="103px;"/><col width="96px;"/><col/><col width="144px;"/></colgroup>';
		header += '<tbody><tr><th style="text-align:center">번호</th><th style="text-align:center">학교코드</th><th style="text-align:center">시도</th><th style="text-align:center">학교명</th><th style="text-align:center">구분</th></tr></tbody></table>';
		header += '<div class="table_scroll" style="height:400px;"><table summary="" class="tb_popup2"><caption></caption><colgroup><col width="53px;"/>';
		header += '<col width="103px;"/><col width="96px;"/><col/><col width="144px;"/></colgroup><tbody>';
		var footer = '</tbody></table>';	
		var list = "";
	    
	    
		if(noticeList==null || noticeList.length==0) {			
			list = "<tr>";
			list += "<td colspan='5' style='text-align:center'>검색한 조건과 일치하는 항목이 없습니다.</td>";
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
	 * 필수입력항목 체크 
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
	 * 앞/뒤에서 White Space가 제거된 값반환  
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
	 * 동영상 재생
	 * =====================================================
	 */
	function videoView(name){
		window.open(name,'video','toolbar=no,left=50,top=110,height=480,width=640');
	}
	