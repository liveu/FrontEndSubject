<%@ page language="java" contentType="text/html;charset=euc-kr" session="true" %>
<%@ include file="/jsp/include/user_session_check.jsp" %>
<%@ include file="/jsp/include/common_header.jsp" %>

		<section>
			<!-- m_view_mo -->
			<article class="m_view_mo subvisual2">
				<ul class="visual_man">
					<!--<li class="leftvisual_man"><img src="images/subvisual2_man_left.png" alt="태권도사람이미지" /></li>
					<li class="rightvisual_man"><img src="images/subvisual2_man_right.png" alt="약구선수이미지" /></li>//-->
				</ul>
			</article>
			<!-- //m_view_mo -->
			<div class="navigationbox">
				<div class="navigation">
					<dl>
						<dd class="first-child"><div><img src="images/home.gif" alt="홈"/></div></dd>
						<dd><div>참여신청</div></dd>
						<dd><div>학교참여신청</div></dd>
					</dl>
				</div>
			</div>
			<!-- m_view_mo -->
		</section>
		<section class="content">
			<!-- 왼쪽 메뉴 -->
			<nav class="leftmenuarea">
				<%@ include file="/jsp/include/common_left.jsp" %>
			</nav>
			<!-- //왼쪽 메뉴 -->	
			<!-- 컨텐츠 표시 -->
			<article id="viewcontent">
				<h1>학교참여신청</h1>
				<div id="viewcontent_sub">
					<div id="application_pop" class="application_pop">
						
		<form name="appForm" action="" method="post">
			<input type="hidden" name="kind" value="" />
			<input type="hidden" name="appId" value="" />
			<input type="hidden" name="appSeq" value="" />
			<input type="hidden" name="schoolType" value="" />
			<input type="hidden" name="schoolSex" value="" />
			<input type="hidden" name="approvalYn" value="" />
			<input type="hidden" name="approvalClassCd" value="" />
			<input type="hidden" name="orgSchoolCd" value="<%= _SESS_SCHOOL_CD %>" />
			<input type="hidden" name="orgSchoolNm" value="<%= _SESS_SCHOOL_NM %>" />
			<input type="hidden" name="orgSchoolSidoCd" value="<%= _SESS_SIDO_CD %>" />
			<input type="hidden" name="orgClassCd" value="<%= _SESS_CLASS_CD %>" />
			
			<input type="hidden" name="smsYn" value="" />
			<input type="hidden" name="emailYn" value="" />
			<input type="hidden" name="bannerYn" value="" />
			<input type="hidden" name="faxNo" value="" />
			<input type="hidden" name="groundType" value="" />
			<input type="hidden" name="gymYn" value="" />
			<input type="hidden" name="sidoCd" value="" />
			<input type="hidden" name="sigunCd" value="" />
			<input type="hidden" name="dongCd" value="" />
			<input type="hidden" name="riCd" value="" />		
			<input type="hidden" name="classCd1" value="" />
			<input type="hidden" name="classCd2" value="" />			
			<input type="hidden" name="classCd3" value="" />			
			<input type="hidden" name="classCd4" value="" />			
			<input type="hidden" name="classCd5" value="" />			
			<input type="hidden" name="sex1" value="" />
			<input type="hidden" name="sex2" value="" />			
			<input type="hidden" name="sex3" value="" />			
			<input type="hidden" name="sex4" value="" />			
			<input type="hidden" name="sex5" value="" />

		<table id="applicationtable" summary="학교별 지원 신청서 레이어팝업">
			<caption>학교별 지원 신청서</caption>
			<colgroup>
				<col width="100px">
				<col width="80px">
				<col width="146px">
				<col width="80px">
				<col width="146px">
				<col width="80px">
				<col width="148px">
			</colgroup>
			<tbody>
				<tr>
					<th scope="row" rowspan="3" class="th1 bordertop262626">신청자정보</th>
					<th scope="row" class="th2 bordertop262626"><font color="#ff0000">*</font> 이름</th>
					<td class="td1 bordertop262626"><input type="text" class="box" name="appNm" value="<%= _SESS_USER_NM %>" readonly></td>
					<th scope="row" class="th2 bordertop262626"><font color="#ff0000">*</font> 직위</th>
					<td class="td1 bordertop262626" colspan=3><input type="text" class="box"  name="positionNm" value=""></td>
				</tr>
				<tr>
					<th scope="row">연락처</th>
					<td><input type="text"  class="box" name="phoneNo" value="<%= _SESS_PHONE_NO %>" readonly></td>
					<th scope="row">핸드폰</th>
					<td colspan=3><input  class="box" type="text" name="mobileNo" value="<%= _SESS_MOBILE_NO %>" readonly></td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 이메일</th>
					<td colspan="5"><input  class="box" type="text" name="email" value="<%= _SESS_EMAIL %>" readonly></td>
				</tr>

				<tr>
					<th scope="row" rowspan="6" class="th1">학교정보</th>
					<th scope="row" class="th2"><font color="#ff0000">*</font> 학교명</th>
					<td class="td1" colspan=5>
						<!--<u class="mb10"><font color=058ccb><b><%= _SESS_SCHOOL_NM %>(<%= _SESS_SCHOOL_KIND_NM %>)</b> : 회원가입 시 선택한 학교정보입니다.</font></u>-->
						<input type="hidden" class="box" name="schoolCd" value="<%= _SESS_SCHOOL_CD %>" />
						<input type="hidden" class="box" name="schoolSidoCd" value="<%= _SESS_SIDO_CD %>" />
						<input type="hidden" class="box" name="schoolKindCd" value="" />
						<input type="text"  class="box" name="schoolNm" value="<%= _SESS_SCHOOL_NM %>" style="font-weight:bold; color:#058ccb;" class="width400" readonly><!--<input type="button" name="" class="btn" value="학교변경" onClick="javascript:schoolChk();" style="cursor:hand;">-->
						&nbsp;<font color="#058ccb"><b>(회원가입 시 선택한 학교정보입니다.)</b></font>
					</td>
				</tr>
				<tr>
					<td colspan=6>&nbsp;&nbsp;&nbsp;
							* 학교는 회원정보에서 변경하실 수 있습니다.
					</td>
				</tr>
				<!--
				<tr>
					<td colspan=6>
							* 학교를 변경하시려면 학교변경 버튼을 클릭하세요.
							<br />
							* 학교를 변경하면 회원정보에 등록된 학교도 함께 변경됩니다.
					</td>
				</tr>
				-->
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 학교주소</th>
					<td colspan=5>
							<input type="text" class="box"  name="schoolZipCode" value="" readonly maxlength="7"><input type="button" name="" class="btn" value="찾기" onclick="javascript:openNewAddress('SCHOOL_APP');" style="cursor:hand;">
							<br />
							<input type="text" class="box"  name="schoolAddr1" value="" readonly maxlength="60"><input type="text" class="box"  name="schoolAddr2" value="" maxlength="60">
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 학급수</th>
					<td>
							<input  class="box"  type="text" name="classCnt" value="" maxlength="4" onkeydown="CheckNumber();" title="전학년 학급수를 입력">
					</td>
					<th scope="row"><font color="#ff0000">*</font> 학생수</th>
					<td colspan=3>
							<input  class="box"  type="text" name="studentCnt" maxlength="4" onkeydown="CheckNumber();" title="학생수(전교생)을 입력">
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 시설현황</th>
					<td>
							<select name="selectGroundType" class="box" style="width:130px;">
								<option value="">==선택==</option>
								<option value="01">인조잔디</option>
								<option value="02">마사토</option>
								<option value="03">기타</option>
							</select>
					</td>
					<th scope="row"><font color="#ff0000">*</font> 체육관보유</th>
					<td colspan=3>
							<select name="selectGymYn" class="box" style="width:130px;">
								<option value="">==선택==</option>
								<option value="Y">보유</option>
								<option value="N">미보유</option>
							</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 교장</th>
					<td>
							<input type="text"  class="box" name="schoolLeaderNm" value="">
					</td>
					<th scope="row"><font color="#ff0000">*</font> 연락처</th>
					<td>
							<input type="text" class="box"  name="schoolPhoneNo" value="">
					</td>
					<th scope="row"><font color="#ff0000">*</font> 팩스</th>
					<td>
							<input type="text" class="box"  name="schoolFaxNo" value="">
					</td>
				</tr>
				<tr>
					<th scope="row" rowspan="2" class="th1">학교소재지<br />(행정구역)</th>
					<th scope="row" class="th2"><font color="#ff0000">*</font> 시도</th>
					<td class="td1">
						<select name="selectSido1" class="box" style="width:130px;vertical-align:middle;" onchange="javascript:changeSidoCd();">
							<option value="">==선택==</option>
						</select>
					</td>
					<th scope="row" class="th2"><font color="#ff0000">*</font> 시/군/구</th>
					<td class="td1" colspan=3>
							<select name="selectSigun1" class="box" style="width:130px;" onchange="javascript:changeSigunCd();">
								<option value="">==선택==</option>
							</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> 읍/면/동</th>
					<td>
							<select name="selectDong1" class="box" style="width:130px;" onchange="javascript:changeDongCd();">
								<option value="">==선택==</option>
							</select>
					</td>
					<th scope="row">리</th>
					<td colspan=3>
							<select name="selectRi1" class="box" style="width:130px;">
								<option value="">==선택==</option>
							</select>
					</td>
				</tr>

				<tr>
					<th scope="row" class="th1">회망종목</th>
					<td class="td1" colspan="7">

						<table>
						<tr>
							<th></th>
							<th align="center"><font color="#ff0000">*</font> 1순위</th>
							<th align="center">2순위</th>
							<th align="center">3순위</th>
							<th align="center">4순위</th>
							<th align="center">5순위</th>
						</tr>
						<tr height="20">
						<th scope="row">종목</th>
						<td id="tdClassCd1">
								<select name="selectClassCd1" class="box" style="width:110px;">
									<option value="">==선택==</option>
								</select>
						</td>
						<td id="tdClassCd2">
								<select name="selectClassCd2" class="box" style="width:110px;" disabled >
									<option value="">==선택==</option>
								</select>
						</td>
						<td id="tdClassCd3">
								<select name="selectClassCd3" class="box" style="width:110px;">
									<option value="">==선택==</option>
								</select>
						</td>
						<td id="tdClassCd4">
								<select name="selectClassCd4" class="box" style="width:110px;">
									<option value="">==선택==</option>
								</select>
						</td>
						<td id="tdClassCd5">
								<select name="selectClassCd5" class="box" style="width:110px;">
									<option value="">==선택==</option>
								</select>
						</td>
						</tr>
						<tr height="20">
							<th scope="row">희망날짜</th>
							<td><input type="text" name="reqDt1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" onkeydown="CheckNumber();" title="년월일 8자리를 입력 : 예)20140929"></td>
							<td><input type="text" name="reqDt2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="년월일 8자리를 입력 : 예)20140929"></td>
							<td><input type="text" name="reqDt3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="년월일 8자리를 입력 : 예)20140929"></td>
							<td><input type="text" name="reqDt4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="년월일 8자리를 입력 : 예)20140929"></td>
							<td><input type="text" name="reqDt5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="년월일 8자리를 입력 : 예)20140929"></td>
						</tr>
						<tr>
							<th scope="row">희망시간</th>
							<td><input type="text" name="reqTm1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" onkeydown="CheckNumber();" title="시간 4자리를 입력 : 예)오후 1시 30분 : 1330"></td>
							<td><input type="text" name="reqTm2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="시간 4자리를 입력 : 예)오후 1시 30분 : 1330"></td>
							<td><input type="text" name="reqTm3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="시간 4자리를 입력 : 예)오후 1시 30분 : 1330"></td>
							<td><input type="text" name="reqTm4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="시간 4자리를 입력 : 예)오후 1시 30분 : 1330"></td>
							<td><input type="text" name="reqTm5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="시간 4자리를 입력 : 예)오후 1시 30분 : 1330"></td>
						</tr>
						<tr>
							<th scope="row">스포츠스타</th>
							<td><input type="text" name="starNm1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" title="파견을 요청할 스포츠스타 이름을 입력"></td>
							<td><input type="text" name="starNm2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="파견을 요청할 스포츠스타 이름을 입력"></td>
							<td><input type="text" name="starNm3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="파견을 요청할 스포츠스타 이름을 입력"></td>
							<td><input type="text" name="starNm4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="파견을 요청할 스포츠스타 이름을 입력"></td>
							<td><input type="text" name="starNm5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="파견을 요청할 스포츠스타 이름을 입력"></td>
						</tr>
						<tr>
							<th scope="row">참가인원</th>
							<td><input type="text" name="studentCnt1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" onkeydown="CheckNumber();" title="선택한 종목에 참가할 인원을 입력"></td>
							<td><input type="text" name="studentCnt2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="선택한 종목에 참가할 인원을 입력"></td>
							<td><input type="text" name="studentCnt3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="선택한 종목에 참가할 인원을 입력"></td>
							<td><input type="text" name="studentCnt4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="선택한 종목에 참가할 인원을 입력"></td>
							<td><input type="text" name="studentCnt5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="선택한 종목에 참가할 인원을 입력"></td>
						</tr>
						<tr>
						<th scope="row">성별</th>
						<td>
								<select name="selectSex1" class="box" style="width:110px">
									<option value="">==선택==</option>
									<option value="M">남자</option>
									<option value="W">여자</option>
									<option value="X">혼성</option>
								</select>
						</td>
						<td>
								<select name="selectSex2" class="box" style="width:110px" disabled>
									<option value="">==선택==</option>
									<option value="M">남자</option>
									<option value="W">여자</option>
									<option value="X">혼성</option>
								</select>
						</td>
						<td>
								<select name="selectSex3" class="box" style="width:110px" disabled>
									<option value="">==선택==</option>
									<option value="M">남자</option>
									<option value="W">여자</option>
									<option value="X">혼성</option>
								</select>
						</td>
						<td>
								<select name="selectSex4" class="box" style="width:110px" disabled>
									<option value="">==선택==</option>
									<option value="M">남자</option>
									<option value="W">여자</option>
									<option value="X">혼성</option>
								</select>
						</td>
						<td>
								<select name="selectSex5" class="box" style="width:110px" disabled>
									<option value="">==선택==</option>
									<option value="M">남자</option>
									<option value="W">여자</option>
									<option value="X">혼성</option>
								</select>
						</td>
						</tr>
						</table>
					</td>
				</tr>
				<tr>
					<th scope="row" class="th1"><font color="#ff0000">*</font> 신청사유</th>
					<td class="td1" colspan="7"><textarea name="appReason" maxlength="1900"></textarea></td>
				</tr>
				<tr>
					<th scope="row" class="th1"><font color="#ff0000">*</font> 지원요청용품<br/>(스포츠용품)</th>
					<td class="td1" colspan="7"><textarea name="reqGoods" maxlength="1900"></textarea></td>
				</tr>
				<!--
				<tr name="insert_tr" id="insert_tr" >
					<td class="td1" colspan="8" align="center"><input type="button" name="insertBtn" id="insertBtn" value="저장" class="btn1" onClick="javascript:insertAppData()">
						<input type="button" name="" value="취소" class="btn2" onClick="javascript:cancelAppData()"></td>
				</tr>				
				
				-->
				<tr id="trInsert">
					<td colspan="8" align="center" style="display:block;">
							<input type="button" name="insertBtn" value="저장" class="btn1" onClick="javascript:insertAppData()">
							<input type="button" name="" value="취소" class="btn2" onClick="javascript:cancelAppData()">
					</td>
				</tr>
				<tr id="trUpdate" style="display:none;">
					<td colspan="7" align="center">
							<input type="button" name="updateBtn" value="수정" class="btn1" onClick="javascript:updateAppData()" >
							<input type="button" name="deleteBtn" value="삭제" class="btn1" onClick="javascript:deleteAppData()" >								
							<input type="button" name="" value="취소" class="btn2" onClick="javascript:cancelAppData()">
					</td>
				</tr>				
				
							
			</tbody>
		</table>
	</form>

					</div>
				</div>
			</article>
			<!-- // 컨텐츠 표시 -->
		</section>


