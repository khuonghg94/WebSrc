/* 
 Document   : isDesktop
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

function funDropAndDrap() {
    var handLogin = document.getElementById("headerLogin");
    var rootLogin = document.getElementById("divLogin");
    Drag.init(handLogin, rootLogin);

    var handForm = document.getElementById("headerForm");
    var rootForm = document.getElementById("divForm");
    Drag.init(handForm, rootForm);
}

function openForm(frmName) {
    showForm("divForm");
    isFullScreen = true;
    maxScreen();
    document.getElementById("iframeForm").src = "";
    document.getElementById("iframeForm").src = frmName;

    return false;
}

function hiddenForm(valueName) {
//alert(valueName);                
    document.getElementById(valueName).style.display = "none";
    hiddenDialogModal();
    setDesktop(pubUserName);
    setMenu(pubUserName);
}

var isFullScreen = true;
function maxScreen() {
    //iframeForm
    var ifrm = document.getElementById("iframeForm");

    //divForm
    var s = document.getElementById("divForm");
    if (isFullScreen) { //Maximize 
        var hHeader = $("#divHeader").height();
        var hBody = $("#divBody").height(), wBody = $("#divBody").width();
//        alert("hHeader: " + hHeader + " || hBody: " + hBody + " || wBody: " + wBody);

        s.style.marginTop = hHeader + "px";
        s.style.marginLeft = "0px";
        s.style.width = wBody + "px";
        s.style.height = hBody + "px";

        ifrm.style.width = (wBody - 10) + "px";
        ifrm.style.height = (hBody - hHeaderForm - 20) + "px";

        document.getElementById("maxScreen").title = "Thu nhỏ";
        isFullScreen = false;
    } else { //Minimize
        s.style.marginTop = mHeight + "px";
        s.style.marginLeft = mWidth + "px";
        s.style.width = fWidth + "px";
        s.style.height = fHeight + "px";

        ifrm.style.width = (fWidth - 10) + "px";
        ifrm.style.height = (fHeight - hHeaderForm - 24) + "px";

        document.getElementById("maxScreen").title = "Mở rộng";
        isFullScreen = true;
    }
}

var wHeight = 0, wWidth = 0;
var mHeight = 0, mWidth = 0;
var fHeight = 0, fWidth = 0;
var hHeaderForm = 0;
function showForm(valueName) {
    hiddenLogin(valueName);
    showDialogModal();

//     alert("window.screen.height: " + window.screen.height + " || window.screen.width: " + window.screen.width 
//             + " || window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);

    wHeight = window.innerHeight;
    wWidth = window.innerWidth;

    mHeight = wHeight / 10;
    fHeight = wHeight - (mHeight * 2);
//    if (wHeight > 360) {        
//        fHeight = fHeight - mHeight * 2;
//    }    

    mWidth = wWidth / 14;
    if (wWidth > 360) {
        fWidth = wWidth - (mWidth * 2);
    }

    var s = document.getElementById(valueName);
    s.style.marginTop = mHeight + "px";
    s.style.marginLeft = mWidth + "px";
    s.style.width = fWidth + "px";
    s.style.height = fHeight + "px";
    document.getElementById(valueName).style.display = "block";

    //headerForm  
    hHeaderForm = $("#headerForm").height();

    //iframeForm
    var ifrm = document.getElementById("iframeForm");
    ifrm.style.width = (fWidth - 10) + "px";
    ifrm.style.height = (fHeight - hHeaderForm - 24) + "px";
}

function resetDesktop() {
//    document.getElementById("divDesktops").innerHTML = "";
    document.getElementById("dsDesktop").innerHTML = "";
    document.getElementById("infoUserName").innerHTML = "";
}

function setDesktop(userName) {
    var res = "";
    var url = "myFunction/funDesktop.jsp?caseName=setDesktop&userName=" + userName;
    res = show_data(url);
//    alert("Successful" + res);

//    document.getElementById("divDesktops").innerHTML = res;
    document.getElementById("dsDesktop").innerHTML = res;
}

function resetMenu() {
    document.getElementById("myDropdown").innerHTML = "";
}

function setMenu(taiKhoan) {
    var res = "<!--Đặng xuất--><li><a onclick=showLogin('divLogin')><i class='fa fa-sign-out fa-lg'></i><span>Đặng xuất chương trình</span></a></li>";
    var url = "myFunction/funDesktop.jsp?caseName=setMenu&taiKhoan=" + taiKhoan;
    res = res + show_data(url); // alert("Successful" + res);
    document.getElementById("myDropdown").innerHTML = res;
}

var logHeight = 0, logWidth = 0;
var logMH = 20, logMW = 20;
function getScrollXY(valueName) {
    logHeight = window.innerHeight;
    logWidth = window.innerWidth;

    //divLogin  
    var dH = $("#divLogin").height();
    logMH = (Math.abs(logHeight - dH)) / 2;

    var dW = $("#divLogin").width();
    logMW = (Math.abs(logWidth - dW)) / 2;

//    alert("logMH: " + logMH + " dH: " + dH + " logHeight: " + logHeight + " || logMW: " + logMW + " dW: " + dW + " logWidth: " + logWidth);
    var s = document.getElementById(valueName);
    s.style.marginTop = logMH + "px";
    s.style.marginLeft = logMW + "px";
//    s.style.width = fWidth + "px";
//    s.style.height = fHeight + "px";    
}

function hiddenDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "true");
    $("#divMyDialog").addClass("hidden");
}

function showDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "false");
    $("#divMyDialog").removeClass("hidden");
}

function resetLogin() {
    document.getElementById("userName").value = "";
    document.getElementById("passWord").value = "";
}

function hiddenLogin(valueName) {
    //alert(valueName);                
    document.getElementById(valueName).style.display = "none";
    hiddenDialogModal();
    resetLogin();
}

function showLogin(valueName) { //abc
    hiddenLogin(valueName);
    getScrollXY(valueName);
    document.getElementById(valueName).style.display = "block";
    showDialogModal();
    clearSession();
    resetDesktop();
    resetMenu();

    $("#userName").focus();

    return false;
}

var pubUserName = "";
function login(varIDUser) {
    var strResult = varIDUser.split("<sol>");
    var idUser = strResult[0];
    var userName = strResult[1];
    var hoTenNV = strResult[2];
    var maNV = strResult[3];
    var tenDV = strResult[4];
    var maDV = strResult[5];
    var isAdmin = strResult[6];

//    alert("Successful maNV: " + maNV + " || hoTenNV: " + hoTenNV + " || taiKhoan: " + taiKhoan + " || isAdmin: " + isAdmin);

    var url = "myFunction/funUser.jsp?caseName=session"
            + "&idUser=" + idUser
            + "&userName=" + userName
            + "&tenDV=" + tenDV
            + "&maDV=" + maDV
            + "&maNV=" + maNV
            + "&hoTenNV=" + hoTenNV
            + "&isAdmin=" + isAdmin;

    var res = show_data(url);
//    alert("Successful" + res);

    document.getElementById("infoUserName").innerHTML = hoTenNV + " (Mã: " + maNV + ")"; //hoTenNV + " (" + maNV + ") || " + tenKhoa;
    hiddenLogin("divLogin");

    pubUserName = userName;
    setDesktop(pubUserName);
    setMenu(pubUserName);
}

//function isPin(inputtxt)
//{
//    var pinFormat = /^\d{6}$/;
//    if (inputtxt.value.match(pinFormat)) {
//        return true;
//    } else {
//        return false;
//    }
//}

function checkLogin() {
    $("#errorMessage").html("");
    var userName = $("#userName").val();
    var passWord = $("#passWord").val();

    $("#userName").css({"border-bottom": "1px dashed green"});
    $("#passWord").css({"border-bottom": "1px dashed green"});
    if (userName.length === 0) {
        $("#userName").focus();
        $("#userName").css({"border-bottom": "1.5px dashed red"});
        $("#errorMessage").hide();
        $("#errorMessage").html("Vui lòng nhập tên đăng nhập !");
        $("#errorMessage").show(500);
        return false;
    } else if (passWord.length === 0) {
        $("#passWord").focus();
        $("#passWord").css({"border-bottom": "1.5px dashed red"});
        $("#errorMessage").hide();
        $("#errorMessage").html("Vui lòng nhập mật khẩu !");
        $("#errorMessage").show(500);
        return false;
    } else {
        var url = "myFunction/funUser.jsp?caseName=kiemtradangnhap&userName=" + userName + "&passWord=" + passWord;
        var idUser = "null";
        idUser = show_data(url); //alert(idUser);               
        if (idUser.trim().toLowerCase().localeCompare("fail") === 0) {
            $("#errorMessage").hide();
            $("#errorMessage").html("Tài khoản đăng nhập không tồn tại.");
            $("#errorMessage").show(500);
            return false;
        } else {
            login(idUser);
            return false;
        }
    }
}

function clearSession() {
    var url = "myFunction/funUser.jsp?caseName=clearSession";
    show_data(url); // alert("Successful" + res); var res = 
}

var isBlock = "none";
function showMenu() {
    if (isBlock.localeCompare("none") === 0) {
        isBlock = "block";
    }
    else {
        isBlock = "none";
    }

//    alert("Hi I'm Sol \n document.getElementById('myDropdown').style.display = " + isBlock);
    document.getElementById("myDropdown").style.display = isBlock;
}

function showLogOut() {
    $("#ulLogOut").css({"visibility": "visible"});
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    var targetID = "";
    targetID = event.target.id;
    targetID = targetID.trim().toLowerCase();
//    alert("targetID: " + targetID + " || targetID.length: " + targetID.length);

    if (targetID.localeCompare("btnmenu") !== 0) {
        isBlock = document.getElementById("myDropdown").style.display;
        // alert(isBlock + " " + isBlock.localeCompare("block"));
        if (isBlock.localeCompare("block") === 0) {
            document.getElementById("myDropdown").style.display = "none";
            isBlock = "none";
        }
    }

    if (targetID.localeCompare("btnlogout") !== 0 || targetID.length === 0)
        $("#ulLogOut").css({"visibility": "hidden"});
    else
        $("#ulLogOut").css({"visibility": "visible"});
};