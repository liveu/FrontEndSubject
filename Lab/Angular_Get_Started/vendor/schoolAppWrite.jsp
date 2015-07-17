<%@ page language="java" contentType="text/html;charset=euc-kr" session="true" %>
<%@ include file="/jsp/include/user_session_check.jsp" %>
<%@ include file="/jsp/include/common_header.jsp" %>

		<section>
			<!-- m_view_mo -->
			<article class="m_view_mo subvisual2">
				<ul class="visual_man">
					<!--<li class="leftvisual_man"><img src="images/subvisual2_man_left.png" alt="�±ǵ�����̹���" /></li>
					<li class="rightvisual_man"><img src="images/subvisual2_man_right.png" alt="�౸�����̹���" /></li>//-->
				</ul>
			</article>
			<!-- //m_view_mo -->
			<div class="navigationbox">
				<div class="navigation">
					<dl>
						<dd class="first-child"><div><img src="images/home.gif" alt="Ȩ"/></div></dd>
						<dd><div>������û</div></dd>
						<dd><div>�б�������û</div></dd>
					</dl>
				</div>
			</div>
			<!-- m_view_mo -->
		</section>
		<section class="content">
			<!-- ���� �޴� -->
			<nav class="leftmenuarea">
				<%@ include file="/jsp/include/common_left.jsp" %>
			</nav>
			<!-- //���� �޴� -->	
			<!-- ������ ǥ�� -->
			<article id="viewcontent">
				<h1>�б�������û</h1>
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

		<table id="applicationtable" summary="�б��� ���� ��û�� ���̾��˾�">
			<caption>�б��� ���� ��û��</caption>
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
					<th scope="row" rowspan="3" class="th1 bordertop262626">��û������</th>
					<th scope="row" class="th2 bordertop262626"><font color="#ff0000">*</font> �̸�</th>
					<td class="td1 bordertop262626"><input type="text" class="box" name="appNm" value="<%= _SESS_USER_NM %>" readonly></td>
					<th scope="row" class="th2 bordertop262626"><font color="#ff0000">*</font> ����</th>
					<td class="td1 bordertop262626" colspan=3><input type="text" class="box"  name="positionNm" value=""></td>
				</tr>
				<tr>
					<th scope="row">����ó</th>
					<td><input type="text"  class="box" name="phoneNo" value="<%= _SESS_PHONE_NO %>" readonly></td>
					<th scope="row">�ڵ���</th>
					<td colspan=3><input  class="box" type="text" name="mobileNo" value="<%= _SESS_MOBILE_NO %>" readonly></td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> �̸���</th>
					<td colspan="5"><input  class="box" type="text" name="email" value="<%= _SESS_EMAIL %>" readonly></td>
				</tr>

				<tr>
					<th scope="row" rowspan="6" class="th1">�б�����</th>
					<th scope="row" class="th2"><font color="#ff0000">*</font> �б���</th>
					<td class="td1" colspan=5>
						<!--<u class="mb10"><font color=058ccb><b><%= _SESS_SCHOOL_NM %>(<%= _SESS_SCHOOL_KIND_NM %>)</b> : ȸ������ �� ������ �б������Դϴ�.</font></u>-->
						<input type="hidden" class="box" name="schoolCd" value="<%= _SESS_SCHOOL_CD %>" />
						<input type="hidden" class="box" name="schoolSidoCd" value="<%= _SESS_SIDO_CD %>" />
						<input type="hidden" class="box" name="schoolKindCd" value="" />
						<input type="text"  class="box" name="schoolNm" value="<%= _SESS_SCHOOL_NM %>" style="font-weight:bold; color:#058ccb;" class="width400" readonly><!--<input type="button" name="" class="btn" value="�б�����" onClick="javascript:schoolChk();" style="cursor:hand;">-->
						&nbsp;<font color="#058ccb"><b>(ȸ������ �� ������ �б������Դϴ�.)</b></font>
					</td>
				</tr>
				<tr>
					<td colspan=6>&nbsp;&nbsp;&nbsp;
							* �б��� ȸ���������� �����Ͻ� �� �ֽ��ϴ�.
					</td>
				</tr>
				<!--
				<tr>
					<td colspan=6>
							* �б��� �����Ͻ÷��� �б����� ��ư�� Ŭ���ϼ���.
							<br />
							* �б��� �����ϸ� ȸ�������� ��ϵ� �б��� �Բ� ����˴ϴ�.
					</td>
				</tr>
				-->
				<tr>
					<th scope="row"><font color="#ff0000">*</font> �б��ּ�</th>
					<td colspan=5>
							<input type="text" class="box"  name="schoolZipCode" value="" readonly maxlength="7"><input type="button" name="" class="btn" value="ã��" onclick="javascript:openNewAddress('SCHOOL_APP');" style="cursor:hand;">
							<br />
							<input type="text" class="box"  name="schoolAddr1" value="" readonly maxlength="60"><input type="text" class="box"  name="schoolAddr2" value="" maxlength="60">
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> �б޼�</th>
					<td>
							<input  class="box"  type="text" name="classCnt" value="" maxlength="4" onkeydown="CheckNumber();" title="���г� �б޼��� �Է�">
					</td>
					<th scope="row"><font color="#ff0000">*</font> �л���</th>
					<td colspan=3>
							<input  class="box"  type="text" name="studentCnt" maxlength="4" onkeydown="CheckNumber();" title="�л���(������)�� �Է�">
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> �ü���Ȳ</th>
					<td>
							<select name="selectGroundType" class="box" style="width:130px;">
								<option value="">==����==</option>
								<option value="01">�����ܵ�</option>
								<option value="02">������</option>
								<option value="03">��Ÿ</option>
							</select>
					</td>
					<th scope="row"><font color="#ff0000">*</font> ü��������</th>
					<td colspan=3>
							<select name="selectGymYn" class="box" style="width:130px;">
								<option value="">==����==</option>
								<option value="Y">����</option>
								<option value="N">�̺���</option>
							</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> ����</th>
					<td>
							<input type="text"  class="box" name="schoolLeaderNm" value="">
					</td>
					<th scope="row"><font color="#ff0000">*</font> ����ó</th>
					<td>
							<input type="text" class="box"  name="schoolPhoneNo" value="">
					</td>
					<th scope="row"><font color="#ff0000">*</font> �ѽ�</th>
					<td>
							<input type="text" class="box"  name="schoolFaxNo" value="">
					</td>
				</tr>
				<tr>
					<th scope="row" rowspan="2" class="th1">�б�������<br />(��������)</th>
					<th scope="row" class="th2"><font color="#ff0000">*</font> �õ�</th>
					<td class="td1">
						<select name="selectSido1" class="box" style="width:130px;vertical-align:middle;" onchange="javascript:changeSidoCd();">
							<option value="">==����==</option>
						</select>
					</td>
					<th scope="row" class="th2"><font color="#ff0000">*</font> ��/��/��</th>
					<td class="td1" colspan=3>
							<select name="selectSigun1" class="box" style="width:130px;" onchange="javascript:changeSigunCd();">
								<option value="">==����==</option>
							</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><font color="#ff0000">*</font> ��/��/��</th>
					<td>
							<select name="selectDong1" class="box" style="width:130px;" onchange="javascript:changeDongCd();">
								<option value="">==����==</option>
							</select>
					</td>
					<th scope="row">��</th>
					<td colspan=3>
							<select name="selectRi1" class="box" style="width:130px;">
								<option value="">==����==</option>
							</select>
					</td>
				</tr>

				<tr>
					<th scope="row" class="th1">ȸ������</th>
					<td class="td1" colspan="7">

						<table>
						<tr>
							<th></th>
							<th align="center"><font color="#ff0000">*</font> 1����</th>
							<th align="center">2����</th>
							<th align="center">3����</th>
							<th align="center">4����</th>
							<th align="center">5����</th>
						</tr>
						<tr height="20">
						<th scope="row">����</th>
						<td id="tdClassCd1">
								<select name="selectClassCd1" class="box" style="width:110px;">
									<option value="">==����==</option>
								</select>
						</td>
						<td id="tdClassCd2">
								<select name="selectClassCd2" class="box" style="width:110px;" disabled >
									<option value="">==����==</option>
								</select>
						</td>
						<td id="tdClassCd3">
								<select name="selectClassCd3" class="box" style="width:110px;">
									<option value="">==����==</option>
								</select>
						</td>
						<td id="tdClassCd4">
								<select name="selectClassCd4" class="box" style="width:110px;">
									<option value="">==����==</option>
								</select>
						</td>
						<td id="tdClassCd5">
								<select name="selectClassCd5" class="box" style="width:110px;">
									<option value="">==����==</option>
								</select>
						</td>
						</tr>
						<tr height="20">
							<th scope="row">�����¥</th>
							<td><input type="text" name="reqDt1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" onkeydown="CheckNumber();" title="����� 8�ڸ��� �Է� : ��)20140929"></td>
							<td><input type="text" name="reqDt2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="����� 8�ڸ��� �Է� : ��)20140929"></td>
							<td><input type="text" name="reqDt3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="����� 8�ڸ��� �Է� : ��)20140929"></td>
							<td><input type="text" name="reqDt4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="����� 8�ڸ��� �Է� : ��)20140929"></td>
							<td><input type="text" name="reqDt5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="����� 8�ڸ��� �Է� : ��)20140929"></td>
						</tr>
						<tr>
							<th scope="row">����ð�</th>
							<td><input type="text" name="reqTm1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" onkeydown="CheckNumber();" title="�ð� 4�ڸ��� �Է� : ��)���� 1�� 30�� : 1330"></td>
							<td><input type="text" name="reqTm2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="�ð� 4�ڸ��� �Է� : ��)���� 1�� 30�� : 1330"></td>
							<td><input type="text" name="reqTm3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="�ð� 4�ڸ��� �Է� : ��)���� 1�� 30�� : 1330"></td>
							<td><input type="text" name="reqTm4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="�ð� 4�ڸ��� �Է� : ��)���� 1�� 30�� : 1330"></td>
							<td><input type="text" name="reqTm5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="4" disabled title="�ð� 4�ڸ��� �Է� : ��)���� 1�� 30�� : 1330"></td>
						</tr>
						<tr>
							<th scope="row">��������Ÿ</th>
							<td><input type="text" name="starNm1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" title="�İ��� ��û�� ��������Ÿ �̸��� �Է�"></td>
							<td><input type="text" name="starNm2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="�İ��� ��û�� ��������Ÿ �̸��� �Է�"></td>
							<td><input type="text" name="starNm3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="�İ��� ��û�� ��������Ÿ �̸��� �Է�"></td>
							<td><input type="text" name="starNm4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="�İ��� ��û�� ��������Ÿ �̸��� �Է�"></td>
							<td><input type="text" name="starNm5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled title="�İ��� ��û�� ��������Ÿ �̸��� �Է�"></td>
						</tr>
						<tr>
							<th scope="row">�����ο�</th>
							<td><input type="text" name="studentCnt1" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" onkeydown="CheckNumber();" title="������ ���� ������ �ο��� �Է�"></td>
							<td><input type="text" name="studentCnt2" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="������ ���� ������ �ο��� �Է�"></td>
							<td><input type="text" name="studentCnt3" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="������ ���� ������ �ο��� �Է�"></td>
							<td><input type="text" name="studentCnt4" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="������ ���� ������ �ο��� �Է�"></td>
							<td><input type="text" name="studentCnt5" value="" class="width70" style="width:110px; height:20px;line-height:2.0em;" maxlength="8" disabled onkeydown="CheckNumber();" title="������ ���� ������ �ο��� �Է�"></td>
						</tr>
						<tr>
						<th scope="row">����</th>
						<td>
								<select name="selectSex1" class="box" style="width:110px">
									<option value="">==����==</option>
									<option value="M">����</option>
									<option value="W">����</option>
									<option value="X">ȥ��</option>
								</select>
						</td>
						<td>
								<select name="selectSex2" class="box" style="width:110px" disabled>
									<option value="">==����==</option>
									<option value="M">����</option>
									<option value="W">����</option>
									<option value="X">ȥ��</option>
								</select>
						</td>
						<td>
								<select name="selectSex3" class="box" style="width:110px" disabled>
									<option value="">==����==</option>
									<option value="M">����</option>
									<option value="W">����</option>
									<option value="X">ȥ��</option>
								</select>
						</td>
						<td>
								<select name="selectSex4" class="box" style="width:110px" disabled>
									<option value="">==����==</option>
									<option value="M">����</option>
									<option value="W">����</option>
									<option value="X">ȥ��</option>
								</select>
						</td>
						<td>
								<select name="selectSex5" class="box" style="width:110px" disabled>
									<option value="">==����==</option>
									<option value="M">����</option>
									<option value="W">����</option>
									<option value="X">ȥ��</option>
								</select>
						</td>
						</tr>
						</table>
					</td>
				</tr>
				<tr>
					<th scope="row" class="th1"><font color="#ff0000">*</font> ��û����</th>
					<td class="td1" colspan="7"><textarea name="appReason" maxlength="1900"></textarea></td>
				</tr>
				<tr>
					<th scope="row" class="th1"><font color="#ff0000">*</font> ������û��ǰ<br/>(��������ǰ)</th>
					<td class="td1" colspan="7"><textarea name="reqGoods" maxlength="1900"></textarea></td>
				</tr>
				<!--
				<tr name="insert_tr" id="insert_tr" >
					<td class="td1" colspan="8" align="center"><input type="button" name="insertBtn" id="insertBtn" value="����" class="btn1" onClick="javascript:insertAppData()">
						<input type="button" name="" value="���" class="btn2" onClick="javascript:cancelAppData()"></td>
				</tr>				
				
				-->
				<tr id="trInsert">
					<td colspan="8" align="center" style="display:block;">
							<input type="button" name="insertBtn" value="����" class="btn1" onClick="javascript:insertAppData()">
							<input type="button" name="" value="���" class="btn2" onClick="javascript:cancelAppData()">
					</td>
				</tr>
				<tr id="trUpdate" style="display:none;">
					<td colspan="7" align="center">
							<input type="button" name="updateBtn" value="����" class="btn1" onClick="javascript:updateAppData()" >
							<input type="button" name="deleteBtn" value="����" class="btn1" onClick="javascript:deleteAppData()" >								
							<input type="button" name="" value="���" class="btn2" onClick="javascript:cancelAppData()">
					</td>
				</tr>				
				
							
			</tbody>
		</table>
	</form>

					</div>
				</div>
			</article>
			<!-- // ������ ǥ�� -->
		</section>


