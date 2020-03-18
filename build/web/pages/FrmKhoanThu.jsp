<%-- 
    Document   : FrmKhoanThu
    Created on : July 10, 2018, 11:22:04 AM
    Author     : sol
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <title>Quản lý Khoản Thu</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script> 
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>
        <script type="text/javascript" src="../javascript/mopCalendar.js"></script>

        <script type="text/javascript" src="../javascript/CacHamXuLy.js"></script>
        <script type="text/javascript" src="../javascript/myScript/jsLoaiVe.js"></script>

        <link rel="stylesheet" type="text/css" media="all" href="../css/tableCSS.css"  />
        <link rel="stylesheet" type="text/css" media="all" href="../css/mopCalendar.css"/>

        <link rel="stylesheet" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">

        <style>
            html, body {                             
                margin: auto; 
                padding: auto;
            }
        </style>
        <script type="text/javascript"> // Load form
            $(document).ready(function () {
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

                funDropAndDrap();
                danhSachLoaiVe();
                resetNoiDung();
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
             margin: 0px 3px 0px -2px;">
            <div style="background: #009900; width: auto; padding-top: 7px; padding-bottom: 7px;" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px">QUẢN LÝ KHOẢN THU</span>
            </div>  
            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 5px 0px 0px 5px;" align="right">           
                <label id="tendn">Nhân viên:<b style="color: firebrick;"> <%=session.getAttribute("hoTenNV")%> </b> || Đơn vị: <b style="color: firebrick;"> <%=session.getAttribute("tenDV")%></b></label>
            </div>
            <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 5px 0px 0px 5px" align="left"> 
                <div class="divTitle" style="width: auto;">
                    <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;"></i>                                       
                    <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Thông tin</span>                
                </div>
                <table style="margin:auto; width:600px" border="0">
                    <col width="15">
                    <col width="170"> 
                    <tr>
                        <td colspan="2" style="text-align: right; width: 100%">                                                                   
                            <b style="color:darkgreen">ID: <label id="lblIDKT">-</label></b>
                            <br>
                            <br>
                        </td>
                    </tr>
                    <tr>  
                        <td style="text-align: left;">    
                            Khoan Thu:
                        </td> 
                        <td style="text-align: left">
                            <textarea id="tenKhoanThu" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px" title="Tên Khoan Thu" placeholder="Tên Khoan Thu" ></textarea>
                        </td> 
                    </tr>
                    <tr>  
                        <td style="text-align: left;">    
                            Số lần thu:
                        </td> 
                        <td style="text-align: left">
                            <textarea id="soLan" class="txtInput" style="width: 100%; height: 20px; color: darkblue; font-size:13px" title="Số lần" placeholder="Số lần" ></textarea>
                        </td> 
                    </tr>                    

                    <tr>  
                        <td style="text-align: left;">    
                            Ghi chú:
                        </td> 
                        <td style="text-align: left">
                            <textarea id="ghiChu" class="txtInput" style="width: 100%; height: 40px; color: darkblue; font-size:13px" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                        </td> 
                    </tr>

                    <tr>  
                        <td style="text-align: left;">    
                            Bắt buộc :
                        </td> 
                        <td style="text-align: left">
                            <input type="checkbox" id="chkBatBuoc" name="chkBatBuoc">
                        </td> 
                    </tr>  

                    <tr>
                        <td colspan="2" style="text-align: center">
                            <hr style="margin-top: 20px">
                            <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThem()"></i>                            
                            <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSua()"></i>
                            <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuu()"></i>
                            <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoa()"></i>
                            <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuy()"></i>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 5px 0px 0px 5px" align="left"> 
                <div class="divTitle" style="width: auto;">
                    <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;"></i>           
                    <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Danh sách</span>              
                </div> 
                <table style="width:100%">
                    <tr>
                        <td style="vertical-align:top; width:100%; height:auto">  
                            <div id="divLoaiVe" >
                                <table id="tbLoaiVe" border="1" style="width:100%" class="table-normal">
                                    <thead class="th-normal">
                                        <tr>
                                            <th width="3%">STT</th>
                                            <th width="45%">Tên Khoản Thu</th>
                                            <th width="8%">Bắt Buộc</th>
                                            <th width="7%">Giá</th>
                                            <th width="2%"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="dsLoaiVe" class="tr-normal">

                                    </tbody>
                                </table>
                            </div>                                                            
                        </td>
                    </tr>        
                </table>
            </div>            
        </div>
    </center>

    <!--Dialog chi tiết Dialog Modal-->
    <div id="divMyDialog" class="dialogclass hidden" role="dialog" aria-hidden="true"> </div>

    <center style="width: 100%;">
        <!--Dialog chi tiết giá Loại vé-->
        <div id="divGiaLoaiVe"              
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
            <div id="headerGiaLoaiVe" style="cursor: move; background: #009900; width: auto; padding: 4px; margin: 1px" align="center">                 
                <i class="sButtonIframeForm fa-close fa-1x" title="Đóng" onclick="funDongSMS('divGiaLoaiVe')"></i> 
                <span style="color:white; font-weight: bold; font-size: 20px"> GIÁ KHOẢN THU </span>
            </div>
            <table style="width: 100%">
                <tr style="width: 100%">
                    <td style="vertical-align:top; width:40%;">  
                        <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 1px 0px 1px 1px; padding: 5px 5px 5px 5px" align="left">
                            <div class="divTitle" style="width: auto;">
                                <span  style="color:#4E1D74; font-weight: bold; font-size: 17px">Thông tin Khoan Thu</span>                
                            </div>
                            <table style="width: 100%;" border="0">
                                <col width="50">
                                <col width="100"> 
                                <tr>
                                    <td colspan="2" align="right">
                                        ID :&nbsp; <label id="smsIDKT">-</label><br>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Tên:
                                    </td>
                                    <td align="Left">
                                        <label id="smsTenLoaiVe">-</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Bắt buộc:
                                    </td>
                                    <td align="Left">
                                        <input type="checkbox" id="chkSmsBatBuoc" name="chkSmsBatBuoc" disabled>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 1px 0px 1px 1px; padding: 5px 5px 5px 5px" align="left">
                            <div class="divTitle" style="width: auto;">
                                <span style="color:#4E1D74; font-weight: bold; font-size: 17px">Thông tin Giá</span>                
                            </div>
                            <table style="width: 100%;" border="0">
                                <col width="100">
                                <col width="80"> 
                                <col width="20"> 
                                <tr>
                                    <td colspan="3" align="right">
                                        ID :&nbsp; <label id="smsIDGia">-</label><br><br>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Ngày bắt đầu:</td>
                                    <td align="left">
                                        <input id="smsNgayBD" class="txtInput" type="text" style="width:100%" placeholder="dd/mm/yyyy" disabled  title="Ngày bắt đầu" onkeydown="keyDown(event, 'smsNgayBD')" onblur="keyDown(event, 'smsNgayBD');"/>
                                    </td>
                                    <td>
                                        <img src="../image/32x32_calendar.png" align="middle" style="margin: 0px 5px" title="Lịch" width="22" height="23" onclick="showDate(event, 'smsNgayBD')"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Ngày kết thúc:</td>
                                    <td align="left">
                                        <input id="smsNgayKT" class="txtInput" type="text" style="width:100%" placeholder="dd/mm/yyyy" disabled title="Ngày kết thúc." onkeydown="keyDown(event, 'smsNgayKT')" onblur="keyDown(event, 'smsNgayKT')"/>                                      
                                    </td>
                                    <td>
                                        <img src="../image/32x32_calendar.png" align="middle" style="margin: 0px 5px" title="Lịch" width="22" height="23" onclick="showDate(event, 'smsNgayKT')"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Giá:</td>
                                    <td align="left">
                                        <input id="smsGiaLoaiVe" class="txtInput" type="text" style="width:100%; text-align: right" placeholder="0" disabled title="Giá loại vé" onkeyup="ChiNhapSo(this);
                                                DinhDangSo(this);"/>
                                    </td>
                                    <td>
                                        <label>đ</label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <hr>
                        <div style=" width: 100%;" align="center">
                            <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemSMS()"></i>                            
                            <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuSMS()"></i>
                            <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaSMS()"></i>
                            <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuySMS()"></i>
                        </div>
                    </td>
                    <td style="vertical-align:top; width:100%;">
                        <!-- height: 350px;-->
                        <div style="background: #FFFFFF; width: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 1px 0px 1px 1px; padding: 5px 5px 5px 5px" align="left">                            
                            <table id="tbGiaLoaiVe" border="1" style="width:100%" class="table-normal">
                                <thead class="th-normal">
                                    <tr>
                                        <th width=4%>STT</th>
                                        <th width=8%>Ngày BĐ</th>
                                        <th width=8%>Ngày KT</th>
                                        <th width=12%>Giá</th>
                                    </tr>
                                </thead>
                                <tbody id="dsGiaLoaiVe" class="tr-normal">
                                </tbody>
                            </table>
                        </div>
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
