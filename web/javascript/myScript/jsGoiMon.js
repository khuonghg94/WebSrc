/* 
 Document   : jsGoiMon
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

var pubIsGoiMon = true;
var pubStopReload = false;
var pubMaNV = "";

$(window).load(function () {
    if (pubIsGoiMon) {//Chọn Món
        funGetCurrentDateTime("txtNgayKiemTra", null, null);
        funDropAndDrap("headerChonMon", "divChonMon");
        funDropAndDrap("headerHoaDon", "divHoaDon");
        setSizeMain("divMain");

        cboLoaiHH();
        cboViTriPhong();
        banPhucVu();
        setSizeSoDo("divMain", "divTitleSoDo", "divTitleDN", "divTimKiem", "divSoDo");

        setInterval(function () {
            if (!pubStopReload)
            {
                //  alert("reload page after 10 seconds: " + pubStopReload);  // window.location = window.location; 
                banPhucVu();
            }
        }, 7000); //7000 milliseconds = 7 seconds
    }
    else {//Chế Biến
        funGetCurrentDateTime("txtNgayKiemTra", null, null);
        setSizeCheBien("divMain", "divTitleCBTD", "divTitleDN", "divCNDonDatHang", "divContainer", "divMenuDonDatHang", "divDSDonDatHang", "divNDDatMon");
        donDatHang();
        cboLoaiHH();

        setInterval(function () {
            pubListMaTam = pubListMaTam.trim();
            if (!pubStopReload && pubListMaTam.length === 0)
            {
                //  alert("reload page after 10 seconds: " + pubStopReload);  // window.location = window.location; 
                donDatHang();
            }
        }, 7000); //7000 milliseconds = 7 seconds
    }
});

function setSizeMain(divMain) {
    var wHeight = window.innerHeight;
    var wWidth = window.innerWidth;

    var s = document.getElementById(divMain);
    s.style.width = wWidth + "px";
    s.style.height = wHeight + "px";
}

var cbHeight = 0, cbWidth = 0;
function setSizeCheBien(mainCheBien, divTitleCBTD, divTitleDN, divCNDonDatHang, ndCheBien, menuDonDatHang, listDonDatHang, listNDDatMon) {
//    alert("window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);   
    cbHeight = window.innerHeight;
    var s = document.getElementById(mainCheBien);
    s.style.height = cbHeight + "px";

    var hTitleCBTD = $("#" + divTitleCBTD).height();
    var hTitleDN = $("#" + divTitleDN).height();
    var hCNDDH = $("#" + divCNDonDatHang).height();

//    alert("cbHeight: " + cbHeight + " hTitleCBTD: " + hTitleCBTD + " hTitleDN: " + hTitleDN + " hCNDDH: " + hCNDDH );

    var s = document.getElementById(ndCheBien);
    s.style.height = (cbHeight - hTitleDN - hTitleCBTD - hCNDDH - 40) + "px"; //alert(s.style.height);

    var hNDCheBien = $("#" + ndCheBien).height();
    var hMenuDDH = $("#" + menuDonDatHang).height();

    var sListDDH = document.getElementById(listDonDatHang);
    sListDDH.style.height = (hNDCheBien - hMenuDDH - 15) + "px";

    var sListNDDM = document.getElementById(listNDDatMon);
    sListNDDM.style.height = hNDCheBien + "px";
}

var wHeight = 0, wWidth = 0;
function setSizeSoDo(divMain, divTitleSoDo, divTitleDN, divTimKiem, divSoDo) {
//    alert("window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);

    var hMain = $("#" + divMain).height();
    var hTitleSoDo = $("#" + divTitleSoDo).height();
    var hTitleDN = $("#" + divTitleDN).height();
    var hTimKiem = $("#" + divTimKiem).height();

    var s = document.getElementById(divSoDo);
    s.style.height = (hMain - hTitleSoDo - hTitleDN - hTimKiem - 45) + "px";
}

function setSizeNoiDungThucDon(divChonMon, headerChonMon, divMenuTenBan, tbTimKiemChonMon, divChucNang, divHangHoa) {
    var hChonMon = $("#" + divChonMon).height();
    var hHeaderCM = $("#" + headerChonMon).height();
    var hMenuTenBan = $("#" + divMenuTenBan).height();
    var hTimKiem = $("#" + tbTimKiemChonMon).height();
    var hChucNang = $("#" + divChucNang).height();
//    alert("hChonMon: " + hChonMon + " || hHeaderCM: " + hHeaderCM + " || hMenuTenBan: " + hMenuTenBan + " || hTimKiem: " + hTimKiem + " || hChucNang: " + hChucNang);

    var s = document.getElementById(divHangHoa);
    s.style.height = (hChonMon - hHeaderCM - hMenuTenBan - hTimKiem - hChucNang - 40) + "px";
}

var menuWidth = 0, menuHeight = 0;
var menuMarginTop = 0, menuMarginLeft = 0;
function setSizeChonMon(divMain, divTitleSoDo, divTitleDN, divChonMon) {
//    alert("window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);
    var hMain = $("#" + divMain).height();
    var hTitleSoDo = $("#" + divTitleSoDo).height();
    var hTitleDN = $("#" + divTitleDN).height();

    menuWidth = window.innerWidth;

    menuMarginLeft = window.innerWidth;
    menuMarginLeft = menuMarginLeft / 64;

    var s = document.getElementById(divChonMon);
    s.style.marginTop = (hTitleSoDo + hTitleDN) + "px";
    s.style.marginLeft = menuMarginLeft + "px";
    s.style.width = (menuWidth - menuMarginLeft * 2) + "px";
    s.style.height = (hMain - hTitleSoDo - hTitleDN * 3) + "px";

    setSizeNoiDungThucDon(divChonMon, "headerChonMon", "divMenuTenBan", "tbTimKiemChonMon", "divChucNang", "divHangHoa");
}

var hdWidth = 0, hdHeight = 0;
var hdMarginTop = 0, hdMarginLeft = 0;
function setSizeHoaDon(valueName) {
//    alert("window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);

    var hViTri = $("#divViTri").height();
    hViTri = hViTri / 2;
    hdMarginTop = window.innerHeight;
    hdMarginTop = hdMarginTop / 8;
    hdMarginLeft = window.innerWidth;
    hdMarginLeft = hdMarginLeft / 64;
    hdHeight = window.innerHeight;
    hdWidth = window.innerWidth;
    hdWidth = hdWidth - hdMarginLeft * 2;
    var s = document.getElementById(valueName);
    s.style.marginTop = hViTri + "px";
    s.style.marginLeft = hdMarginLeft + "px";
    s.style.width = hdWidth + "px";
//    s.style. = wWidth + "px";
//    s.style.height = wHeight + "px";
}

var modalWidth = 0, modalHeight = 0;
var modalMarginTop = 0, modalMarginLeft = 0;
function setSizeModal(valueName) {
//    alert("window.innerHeight: " + window.innerHeight + " || window.innerWidth: " + window.innerWidth);
//    
//    var hViTri = $("#divViTri").height();
//    hViTri = hViTri / 2;

//    modalMarginTop = window.innerHeight;
//    modalMarginLeft = window.innerWidth;

    modalHeight = window.innerHeight;
    modalWidth = window.innerWidth;
    var s = document.getElementById(valueName);
    s.style.marginTop = modalMarginTop + "px";
    s.style.marginLeft = modalMarginLeft + "px";
    s.style.width = modalWidth + "px";
    s.style.height = modalHeight + "px";
}

function funDropAndDrap(headerF, rootF) {
    var headerForm = document.getElementById(headerF);
    var rootForm = document.getElementById(rootF);
    Drag.init(headerForm, rootForm);
}

function funClose(valueName) {
//    alert(valueName);
    document.getElementById(valueName).style.display = "none";
    hiddenModal();
    banPhucVu();

    pubStopReload = false;
}

function cboLoaiHH() {
    var url = "myFunction/funGoiMon.jsp?caseName=loaiHH";
    var res = show_data(url);
    document.getElementById("cboLoaiHH").innerHTML = res;
}

function cboViTriPhong() {
    var maQuay = pubMaQuay;
    var url = "myFunction/funGoiMon.jsp?caseName=viTriPhong&maQuay=" + maQuay;
    var res = "";
    res = show_data(url);
//    alert("maQuay: " + maQuay + " res: " + res);
    document.getElementById("cboViTri").innerHTML = res;
}

function banPhucVu() {
    var infoTT = document.getElementById("cboTinhTrang").value;
    var idVT = document.getElementById("cboViTri").value;
    var ngayDat = document.getElementById("txtNgayKiemTra").value;
    var maQuay = pubMaQuay;
//    alert("infoTT: " + infoTT + " idVT: " + idVT + " ngayDat: " + ngayDat + " maQuay: " + maQuay);

    var url = "myFunction/funGoiMon.jsp?caseName=banPhucVu&idVT=" + idVT + "&ngayDat=" + ngayDat + "&infoTT=" + infoTT + "&maQuay=" + maQuay;
    var res = show_data(url);
    document.getElementById("tabsC").innerHTML = res;
}

function hiddenModal() {
    $("#divMyDialog").attr("aria-hidden", "true");
    $("#divMyDialog").addClass("hidden");
}

function showModal() {
    setSizeModal("divMyDialog");
    $("#divMyDialog").attr("aria-hidden", "false");
    $("#divMyDialog").removeClass("hidden");
}

function hiddenHoaDon(valueName) {
//alert(valueName);                
    document.getElementById(valueName).style.display = "none";
    hiddenModal();
//    resetLogin();
}

function showHoaDon(valueName, maBan) {
    hiddenHoaDon(valueName);
    setSizeHoaDon(valueName);
    document.getElementById(valueName).style.display = "block";
    showModal();
//    clearSession();
//    resetDesktop();
//    resetMenu();    
}

function hiddenChonMon(valueName) {
//alert(valueName);                
    document.getElementById(valueName).style.display = "none";
    hiddenModal();

    pubStopReload = false;
}

function showChonMon(divChonMon) {
    hiddenChonMon(divChonMon);
    setSizeChonMon("divMain", "divTitleSoDo", "divTitleDN", divChonMon);
    document.getElementById(divChonMon).style.display = "block";
    showModal();

    pubStopReload = true;
}

var pubIsStop = false;
function chonMon() {
//    var maNV = "";
//    maNV = pubMaNV.trim();

    var infoTT = "";
    infoTT = document.getElementById("cboTT").value;
    infoTT = infoTT.trim();

    pubIsStop = false;
    pubIsBaoTra = false;
    document.getElementById("divChucNang").innerHTML = "Gởi chế biến";

    infoTT = infoTT.toLowerCase();
    if (infoTT.localeCompare("baotra") === 0) {
        pubIsBaoTra = true;
        document.getElementById("divChucNang").innerHTML = "Xác nhận món";
    }
    else if (infoTT.localeCompare("daphucvu") === 0) {
        pubIsStop = true;
        document.getElementById("divChucNang").innerHTML = "...";
    }

    var maQuay = pubMaQuay;
    var maBan = pubMaBan;
    var cboLHH = document.getElementById("cboLoaiHH").value;
    var noiDungTim = document.getElementById("txtTimHH").value;
    var ngayChonBan = document.getElementById("txtNgayKiemTra").value;
//    alert("maQuay: " + maQuay + " infoTT: " + infoTT + " cboLHH: " + cboLHH + " noiDungTim: " + noiDungTim + " maBan: " + maBan + " ngayChonBan: " + ngayChonBan);    

    var url = "myFunction/funGoiMon.jsp?caseName=dsChonMon&maQuay=" + maQuay + "&infoTT=" + infoTT + "&cboLHH=" + cboLHH + "&noiDungTim=" + noiDungTim + "&maBan=" + maBan + "&ngayChonBan=" + ngayChonBan;
    var res = "";
    res = show_data(url); //alert(res);
    res = res.trim();
    document.getElementById("dsHangHoa").innerHTML = res;

    pubMaNhom = "-";
}

var pubMaTam = "", pubMaBan = "", pubIsHD = false, pubIsSD = false;
function funHoaDon(maBan, isHoaDon, isSuDung, isBaoTra) {
//    alert(maBan + " " + isHoaDon);
    if (isHoaDon) { //Hóa đơn
        showHoaDon("divHoaDon", maBan);
    }
    else { //Chọn thực đơn 
        pubIsHD = isHoaDon;
        pubIsSD = isSuDung;
        pubMaBan = maBan;
        pubMaBan = pubMaBan.trim();

        document.getElementById("divChucNang").innerHTML = "Gởi chế biến";
        if (isBaoTra === true && isSuDung === true) {
            document.getElementById("divChucNang").innerHTML = "Xác nhận món";
            document.getElementById("cboTT").selectedIndex = 3;
        }
        else if (isBaoTra == false && isSuDung == true) {
            document.getElementById("cboTT").selectedIndex = 1;
        }
        else {
            document.getElementById("cboTT").selectedIndex = 0;
        }

        var infoTT = "";
        infoTT = document.getElementById("cboTT").value;
        infoTT = infoTT.trim();

        var ngayChonBan = document.getElementById("txtNgayKiemTra").value;
        var url = "myFunction/funGoiMon.jsp?caseName=getMaTamKhiChonBan&maBan=" + maBan + "&ngayChonBan=" + ngayChonBan + "&infoTT=" + infoTT;
        var maTam = "";
        maTam = show_data(url);
//        alert(maTam + " || " + infoTT);

        maTam = maTam.trim();
        if (maTam.localeCompare("-") === 0) {
            var nDate = new Date();
            maTam = pubMaNV + "." + maBan + "." + nDate.getTime();
        }
//        alert(maTam); 
        pubMaTam = maTam;
//        var el = document.getElementById('cboViTri');
//        var cboViTri = el.options[el.selectedIndex].innerHTML; 
        var tenViTri = document.getElementById("spTVT" + maBan).innerHTML;
        var tenBan = document.getElementById("sp" + maBan).innerHTML;
        document.getElementById("spMenuTenBan").innerHTML = tenBan + " - " + tenViTri + " || " + pubMaTam;
        showChonMon("divChonMon");

        chonMon();
    }
}

function funCapNhatMon(spMaHH, infoTT, isGhiChu, strTT) {
    var idTTDH = "";
    idTTDH = spMaHH.toString();
    idTTDH = idTTDH.replace("lbl", "");
    idTTDH = idTTDH.trim();

    var maNVLap = "";
    maNVLap = pubMaNV.toString();
    maNVLap = maNVLap.trim();

    //    alert("spMaHH: " + spMaHH + " infoTT: " + infoTT + " isGhiChu: " + isGhiChu + " idTTDH: " + idTTDH + " maNVLap: " + maNVLap); 
    if (maNVLap.localeCompare("null") === 0 || maNVLap.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else {
        var url = "myFunction/funGoiMon.jsp?caseName=capNhatMon&idTTDH=" + idTTDH + "&infoTT=" + infoTT + "&maNVLap=" + maNVLap + "&strTT=" + strTT;
        var res = "";
        res = show_data(url);
        res = res.trim(); //alert(res);

        var resArray = "";
        resArray = res.split("<s>"); //alert(resArray.length + " " + resArray[0] + " " + resArray[1] + " " + resArray[2] + " " + resArray[3] + " " + idTTDH);

        idTTDH = resArray[0];
        if (idTTDH.localeCompare("-1") === 0 || idTTDH.localeCompare("null") === 0) {
            alert("Kết quả cập nhật số lượng đặt món: \n\t Cập nhật không thành công số lượng đặt món. Vui lòng thử cập nhật lại !!");
        }
        else if (idTTDH.localeCompare("-2") === 0) {
            alert("Kết quả cập nhật số lượng đặt món: \n\t Món ăn đang hoặc đã chế biên nên không được phép cập nhật số lượng đặt món.");
        }
        else if (idTTDH.localeCompare("-3") === 0) {
            alert("Kết quả cập nhật số lượng đặt món: \n\t Không thể cập nhật số lượng khi ghi chú gia vị để trống. \n\n Vui lòng nhập ghi chú gia vị trước khi cập nhật số lượng !!");
        }
        else if (idTTDH.localeCompare("-4") === 0) {
            alert("Kết quả cập nhật số lượng đặt món: \n\n\t Số lượng hiện tại là 1 nên không thể giảm số lượng đặt món."
                    + " \n\n\n Chú ý: "
                    + " \n\t\t + Số lượng đặt món món ít nhất phải là 1 món"
                    + " \n\t\t + Hủy đặt món bằng cách chọn ''Xóa món'' ");
        }
        else {
            var strSLSum = "-";
            strSLSum = resArray[1];
            if (strSLSum.localeCompare("0") === 0)
                strSLSum = "-";

            var maHH = resArray[4];
            var lblSumHH = "lblSum" + maHH;
            document.getElementById(lblSumHH).innerHTML = strSLSum;

            var strSL = "-";
            if (isGhiChu) {
                strSL = resArray[3];//slHHGC
            } else {
                strSL = resArray[2];//slHH
            }
            document.getElementById(spMaHH).innerHTML = strSL;
        }
    }
}

var pubMaNhom = "-";
function funMoRong(pubMaHH, isGhiChu) {
//    alert("pubMaHH: " + pubMaHH + " maMoRong: " + maMoRong);

    var infoTT = "";
    infoTT = document.getElementById("cboTT").value;

    var maBan = "";
    maBan = pubMaBan.toString();
    maBan = maBan.trim();
    var ghiChuGiaVi = "";
    if (isGhiChu) {
        ghiChuGiaVi = "<note>"; // Mặt định gía trị
    }
    else {
        ghiChuGiaVi = "";
    }

    var maTam = "";
    maTam = pubMaTam.toString();
    maTam = maTam.trim();

    var maHH = "";
    maHH = pubMaHH.toString();
    maHH = maHH.trim();

    var maNVLap = "";
    maNVLap = pubMaNV.toString();
    maNVLap = maNVLap.trim();
    if (maNVLap.localeCompare("null") === 0 || maNVLap.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        if (pubMaNhom.toString().localeCompare("-") == 0) {
            var nDate = new Date();
            pubMaNhom = nDate.getTime();
        }
//        alert(pubMaNhom);

        var url = "myFunction/funGoiMon.jsp?caseName=datMon&maNVLap=" + maNVLap + "&maBan=" + maBan + "&maTam=" + maTam + "&maHH=" + maHH + "&ghiChuGiaVi=" + ghiChuGiaVi + "&infoTT=" + infoTT + "&maNhom=" + pubMaNhom;
        var idTTDH = "";
        idTTDH = show_data(url);
        idTTDH = idTTDH.trim();

        var resArray = "";
        resArray = idTTDH.split("<s>");
//        alert(resArray.length + " " + resArray[0] + " " + resArray[1] + " " + resArray[2] + " " + resArray[3] + " " + idTTDH);

        idTTDH = resArray[0];
        if (idTTDH.localeCompare("-1") === 0 || idTTDH.localeCompare("null") === 0) {
            alert("Thông báo chọn đặt món: \n\t Bạn chọn đặt món chưa thành công. Vui lòng chọn đặt món lại !!");
        }
        else {
            var styleDisplay = "";
            var strInfoTT = "";
            strInfoTT = infoTT.trim().toLowerCase();
            if (strInfoTT.localeCompare("baotra") === 0) { // Báo trả
                styleDisplay = "style='display: none'";
            }

            var slHHSum = resArray[1];
            var slHH = resArray[2];
            var slHHGC = resArray[3];

            var lblID = "lbl" + idTTDH;
            var txtID = "txt" + idTTDH; //supID;
            var lblSumHH = "lblSum" + maHH;

            var tdMaHH = "sup" + maHH;
            var tempHH = "";
            tempHH = document.getElementById(tdMaHH).innerHTML;
            tempHH = tempHH.trim();

            var divID = "";
            if (isGhiChu) { //Ghi chú gia vị
                divID = "div" + idTTDH;

                var strGhiChu = "";
                strGhiChu = "<div id='" + divID + "' style='border: none; border-top: 1px solid #EA8114; margin-left: 90px; padding-left:15px; padding-right:10px;'>"
                        + "   <table style='width: 100%; text-align: center;' border='0'>"
                        + "     <col width='80'>"
                        + "     <col width='auto'>"
                        + "     <col width='30'>"
                        + "     <col width='40'>"
                        + "     <col width='20'>"
                        + "     <col width='70'>"
                        + "     <col width='40'>"
                        + "     <tr style='height: 40px'>"
                        + "         <td style='text-align: canter; color:#4E1D74;'>"
                        + "         Ghi chú:"
                        + "         </td>"
                        + "         <td style='text-align: left;'>"
                        + "             <textarea id='" + txtID + "' " + styleDisplay + " class='txtInput' style='width: 100%; height: 25px; color: darkred; font-size: 12px' onblur=funGhiChu(" + idTTDH + ",'" + txtID + "','" + infoTT + "')></textarea>"
                        + "         </td>"
                        + "         <td style='text-align: left;'>"
                        + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Lưu ghi chú'> s </a>"
                        + "         </td>"
                        + "         <td style='text-align: canter; color:#4E1D74;'>"
                        + "         SL:"
                        + "         </td>"
                        + "         <td style='text-align: canter;'>"
                        + "             <label id='" + lblID + "' style='margin: auto 8px auto 8px; color:#8B0000; font-weight: bolder; font-size: 18px;' > 1 </label>"
                        + "         </td>"
                        + "         <td style='text-align: canter;'>"
                        + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Tăng món kèm ghi chú' href=javascript:funCapNhatMon('" + lblID + "','+'," + isGhiChu + ",'" + infoTT + "')> + </a>"
                        + "             <a id='aGiam' " + styleDisplay + " class='btnLCHH' title='Giảm món kèm ghi chú' href=javascript:funCapNhatMon('" + lblID + "','-'," + isGhiChu + ",'" + infoTT + "')> - </a>"
                        + "         </td>"
                        + "         <td style='text-align: center'>"
                        + "             <a id='aXoa' " + styleDisplay + " class='btnLCHH' title='Xóa món' onclick=funXoaChonMon(" + idTTDH + ",'" + divID + "','" + infoTT + "')> x </a>"
                        + "         </td>"
                        + "     </tr>"
                        + "   </table>"
                        + "</div>";
                tempHH = tempHH + strGhiChu;
            }
            else {
                divID = "div" + maHH;

                var strChonMon = "";
                var divSearch = $('#' + tdMaHH).find('div');
                if (divSearch.length !== 0) {
                    var idTemp = "";
                    for (var i = 0; i < divSearch.length; i++) {
                        idTemp = divSearch[i].id;
                        if (divID.localeCompare(idTemp) === 0)
                        {
                            $("#" + divID).remove();
                            tempHH = document.getElementById(tdMaHH).innerHTML;
                            break;
                        }
                    }
                }

//              alert("zitKoTo");
                strChonMon = "<div id='" + divID + "' style='border: none; border-top: 1px solid #EA8114; margin-left: 90px; padding-left:15px; padding-right:10px;'>"
                        + "   <table style='width: 100%; text-align: center;' border='0'>"
                        + "     <col width='auto'>"
                        + "     <col width='40'>"
                        + "     <col width='20'>"
                        + "     <col width='70'>"
                        + "     <col width='40'>"
                        + "     <tr style='height: 40px'>"
                        + "         <td style='text-align: canter;'>"
                        + "         </td>"
                        + "         <td style='text-align: canter; color:#4E1D74;'>SL:</td>"
                        + "         <td style='text-align: canter;'>"
                        + "             <label id='" + lblID + "' style='margin: auto 8px auto 8px; color:#8B0000; font-weight: bolder; font-size: 18px;' > " + slHH + " </label>"
                        + "         </td>"
                        + "         <td style='text-align: canter;'>"
                        + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Tăng món' href=javascript:funCapNhatMon('" + lblID + "','+'," + isGhiChu + ",'" + infoTT + "')> + </a>"
                        + "             <a id='aGiam' " + styleDisplay + " class='btnLCHH' title='Giảm món' href=javascript:funCapNhatMon('" + lblID + "','-'," + isGhiChu + ",'" + infoTT + "')> - </a>"
                        + "         </td>"
                        + "         <td style='text-align: center'>"
                        + "             <a id='aXoa' " + styleDisplay + " class='btnLCHH' title='Xóa món' onclick=funXoaChonMon(" + idTTDH + ",'" + divID + "','" + infoTT + "')> x </a>"
                        + "         </td>"
                        + "     </tr>"
                        + "   </table>"
                        + "</div>";
                tempHH = strChonMon + tempHH;
            }

            //alert("tempHH: " + tempHH + " || spID: " + document.getElementById(lblSumHH).innerHTML); 
            if (slHHSum.localeCompare("0") === 0)
                slHHSum = "-";
            document.getElementById(lblSumHH).innerHTML = slHHSum;
            document.getElementById(tdMaHH).innerHTML = tempHH;
        }
    }
}

var isShow = true;
function funXemChiTiet(infoTT, maBan, maHH, ngayCB) {
//    alert(infoTT + " || " + maBan + " || " + maHH + " || " + ngayCB);
// rLoopB."ID" +'<s>'+ rLoopB."NgayDat" +'<s>'+ rLoopB."GhiChuGiaVi" +'<s>'+ rLoopB."MaBan" +'<s>'+ rLoopB."MaHH" +'<s>'+ rLoopB."SLHH" +'<sos>'

    var tdMaHH = "sup" + maHH;
    if (isShow) {
        isShow = false;
        var styleDisplay = "";
        var url = "myFunction/funGoiMon.jsp?caseName=chiTietChonMon&ngayCB=" + ngayCB + "&maBan=" + maBan + "&maHH=" + maHH + "&infoTT=" + infoTT;
        var infoHH = "";
        infoHH = show_data(url);
        infoHH = infoHH.trim();
//        alert(infoHH);

        var sosArray = "";
        sosArray = infoHH.split("<sos>");
//        alert(sosArray.length);

        if (sosArray.length > 1) {
            var sArray = "";

            var lblSumHH = "lblSum" + maHH;
            var slHHSum = document.getElementById(lblSumHH).innerHTML;
            var slHH = "-";
            var slHHGC = "-";

            var tempHH = "";
            var divID = "";
            var isGhiChu = "false";
            var ghiChuGiaVi = "";

            var idTTDH = "";
            var lblID = "";
            var txtID = "";

            var strInfoTT = "", strOnblur = "";
            strInfoTT = infoTT.trim().toLowerCase();
            if (strInfoTT.localeCompare("baotra") === 0 || strInfoTT.localeCompare("yeucautt") === 0) { // Báo trả || Yêu cầu TT
                styleDisplay = "style='display: none'";
            }

            for (var i = 0; i < sosArray.length - 1; i++) {
                sArray = "";
                sArray = sosArray[i].split("<s>");
//                alert("idTTDH: " + sArray[0] + " ngayDat: " + sArray[1] + " ghiChuGiaVi: " + sArray[2] + " maBan: " + sArray[3] + " maHH: " + sArray[4] + " slHH: " + sArray[5]);

                idTTDH = sArray[0].toString();
                lblID = "lbl" + idTTDH;
                txtID = "txt" + idTTDH;

                if (strInfoTT.localeCompare("baotra") !== 0 && strInfoTT.localeCompare("yeucautt") !== 0) { // Báo trả || Yêu cầu TT             
                    strOnblur = "onblur=funGhiChu(" + idTTDH + ",'" + txtID + "','" + infoTT + "')";
                }

                ghiChuGiaVi = sArray[2].toString(); //alert(ghiChuGiaVi);            
                if (ghiChuGiaVi.localeCompare("-") !== 0) {
                    isGhiChu = "true";
                    slHH = "-";
                    slHHGC = sArray[5].trim();
                    divID = "div" + idTTDH;

                    var strGhiChu = "";
                    strGhiChu = "<div id='" + divID + "' style='border: none; border-top: 1px solid #EA8114; margin-left: 90px; padding-left:15px; padding-right:10px;'>"
                            + "   <table style='width: 100%; text-align: center;' border='0'>"
                            + "     <col width='80'>"
                            + "     <col width='auto'>"
                            + "     <col width='30'>"
                            + "     <col width='40'>"
                            + "     <col width='20'>"
                            + "     <col width='70'>"
                            + "     <col width='40'>"
                            + "     <tr style='height: 40px'>"
                            + "         <td style='text-align: canter; color:#4E1D74;'>"
                            + "         Ghi chú:"
                            + "         </td>"
                            + "         <td style='text-align: left;'>"
                            + "             <textarea id='" + txtID + "' class='txtInput' style='width: 100%; height: 25px; color: darkred; font-size: 12px' " + strOnblur + ">" + ghiChuGiaVi + "</textarea>"
                            + "         </td>"
                            + "         <td style='text-align: left;'>"
                            + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Lưu ghi chú'> s </a>"
                            + "         </td>"
                            + "         <td style='text-align: canter; color:#4E1D74;'>"
                            + "         SL:"
                            + "         </td>"
                            + "         <td style='text-align: canter;'>"
                            + "             <label id='" + lblID + "' style='margin: auto 8px auto 8px; color:#8B0000; font-weight: bolder; font-size: 18px;' >" + slHHGC + "</label>"
                            + "         </td>"
                            + "         <td style='text-align: canter;'>"
                            + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Tăng món kèm ghi chú' href=javascript:funCapNhatMon('" + lblID + "','+'," + isGhiChu + ",'" + infoTT + "')> + </a>"
                            + "             <a id='aGiam' " + styleDisplay + " class='btnLCHH' title='Giảm món kèm ghi chú' href=javascript:funCapNhatMon('" + lblID + "','-'," + isGhiChu + ",'" + infoTT + "')> - </a>"
                            + "         </td>"
                            + "         <td style='text-align: center'>"
                            + "             <a id='aXoa' " + styleDisplay + " class='btnLCHH' title='Xóa món' onclick=funXoaChonMon(" + idTTDH + ",'" + divID + "','" + infoTT + "')> x </a>"
                            + "         </td>"
                            + "     </tr>"
                            + "   </table>"
                            + "</div>";
                    tempHH = tempHH + strGhiChu;
                }
                else {
                    slHH = sArray[5].trim();
                    slHHGC = "-";
                    divID = "div" + maHH;

                    var strChonMon = "";
                    strChonMon = "<div id='" + divID + "' style='border: none; border-top: 1px solid #EA8114; margin-left: 90px; padding-left:15px; padding-right:10px;'>"
                            + "   <table style='width: 100%; text-align: center;' border='0'>"
                            + "     <col width='auto'>"
                            + "     <col width='40'>"
                            + "     <col width='20'>"
                            + "     <col width='70'>"
                            + "     <col width='40'>"
                            + "     <tr style='height: 40px'>"
                            + "         <td style='text-align: canter;'>"
                            + "         </td>"
                            + "         <td style='text-align: canter; color:#4E1D74;'>SL:</td>"
                            + "         <td style='text-align: canter;'>"
                            + "             <label id='" + lblID + "' style='margin: auto 8px auto 8px; color:#8B0000; font-weight: bolder; font-size: 18px;' >" + slHH + "</label>"
                            + "         </td>"
                            + "         <td style='text-align: canter;'>"
                            + "             <a id='aTang' " + styleDisplay + " class='btnLCHH' title='Tăng món' href=javascript:funCapNhatMon('" + lblID + "','+'," + isGhiChu + ",'" + infoTT + "')> + </a>"
                            + "             <a id='aGiam' " + styleDisplay + " class='btnLCHH' title='Giảm món' href=javascript:funCapNhatMon('" + lblID + "','-'," + isGhiChu + ",'" + infoTT + "')> - </a>"
                            + "         </td>"
                            + "         <td style='text-align: center'>"
                            + "             <a id='aXoa' " + styleDisplay + " class='btnLCHH' title='Xóa món' onclick=funXoaChonMon(" + idTTDH + ",'" + divID + "','" + infoTT + "')> x </a>"
                            + "         </td>"
                            + "     </tr>"
                            + "   </table>"
                            + "</div>";
                    tempHH = strChonMon + tempHH;
                }
            }

            //alert("tempHH: " + tempHH + "spID: " + document.getElementById(lblSumHH).innerHTML); 
            if (slHHSum.localeCompare("0") === 0)
                slHHSum = "-";
            document.getElementById(lblSumHH).innerHTML = slHHSum;
            document.getElementById(tdMaHH).innerHTML = tempHH;
        }
    }
    else {
        isShow = true;
        document.getElementById(tdMaHH).innerHTML = "";
    }
}

function funXoaChonMon(pubIDTTDH, divID, infoTT) {
    var idTTDH = "";
    idTTDH = pubIDTTDH.toString();
    idTTDH = idTTDH.trim();

    var url = "myFunction/funGoiMon.jsp?caseName=xoaChonMon&idTTDH=" + idTTDH + "&infoTT=" + infoTT;
    var res = "";
    res = show_data(url);
    res = res.trim(); //alert(res);

    var resArray = "";
    resArray = res.split("<s>");
//        alert(resArray.length + " " + resArray[0] + " " + resArray[1] + " " + resArray[2] + " " + resArray[3] + " " + idTTDH); 

    idTTDH = resArray[0];
    if (idTTDH.localeCompare("-1") === 0 || idTTDH.localeCompare("null") === 0) {
        alert("Kết quả xóa chọn đặt món: \n\t Không xóa được chọn đặt món. Vui lòng thử xóa lại !!");
    }
    else if (idTTDH.localeCompare("-2") === 0) {
        alert("Kết quả xóa chọn đặt món: \n\t Món ăn đang hoặc đã chế biên nên không được phép xóa chọn món.");
    }
    else {
        var slHHSum = "";
        slHHSum = resArray[1];
        if (slHHSum.localeCompare("0") === 0)
            slHHSum = "-";

//        var slHH = resArray[2];
//        var slHHGC = resArray[3];
        var maHH = resArray[4];

        var lblSumHH = "lblSum" + maHH;
        document.getElementById(lblSumHH).innerHTML = slHHSum;
        document.getElementById(divID).remove();
    }
}

function funGhiChu(idTTDH, txtID, infoTT) {
    var tempID = "";
    tempID = idTTDH.toString();
    tempID = tempID.trim();
//    alert("idTTDH: " + tempID + " txtID: " + txtID);

    var ghiChu = "";
    ghiChu = document.getElementById(txtID).value;
    var url = "myFunction/funGoiMon.jsp?caseName=updateGhiChu&idTTDH=" + tempID + "&ghiChu=" + ghiChu + "&infoTT=" + infoTT;
    tempID = "";
    tempID = show_data(url);
    tempID = tempID.trim();

    var resArray = "";
    resArray = tempID.split("<s>");
//    alert(resArray.length + " " + resArray[0] + " " + resArray[1] + " " + resArray[2] + " " + resArray[3] + " " + resArray[4] + " " + idTTDH); 

    tempID = resArray[0];
    if (tempID.localeCompare("-1") === 0 || tempID.localeCompare("null") === 0) {
        alert("Kết quả lưu ghi chú gia vị: \n\t Chưa lưu được ghi chú gia vị cho món. Vui lòng xóa nội dung và ghi chú lại !!");
    }
    else if (tempID.localeCompare("-2") === 0) {
        alert("Kết quả lưu ghi chú gia vị: \n\t Món ăn đang hoặc đã chế biên nên không được phép cập nhật ghi chú gia vị.");
    }
    else if (tempID.localeCompare("-3") === 0) {
//        alert("Kết quả lưu ghi chú gia vị: \n\t Nội dung ghi chú gia vị không được để trống.");
    }
    else {
        var lblSumHH = "lblSum" + resArray[4];
        var slHHSum = resArray[1]; // alert(lblSumHH + " " + slHHSum);

        document.getElementById(lblSumHH).innerHTML = slHHSum;
        document.getElementById(txtID).innerHTML = ghiChu;
    }
}

var pubIsBaoTra = false;
function goiCheBien() {
    var maArray = "";
    maArray = pubMaTam.trim().split(".");
    if (maArray[0].localeCompare("null") === 0 || maArray[0].localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
        return;
    }

    if (pubIsStop)
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t Bạn thật sự muốn gởi thông tin ?"))
    {
        var maCheBien = "";
        maCheBien = maArray[0] + "." + maArray[1] + "." + maArray[2];
        var url = "myFunction/funGoiMon.jsp?caseName=goiCheBien&maCheBien=" + maCheBien + "&maNV=" + maArray[0] + "&isBaoTra=" + pubIsBaoTra;
        var res = "";
        res = show_data(url);
        res = res.trim();

//        alert(res + " || " + pubIsBaoTra);
        if (res.localeCompare("0") === 0) {
            funHoaDon(pubMaBan, pubIsHD, pubIsSD, pubIsBaoTra);
        }
    }
}

function isNotNumber(varNumber) {
    //isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}


var pubMaQuay = -1;
function donDatHang() { //sol
    var infoTT = document.getElementById("cboTinhTrang").value;

    var isCheckC = false, isCheckBC = false, isCheckX = false, styleDisplayC = "none", styleDisplayBC = "none", styleDisplayX = "none";
    var tabName = "";
    tabName = infoTT.toString();
    tabName = tabName.trim().toLowerCase();
    switch (tabName) {
        case "goichebien":
            styleDisplayC = "inline-block";
            styleDisplayBC = "none";
            styleDisplayX = "none";
            break;
        case "chonchebien":
            styleDisplayC = "none";
            styleDisplayBC = "inline-block";
            styleDisplayX = "inline-block";
            break;
        case "baonhanmon":
            styleDisplayC = "none";
            styleDisplayBC = "none";
            styleDisplayX = "inline-block";
            break;
        case "xacnhandanhan":
            styleDisplayC = "none";
            styleDisplayBC = "none";
            styleDisplayX = "none";
            break;
    }

    document.getElementById("chkXoaTraTatCa").checked = isCheckX;
    document.getElementById("chkXoaTraTatCa").style.display = styleDisplayX;

    document.getElementById("chkChonTatCa").checked = isCheckC;
    document.getElementById("chkChonTatCa").style.display = styleDisplayC;

    document.getElementById("chkBaoTraTatCa").checked = isCheckBC;
    document.getElementById("chkBaoTraTatCa").style.display = styleDisplayBC;

    var timHH = document.getElementById("txtTimHH").value;
    var ngayDat = document.getElementById("txtNgayKiemTra").value; //alert(pubMaQuay);
    var maQuay = pubMaQuay;
    var maNV = pubMaNV;
    var loaiHH = "";
    loaiHH = document.getElementById("cboLoaiHH").value;

    // alert("infoTT: " + infoTT + " maQuay: " + maQuay + " ngayDat: " + ngayDat + " timHH: " + timHH + " loaiHH: " + loaiHH + " maNV: " + maNV + " isNotNumber(loaiHH): " + isNotNumber(loaiHH));
    if (loaiHH.localeCompare("") === 0 || loaiHH.localeCompare("null") === 0)
        return;

    var url = "myFunction/funGoiMon.jsp?caseName=donDatHang&maQuay=" + maQuay + "&ngayDat=" + ngayDat + "&infoTT=" + infoTT + "&timHH=" + timHH + "&loaiHH=" + loaiHH + "&maNV=" + maNV;
    var res = show_data(url);
    document.getElementById("tabsC").innerHTML = res;

    document.getElementById("dsNDDatMon").innerHTML = "";
    pubListMaTam = "";
}

var listSelect = new Array();
var pubList = "";
var pubListMaTam = "";
function chonDonDatHang(this_) {
    var selected = "";
    selected = document.getElementById(this_.id).className;

    if (selected.localeCompare("selected") === 0)
        document.getElementById(this_.id).className = '';
    else
        document.getElementById(this_.id).className = 'selected';

    pubListMaTam = "";
    var selectedItems = $("#tabsC").find('li').find('div');
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].className.localeCompare("selected") === 0)
        {
            //alert(selectedItems[i].id + " " + selectedItems[i].className);
            pubListMaTam = pubListMaTam + selectedItems[i].id + "<sos>";
        }
    }
    pubListMaTam = pubListMaTam.trim();

// //Text
// alert(pubListMaTam + " pubListMaTam.length: " + pubListMaTam.length);
    var infoTT = document.getElementById("cboTinhTrang").value;
    var loaiHH = document.getElementById("cboLoaiHH").value;

    var res = "";
    if (pubListMaTam.length != 0) {
        var maQuay = pubMaQuay;
        var url = "myFunction/funGoiMon.jsp?caseName=noiDungHH&listMaTam=" + pubListMaTam + "&maQuay=" + maQuay + "&infoTT=" + infoTT + "&loaiHH=" + loaiHH;
        res = show_data(url);
    }
    document.getElementById("dsNDDatMon").innerHTML = res;
}

var isTatCaDDH = true;
function chonTatCaDonDatHang() {
    pubListMaTam = "";
    var selectedItems = $("#tabsC").find('li').find('div'); // alert("selectedItems.length: " + selectedItems.length); 
    if (selectedItems.length === 0)
        return;

    var iTatCa = $("#iTatCaPhieu");
    var lblTatCa = $("#lblTatCaPhieu");

    if (isTatCaDDH) {
        iTatCa.css("color", "#FFFFCC");
        lblTatCa.css("color", "#FFFFCC");
    }
    else {
        iTatCa.css("color", "#E6E6E6");
        lblTatCa.css("color", "#E6E6E6");
    }

    for (var i = 0; i < selectedItems.length; i++) {
        if (isTatCaDDH)
        {
            pubListMaTam = pubListMaTam + selectedItems[i].id + "<sos>";
            document.getElementById(selectedItems[i].id).className = 'selected';
        }
        else {
            document.getElementById(selectedItems[i].id).className = '';
        }
    }
    pubListMaTam = pubListMaTam.trim();
    isTatCaDDH = !isTatCaDDH;

//    //Text
//    alert(pubListMaTam + " pubListMaTam.length: " + pubListMaTam.length + " isTatCaDDH: " + isTatCaDDH);

    var infoTT = document.getElementById("cboTinhTrang").value;
    var loaiHH = document.getElementById("cboLoaiHH").value;

    var res = "";
    if (pubListMaTam.length != 0) {
        var maQuay = pubMaQuay;
        var url = "myFunction/funGoiMon.jsp?caseName=noiDungHH&listMaTam=" + pubListMaTam + "&maQuay=" + maQuay + "&infoTT=" + infoTT + "&loaiHH=" + loaiHH;
        res = show_data(url);
    }
    document.getElementById("dsNDDatMon").innerHTML = res;
}

function chonCheBien(maHH, isCheBien) {
    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();

    if (maNVXN.localeCompare("null") == 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        //  alert("pubListMaTam: " + pubListMaTam + " maHH: " + maHH + " maNVXN: " + maNVXN + " ngayXNCB: " + ngayXNCB);
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn xác nhận chọn món chế biến vừa chọn ?"))
        {
            var ngayXNCB = document.getElementById("txtNgayKiemTra").value;
            var url = "myFunction/funGoiMon.jsp?caseName=chonCheBien&listMaTam=" + pubListMaTam + "&maHH=" + maHH + "&maNVXN=" + maNVXN + "&ngayXNCB=" + ngayXNCB;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkChonTatCa").checked = false;
            }
            else {
                alert("Kết quả xác nhận chọn chế biến: \n\n\t\t Không xác nhận được chọn món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function chonCheBienTatCa() {
//    alert(pubListMaTam);
    if (!document.getElementsByTagName || !document.createTextNode)
        return;
    var table = document.getElementById('tbNDDatMon').getElementsByTagName('tbody')[0]; // first table
    var rows = table.getElementsByTagName('tr'); //alert(rows.length);
    if (rows.length === 0)
        return;

    var listMaHH = "";
    var idTr = "";
//    var styleDisplayTr = "";
    for (var i = 0; i < rows.length; i++) {
        idTr = rows[i].id;
//        styleDisplayTr = rows[i].style.display.toString();
        if (idTr.localeCompare("") !== 0 && idTr !== null) {
            listMaHH = listMaHH + idTr + "<sos>"; //&& styleDisplayTr.localeCompare("none") !== 0
//            alert("idTr: " + idTr + " styleDisplayTr: " + styleDisplayTr + " listMaHH.search: " + listMaHH.search(idTr) + " listMaHH: " + listMaHH);
        }
    }

    //var isChonTatCa = document.getElementById("chkChonTatCa").checked;
//    alert(pubListMaTam + " <br> " + listMaHH);    

    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();
    if (maNVXN.localeCompare("null") == 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn xác nhận chọn tất cả món chế biến ?"))
        {
            var ngayXNCB = document.getElementById("txtNgayKiemTra").value;
            var url = "myFunction/funGoiMon.jsp?caseName=chonCheBienTatCa&listMaTam=" + pubListMaTam + "&listMaHH=" + listMaHH + "&maNVXN=" + maNVXN + "&ngayXNCB=" + ngayXNCB;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkChonTatCa").checked = false;
            }
            else {
                alert("Kết quả xác nhận chọn chế biến: \n\n\t\t Không xác nhận được chọn món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function baoTraMon(maHH, isTraMon) {
    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();

    if (maNVXN.localeCompare("null") === 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
//        alert("maTam: " + strArray[0] + " ngayBao: " + strArray[1] + " maHH: " + maHH + " maNVXacNhan: " + maNVXacNhan);
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn báo trả món đã chế biến vừa chọn ?"))
        {
            var ngayXNBT = document.getElementById("txtNgayKiemTra").value;
            var url = "myFunction/funGoiMon.jsp?caseName=baoTraMon&listMaTam=" + pubListMaTam + "&maHH=" + maHH + "&maNVXN=" + maNVXN + "&ngayXNBT=" + ngayXNBT;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkBaoTraTatCa").checked = false;
            }
            else {
                alert("Kết quả báo nhận: \n\n\t\t Không gởi được thông báo nhận món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function baoTraMonTatCa() {
    //    alert(pubListMaTam);
    if (!document.getElementsByTagName || !document.createTextNode)
        return;
    var table = document.getElementById('tbNDDatMon').getElementsByTagName('tbody')[0]; // first table
    var rows = table.getElementsByTagName('tr'); //alert(rows.length);
    if (rows.length === 0)
        return;

    var listMaHH = "";
    var idTr = "";
//    var styleDisplayTr = "";
    for (var i = 0; i < rows.length; i++) {
        idTr = rows[i].id;
//        styleDisplayTr = rows[i].style.display.toString();
//        alert("listMaHH.search: " + listMaHH.search(idTr) + " " + idTr);
        if (idTr.localeCompare("") !== 0 && idTr !== null) {
            listMaHH = listMaHH + idTr + "<sos>"; //&& styleDisplayTr.localeCompare("none") !== 0
//            alert("idTr: " + idTr + " styleDisplayTr: " + styleDisplayTr + " listMaHH.search: " + listMaHH.search(idTr) + " listMaHH: " + listMaHH);
        }
    }

    var isBaoTatCa = document.getElementById("chkBaoTraTatCa").checked;
//    alert(pubListMaTam + " <br> " + listMaHH);

    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();
    if (maNVXN.localeCompare("null") === 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn báo trả tất cả món đã chế biến ?"))
        {
            var ngayXNBT = document.getElementById("txtNgayKiemTra").value;
            var url = "myFunction/funGoiMon.jsp?caseName=baoTraMonTatCa&listMaTam=" + pubListMaTam + "&listMaHH=" + listMaHH + "&maNVXN=" + maNVXN + "&ngayXNBT=" + ngayXNBT;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkBaoTraTatCa").checked = false;
            }
            else {
                alert("Kết quả báo nhận: \n\n\t\t Không gởi được thông báo nhận món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function xoaMonTatCa() {
    //    alert(pubListMaTam);
    if (!document.getElementsByTagName || !document.createTextNode)
        return;
    var table = document.getElementById('tbNDDatMon').getElementsByTagName('tbody')[0]; // first table
    var rows = table.getElementsByTagName('tr'); //alert(rows.length);
    if (rows.length === 0)
        return;

    var listMaHH = "";
    var idTr = "";
//    var styleDisplayTr = "";
    for (var i = 0; i < rows.length; i++) {
        idTr = rows[i].id;
//        styleDisplayTr = rows[i].style.display.toString();
//        alert("listMaHH.search: " + listMaHH.search(idTr) + " " + idTr);
        if (idTr.localeCompare("") !== 0 && idTr !== null) {
            listMaHH = listMaHH + idTr + "<sos>"; //&& styleDisplayTr.localeCompare("none") !== 0
        }
    }

//    var isXoaTraTatCa = document.getElementById("chkXoaTraTatCa").checked;
//    alert(pubListMaTam + " <br> " + listMaHH);

    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();
    if (maNVXN.localeCompare("null") === 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn xóa tất cả món chế biến ?"))
        {
            var url = "myFunction/funGoiMon.jsp?caseName=xoaMonTatCa&listMaTam=" + pubListMaTam + "&listMaHH=" + listMaHH + "&maNVXN=" + maNVXN;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkChonTatCa").checked = false;
                document.getElementById("chkBaoTraTatCa").checked = false;
            }
            else {
                alert("Kết quả xóa: \n\n\t\t Không xóa được tất cả món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function xoaMon(maHH, isXoaMon) {
    var maNVXN = "";
    maNVXN = pubMaNV.toString();
    maNVXN = maNVXN.trim();

    if (maNVXN.localeCompare("null") === 0 || maNVXN.localeCompare("") === 0) {
        alert("Thông báo đăng nhập lại: \n\t Vui lòng đặng nhập tại khoản vì chương trình để lâu không sử dụng !");
    }
    else
    {
        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn xóa món chế biến ?"))
        {
//            alert("maTam: " + pubListMaTam + " || maHH: " + maHH + " || maNVXN: " + maNVXN);
            var url = "myFunction/funGoiMon.jsp?caseName=xoaMon&listMaTam=" + pubListMaTam + "&maHH=" + maHH + "&maNVXN=" + maNVXN;
            var res = "";
            res = show_data(url);
            res = res.trim();
//            alert(res);

            if (res.localeCompare("0") === 0) {
                donDatHang();
                document.getElementById("dsNDDatMon").innerHTML = "";
                document.getElementById("chkChonTatCa").checked = false;
                document.getElementById("chkBaoTraTatCa").checked = false;
            }
            else {
                alert("Kết quả xóa: \n\n\t\t Không xóa được món chế biến. Vui lòng kiểm tra lại !");
            }
        }
    }
}

function funGetCurrentDateTime(varDate, varHour, varMinute) {
    var url = "myFunction/funGetCurrentDateTime.jsp?caseName=getCurrentDateTime";
    var res = "null";
    res = show_data(url); //Format "dd/M/yyyy H:m:s"
    //  //Test
    //  alert(res.trim());
    //  return;

    var strResult = res.split("<sos>");
    // //Test
    // alert(res.trim() + " " + strResult[0] + " " + strResult[1] + " " + strResult[2] + " " + strResult[3]);
    // return;

    //"dd/M/yyyy"
    var tempType = document.getElementById(varDate);
    tempType = tempType.getAttribute("type");
    //    //Test
    //    alert(tempType);
    if (tempType !== null) // Label
        document.getElementById(varDate).value = strResult[0];
    else
        document.getElementById(varDate).innerHTML = strResult[0];
    if (varHour !== null && varHour !== "")
        document.getElementById(varHour).value = strResult[1]; //"H"
    if (varMinute !== null && varMinute !== "")
        document.getElementById(varMinute).value = strResult[2]; //"m"
}