<script language='javascript'>
<!--

	/**
	 * ==========================================
	 * 학교 선택
	 * ==========================================
	 */
	function confirmSchool2(schoolNm, schoolCd, sidoCd){		
		//alert(schoolNm + "/" + schoolCd + "/" + sidoCd);
		
		var frm = document.appForm;
		frm.schoolNm.value = schoolNm;
		frm.schoolCd.value = schoolCd;
		frm.schoolSidoCd.value = sidoCd;
		frm.sidoCd.value = sidoCd;
		frm.schoolType.value = schoolCd.substring(2,3);
		
		findObject("all_popup5").style.display="none";
	}
	
	/**
	 * ==========================================
	 * 종목 선택 select 박스가 변경되면
	 * 하위의 입력항목 disabled 처리 
	 * ==========================================
	 */
	function toggleEnable(idx) {
		//alert(idx);
		
		// 1순위 종목은 해당사항 없음
		if(idx==1)
			return;
		
		var selIdx = 1;		
		var frm = document.appForm;
		var obj = eval("frm.selectClassCd" + idx);
		var selClassCd = getSelectValue(obj);
		//alert(selClassCd);
		
		// 이전순위의 항목이 선택되지 않고 
		// 후순위의 항목이 선택되었을 경우 리턴
		for(selIdx=1; selIdx<idx; selIdx++) {
			var tmp = eval("frm.selectClassCd" + selIdx);
			//alert("[" + selIdx + "] " + getSelectValue(tmp));
			
			if(!isValidStr(getSelectValue(tmp))) {
				alert("희망종목은 1순위부터 순서대로 선택하셔야 합니다.");
				setSelectValue(obj, "");
				return;
			}
		}
		
		var objReqDt = eval("frm.reqDt" + idx);
		var objReqTm = eval("frm.reqTm" + idx);
		var objStarNm = eval("frm.starNm" + idx);
		var objStudentCnt = eval("frm.studentCnt" + idx);
		var objSex = eval("frm.selectSex" + idx);
		
		if(isValidStr(selClassCd)) {
			for(selIdx=1; selIdx<6; selIdx++) {
				// 현재 선택된 것과 동일한 항목은 skip
				if(idx==selIdx)
					continue;
				
				var tmp = eval("frm.selectClassCd" + selIdx);
				var val = getSelectValue(tmp);
				
				if(selClassCd==val) {
					alert("이미 선택한 종목을 다시 선택하셨습니다.");
					setSelectValue(obj, "");
					return;
				}
			}
			
			// 입력가능한 상태로 셋팅
			objReqDt.removeAttribute("disabled");
			objReqTm.removeAttribute("disabled");
			objStarNm.removeAttribute("disabled");
			objStudentCnt.removeAttribute("disabled");
			objSex.removeAttribute("disabled");
		} else {
			// 입력불가능한 상태로 셋팅
			objReqDt.setAttribute("disabled", true);
			objReqTm.setAttribute("disabled", true);
			objStarNm.setAttribute("disabled", true);
			objStudentCnt.setAttribute("disabled", true);
			objSex.setAttribute("disabled", true);
			
			// 입력된 값을 초기화 
			objReqDt.value = "";
			objReqTm.value = "";
			objStarNm.value = "";
			objStudentCnt.value = "";
			objSex.selectedIndex = 0;
		}
	}
	
	/**
	 * ================================================
	 * 신청서 작성을 클릭했을 경우 전처리 작업 수행 후 
	 * 신청폼 표시
	 * ================================================
	 */
	function preCheckApp() {
		var classList = loadClassList();
		if(classList==null || classList.length==0) {
			alert("종목정보를 조회할 수 없습니다.");
			return;
		}
		
		var frm = document.appForm;
		
		<% if(!_SESS_USER_GROUP.equals("S")) { %>
			alert("회원가입 시 학교를 선택한 사용자만 신청서를 작성할 수 있습니다.");
			location.href = "/<%= CONTEXT_NAME %>/index.do?kind=index";
			return;
		<% }  %>
		
		// ------------------------------------------
		// 학교 종목코드 셋팅 
		var msg = "";
		for(var idx=1; idx<6; idx++) {		
			msg = "<select name='selectClassCd" + idx + "' class='box' style='width:110px;' onChange='javascript:toggleEnable(" + idx + ");'>";
			msg += "	<option value=''>==선택==</option>";
			
			for(var sidx=0; sidx<classList.length; sidx++) {
				var row = classList[sidx];
				var classCd = row[0];
				var classNm = row[1];
				msg += "<option value='" + classCd + "'>" + classNm + "</option>";
			}
			msg += "</select>";
			eval("tdClassCd" + idx).innerHTML = msg;
		}
		
		// ------------------------------------------
		// 1. 모집 중인 신청건이 있는지 확인
		
		var rcode = -1;
		var sql = "SPOSTAR.APP.APPM.CHECK";
		var param = new Array();
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return;
		}
		if(ajaxobj.results==null || ajaxobj.results.length == 0 ){
			alert("현재 진행중인 스포츠스타 지원 사업이 없습니다. ");
			location.href ="/index.do?kind=index"
			return;
		}
		var appSeq = ajaxobj.results[0][0];	
		frm.appSeq.value = appSeq;
		
		// ------------------------------------------
		// 2. 해당 신청건에서 사용자가 로그인한 학교가 이미 등록되었는지 확인 
		rcode = -1;
		sql = "SPOSTAR.APP.APPD.APPINFO";
		param = new Array();
		param[param.length] = frm.appSeq.value;
		param[param.length] = "<%= _SESS_SCHOOL_CD%>";		
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return null;
		}
		var tmpA = ajaxobj.results;
		var schAppInfo = null;
		
		// ------------------------------------------
		// 3. 공통적으로 필요한 행정 소재지 시도 코드를 설정한다
		var sidoList = findSidoCd();	
		//alert("sidoList = " + sidoList );
		makeSidoOptionBox(sidoList);					

		// ------------------------------------------
		// 4. 이미 신청이 되었을 경우 신청내역을 조회하여 입력항목에 셋팅

		// 하단 저장 버튼을 활성화한다
		findObject("trInsert").style.display = "block";
		findObject("trUpdate").style.display = "none";
			
		if(tmpA.length > 0){
			schAppInfo = tmpA[0];
			
			// 하단 수정|삭제 버튼을 활성화한다
			findObject("trInsert").style.display = "none";
			findObject("trUpdate").style.display = "block";

			// 일반적인 값들 설정
			frm.appSeq.value					= schAppInfo[0];
			frm.schoolCd.value				= schAppInfo[1];
			frm.approvalYn.value			= schAppInfo[2];
			frm.approvalClassCd.value	= schAppInfo[3];
			frm.schoolType.value			= schAppInfo[4];
			
			frm.schoolSex.value				= schAppInfo[5];
			frm.sidoCd.value					= schAppInfo[6];
			frm.sigunCd.value				= schAppInfo[7];
			frm.dongCd.value					= schAppInfo[8];
			frm.riCd.value						= schAppInfo[9];
			
			frm.classCd1.value				= schAppInfo[10];
			frm.classCd2.value				= schAppInfo[11];
			frm.classCd3.value				= schAppInfo[12];
			frm.classCd4.value				= schAppInfo[13];
			frm.classCd5.value				= schAppInfo[14];
			
			frm.starNm1.value					= schAppInfo[15];
			frm.starNm2.value					= schAppInfo[16];
			frm.starNm3.value					= schAppInfo[17];
			frm.starNm4.value					= schAppInfo[18];
			frm.starNm5.value					= schAppInfo[19];
			
			frm.studentCnt1.value			= schAppInfo[20];
			frm.studentCnt2.value			= schAppInfo[21];
			frm.studentCnt3.value			= schAppInfo[22];
			frm.studentCnt4.value			= schAppInfo[23];
			frm.studentCnt5.value			= schAppInfo[24];
			
			frm.reqDt1.value					= schAppInfo[25];
			frm.reqDt2.value					= schAppInfo[26];
			frm.reqDt3.value					= schAppInfo[27];
			frm.reqDt4.value					= schAppInfo[28];
			frm.reqDt5.value					= schAppInfo[29];
			
			frm.reqTm1.value					= schAppInfo[30];
			frm.reqTm2.value					= schAppInfo[31];
			frm.reqTm3.value					= schAppInfo[32];
			frm.reqTm4.value					= schAppInfo[33];
			frm.reqTm5.value					= schAppInfo[34];
			
			frm.sex1.value						= schAppInfo[35];
			frm.sex2.value						= schAppInfo[36];
			frm.sex3.value						= schAppInfo[37];
			frm.sex4.value						= schAppInfo[38];
			frm.sex5.value						= schAppInfo[39];			
			
			frm.appId.value						= schAppInfo[40];
			frm.appNm.value					= schAppInfo[41];
			frm.mobileNo.value				= schAppInfo[42];
			frm.phoneNo.value				= schAppInfo[43];
			frm.faxNo.value						= schAppInfo[44];
			
			frm.email.value						= schAppInfo[45];
			frm.positionNm.value			= schAppInfo[46];
			frm.schoolLeaderNm.value	= schAppInfo[47];
			frm.schoolPhoneNo.value	= schAppInfo[48];
			frm.schoolFaxNo.value			= schAppInfo[49];
			
			frm.schoolZipCode.value		= schAppInfo[50];
			frm.schoolAddr1.value			= schAppInfo[51];
			frm.schoolAddr2.value			= schAppInfo[52];
			frm.groundType.value			= schAppInfo[53];
			frm.gymYn.value					= schAppInfo[54];
			
			frm.classCnt.value				= schAppInfo[55];
			frm.studentCnt.value				= schAppInfo[56];
			frm.bannerYn.value				= schAppInfo[57];
			frm.appReason.value			= schAppInfo[58];
			frm.reqGoods.value				= schAppInfo[59];
			
			frm.smsYn.value					= schAppInfo[60];
			frm.emailYn.value					= schAppInfo[61];
			frm.schoolNm.value				= schAppInfo[62];
			frm.schoolKindCd.value		= schAppInfo[63];
			
			
			// 일반적인 SelectBox 값들 설정	
			setSelectValue(frm.selectGroundType, frm.groundType.value);			
			setSelectValue(frm.selectGymYn, frm.gymYn.value);
			setSelectValue(frm.selectClassCd1, frm.classCd1.value);
			setSelectValue(frm.selectClassCd2, frm.classCd2.value);		
			setSelectValue(frm.selectClassCd3, frm.classCd3.value);			
			setSelectValue(frm.selectClassCd4, frm.classCd4.value);			
			setSelectValue(frm.selectClassCd5, frm.classCd5.value);			
			setSelectValue(frm.selectSex1, frm.sex1.value);
			setSelectValue(frm.selectSex2, frm.sex2.value);			
			setSelectValue(frm.selectSex3, frm.sex3.value);			
			setSelectValue(frm.selectSex4, frm.sex4.value);			
			setSelectValue(frm.selectSex5, frm.sex5.value);			
			
			// 선택된 종목에 따라 입력항목 활성화/비활성화 
			for(var idx=2; idx<6; idx++) {
				var objClass = eval("frm.classCd" + idx);
				var objDate = eval("frm.reqDt" + idx);
				var objTime = eval("frm.reqTm" + idx);
				var objStar = eval("frm.starNm" + idx);
				var objCnt = eval("frm.studentCnt" + idx);
				var objSex = eval("frm.selectSex" + idx);
				
				if(isValidStr(objClass.value)) {
					objDate.removeAttribute("disabled");
					objTime.removeAttribute("disabled");
					objStar.removeAttribute("disabled");
					objCnt.removeAttribute("disabled");
					objSex.removeAttribute("disabled");
				} else {
					objDate.setAttribute("disabled", true);
					objTime.setAttribute("disabled", true);
					objStar.setAttribute("disabled", true);
					objCnt.setAttribute("disabled", true);
					objSex.setAttribute("disabled", true);
				}
			}
			
			// 행정구역 값 셋팅 
			var tmpSidoCd 					= frm.sidoCd.value;
			var tmpSigunCd 				= frm.sigunCd.value;
			var tmpDongCd 				= frm.dongCd.value;
			var tmpRiCd 						= frm.riCd.value;
			setSelectValue(frm.selectSido1, tmpSidoCd);
			
			// 행정구역 - 시도코드 셋팅
			if (isValidStr(tmpSidoCd)) {
				var sigunList = findSigunCd(tmpSidoCd);
				
				makeSigunOptionBox(sigunList);
				initialDongOptionBox();
				initialRiOptionBox();
				setSelectValue(frm.selectSido1, tmpSidoCd);
				
				if (isValidStr(tmpSigunCd)) {
					var dongList = findDongCd(tmpSidoCd, tmpSigunCd);
					makeDongOptionBox(dongList);
					initialRiOptionBox();
					setSelectValue(frm.selectSigun1, tmpSigunCd);
					
					if (isValidStr(tmpDongCd)) {
						var riList = findRiCd(tmpSidoCd, tmpSigunCd,tmpDongCd);
						makeRiOptionBox(riList);
						setSelectValue(frm.selectDong1, tmpDongCd);
						setSelectValue(frm.selectRi1, tmpRiCd);						
					}
				}		
			}

		}
	}

	/**
	 * =================================================
	 * 학교참가신청 등록
	 * =================================================
	 */
	function insertAppData() {
		if (confirmAppData()) {

			var frm = document.appForm;		
			frm.kind.value = "insertSchApp";		
			frm.action = "/spostar/app.do";
			frm.submit();
		}
	}
	
	/**
	 * =================================================
	 * 학교참가신청 수정
	 * =================================================
	 */
	function updateAppData() {
		if (confirmAppData()) {
			var frm = document.appForm;		
			frm.kind.value = "updateSchApp";		
			frm.action = "/spostar/app.do";
			frm.submit();
		}		
	}	
	
	/**
	 * =================================================
	 * 학교참가신청 취소
	 * =================================================
	 */
	function deleteAppData() {
		if(!confirm("신청을 취소하시겠습니까?"))
			return;
		var frm = document.appForm;			
		frm.kind.value = "deleteSchApp";		
		frm.action = "/spostar/app.do";
		frm.submit();		
	}	
	
	/**
	 * =================================================
	 * 입력항목 검사
	 * =================================================
	 */
	function confirmAppData() {
	
		// 검사하는 로직 추가 필요
		var frm = document.appForm;
		
		// 모집중인 항목이 없을 경우 
		if(!isValidStr(frm.appSeq.value)) {
			alert("현재 신청이 진행중이지 않습니다.");
			return;
		}
		
		var schoolCd = "<%= _SESS_SCHOOL_CD %>";
		if(isValidStr(schoolCd)) {
			frm.schoolType.value = schoolCd.substring(2,3);
			//alert("school type : " + frm.schoolType.value);
		}
		
		// 필수 입력 항목 체크
		if(!requiredField(frm.appNm,"신청자 이름을 입력하세요.")) return false;
		if(!requiredField(frm.positionNm,"신청자 직위를 입력하세요.(예 : 지도교사, 체육부장)")) return false;
		if(!isValidStr(frm.mobileNo.value) && !isValidStr(frm.phoneNo.value)) {
			alert("연락처와 핸드폰 중 하나는 필수입력사항입니다.");
			frm.phoneNo.focus();
			return;
		}
		if(!requiredField(frm.email,"신청자 이메일을 입력하세요.")) return false;
		if(!requiredField(frm.schoolNm,"신청자 학교를 선택하세요.")) return false;
		
		if(!requiredField(frm.schoolZipCode, "학교주소를 선택하세요")) return false;
		if(!requiredField(frm.schoolAddr1, "학교주소를 선택하세요")) return false;
		if(!requiredField(frm.schoolAddr2, "학교주소를 선택하세요")) return false;
		if(!requiredField(frm.classCnt, "학급수를 입력하세요")) return false;
		if(!requiredField(frm.studentCnt, "전교학생수를 입력하세요")) return false;		
		if(!requiredField(frm.selectGroundType, "시설현황을 선택하세요")) return false;
		if(!requiredField(frm.selectGymYn, "체육관보유여부를 선택하세요")) return false;
		if(!requiredField(frm.schoolLeaderNm, "교장이름을 입력하세요")) return false;
		if(!requiredField(frm.schoolPhoneNo, "학교연락처를 입력하세요")) return false;
		if(!requiredField(frm.schoolFaxNo, "학교팩스번호를 입력하세요")) return false;
		
		if (getSelectValue(frm.selectSido1) == ""){
			alert("행정소재지 시도를 선택하세요.");
			frm.selectSido1.focus();
			return false;
		}	
		if (getSelectValue(frm.selectSigun1) == ""){
			alert("행정소재지 시군구를 선택하세요.");
			frm.selectSigun1.focus();
			return false;
		}
		if (getSelectValue(frm.selectDong1) == ""){
			alert("행정소재지 읍면동을 선택하세요.");
			frm.selectDong1.focus();
			return false;
		}
		
		// 희망종목1은 필수입력사항 
		if (getSelectValue(frm.selectClassCd1) == ""){
			alert("희망종목 1을 선택하세요.");
			frm.selectClassCd1.focus();
			return false;
		}
		
		if(!requiredField(frm.reqDt1,"희망종목 1의 희망일자를 입력하세요. 예)201년 09월 12일 : 20140912")) return false;
		if(!requiredField(frm.reqTm1,"희망종목 1의 희망시간을 입력하세요. 예)오후 1시 30분 : 1330")) return false;
		if(!requiredField(frm.starNm1,"희망종목 1의 스포츠스타를 입력하세요.")) return false;
		if(!requiredField(frm.studentCnt1,"희망종목 1의 참가인원을 입력하세요.")) return false;
		if(!requiredField(frm.selectSex1,"희망종목 1의 참가학생의 성별을 선택하세요")) return false;
		
		if (getSelectValue(frm.selectClassCd2) != ""){
			if(!requiredField(frm.reqDt2,"희망종목 2의 희망일자를 입력하세요. 예)201년 09월 12일 : 20140912")) return false;
			if(!requiredField(frm.reqTm2,"희망종목 2의 희망시간을 입력하세요. 예)오후 1시 30분 : 1330")) return false;
			if(!requiredField(frm.starNm2,"희망종목 2의 스포츠스타를 입력하세요.")) return false;
			if(!requiredField(frm.studentCnt2,"희망종목 2의 참가인원을 입력하세요.")) return false;
			if(!requiredField(frm.selectSex2,"희망종목 2의 참가학생의 성별을 선택하세요")) return false;
		}
		if (getSelectValue(frm.selectClassCd3) != ""){
			if(!requiredField(frm.reqDt3,"희망종목 3의 희망일자를 입력하세요. 예)201년 09월 12일 : 20140912")) return false;
			if(!requiredField(frm.reqTm3,"희망종목 3의 희망시간을 입력하세요. 예)오후 1시 30분 : 1330")) return false;
			if(!requiredField(frm.starNm3,"희망종목 3의 스포츠스타를 입력하세요.")) return false;
			if(!requiredField(frm.studentCnt3,"희망종목 3의 참가인원을 입력하세요.")) return false;
			if(!requiredField(frm.selectSex3,"희망종목 3의 참가학생의 성별을 선택하세요")) return false;
		}
		if (getSelectValue(frm.selectClassCd4) != ""){
			if(!requiredField(frm.reqDt4,"희망종목 4의 희망일자를 입력하세요. 예)201년 09월 12일 : 20140912")) return false;
			if(!requiredField(frm.reqTm4,"희망종목 4의 희망시간을 입력하세요. 예)오후 1시 30분 : 1330")) return false;
			if(!requiredField(frm.starNm4,"희망종목 4의 스포츠스타를 입력하세요.")) return false;
			if(!requiredField(frm.studentCnt4,"희망종목 4의 참가인원을 입력하세요.")) return false;
			if(!requiredField(frm.selectSex4,"희망종목 4의 참가학생의 성별을 선택하세요")) return false;
		}
		if (getSelectValue(frm.selectClassCd5) != ""){
			if(!requiredField(frm.reqDt5,"희망종목 5의 희망일자를 입력하세요. 예)201년 09월 12일 : 20140912")) return false;
			if(!requiredField(frm.reqTm5,"희망종목 5의 희망시간을 입력하세요. 예)오후 1시 30분 : 1330")) return false;
			if(!requiredField(frm.starNm5,"희망종목 5의 스포츠스타를 입력하세요.")) return false;
			if(!requiredField(frm.studentCnt5,"희망종목 5의 참가인원을 입력하세요.")) return false;
			if(!requiredField(frm.selectSex5,"희망종목 5의 참가학생의 성별을 선택하세요")) return false;
		}
		if(!requiredField(frm.appReason,"신청사유를 입력하세요.")) return false;
		if(!requiredField(frm.reqGoods,"지원요청용품을 입력하세요.")) return false;
		
				
		// 운동장종류
		frm.groundType.value 	= getSelectValue(frm.selectGroundType);
		// 체육관보유 여부
		frm.gymYn.value 		= getSelectValue(frm.selectGymYn);
		// 행정구역 - 시도
		frm.sidoCd.value 		= getSelectValue(frm.selectSido1);
		// 행정구역 - 시군구
		frm.sigunCd.value 		= getSelectValue(frm.selectSigun1);
		// 행정구역 - 읍면동
		frm.dongCd.value 		= getSelectValue(frm.selectDong1);
		// 행정구역 - 리
		frm.riCd.value 			= getSelectValue(frm.selectRi1);
		// 종목 - 1순위
		frm.classCd1.value 		= getSelectValue(frm.selectClassCd1);
		// 종목 - 2순위
		frm.classCd2.value 		= getSelectValue(frm.selectClassCd2);		
		// 종목 - 3순위
		frm.classCd3.value 		= getSelectValue(frm.selectClassCd3);			
		// 종목 - 4순위
		frm.classCd4.value 		= getSelectValue(frm.selectClassCd4);			
		// 종목 - 5순위
		frm.classCd5.value 		= getSelectValue(frm.selectClassCd5);
		// 성별 - 1순위
		frm.sex1.value 	= getSelectValue(frm.selectSex1);
		// 성별 - 2순위
		frm.sex2.value 	= getSelectValue(frm.selectSex2);			
		// 성별 -3순위
		frm.sex3.value 	= getSelectValue(frm.selectSex3);			
		// 성별 - 4순위
		frm.sex4.value 	= getSelectValue(frm.selectSex4);			
		// 성별 -5순위 
		frm.sex5.value 	= getSelectValue(frm.selectSex5);
			
		return true;
	}
	
	/**
	 * =================================================
	 * 행정소재지 Dynamic Option Box 만들기 
	 * =================================================
	 */
	function makeSidoOptionBox(sidoList) {
		var frm = document.appForm;
		
		initialSidoOptionBox();	
		for(i=0;i<sidoList.length;i++){
			newOpt = document.createElement("OPTION");
			newOpt.text = sidoList[i][1];
			newOpt.value = sidoList[i][0];
			frm.selectSido1.add(newOpt);
		}
	}
	function makeSigunOptionBox(sigunList) {
		initialSigunOptionBox();
		for(i=0;i<sigunList.length;i++){
			var frm = document.appForm;
			newOpt = document.createElement("OPTION");
			newOpt.text = sigunList[i][1];
			newOpt.value = sigunList[i][0];
			frm.selectSigun1.add(newOpt);
		}
	}
	function makeDongOptionBox(dongList) {
		initialDongOptionBox();
		
		for(i=0;i<dongList.length;i++){
			var frm = document.appForm;
			newOpt = document.createElement("OPTION");
			newOpt.text = dongList[i][1];
			newOpt.value = dongList[i][0];
			frm.selectDong1.add(newOpt);
		}
	}
	function makeRiOptionBox(riList) {
		initialRiOptionBox();
		
		for(i=0;i<riList.length;i++){
			var frm = document.appForm;
			newOpt = document.createElement("OPTION");
			newOpt.text = riList[i][1];
			newOpt.value = riList[i][0];
			frm.selectRi1.add(newOpt);
		}
	}
	/**
	 * =================================================
	 * 행정소재지 각 Box 초기화  
	 * =================================================
	 */	
	function initialSidoOptionBox() {
		var frm = document.appForm;
		obj = frm.selectSido1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==선택==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialSigunOptionBox() {
		var frm = document.appForm;
		obj = frm.selectSigun1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==선택==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialDongOptionBox() {	
		var frm = document.appForm;
		obj = frm.selectDong1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==선택==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialRiOptionBox() {
		var frm = document.appForm;
		obj = frm.selectRi1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==선택==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}	 
	
	/**
	 * =================================================
	 * 행정소재지 - 시도가 변경되었을 경우 처리
	 * =================================================
	 */
	function changeSidoCd() {	
		var frm = document.appForm;
		var tmpSidoCd = getSelectValue(frm.selectSido1);
		
		frm.sidoCd.value = tmpSidoCd;			
		var sigunList = findSigunCd(tmpSidoCd);

		makeSigunOptionBox(sigunList);
		initialDongOptionBox();
		initialRiOptionBox();
	}
	
	/**
	 * =================================================
	 * 행정소재지 - 시군구가 변경되었을 경우 처리
	 * =================================================
	 */
	function changeSigunCd() {
		var frm = document.appForm;
		var tmpSidoCd = getSelectValue(frm.selectSido1);
		var tmpSigunCd = getSelectValue(frm.selectSigun1);
		
		frm.sigunCd.value = tmpSigunCd;					
		var dongList = findDongCd(tmpSidoCd, tmpSigunCd);

		makeDongOptionBox(dongList);
		initialRiOptionBox();
	}
	
	/**
	 * =================================================
	 * 행정소재지 - 읍면동이 변경되었을 경우 처리
	 * =================================================
	 */
	function changeDongCd() {
		var frm = document.appForm;
		var tmpSidoCd = getSelectValue(frm.selectSido1);
		var tmpSigunCd = getSelectValue(frm.selectSigun1);
		var tmpDongCd = getSelectValue(frm.selectDong1);		
			
		frm.dongCd.value = tmpDongCd;			
		var riList = findRiCd(tmpSidoCd, tmpSigunCd, tmpDongCd);
	
		makeRiOptionBox(riList);
	}
	
	/**
	 * =================================================
	 * 입력항목 취소
	 * =================================================
	 */
	function cancelAppData() {
		if(!confirm("신청을 취소하시겠습니까?"))
			return;
		
		$(".application_pop_close").trigger("click");
	}
	
	//-------------------------------------
	// 신청 초기화 작업
	//-------------------------------------
	preCheckApp();
-->
</script>

<%//@ include file="/jsp/include/schoolPopup.jsp" %>		
<%@ include file="/jsp/include/common_footer.jsp" %>