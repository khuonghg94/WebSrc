<%-- 
    Document   : FrmHocSinh
    Created on : July 12, 2018, 2:40:31 PM
    Author     : Sol
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Quản lý Học sinh</title>        

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script> 
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>
        <script type="text/javascript" src="../javascript/mopCalendar.js"></script>

        <script type="text/javascript" src="../javascript/CacHamXuLy.js"></script>
        <script type="text/javascript" src="../javascript/myScript/jsHocSinh.js"></script>



        <link rel="stylesheet" type="text/css" href="../css/tableCSS.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../css/mopCalendar.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">

        <style>            
            html, body {                             
                margin: auto; 
                padding: auto;
            }

            #myRoot {
                list-style-type: none;
                list-style: none;
                padding: 0;
                margin: 0;
            }

            #myRoot li {   
                list-style: none;
                line-height: 10px;                
                padding: 3px 0px 0px 3px;
            }

            #tabsB { list-style-type: none; margin: 10px 0px 2px 0px; padding: 0 0 0.3em 0;; border: none; border-bottom: 3px solid #009900;}
            #tabsB li { display: inline;}
            #tabsB li a {text-decoration: none; color: #00008B; background-color: #E8E6E3; border: 1px solid #B8C3C7; border-bottom: none; padding: 0.3em; }
            #tabsB li a:hover { background-color: #5fb962}
            #tabsB li a.selected { color: #006600; background-color: #E6FF99; font-weight: bold; padding: 0.5em 0.3em 0.3em 0.3em; }

            .tabContent { border: 1.5px solid #009900; padding: 0.3em 0.1em; background-color: #ffffff}
            .tabContent.hide {display: none; } 
        </style>

        <script type="text/javascript"> // Load form            
            var tenForm = window.location.pathname.split("/");
            if (tenForm.length > 0)
            {
                var _tenForm = tenForm[tenForm.length - 1].split(".")[0];
                var _idUser = "<%=session.getAttribute("idUser")%>"; // alert(_tenForm + " || " + _idUser);
                ktquyen(_idUser, _tenForm);
            }

            init_reload();

            $(document).ready(function () {
            <%
                String userName = (String) session.getAttribute("userName");
                if (userName == null) { %>
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

                initB();
                cboHocKy();
                cboLoaiLop();

                showLopHoc();
            });
        </script> 
    </head>
    <body class="mauNenForm">
    <center style="width: 100%;">        
        <div id="divMain"
             class="dropdown"
             style=" 
             background-color: #F9F7F4;
             border: 1.5px solid #009900; 
             border-radius: 0.2em;
             width: 100%;             
             height: 100%;
             vertical-align:top;    
             margin: 0px 3px 0px -2px;
             position: relative;
             display: inline-block;">  
            <div style="background: #009900; width: auto; padding-top: 7px; padding-bottom: 7px;" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px;">QUẢN LÝ HỌC SINH</span>
            </div>   

            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 5px 0px 0px 5px;" align="right">           
                <label id="tendn">Nhân viên:<b style="color: firebrick;"> <%=session.getAttribute("hoTenNV")%> </b> || Đơn vị: <b style="color: firebrick;"> <%=session.getAttribute("tenDV")%></b></label>
            </div>

            <div id="divContainer" style="display: flex; height: auto; width: auto">
                <div style="background: #FFFFFF; width: 30%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 2px 5px 5px; padding: 5px 0px 0px 5px;" align="left">                                             
                    <div class="divTitle" style="width: auto;">                        
                        <i class="fa fa-address-card-o fa-lg" onclick="showLopHoc();" style="margin: 0px 10px 0px 2px;"></i>           
                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Thông tin Lớp</span>
                    </div>                    
                    <table id="tbQLLopHoc" style="margin:auto; width: 90%; height: auto;" border="0">
                        <col width="15px">
                        <col width="170px">                                                
                        <tr>  
                            <td>    
                                Chọn L.Lớp:
                            </td> 
                            <td>
                                <select id="cboLoaiLop" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLop()">
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td>    
                                Chọn Lớp:
                            </td> 
                            <td>
                                <select id="cboLop" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="setTenLopHoc()">
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td>    
                                Chọn H.Kỳ:
                            </td> 
                            <td>
                                <select id="cboHocKy" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="setTenLopHoc()">
                                </select>
                            </td> 
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px; border-top: 1px solid #4E1D74"> 
                                <b style="color:darkred;">Mã: <label id="lblMaLop">-</label></b>
                            </td>
                        </tr>
                        <tr>  
                            <td>    
                                Tên L.học:
                            </td> 
                            <td style="text-align: left">
                                <textarea id="txtTenLocHoc" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Tên lớp học" placeholder="Nhập tên lớp học" ></textarea>
                            </td> 
                        </tr>  
                        <tr>  
                            <td>    
                                Ghi chú:
                            </td> 
                            <td style="text-align: left">
                                <textarea id="txtGhiChu" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                            </td> 
                        </tr>                          
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <hr style="margin-top: 20px;">
                                <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemCN()"></i>                            
                                <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaCN()"></i>
                                <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuCN()"></i>
                                <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaCN()"></i>
                                <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyCN()"></i>                            
                            </td>
                        </tr>
                    </table>  
                    <hr id="hrLopHoc" style="margin: 30px 15px 20px 5px; padding: 0; border: none; border-top: medium double #4E1D74; color: #4E1D74;">    
                    <div class="divTitle" style="width: auto;">                        
                        <i class="fa fa-address-card-o fa-lg" onclick="showTimLH()" style="margin: 0px 10px 0px 2px;"></i>           
                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Tìm kiếm Lớp</span>
                    </div>  
                    <table id="tbTimKiemLop" style="margin:auto; width: 90%; height: auto;" border="0">
                        <col width="15px">
                        <col width="170px">                                                
                        <tr id="trLoaiLop_Tim">  
                            <td>    
                                Loại Lớp:
                            </td> 
                            <td>
                                <select id="cboLoaiLop_Tim" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLop()">
                                </select>
                            </td> 
                        </tr>
                        <tr id="trLop_Tim">  
                            <td>    
                                Lớp:
                            </td> 
                            <td>
                                <select id="cboLop_Tim" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="setTenLopHoc()">
                                </select>
                            </td> 
                        </tr>
                        <tr id="trHocKy_Tim">  
                            <td>    
                                Học Kỳ:
                            </td> 
                            <td>
                                <select id="cboHocKy_Tim" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="setTenLopHoc()">
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td>    
                                N.dung tìm:
                            </td> 
                            <td style="text-align: left">
                                <textarea id="txtNoiDung_Tim" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Nội dung tìm kiếm" placeholder="Nhập nội dung tìm kiếm" ></textarea>
                            </td> 
                        </tr>                     
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <hr style="margin-top: 20px;">
                                <i class="fa fa-search fa-lg" title="Tìm" onclick="funTimTM()"></i>         
                                <i class="fa fa-undo fa-lg" title="Hủy" onclick="huyTimLH()"></i>                            
                            </td>
                        </tr>
                    </table>  
                    <div style="width: auto; margin: 3px 10px 8px 10px; padding: 5px 5px 10px 5px;"> 
                        <hr style="width: 100%; border-top: 1px dashed #009900">
                    </div> 
                    <div class="divTitle" style="width: auto;">     
                        <i class="fa fa-bars fa-lg" onclick="" style="margin: 0px 10px 0px 2px;"></i>     
                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Danh sách</span>
                    </div>
                    <div id="divRoot" style="height: 1000px;">
                        <ul id="myRoot" style="overflow-y: scroll; height: 100%;">
                            <li>
                                <!--                                <a>
                                                                    <i class="fa fa-home fa-lg"></i>
                                                                    <span id="-101">Root</span>
                                                                </a>-->
                                <ul id="myDropdown">
                                </ul>
                            </li>   
                        </ul>
                    </div>
                </div> 

                <div style="background: #FFFFFF; width: 70%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 3px 5px 2px; padding: 5px 5px 0px 5px; display: flex; flex-direction: column;" align="left">
                    <div style="width: 100%; height: auto">
                        <ul id="tabsB" style="width:100%; text-align: left">
                            <li><a id="aDangKy" href="#DangKy" onclick="showTab();">Đăng ký Lớp</a></li>
                            <li><a id="aDiemDanh" href="#DiemDanh" onclick="showTab();">Điểm danh</a></li>
                            <li><a id="aSoLienLac" href="#SoLienLac" onclick="showTab();">Sổ Liên lạc</a></li>
                            <li><a id="aSoSucKhoe" href="#SoSucKhoe" onclick="showTab();">Sổ Sức khỏe</a></li>                             
                            <li><a id="aHocSinh" href="#HocSinh" onclick="showTab();">Thông tin Học sinh</a></li>
                            <li><a id="aChuNhiem" href="#ChuNhiem" onclick="showTab();">Chủ nhiệm Lớp</a></li>
                        </ul>    
                    </div>
                    <!--Dialog Tabs Đăng Ký -->
                    <div class="tabContent hide" id="divDangKy" style="border: 1.5px solid #009900;">
                        <table style="margin:auto; width: 95%; height: auto;" border="0">                            
                            <tr>
                                <td style="width: 50%; height: auto; vertical-align:top; border: none; border-right: medium double #4E1D74;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Đăng Ký Lớp</span>
                                    </div>
                                    <table style="margin:auto; width: 100%; height: auto; padding-right: 7px" border="0">
                                        <col width="20px">
                                        <col width="100px"> 
                                        <col width="20px">
                                        <col width="100px">   
                                        <tr>
                                            <td colspan="4" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblIDBDK">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Loại Lớp:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLoaiLop_BDK" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLop();">
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Lớp:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLop_BDK" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHocBDK('-1')">
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Học Kỳ:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboHocKy_BDK" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHocBDK('-1')">
                                                </select>
                                            </td> 
                                        </tr>                                        
                                        <tr>  
                                            <td>    
                                                Lớp Học:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLopHoc_BDK" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder">
                                                </select>                                                
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Ngày BD:
                                            </td> 
                                            <td>
                                                <input id="txtNgayBD_BDK" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:13px;" title="Ngày bắt đầu" type="text">
                                                <img id="picNgayBD_BDK" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgayBD_BDK')" width="22" height="23" align="middle">
                                            </td> 
                                            <td>    
                                                Ngày KT:
                                            </td> 
                                            <td>
                                                <input id="txtNgayKT_BDK" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:13px;" title="Ngày kết thúc" type="text">
                                                <img id="picNgayKT_BDK" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgayKT_BDK')" width="22" height="23" align="middle">
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Ghi chú:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtGhiChu_BDK" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                            </td> 
                                        </tr>      
                                    </table>
                                </td>

                                <td style="width: 50%; height: auto; vertical-align:top;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Học Sinh</span>
                                    </div>
                                    <table style="margin:auto; width: 100%; height: auto; padding-left: 7px" border="0">
                                        <col width="30px">
                                        <col width="auto">                                                                            
                                        <col width="20px">
                                        <col width="auto"> 
                                        <tr>
                                            <td colspan="4" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblMSHS_BDK">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Họ tên:
                                            </td> 
                                            <td colspan="3">
                                                <input id="txtHoTenHS_BDK" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Họ tên Học sinh" placeholder="Nhập họ tên" type="text">
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Tên thân mật:
                                            </td> 
                                            <td colspan="3">
                                                <input id="txtTenTMHS_BDK" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Tên thân mật" placeholder="Nhập tên thân mật" type="text">
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Ngày sinh:
                                            </td> 
                                            <td>
                                                <input id="txtNgaySinhHS_BDK" class="txtInput" style="width: 100px; height: 28px; color: darkblue; font-size:13px;" title="Ngày sinh" placeholder="Nhập ngày sinh" type="text">
                                                <img id="picNgaySinhHS_BDK" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgaySinhHS_BDK')" width="22" height="23" align="middle">
                                            </td> 
                                            <td style="text-align: right">    
                                                Giới tính:
                                            </td> 
                                            <td>
                                                <select id="cboGioiTinhHS_BDK" class="txtInput" style="width: auto; height: 27px; color: darkblue; font-size:13px; margin-left: 10px">
                                                    <option value="true">Nam</option>
                                                    <option value="false">Nư</option>
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Quốc tịch:
                                            </td> 
                                            <td colspan="3">
                                                <input id="txtQuocTichHS_BDK" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Quốc tịch" placeholder="Nhập quốc tịch" type="text">                                    
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Địa chỉ:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtDiaChiHS_BDK" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Địa chỉ" placeholder="Nhập địa chỉ học sinh" ></textarea>
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Ghi chú:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtGhiChuHS_BDK" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                            </td> 
                                        </tr>                               
                                    </table>  
                                </td>                                
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <hr style="margin-top: 20px;">
                                    <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemBDK()"></i>                            
                                    <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaBDK()"></i>
                                    <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuBDK()"></i>
                                    <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaBDK()"></i>
                                    <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyBDK()"></i>                            
                                </td>
                            </tr>
                        </table>
                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #009900; color: #009900;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>                
                        </div> 
                        <table id="tbBangDangKy" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class='th-normal'>
                                <tr>
                                    <th width='3%'>STT</th>
                                    <th width='20%'>Họ Tên</th>
                                    <th width='5%'>Ngày sinh</th>
                                    <th width='5%'>Giới tính</th>
                                    <th width='45%'>Địa chỉ</th>
                                    <th width='2%'></th>
                                </tr>
                            </thead>
                            <tbody id='dsBangDangKy' class='tr-normal'></tbody>
                        </table>
                    </div>

                    <!--Dialog Tabs Điểm danh -->
                    <div class="tabContent hide" id="divDiemDanh" style="border: 1.5px solid #009900;">
                        <table style="margin:auto; width: 95%; height: auto;" border="0">                            
                            <tr>
                                <td style="width: 50%; height: auto; vertical-align:top; border: none; border-right: medium double #4E1D74;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Điểm danh</span>
                                    </div>
                                    <table style="margin:auto; width: 95%; height: auto;" border="0">
                                        <colgroup>
                                            <col width="100px">
                                            <col width="160px"> 
                                            <col width="120px">
                                            <col width="50px"> 
                                            <col width="100px">
                                            <col width="100px">
                                        </colgroup> 
                                        <tr>
                                            <td colspan="6" style="text-align: right; width: 100%; padding: 5px 0px 5px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblIDXPN">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Giáo viên:
                                            </td> 
                                            <td colspan="5">
                                                <b style="color:darkred;"><label id="lblHoTenNV_DD">-</label></b>
                                            </td> 
                                        </tr>   
                                        <tr>
                                            <td>
                                                Ngày lập :
                                            </td>
                                            <td colspan="5">
                                                <input type="text" class="txtInput" id="txtNgayLap_DD" style="width: 100px; height: 28px; color: darkblue; font-size:13px;" placeholder="Ngày lập">
                                                &nbsp;
                                                Giờ :
                                                <select id="cboGioLap_DD">
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
                                                <select id="cboPhutLap_DD">
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
                                                <img id="picNgayLap_DD" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayLap_DD')" style="margin-left: 5px;; visibility: hidden" width="22" height="23">
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                BĐ nghỉ:
                                            </td> 
                                            <td>
                                                <input type="text" class="txtInput" id="txtNghiBD_DD" style="width: 100px; height: 28px; color: darkblue; font-size:13px;" placeholder="Nghỉ từ ngày">
                                                <img id="picNghiBD_DD" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNghiBD_DD')" style="margin-left: 5px;; visibility: hidden" width="22" height="23">
                                            </td> 
                                            <td style="text-align: right; padding-right: 5px">
                                                Số Ng.nghỉ:
                                            </td>
                                            <td>
                                                <input type="text" class="txtInput" id="txtSoNgayNghi_DD" style="width: 30px; height: 28px; color: darkblue; font-size:13px; text-align: center;" onkeyup="ChiNhapSo(this);" onblur="autoTinhKTNghi()">
                                            </td> 
                                            <td style="text-align: right; padding-right: 5px"> 
                                                KT nghỉ:
                                            </td>
                                            <td>
                                                <input type="text" class="txtInput" id="txtNghiKT_DD" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" placeholder="Nghỉ đến ngày">
                                            </td>    
                                        </tr>                               
                                        <tr>  
                                            <td>    
                                                Ghi chú:
                                            </td> 
                                            <td colspan="5">
                                                <textarea id="txtGhiChu_DD" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú"></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Có phép:
                                            </td> 
                                            <td colspan="5">
                                                <input id="chkCoPhepNghi" type="checkbox" style="margin: 5px 0px 5px 0px">
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="text-align: center;">
                                                <hr style="margin-top: 15px;">
                                                <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemDD()"></i>                            
                                                <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaDD()"></i>
                                                <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuDD()"></i>
                                                <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaDD()"></i>
                                                <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyDD()"></i>                            
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 50%; height: auto; vertical-align:top;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Học Sinh</span>
                                    </div>
                                    <table style="margin:auto; width: 90%; height: auto;" border="0">
                                        <colgroup>
                                            <col width="40px">
                                            <col width="auto"> 
                                            <col width="30px">
                                            <col width="auto"> 
                                            <col width="40px">
                                            <col width="auto"> 
                                        </colgroup> 
                                        <tr>
                                            <td colspan="6" style="text-align: right; width: 100%; padding: 10px 0px 5px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblMaLop_DD">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Tên Lớp:
                                            </td> 
                                            <td colspan="5">
                                                <b style="color:darkred;"><label id="lblTenLop_DD">-</label></b>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Ngày BD:
                                            </td> 
                                            <td style="text-align: left">
                                                <label id="lblNgayBDBDK_DD" style="color: #4E1D74">-</label>
                                            </td> 
                                            <td style="text-align: right;">   
                                                Ngày KT:
                                            </td> 
                                            <td colspan="3">
                                                <label id="lblNgayKTBDK_DD" style="color: #4E1D74">-</label>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="text-align: right; width: 100%; padding: 10px 0px 5px 0px;"> 
                                                <hr style="margin-top: 20px;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" style="text-align: right; width: 100%; padding: 5px 0px 5px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblMSHS_DD">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Họ tên:
                                            </td> 
                                            <td colspan="5">
                                                <b style="color:darkred;"><label id="lblHoTenHS_DD">-</label></b>
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Ngày sinh:
                                            </td> 
                                            <td style="text-align: left">
                                                <label id="lblNgaySinhHS_DD" style="color: #4E1D74">-</label>
                                            </td> 
                                            <td style="text-align: right;">    
                                                Giới tính:
                                            </td> 
                                            <td style="text-align: left">
                                                <label id="lblGioiTinhHS_DD" style="color: #4E1D74">-</label>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Địa chỉ:
                                            </td> 
                                            <td colspan="5">
                                                <label id="lblDiaChiHS_DD" style="color: #4E1D74">-</label>                                    
                                            </td> 
                                        </tr>  
                                    </table>  
                                </td>                                
                            </tr>
                        </table>

                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #4E1D74; color: #4E1D74;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>                
                        </div> 
                        <table id="tbDiemDanh" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class="th-normal">
                                <tr>
                                    <th width="2%">STT</th>
                                    <th width="5%">Ngày BĐ</th>                                    
                                    <th width="5%">Ngày KT</th>
                                    <th width="4%">Ngày nghỉ</th>
                                    <th width="3%">Có phép</th>
                                    <th width="2%"></th>
                                </tr>
                            </thead>
                            <tbody id="dsDiemDanh" class="tr-normal">
                            </tbody>
                        </table>
                    </div>

                    <!--Dialog Tabs Sổ Liên Lạc -->
                    <div class="tabContent hide" id="divSoLienLac" style="border: 1.5px solid #009900;">
                        <div class="divTitle" style="width: auto;">                        
                            <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Sổ Liên Lạc</span>
                        </div>
                        <table style="margin:auto; width: 85%; height: auto;" border="0">
                            <col width="70px">
                            <col width="auto"> 
                            <col width="15px">
                            <col width="auto"> 
                            <col width="40px">
                            <col width="auto"> 
                            <tr>
                                <td colspan="6" style="text-align: right; width: 100%; padding: 5px 0px 5px 0px;"> 
                                    <b style="color:darkred;">Mã: <label id="lblMSHS_SLL">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Họ tên:
                                </td> 
                                <td colspan="5">
                                    <b style="color:darkred;"><label id="lblHoTenHS_SLL">-</label></b>
                                </td> 
                            </tr>  
                            <tr>  
                                <td>    
                                    Ngày sinh:
                                </td> 
                                <td style="text-align: left">
                                    <label id="lblNgaySinhHS_SLL" style="color: #4E1D74">-</label>
                                </td> 
                                <td style="text-align: right;">    
                                    Giới tính:
                                </td> 
                                <td style="text-align: left">
                                    <label id="lblGioiTinhHS_SLL" style="color: #4E1D74">-</label>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Địa chỉ:
                                </td> 
                                <td colspan="5">
                                    <label id="lblDiaChiHS_SLL" style="color: #4E1D74">-</label>                                    
                                </td> 
                            </tr>  
                            <tr>
                                <td colspan="6" style="text-align: right; width: 100%; padding: 10px 0px 5px 0px;"> 
                                    <b style="color:darkred;">Mã: <label id="lblMaLop_SLL">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Tên Lớp:
                                </td> 
                                <td colspan="5">
                                    <b style="color:darkred;"><label id="lblTenLop_SLL">-</label></b>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Ngày BD:
                                </td> 
                                <td style="text-align: left">
                                    <label id="lblNgayBDBDK_SLL" style="color: #4E1D74">-</label>
                                </td> 
                                <td style="text-align: right;">   
                                    Ngày KT:
                                </td> 
                                <td colspan="3">
                                    <label id="lblNgayKTBDK_SLL" style="color: #4E1D74">-</label>
                                </td> 
                            </tr>
                            <tr>
                                <td colspan="6" style="text-align: center;">
                                    <hr style="margin: 10px 0px 10px 0px; border-top: 1px dashed #009900">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6" style="text-align: right; width: 100%; padding: 5px 0px 5px 0px;"> 
                                    <b style="color:darkred;">Mã: <label id="lblIDSLL">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Giáo viên:
                                </td> 
                                <td colspan="5">
                                    <b style="color:darkred;"><label id="lblHoTenNV_SLL">-</label></b>
                                </td> 
                            </tr>                            
                            <tr>
                                <td>
                                    Ngày lập :
                                </td>
                                <td colspan="5">
                                    <input type="text" class="txtInput" id="txtNgayGN_SLL" style="width: 70px; height: 28px; color: darkblue; font-size:13px;" placeholder="Ngày lập">
                                    &nbsp;
                                    Giờ :
                                    <select id="cboGioLap_SLL" onkeydown="keyDown(event, 'cboGioLap_SLL')">
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
                                    <select id="cboPhutLap_SLL" onkeydown="keyDown(event, 'cboPhutLap_SLL')">
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
                                    <img id="picNgayGN_SLL" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayGN_SLL')" style="margin-left: 5px; visibility: hidden" width="22" height="23">
                                </td>
                            </tr>     
                            <tr>  
                                <td>    
                                    Tháng:
                                </td> 
                                <td>
                                    <select id="cboThang_SLL" style="width: 50%; height: 25px; color: darkblue; font-size:13px;">                                        
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
                                    </select>
                                </td> 
                                <td style="text-align: right; padding-right: 10px">
                                    Cân Nặng(kg):
                                </td>
                                <td>
                                    <input id="txtCanNang_SLL" class="txtInput" style="width: 70%; height: 25px; color: darkblue; font-size:13px; text-align: center;" title="Cân Nặng" placeholder="Đơn vị Kilogram" type="text" onkeyup="kiemTraNhapThapPhan(this);">
                                </td> 
                                <td style="text-align: right; padding-right: 10px"> 
                                    Chiều Cao(m):
                                </td>
                                <td>
                                    <input id="txtChieuCao_SLL" class="txtInput" style="width: 70%; height: 25px; color: darkblue; font-size:13px; text-align: center;" title="Chiều Cao" placeholder="Đơn vị Metre" type="text" onkeyup="kiemTraNhapThapPhan(this);">
                                </td>    
                            </tr>
                            <tr>  
                                <td>    
                                    G.nhận G.viên:
                                </td> 
                                <td colspan="5">
                                    <textarea id="txtGhiNhanGV" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi nhận Giao viên" placeholder="Ghi nhận Giao viên" ></textarea>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    G.nhận G.đình:
                                </td> 
                                <td colspan="5">
                                    <textarea id="txtGhiNhanPH" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi nhận Gia đình" placeholder="Ghi nhận Gia đình" ></textarea>
                                </td> 
                            </tr>   
                            <tr>
                                <td colspan="6" style="text-align: center;">
                                    <hr style="margin-top: 20px;">
                                    <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemSLL()"></i>                            
                                    <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaSLL()"></i>
                                    <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuSLL()"></i>
                                    <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaSLL()"></i>
                                    <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuySLL()"></i>                            
                                </td>
                            </tr>
                        </table>
                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #4E1D74; color: #4E1D74;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>                
                        </div> 
                        <table id="tbSoLienLac" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class="th-normal">
                                <tr>
                                    <th width="2%">STT</th>
                                    <th width="3%">Tháng</th>                                    
                                    <th width="5%">Cân Nặng (kg)</th>
                                    <th width="5%">Chiều Cao (m)</th>
                                    <th width="2%"></th>
                                </tr>
                            </thead>
                            <tbody id="dsSoLienLac" class="tr-normal">

                            </tbody>
                        </table>
                    </div>

                    <!--Dialog Tabs Sổ Sức khỏe -->
                    <div class="tabContent hide" id="divSoSucKhoe" style="border: 1.5px solid #009900;">
                        <div class="divTitle" style="width: auto;">                        
                            <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Sổ Sức khỏe</span>
                        </div>
                        <table style="margin:auto; width: 85%; height: auto;" border="0">
                            <col width="20px">
                            <col width="auto"> 
                            <col width="20px">
                            <col width="auto"> 
                            <col width="20px">
                            <tr>
                                <td colspan="5" style="text-align: right; width: 100%; padding: 0px 0px 5px 0px;"> 
                                    <b style="color:darkred;">Mã: <label id="lblMSHS_SK">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Họ tên:
                                </td> 
                                <td colspan="4">
                                    <b style="color:darkred;"><label id="lblHoTenHS_SK">-</label></b>
                                </td> 
                            </tr>  
                            <tr>  
                                <td>    
                                    Ngày sinh:
                                </td> 
                                <td>
                                    <label id="lblNgaySinhHS_SK" style="color: #4E1D74">-</label>
                                </td> 
                                <td style="text-align: right;">    
                                    Giới tính:
                                </td> 
                                <td colspan="2">
                                    <label id="lblGioiTinhHS_SK" style="color: #4E1D74">-</label>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Địa chỉ:
                                </td> 
                                <td colspan="4">
                                    <label id="lblDiaChiHS_SK" style="color: #4E1D74">-</label>                                    
                                </td> 
                            </tr>  
                            <tr>
                                <td colspan="5" style="text-align: right; width: 100%;">
                                    <b style="color:darkred;">Mã: <label id="lblMaLop_SK">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Tên Lớp:
                                </td> 
                                <td colspan="4">
                                    <b style="color:darkred;"><label id="lblTenLop_SK">-</label></b>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Ngày BD:
                                </td> 
                                <td>
                                    <label id="lblNgayBDBDK_SK" style="color: #4E1D74">-</label>
                                </td> 
                                <td style="text-align: right;">   
                                    Ngày KT:
                                </td> 
                                <td colspan="2">
                                    <label id="lblNgayKTBDK_SK" style="color: #4E1D74">-</label>
                                </td> 
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align: center;">
                                    <hr style="margin: 10px 0px 10px 0px; border-top: 1px dashed #009900">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align: right; width: 100%;"> 
                                    <b style="color:darkred;">Mã: <label id="lblIDSTDSK">-</label></b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ngày lập :
                                </td>
                                <td colspan="4">
                                    <input type="text" class="txtInput" id="txtNgayGN_SK" style="width: 70px; height: 25px; color: darkblue; font-size:13px;" placeholder="Ngày lập">
                                    &nbsp;
                                    Giờ :
                                    <select id="cboGioLap_SK" class="txtInput" onkeydown="keyDown(event, 'cboGioLap_SK')">
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
                                    <select id="cboPhutLap_SK" class="txtInput" onkeydown="keyDown(event, 'cboPhutLap_SK')">
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
                                    <img id="picNgayGN_SK" src="../image/32x32_calendar.png" title="Lịch" onclick="showDate(event, 'txtNgayGN_SK')" style="margin-left: 5px; visibility: hidden" width="22" height="23">
                                </td>
                            </tr>  
                            <tr>  
                                <td>    
                                    N.viên lập:
                                </td> 
                                <td colspan="4">
                                    <b style="color:darkred;"><label id="lblHoTenNV_SK">-</label></b>
                                </td> 
                            </tr>  
                            <tr>   
                                <td>
                                    Cân Nặng(kg):
                                </td>
                                <td>
                                    <input id="txtCanNang_SK" class="txtInput" style="width: 70px; height: 25px; color: darkblue; font-size:13px; text-align: center;" title="Cân Nặng" placeholder="Đ.vị Kilogram" type="text" onkeyup="kiemTraNhapThapPhan(this);">
                                </td> 
                                <td style="text-align: right;"> 
                                    Chiều Cao(m):
                                </td>
                                <td colspan="2">
                                    <input id="txtChieuCao_SK" class="txtInput" style="width: 70px; height: 25px; color: darkblue; font-size:13px; text-align: center;" title="Chiều Cao" placeholder="Đ.vị Metre" type="text" onkeyup="kiemTraNhapThapPhan(this);">
                                </td>   
                            </tr>
                            <tr>  
                                <td colspan="5">
                                    <hr style="margin: 10px 0px 10px 0px; border-top: 1px dashed #009900">
                                </td> 
                            </tr>     
                            <tr>  
                                <td>    
                                    B.sĩ khám:
                                </td> 
                                <td colspan="4">
                                    <b style="color:darkred;"><label id="lblHoTenBSKL_SK">-</label></b>
                                </td> 
                            </tr>
                            <tr>  
                                <td colspan="5">
                                    Nội dung khám:
                                </td> 
                            </tr>
                            <tr>  
                                <td></td>
                                <td colspan="4" style="padding: 5px 0px 15px 0px">
                                    <table id="tbChiTietSK" style="margin:auto; width: 100%; height: auto;" border="0" class="table-normal">
                                        <col width="170px">
                                        <col width="auto"> 
                                        <tbody id="dsChiTietSK" class="tr-normal">
                                        </tbody>
                                    </table>                                    
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    K.luận và C.dẫn:
                                </td> 
                                <td colspan="4">
                                    <textarea id="txtKetLuan_SK" class="txtInput" style="width: 100%; height: 25px; color: darkblue; font-size:13px;" title="Kết luận và chỉ dẫn của B.sĩ" placeholder="Kết luận và chỉ dẫn của B.sĩ" ></textarea>
                                </td> 
                            </tr>                            
                            <tr>
                                <td colspan="5" style="text-align: center;">
                                    <hr style="margin-top: 10px;">
                                    <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemSK()"></i>                            
                                    <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaSK()"></i>
                                    <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuSK()"></i>
                                    <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaSK()"></i>
                                    <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuySK()"></i>                            
                                </td>
                            </tr>
                        </table>
                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #4E1D74; color: #4E1D74;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>                
                        </div> 
                        <table id="tbSoSucKhoe" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class="th-normal">
                                <tr>
                                    <th width="2%">STT</th>
                                    <th width="3%">Ngày khám</th>                                    
                                    <th width="5%">Cân Nặng (kg)</th>
                                    <th width="5%">Chiều Cao (m)</th>
                                    <th width="5%">Kết luận</th>
                                    <th width="5%">N.viên lập</th>
                                    <th width="5%">B.sĩ K.luận</th>
                                    <th width="2%"></th>
                                </tr>
                            </thead>
                            <tbody id="dsSoSucKhoe" class="tr-normal">

                            </tbody>
                        </table>
                    </div>

                    <!--Dialog Tabs Học Sinh --> 
                    <div class="tabContent hide" id="divHocSinh" style="border: 1.5px solid #009900;">
                        <div class="divTitle" style="width: auto;">                        
                            <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Học sinh</span>
                        </div>
                        <table style="margin:auto; width: 85%; height: auto;" border="0">
                            <col width="15px">
                            <col width="auto">                                                                            
                            <col width="10px">
                            <col width="20px">
                            <col width="auto"> 
                            <tr>
                                <td colspan="5" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px;"> 
                                    <b style="color:darkred;">Mã: <label id="lblMSHS">-</label></b>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Họ tên:
                                </td> 
                                <td colspan="4">
                                    <input id="txtHoTenHS" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Họ tên Học sinh" placeholder="Nhập họ tên" type="text">
                                </td> 
                            </tr>  
                            <tr>  
                                <td>    
                                    Tên thân mật:
                                </td> 
                                <td colspan="4">
                                    <input id="txtTenTMHS" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Tên thân mật" placeholder="Nhập tên thân mật" type="text">
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Ngày sinh:
                                </td> 
                                <td style="text-align: left">
                                    <input id="txtNgaySinhHS" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Ngày sinh" placeholder="Nhập ngày sinh" type="text">
                                </td> 
                                <td>
                                    <img id="picNgaySinhHS" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgaySinhHS')" width="22" height="23" align="middle">
                                </td>
                                <td>    
                                    Giới tính:
                                </td> 
                                <td style="text-align: left">
                                    <select id="cboGioiTinhHS" class="txtInput" style="width: 100%; height: 27px; color: darkblue; font-size:13px;">
                                        <option value="true">Nam</option>
                                        <option value="false">Nư</option>
                                    </select>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Quốc tịch:
                                </td> 
                                <td colspan="4">
                                    <input id="txtQuocTichHS" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Quốc tịch" placeholder="Nhập quốc tịch" type="text">                                    
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Địa chỉ:
                                </td> 
                                <td colspan="4">
                                    <textarea id="txtDiaChiHS" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Địa chỉ" placeholder="Nhập địa chỉ học sinh" ></textarea>
                                </td> 
                            </tr>  
                            <tr>  
                                <td>    
                                    Ghi chú:
                                </td> 
                                <td colspan="4">
                                    <textarea id="txtGhiChuHS" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                </td> 
                            </tr>   
                            <!--                            <tr>
                                                            <td colspan="5" style="text-align: center;">
                                                                <hr style="margin-top: 20px;">
                                                                <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemHS()"></i>                            
                                                                <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaHS()"></i>
                                                                <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuHS()"></i>
                                                                <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaHS()"></i>
                                                                <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyHS()"></i>                            
                                                            </td>
                                                        </tr>-->
                        </table>   
                        <hr id="hrLopHoc" style="margin: 30px 15px 20px 5px; padding: 0; border: none; border-top: medium double #009900;">
                        <div class="divTitle" style="width: auto;">                        
                            <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Phụ huynh</span>
                        </div>
                        <table id="tbPhuHuynh" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class="th-normal">
                                <tr>
                                    <th width="2%">STT</th>
                                    <th width="7%">Họ tên</th>                                    
                                    <th width="3%">Ngày sinh</th>
                                    <th width="3%">Giới tính</th>
                                    <th width="3%">Điện thoại</th>
                                    <th width="3%">Email</th>
                                    <th width="11%">Nơi làm việc</th>
                                    <th width="8%">Quan hệ</th>
                                </tr>
                            </thead>
                            <tbody id="dsPhuHuynh" class="tr-normal">
                            </tbody>
                        </table>
                    </div>

                    <!--Dialog Tabs Chủ Nhiệm Lớp -->
                    <div class="tabContent hide" id="divChuNhiem" style="border: 1.5px solid #009900;">
                        <table style="margin:auto; width: 95%; height: auto;" border="0">                            
                            <tr>
                                <td style="width: 50%; height: auto; vertical-align:top; border: none; border-right: medium double #4E1D74;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Chủ nhiệm</span>
                                    </div>
                                    <table style="margin:auto; width: 100%; height: auto; padding-right: 7px" border="0">
                                        <col width="20px">
                                        <col width="100px"> 
                                        <col width="20px">
                                        <col width="100px">   
                                        <tr>
                                            <td colspan="4" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblIDCNL">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Loại Lớp:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLoaiLop_CNL" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopCNL();">
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Lớp:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLop_CNL" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHocCNL('-1')">
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Học Kỳ:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboHocKy_CNL" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder" onchange="cboLopHocCNL('-1')">
                                                </select>
                                            </td> 
                                        </tr>                                        
                                        <tr>  
                                            <td>    
                                                Lớp Học:
                                            </td> 
                                            <td colspan="3">
                                                <select id="cboLopHoc_CNL" class="txtInput" style="width: 100%; height: 27px; color: darkred; font-size:13px; font-weight: bolder">
                                                </select>                                                
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Ngày BD:
                                            </td> 
                                            <td>
                                                <input id="txtNgayBD_CNL" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:13px;" title="Ngày bắt đầu" type="text">
                                                <img id="picNgayBD_CNL" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgayBD_CNL')" width="22" height="23" align="middle">
                                            </td> 
                                            <td>    
                                                Ngày KT:
                                            </td> 
                                            <td>
                                                <input id="txtNgayKT_CNL" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:13px;" title="Ngày kết thúc" type="text">
                                                <img id="picNgayKT_CNL" src="../image/32x32_calendar.png" style="margin: 0px 5px; visibility: hidden" title="Lịch" onclick="showDate(event, 'txtNgayKT_CNL')" width="22" height="23" align="middle">
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Ghi chú:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtGhiChu_CNL" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                            </td> 
                                        </tr>      
                                    </table>
                                </td>
                                <td style="width: 50%; height: auto; vertical-align:top;">
                                    <div class="divTitle" style="width: auto;">                        
                                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Giáo viên</span>
                                    </div>
                                    <table style="margin:auto; width: 100%; height: auto; padding-left: 7px" border="0">
                                        <col width="65px">
                                        <col width="auto">                                                                            
                                        <col width="20px">
                                        <col width="auto"> 
                                        <tr>
                                            <td colspan="4" style="text-align: right; width: 100%; padding: 10px 0px 10px 0px;"> 
                                                <b style="color:darkred;">Mã: <label id="lblMaNV">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Họ tên:
                                            </td> 
                                            <td colspan="3">
                                                <input id="txtHoTenNV" class="txtInput" style="width: 100%; height: 28px; color: darkblue; font-size:13px;" title="Họ tên" type="text">
                                            </td> 
                                        </tr>  
                                        <tr>  
                                            <td>    
                                                Ngày sinh:
                                            </td> 
                                            <td>
                                                <input id="txtNgaySinhNV" class="txtInput" style="width: 100px; height: 28px; color: darkblue; font-size:13px;" title="Ngày sinh" type="text">
                                            </td> 
                                            <td>    
                                                Giới tính:
                                            </td> 
                                            <td>
                                                <select id="cboGioiTinhNV" class="txtInput" style="width: 150px; height: 27px; color: darkblue; font-size:13px;">
                                                    <option value="true">Nam</option>
                                                    <option value="false">Nư</option>
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Điện thoại:
                                            </td> 
                                            <td>
                                                <input id="txtDienThoaiNV" class="txtInput" style="width: 100px; height: 28px; color: darkblue; font-size:13px;" title="Điện thoại" type="text">
                                            </td> 
                                            <td>    
                                                Gmail:
                                            </td> 
                                            <td>
                                                <input id="txtGmailNV" class="txtInput" style="width: 150px; height: 28px; color: darkblue; font-size:13px;" title="Gmail" type="text">
                                            </td> 
                                        </tr>                                                                                  
                                        <tr>  
                                            <td>    
                                                Địa chỉ:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtDiaChiNV" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Địa chỉ" ></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Chức danh:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtChucDanhNV" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" title="Chức danh" ></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td>    
                                                Ghi chú:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtGhiChuNV" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:13px;" title="Ghi chú" ></textarea>
                                            </td> 
                                        </tr>                               
                                    </table>  
                                </td>                                
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <hr style="margin-top: 20px;">
                                    <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemCNL()"></i>                            
                                    <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaCNL()"></i>
                                    <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuCNL()"></i>
                                    <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaCNL()"></i>
                                    <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyCNL()"></i>                            
                                </td>
                            </tr>
                        </table>
                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #009900; color: #009900;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>                
                        </div> 
                        <table id="tbChuNhiem" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                            <thead class='th-normal'>
                                <tr>
                                    <th width='3%'>STT</th>
                                    <th width='20%'>Tên Lớp</th>
                                    <th width='5%'>Ngày BD</th>
                                    <th width='5%'>Giới KT</th>
                                    <th width='45%'>Ghi chú</th>
                                    <th width='3%'></th>
                                </tr>
                            </thead>
                            <tbody id='dsChuNhiem' class='tr-normal'></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!--Dialog Tabs Calendar -->
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
    </center>
</body>
</html>