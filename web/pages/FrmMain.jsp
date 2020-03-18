<%-- 
    Document   : FrmMain

    Created on : Aug 10, 2017, 10:21:41 AM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Main</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../javascript/jquery.js"></script>
        <script type="text/javascript" src="../javascript/ajax.js"></script>
        <script type="text/javascript" src="../javascript/dom-drag.js"></script>
        <script type="text/javascript" src="../javascript/myScript/isDesktop.js"></script>

        <link rel="stylesheet" href="../css/DesktopIcon.css" >
        <link rel="stylesheet" href="../css/tableCSS.css" >
        <link rel="stylesheet" href="../FontAwesome/font-awesome-4.7.0/css/font-awesome.min.css">

        <link rel="shortcut icon" href="../image/logoKidSchool.png"  type="image/x-icon" /> 
        <link rel="Bookmark" href="../image/logoKidSchool.png" />

        <style>
            html, body {                             
                height:100%;
            }

            body {
                background-color: #E5E5E5; 
                margin:0; 
                padding:0;
            }

            .picButtonSetup{
                border-radius: 100%; border: 1.3px solid #151F2D; padding: 5px 5px 5px 5px; height: 20px; width: 20px; background-color: #FFFFCC;
            }

            #divHeader {                
                height:42px;
                width:100%;
                background-color: #F4F4F4;
                color:#4E1D74;                
            }

            #divBody {        
                position: relative;
                top:0;
                left:0;
                padding-top: 10px;
                height:100%;
                width:100%;
                background-color: #001A00; /*#003300;*/                           
                color:#FFFFFF;                
                /*default3.jpg*/
                /*blueSky.jpg*/
                /*background-image: url("../image/default_02042018.jpg");  */
                z-index:0;
                background-size:cover;
                background-position:center;
                -webkit-background-size:cover;
                -moz-background-size:cover;
                -o-background-size:cover
            }

            .iconDesktop {
                /*                border: 1.5px solid #9B9B9B;         */
                margin: 2px 0;
                width: 100px;
                height: 110px;
                text-align: center
            }

            .iconDesktop .list {
                border-radius: 3px;
                display: block;
                color :#FFFFFF;
                /*                height: auto;*/
                text-decoration: none;
                background: rgba(13, 13, 13, 0.4);
            }

            .iconDesktop .list:hover {
                background: rgba(13, 13, 13, 0.6);
                border: 1.2px solid transparent;
                /*                border: 1.2px solid #9B9B9B;*/
                color :#FFFFFF;
            }

            .iconDesktop .list i {                
                /*                border-radius: 100%; 
                                border: 1.7px solid #800000;*/
                height: 25px;
            }

            .iconDesktop .list span {
                padding: 10px 5px 5px 5px;
                font-family: 'TimeNewRoman';
                font-size: 14px;
            }

            td {
                vertical-align: top;
            }

            #errorMessage {
                color: red;
                font-family: 'TimeNewRoman';                
                font-size: 17px;
                margin-bottom: 10px;               
            }

            .nomal_button {
                background-color: #930504;
                border: 2px solid #930504;
                border-radius: 5px;
                color: #FFFFFF;
                /*    font-weight: bold;*/
                height: 30px;
                padding: auto 20px;
            }

            .nomal_button:hover {
                background-color: #680102;
                border: 2px solid #680102;
            }
            #frmFill {
                padding: 20px 40px;
                text-align: left;
            }

            // ------------------------ Menu ------------------------
            .dropdown {
                position: relative;
                display: inline-block;
            }           

            #myDropdown {
                display: none;
                position: absolute; /* position: absolute;*/
                background-color: #F9F9F9;
                min-width: 15%;
                max-width: 450px;
                width: auto;
                height: auto;
                border-style: solid;
                border: 1px solid;
                border-color: #F9F9F9 #E5E5E5 #E5E5E5 #E5E5E5;
                border-radius: 1.5px;
                z-index: 1;
                list-style: none;
                padding: 0px 0px 0px 5px;
                margin: 2px 0px 0px 2px;
            }

            #myDropdown li {   
                list-style: none;
                line-height: 28px;                
                padding: 5px 0px 0px 5px;
                border: 1.2px solid transparent; 
                border-top: 1.3px solid #CCCCCC;
                /*                border: 1.2px solid #BC0000;*/
                /*                 border-top: 0px; */
            }

            #myDropdown a {                
                width: 100%;
                margin: 5px 0px;
                padding: 5px 0px;
                color: #4E1D74;                
                text-decoration: none;
                display: block;
            }

            #myDropdown a:hover {
                background-color: #D9D9D9;
                color: #BC0000; 
            }

            #myDropdown a span {
                padding: 5px 10px;
                font-family: 'TimeNewRoman';
                font-size: 16px;
            }

            #myDropdown a i {
                float: left;                 
                margin: -4px 5px 0px 0px;
                padding: 7px 7px 7px 7px;
                height: 20px;
                width: 20px;
                border-radius: 100%; 
                border: 1.2px solid #151F2D;                
            }

            #myDropdown a #supMenu{
                float: right; 
                margin-right: 10px;
            }

            #myDropdown a:hover i {            
                color: #BC0000; 
                border: 1.2px solid #BC0000;
            }

            /*Drop Down */
            #myDropdown ul {
                position: initial;  
                display: none;
                /* display: block;*/                  
                // Chu y: Hien tat cac Sup-menu trong Menu
                /* border-top: 1px solid #000; */
                min-width: 160px;
                max-width: 400px;
                width: 350px;
                height: auto;
                margin: auto;
                top: auto;
            }
            #myDropdown ul li {           
                padding-left: 5px;
                border: 1px solid transparent;
                /* border: 1px solid #000; */
                /* border-top: 0px;  */
                margin: 0px;
            }
            #myDropdown li:hover ul {
                display: block;
                top: auto;
            }

            #myDropdown li ul a{
                margin: 3px 0px;
                padding: 3px 0px;
            }

            /* 2nd & 3rd Level Drop */
            #myDropdown li:hover ul ul,
            #myDropdown li:hover ul ul ul {
                display: none;               
                float: right;
                position: absolute;                
                padding-left: 5px;

                background-color: #F9F9F9;
                /* background-color: #009900;*/
            }

            #myDropdown ul li:hover ul,
            #myDropdown ul ul li:hover ul { 
                display: block;
                top: 50%;
                left: 100%;
                margin-left: 1px;
                border-style: solid;
                border: 1.3px solid;
                border-color: #F9F9F9 #F9F9F9 #F9F9F9 #000000;
            }    

            /* 4th & 5th Level Drop */
            #myDropdown li:hover ul ul ul ul,
            #myDropdown li:hover ul ul ul ul ul {
                display: none;  
                float: right;
                padding-left: 5px;                
                position: absolute;
                background-color: #F9F9F9;
                /*                background-color: #FFFF00;*/
            }
            #myDropdown ul ul ul li:hover ul,
            #myDropdown ul ul ul ul li:hover ul {
                display: block;
                top: 50%;
                left: 100%;
                margin-left: 1px;
                border-style: solid;
                border: 1.3px solid;
                border-color: #F9F9F9 #F9F9F9 #F9F9F9 #000000;
            }

            .iconImg {
                border: 1px solid #4E1D74;
                border-radius: 100%;
                padding: 5px;
            }    

            .tooltip {
                position: relative;
            }

            .tooltip .tooltiptext {
                list-style: none;
                line-height: 25px;    
                visibility: hidden;
                width: 120px;
                background-color: #F4F4F4;
                color: #FFFFFF;
                text-align: left;
                border-radius: 2px;
                padding: 5px 10px;
                position: absolute;
                z-index: 1;
                top: 70%;
                left: 50%;
                margin-left: -80px;
            }

            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                bottom: 100%;
                left: 30%;
                margin-left: -5px;
                border-width: 7px;
                border-style: solid;
                border-color: transparent transparent #F4F4F4 transparent;
            }

            .tooltip .tooltiptext li a{
                text-decoration: none;
                color: #4E1D74;       
                font-size: 15px;
            }

            .tooltip .tooltiptext li a:hover {                
                color: darkred;
                font-size: 17px;
            }
        </style>

        <script type="text/javascript"> // Load form
            $(document).ready(function () {
                funDropAndDrap();
                showLogin('divLogin');
            });
        </script>
    </head>
    <body id="bodMain">
        <div id="divHeader" class="dropdown" align="left"> 
            <i id="btnMenu" class="sMenu fa-bars fa-lg" title="Menu" onclick="showMenu()"></i> Menu |
            <ul id="myDropdown">
            </ul>             
            <!-- <div id="myDropdown" class="dropdown-content">-</div>-->
            <div style="float: right; padding: 7px 5px;" class="tooltip" > | <i id="btnLogOut" onclick="showLogOut()" class="fa fa-user-circle-o fa-lg"></i>
                <span id="infoUserName"></span>
                <ul id="ulLogOut" class="tooltiptext">
                    <li><a href='#' onclick="return openForm('FrmDoiMatKhau.jsp');"> Đổi mật khẩu</a></li>
                    <li><a href='#' onclick="return showLogin('divLogin');"> Đặng xuất</a></li>                    
                </ul>                
            </div>
        </div>         
        <div id="divBody" align="left">             
            <table id="tbDesktop" border="0" style="margin: 0px 10px 10px 10px">
                <tbody id="dsDesktop">              
                </tbody>
            </table>            
        </div>
    
    <!--Dialog Modal-->
    <div id="divMyDialog" class="dialogclass hidden" role="dialog" aria-hidden="true"> </div>

    <!--Dialog Login-->
    <div id="divLogin"  
         style="
         display: none;
         cursor: default; 
         position: absolute;
         border-radius: 0.2em; 
         border: 1.2px solid #1D2939;
         width: 500px; 
         height: auto;
         z-index: 23051992; /*23.05.1992*/
         ">   
        <div id="frmLogin" 
             style=" 
             opacity: 0.9;
             background-color: #FCFCFC;
             border-radius: 0.2em; 
             border: 1px solid #CCC;
             padding: 20px 0;
             text-align: center;
             width: auto; 
             height: auto;">
            <div id="headerLogin" style="cursor: move;" align="center">  
                <span style="color:#8E7808; font-family:'TimeNewRoman'">
                    <span style="font-size:26px; padding: 10px auto 10px auto;">Trường Mầm Non</span>
                    <br> 
                    <span style="font-size:37px; padding: 10px auto 10px auto; font-weight: bolder">Kidschool VTTU</span>
                </span>   
                <br>
                <a>
                    <img src="../image/logoKidSchool.png" style="width: 150px; height: 150px; border-radius: 100%; border: 1.7px solid #800000; padding: 6px 6px 6px 6px;  margin: 15px 0;">
                </a>
            </div>  
            <div>
                <form id="myForm" method="post">
                    <div id="frmFill">                            
                        <div id="errorMessage" align="center"></div>                        
                        <input id="userName"
                               class="txtInput"   
                               type="text"   
                               onload="this.focus();"
                               autocomplete="off"
                               placeholder="Nhập tên đăng nhập" 
                               style="width:100%; height:40px; font-size:15px; color:#4E1D74;" 
                               name="userName">

                        <input id="passWord"
                               class="txtInput"   
                               type="password" 
                               placeholder="Nhập mật khẩu" 
                               style="width:100%; height:40px; font-size:15px; color:#4E1D74;"
                               name="passWord">
                    </div>
                    <button class="nomal_button" onclick="return checkLogin();" > Đăng nhập </button>                    
                </form>
            </div>
        </div>
    </div>

    <!--Dialog Form-->
    <div id="divForm"
         style="
         display: none;
         cursor: default; 
         position: absolute;             
         background: rgba(255, 255, 230, 0.9); 
         border-radius: 0.2em; 
         border: 1px solid #000000; 
         box-shadow: 3px 3px 5px #8C8C8C;
         ">   
        <div id="headerForm" style="cursor: move; background:rgba(17, 23, 29, 1.0); width: auto; height: 22px; padding: 5px; margin: 1px" align="center">  
            <i class="sButtonIframeForm fa-close fa-1x" title="Đóng" onclick="hiddenForm('divForm')"></i> 
            <i class="sButtonIframeForm fa-clone fa-1x" title="Mở rộng" onclick="maxScreen()" id="maxScreen"></i>
        </div>  
        <div style="
             position: relative;
             background: rgba(247, 255, 230, 0.3); 
             width: auto;
             height: auto; 
             border: 1.1px solid #009900; 
             border-radius: 0.1em; 
             margin: 2px 2px 0px 2px; 
             padding: 2px 2px 0px 2px;" 
             align="left">
            <iframe id="iframeForm" frameborder="0" ></iframe>
        </div>            
    </div>     
</body>
</html>