<script language='javascript'>
<!--

	/**
	 * ==========================================
	 * �б� ����
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
	 * ���� ���� select �ڽ��� ����Ǹ�
	 * ������ �Է��׸� disabled ó�� 
	 * ==========================================
	 */
	function toggleEnable(idx) {
		//alert(idx);
		
		// 1���� ������ �ش���� ����
		if(idx==1)
			return;
		
		var selIdx = 1;		
		var frm = document.appForm;
		var obj = eval("frm.selectClassCd" + idx);
		var selClassCd = getSelectValue(obj);
		//alert(selClassCd);
		
		// ���������� �׸��� ���õ��� �ʰ� 
		// �ļ����� �׸��� ���õǾ��� ��� ����
		for(selIdx=1; selIdx<idx; selIdx++) {
			var tmp = eval("frm.selectClassCd" + selIdx);
			//alert("[" + selIdx + "] " + getSelectValue(tmp));
			
			if(!isValidStr(getSelectValue(tmp))) {
				alert("��������� 1�������� ������� �����ϼž� �մϴ�.");
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
				// ���� ���õ� �Ͱ� ������ �׸��� skip
				if(idx==selIdx)
					continue;
				
				var tmp = eval("frm.selectClassCd" + selIdx);
				var val = getSelectValue(tmp);
				
				if(selClassCd==val) {
					alert("�̹� ������ ������ �ٽ� �����ϼ̽��ϴ�.");
					setSelectValue(obj, "");
					return;
				}
			}
			
			// �Է°����� ���·� ����
			objReqDt.removeAttribute("disabled");
			objReqTm.removeAttribute("disabled");
			objStarNm.removeAttribute("disabled");
			objStudentCnt.removeAttribute("disabled");
			objSex.removeAttribute("disabled");
		} else {
			// �ԷºҰ����� ���·� ����
			objReqDt.setAttribute("disabled", true);
			objReqTm.setAttribute("disabled", true);
			objStarNm.setAttribute("disabled", true);
			objStudentCnt.setAttribute("disabled", true);
			objSex.setAttribute("disabled", true);
			
			// �Էµ� ���� �ʱ�ȭ 
			objReqDt.value = "";
			objReqTm.value = "";
			objStarNm.value = "";
			objStudentCnt.value = "";
			objSex.selectedIndex = 0;
		}
	}
	
	/**
	 * ================================================
	 * ��û�� �ۼ��� Ŭ������ ��� ��ó�� �۾� ���� �� 
	 * ��û�� ǥ��
	 * ================================================
	 */
	function preCheckApp() {
		var classList = loadClassList();
		if(classList==null || classList.length==0) {
			alert("���������� ��ȸ�� �� �����ϴ�.");
			return;
		}
		
		var frm = document.appForm;
		
		<% if(!_SESS_USER_GROUP.equals("S")) { %>
			alert("ȸ������ �� �б��� ������ ����ڸ� ��û���� �ۼ��� �� �ֽ��ϴ�.");
			location.href = "/<%= CONTEXT_NAME %>/index.do?kind=index";
			return;
		<% }  %>
		
		// ------------------------------------------
		// �б� �����ڵ� ���� 
		var msg = "";
		for(var idx=1; idx<6; idx++) {		
			msg = "<select name='selectClassCd" + idx + "' class='box' style='width:110px;' onChange='javascript:toggleEnable(" + idx + ");'>";
			msg += "	<option value=''>==����==</option>";
			
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
		// 1. ���� ���� ��û���� �ִ��� Ȯ��
		
		var rcode = -1;
		var sql = "SPOSTAR.APP.APPM.CHECK";
		var param = new Array();
		rcode = ajaxobj.HR_SELECTINTO(dbname ,sql ,param ,true);
		if(rcode<0){
			alert(ajaxobj.errmsg);
			return;
		}
		if(ajaxobj.results==null || ajaxobj.results.length == 0 ){
			alert("���� �������� ��������Ÿ ���� ����� �����ϴ�. ");
			location.href ="/index.do?kind=index"
			return;
		}
		var appSeq = ajaxobj.results[0][0];	
		frm.appSeq.value = appSeq;
		
		// ------------------------------------------
		// 2. �ش� ��û�ǿ��� ����ڰ� �α����� �б��� �̹� ��ϵǾ����� Ȯ�� 
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
		// 3. ���������� �ʿ��� ���� ������ �õ� �ڵ带 �����Ѵ�
		var sidoList = findSidoCd();	
		//alert("sidoList = " + sidoList );
		makeSidoOptionBox(sidoList);					

		// ------------------------------------------
		// 4. �̹� ��û�� �Ǿ��� ��� ��û������ ��ȸ�Ͽ� �Է��׸� ����

		// �ϴ� ���� ��ư�� Ȱ��ȭ�Ѵ�
		findObject("trInsert").style.display = "block";
		findObject("trUpdate").style.display = "none";
			
		if(tmpA.length > 0){
			schAppInfo = tmpA[0];
			
			// �ϴ� ����|���� ��ư�� Ȱ��ȭ�Ѵ�
			findObject("trInsert").style.display = "none";
			findObject("trUpdate").style.display = "block";

			// �Ϲ����� ���� ����
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
			
			
			// �Ϲ����� SelectBox ���� ����	
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
			
			// ���õ� ���� ���� �Է��׸� Ȱ��ȭ/��Ȱ��ȭ 
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
			
			// �������� �� ���� 
			var tmpSidoCd 					= frm.sidoCd.value;
			var tmpSigunCd 				= frm.sigunCd.value;
			var tmpDongCd 				= frm.dongCd.value;
			var tmpRiCd 						= frm.riCd.value;
			setSelectValue(frm.selectSido1, tmpSidoCd);
			
			// �������� - �õ��ڵ� ����
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
	 * �б�������û ���
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
	 * �б�������û ����
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
	 * �б�������û ���
	 * =================================================
	 */
	function deleteAppData() {
		if(!confirm("��û�� ����Ͻðڽ��ϱ�?"))
			return;
		var frm = document.appForm;			
		frm.kind.value = "deleteSchApp";		
		frm.action = "/spostar/app.do";
		frm.submit();		
	}	
	
	/**
	 * =================================================
	 * �Է��׸� �˻�
	 * =================================================
	 */
	function confirmAppData() {
	
		// �˻��ϴ� ���� �߰� �ʿ�
		var frm = document.appForm;
		
		// �������� �׸��� ���� ��� 
		if(!isValidStr(frm.appSeq.value)) {
			alert("���� ��û�� ���������� �ʽ��ϴ�.");
			return;
		}
		
		var schoolCd = "<%= _SESS_SCHOOL_CD %>";
		if(isValidStr(schoolCd)) {
			frm.schoolType.value = schoolCd.substring(2,3);
			//alert("school type : " + frm.schoolType.value);
		}
		
		// �ʼ� �Է� �׸� üũ
		if(!requiredField(frm.appNm,"��û�� �̸��� �Է��ϼ���.")) return false;
		if(!requiredField(frm.positionNm,"��û�� ������ �Է��ϼ���.(�� : ��������, ü������)")) return false;
		if(!isValidStr(frm.mobileNo.value) && !isValidStr(frm.phoneNo.value)) {
			alert("����ó�� �ڵ��� �� �ϳ��� �ʼ��Է»����Դϴ�.");
			frm.phoneNo.focus();
			return;
		}
		if(!requiredField(frm.email,"��û�� �̸����� �Է��ϼ���.")) return false;
		if(!requiredField(frm.schoolNm,"��û�� �б��� �����ϼ���.")) return false;
		
		if(!requiredField(frm.schoolZipCode, "�б��ּҸ� �����ϼ���")) return false;
		if(!requiredField(frm.schoolAddr1, "�б��ּҸ� �����ϼ���")) return false;
		if(!requiredField(frm.schoolAddr2, "�б��ּҸ� �����ϼ���")) return false;
		if(!requiredField(frm.classCnt, "�б޼��� �Է��ϼ���")) return false;
		if(!requiredField(frm.studentCnt, "�����л����� �Է��ϼ���")) return false;		
		if(!requiredField(frm.selectGroundType, "�ü���Ȳ�� �����ϼ���")) return false;
		if(!requiredField(frm.selectGymYn, "ü�����������θ� �����ϼ���")) return false;
		if(!requiredField(frm.schoolLeaderNm, "�����̸��� �Է��ϼ���")) return false;
		if(!requiredField(frm.schoolPhoneNo, "�б�����ó�� �Է��ϼ���")) return false;
		if(!requiredField(frm.schoolFaxNo, "�б��ѽ���ȣ�� �Է��ϼ���")) return false;
		
		if (getSelectValue(frm.selectSido1) == ""){
			alert("���������� �õ��� �����ϼ���.");
			frm.selectSido1.focus();
			return false;
		}	
		if (getSelectValue(frm.selectSigun1) == ""){
			alert("���������� �ñ����� �����ϼ���.");
			frm.selectSigun1.focus();
			return false;
		}
		if (getSelectValue(frm.selectDong1) == ""){
			alert("���������� ���鵿�� �����ϼ���.");
			frm.selectDong1.focus();
			return false;
		}
		
		// �������1�� �ʼ��Է»��� 
		if (getSelectValue(frm.selectClassCd1) == ""){
			alert("������� 1�� �����ϼ���.");
			frm.selectClassCd1.focus();
			return false;
		}
		
		if(!requiredField(frm.reqDt1,"������� 1�� ������ڸ� �Է��ϼ���. ��)201�� 09�� 12�� : 20140912")) return false;
		if(!requiredField(frm.reqTm1,"������� 1�� ����ð��� �Է��ϼ���. ��)���� 1�� 30�� : 1330")) return false;
		if(!requiredField(frm.starNm1,"������� 1�� ��������Ÿ�� �Է��ϼ���.")) return false;
		if(!requiredField(frm.studentCnt1,"������� 1�� �����ο��� �Է��ϼ���.")) return false;
		if(!requiredField(frm.selectSex1,"������� 1�� �����л��� ������ �����ϼ���")) return false;
		
		if (getSelectValue(frm.selectClassCd2) != ""){
			if(!requiredField(frm.reqDt2,"������� 2�� ������ڸ� �Է��ϼ���. ��)201�� 09�� 12�� : 20140912")) return false;
			if(!requiredField(frm.reqTm2,"������� 2�� ����ð��� �Է��ϼ���. ��)���� 1�� 30�� : 1330")) return false;
			if(!requiredField(frm.starNm2,"������� 2�� ��������Ÿ�� �Է��ϼ���.")) return false;
			if(!requiredField(frm.studentCnt2,"������� 2�� �����ο��� �Է��ϼ���.")) return false;
			if(!requiredField(frm.selectSex2,"������� 2�� �����л��� ������ �����ϼ���")) return false;
		}
		if (getSelectValue(frm.selectClassCd3) != ""){
			if(!requiredField(frm.reqDt3,"������� 3�� ������ڸ� �Է��ϼ���. ��)201�� 09�� 12�� : 20140912")) return false;
			if(!requiredField(frm.reqTm3,"������� 3�� ����ð��� �Է��ϼ���. ��)���� 1�� 30�� : 1330")) return false;
			if(!requiredField(frm.starNm3,"������� 3�� ��������Ÿ�� �Է��ϼ���.")) return false;
			if(!requiredField(frm.studentCnt3,"������� 3�� �����ο��� �Է��ϼ���.")) return false;
			if(!requiredField(frm.selectSex3,"������� 3�� �����л��� ������ �����ϼ���")) return false;
		}
		if (getSelectValue(frm.selectClassCd4) != ""){
			if(!requiredField(frm.reqDt4,"������� 4�� ������ڸ� �Է��ϼ���. ��)201�� 09�� 12�� : 20140912")) return false;
			if(!requiredField(frm.reqTm4,"������� 4�� ����ð��� �Է��ϼ���. ��)���� 1�� 30�� : 1330")) return false;
			if(!requiredField(frm.starNm4,"������� 4�� ��������Ÿ�� �Է��ϼ���.")) return false;
			if(!requiredField(frm.studentCnt4,"������� 4�� �����ο��� �Է��ϼ���.")) return false;
			if(!requiredField(frm.selectSex4,"������� 4�� �����л��� ������ �����ϼ���")) return false;
		}
		if (getSelectValue(frm.selectClassCd5) != ""){
			if(!requiredField(frm.reqDt5,"������� 5�� ������ڸ� �Է��ϼ���. ��)201�� 09�� 12�� : 20140912")) return false;
			if(!requiredField(frm.reqTm5,"������� 5�� ����ð��� �Է��ϼ���. ��)���� 1�� 30�� : 1330")) return false;
			if(!requiredField(frm.starNm5,"������� 5�� ��������Ÿ�� �Է��ϼ���.")) return false;
			if(!requiredField(frm.studentCnt5,"������� 5�� �����ο��� �Է��ϼ���.")) return false;
			if(!requiredField(frm.selectSex5,"������� 5�� �����л��� ������ �����ϼ���")) return false;
		}
		if(!requiredField(frm.appReason,"��û������ �Է��ϼ���.")) return false;
		if(!requiredField(frm.reqGoods,"������û��ǰ�� �Է��ϼ���.")) return false;
		
				
		// �������
		frm.groundType.value 	= getSelectValue(frm.selectGroundType);
		// ü�������� ����
		frm.gymYn.value 		= getSelectValue(frm.selectGymYn);
		// �������� - �õ�
		frm.sidoCd.value 		= getSelectValue(frm.selectSido1);
		// �������� - �ñ���
		frm.sigunCd.value 		= getSelectValue(frm.selectSigun1);
		// �������� - ���鵿
		frm.dongCd.value 		= getSelectValue(frm.selectDong1);
		// �������� - ��
		frm.riCd.value 			= getSelectValue(frm.selectRi1);
		// ���� - 1����
		frm.classCd1.value 		= getSelectValue(frm.selectClassCd1);
		// ���� - 2����
		frm.classCd2.value 		= getSelectValue(frm.selectClassCd2);		
		// ���� - 3����
		frm.classCd3.value 		= getSelectValue(frm.selectClassCd3);			
		// ���� - 4����
		frm.classCd4.value 		= getSelectValue(frm.selectClassCd4);			
		// ���� - 5����
		frm.classCd5.value 		= getSelectValue(frm.selectClassCd5);
		// ���� - 1����
		frm.sex1.value 	= getSelectValue(frm.selectSex1);
		// ���� - 2����
		frm.sex2.value 	= getSelectValue(frm.selectSex2);			
		// ���� -3����
		frm.sex3.value 	= getSelectValue(frm.selectSex3);			
		// ���� - 4����
		frm.sex4.value 	= getSelectValue(frm.selectSex4);			
		// ���� -5���� 
		frm.sex5.value 	= getSelectValue(frm.selectSex5);
			
		return true;
	}
	
	/**
	 * =================================================
	 * ���������� Dynamic Option Box ����� 
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
	 * ���������� �� Box �ʱ�ȭ  
	 * =================================================
	 */	
	function initialSidoOptionBox() {
		var frm = document.appForm;
		obj = frm.selectSido1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==����==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialSigunOptionBox() {
		var frm = document.appForm;
		obj = frm.selectSigun1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==����==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialDongOptionBox() {	
		var frm = document.appForm;
		obj = frm.selectDong1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==����==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}
	function initialRiOptionBox() {
		var frm = document.appForm;
		obj = frm.selectRi1;
		obj.length = 0;
		newOpt = document.createElement("OPTION");
		newOpt.text = '==����==';;
		newOpt.value = '';
		obj.add(newOpt);	
	}	 
	
	/**
	 * =================================================
	 * ���������� - �õ��� ����Ǿ��� ��� ó��
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
	 * ���������� - �ñ����� ����Ǿ��� ��� ó��
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
	 * ���������� - ���鵿�� ����Ǿ��� ��� ó��
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
	 * �Է��׸� ���
	 * =================================================
	 */
	function cancelAppData() {
		if(!confirm("��û�� ����Ͻðڽ��ϱ�?"))
			return;
		
		$(".application_pop_close").trigger("click");
	}
	
	//-------------------------------------
	// ��û �ʱ�ȭ �۾�
	//-------------------------------------
	preCheckApp();
-->
</script>

<%//@ include file="/jsp/include/schoolPopup.jsp" %>		
<%@ include file="/jsp/include/common_footer.jsp" %>