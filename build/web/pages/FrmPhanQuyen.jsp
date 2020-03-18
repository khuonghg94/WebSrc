<%-- 
    Document   : FrmPhanQuyen
    Created on : Oct 4, 2019, 2:19:13 PM
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
        <script type="text/javascript" src="../javascript/myScript/jsPhanQuyen.js"></script>
        
        <link rel="stylesheet" type="text/css" href="../css/tableCSS.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../css/mopCalendar.css"/>
        <link rel="stylesheet" type="text/css" media="all" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">
        <title>Quản lý Phân Quyền</title>
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
            
            #scrolltable { 
                margin-top: 20px; 
                height: 640px; 
                overflow: auto;
            }
            #scrolltable th div {
                position: absolute; 
                margin-top: -20px;
            }
            #scrolltable1 { 
                margin-top: 20px; 
                height: 771px; 
                overflow: auto;
            }
            #scrolltable1 th div {
                position: absolute; 
                margin-top: -20px;
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
               cboPhong();
               danhmucForm();
            });
            
        </script> 
    </head>
    <body>
        <div id="main">
            <div id="head" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px;">QUẢN LÝ PHÂN QUYỀN</span>
            </div>
        </div>
        <div id="left" align="left">
            <table id="tbSearch" style="margin: auto; width: 90%; height: auto; display: table;" border="0">
                <colgroup><col width="18px">
                    <col width="70px">                                                
                </colgroup>
                <tbody>
                    <tr>  
                        <td style="font-size: 16px; font-weight: bold">    
                            Đơn vị:
                        </td> 
                        <td>
                            <select id="cboDonVi" style="width: 100%; height: 30px; color: darkred; font-size:16px">                                                                       
                            </select>
                        </td> 
                    </tr>    
                    <tr>  
                        <td style="font-size: 16px; font-weight: bold">    
                            Họ tên tìm kiếm:
                        </td> 
                        <td>
                            <textarea id="txtTenNV" style="width: 97%; height: 32px; color: darkblue; font-size:14px;"></textarea>
                        </td> 
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <hr style="margin-top: 20px;">
                            <i class="fa fa-search fa-lg" title="Tìm" onclick="TimKiem()"></i>
                            <i class="fa fa-undo fa-lg" title="Hủy" onclick="HuyTimKiem()"></i>                            
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="showDSTK">
                <div id="divTitle" style="width: auto;">                                  
                    <span style="color: #00f ; font-weight: bold; font-size: 22px;">KẾT QUẢ TÌM KIẾM</span>
                </div>
                <div id="scrolltable">
                <table id="tbDSTK" border="1" style="margin: 10px 10px 5px 10px; width:auto" class="table-normal">
                    <thead class="th-normal"> 
                        <tr>         
                            <th width="10%">STT</th>
                            <th width="30%">Tên Phòng</th> 
                            <th width="20%">Mã NV</th> 
                            <th width="30%">Họ Tên</th> 
                            <th width="10%"></th>
                        </tr>
                    </thead>
                    <tbody id="dsTimKiem" class="tr-normal">
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        <div style="background: #FFFFFF; width: 67%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 3px 5px 2px; padding: 5px 5px 0px 5px; display: flex; flex-direction: column;" align="right">
            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 0px 0px 0px 0px;" align="right">           
                <b style="color:darkred; font-size: 16px">Nhân viên: <label id="lblTenNV">-</label></b>
                ||
                <b style="color:darkred; font-size: 16px">Đơn vị: <label id="lblTenPhong">-</label></b>
            </div>
            <table style="margin: auto; width: 95%; height: auto" border="0">                            
            <tbody>
                <tr>
                    <td style="width: 50%; height: auto; vertical-align:top;">
                        <div id="scrolltable1">
                        <table id="tbDMucForm" style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                            <thead class="th-normal"> 
                                <tr>
                                    <div id="divTitle" style="width: auto;">                                  
                                        <span style="color: #00f ; font-weight: bold; font-size: 20px;">DANH MỤC FORM CHƯA CẤP QUYỀN</span>
                                    </div>
                                </tr>
                                <tr>         
                                    <th width="10%">STT</th>
                                    <th width="20%">IDForm</th>
                                    <th width="50%">Tên Form</th> 
                                    <th width="20%"></th>
                                </tr>
                            </thead>
                            <tbody id="dsForm" class="tr-normal">
                            </tbody>
                        </table>
                        </div>
                    </td>
                    <td style="width: 50%; height: auto; vertical-align:top; border: none; border-left: medium double #4E1D74;">
                        <div id="scrolltable1">
                        <table id="tbDMucForm_DCQ" style="margin: auto; width: 100%; height: auto; display: table;" border="0">
                            <thead class="th-normal"> 
                                <tr>
                                    <div id="divTitle" style="width: auto;">                                  
                                    <span style="color: #00f ; font-weight: bold; font-size: 20px;">DANH MỤC FORM ĐÃ CẤP QUYỀN</span>
                                </div>
                                </tr>
                                <tr>         
                                    <th width="10%">STT</th>
                                    <th width="20%">IDForm</th>
                                    <th width="50%">Tên Form</th> 
                                    <th width="20%"></th>
                                </tr>
                            </thead>
                            <tbody id="dsForm_DCQ" class="tr-normal">
                            </tbody>
                        </table>
                        </div>
                    </td>                                                                                 
                </tr>
                <tr></tr>                             
            </tbody>
        </table>
        </div>    
    </body>
</html>
