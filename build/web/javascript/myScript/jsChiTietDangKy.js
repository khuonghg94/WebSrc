/* 
 Document   : funChiTietDangKy
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

function setClass(pubIDName) {
    var idTemp = "";
    idTemp = pubIDName.toString();
    idTemp = idTemp.trim();
//    alert(idTemp);

    var varTemp = document.getElementById('infoStatus').getElementsByTagName("i");
//    alert(varTemp.length);

    var idName = "", isActiveStatus = false;
    for (var ii = 0; ii < varTemp.length; ii++) {
        idName = "";
        idName = varTemp[ii].id;
        isActiveStatus = $("#" + idName).hasClass('activeStatus');
//        alert(idName + " " + idName.length + " activeStatus: " + isActiveStatus);
        if (idName.length !== 0 && isActiveStatus) {
            $("#" + idName).removeClass("activeStatus").toggleClass("hiddenStatus");
        }
    }
    $("#" + idTemp).removeClass("hiddenStatus").toggleClass("activeStatus");
}


function setTab(tabName) {
    var tabTemp = "";
    tabTemp = tabName.toString();
    tabTemp = tabTemp.trim().toLowerCase();

    switch (tabTemp) {
        case "tabkh":
            pubTabQuayLai = "";
            pubTabName = "tabKH";
            setClass("iKhacHang");

            document.getElementById("spanQuayLai").style.display = "none";
            document.getElementById("spanTiepTuc").style.display = "inline";

            document.getElementById("infoKhachHang").style.display = "block";
            document.getElementById("infoDatVe").style.display = "none";
            document.getElementById("infoXacNhan").style.display = "none";
            break;

        case "tabdatve":
            pubTabQuayLai = "tabKH";
            pubTabName = "tabDatVe";
            setClass("iDatVe");

            document.getElementById("spanQuayLai").style.display = "inline";
            document.getElementById("spanTiepTuc").style.display = "inline";

            document.getElementById("infoKhachHang").style.display = "none";
            document.getElementById("infoDatVe").style.display = "block";
            document.getElementById("infoXacNhan").style.display = "none";

            danhSachVe();
            break;

        case "tabxacnhan":
            pubTabQuayLai = "tabDatVe";
            pubTabName = "tabXacNhan";
            setClass("iXacNhan");

            document.getElementById("spanQuayLai").style.display = "inline"; //????
            document.getElementById("spanTiepTuc").style.display = "inline"; //????

            document.getElementById("infoKhachHang").style.display = "none";
            document.getElementById("infoDatVe").style.display = "none";
            document.getElementById("infoXacNhan").style.display = "block";

            var varMSKH = document.getElementById("lblMSKH").innerHTML; // = pubMSKH;
            noiDungXNTT(varMSKH);
            break;
    }
}

var pubTabQuayLai = "tabKH";
function quayLai() {
    var tabTemp = "";
    tabTemp = pubTabQuayLai.toString();
    tabTemp = tabTemp.trim().toLowerCase();

    switch (tabTemp) {
        case "tabkh":
            setTab("tabKH");
            break;

        case "tabdatve":
            setTab("tabDatVe");
            break;

        case "tabxacnhan":
            setTab("tabXacNhan");
            break;
    }
}

var pubTabName = "tabKH";
function tiepTuc() {
    var tabTemp = "";
    tabTemp = pubTabName.toString();
    tabTemp = tabTemp.trim().toLowerCase();

    var msKH = "";
    switch (tabTemp) {
        case "tabkh":
            funLuuKH();
            break;

        case "tabdatve":
            var dsDangKyVe = "";
            dsDangKyVe = document.getElementById("dsChiTietDangKyVe").innerHTML;
            dsDangKyVe = dsDangKyVe.trim();

            var varTemp = dsDangKyVe.split('</tr>');
//            alert(dsDangKyVe + " " + dsDangKyVe.length + " " + varTemp.length);
            if (varTemp.length <= 2) {
                alert("Chú ý: \n\n\t Vui lòng chọn ít nhất một vé trước khi xác nhận đặt vé ! \n\n\n\n Hướng dẫn: \n\t Quý khách nhấn chọn vào Vé để đặt vé.");
            } else {
                setTab("tabXacNhan");
            }
            break;

        case "tabxacnhan":
            msKH = document.getElementById("lblMSKH").innerHTML;
            msKH = msKH.trim();
            if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
                alert("Chú ý: \n\n\t Quý khách vui lòng nhập thông tin đặt vé trước khi gởi xác nhận !");
                return;
            }

            if (confirm("Xác nhận yêu cầu : \n\n\t Quý khách thật sự muốn gởi thông tin đặt vé với nội dung đã nhập ?" +
                    "\n\n\n Chú ý: \n\t Khi gởi thông tin đặt vé Quý khách không được phép thay đổi nội dung."))
            {
                $.ajax({
                    type: "POST",
                    url: "myFunction/funChiTietDangKy.jsp",
                    data: {
                        "msKH": msKH,
                        "caseName": "xnDatVeKH"
                    },
                    success: function (data) {
                        var result = "";
                        result = data.trim();
                        if (isNotNumber(result)) {  //Error                          
                            alert("Lỗi: \n\n\t " + result);
                        } else { //Successfull 
                            //alert(valueName); 
//                            alert("Kết quả gởi xác nhận đặt vé: \n\n\t Hệ thống đã ghi nhận thông tin đặt vé quý khách. ");                            

                            pubTabQuayLai = "";
                            pubTabName = "";

                            document.getElementById("spanTiepTuc").style.display = "none";
                            document.getElementById("spanQuayLai").style.display = "none";
                            document.getElementById("infoXacNhan").style.display = "none";
                            document.getElementById("divButton").style.display = "none";
                            document.getElementById("divMain").style.display = "none";

                            noiDungEmailXNTT(msKH);
                            document.getElementById("divEmail").style.display = "block";
                        }
                    }
                });
            }
            break;
    }
}

function isErrorNgayDuKien() {
    var isError = false;

    var ngayDuKienNhanVe = "01/01/1900";
    ngayDuKienNhanVe = document.getElementById("ngayDuKienNhanVe").value;
    if (!isValidDate(ngayDuKienNhanVe, "Ngày dự kiến nhận vé")) {
        getCurrentDateTime("ngayDuKienNhanVe", null, null);
        document.getElementById("ngayDuKienNhanVe").focus();
        isError = true;
    }

//    alert("isError: " + isError);
    return isError;
}

function funXoaVe(idCT) {
//        alert(idCT);
//        return;

    var strIDCT = "";
    strIDCT = idCT.toString();
    strIDCT = strIDCT.trim();
    if (strIDCT.localeCompare("") === 0 || strIDCT === null)
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Quý khách thật sự muốn xóa vé vừa chọn ra khỏi nội dung đặt vé ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funChiTietDangKy.jsp",
            data: {
                "idCT": strIDCT,
                "caseName": "xoa"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (isNotNumber(result)) { //Error
                    alert("Thông báo kết quả: \n\n\t Error." + result);
                } else { //Successfull
                    danhSachChiTietDangKy(pubMSKH);
                }
            }
        });
    }
}

var pubMSKH = "-";
function funLuuKH() {
    if (isErrorKhachHang() || isErrorNgayDuKien())
        return;

    var isEdit = "add";
    var ngayDKNV = "01/01/1900 00:00";

    var msKH = "";
    msKH = document.getElementById("lblMSKH").innerHTML;
    msKH = msKH.trim();
    if (msKH.localeCompare("-") === 0 || msKH.localeCompare("") === 0) {
        var today = new Date();
        //    alert(today.getTime());
        //    return;
        msKH = "KH" + today.getTime();
        isEdit = "add";
    }
    else {
        isEdit = "edit";

        ngayDKNV = document.getElementById("ngayDuKienNhanVe").value;
        var gioDKNV = document.getElementById("txtGio").value;
        var phutDKNV = document.getElementById("txtPhut").value;

        ngayDKNV = ngayDKNV + " " + gioDKNV + ":" + phutDKNV;
    }

    var hoTen = "";
    hoTen = document.getElementById("hoTen").value;
    var diaChi = "";
    diaChi = document.getElementById("diaChi").value;
    var soCMND = "";
    soCMND = document.getElementById("soCMND").value;
    var dienThoai = "";
    dienThoai = document.getElementById("dienThoai").value;
    var eMail = "";
    eMail = document.getElementById("eMail").value;

    var maSoThue = "";
    var tenCongTy = "";
    var hdDiaChi = "";
    var hdGhiChu = "";

    var isXuatHD = document.getElementById("chkXuatHoaDon").checked;
    if (isXuatHD) {
        maSoThue = document.getElementById("maSoThue").value;
        tenCongTy = document.getElementById("tenCongTy").value;
        hdDiaChi = document.getElementById("hdDiaChi").value;
        hdGhiChu = document.getElementById("hdGhiChu").value;
    }
    else {
        maSoThue = "";
        tenCongTy = "";
        hdDiaChi = "";
        hdGhiChu = "";
    }

//    alert(msKH + " " + hoTen + " " + diaChi + " " + soCMND + " " + dienThoai + " " + eMail + " " + ngayDKNV + " " + isEdit + " " + maSoThue + " " + tenCongTy + " " + hdDiaChi + " " + hdGhiChu);

    $.ajax({
        type: "POST",
        url: "myFunction/funKhachHang.jsp",
        data: {
            "msKH": msKH,
            "hoTen": hoTen,
            "diaChi": diaChi,
            "soCMND": soCMND,
            "dienThoai": dienThoai,
            "eMail": eMail,
            "ngayDKNV": ngayDKNV,
            "isEdit": isEdit,
//            "isXuatHD": isXuatHD,
            "maSoThue": maSoThue,
            "tenCongTy": tenCongTy,
            "hdDiaChi": hdDiaChi,
            "hdGhiChu": hdGhiChu,
            "caseName": "capnhat"
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("jqXHR: " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
        },
        success: function (data) {
            var result = "";
            result = data.trim();
            if (isNotNumber(result)) { //Successfull
//                alert("Thông báo kết quả: \n\n\t " + result);

                pubMSKH = result;
                document.getElementById("lblMSKH").innerHTML = pubMSKH;
                setTab("tabDatVe");
            } else { //Error 
                alert("Thông báo kết quả: \n\n\t Error." + result);
            }
        }
    });
}

var pubIDVe = "-"; //????
function funDangKyMuaVe(msKH, idVe) {
// alert(msKH + " " + idVe);

    var strIDVe = "";
    strIDVe = idVe.toString();
    strIDVe = strIDVe.trim();
    if (strIDVe.localeCompare("") === 0 || strIDVe.localeCompare("-") === 0)
        return;
    var strMSKH = "";
    strMSKH = msKH;
    strMSKH = strMSKH.trim();

    var ngayDKNV = document.getElementById("ngayDuKienNhanVe").value;
    var gioDKNV = document.getElementById("txtGio").value;
    var phutDKNV = document.getElementById("txtPhut").value;

    ngayDKNV = ngayDKNV + " " + gioDKNV + ":" + phutDKNV;
//    alert(ngayDKNV);

    if (strMSKH.localeCompare("") === 0 || strMSKH.localeCompare("-") === 0) {
        funLuuKH();
        pubIDVe = strIDVe;
    } else {
        $.ajax({
            type: "POST",
            url: "myFunction/funChiTietDangKy.jsp",
            data: {
                "msKH": strMSKH,
                "idVe": strIDVe,
                "ngayDKNV": ngayDKNV,
                "caseName": "dangky"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result.localeCompare("0") === 0) { //Successfull                            
                    danhSachChiTietDangKy(strMSKH);
                } else { //Error
                    alert("Thông báo kết quả: \n\n\t Error." + result);
                }
            }
        });
    }
}

function isErrorKhachHang() {
    var isError = false;
    var hoTen = "";
    hoTen = document.getElementById("hoTen").value;
    hoTen = hoTen.trim();
    var eMail = "";
    eMail = document.getElementById("eMail").value;
    eMail = eMail.trim();
    var dienThoai = "";
    dienThoai = document.getElementById("dienThoai").value;
    dienThoai = dienThoai.trim();
    var soCMND = "";
    soCMND = document.getElementById("soCMND").value;
    soCMND = soCMND.trim();
    if (hoTen.localeCompare("") === 0) {
        alert("Thông tin bắt buộc: \n\t Tên người đặt vé không được để trống.  \n\n\ Chú ý: \n\t Vui lòng nhập tên người đặt vé trước khi chọn vé.");
        setFocusText("hoTen");
        isError = true;
    } else if (eMail.localeCompare("") === 0) {
        alert("Thông tin bắt buộc: \n\t Địa chỉ Email không được để trống. \n\n\ Chú ý: \n\t Vui lòng nhập địa chỉ Email trước khi chọn vé, thông tin đặt vé được gởi đến địa chỉ Email khi đăng ký thành công.");
        setFocusText("eMail");
        isError = true;
    } else if (isNotNumber(dienThoai)) {
        alert("Thông tin bắt buộc: \n\t Số điện thoại phải là số nguyên dương và không được để trống. \n\n\ Chú ý: \n\t Vui lòng nhập số điện thoại trước khi chọn vé, Hệ thống xác nhận thông tin đặt vé thông qua số điện thoại đăng ký.");
        setFocusText("dienThoai");
        isError = true;
    }
    else if (isNotNumber(soCMND) && soCMND.localeCompare("") !== 0) {
        alert("Chú ý: \n\t - Số Chứng minh Nhân dân phải là số nguyên dương hoặc để trống. \n\t - Vui lòng nhập đúng Số Chứng minh Nhân dân hoặc để trống trước khi chọn vé.");
        setFocusText("soCMND");
        isError = true;
    }

    var isXuatHD = document.getElementById("chkXuatHoaDon").checked;
    if (isXuatHD) {
        var maSoThue = "";
        maSoThue = document.getElementById("maSoThue").value;
        var tenCongTy = "";
        tenCongTy = document.getElementById("tenCongTy").value;
        var hdDiaChi = "";
        hdDiaChi = document.getElementById("hdDiaChi").value;
//        var hdGhiChu = "";
//        hdGhiChu = document.getElementById("hdGhiChu").value;

        if (maSoThue.localeCompare("") === 0) {
            alert("Thông tin bắt buộc: \n\t Mã số thuế phải là số nguyên dương và không được để trống.  \n\n\ Chú ý: \n\t Vui lòng nhập Mã số thuế trước khi chọn vé.");
            setFocusText("maSoThue");
            isError = true;
        }
        else if (tenCongTy.localeCompare("") === 0) {
            alert("Thông tin bắt buộc: \n\t Tên công ty không được để trống.  \n\n\ Chú ý: \n\t Vui lòng nhập Tên công ty trước khi chọn vé.");
            setFocusText("tenCongTy");
            isError = true;
        }
        else if (hdDiaChi.localeCompare("") === 0) {
            alert("Thông tin bắt buộc: \n\t Địa chỉ trong hóa đơn không được để trống.  \n\n\ Chú ý: \n\t Vui lòng nhập Địa chỉ trong hóa đơn trước khi chọn vé.");
            setFocusText("hdDiaChi");
            isError = true;
        }
    }

    return isError;
}

function danhSachVe() {
    var url = "myFunction/funChiTietDangKy.jsp?caseName=danhSachVe";
    var res = "";
    var res = show_data(url);
//     alert(res);
    var divMenuTicket = "";
    divMenuTicket = res.trim();
//    divMenuTicket = divMenuTicket + res.trim();
//    divMenuTicket = divMenuTicket + document.getElementById("divMenuTicket").innerHTML;

    document.getElementById("divMenuTicket").innerHTML = divMenuTicket;
}

function resetKhachHang() {
    pubMSKH = "-";
    document.getElementById("lblMSKH").innerHTML = "-";
    document.getElementById("hoTen").value = "";
    document.getElementById("diaChi").value = "";
    document.getElementById("soCMND").value = "";
    document.getElementById("dienThoai").value = "";
    document.getElementById("eMail").value = "";
    getCurrentDateTime("ngayDuKienNhanVe", "txtGio", "txtPhut");

    document.getElementById("chkXuatHoaDon").checked = false;
    showXuatHoaDon();

    setTab("tabKH");
}

function isNotNumber(varNumber) {
    //isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}

//Drop and Drap
function funDropAndDrap() {
    var theRoot = document.getElementById("dialog_Calendar");
    Drag.init(theRoot);
}

function getCurrentDateTime(varDate, varHour, varMinute) {
    var url = "myFunction/funGetCurrentDateTime.jsp?caseName=getCurrentDateTime";
    var res = "null";
    res = show_data(url); //Format "dd/M/yyyy H:m:s"
//      //Test
//      alert(res.trim());
//      return;

    var strResult = res.split("<sos>");
//    //Test
//    alert(res.trim() + " " + strResult[0] + " " + strResult[1] + " " + strResult[2] + " " + strResult[3]);
//    return;

    document.getElementById(varDate).value = strResult[0]; //"dd/M/yyyy"
    if (varHour !== null && varHour !== "")
        document.getElementById(varHour).value = strResult[1]; //"H"
    if (varMinute !== null && varMinute !== "")
        document.getElementById(varMinute).value = strResult[2]; //"m"
}

function showDate(ev, txtName) {
    document.getElementById(txtName).disabled = false;
    document.getElementById(txtName).focus();
    var x = 0;
    x = ev.clientX; //<-> s.style.left

    var y = 0;
    y = ev.clientY; //<-> s.style.top

    //alert("X coords: " + ev.clientX + ", Y coords: " + ev.clientY + "\n\n" + "X coords: " + x + ", Y coords: " + y + ", txtName: " + txtName);
    var s = document.getElementById("dialog_Calendar");
    s.style.left = x + "px";
    s.style.top = y + "px";
    $(".mopCalendar").mopCalendar(txtName);
    showDiaLog();
}

function hiddenDiaLog() {
    document.getElementById("dialog_Calendar").style.display = "none";
}

function showDiaLog() {
    hiddenDiaLog();
    document.getElementById("dialog_Calendar").style.display = "block";
}

function danhSachChiTietDangKy(msKH) {
    var url = "myFunction/funChiTietDangKy.jsp?caseName=danhmuc&msKH=" + msKH;
    var res = show_data(url);
    // alert(res);
    document.getElementById("dsChiTietDangKyVe").innerHTML = res;
}

function getScrollXY(event, divName) {
//    alert("pageX: " + event.pageX + " pageY: " + event.pageY + " screen.width * screen.height");
//    alert("popW: " + popW + " screen.width: " + screen.width + " screen.width - popW : " + (screen.width - popW) + " Left : " + varLeft + " Top : " + varTop);

    var s = document.getElementById(divName);
    var x = "0";
    x = s.style.width.toString();
    x = x.replace("px", "");

    var varLeft = screen.width / 2 - parseInt(x) / 2; //    alert("screen.width: " + screen.width + " x: " + x + " varLeft: " + varLeft);
    if (varLeft < 0)
        varLeft = 50;
    s.style.left = varLeft + "px";

    var y = "0";
    y = event.pageY + 25;
    s.style.top = y + "px";
}

function funHuyDK() {
    var msKH = "";
    msKH = document.getElementById("lblMSKH").innerHTML;
    msKH = msKH.trim();
    if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
        resetKhachHang();
        return;
    }
    else {
        if (confirm("Xác nhận yêu cầu : \n\n\t Quý khách thật sự muốn hủy thông tin đặt vé với nội dung đã nhập có mã ''" + msKH + "'' ?"))
        {
            $.ajax({
                type: "POST",
                url: "myFunction/funChiTietDangKy.jsp",
                data: {
                    "msKH": msKH,
                    "caseName": "HuyDatVe"},
                success: function (data) {
                    var result = "";
                    result = data.trim();
                    if (isNotNumber(result)) {  //Error                         
                        alert("Thông báo kết quả: \n\n\t " + result);
                    } else { //Successfull 
                        //alert(valueName);
                        resetKhachHang();
                        document.getElementById("dsChiTietDangKyVe").innerHTML = null;
                    }
                }
            });
        }
    }
}

function resetXNTT() {
    document.getElementById("smsMSKH_XNTT").innerHTML = "-";
    document.getElementById("smsHoTen_XNTT").innerHTML = "-";
    document.getElementById("smsSoCMND_XNTT").innerHTML = "-";
    document.getElementById("smsDiaChi_XNTT").innerHTML = "-";
    document.getElementById("smsEmail_XNTT").innerHTML = "-";
    document.getElementById("smsDienThoai_XNTT").innerHTML = "-";
    document.getElementById("smsNgayDuKienNhanVe_XNTT").innerHTML = "-";
    
    // Xuất hóa đơn
    document.getElementById("smsMaSoThue_XNTT").innerHTML = "-";
    document.getElementById("smsTenCongTy_XNTT").innerHTML = "-";
    document.getElementById("smsHDDiaChi_XNTT").innerHTML = "-";
    document.getElementById("smsHDGhiChu_XNTT").innerHTML = "-";
}

function noiDungXNTT(varMSKH) {
    var msKH = "KH1499142531061";
    msKH = varMSKH.toString();
    msKH = msKH.trim();
    if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
        return;
    }

    var url = "myFunction/funChiTietDangKy.jsp?caseName=thongTinDangKyTrucTuyen&msKH=" + msKH;
    var res = "";
    res = show_data(url);
//    alert(res);
    var strResult = res.split("<sos>");

    document.getElementById("smsMSKH_XNTT").innerHTML = strResult[0];
    document.getElementById("smsHoTen_XNTT").innerHTML = strResult[1];
    document.getElementById("smsSoCMND_XNTT").innerHTML = strResult[2];
    document.getElementById("smsDiaChi_XNTT").innerHTML = strResult[3];
    document.getElementById("smsEmail_XNTT").innerHTML = strResult[4];
    document.getElementById("smsDienThoai_XNTT").innerHTML = strResult[5];
    document.getElementById("smsNgayDuKienNhanVe_XNTT").innerHTML = strResult[6];

    // Xuất hóa đơn
    document.getElementById("smsMaSoThue_XNTT").innerHTML = strResult[17];
    document.getElementById("smsTenCongTy_XNTT").innerHTML = strResult[18];
    document.getElementById("smsHDDiaChi_XNTT").innerHTML = strResult[19];
    document.getElementById("smsHDGhiChu_XNTT").innerHTML = strResult[20];
    
    danhSachChiTietDangKyXNTT(msKH);
}

function danhSachChiTietDangKyXNTT(msKH) {
    var url = "myFunction/funChiTietDangKy.jsp?caseName=danhmucXNTT&msKH=" + msKH;
    var res = show_data(url);
    // alert(res);
    document.getElementById("dsChiTietDangKyVeXNTT").innerHTML = res;
}

function resetEmailXNTT() {
    document.getElementById("emailMSKH").innerHTML = "-";
    document.getElementById("emailHoTen").innerHTML = "-";
    document.getElementById("emailSoCMND").innerHTML = "-";
    document.getElementById("emailDiaChi").innerHTML = "-";
    document.getElementById("emailEmail").innerHTML = "-";
    document.getElementById("emailDienThoai").innerHTML = "-";
    document.getElementById("emailNgayDuKienNhanVe").innerHTML = "-";
    
    document.getElementById("emailMaSoThue").innerHTML = "-";
    document.getElementById("emailTenCongTy").innerHTML = "-";
    document.getElementById("emailHDDiaChi").innerHTML = "-";
    document.getElementById("emailHDGhiChu").innerHTML = "-";    
}

function noiDungEmailXNTT(varMSKH) {
    var msKH = "KH1499142531061";
    msKH = varMSKH.toString();
    msKH = msKH.trim();
    if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
        return;
    }

    var url = "myFunction/funChiTietDangKy.jsp?caseName=thongTinDangKyTrucTuyen&msKH=" + msKH;
    var res = "";
    res = show_data(url);
//    alert(res);   
    var strResult = res.split("<sos>");

    resetEmailXNTT();
    document.getElementById("emailMSKH").innerHTML = strResult[0];
    document.getElementById("emailHoTen").innerHTML = strResult[1];
    document.getElementById("emailSoCMND").innerHTML = strResult[2];
    document.getElementById("emailDiaChi").innerHTML = strResult[3];
    document.getElementById("emailEmail").innerHTML = strResult[4];
    document.getElementById("emailDienThoai").innerHTML = strResult[5];
    document.getElementById("emailNgayDuKienNhanVe").innerHTML = strResult[6];
    
    document.getElementById("emailMaSoThue").innerHTML = strResult[17];
    document.getElementById("emailTenCongTy").innerHTML = strResult[18];
    document.getElementById("emailHDDiaChi").innerHTML = strResult[19];
    document.getElementById("emailHDGhiChu").innerHTML = strResult[20];   

    emailDSChiTietDangKyXNTT(msKH);
}

function emailDSChiTietDangKyXNTT(msKH) {
    var url = "myFunction/funChiTietDangKy.jsp?caseName=danhmucXNTT&msKH=" + msKH;
    var res = show_data(url);
    // alert(res);
    document.getElementById("dsEmailChiTietDangKyVeXNTT").innerHTML = res;
}

function tangSoLuongVe(idCT) {
//        alert("TangSoLuongVe: "+ idCT);
//        return;

    var strIDCT = "";
    strIDCT = idCT.toString();
    strIDCT = strIDCT.trim();
    if (strIDCT.localeCompare("") === 0 || strIDCT === null)
        return;

    $.ajax({
        type: "POST",
        url: "myFunction/funChiTietDangKy.jsp",
        data: {
            "idCT": strIDCT,
            "caseName": "tangSoLuongVe"},
        success: function (data) {
            var result = "";
            result = data.trim();
            if (isNotNumber(result)) { //Error
                alert("Thông báo kết quả: \n\n\t " + result);
            } else { //Successfull
                danhSachChiTietDangKy(pubMSKH);
            }
        }
    });

}

function giamSoLuongVe(idCT) {
//        alert("GiamSoLuongVe: "+ idCT);
//        return;

    var strIDCT = "";
    strIDCT = idCT.toString();
    strIDCT = strIDCT.trim();
    if (strIDCT.localeCompare("") === 0 || strIDCT === null)
        return;

    $.ajax({
        type: "POST",
        url: "myFunction/funChiTietDangKy.jsp",
        data: {
            "idCT": strIDCT,
            "caseName": "giamSoLuongVe"},
        success: function (data) {
            var result = "";
            result = data.trim();
            if (isNotNumber(result)) { //Error
                alert("Thông báo kết quả: \n\n\t " + result);
            } else { //Successfull
                danhSachChiTietDangKy(pubMSKH);
            }
        }
    });
}

function resetXuatHoaDon() {
    document.getElementById("maSoThue").value = "";
    document.getElementById("tenCongTy").value = "";
    document.getElementById("hdDiaChi").value = "";
    document.getElementById("hdGhiChu").value = "";
}

function showXuatHoaDon() {
    var chkXHD = document.getElementById("chkXuatHoaDon").checked;
    if (chkXHD) {
        document.getElementById("tdXHD").innerHTML =
                "<table style='background:#FCFAF9; width: 100%; height: auto; border: 1px solid #C9C9C9; border-radius: 0.2em; padding: 7px' border='0'> "
                + "        <col width='120px'> "
                + "        <col width='auto'> "
                + "        <tr> "
                + "            <td> - Mã số thuế: <label style='color:darkred; font-weight: bold; font-size: 15px' title='Thông tin bắt buộc'>*</label> </td> "
                + "            <td>  "
                + "                <textarea id='maSoThue' class='txtInput' style='width: 100%; height: 30px; color: darkblue; font-size:13px' placeholder='Nhập mã số thuế' title='Mã số thuế' maxlength='13' onkeyup='ChiNhapSo(this);'></textarea> "
                + "            </td> "
                + "        </tr> "
                + "        <tr> "
                + "            <td> - Tên công ty: <label style='color:darkred; font-weight: bold; font-size: 15px' title='Thông tin bắt buộc'>*</label> </td> "
                + "            <td>  "
                + "                <textarea id='tenCongTy' class='txtInput' style='width: 100%; height: 30px; color: darkblue; font-size:13px' placeholder='Nhập tên công ty' title='Tên công ty' ></textarea> "
                + "            </td> "
                + "        </tr> "
                + "        <tr> "
                + "            <td> - Địa chỉ: <label style='color:darkred; font-weight: bold; font-size: 15px' title='Thông tin bắt buộc'>*</label> </td> "
                + "            <td>  "
                + "                <textarea id='hdDiaChi' class='txtInput' style='width: 100%; height: 45px; color: darkblue; font-size:13px; vertical-align: bottom' placeholder='Nhập địa chỉ' title='Địa chỉ' ></textarea> "
                + "            </td> "
                + "        </tr> "
                + "        <tr> "
                + "            <td> - Ghi chú: </td> "
                + "            <td>  "
                + "                <textarea id='hdGhiChu' class='txtInput' style='width: 100%; height: 30px; color: darkblue; font-size:13px; vertical-align: bottom' placeholder='Nhập ghi chú' title='Ghi chú' ></textarea> "
                + "            </td> "
                + "        </tr> "
                + "</table> ";
        resetXuatHoaDon();
    }
    else {
//        resetXuatHoaDon();
        document.getElementById("tdXHD").innerHTML = "";
    }
}
