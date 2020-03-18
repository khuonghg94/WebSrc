<%-- 
    Document   : FrmHocSinh_new
    Created on : Sep 24, 2019, 10:09:22 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script> 
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>
        <script type="text/javascript" src="../javascript/mopCalendar.js"></script>

        <script type="text/javascript" src="../javascript/CacHamXuLy.js"></script>
        <script type="text/javascript" src="../javascript/myScript/jsHocSinh_new.js"></script>
        
        <link rel="stylesheet" type="text/css" href="../css/tableCSS.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../css/mopCalendar.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">
        <title>Quản lý Học Sinh</title>
        <style>
            body, html{
                font-family: Arial, Tahoma;
                font-size: 12px;
                min-height: 100%
            }
            #head{
                background: #009900;
                width: auto;
                padding-top: 7px;
                padding-bottom: 7px;
            }
            #left{
                width: 30%;
                min-height: auto;
                border: 1.1px solid #EA8114;
                float:left;
                background-color: #FFFFCC;
                margin-bottom: 5px;
                border-radius: 0.1em;
                margin: 5px 2px 5px 5px; 
                padding: 5px 0px 0px 5px;
            }
            #right{
                width: 67%;
                min-height: auto;
                border: 1.1px solid #EA8114;
                background-color: #FFFFCC;
                float:right;
                margin-bottom: 5px;
                border-radius: 0.1em;
                margin: 5px 3px 5px 2px; 
                padding: 5px 5px 0px 5px;
                display: flex;
                flex-direction: column;
            }
            #search{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #add{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #divTitle{
                display: flex;
                align-items: center;
                justify-content: center;
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
        <script type="text/javascript"> 
            init_reload();
            $(document).ready(function () {
               cboLoaiLop();
               cboHocKy();   
               $("#divDangKy").removeClass("hide");
            });
            
        </script> 
    </head>
    <body>
        <div id="main">
            <div id="head" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px;">QUẢN LÝ HỌC SINH</span>
            </div>
            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 5px 0px 0px 5px;" align="right">           
                <label id="tendn">Nhân viên:<b style="color: firebrick;"> <%=session.getAttribute("hoTenNV")%> </b> || Đơn vị: <b style="color: firebrick;"> <%=session.getAttribute("tenDV")%></b></label>
            </div>
            <div id="left" align="left">  
                <table id="tbSearch" style="margin: auto; width: 90%; height: auto; display: table;" border="0">
                    <colgroup><col width="18px">
                        <col width="100px">                                                
                    </colgroup>
                    <tbody>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Loại Lớp:
                            </td> 
                            <td>
                                <select id="cboLoaiLop" style="width: 100%; height: 27px; color: darkred; font-size:16px" onchange="cboLop()">                                                                       
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Lớp:
                            </td> 
                            <td>
                                <select id="cboLop" style="width: 100%; height: 27px; color: darkred; font-size:16px">                                   
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Học Kỳ:
                            </td> 
                            <td>
                                <select id="cboHocKy" style="width: 100%; height: 27px; color: darkred; font-size:16px">
                                </select>
                            </td> 
                        </tr>
                        <tr></tr>
                    </tbody>
                </table>
                <div id="search">
                    <button id="btn_search" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="showTT_Search()"> Tìm kiếm </button>
                </div>
                <hr id="hrLopHoc" style="margin: 15px 15px 20px 5px; padding: 0px; border-right: none; border-bottom: none; border-left: none; border-image: initial; border-top: medium double rgb(78, 29, 116); color: rgb(78, 29, 116); display: block;">
                <div id="divTitle" style="width: auto;">                                  
                    <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÔNG TIN CÁC LỚP HỌC</span>
                </div>
                <table id="tbTTLopHoc" style="margin: auto; width: 90%; height: auto; display: table;" border="0">
                    <colgroup>
                        <col width="20px">
                        <col width="100px">                                                
                    </colgroup>
                    <tbody>
                        <tr></tr>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Mã Lớp:
                            </td> 
                            <td>
                                <select id="cboMaLop" style="width: 50%; height: 32px; color: darkred; font-size:16px" onchange="showTTLopHoc()">                                                                       
                                </select>
                            </td> 
                        </tr>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Loại Lớp:
                            </td> 
                            <td>
                                <textarea id="txtTenLoaiLop" style="width: 100%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                            </td> 
                        </tr>              
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Học Kỳ:
                            </td> 
                            <td>
                                <textarea id="txtHocKy" style="width: 100%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                            </td> 
                        </tr>
                        <tr>  
                            <td style="font-size: 16px; font-weight: bold">    
                                Tên Lớp:
                            </td> 
                            <td>
                                <textarea id="txtTenLop" style="width: 100%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                            </td> 
                        </tr>
                        <tr id="trControl">
                            <td colspan="2" style="text-align: center;">
                                <hr style="margin-top: 20px;">
                                <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="Open_ThemLopHoc()"></i>                            
                                <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="Open_UpdateLopHoc()"></i>
                                <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="DeleteLopHoc()"></i>                           
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="divThemMoiLopHoc" style="display: none">
                    <div id="divTitle" style="width: auto;">                                  
                        <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÊM LỚP HỌC MỚI</span>
                    </div>
                    <table id="tbSearch" style="margin: auto; width: 90%; height: auto; display: table;" border="0">
                        <colgroup>
                            <col width="100px">
                        </colgroup>
                        <tbody>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Loại Lớp:
                                </td> 
                                <td>
                                    <select id="cboLoaiLop1" style="width: 100%; height: 27px; color: darkred; font-size:16px" onchange="cboLop1()">
                                    </select>
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Lớp:
                                </td> 
                                <td>
                                    <select id="cboLop1" style="width: 100%; height: 27px; color: darkred; font-size:16px" onchange="setTenLopHoc()">
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Học Kỳ:
                                </td> 
                                <td>
                                    <select id="cboHocKy1" style="width: 100%; height: 27px; color: darkred; font-size:16px" onchange="setTenLopHoc()">
                                        <option value="-1">--Chọn Học Kỳ--</option>
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Tên Lớp:
                                </td> 
                                <td>
                                    <textarea id="txtTenLop_DK" style="width: 97%; height: 30px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                </td>
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Ghi Chú:
                                </td> 
                                <td>
                                    <textarea id="txtGhiChu_DK" style="width: 97%; height: 30px; color: darkblue; font-size:16px;"></textarea>
                                </td>
                            </tr>
                            <tr></tr>
                        </tbody>
                    </table>
                    <div id="add">
                        <button id="btn_addlopHoc" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="ThemLopHocMoi()"> Thêm Lớp Học </button>
                        <button id="btn_huyAdd" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_ThemLopHoc()"> Hủy </button>
                    </div>
                    <hr style="margin-top: 5px;">
                </div>
                <div id="divUpdateLopHoc" style="display: none">
                    <div id="divTitle" style="width: auto;">                                  
                        <span style="color: #00f ; font-weight: bold; font-size: 22px;">SỬA THÔNG TIN LỚP HỌC</span>
                    </div>
                    <table id="tbSearch" style="margin: auto; width: 90%; height: auto; display: table;" border="0">
                        <colgroup>
                            <col width="100px">
                        </colgroup>
                        <tbody>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Loại Lớp:
                                </td> 
                                <td>
                                    <select id="cboLoaiLop2" style="width: 100%; height: 27px; color: darkred; font-size:16px" disabled="" onchange="cboLop2()">
                                    </select>
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Lớp:
                                </td> 
                                <td>
                                    <select id="cboLop2" style="width: 100%; height: 27px; color: darkred; font-size:16px" disabled="">
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Học Kỳ:
                                </td> 
                                <td>
                                    <select id="cboHocKy2" style="width: 100%; height: 27px; color: darkred; font-size:16px" disabled="">
                                    </select>
                                </td> 
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Tên Lớp:
                                </td> 
                                <td>
                                    <textarea id="txtTenLop_Upd" style="width: 97%; height: 30px; color: darkblue; font-size:14px;"></textarea>
                                </td>
                            </tr>
                            <tr>  
                                <td style="font-size: 16px; font-weight: bold">    
                                    Ghi Chú:
                                </td> 
                                <td>
                                    <textarea id="txtGhiChu_Upd" style="width: 97%; height: 30px; color: darkblue; font-size:16px;"></textarea>
                                </td>
                            </tr>
                            <tr></tr>
                        </tbody>
                    </table>
                    <div id="add">
                        <button id="btn_updatelopHoc" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="UpdateLopHoc()"> Cập Nhật </button>
                        <button id="btn_huyUpdate" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_UpdateLopHoc()"> Hủy </button>
                    </div>
                    <hr style="margin-top: 5px;">
                </div>
                <div id="showDSHS">
                    <div id="divTitle" style="width: auto;">                                  
                        <span style="color: #00f ; font-weight: bold; font-size: 22px;">DANH SÁCH HỌC SINH</span>
                    </div>
                    <table id="tbDSHS" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                        <thead class="th-normal"> 
                            <tr>         
                                <th width="10%">STT</th>
                                <th width="10%">MSHS</th> 
                                <th width="50%">Họ Tên</th> 
                                <th width="20%"></th> 
                            </tr>
                        </thead>
                        <tbody id="dsHocSinh" class="tr-normal">
                        </tbody>
                    </table>
                </div>
            </div> 
            <div style="background: #FFFFFF; width: 67%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 3px 5px 2px; padding: 5px 5px 0px 5px; display: flex; flex-direction: column;" align="right">
                <div style="width: 100%; height: auto">
                    <ul id="tabsB" style="width:100%; text-align: left">
                        <li><a id="aDangKy" href="#DangKy" onclick="showTabDangKy();" style="font-size: 16px">Đăng ký Lớp</a></li>
                        <li><a id="aSoSucKhoe" href="#SoSucKhoe" onclick="showTabSoSucKhoe();" style="font-size: 16px">Sổ Sức khỏe</a></li>                             
                    </ul>    
                </div>
        <!-- TAB: Dang Ky Thong Tin -->
                <div class="tabContent hide" id="divDangKy" style="border: 1.5px solid #009900;">
                        <table style="margin:auto; width: 95%; height: auto" border="0">                            
                            <tbody>
                                <tr>
                                    <td style="width: 50%; height: auto; vertical-align:top;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÔNG TIN HỌC SINH</span>
                                        </div>                                 
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                            <colgroup>
                                                <col width="180px">
                                                <col width="180px">
                                                <col width="120px">
                                                <col width="160px">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td colspan="4" style="text-align: right; width: 90%; padding: 10px 0px 10px 0px;font-size: 16px"> 
                                                        <b style="color:darkred;">MÃ HỌC SINH: <label id="lblMSHS">-</label></b>
                                                    </td>
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Họ tên:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtHoTenHS_BDK" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Tên thân mật:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtTTMHS_BDK" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>                                                                                                                                   
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày sinh:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtNgaySinhHS_BDK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Giới tính:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtGioiTinhHS_BDK" style="width: 88%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Quốc tịch:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtQuocTich_HS" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Địa chỉ:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtDiaChi_HS" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ghi chú:
                                                    </td> 
                                                    <td colspan="3">
                                                        <textarea id="txtGhiChu_HS" style="width: 96%; height: 30px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                                    </td> 
                                                </tr>      
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="width: 50%; height: auto; vertical-align:top; border: none; border-left: medium double #4E1D74;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÔNG TIN ĐĂNG KÝ</span>
                                        </div>
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                        <colgroup>
                                            <col width="120px">
                                            <col width="160px">
                                            <col width="120px">
                                            <col width="160px">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td colspan="4" style="text-align: right; width: 90%; padding: 10px 0px 10px 0px;font-size: 16px"> 
                                                    <b style="color:darkred;">MÃ ĐĂNG KÝ: <label id="lblIDBDK">-</label></b>
                                                </td>
                                            </tr>
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Loại Lớp:
                                                </td> 
                                                <td>
                                                    <textarea id="txtLoaiLop_BDK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                            </tr>
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Tên Lớp:
                                                </td> 
                                                <td>
                                                    <textarea id="txtTenLop_BDK" style="width: 100%; height: 35px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                            </tr>                                                                                   
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ngày BD:
                                                </td> 
                                                <td>
                                                    <textarea id="txtNgayBD_BDK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td>  
                                            </tr>
                                            <tr>
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ngày KT:
                                                </td> 
                                                <td>
                                                    <textarea id="txtNgayKT_BDK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td>
                                            </tr>
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ghi chú:
                                                </td> 
                                                <td colspan="3">
                                                    <textarea id="txtGhiChu_BDK" style="width: 100%; height: 35px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                                </td> 
                                            </tr>      
                                        </tbody>
                                    </table>
                                    </td>                                                                                 
                                </tr>
                                <tr></tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <hr style="margin-top: 20px;">
                                        <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="Open_ThemDKM()"></i>                            
                                        <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="Open_UpdateDK()"></i>      
                                        <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="xoaDK()"></i>                                         
                                    </td>
                                </tr>
                                <tr>       
                                    <table id="tbDSDK" style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                        <thead class="th-normal"> 
                                            <tr>
                                                <div id="divTitle" style="width: auto;">                                  
                                                <span style="color: #00f ; font-weight: bold; font-size: 22px;">DANH SÁCH CÁC LỚP HỌC SINH ĐÃ ĐĂNG KÝ</span>
                                            </div>
                                            </tr>
                                            <tr>         
                                                <th width="10%">STT</th>
                                                <th width="10%">MSĐK</th>
                                                <th width="35%">Tên Lớp</th> 
                                                <th width="25%">Ghi chú</th>
                                                <th width="10%"></th>
                                                <th width="10%"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="dsLopHoc" class="tr-normal">
                                        </tbody>
                                    </table>
                                </tr>
                                
                            </tbody>
                        </table>
                        <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #009900; color: #009900;">
                        <div id="divThemDKMoi" style="display: none">
                            <div id="divTitle" style="width: auto;">                                  
                                <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÊM ĐĂNG KÝ MỚI</span>
                            </div>
                            <table style="margin:auto; width: 95%; height: auto" border="0">                            
                            <tbody>
                                <tr>
                                    <td style="width: 50%; height: auto; vertical-align:top;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #b0006e ; font-weight: bold; font-size: 20px;">THÔNG TIN ĐĂNG KÝ</span>
                                        </div>                                 
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                            <colgroup>
                                                <col width="40px">
                                                <col width="160px">
                                            </colgroup>
                                            <tbody>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Loại Lớp:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtTenLoaiLop_DKM" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>              
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Học Kỳ:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtHocKy_DKM" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Tên Lớp:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtTenLop_DKM" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày BD:
                                                    </td> 
                                                    <td colspan="2">
                                                        <input id="txtNgayBD_DKM" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:14px;" title="Ngày bắt đầu" type="text">
                                                        <img id="picNgayBD_DKM" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayBD_DKM')" width="22" height="23" align="middle">
                                                    </td>     
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày KT:
                                                    </td> 
                                                    <td colspan="2">
                                                        <input id="txtNgayKT_DKM" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:14px;" title="Ngày kết thúc" type="text">
                                                        <img id="picNgayKT_DKM" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayKT_DKM')" width="22" height="23" align="middle">
                                                    </td>            
                                                </tr>
                                                <td style="font-size: 16px; font-weight: bold">    
                                                        Ghi chú:
                                                </td> 
                                                <td>
                                                    <textarea id="txtGhiChuDK_DKM" class="txtInput" style="width: 90%; height: 35px; color: darkblue; font-size:16px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                                </td>     
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="width: 50%; height: auto; vertical-align:top; border: none; border-left: medium double #4E1D74;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #b0006e ; font-weight: bold; font-size: 20px;">THÔNG TIN HỌC SINH</span>
                                        </div>
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                            <colgroup>
                                                <col width="190px">
                                                <col width="160px">
                                                <col width="120px">
                                                <col width="160px">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Họ tên:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtHoTenHS_DKM" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Họ tên Học sinh" placeholder="Nhập họ tên" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Tên thân mật:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtTenTMHS_DKM" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Tên thân mật" placeholder="Nhập tên thân mật" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày Sinh:
                                                    </td> 
                                                    <td>
                                                        <input id="txtNgaySinhHS_DKM" class="txtInput" style="width: 70px; height: 28px; color: darkblue; font-size:14px;" title="Ngày sinh" type="text">
                                                        <img id="picNgaySinhHS_DKM" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgaySinhHS_DKM')" width="22" height="23" align="middle">
                                                    </td>            
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Giới tính:
                                                    </td> 
                                                    <td colspan="2">
                                                        <select id="cboGioiTinhHS_DKM" style="width: 150%; height: 28px; color: darkred; font-size:16px">
                                                            <option value="-1">--Chọn Giới Tính--</option>
                                                            <option value="1">Nam</option>
                                                            <option value="2">Nữ</option>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Quốc tịch:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtQuocTichHS_DKM" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Quốc tịch Học sinh" placeholder="Nhập quốc tịch" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Địa chỉ:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtDiaChiHS_DKM" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Địa chỉ Học sinh" placeholder="Nhập địa chỉ" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ghi chú:
                                                    </td> 
                                                    <td colspan="3">
                                                        <textarea id="txtGhiChuHS_DKM" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:16px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>                                                                                 
                                </tr>                                      
                            </tbody>
                        </table>
                        <div id="add">
                            <button id="btn_addDKM" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="ThemDangKyMoi()"> Thêm Đăng Ký Mới </button>
                            <button id="btn_huyAddDKM" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_ThemDKM()"> Hủy </button>
                        </div>
                    </div>
                    <div id="divUpdateDK" style="display: none">
                            <div id="divTitle" style="width: auto;">                                  
                                <span style="color: #00f ; font-weight: bold; font-size: 22px;">CHỈNH SỬA THÔNG TIN ĐĂNG KÝ</span>
                            </div>
                            <table style="margin:auto; width: 95%; height: auto" border="0">                            
                            <tbody>
                                <tr>
                                    <td style="width: 50%; height: auto; vertical-align:top;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #b0006e ; font-weight: bold; font-size: 20px;">THÔNG TIN ĐĂNG KÝ</span>
                                        </div>                                 
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                            <colgroup>
                                                <col width="40px">
                                                <col width="160px">
                                            </colgroup>
                                            <tbody>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Loại Lớp:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtTenLoaiLop_Upd" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>              
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Học Kỳ:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtHocKy_Upd" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Tên Lớp:
                                                    </td> 
                                                    <td>
                                                        <textarea id="txtTenLop_Upd_DK" style="width: 90%; height: 32px; color: darkblue; font-size:14px;" disabled=""></textarea>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày BD:
                                                    </td> 
                                                    <td colspan="2">
                                                        <input id="txtNgayBD_Upd" class="txtInput" style="width: 80px; height: 28px; color: darkblue; font-size:14px;" title="Ngày bắt đầu" type="text">
                                                        <img id="picNgayBD_Upd" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayBD_Upd')" width="22" height="23" align="middle">
                                                    </td>     
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày KT:
                                                    </td> 
                                                    <td colspan="2">
                                                        <input id="txtNgayKT_Upd" class="txtInput" style="width: 80px; height: 28px; color: darkblue; font-size:14px;" title="Ngày kết thúc" type="text">
                                                        <img id="picNgayKT_Upd" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayKT_Upd')" width="22" height="23" align="middle">
                                                    </td>            
                                                </tr>
                                                <td style="font-size: 16px; font-weight: bold">    
                                                        Ghi chú:
                                                </td> 
                                                <td>
                                                    <textarea id="txtGhiChuDK_Upd" class="txtInput" style="width: 90%; height: 35px; color: darkblue; font-size:16px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                                </td>     
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="width: 50%; height: auto; vertical-align:top; border: none; border-left: medium double #4E1D74;">
                                        <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #b0006e ; font-weight: bold; font-size: 20px;">THÔNG TIN HỌC SINH</span>
                                        </div>
                                        <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                            <colgroup>
                                                <col width="190px">
                                                <col width="160px">
                                                <col width="120px">
                                                <col width="160px">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Họ tên:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtHoTenHS_Upd" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Họ tên Học sinh" placeholder="Nhập họ tên" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Tên thân mật:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtTenTMHS_Upd" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Tên thân mật" placeholder="Nhập tên thân mật" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ngày Sinh:
                                                    </td> 
                                                    <td>
                                                        <input id="txtNgaySinhHS_Upd" class="txtInput" style="width: 80px; height: 28px; color: darkblue; font-size:14px;" title="Ngày sinh" type="text">
                                                        <img id="picNgaySinhHS_Upd" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgaySinhHS_Upd')" width="22" height="23" align="middle">
                                                    </td>            
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Giới tính:
                                                    </td> 
                                                    <td colspan="2">
                                                        <select id="cboGioiTinhHS_Upd" style="width: 150%; height: 28px; color: darkred; font-size:16px">
                                                            <option value="-1">--Chọn Giới Tính--</option>
                                                            <option value="1">Nam</option>
                                                            <option value="2">Nữ</option>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Quốc tịch:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtQuocTichHS_Upd" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Quốc tịch Học sinh" placeholder="Nhập quốc tịch" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Địa chỉ:
                                                    </td> 
                                                    <td colspan="3">
                                                        <input id="txtDiaChiHS_Upd" style="width: 100%; height: 28px; color: darkblue; font-size:16px;" title="Địa chỉ Học sinh" placeholder="Nhập địa chỉ" type="text">
                                                    </td> 
                                                </tr>
                                                <tr>  
                                                    <td style="font-size: 16px; font-weight: bold">    
                                                        Ghi chú:
                                                    </td> 
                                                    <td colspan="3">
                                                        <textarea id="txtGhiChuHS_Upd" class="txtInput" style="width: 100%; height: 45px; color: darkblue; font-size:16px;" title="Ghi chú" placeholder="Ghi chú" ></textarea>
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>                                                                                 
                                </tr>                                      
                            </tbody>
                        </table>
                        <div id="add">
                            <button id="btn_UpdateDK" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="UpdateThongTinDK()"> Cập Nhật </button>
                            <button id="btn_huyUpdateDK" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_UpdateDK()"> Hủy </button>
                        </div>
                    </div>
                </div>
            <!-- TAB: So Suc Khoe -->
                <div class="tabContent hide" id="divSoSucKhoe" style="border: 1.5px solid #009900;">
                    <table style="margin:auto; width: 95%; height: auto" border="0">                            
                        <tbody>
                            <tr>
                                <td style="width: 50%; height: auto; vertical-align:top;">
                                    <div id="divTitle" style="width: auto;">                                  
                                        <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÔNG TIN HỌC SINH</span>
                                    </div>                                 
                                    <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                        <colgroup>
                                            <col width="180px">
                                            <col width="180px">
                                            <col width="120px">
                                            <col width="160px">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td colspan="4" style="text-align: right; width: 90%; padding: 10px 0px 10px 0px;font-size: 16px"> 
                                                    <b style="color:darkred;">MÃ HỌC SINH: <label id="lblMSHS_SSK">-</label></b>
                                                </td>
                                            </tr>
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Họ tên:
                                                </td> 
                                                <td>
                                                    <textarea id="txtHoTenHS_SSK" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                            </tr>                                                                                                                                  
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ngày sinh:
                                                </td> 
                                                <td>
                                                    <textarea id="txtNgaySinhHS_SSK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Giới tính:
                                                </td> 
                                                <td>
                                                    <textarea id="txtGioiTinhHS_SSK" style="width: 88%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                            </tr>                                            
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Địa chỉ:
                                                </td> 
                                                <td>
                                                    <textarea id="txtDiaChi_HS_SSK" style="width: 255%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                            </tr>
                                            <tr>  
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Tên Lớp:
                                                </td> 
                                                <td colspan="3">
                                                    <textarea id="txtTenLop_SSK" style="width: 96%; height: 35px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                                </td> 
                                            </tr>
                                        <!--    <tr>
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ngày BD:
                                                </td> 
                                                <td>
                                                    <textarea id="txtNgayBD_SSK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td> 
                                                <td style="font-size: 16px; font-weight: bold">    
                                                    Ngày KT:
                                                </td> 
                                                <td>
                                                    <textarea id="txtNgayKT_SSK" style="width: 88%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                                </td>
                                            </tr>
                                        -->
                                        </tbody>
                                    </table>
                                </td>
                                <td style="width: 50%; height: auto; vertical-align:top; border: none; border-left: medium double #4E1D74;">
                                    <div id="divTitle" style="width: auto;">                                  
                                        <span style="color: #00f ; font-weight: bold; font-size: 22px;">CHI TIẾT KHÁM</span>
                                    </div>
                                    <table style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                    <colgroup>
                                        <col width="250px">
                                        <col width="160px">
                                        <col width="250px">
                                        <col width="160px">
                                    </colgroup>
                                    <tbody>
                                         <tr>
                                            <td colspan="4" style="text-align: right; width: 90%; padding: 10px 0px 10px 0px;font-size: 16px"> 
                                                <b style="color:darkred;">MÃ KHÁM: <label id="lblIDSTDSK_SSK">-</label></b>
                                            </td>
                                        </tr>
                                        <tr>  
                                            <td style="font-size: 16px; font-weight: bold">    
                                                NV Lập:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtMaNVLap_SSK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td style="font-size: 16px; font-weight: bold">    
                                                NV Kết Luận:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtMaNVKL_SSK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td style="font-size: 16px; font-weight: bold">    
                                                Ngày Khám:
                                            </td> 
                                            <td colspan="3">
                                                <textarea id="txtNgayKham_SSK" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" title="Ghi chú" disabled=""></textarea>
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td style="font-size: 16px; font-weight: bold">    
                                                Cân Nặng(kg):
                                            </td> 
                                            <td>
                                                <textarea id="txtCanNang_SSK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                            </td> 
                                            <td style="font-size: 16px; font-weight: bold">    
                                                Chiều Cao(m):
                                            </td> 
                                            <td>
                                                <textarea id="txtChieuCao_SSK" style="width: 98%; height: 27px; color: darkblue; font-size:16px;" disabled=""></textarea>
                                            </td> 
                                        </tr>                                                                                   
                                        <tr>  
                                            <td colspan="5" style="font-size: 16px; font-weight: bold">
                                                Nội dung khám:
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td></td>
                                            <td colspan="4" style="padding: 5px 0px 15px 0px">
                                                <table id="tbChiTietSK" style="margin:auto; width: 100%; height: auto;" border="0" class="table-normal">
                                                    <thead class="th-normal"> 
                                                    <tr>         
                                                        <th width="20%">STT</th>
                                                        <th width="40%">Bộ Phận</th> 
                                                        <th width="40%">Kết Luận</th>
                                                    </tr> 
                                                    </thead>
                                                    <tbody id="dsChiTietSK" class="tr-normal">
                                                    </tbody>
                                                </table>                                    
                                            </td> 
                                        </tr>
                                        <tr>  
                                            <td style="font-size: 16px; font-weight: bold">    
                                                Kết Luận Chung:
                                            </td> 
                                            <td colspan="4">
                                                <textarea id="txtKetLuan_SSK" class="txtInput" style="width: 100%; height: 27px; color: darkblue; font-size:16px;" disabled="" ></textarea>
                                            </td> 
                                        </tr>
                                    </tbody>
                                </table>
                                </td>                                                                                 
                            </tr>
                            <tr></tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <hr style="margin-top: 20px;">
                                    <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="Open_ThemKSKM()"></i>                            
                                    <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="Open_UpdateKSK()"></i>      
                                    <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="xoaDK()"></i>
                                    <i id="picInDeNghi" class="fa fa-print fa-lx picButtonSetup"  title="In Sổ Theo Dõi Sức Khỏe" onclick="inTDSK()"></i>
                                </td>
                            </tr>
                            <tr>       
                                <table id="tbdsNgayKham" style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                                    <thead class="th-normal"> 
                                        <tr>
                                            <div id="divTitle" style="width: auto;">                                  
                                            <span style="color: #00f ; font-weight: bold; font-size: 22px;">DANH SÁCH KHÁM SỨC KHỎE</span>
                                        </div>
                                        </tr>
                                        <tr>         
                                            <th width="10%">STT</th>
                                            <th width="10%">MA TDSK</th>
                                            <th width="35%">Ngày Khám</th> 
                                            <th width="35%">Kết Luận</th>
                                            <th width="10%"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="dsNgayKham" class="tr-normal">
                                    </tbody>
                                </table>
                            </tr>
                        </tbody>
                    </table>
                    <hr style="margin: 20px 5px 20px 5px; border: none; border-top: medium double #009900; color: #009900;">
                    <div id="divThemKhamSK" style="display: none">
                        <div id="divTitle" style="width: auto;">                                  
                            <span style="color: #00f ; font-weight: bold; font-size: 22px;">THÊM KHÁM SỨC KHỎE</span>
                        </div>
                        <table style="margin:auto; width: 95%; height: auto" border="0">                            
                            <colgroup>
                                <col width="160px">
                                <col width="140px">
                                <col width="140px">
                                <col width="100px">
                            </colgroup>
                            <tbody>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Nhân viên lập:
                                    </td> 
                                    <td>
                                        <select id="cboNVLap" style="width: 180%; height: 27px; color: darkred; font-size:16px">                                   
                                        </select>
                                    </td>
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Nhân viên kết luận:
                                    </td> 
                                    <td>
                                        <select id="cboNVKL" style="width: 180%; height: 27px; color: darkred; font-size:16px">                                   
                                        </select>
                                    </td>
                                </tr>
                                <tr>   
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Ngày Khám:
                                    </td> 
                                    <td>
                                        <input id="txtNgayKham_AddKSK" class="txtInput" style="width: 80px; height: 28px; color: darkblue; font-size:14px;" type="text">
                                        <img id="picNgayKham_AddKSK" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayKham_AddKSK')" width="22" height="23" align="middle">
                                    </td>            
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Giờ Khám:
                                    </td> 
                                    <td>
                                        <select id="cbohour_AddSSK" style="width: 60%; height: 27px; color: darkred; font-size:16px">                                                                       
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
                                        </select>
                                    </td>
                                    <td>
                                        <select id="cbominute_AddSSK" style="width: 25%; height: 27px; color: darkred; font-size:16px">                                                                       
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
                                    </td>
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Cân Nặng(kg):
                                    </td> 
                                    <td>
                                        <textarea id="txtCanNang_AddSSK" style="width: 70%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Chiều Cao(m):
                                    </td> 
                                    <td>
                                        <textarea id="txtChieuCao_AddSSK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                </tr>
                                <tr>  
                                    <td colspan="5" style="font-size: 16px; font-weight: bold">
                                        Nội dung khám:
                                    </td> 
                                </tr>
                                <tr>  
                                    <td></td>
                                    <td colspan="4" style="padding: 5px 0px 15px 0px">
                                        <table id="tbnoidungKham" style="margin:auto; width: 100%; height: auto;" border="0" class="table-normal">
                                            <thead class="th-normal"> 
                                            <tr>         
                                                <th width="40%">Bộ Phận</th> 
                                                <th width="40%">Kết Luận</th>
                                            </tr> 
                                            </thead>
                                            <tbody id="dsBoPhan" class="tr-normal">  
                                            </tbody>
                                        </table>                                    
                                    </td> 
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Ghi Chú:
                                    </td> 
                                    <td colspan="4">
                                        <textarea id="txtGhiChu_AddSSK" class="txtInput" style="width: 100%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Kết Luận Chung:
                                    </td> 
                                    <td colspan="4">
                                        <textarea id="txtKetLuan_AddSSK" class="txtInput" style="width: 100%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                </tr>
                            </tbody>
                        </table>
                        <div id="add">
                            <button id="btn_addKSKM" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="ThemKhamSucKhoe()"> Thêm Mới </button>
                            <button id="btn_huyAddKSKM" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_ThemKSKM()"> Hủy </button>
                        </div>
                    </div>                
                    <div id="divUpdateKhamSK" style="display: none">
                        <div id="divTitle" style="width: auto;">                                  
                            <span style="color: #00f ; font-weight: bold; font-size: 22px;">CẬP NHẬT THÔNG TIN KHÁM SỨC KHỎE</span>
                        </div>
                        <table style="margin:auto; width: 95%; height: auto" border="0">                            
                            <colgroup>
                                <col width="160px">
                                <col width="140px">
                                <col width="140px">
                                <col width="100px">
                            </colgroup>
                            <tbody>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Nhân viên lập:
                                    </td> 
                                    <td>
                                        <select id="cboNVLap1" style="width: 180%; height: 27px; color: darkred; font-size:16px">                                   
                                        </select>
                                    </td>
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Nhân viên kết luận:
                                    </td> 
                                    <td>
                                        <select id="cboNVKL1" style="width: 180%; height: 27px; color: darkred; font-size:16px">                                   
                                        </select>
                                    </td>
                                </tr>
                                <tr>   
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Ngày Khám:
                                    </td> 
                                    <td>
                                        <input id="txtNgayKham_UpdateSSK" class="txtInput" style="width: 80px; height: 28px; color: darkblue; font-size:14px;" type="text">
                                        <img id="picNgayKham_UpdateSSK" src="../image/32x32_calendar.png" style="margin: 0px 5px" title="Lịch" onclick="showDate(event, 'txtNgayKham_UpdateSSK')" width="22" height="23" align="middle">
                                    </td>            
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Giờ Khám:
                                    </td> 
                                    <td>
                                        <select id="cbohour_UpdateSSK" style="width: 60%; height: 27px; color: darkred; font-size:16px">                                                                       
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
                                        </select>
                                    </td>
                                    <td>
                                        <select id="cbominute_UpdateSSK" style="width: 25%; height: 27px; color: darkred; font-size:16px">                                                                       
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
                                    </td>
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Cân Nặng(kg):
                                    </td> 
                                    <td>
                                        <textarea id="txtCanNang_UpdateSSK" style="width: 70%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Chiều Cao(m):
                                    </td> 
                                    <td>
                                        <textarea id="txtChieuCao_UpdateSSK" style="width: 90%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                </tr>
                                <tr>  
                                    <td colspan="5" style="font-size: 16px; font-weight: bold">
                                        Nội dung khám:
                                    </td> 
                                </tr>
                                <tr>  
                                    <td></td>
                                    <td colspan="4" style="padding: 5px 0px 15px 0px">
                                        <table id="tbnoidungKham" style="margin:auto; width: 100%; height: auto;" border="0" class="table-normal">
                                            <thead class="th-normal"> 
                                            <tr>         
                                                <th width="40%">Bộ Phận</th> 
                                                <th width="40%">Kết Luận</th>
                                            </tr> 
                                            </thead>
                                            <tbody id="chitietkham_upd" class="tr-normal">  
                                            </tbody>
                                        </table>                                    
                                    </td> 
                                </tr>
                                <tr>  
                                    <td style="font-size: 16px; font-weight: bold">    
                                        Kết Luận Chung:
                                    </td> 
                                    <td colspan="4">
                                        <textarea id="txtKetLuan_UpdateSSK" class="txtInput" style="width: 100%; height: 27px; color: darkblue; font-size:16px;"></textarea>
                                    </td> 
                                </tr>
                            </tbody>
                        </table>
                        <div id="add">
                            <button id="btn_updateKSK" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="CapNhatKhamSucKhoe()"> Cập Nhật </button>
                            <button id="btn_huyUpdateKSK" type="submit" style="background-color: cadetblue; border: none; font-size: 16px; margin: 4px 2px; color: white;cursor: pointer;text-decoration: none;display: inline-block;" onclick="Close_CapNhatKSK()"> Hủy </button>
                        </div>
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
    </body>
<!--    <script>
        var options_m = "";
        for(var minute = 0 ; minute <=59; minute++){
          options_m += "<option>"+ minute +"</option>";
        }
        document.getElementById("cbominute_AddSSK").innerHTML = options_m;
    </script>
    <script>
        var options_h = "";
        for(var hour = 0 ; hour <= 23; hour++){
          options_h += "<option>"+ hour +"</option>";
        }
        document.getElementById("cbohour_AddSSK").innerHTML = options_h;
    </script>-->
</html>
