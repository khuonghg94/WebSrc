<%-- 
    Document   : FrmQuanTri
    Created on : Aug 29, 2017, 2:40:31 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Quản Trị</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script> 
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>

        <script type="text/javascript" src="../javascript/CacHamXuLy.js"></script>
        <script type="text/javascript" src="../javascript/myScript/jsQuanTri.js"></script>

        <link rel="stylesheet" type="text/css" media="all" href="../css/tableCSS.css"/>
        <link rel="stylesheet" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">

        <style>
            // ------------------------ Menu ------------------------
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


            #nvRoot {
                list-style-type: none;
                list-style: none;
                padding: 0;
                margin: 0;
            }

            #nvRoot li {   
                list-style: none;
                line-height: 10px;                
                padding: 3px 0px 0px 3px;
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

                getListRoot();
                getTreeNhanVien();
                funShowCN();
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
            <div style="background: #009900; width: auto; padding-top: 5px; padding-bottom: 5px;" align="center">  
                <span style="color:white; font-weight: bold; font-size: 22px;">QUẢN TRỊ</span>
            </div>  
            <div style="width: auto; margin: 10px 10px 0px 1px; padding: 5px 0px 0px 5px;" align="right">           
                <label id="tendn">Nhân viên:<b style="color: firebrick;"> <%=session.getAttribute("hoTenNV")%> </b> || Đơn vị: <b style="color: firebrick;"> <%=session.getAttribute("tenDV")%></b></label>
            </div>

            <div id="divContainer" style="display: flex; height: auto; width: auto">
                <div style="background: #FFFFFF; width: 25%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px 5px 5px 5px; padding: 5px 0px 0px 5px;" align="left">                         
                    <div class="divTitle" style="width: auto;">      
                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;" title="Quản lý Thư mục" onclick="funShowTM()"></i>
                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Thư mục</span>
                    </div>
                    <table id="tbQLThuMuc" style="margin:auto; width: 90%; height: auto; display: none;" border="0">
                        <col width="50px">
                        <col width="auto"> 
                        <tr>                                
                            <td colspan="2" style="text-align: right; width: 100%;">                                                                   
                                <b style="color:darkgreen;">ID: <label id="lblIDLCN">-</label></b>
                                <br>
                            </td>
                        </tr>
                        <tr>  
                            <td> T.mục Cha: </td> 
                            <td>
                                <textarea id="txtThuMucCha" class="txtInput" style="width: 100%; height: 25px; color: darkblue; font-size:13px;" title="Thư mục Cha" placeholder="Chọn thư mục Cha"></textarea>
                            </td>
                        </tr>  
                        <tr>  
                            <td>    
                                Tên T.mục:
                            </td> 
                            <td>
                                <textarea id="txtThuMuc" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" title="Tên thư mục" placeholder="Nhập tên thư mục"></textarea>
                            </td> 
                        </tr>  
                        <tr>  
                            <td>    
                                Ghi chú:
                            </td> 
                            <td>
                                <textarea id="txtGhiChu" class="txtInput" style="width: 100%; height: 25px; color: darkblue; font-size:13px;" title="Ghi chú" placeholder="Nhập ghi chú"></textarea>
                            </td> 
                        </tr>  
                        <tr>  
                            <td>    
                                Icon:
                            </td> 
                            <td>                            
                                <i id="txtIconTM" class="fa fa-folder fa-lg"></i>
                            </td> 
                        </tr>  
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <hr style="margin-top: 20px;">
                                <i class="fa fa-plus-circle fa-lg" title="Thêm" onclick="funThemTM()"></i>                            
                                <i class="fa fa-pencil-square-o fa-lg" title="Sửa" onclick="funSuaTM()"></i>
                                <i class="fa fa-save fa-lg" title="Lưu" onclick="funLuuTM()"></i>
                                <i class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaTM()"></i>
                                <i class="fa fa-undo fa-lg" title="Hủy" onclick="funHuyTM()"></i>
                            </td>
                        </tr>
                    </table>
                    <hr id="hrThuMuc" style="display: none; margin: 20px 5px 20px 5px; padding: 0; border: none; border-top: medium double #009900; color: #009900;">   

                    <div class="divTitle" style="width: auto;">     
                        <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;" title="Quản lý Chức năng" onclick="funShowCN()"></i>
                        <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Chức năng</span>
                    </div>
                    <table id="tbQLChucNang" style="margin:auto; width: 90%; height: auto; display: none" border="0">
                        <col width="50px">
                        <col width="auto">
                        <tr>
                            <td colspan="2" style="text-align: right; width: 100%;">                                                                   
                                <b style="color:darkgreen;">ID: <label id="lblIDFile">-</label></b>
                                <br>                                    
                            </td>
                        </tr>
                        <tr>  
                            <td>    
                                Thuộc thư mục:
                            </td> 
                            <td style="text-align: left">
                                <textarea id="txtFileThuMucCha" class="txtInput" style="width: 100%; height: 25px; color: darkblue; font-size:13px;" title="Thuộc thư mục" placeholder="Chọn Thư mục từ Cây thư mục" ></textarea>
                            </td> 
                        </tr>  
                        <tr>  
                            <td>    
                                Tên Form:
                            </td> 
                            <td>
                                <textarea id="txtFileTenForm" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" title="Tên Form" placeholder="Nhập tên Form"></textarea>
                            </td> 
                        </tr>                    
                        <tr>  
                            <td>    
                                Tên thư mục:
                            </td> 
                            <td>
                                <textarea id="txtFileTenThuMuc" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" title="Tên thư mục" placeholder="Nhập tên thư mục"></textarea>
                            </td> 
                        </tr>
                        <tr>  
                            <td>    
                                Ghi chú:
                            </td> 
                            <td>
                                <textarea id="txtFileTenChucNang" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" title="Tên chức năng" placeholder="Nhập tên chức năng"></textarea>
                            </td> 
                        </tr>
                        <tr>  
                            <td>    
                                Icon:
                            </td> 
                            <td>                            
                                <select id="cboIconFile" style="font-family: sans-serif, 'FontAwesome'; width: 100%; color: #BC0000;" class="txtInput fa-lx" >
                                    <option value="fa-folder-open">&#xf07c; (Folder open)</option>
                                    <option value="fa-file-text">&#xf15c; (File text)</option>
                                    <option value="fa-bar-chart">&#xf080; (Bar chart)</option>
                                    <option value="fa-pie-chart">&#xf200; (Pie chart)</option>
                                    <option value="fa-line-chart">&#xf201; (Line chart)</option>
                                    <option value="fa-pencil-square">&#xf14b; (Penceil square)</option>
                                    <option value="fa-paper-plane">&#xf1d8; (Pager plane)</option>
                                    <option value="fa-star">&#xf005; (Start)</option>
                                    <option value="fa-file-image-o">&#xf1c5; (File image)</option>
                                    <option value="fa-file-zip-o">&#xf1c6; (File zip)</option> 
                                    <option value="fa-file-code-o">&#xf1c9; (File code)</option> 
                                    <option value="fa-university">&#xf19c; (University)</option>                                    
                                    <option value="fa-street-view">&#xf21d; (Street view)</option>
                                    <option value="fa-tags">&#xf02c; (Tag)</option>
                                    <option value="fa-universal-access">&#xf29a; (Universal access)</option>
                                    <option value="fa-user-circle-o">&#xf2be; (User)</option>
                                    <option value="fa-bars">&#xf0c9; (Bar)</option>
                                    <option value="fa-recycle">&#xf1b8; (Recycle)</option>
                                    <option value="fa-money">&#xf0d6; (Money)</option>
                                    <option value="fa-cogs">&#xf085; (Setting)</option>                                    
                                    <option value="fa-ticket">&#xf145; (Ticket)</option>
                                    <option value="fa-dropbox">&#xf16b; (Drop box)</option>
                                    <option value="fa-instagram">&#xf16d; (Instagram)</option>
                                    <option value="fa-wechat">&#xf1d7; (Wechat)</option>                                    
                                    <option value="fa-balance-scale">&#xf24e; (Balance scale)</option>                                    
                                    <option value="fa-coffee">&#xf0f4; (Coffee)</option>                                    
                                    <option value="fa-gift">&#xf06b; (Gift box)</option>                                    
                                    <option value="fa-info-circle">&#xf05a; (Info circle)</option>                                    
                                    <option value="fa-rss-square">&#xf143; (RSS square)</option>                                    
                                    <option value="fa-asterisk">&#xf069; (Asterisk)</option> 
                                    <option value="fa-cubes">&#xf1b3; (Cubes)</option> 
                                    <option value="fa-support">&#xf1cd; (Support)</option>
                                    <option value="fa-print">&#xf02f; (Print)</option>
                                    <option value="fa-id-card-o">&#xf2c3; (Card)</option>                                    
                                    <option value="fa-heartbeat">&#xf21e; (Heartbeat)</option>
                                    <option value="fa-linux">&#xf17c; (Linux)</option>
                                    <option value="fa-delicious">&#xf1a5; (Delicious)</option>
                                    <option value="fa-codepen">&#xf1cb; (Code pen)</option>                                    
                                    <option value="fa-android">&#xf17b; (Android)</option>
                                    <option value="fa-optin-monster">&#xf23c; (Optin monster)</option>
                                    <option value="fa-slideshare">&#xf1e7; (Slide share)</option>  
                                    <option value="fa-tree">&#xf1bb; (Tree)</option>     
                                    <option value="fa-tablet">&#xf10a; (Tablet)</option>     
                                    <option value="fa-television">&#xf26c; (Television)</option>     
                                    <option value="fa-qrcode">&#xf029; (Qr code)</option>    
                                    <option value="fa-question-circle-o">&#xf29c; (Question circle)</option>
                                    <option value="fa-table">&#xf0ce; (Table)</option>
                                    <option value="fa-table">&#xf10a; (Table 1)</option>
                                    <option value="fa-bell">&#xf0f3; (Table Alt)</option>
                                    <option value="fa-clock-o">&#xf017; (Clock)</option>
                                </select>
                            </td> 
                        </tr>  
                        <tr>
                            <td>    

                            </td> 
                            <td>
                                <input id="chkDaKhoa" name="chkDaKhoa" disabled="" type="checkbox"> Đã khóa || <input id="chkDesktop" name="chkDesktop" disabled="" type="checkbox"> Hiện Desktop
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
                    <hr id="hrChucNang" style="display: none; margin: 20px 15px 20px 5px; padding: 0; border: none; border-top: medium double #009900; color: #009900;">    

                    <div class="divTitle" style="width: auto;">
                        <i class="fa fa-search fa-lg" title="Tìm thông tin"></i>                        
                        <input id="txtThuMucTim" 
                               type="text" 
                               class="txtInput" 
                               title="Tìm thông tin" 
                               placeholder="Nhập Tên T.mục hoặc Tên C.năng để tìm" 
                               style="width: 60%; height:25px; font-size:13px; color: darkblue; margin-left: 10px;" 
                               onblur="funTimTM()"
                               onchange="funTimTM()">

                    </div>
                    <div id="divRoot" style="height: 1000px;">
                        <ul id="myRoot" style="overflow-y: scroll; height: 100%;">
                            <li>
                                <a>
                                    <i class="fa fa-home fa-lg"></i>
                                    <span id="-101">Root</span>
                                </a>
                                <ul id="myDropdown">
                                </ul>
                            </li>   
                        </ul>
                    </div>
                </div> 

                <div style="background: #FFFFFF; width: 75%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 5px auto 5px auto; padding: 5px 0px 0px 5px; display: flex;" align="left">
                    <div style="background: #FFFFFF; width: 25%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 5px 5px auto; padding: 5px 10px 5px 5px;" align="left">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-home fa-lg" style="margin: 0px 10px 0px 2px;" title="Tìm Đơn vị"></i>
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Đơn vị</span>
                            <input id="txtDonViTim" 
                                   type="text" 
                                   class="txtInput" 
                                   title="Tìm thông tin" 
                                   placeholder="Nhập tên nhân viên tìm" 
                                   style="width:60%; height:25px; font-size:13px; color: darkblue; margin-left: 10px;" 
                                   onblur="funTimDV()"
                                   onchange="funTimDV()">                   
                        </div>
                        <ul id="nvRoot">
                            <li>
                                <a>
                                    <i class="fa fa-home fa-lg"></i>
                                    <span id="-101">Root</span>
                                </a>
                                <ul id="nvDropdown">
                                </ul>
                            </li>   
                        </ul>
                    </div>

                    <div style="background: #FFFFFF; width: 75%; height: auto; border: 1.1px solid #EA8114; border-radius: 0.1em; margin: 0px 5px 5px auto; padding: 5px 5px 5px 5px;" align="left">
                        <div class="divTitle" style="width: auto;">  
                            <i class="fa fa-address-card-o fa-lg" style="margin: 0px 10px 0px 2px;" title="Quản lý Phân quyền" onclick="funShowPQ()"></i>            
                            <span style="color:#4E1D74; font-weight: bold; font-size: 17px;">Phân quyền</span>
                        </div>
                        <table id="tbQLPhanQuyen" style="margin:auto; width:90%; display: none;" border="0">
                            <col width="15">
                            <col width="170">                            
                            <tr>  
                                <td>    
                                    Nhân viên:
                                </td> 
                                <td>
                                    <textarea id="txtHoTenNV" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" ></textarea>
                                </td> 
                            </tr>
                            <tr>  
                                <td>    
                                    Đợn vị:
                                </td> 
                                <td>
                                    <textarea id="txtDonViNV" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" ></textarea>
                                </td> 
                            </tr> 

                            <tr>
                                <td>
                                    Quản trị:
                                </td>
                                <td>
                                    <input id="chkAdminNV" style="margin-left:auto; margin-right:auto;" disabled="" type="checkbox">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: right; width: 100%;">                                    
                                    <br>
                                    <b style="color: darkgreen;">ID: <label id="lblIDPQ">-</label></b>
                                    <br>
                                </td>
                            </tr>
                            <tr>  
                                <td>    
                                    Thư mục:
                                </td> 
                                <td>
                                    <textarea id="txtTenThuMucNV" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;" ></textarea>
                                </td> 
                            </tr>
                            <tr>
                                <td>    
                                    Chức năng:
                                </td> 
                                <td>
                                    <textarea id="txtTenChucNangNV" class="txtInput" style="width: 100%; height: 35px; color: darkblue; font-size:13px;"></textarea>
                                </td> 
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <hr style="margin-top: 20px;">    
                                    <i id="iLuuPQ" style="display: none;" class="fa fa-save fa-lg" title="Lưu" onclick="funLuuPQ()"></i>
                                    <i id="iXoaPQ" style="display: none;" class="fa fa-trash-o fa-lg" title="Xóa" onclick="funXoaPQ()"></i>                      
                                </td>
                            </tr>
                        </table>
                        <hr id="hrPhanQuyen" style="display: none; margin: 20px 15px 20px 5px; padding: 0; border: none; border-top: medium double #009900; color: #009900;">
                        <div class="divTitle" style="width: auto;">
                            <i class="fa fa-bars fa-lg" style="margin: 0px 10px 0px 2px;" title="Danh sách Phân quyền"></i>
                            <span style=" color: #4E1D74; font-weight: bold; font-size: 17px;">Danh sách</span>
                            <input id="txtFileTim" 
                                   type="text" 
                                   class="txtInput" 
                                   title="Tìm thông tin" 
                                   placeholder="Nhập Tên chức năng" 
                                   style="width:60%; height:25px; font-size:13px; color: darkblue; margin-left: 10px;"
                                   onblur="timNoiDung('tbPhanQuyen','txtFileTim')"
                                   onchange="timNoiDung('tbPhanQuyen','txtFileTim')">
                        </div>
                        <div id="divPhanQuyen" style="overflow-y: scroll; height: 800px;">
                            <table id="tbPhanQuyen" border="1" class="table-normal" style="width:100%">
                                <thead class="th-normal">
                                    <tr>
                                        <th width="1%">STT</th>                                            
                                        <th width="10%">Tên thư mục</th>                                            
                                        <th width="20%">Tên chức năng</th>
                                        <th width="2%"></th>
                                    </tr>
                                </thead>
                                <tbody id="dsPhanQuyen" class="tr-normal">
                                </tbody>
                            </table>
                        </div>    
                    </div>                     
                </div>
            </div>
    </center>
</body>
</html>