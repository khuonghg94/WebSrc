<%-- 
    Document   : FrmBienNhan
    Created on : Jul 27, 2018, 10:15:49 AM
    Author     : sol
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Quản lý Biên Nhân</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script> 
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>
        <script type="text/javascript" src="../javascript/mopCalendar.js"></script>

        <script type="text/javascript" src="../javascript/CacHamXuLy.js"></script>
        <script type="text/javascript" src="../javascript/myScript/jsBienNhan.js"></script>

        <link rel="stylesheet" type="text/css" media="all" href="../css/tableCSS.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../css/mopCalendar.css"/>

        <link rel="stylesheet" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">

        <style>
            /*Tab*/
            #tabsB { list-style-type: none; margin: 10px 0px 2px 0px; padding: 0 0 0.3em 0;; border: none; border-bottom: 3px solid #009900;}
            #tabsB li { display: inline;}
            #tabsB li a {text-decoration: none; color: #00008B; background-color: #E8E6E3; border: 1px solid #B8C3C7; border-bottom: none; padding: 0.3em; }
            #tabsB li a:hover { background-color: #5fb962}
            #tabsB li a.selected { color: #006600; background-color: #E6FF99; font-weight: bold; padding: 0.5em 0.3em 0.3em 0.3em; }

            .tabContent { border: 1.5px solid #009900; padding: 0.3em 0.1em; background-color: #ffffff}
            .tabContent.hide {display: none; } 

            /* Double-color dashed line */ 
            hr.style-three { border: 0; border-bottom: 1px dashed #ccc; background: #999; }

            /* Inset, by Dan Eden */ 
            hr.style-six { border: 0; height: 0; border-top: 1px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3); }

            /* Flaired edges, by Tomas Theunissen */ 
            hr.style-seven { height: 30px; border-style: solid; border-color: black; border-width: 1px 0 0 0; border-radius: 20px; } 
            hr.style-seven:before { /* Not really supposed to work, but does */ display: block; content: ""; height: 30px; margin-top: -31px; border-style: solid; border-color: black; border-width: 0 0 1px 0; border-radius: 20px; }

            /* Glyph, by Harry Roberts */ 
            hr.style-eight { padding: 0; border: none; border-top: medium double #333; color: #333; text-align: center; } 
            hr.style-eight:after { content: "§"; display: inline-block; position: relative; top: -0.7em; font-size: 1.5em; padding: 0 0.25em; background: white; }

            /* Gradient color1 - color2 - color1 */ 
            hr.style-one { border: 0; height: 1px; background: #333; background-image: linear-gradient(to right, #ccc, #333, #ccc); }

            /* Gradient transparent - color - transparent */ 
            hr.style-two { border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)); }

            /*  */ 
            hr.style-five { padding: 0; border: none; border-top: medium double #333; color: #333; }

            .picButtonSetup{
                border-radius: 100%; border: 1.3px solid #151F2D; padding: 5px 5px 5px 5px; height: 20px; width: 20px; background-color: #FFFFCC;
            }

            html, body {                             
                margin: auto; 
                padding: auto;
            }
        </style>

        <script type="text/javascript"> // Load form                  
            var tenForm = window.location.pathname.split("/");
            if (tenForm.length > 0)
            {
                var _tenForm = tenForm[tenForm.length - 1].split(".")[0];
                ktquyen(<%=session.getAttribute("idUser")%>, _tenForm);
            }

            init_reload();
            $(document).ready(function () {
            <%
                String username = (String) session.getAttribute("userName");
                if (username == null) { %>
            <jsp:forward page="FrmMain.jsp">
                <jsp:param name="FailReason" value="Wrong Password"/>
            </jsp:forward>
            <% }%>
//                //session
//                pubHoTenNV = "Trần Thị Mai";
//                pubMaNV = "NV199311";
//                pubTenDV = "-";
//                pubMaDV = "-";
//                pubUserName = "ttmai";

                pubHoTenNV = "<%=session.getAttribute("hoTenNV")%>";
                pubMaNV = "<%=session.getAttribute("maNV")%>";
                pubTenDV = "<%=session.getAttribute("tenDV")%>";
                pubMaDV = "<%=session.getAttribute("maDV")%>";
                pubUserName = "<%=session.getAttribute("userName")%>";
                pubIsAdmin = "<%=session.getAttribute("isAdmin")%>";

                funDropAndDrap();
                initB();
            });
        </script>    
    </head>
    <body class="mauNenForm">
    <center style="width: 100%;">        
        <div id="divMain"
             class="div-normal"
             style="
             background-color: #F9F7F4;
             border: 1.5px solid #009900; 
             border-radius: 0.2em;
             width: 100%;             
             height: 100%;
             vertical-align:top;    
             margin: 0px 3px 0px -2px;
             ">  
            <div style="background: #009900; width: 100%; padding-top: 7px; padding-bottom: 7px;" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px">QUẢN LÝ BIÊN NHẬN</span>
            </div>
            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 5px 0px 0px 5px;" align="right">           
                <label id="tendn">Nhân viên:<b style="color: firebrick;"> <%=session.getAttribute("hoTenNV")%> </b> || Đơn vị: <b style="color: firebrick;"> <%=session.getAttribute("tenDV")%></b></label>
            </div>
            <table id="tbmain" style="width: 100%; vertical-align:top;">
                <tr >
                    <td style="width: 50%; height: auto; vertical-align:top;">
                        <div id="infoA" style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 1px 0px 1px 1px; padding: 3px 3px 3px 4px" align="left"> 
                            <div style="width: 100%; height: auto">
                                <ul id="tabsB" style="width:100%; text-align: left">
                                    <li><a id="aLopHoc" href="#LopHoc" onclick="showTab();" >Lớp học</a></li>
                                    <li><a id="aBienNhan" href="#BienNhan" onclick="showTab();" >Biên nhận</a></li>
                                </ul>    
                            </div>
                            <!--Dialog Tabs Lớp học --> 
                            <div class="tabContent hide" id="divLopHoc" style="border: 1.5px solid #009900;">
                                <table style="margin:15px auto auto auto; width: 85%; height: auto;" border="0">
                                    <col width="15px">
                                    <col width="300px">                                                
                                    <tr>  
                                        <td>    
                                            Loại Lớp:
                                        </td> 
                                        <td>
                                            <select id="cboLoaiLop" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLop()">
                                            </select>
                                        </td> 
                                    </tr>
                                    <tr>  
                                        <td>    
                                            Lớp:
                                        </td> 
                                        <td>
                                            <select id="cboLop" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHoc()">
                                            </select>
                                        </td> 
                                    </tr>
                                    <tr>  
                                        <td>    
                                            Học Kỳ:
                                        </td> 
                                        <td>
                                            <select id="cboHocKy" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHoc()">
                                            </select>
                                        </td> 
                                    </tr>
                                    <tr>  
                                        <td>    
                                            Lớp Học:
                                        </td> 
                                        <td>
                                            <select id="cboLopHoc" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder">
                                            </select>                                                
                                        </td> 
                                    </tr>                      
                                    <tr>
                                        <td colspan="2" style="text-align: center;">
                                            <hr style="margin-top: 20px;">
                                            <i class="fa fa-search fa-lx picButtonSetup" title="Tìm" onclick=""></i> 
                                            <i class="fa fa-undo fa-lx picButtonSetup" title="Hủy" onclick=""></i>    
                                        </td>
                                    </tr>
                                </table>  
                            </div> 

                            <!--Dialog Tabs Biên nhận --> 
                            <div class="tabContent hide" id="divBienNhan" style="border: 1.5px solid #009900;">
                                <table style="width:95%;" align="center" border="0">
                                    <col width="190">
                                    <col width="40"> 
                                    <col width="auto"> 
                                    <col width="30"> 
                                    <tr>
                                        <td>
                                            - Loại danh sách:&nbsp;
                                        </td>
                                        <td colspan="3">
                                            <select id="cboBienNhan" class="txtInput" onchange="cboBienNhan()" onkeydown="cboBienNhan()" style="width: 100%; height: 30px; color: darkred; font-size:13px; font-weight: bolder" >   
                                                <option id="lik1" value="lik1" style="font-weight:bold; color: darkred">Biên nhận mới lập</option>
                                                <option id="lik2" value="lik2" style="font-weight:bold; color: darkred">Duyệt đề nghị</option>
                                                <option id="lik3" value="lik3" style="font-weight:bold; color: darkred">Xác nhận tài chính</option>
                                            </select>
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <td rowspan="2">
                                            <input type="checkbox" id="chkNgayLapTim" onchange="getNgayLapPhieu()"> Theo ngày lập:&nbsp;
                                        </td>
                                        <td>
                                            Từ:&nbsp;
                                        </td>
                                        <td>
                                            <input type="text" id="tuNgayLapTim" class="txtInput" style="width: 100%; height: 30px; color: darkblue; font-size:13px;" title="Từ ngày lập">   
                                        </td>
                                        <td>
                                            <img id="picTuNgayLapTim" src="../image/32x32_calendar.png" title="Lịch" width="22" height="23" onclick="showDate(event, 'tuNgayLapTim')" align="middle" style="visibility: hidden; margin: 0px 5px"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Đến:&nbsp;
                                        </td>
                                        <td>
                                            <input type="text" id="denNgayLapTim" class="txtInput" style="width: 100%; height: 30px; color: darkblue; font-size:13px;" title="Đến ngày lập">
                                        </td>
                                        <td>
                                            <img id="picDenNgayLapTim" src="../image/32x32_calendar.png" title="Lịch" width="22" height="23" onclick="showDate(event, 'denNgayLapTim')" align="middle" style="visibility: hidden; margin: 0px 5px"/>
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <td colspan="4"  align="center">
                                            <hr>
                                            <i class="fa fa-search fa-lx picButtonSetup" title="Bắt đầu tìm" onclick="timBienNhan()"></i> 
                                            <i class="fa fa-undo fa-lx picButtonSetup" title="Hủy tìm kiếm" onclick="resetTimBienNhan()"></i>
                                        </td>
                                    </tr>
                                </table> 
                            </div>
                        </div>
                        <div id="infoA" style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 2px 0px 1px 1px; padding: 5px 3px 1px 5px" align="left"> 
                            <div class="divTitle" style="width: auto;">     
                                <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>     
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Danh sách</span> 
                                <input type="text" id="txtNoiDungTim" onkeyup="timNoiDung('tbDanhSach', 'txtNoiDungTim')" class="txtInput" style="margin-left: 10px; width: 80%; height: 30px; color: darkblue; font-size:13px;" title="Nhập nội dung tìm kiếm" placeholder="Nhập nội dung tìm kiếm">                                    
                            </div>
                            <div style="height: 1000px;">
                                <!--<hr class="style-three">-->
                                <table id="tbDanhSach" border="1" style="width:100%" class="table-normal">
                                </table>
                            </div>                            
                        </div>
                    </td>
                    <td style="width: 100%; height: auto; vertical-align:top;">  
                        <div id="infoB" style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 1px 0px 1px 1px; padding: 5px 0px 0px 5px" align="left"> 
                            <div class="divTitle" style="width: auto;">     
                                <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>     
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Biên nhận</span>
                            </div>
                            <table style="width:97%; margin: 5px auto 10px auto" border="0">                               
                                <col width="80px">
                                <col width="270px">
                                <col width="70px">
                                <col width="270px">
                                <tr>
                                    <td colspan="4" align="right">
                                        <label style="color: darkblue; background: #FFFF66; font-weight: bold; font-size: 16px">Mã: </label> 
                                        <label id="lblIDBN" style="color: darkblue; background: #FFFF66; font-weight: bold; font-size: 16px">-</label>                                        
                                    </td>
                                </tr>
                                <tr>  
                                    <td>    
                                        - Học sinh: 
                                    </td> 
                                    <td colspan="4">
                                        <label id="lblHoTenHS" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td> 
                                </tr>  
                                <tr>  
                                    <td>    
                                        - Ngày sinh: 
                                    </td> 
                                    <td>
                                        <label id="lblNgaySinhHS" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td>
                                    <td>    
                                        - Giới tính: 
                                    </td> 
                                    <td>
                                        <label id="lblGioiTinhHS" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td>
                                </tr>  
                                <tr>  
                                    <td>    
                                        - Tên lớp:
                                    </td> 
                                    <td colspan="3">
                                        <label id="lblTenLop" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td> 
                                </tr> 
                                <tr>  
                                    <td>    
                                        - Phụ huynh: 
                                    </td> 
                                    <td colspan="4">
                                        <label id="lblHoTenPH" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td> 
                                </tr>  
                                <tr>  
                                    <td>    
                                        - Điện thoại: 
                                    </td> 
                                    <td>
                                        <label id="lblDienThoaiPH" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td>
                                    <td>    
                                        - Email: 
                                    </td> 
                                    <td>
                                        <label id="lblEmailPH" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td>
                                </tr>  
                                <tr>  
                                    <td>    
                                        - Nơi làm việc:
                                    </td> 
                                    <td colspan="3">
                                        <label id="lblNoiLamViecPH" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                                    </td> 
                                </tr> 
                                <tr>
                                    <td colspan="4">
                                        <hr style="width: 100%; border-top: 1px solid #009900">
                                        <div id="divNDBienNhan" style="width: auto; height: auto; margin: 5px 10px 10px 5px; overflow: auto">     
                                            <div class="divTitle" style="width: auto;">     
                                                <!--<i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>-->
                                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Nội dung</span>
                                                <input type="text" id="txtKhoanThuTim" onkeyup="timNoiDung('tbNDBienNhan', 'txtKhoanThuTim')" class="txtInput" style="margin-left: 10px; width: 80%; height: 30px; color: darkblue; font-size:13px;" title="Nhập nội dung tìm kiếm" placeholder="Nhập nội dung tìm kiếm">                                    
                                            </div>
                                            <table id="tbNDBienNhan" border="1" style="width:100%" class="table-normal">      
                                                <thead class="th-normal">
                                                    <tr>
                                                        <th width="15%">Khoản thu</th>
                                                        <th width="2%">Giá</th>
                                                        <th width="6%">Số lượng</th>
                                                        <th width="2%">T.Lệ giảm</th>                                
                                                        <th width="2%">Tiền T.thực</th>
                                                        <th width="1%">Chọn<br><input type="checkbox" id="myCheckBox" onchange="checkBoxAll()" style="margin-left:auto; margin-right:auto; visibility: hidden"></th>
                                                    </tr>
                                                </thead>
                                                <tbody id="dsNDBienNhan" class="tr-normal">
                                                </tbody>
                                            </table>              
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <hr class="style-three">                            
                            <div style="background:#F7EDE3; width: auto; border: 1.2px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 0px 0px 5px 0px">
                                <div style="background:#F9CEA2; width:auto; margin: 2px 2px 5px 2px; padding: 2px 3px 3px 10px">
                                    <i class="fa fa-address-card-o fa-lg" title="Nhân viên lập biên nhận"></i> 
                                    <span style="color:#4E1D74; font-weight: bold; font-size: 17px">N.viên lập: </span>                                                                                                   
                                    <label style="color: darkblue; font-weight: bold" id="lblNVLap">-</label>
                                </div>
                                <table style="width: 90%; margin:auto">
                                    <col width="100px">
                                    <col width="auto">                                      
                                    <tr>  
                                        <td>
                                            - Ngày:
                                        </td>
                                        <td>
                                            <input type="text" class="txtInput" id="txtNgayLap" style="width: 75px; height: 28px; color: darkblue; font-size:13px;" placeholder="Ngày lập">
                                            &nbsp;
                                            Giờ :
                                            <select class="txtInput" id="cboGioLap">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                            </select> : 
                                            <select class="txtInput" id="cboPhutLap">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                            </select>
                                            <img id="picNgayLap" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayLap')" style="margin-left: 5px;; visibility: hidden" width="22" height="23">
                                        </td>
                                    </tr>
                                    <tr>  
                                        <td>    
                                            - Nội dung:
                                        </td> 
                                        <td>
                                            <textarea id="txtNoiDung" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Nội dung lập biên nhận" placeholder="Nội dung lập biên nhận" ></textarea>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <hr style="width: 100%; border-top: 1px solid #009900">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" align="center">
                                            <i id="picLuuBN" class="fa fa-save fa-lx picButtonSetup" title="Lưu đề nghị" onclick="lapBienNhan()"></i>
                                            <i id="picXoaBN" class="fa fa-trash-o fa-lx picButtonSetup" title="Xóa đề nghị" onclick="xoaBienNhan()"></i>
                                            <i id="picInDeNghi" class="fa fa-print fa-lx picButtonSetup"  title="In đề nghị" onclick="inDeNghi()"></i>                                            
                                        </td>
                                    </tr>
                                </table>   
                            </div>

                            <div style="background:#F7EDE3; width: auto; border: 1.2px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 0px 0px 5px 0px">
                                <div style="background:#F9CEA2; width:auto; margin: 2px 2px 5px 2px; padding: 2px 3px 3px 10px">
                                    <i class="fa fa-address-card-o fa-lg" title="Nhân viên xác nhận đề nghị"></i> 
                                    <span style="color:#4E1D74; font-weight: bold; font-size: 17px">N.viên đề nghị: </span>                                                
                                    <label style="color: darkblue; font-weight: bold" id="lblNVDeNghi">-</label>
                                </div>   
                                <table style="width: 90%; margin:auto">
                                    <col width="100px">
                                    <col width="auto">                                        
                                    <tr>  
                                        <td>
                                            - Ngày:
                                        </td>
                                        <td>
                                            <input type="text" class="txtInput" id="txtNgayDeNghi" style="width: 75px; height: 28px; color: darkblue; font-size:13px;" placeholder="Ngày đề nghị">
                                            &nbsp;
                                            Giờ :
                                            <select class="txtInput" id="cboGioDeNghi">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                            </select> : 
                                            <select class="txtInput" id="cboPhutDeNghi">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                            </select>
                                            <img id="picNgayDeNghi" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayDeNghi')" style="margin-left: 5px;; visibility: hidden" width="22" height="23">
                                        </td>
                                    </tr>
                                    <tr>  
                                        <td>    
                                            - Nội dung:
                                        </td> 
                                        <td>
                                            <textarea id="txtDeNghi" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Nội dung đề nghị" placeholder="Nội dung đề nghị" ></textarea>
                                        </td> 
                                    </tr>
                                    <tr>  
                                        <td colspan="2">
                                            <input type="checkbox" style="margin: 3px 5px 3px 5px;" id="chkDeNghi" onchange="capNhatXacNhan('chkDeNghi')"> <label style="color: firebrick; font-weight: bold; font-size: 15.5px">X.nhận đề nghị</label>                           
                                        </td> 
                                    </tr>                                    
                                </table>
                            </div>

                            <div style="background:#F7EDE3; width: auto; border: 1.2px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 0px 0px 5px 0px">
                                <div style="background:#F9CEA2; width:auto; margin: 2px 2px 5px 2px; padding: 2px 3px 3px 10px">
                                    <i class="fa fa-address-card-o fa-lg" title="Nhân viên xác nhận tài chính"></i> 
                                    <span style="color:#4E1D74; font-weight: bold; font-size: 17px">N.viên tài chính: </span> 
                                    <label style="color: darkblue; font-weight: bold" id="lblNVXacNhan">-</label>
                                </div>
                                <table style="width: 90%; margin:auto">
                                    <col width="100px">
                                    <col width="auto">                                        
                                    <tr>  
                                        <td>
                                            - Ngày:
                                        </td>
                                        <td>
                                            <input type="text" class="txtInput" id="txtNgayXacNhan" style="width: 75px; height: 28px; color: darkblue; font-size:13px;" placeholder="Ngày xác nhận">
                                            &nbsp;
                                            Giờ :
                                            <select class="txtInput" id="cboGioXacNhan">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                            </select> : 
                                            <select class="txtInput" id="cboPhutXacNhan">
                                                <option value="0">00</option>
                                                <option value="1">01</option>
                                                <option value="2">02</option>
                                                <option value="3">03</option>
                                                <option value="4">04</option>
                                                <option value="5">05</option>
                                                <option value="6">06</option>
                                                <option value="7">07</option>
                                                <option value="8">08</option>
                                                <option value="9">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                            </select>
                                            <img id="picNgayXacNhan" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayXacNhan')" style="margin-left: 5px;; visibility: hidden" width="22" height="23">
                                        </td>
                                    </tr>
                                    <tr>  
                                        <td>    
                                            - Nội dung:
                                        </td> 
                                        <td>
                                            <textarea id="txtDaThu" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Nội dung xác nhận thu" placeholder="Nội dung xác nhận thu" ></textarea>
                                        </td> 
                                    </tr>
                                    <tr>  
                                        <td colspan="2">
                                            <input type="checkbox" style="margin: 3px 5px 3px 5px;" id="chkDaThu" onchange="capNhatXacNhan('chkDaThu')"> <label style="color: firebrick; font-weight: bold; font-size: 15.5px">X.nhận đã thu</label>                           
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <hr style="width: 100%; border-top: 1px solid #009900">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" align="center">
                                            <i id="picInDeNghiThuTien" class="fa fa-print fa-lx picButtonSetup"  title="In đề nghị thu tiền" onclick="inDeNghiThuTien()" ></i>                                            
                                        </td>
                                    </tr>
                                </table>                                                   
                            </div>
                        </div>                        
                    </td>
                </tr>
            </table>
        </div>
    </center>

    <!--Dialog chi tiết Dialog Modal-->
    <div id="divMyDialog" class="dialogclass hidden" role="dialog" aria-hidden="true"> </div>

    <!--Dialog chi tiết Phần quyền xác nhận #009900 <a class="boxclose" href="javascript:hiddenDiaLog_Email()"></a>-->        
    <center style="width: 100%;">             
        <div id="divPhanQuyen"               
             style="
             display: none;
             cursor: default; 
             position: absolute;
             background-color: #F9F7F4;
             border-radius: 0.2em; 
             border: 1.2px solid #009900; 
             width: 850px; 
             height: auto;
             box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)">
            <div id="headerPhanQuyen" style="cursor: move; background: #009900; width: auto; padding: 4px; margin: 1px" align="center">                 
                <i class="sButtonIframeForm fa-close fa-1x" title="Đóng" onclick="hiddenDiaLog_PhanQuyen()"></i>
                <span style="color:white; font-weight: bold; font-size: 20px">
                    PHÂN QUYỀN XÁC NHẬN
                </span>
            </div>            
            <table style="width: 100%; height: 700px; vertical-align: top">
                <tr style="width: 100%;">                    
                    <td id="tdTimNhanVien" style="vertical-align:top; width:45%; display: none"> 
                        <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 0px 5px 5px; padding: 5px 5px 5px 5px" align="left">
                            <div class="divTitle" style="width: auto;">
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Tìm kiếm nhân viên</span>                
                            </div> 
                            <table style="width: 100%;">
                                <col width="30">
                                <col width="100"> 
                                <tr>
                                    <td align="right"> Đơn vị :&nbsp;</td>
                                    <td align="left">
                                        <select id="selectNV" onchange="" style="width: 100%;" onkeydown="">   
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"> Mã NV :&nbsp;</td>
                                    <td align="left">
                                        <textarea id="findMaNV" class="txtInput" style="width: 100%; height: 20px; color: darkblue; font-size:13px" title="Mã NV" placeholder="Nhập Mã nhân viên"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"> Họ tên :&nbsp;</td>
                                    <td align="left">   
                                        <textarea id="findHoTenNV" class="txtInput" style="width: 100%; height: 20px; color: darkblue; font-size:13px" title="Họ tên" placeholder="Nhập Họ tên nhân viên"></textarea>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <hr>
                                        <div style=" width: 100%;" align="center">
                                            <i class=" fa fa-power-off fa-lg" title="Đóng" onclick="showTimKiemNhanVien()"></i>
                                            <i class="fa fa-search fa-lg" title="Tìm" onclick="timThongNhanVien()"></i>
                                            <i class="fa fa-undo fa-lg" title="Hủy" onclick="resetTimThongNhanVien()"></i>                        
                                        </div>
                                    </td>
                                </tr>
                            </table>                      
                        </div>
                        <div style="background: #FFFFFF; width: auto; height: 512px; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 0px 5px 5px; padding: 5px 5px 5px 5px" align="left">
                            <div class="divTitle" style="width: auto;">
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách Nhân viên</span>                
                            </div> 
                            <table id="tbDanhSachNhanVien" border="1" style="width:100%" class="table-normal">
                                <thead class="th-normal">
                                    <tr>
                                        <th width="2%">STT</th>
                                        <th width="5%">Tài khoản</th>
                                        <th width="15%">Họ tên</th>
                                        <th width="2%"></th>
                                    </tr>
                                </thead>
                                <tbody id="dsDanhSachNhanVien" class="tr-normal">
                                </tbody>
                            </table>
                        </div>                                              
                    </td>
                    <td style="vertical-align:top; width:100%;">
                        <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 5px 0px 0px; padding: 0px 5px 5px 5px" align="left">
                            <div class="divTitle" style="width: auto;">
                                <i class="fa fa-bars fa-lg" title="Danh sách Nhân viên" onclick="showTimKiemNhanVien()"></i>                                
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px " >Thông tin Nhân viên</span> 
                            </div> 
                            <div style="margin: 5px 5px 5px 5px; padding: 5px 5px 0px 5px">
                                - Họ tên: <label id="pqHoTen_MaVN" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>    
                            </div>
                            <div style="margin: 5px 5px 5px 5px; padding: 5px 5px 5px 5px">
                                - Đơn vị: <label id="pqDonVi" style="color: darkblue; font-weight: bold; font-size: 15px">-</label>
                            </div>
                        </div>
                        <table style="width:100%;">
                            <col width="50%">
                            <col width="50%">
                            <tr>
                                <td style="vertical-align:top;">
                                    <div style="background: #FFFFFF; width: auto; height: 580px; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 2px 5px -3px; padding: 5px 5px 5px 5px;" align="left">
                                        <div class="divTitle" style="width: auto;">
                                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Quyền chưa cấp</span>                
                                        </div> 
                                        <table id="tbDanhSachQuyen" border="1" style="width:100%" class="table-normal">
                                            <thead class="th-normal">
                                                <tr>
                                                    <th width="2%">STT</th>
                                                    <th width="15%">Tên quyền</th>
                                                    <th width="1%"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="dsDanhSachQuyen" class="tr-normal">
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                                <td style="vertical-align:top;">
                                    <div style="background: #FFFFFF; width: auto; height: 580px; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 2px 5px -3px; padding: 5px 5px 5px 5px;" align="left">
                                        <div class="divTitle" style="width: auto;">
                                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Quyền được cấp</span>                
                                        </div> 
                                        <table id="tbQuyenDuocCap" border="1" style="width:100%" class="table-normal">
                                            <thead class="th-normal">
                                                <tr>
                                                    <th width="2%">STT</th>
                                                    <th width="15%">Tên quyền</th>
                                                    <th width="1%"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="dsQuyenDuocCap" class="tr-normal">
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>               
            </table>            
        </div>        
    </center>

    <div id ="dialog_Calendar" class="mopCalendar" 
         style="display: none; position: absolute; border-radius: 0.2em; border: 1.3px solid rgb(161, 161, 161); box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.6); padding: 1px; left: 474px; top: 437px;">         
        <div class="mopCalendarHeader">
            <div class="mopCalendarBtnLast" title="Năm sau"></div>
            <div class="mopCalendarBtnNext" title="Tháng sau"></div>            
            <div class="mopCalendarMonth"></div>
            <div class="mopCalendarBtnPrevious" title="Tháng trước"></div>
            <div class="mopCalendarBtnFirst" title="Năm trước"></div>
        </div>

        <div class="mopCalendarBody">                
            <table style="width:100%; height:100%;">
                <thead>
                    <tr>
                        <th class="mopCalendarSunRed">CN</th>
                        <th>T2</th>
                        <th>T3</th>
                        <th>T4</th>
                        <th>T5</th>
                        <th>T6</th>
                        <th class="mopCalendarSatOrange">T7</th>    
                    </tr>
                </thead>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </table>
        </div>

        <div id="handle" class="mopCalendarFooter" style="cursor: move;">
            <button class="mopCalendarBtnToday">Hôm nay</button>
            <button class="mopCalendarClose">Đóng</button>
        </div>
    </div>
</body>
</html>
