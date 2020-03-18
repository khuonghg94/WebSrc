/* 
 Document   : jsBienNhan
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

function goHome() {
    window.location.replace("FrmMain2017.jsp");
}

//Drop and Drap
function funDropAndDrap() {
    var theRoot = document.getElementById("dialog_Calendar");
    Drag.init(theRoot);
//    var theHandlePQ = document.getElementById("headerPhanQuyen");
//    var theRootPQ = document.getElementById("divPhanQuyen");
//    Drag.init(theHandlePQ, theRootPQ);
//    var theHandleEmail = document.getElementById("headerEmail");
//    var theRootEmail = document.getElementById("divEmail");
//    Drag.init(theHandleEmail, theRootEmail);
}

function getCurrentDateTime(varDate, varHour, varMinute) {
    var url = "myFunction/funGetCurrentDateTime.jsp?caseName=getCurrentDateTime";
    var res = "null";
    res = show_data(url); //Format "dd/M/yyyy H:m:s"
    res = res.trim();
//      //Test
//      alert(res.trim());
//      return;

    var strResult = "";
    strResult = res.split("<sos>");
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

function hiddenDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "true");
    $("#divMyDialog").addClass("hidden");
}

function showDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "false");
    $("#divMyDialog").removeClass("hidden");
}

function getScrollXY(event, divName) {
//    alert("pageX: " + event.pageX + " pageY: " + event.pageY + " screen.width * screen.height");
//    alert("popW: " + popW + " screen.width: " + screen.width + " screen.width - popW : " + (screen.width - popW) + " Left : " + varLeft + " Top : " + varTop);

    var s = document.getElementById(divName);
    var x = "0";
    x = s.style.width.toString();
    x = x.replace("px", "");
    var varLeft = screen.width / 2 - parseInt(x) / 2; //    alert("screen.width: " + screen.width + "x: " + x + " varLeft: " + varLeft);
    if (varLeft < 0)
        varLeft = 50;
    s.style.left = varLeft + "px";
    var y = "0";
    y = event.pageY + 25;
    s.style.top = y + "px";
}



function getNgayLapPhieuNV() {
    var isDisable = document.getElementById("chkNgayDKNV").checked;
    var pubDisplay = "hidden";
    document.getElementById("tuNgayDKNV").value = "01/01/1990";
    document.getElementById("denNgayDKNV").value = "01/01/1990";
    if (isDisable) {
        pubDisplay = "visible";
        getCurrentDateTime("tuNgayDKNV", null, null);
        getCurrentDateTime("denNgayDKNV", null, null);
        isDisable = false;
    } else
        isDisable = true;
    document.getElementById("tuNgayDKNV").disabled = isDisable;
    document.getElementById("denNgayDKNV").disabled = isDisable;
    document.getElementById("picTuNgayDKNV").style.visibility = pubDisplay;
    document.getElementById("picDenNgayDKNV").style.visibility = pubDisplay;
}

function disCboBienNhan() {
    document.getElementById("chkDeNghi").disabled = true;
    document.getElementById("chkDaThu").disabled = true;
}

function cboBienNhan() {
    disCboBienNhan();

    var nameTab = "";
    nameTab = $("#cboBienNhan option:selected").attr("id");
    switch (nameTab)
    {
        case "lik1": // <-> Biên nhận mới lập
            document.getElementById("chkDeNghi").disabled = false;
            break
        case "lik2": // <-> Duyệt đề nghị
            document.getElementById("chkDeNghi").disabled = false;
            document.getElementById("chkDaThu").disabled = false;
            break
        case "lik3": //<-> Xác nhận tài chính
            document.getElementById("chkDaThu").disabled = false;
            break
    }

    timBienNhan();
}

function resetTimBienNhan() {
    document.getElementById("cboBienNhan").selectedIndex = 0;
    document.getElementById("chkNgayLapTim").checked = true;
    getNgayLapPhieu();
    timBienNhan();
}

function timBienNhan() {
    var nameTab = "";
    nameTab = $("#cboBienNhan option:selected").attr("id");
    //alert(nameTab);

    var tuNgayLap = "1/1/1990", denNgayLap = "1/1/1990";
    var chkNgayDK = document.getElementById("chkNgayLapTim").checked;
    if (chkNgayDK) {
        tuNgayLap = document.getElementById("tuNgayLapTim").value;
        if (!isValidDate(tuNgayLap, "Từ ngày lập")) {
            setFocusText("tuNgayLapTim");
            return;
        }
        denNgayLap = document.getElementById("denNgayLapTim").value;
        if (!isValidDate(denNgayLap, "Đến ngày lập")) {
            setFocusText("denNgayLapTim");
            return;
        }
    }

//    alert(nameTab + " " + tuNgayLap + " " + denNgayLap);
    var url = "myFunction/funBienNhan.jsp?caseName=dsBienNhan"
            + "&nameTab=" + nameTab
            + "&tuNgayLap=" + tuNgayLap
            + "&denNgayLap=" + denNgayLap;

    var res = "";
    res = show_data(url); //alert(res);
    res = res.trim();
    if (res.length === 0)
        document.getElementById("dsDanhSach").innerHTML = "";
    else
        document.getElementById("dsDanhSach").innerHTML = res;
}

function loadDSDangKyMuaVeTrucTuyen(nameTab) {
    //alert(nameTab); 
    if (nameTab === "" || nameTab === null) {
        nameTab = $("#cboBienNhan option:selected").attr("id");
        nameTab = nameTab.toLowerCase();
    }

    //alert(nameTab);
    var idLink = "";
    switch (nameTab)
    {
        case "lik1": // <-> Đăng ký mua vé trực tuyến
            idLink = "1";
            break
        case "lik2": // <-> Đã xác nhận thông tin
            idLink = "2";
            break
        case "lik3": //<-> Đã hoàn thành tài chính
            idLink = "3";
            break
        case "lik4": //<-> Đã gởi vé tạm thời khách hàng
            idLink = "4";
            break
    }
    //alert(idLink);
    if (idLink === null)
        return;
    var url = "myFunction/funChiTietDangKy.jsp?caseName=menuDK&idLink=" + idLink;
    var res = "";
    res = show_data(url); //alert(res);
    res = res.trim();
    if (res.length === 0)
        document.getElementById("tbDanhSach").innerHTML = null;
    else
        document.getElementById("tbDanhSach").innerHTML = res;
}

function resetNguoiDangKy() {
    document.getElementById("smsMSKH_XNTT").innerHTML = "-";
    document.getElementById("smsHoTen_XNTT").innerHTML = "-";
    document.getElementById("smsSoCMND_XNTT").innerHTML = "-";
    document.getElementById("smsDiaChi_XNTT").innerHTML = "-";
    document.getElementById("smsEmail_XNTT").innerHTML = "-";
    document.getElementById("smsDienThoai_XNTT").innerHTML = "-";
    document.getElementById("smsNgayDuKienNhanVe_XNTT").innerHTML = "-";

    document.getElementById("smsMaSoThue_XNTT").innerHTML = "-";
    document.getElementById("smsTenCongTy_XNTT").innerHTML = "-";
    document.getElementById("smsHDDiaChi_XNTT").innerHTML = "-";
    document.getElementById("smsHDGhiChu_XNTT").innerHTML = "-";
}

function noiDungDangKy(idLan, varMSKH) {
//    alert(idLan + " " + msKH);

    pubIDLan = idLan;
    resetNguoiDangKy();

    var msKH = "";
    msKH = varMSKH;
    msKH = varMSKH.toString();
    msKH = msKH.trim();
    if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t Không xác định được Mã số khách hàng");
        return;
    }
    else {
        var url = "myFunction/funChiTietDangKy.jsp?caseName=thongTinDangKyTrucTuyen&msKH=" + msKH;
        var res = "";
        res = show_data(url); // alert(res);
        var strResult = res.split("<sos>");
        document.getElementById("smsMSKH_XNTT").innerHTML = strResult[0];
        document.getElementById("smsHoTen_XNTT").innerHTML = strResult[1];
        document.getElementById("smsSoCMND_XNTT").innerHTML = strResult[2];
        document.getElementById("smsDiaChi_XNTT").innerHTML = strResult[3];
        document.getElementById("smsEmail_XNTT").innerHTML = strResult[4];
        document.getElementById("smsDienThoai_XNTT").innerHTML = strResult[5];
        document.getElementById("smsNgayDuKienNhanVe_XNTT").innerHTML = strResult[6];

        document.getElementById("smsMaSoThue_XNTT").innerHTML = strResult[17];
        document.getElementById("smsTenCongTy_XNTT").innerHTML = strResult[18];
        document.getElementById("smsHDDiaChi_XNTT").innerHTML = strResult[19];
        document.getElementById("smsHDGhiChu_XNTT").innerHTML = strResult[20];


        document.getElementById("lblNVChapNhan").innerHTML = strResult[10];
        document.getElementById("chkDaXacNhan").checked = JSON.parse(strResult[8]);
        document.getElementById("lblNVTaiChinh").innerHTML = strResult[13];
        document.getElementById("chkDaThanhToan").checked = JSON.parse(strResult[11]);
        document.getElementById("lblNVDaGoi").innerHTML = strResult[16];
        document.getElementById("chkDaGoiVe").checked = JSON.parse(strResult[14]);
        danhSachChiTietDangKy(msKH);
    }
}

function danhSachChiTietDangKy(msKH) {
    var url = "myFunction/funChiTietDangKy.jsp?caseName=danhmucXNTT&msKH=" + msKH;
    var res = show_data(url); // alert(res);
    document.getElementById("dsChiTietDangKyVe").innerHTML = res;
//    hiddenColDSChiTietDangKy("tbChiTietDangKyVe");
}


function resetQuyenXacNhan() {
    document.getElementById("lblNVChapNhan").innerHTML = "-";
    document.getElementById("lblNVDaGoi").innerHTML = "-";
    document.getElementById("lblNVTaiChinh").innerHTML = "-";
    document.getElementById("chkDaXacNhan").disabled = true;
    document.getElementById("chkDaXacNhan").checked = false;
    document.getElementById("chkDaGoiVe").disabled = true;
    document.getElementById("chkDaGoiVe").checked = false;
    document.getElementById("chkDaThanhToan").disabled = true;
    document.getElementById("chkDaThanhToan").checked = false;
    isAdmin = false;
}

var pubMaNV = "-", pubHoTenNV = "-", pubTenKhoa = "-", pubMaKhoa = "-", pubUserName = "-", pubIDLan = "0.0";
var isAdmin = false;
function quyenXNDangKyVeOnline(varUserName) {
//    //Test
//    alert(varUserName);   
    document.getElementById("picPhanQuyen").style.display = "none";
    document.getElementById("picThongKe").style.display = "none";
    document.getElementById("picOutExcel").style.display = "none";
    document.getElementById("picInExcel").style.display = "none";
    document.getElementById("picSaveExcel").style.display = "none";

    pubUserName = varUserName;
    resetQuyenXacNhan();
    var url = "myFunction/funChiTietDangKy.jsp?caseName=quyenXNDangKyVeOnline&userName=" + varUserName;
    var result = "";
    result = show_data(url);
//    //Test
//    alert(result);

    var listFrom = " ";
    listFrom = result.trim();
    listFrom = listFrom.split("<s>");
//    //Test
//    alert("listFrom.length : " + listFrom.length);

    if (listFrom.length > 1) {
        var cnTemp = " ";
//        if (listFrom.length >= 3) {
//        //    //Test
//        //    alert(listFrom[0] + " " + listFrom[1] + " " + listFrom.length);
//            alert("Thông báo cấp quá nhiều quyền chức năng:"
//                    + "\n\t - Bạn được cấp nhiều hơn một trong các quyền sau:"
//                    + "\n\t\t + ''XN thông tin Khách hàng và nội dung đặt vé''"
//                    + "\n\t\t + ''XN Khách hàng đã hoàn thành tài chính''"
//                    + "\n\t\t + ''XN gởi thông tin vé tạm thời đến Khách hàng''"
//                    + "\n\t\t + ''Quản trị quản lý xác nhận đăng ký mua vé trực tuyến (Admin)''"
//                    + "\n\n\t - Lưu ý: Người dùng chỉ được cấp một trong các quyền trên.");
//            goHome();
//        } else {            
        if (listFrom.length >= 4) { //|| pubMaNV.localeCompare("1") === 0 //Admin
            isAdmin = true;

            document.getElementById("lblNVChapNhan").innerHTML = pubHoTenNV;
            document.getElementById("lblNVDaGoi").innerHTML = pubHoTenNV;
            document.getElementById("lblNVTaiChinh").innerHTML = pubHoTenNV;

            document.getElementById("picPhanQuyen").style.display = "inline-block";
            document.getElementById("picOutExcel").style.display = "inline-block";
            document.getElementById("picInExcel").style.display = "inline-block";
            document.getElementById("picSaveExcel").style.display = "inline-block";

            document.getElementById("chkDaXacNhan").disabled = false;
            document.getElementById("chkDaGoiVe").disabled = false;
            document.getElementById("chkDaThanhToan").disabled = false;
        } else {
            var varOption = "";
            for (var i = 0; i < listFrom.length - 1; i++) {
                //alert(listFrom[0] + " " + listFrom[1] + " " + listFrom.length);
                cnTemp = listFrom[i].toString();
                cnTemp = cnTemp.trim().toLowerCase();
//                    //Test
//                    alert(cnTemp);
                switch (cnTemp) {
                    case "onlinexacnhanthongtin":
                        document.getElementById("lblNVChapNhan").innerHTML = pubHoTenNV;
                        document.getElementById("chkDaXacNhan").disabled = false;
                        varOption = "<option id='lik1' value='lik1' style='font-weight:bold; color: darkred'>Đăng ký mua vé trực tuyến</option>"
                                + "<option id='lik2' value='lik2' style='font-weight:bold; color: darkred'>Đã xác nhận thông tin</option>";
                        break;
                    case "onlinexacnhantaichinh":
                        document.getElementById("picOutExcel").style.display = "inline-block";
                        document.getElementById("picInExcel").style.display = "inline-block";
                        document.getElementById("picSaveExcel").style.display = "inline-block";

                        document.getElementById("lblNVTaiChinh").innerHTML = pubHoTenNV;
                        document.getElementById("chkDaThanhToan").disabled = false;
                        varOption = "<option id='lik2' value='lik2' style='font-weight:bold; color: darkred'>Đã xác nhận thông tin</option>"
                                + "<option id='lik3' value='lik3' style='font-weight:bold; color: darkred'>Đã hoàn thành tài chính</option>";
                        break;
                    case "onlinexacnhangoivetam":
                        document.getElementById("lblNVDaGoi").innerHTML = pubHoTenNV;
                        document.getElementById("chkDaGoiVe").disabled = false;
                        varOption = "<option id='lik3' value='lik3' style='font-weight:bold; color: darkred'>Đã hoàn thành tài chính</option>"
                                + "<option id='lik4' value='lik4' style='font-weight:bold; color: darkred'>Đã gởi vé tạm thời khách hàng</option>";
                        break;
                    case "onlineadminitrastor":
                        isAdmin = true;

                        document.getElementById("picPhanQuyen").style.display = "inline-block";
                        document.getElementById("picOutExcel").style.display = "inline-block";
                        document.getElementById("picInExcel").style.display = "inline-block";
                        document.getElementById("picSaveExcel").style.display = "inline-block";

                        document.getElementById("lblNVChapNhan").innerHTML = pubHoTenNV;
                        document.getElementById("lblNVDaGoi").innerHTML = pubHoTenNV;
                        document.getElementById("lblNVTaiChinh").innerHTML = pubHoTenNV;

                        document.getElementById("chkDaXacNhan").disabled = false;
                        document.getElementById("chkDaGoiVe").disabled = false;
                        document.getElementById("chkDaThanhToan").disabled = false;
                        varOption = "<option id='lik1' value='lik1' style='font-weight:bold; color: darkred'>Đăng ký mua vé trực tuyến</option>"
                                + "<option id='lik2' value='lik2' style='font-weight:bold; color: darkred'>Đã xác nhận thông tin</option>"
                                + "<option id='lik3' value='lik3' style='font-weight:bold; color: darkred'>Đã hoàn thành tài chính</option>"
                                + "<option id='lik4' value='lik4' style='font-weight:bold; color: darkred'>Đã gởi vé tạm thời khách hàng</option>";
                        break;
                }
            }

            document.getElementById("cboBienNhan").innerHTML = varOption;
        }

        funDropAndDrap();
        resetTimBienNhan();
//        }
    } else {
        alert("Thông báo chưa cấp quyền chức năng:"
                + "\n\t Bạn chưa được cấp một trong các quyền sau:"
                + "\n\t\t + ''Xác nhận KH và nội dung đặt vé''"
                + "\n\t\t + ''Xác nhận KH hoàn thành tài chính''"
                + "\n\t\t + ''Xác nhận gởi vé tạm thời''"
                + "\n\t\t + ''Quản trị xác nhận đăng ký mua vé trực tuyến (Admin)''"

                + "\n\n\t Lưu ý:"
                + "\n\t\t - Khi kiểm tra danh sách quyền trong CSDL không thấy tên chức năng:"
                + "\n\t\t       + ''Xác nhận KH và nội dung đặt vé''"
                + "\n\t\t       + ''Xác nhận KH hoàn thành tài chính''"
                + "\n\t\t       + ''Xác nhận gởi vé tạm thời''"
                + "\n\t\t       + ''Quản trị xác nhận đăng ký mua vé trực tuyến''"
                + "\n\n\t\t - Vùi lòng thêm chức năng mới như sau:"
                + "\n\t\t       + ''Xác nhận KH và nội dung đặt vé'' <+> Form:''onlineXacNhanThongTin''"
                + "\n\t\t       + ''Xác nhận KH hoàn thành tài chính'' <+> Form:''onlineXacNhanTaiChinh''"
                + "\n\t\t       + ''Xác nhận gởi vé tạm thời'' <+> Form:''onlineXacNhanGoiVeTam''"
                + "\n\t\t       + ''Quản trị xác nhận đăng ký mua vé trực tuyến'' <+> Form:''onlineAdminitrastor''");
        goHome();
    }
}

function resetTimThongNhanVien() {
    document.getElementById("selectNV").value = "-1";
    document.getElementById("findMaNV").value = "";
    document.getElementById("findHoTenNV").value = "";
    document.getElementById("dsDanhSachNhanVien").innerHTML = "";
}

function showTimKiemNhanVien() {
    var varStyle = "";
    varStyle = document.getElementById("tdTimNhanVien").style.display;
//    alert(varStyle);

    resetTimThongNhanVien();
    if (varStyle.localeCompare("table-cell") === 0)
        document.getElementById("tdTimNhanVien").style.display = "none";
    else
        document.getElementById("tdTimNhanVien").style.display = "table-cell";
}

// Phân quyền
function hiddenDiaLog_PhanQuyen() {
    document.getElementById("divPhanQuyen").style.display = "none";
    hiddenDialogModal();
}

function showDiaLog_PhangQuyen(event) {
    var varStylePQ = "";
    varStylePQ = document.getElementById("divPhanQuyen").style.display;
    hiddenDiaLog_PhanQuyen();
    if (varStylePQ.localeCompare("none") === 0) {
        showDialogModal();
        document.getElementById("divPhanQuyen").style.display = "block";
        resetThongNhanVien();
        document.getElementById("pqHoTen_MaVN").innerHTML = pubHoTenNV + " (" + pubMaNV + ")   ||  Tài khoản: " + pubUserName;
        document.getElementById("pqDonVi").innerHTML = pubTenKhoa;
        listQuyenXacNhanChuaCap(pubUserName);
        listQuyenXacNhanDaCap(pubUserName);
        getScrollXY(event, "divPhanQuyen");
        loadDonVi();
    }
}

function resetThongNhanVien() {
    document.getElementById("pqHoTen_MaVN").innerHTML = "-";
    document.getElementById("pqDonVi").innerHTML = "-";
}

function loadDonVi() {
    var url = "myFunction/funDonVi.jsp?caseName=danhMuc";
    var res = "null";
    res = show_data(url); //alert(res);
    document.getElementById("selectNV").innerHTML = res;
}

function timThongNhanVien() {
    var maDV = document.getElementById("selectNV").value;
    var maNV = "";
    maNV = document.getElementById("findMaNV").value.toString();
    maNV = maNV.trim();
    if (maNV.localeCompare("") === 0)
        maNV = "sol";
    var tenNV = "";
    tenNV = document.getElementById("findHoTenNV").value.toString();
    tenNV = tenNV.trim();
    if (tenNV.localeCompare("") === 0)
        tenNV = "sol";
//    alert(donVi +" "+ maNV +" "+ tenNV);

    var url = "myFunction/funThongTinTrucTuyen.jsp?caseName=danhSachChonNhanVien"
            + "&maDV=" + maDV
            + "&maNV=" + maNV
            + "&tenNV=" + tenNV;
    var res = "null";
    res = show_data(url);
    document.getElementById("dsDanhSachNhanVien").innerHTML = res;
    hiddenColTable("tbDanhSachNhanVien", 3);
}

function hiddenColTable(idTable, listColumns) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[listColumns].style.display = 'none';
    }
}

function xemQuyenNhanVien() {
    var maNV = "", tenNV = "", tenDV = "", userName = "";
    resetThongNhanVien();
    var table = document.getElementById('tbDanhSachNhanVien').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 4) {

                userName = document.getElementById("tbDanhSachNhanVien").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                maNV = document.getElementById("tbDanhSachNhanVien").rows[this.parentNode.rowIndex].cells[2].id;
                tenNV = document.getElementById("tbDanhSachNhanVien").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                tenDV = document.getElementById("tbDanhSachNhanVien").rows[this.parentNode.rowIndex].cells[3].innerHTML;
                document.getElementById("pqHoTen_MaVN").innerHTML = tenNV + "   ||  Tài khoản: " + userName;
                document.getElementById("pqDonVi").innerHTML = tenDV;
                listQuyenXacNhanChuaCap(userName);
                listQuyenXacNhanDaCap(userName);
            }
        };
    }
}

function listQuyenXacNhanChuaCap(varUserName) {
//        alert(varUserName);
    var userName = "";
    userName = varUserName.toString();
    userName = userName.trim();
    var url = "myFunction/funThongTinTrucTuyen.jsp?caseName=chuaCapQuyenXacNhan&userName=" + userName;
    var res = "null";
    res = show_data(url);
    document.getElementById("dsDanhSachQuyen").innerHTML = res;
}

function listQuyenXacNhanDaCap(varUserName) {
//        alert(varUserName);
    var userName = "";
    userName = varUserName.toString();
    userName = userName.trim();
    var url = "myFunction/funThongTinTrucTuyen.jsp?caseName=daCapQuyenXacNhan&userName=" + userName;
    var res = "null";
    res = show_data(url);
    document.getElementById("dsQuyenDuocCap").innerHTML = res;
}

function capQuyenXacNhan(varUserName, varID, isCapQuyen) {
//    alert(varUserName + " " + varID + " " + isCapQuyen); 

    var url = "myFunction/funThongTinTrucTuyen.jsp?caseName=capQuyenXacNhan&varID=" + varID + "&isCapQuyen=" + isCapQuyen + "&userName=" + varUserName;
    var result = "";
    result = show_data(url);
    result = result.trim();
    if (isNotNumber(result)) { //Error
        alert("Thông báo kết quả: \n\n\t " + result);
    } else { //Successfull                     
        listQuyenXacNhanChuaCap(varUserName);
        listQuyenXacNhanDaCap(varUserName);
    }
}

// Nội dung Email
function resetNoiDungEmail() {
    document.getElementById("lblTo").innerHTML = "-";
    document.getElementById("lblFrom").innerHTML = "-";
    document.getElementById("lblBCC").innerHTML = "-";
    document.getElementById("lblMSKH_XNTT").innerHTML = "-";
    document.getElementById("lblHoTen_XNTT").innerHTML = "-";
    document.getElementById("lblSoCMND_XNTT").innerHTML = "-";
    document.getElementById("lblDiaChi_XNTT").innerHTML = "-";
    document.getElementById("lblEmail_XNTT").innerHTML = "-";
    document.getElementById("lblDienThoai_XNTT").innerHTML = "-";
    document.getElementById("lblNgayDuKienNhanVe_XNTT").innerHTML = "-";

    document.getElementById("lblMaSoThue_XNTT").innerHTML = "-";
    document.getElementById("lblTenCongTy_XNTT").innerHTML = "-";
    document.getElementById("lblHDDiaChi_XNTT").innerHTML = "-";
    document.getElementById("lblHDGhiChu_XNTT").innerHTML = "-";
}

function getNoiDungEmail() {
    resetNoiDungEmail();
    var varMSKH_XNTT = "";
    varMSKH_XNTT = document.getElementById("smsMSKH_XNTT").innerHTML;
    varMSKH_XNTT = varMSKH_XNTT.trim();
    document.getElementById("lblTo").innerHTML = document.getElementById("smsEmail_XNTT").innerHTML;
    document.getElementById("lblFrom").innerHTML = "dcthang@vttu.edu.vn";
    document.getElementById("lblBCC").innerHTML = "dcthang2012@gmail.com";
    document.getElementById("lblMSKH_XNTT").innerHTML = varMSKH_XNTT;
    document.getElementById("lblHoTen_XNTT").innerHTML = document.getElementById("smsHoTen_XNTT").innerHTML;
    document.getElementById("lblSoCMND_XNTT").innerHTML = document.getElementById("smsSoCMND_XNTT").innerHTML;
    document.getElementById("lblDiaChi_XNTT").innerHTML = document.getElementById("smsDiaChi_XNTT").innerHTML;
    document.getElementById("lblEmail_XNTT").innerHTML = document.getElementById("smsEmail_XNTT").innerHTML;
    document.getElementById("lblDienThoai_XNTT").innerHTML = document.getElementById("smsDienThoai_XNTT").innerHTML;
    document.getElementById("lblNgayDuKienNhanVe_XNTT").innerHTML = document.getElementById("smsNgayDuKienNhanVe_XNTT").innerHTML;

    var maSoThue = "";
    maSoThue = document.getElementById("smsMaSoThue_XNTT").innerHTML;
    maSoThue = maSoThue.trim();
    if (maSoThue.localeCompare("-") !== 0) {

        document.getElementById("trMaSoThue_XNTT").style.display = "table-row";
        document.getElementById("trTenCongTy_XNTT").style.display = "table-row";
        document.getElementById("trHDDiaChi_XNTT").style.display = "table-row";
        document.getElementById("trHDGhiChu_XNTT").style.display = "table-row";

        document.getElementById("lblMaSoThue_XNTT").innerHTML = document.getElementById("smsMaSoThue_XNTT").innerHTML;
        document.getElementById("lblTenCongTy_XNTT").innerHTML = document.getElementById("smsTenCongTy_XNTT").innerHTML;
        document.getElementById("lblHDDiaChi_XNTT").innerHTML = document.getElementById("smsHDDiaChi_XNTT").innerHTML;
        document.getElementById("lblHDGhiChu_XNTT").innerHTML = document.getElementById("smsHDGhiChu_XNTT").innerHTML;
    }
    else {
        document.getElementById("trMaSoThue_XNTT").style.display = "none";
        document.getElementById("trTenCongTy_XNTT").style.display = "none";
        document.getElementById("trHDDiaChi_XNTT").style.display = "none";
        document.getElementById("trHDGhiChu_XNTT").style.display = "none";


        document.getElementById("lblMaSoThue_XNTT").innerHTML = "-";
        document.getElementById("lblTenCongTy_XNTT").innerHTML = "-";
        document.getElementById("lblHDDiaChi_XNTT").innerHTML = "-";
        document.getElementById("lblHDGhiChu_XNTT").innerHTML = "-";
    }
}

function hiddenDiaLog_Email() {
    document.getElementById("divEmail").style.display = "none";
    hiddenDialogModal();
    resetNoiDungEmail();
}

function showDiaLog_Email(event) {
    var varDisabled = true;
    varDisabled = document.getElementById("chkDaGoiVe").disabled;
    if (varDisabled === true) {
        alert("Chú ý: \n\n\t Bạn chưa được cấp quyền gởi mail xác nhận đã thanh toán đến Khách hàng.");
        return;
    }
    else {
        var isDaXN = document.getElementById("chkDaXacNhan").checked;
        var isDaTT = document.getElementById("chkDaThanhToan").checked;

        if (isDaXN == false || isDaTT == false) {
            alert("Chú ý: \n\n\t Không được phép gởi email vé tạm đến Khách hàng khi chưa kiểm tra thông tin Khách hàng và xác nhận đã thanh toán tài chính.");
        }
        else {
            var msKH = "";
            msKH = document.getElementById("smsMSKH_XNTT").innerHTML;
            msKH = msKH.trim();
            if (msKH.localeCompare("") === 0 || msKH.localeCompare("-") === 0) {
                alert("Chú ý: \n\n\t Vui lòng chọn thông tin đặt vé trước khi gởi Email đến Khách hàng !");
                return;
            } else {
                hiddenDiaLog_Email();
                showDialogModal();
                getScrollXY(event, "divEmail");
                document.getElementById("divEmail").style.display = "block";
//        resetThongNhanVien();
                getNoiDungEmail();
                document.getElementById("dsChiTietDangKyVeXNTT").innerHTML = document.getElementById("dsChiTietDangKyVe").innerHTML;
            }
        }
    }
}

function funSendMail() {
    var varMessageText = "";
    var varTo = document.getElementById("lblTo").innerHTML;
    var varFrom = document.getElementById("lblFrom").innerHTML;
    var varBCC = document.getElementById("lblBCC").innerHTML;
    var varSubject = document.getElementById("lblSubject").innerHTML;
    var msKH = document.getElementById("lblMSKH_XNTT").innerHTML;
    var hoTen = document.getElementById("lblHoTen_XNTT").innerHTML;
    var soCMND = document.getElementById("lblSoCMND_XNTT").innerHTML;
    var diaChi = document.getElementById("lblDiaChi_XNTT").innerHTML;
    var emailKH = document.getElementById("lblEmail_XNTT").innerHTML;
    var dienThoai = document.getElementById("lblDienThoai_XNTT").innerHTML;
    var duKienNhanVe = document.getElementById("lblNgayDuKienNhanVe_XNTT").innerHTML;

    var maSoThue = document.getElementById("lblMaSoThue_XNTT").innerHTML;
    var tenCongTy = document.getElementById("lblTenCongTy_XNTT").innerHTML;
    var hdDiaChi = document.getElementById("lblHDDiaChi_XNTT").innerHTML;
    var hdGhiChu = document.getElementById("lblHDGhiChu_XNTT").innerHTML;


//    //Test 
//    alert(varTo + " " + varFrom + " " + varBCC + " " + varSubject + " " + varMessageText + " " + maSoThue + " " + tenCongTy + " " + hdDiaChi + " " + hdGhiChu);

//    //Test
//    alert(varMessageText);

    var url = "myFunction/funEmail.jsp?caseName=sendMail&toEmail=" + varTo + "&fromEmail=" + varFrom + "&bccEmail=" + varBCC + "&subject=" + varSubject + "&messageText=" + varMessageText
            + "&msKH=" + msKH + "&hoTen=" + hoTen + "&soCMND=" + soCMND + "&diaChi=" + diaChi + "&emailKH=" + emailKH + "&dienThoai=" + dienThoai + "&duKienNhanVe=" + duKienNhanVe
            + "&maSoThue=" + maSoThue + "&tenCongTy=" + tenCongTy + "&hdDiaChi=" + hdDiaChi + "&hdGhiChu=" + hdGhiChu;
    var res = "null";
    res = show_data(url);
    res = res.trim();
//    //Test
//    alert(res);

    if (isNotNumber(res)) { //Error
        alert("Thông báo lỗi gởi mail: \n\n\t " + res);
    } else { //Successfull 
        alert("Thông báo gởi mail: \n\n\t Đã gởi mail thành công.");
        hiddenDiaLog_Email();
    }
}

function exportFile() {
    //Lấy "Tex" && "ID" của Combobox
    var el = document.getElementById('cboBienNhan');
//    var nameTab = el.options[el.selectedIndex].innerHTML;

    var idTab = "";
    idTab = el.options[el.selectedIndex].id;
    idTab = idTab.trim().toLowerCase();

    var idLink = "";
    switch (idTab)
    {
        case "lik1": // <-> Đăng ký mua vé trực tuyến
            idLink = "1";
            break
        case "lik2": // <-> Đã xác nhận thông tin
            idLink = "2";
            break
        case "lik3": //<-> Đã hoàn thành tài chính
            idLink = "3";
            break
        case "lik4": //<-> Đã gởi vé tạm thời khách hàng
            idLink = "4";
            break
    }
    //alert(idLink);
    if (idLink === null || idLink.localeCompare("") === 0)
        return;

    var table = document.getElementById('tbDanhSachKH').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
//    alert(rows.length);
    if (rows.length === 0) {
        return;
    }
    else if (idTab.localeCompare("lik2") !== 0) {
        alert("Chú ý: \n\n\t Bạn chỉ xuất file excel kiểm tra thanh toán đặt vé trực tuyến từ Loại danh sách ''Đã xác nhận thông tin''.");
    }
    else if (confirm("Xác nhận yêu cầu xuất file: \n\n\t Bạn thật sự muốn xuất file excel mẫu tài chính kiểm tra thanh toán đặt vé online ?")) {
        var strIDLan = "", strMaKH = "", strList = "";
//            alert("rows.length: " + rows.length);
        for (var ix = 0; ix < rows.length; ix++) {
            strIDLan = document.getElementById("tbDanhSachKH").rows[ix + 1].cells[1].id;
            strMaKH = document.getElementById("tbDanhSachKH").rows[ix + 1].cells[2].id;
            strMaKH = strMaKH.trim();

//                //Test
//                alert(strIDLan + "<s>" + strMaKH + "<sos>");
//                strList = strList + strIDLan + "<s>" + strMaKH + "<sos>";
            strList = strList + strIDLan + "<s>";
        }
//            alert(strList);
        window.location.assign("myFunction/funThongTinTrucTuyen.jsp?caseName=kiemtrathanhtoandatveonline&idLink=" + idLink + "&listIDLan=" + strList);
    }
}

var isAddTT = false;
function importFile(obj) {
    //Lấy "Tex" && "ID" của Combobox
    var el = document.getElementById('cboBienNhan');
    // var nameTab = el.options[el.selectedIndex].innerHTML;

    var idTab = "";
    idTab = el.options[el.selectedIndex].id;
    idTab = idTab.trim().toLowerCase();

    if (idTab.localeCompare("lik2") !== 0) {
        alert("Chú ý: \n\n\t Vui lòng chọn ''Đã xác nhận thông tin'' từ Loại danh sách trước khi mở chọn file excel kiểm tra thanh toán đặt vé trực tuyến.");
    } else {
        var idLink = "";
        switch (idTab)
        {
            case "lik1": // <-> Đăng ký mua vé trực tuyến
                idLink = "1";
                break
            case "lik2": // <-> Đã xác nhận thông tin
                idLink = "2";
                break
            case "lik3": //<-> Đã hoàn thành tài chính
                idLink = "3";
                break
            case "lik4": //<-> Đã gởi vé tạm thời khách hàng
                idLink = "4";
                break
        }
        //alert(idLink);
        if (idLink === null)
            return;

        isAddTT = true;
        var postData = new FormData(document.forms.namedItem("fileinfo"));
        var maNV = pubMaNV;

//        //Test
//        alert(obj.value + " " + maNV + " " + postData);

        $.ajax({
            type: "POST",
            url: "myFunction/funThongTinTrucTuyen.jsp?caseName=openfolder&maNV=" + maNV + "&idLink=" + idLink,
            data: postData,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function (data) {
                var temp = data.trim();
//                alert(temp);
                var result = temp.split("<sol>"); //alert(result.length);
                if (result.length === 2) {
                    alert(result[1].trim());
                    document.getElementById("dsDanhSachKH").innerHTML = "";
                } else {
                    var res = result[0].trim(); //alert(temp);
                    document.getElementById("dsDanhSachKH").innerHTML = res;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest + " " + textStatus + " " + errorThrown);
            }
        });
        return false;
    }
}

var pubListIDLan = "";
function isErrorFile() {
    var table = document.getElementById('tbDanhSachKH').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
//    alert(rows.length);
    if (rows.length === 0) {
        return true;
    }
    else {
        var strIDLan = ""; // alert("rows.length: " + rows.length);
        for (var ix = 0; ix < rows.length; ix++) {
            strIDLan = document.getElementById("tbDanhSachKH").rows[ix + 1].cells[0].id;
            strIDLan = strIDLan.trim();
            if (strIDLan.localeCompare("-101") === 0) {
                pubListIDLan = "";
                return true;
            }
            else {
                pubListIDLan = pubListIDLan + strIDLan + "<s>";
            }
        }
    }
    return false;
}

function luuXacNhan() {
    if (isErrorFile()) {
        alert("Thông báo lỗi: \n\n\t Nội dung xác nhận bị lỗi hoặc trống. Vui lòng kiểm tra lại nội dung !");
        return;
    }
    else {
        if (confirm("Xác nhận yêu cầu: \n\n\t Bạn thật sự muốn xác nhận thông tin ?"))
        {
//            alert(pubListIDLan);

            var tabName = "taichinh";
            var maNV = pubMaNV;
            var isXacNhan = true;
            $.ajax({
                type: "POST",
                url: "myFunction/funThongTinTrucTuyen.jsp",
                data: {
                    "tabName": tabName,
                    "maNV": maNV,
                    "isXacNhan": isXacNhan,
                    "listIDLan": pubListIDLan,
                    "caseName": "xacNhanFile"},
                success: function (data) {
                    alert(data.trim());
                    isAddTT = false;
                    //cancelFind();
                },
                error: function () {
                    alert("Thông báo lỗi : \n\n\t Error !_!");
                }
            });
        }
    }
}

// 27.08.2018 Biên Nhận
function isNotNumber(varNumber) {
//isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}

var tabLinksB = new Array();
function initB() {
    // Grab the tab links and content divs from the page
    var tabListItems = document.getElementById('tabsB').childNodes;
    for (var i = 0; i < tabListItems.length; i++) {
        if (tabListItems[i].nodeName === "LI") {
            var tabLink = getFirstChildWithTagName(tabListItems[i], 'A'); //alert(tabLink);
            var id = getHash(tabLink.getAttribute('href'));
//            alert("tabLink: " + tabLink + " || id: " + id);
            tabLinksB[id] = tabLink;
        }
    }
    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;
    for (var id in tabLinksB) {
//        alert("id: " + id + " || tabLinksB[id]: " + tabLinksB[id]);

        tabLinksB[id].onclick = showTab;
        tabLinksB[id].onfocus = function () {
            this.blur();
        };
        if (i === 0) {
            tabLinksB[id].className = 'selected';
            $("#div" + id).removeClass("hide");
            selectTabB();
        }
        else {
            $("#div" + id).addClass("hide");
        }
        i++;

//         //Test
//         alert(tabLinksB[id].className + " sol " + tabLinksB[id]);
    }
}

function showTab() {
    var strId = "";
    strId = getHash(this.getAttribute('href'));
//    alert(this.getAttribute('id') + " || " + getHash(this.getAttribute('href')));

    // Highlight the selected tab, and dim all others.
    for (var id in tabLinksB) {
//        alert("id: " + id);

        tabLinksB[id].className = '';
        $("#div" + id).removeClass("hide").addClass("hide");
        if (id === strId) {
            tabLinksB[id].className = 'selected';
            $("#div" + id).removeClass("hide");
            selectTabB();
        }
    }
    return false;
}

function selectTabB() {
    disCboBienNhan();
    var tbTR = "";
    var nameTab = "";
    nameTab = $('#tabsB').find('li').find('.selected').attr('id');
    nameTab = nameTab.toLowerCase(); // alert("selectTabB: " + nameTab);
    switch (nameTab) {
        case "alophoc": //Lớp học
            document.getElementById("myCheckBox").style.visibility = "visible";
            document.getElementById("myCheckBox").style.display = false;
            document.getElementById("myCheckBox").checked = true;

            tbTR = "<thead class='th-normal'>" +
                    "   <th width='1%'>STT</th>" +
                    "   <th width='9%'>Họ tên</th>" +
                    "   <th width='3%'>Ngày sinh</th>" +
                    "   <th width='4%'>Giới tính</th>" +
                    "   <th width='15%'>Tên lớp</th>" +
                    "   <th width='3%'>Ngày BD</th>" +
                    "   <th width='3%'>Ngày KT</th>" +
                    "   <th width='1%'></th>" +
                    "</thead>" +
                    "<tbody id='dsDanhSach'class='tr-normal'></tbody>";
            document.getElementById("tbDanhSach").innerHTML = tbTR;

            cboLoaiLop();
            cboHocKy();
            break;
        case "abiennhan": //Biên nhận
            document.getElementById("myCheckBox").style.visibility = "hidden";
            document.getElementById("myCheckBox").style.display = true;
            document.getElementById("myCheckBox").checked = false;

            tbTR = "<thead class='th-normal'>" +
                    "   <th width='1%'>STT</th>" +
                    "   <th width='5%'>Ngày lập</th>" +
                    "   <th width='9%'>Người lập</th>" +
                    "   <th width='9%'>Học Sinh</th>" +
                    "   <th width='15%'>Nội dung</th>" +
                    "   <th width='3%'>Tổng tiền</th>" +
                    "   <th width='1%'></th>" +
                    "</thead>" +
                    "<tbody id='dsDanhSach'class='tr-normal'></tbody>";
            document.getElementById("tbDanhSach").innerHTML = tbTR;

//            var inABC = document.getElementById("cboBienNhan").value;
//            alert("Biên nhận: " + inABC);

            cboBienNhan();
            resetTimBienNhan();
            timBienNhan();
            break;
    }
}

function getFirstChildWithTagName(element, tagName) {
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeName === tagName)
            return element.childNodes[i];
    }
}

function getHash(url) {
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
}

function cboHocKy() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboHocKy";
    var res = show_data(url);
    document.getElementById("cboHocKy").innerHTML = res;

    cboLopHoc();
}

function cboLoaiLop() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboLoaiLop";
    var res = show_data(url);
    document.getElementById("cboLoaiLop").innerHTML = res;

    cboLop();
}

function cboLop() {
    var idLL = document.getElementById("cboLoaiLop").value;
//    alert(idLL); return;

    var url = "myFunction/funHocSinh.jsp?caseName=cboLop&idLL=" + idLL;
    var res = show_data(url); //alert(res);
    document.getElementById("cboLop").innerHTML = res;

    cboLopHoc();
}

function cboLopHoc() {
    var idHK = $('#cboHocKy option').length;
    var idLop = $('#cboLop option').length;

//    alert(idHK + " " + idLop);
    if (idHK !== 0 && idLop !== 0) {
        idHK = document.getElementById("cboHocKy").value;
        idLop = document.getElementById("cboLop").value;

        var url = "myFunction/funHocSinh.jsp?caseName=cboLopHoc&idHK=" + idHK + "&idLop=" + idLop;
        var res = "";
        res = show_data(url); //alert(res);
        document.getElementById("cboLopHoc").innerHTML = res;
        loadDSHocSinhDangKyLop();
    }
    else
        document.getElementById("cboLopHoc").innerHTML = "";
}


function loadDSHocSinhDangKyLop() {
    var maLop = $('#cboLopHoc option').length;
//    alert(maLop);
    if (maLop !== 0) {
        maLop = document.getElementById("cboLopHoc").value;
        var url = "myFunction/funHocSinh.jsp?caseName=dsHocSinhDangKyLop&maLop=" + maLop;
        var res = "";
        res = show_data(url); //alert(res);
        document.getElementById("dsDanhSach").innerHTML = res;
        hiddenDSHocSinhDangKyLop("tbDanhSach");
    }
    else
        document.getElementById("dsDanhSach").innerHTML = "";
}


function hiddenDSHocSinhDangKyLop(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[2].style.display = 'none';
        cels[5].style.display = 'none';
        cels[9].style.display = 'none';
    }
}

var maLop = "", pubIDBDK = "";
function xemHocSinh() {
//    resetNoiDungHS();
    var table = document.getElementById('tbDanhSach').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;


    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 10) {
                resetBienNhan();
//                enableNoiDungHocSinh(true);
//                maLop = document.getElementById("tbDanhSach").rows[this.parentNode.rowIndex].cells[6].id;
//                alert(maLop);

                pubIDBDK = document.getElementById("tbDanhSach").rows[this.parentNode.rowIndex].cells[0].id;
//                alert(pubIDBDK);
                infoHocSinh(pubIDBDK);

                document.getElementById("lblNVLap").innerHTML = pubHoTenNV + " || (" + pubMaNV + ")";
                var ngayLap = "";
                ngayLap = document.getElementById("txtNgayLap").value;

                listChiTietBienNhan("-1", pubIDBDK, ngayLap);
            }
        };
    }
}

function listChiTietBienNhan(inIDBN, inIDBDK, inNgayLap) {
    var idBDK = "", ngayLap = "", idBN = "0";
    idBDK = inIDBDK;
    idBDK = idBDK.trim();

    ngayLap = inNgayLap;
    ngayLap = ngayLap.trim();

    idBN = inIDBN;
    idBN = idBN.trim();
//    alert(idBDK + " || " + ngayLap + " || " + idBN);

    var url = "myFunction/funBienNhan.jsp?caseName=ndBienNhan&idBDK=" + idBDK + "&ngayLap=" + ngayLap + "&idBN=" + idBN;
    var res = "";
    res = show_data(url); // alert(res);
    document.getElementById("dsNDBienNhan").innerHTML = res;
}

function xoaBienNhan() {
    var idBN = document.getElementById("lblIDBN").innerHTML;
    idBN = idBN.trim();
    if (idBN.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t\t Vui lòng chọn Biên nhận trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn muốn xóa biên nhận có Mã: ''" + idBN + "'' ?" +
            "\n\n\n Chú ý: Không được phép xóa biên nhận khi đã xác nhận Đề nghị hoặc Thanh toán."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funBienNhan.jsp",
            data: {
                "idBN": idBN,
                "caseName": "delBienNhan"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    document.getElementById("dsNDBienNhan").innerHTML = "";
                    resetHocSinh();
                    resetBienNhan();
                    timBienNhan();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

var isEditBN = "false";
function lapBienNhan() {
//    if (isErrorSoLienLac())
//        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn lập Biên nhận trên ?"))
    {
        getKetQuaChiTietBN();

        var ngayLap = document.getElementById("txtNgayLap").value + " " +
                document.getElementById("cboGioLap").value + ":" +
                document.getElementById("cboPhutLap").value;

        var sumTT = document.getElementById("spSumTT").innerHTML;
        var noiDung = document.getElementById("txtNoiDung").value;
        var ndXNDeNghi = document.getElementById("txtDeNghi").value;
        var ndTaiChinh = document.getElementById("txtDaThu").value;

//        alert(pubIDBDK + " " + pubMaNV + " " + ngayLap + " " + noiDung + " " + pubListChiTiet + " " + sumTT ); return;

        $.ajax({
            type: "POST",
            url: "myFunction/funBienNhan.jsp",
            data: {
                "idBDK": pubIDBDK,
                "maNVLap": pubMaNV,
                "ngayLap": ngayLap,
                "noiDung": noiDung,
                "ndXNDeNghi": ndXNDeNghi,
                "ndTaiChinh": ndTaiChinh,
                "listChiTiet": pubListChiTiet,
                "sumTT": sumTT,
                "isEdit": isEditBN,
                "caseName": "updateBienNhan"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull

                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

var pubListChiTiet = "";
function getKetQuaChiTietBN() {
    pubListChiTiet = "";

    var rows = document.getElementById('tbNDBienNhan').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if (rows.length !== 0) {
        pubListChiTiet = "";

        var idTr = "", styleTr = "";
        var strGia = "", strSL = "", strTL = "", strTG = "";
        for (var i = 0; i < rows.length - 1; i++) {
//        idTr = rows[i].id; //Get Id of <Tr>        
            styleTr = rows[i].style.display.toString(); //Get Style display of <Tr>
//            alert("styleTr: " + styleTr);

            var td = rows[i].getElementsByTagName("td");
            var chk = td[5].getElementsByTagName("input")[0];
            if (chk !== null && chk.type === "checkbox" && chk.checked === true && styleTr.localeCompare("none") !== 0)
            {
//                alert(chk.checked + " " + chk.value + " " + chk.id);                
                strSL = document.getElementById("spSL" + chk.value).innerHTML;
                strTL = document.getElementById("cboTiLe" + chk.value).value;
                strGia = document.getElementById("spST" + chk.value).innerHTML;
                strTG = document.getElementById("spTG" + chk.value).innerHTML;
                pubListChiTiet = pubListChiTiet + chk.value + "<s>" + strGia + "<s>" + strSL + "<s>" + strTL + "<s>" + strTG + "<sos>";
            }
        }
    }
//    alert(pubListChiTiet);
}

var pubIDBN = "";
function xemBienNhan() {
    var table = document.getElementById('tbDanhSach').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var idBDK = "", idBN = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 6) {
                idBDK = document.getElementById("tbDanhSach").rows[this.parentNode.rowIndex].cells[3].id;
                idBN = document.getElementById("tbDanhSach").rows[this.parentNode.rowIndex].cells[0].id;
//                alert(idBDK + " "+ idBN);

                pubIDBDK = idBDK;
                pubIDBN = idBN;

                infoHocSinh(pubIDBDK);
                listChiTietBienNhan(pubIDBN, pubIDBDK, "01/01/1990");
                infoBienNhan(pubIDBN);
            }
        };
    }
}

function resetHocSinh() {
    document.getElementById("lblHoTenHS").innerHTML = "-";
    document.getElementById("lblNgaySinhHS").innerHTML = "-";
    document.getElementById("lblGioiTinhHS").innerHTML = "-";
    document.getElementById("lblTenLop").innerHTML = "-";

    document.getElementById("lblHoTenPH").innerHTML = "-";
    document.getElementById("lblDienThoaiPH").innerHTML = "-";
    document.getElementById("lblEmailPH").innerHTML = "-";
    document.getElementById("lblNoiLamViecPH").innerHTML = "-";
}

var pubMSHS = "", pubMaLop = "";
function infoHocSinh(inIDBDK) {
    resetHocSinh();

    var idBDK = "-";
    idBDK = inIDBDK;
    idBDK = idBDK.trim();
//    alert(idBDK);   

//0 rs.getString("MaLop") + "<s>"
//1 rs.getString("TenLop") + "<s>"
//2 rs.getString("MSHS") + "<s>"
//3 rs.getString("HoTenHS") + "<s>"
//4 rs.getString("TenThanMat") + "<s>"
//5 ngaySinh + "<s>"
//6 strGT + "<s>"
//7 rs.getString("DiaChi") + "<s>"
//8 rs.getString("IDBDK") + "<s>"
//9 ngayBD + "<s>"
//10 ngayKT + "<s>"
//11 rs.getString("GhiChu") + "<s>"
//12 rs.getString("GhiChuHS") + "<s>"
//13 rs.getString("QuocTich") + "<s>"
//14 rs.getString("IDHK") + "<s>"
//15 rs.getString("IDLop") + "<s>"                    
//16 rs.getString("IDLL") + "<s>"
//17 rs.getString("MSPH") + "<s>"
//18 rs.getString("HoTenPH") + "<s>"
//19 strGTPH + "<s>"
//20 nsPH + "<s>"
//21 rs.getString("DiaChiPH") + "<s>"
//22 rs.getString("NgheNghiepPH") + "<s>"
//23 rs.getString("NoiLamViecPH") + "<s>"
//24 rs.getString("SoDienThoaiPH") + "<s>"          
//25 rs.getString("EmailPH");    

    var strTemp = "";
    var res = "-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-";
    if (idBDK.localeCompare("-1") !== 0 || idBDK.localeCompare("-") !== 0) {
        var url = "myFunction/funHocSinh.jsp?caseName=infoHocSinhDangKy&idBDK=" + idBDK;
        res = show_data(url); //alert(res);         
    }
    strTemp = res.split('<s>');

    pubMSHS = strTemp[2];
    document.getElementById("lblHoTenHS").innerHTML = strTemp[3] + " || ( MSHS: " + pubMSHS + ")";
    document.getElementById("lblNgaySinhHS").innerHTML = strTemp[5];
    document.getElementById("lblGioiTinhHS").innerHTML = strTemp[6];

    pubMaLop = strTemp[0];
    document.getElementById("lblTenLop").innerHTML = strTemp[1] + " || ( Mã: " + pubMaLop + ")";

    document.getElementById("lblHoTenPH").innerHTML = strTemp[18];
    document.getElementById("lblDienThoaiPH").innerHTML = strTemp[24];
    document.getElementById("lblEmailPH").innerHTML = strTemp[25];
    document.getElementById("lblNoiLamViecPH").innerHTML = strTemp[23];
}

function resetBienNhan() {
    document.getElementById("lblIDBN").innerHTML = "-";

    document.getElementById("lblNVLap").innerHTML = "-";
    document.getElementById("txtNoiDung").value = "";
    getCurrentDateTime("txtNgayLap", "cboGioLap", "cboPhutLap");

    document.getElementById("lblNVDeNghi").innerHTML = "-";
    getCurrentDateTime("txtNgayDeNghi", "cboGioDeNghi", "cboPhutDeNghi");
    document.getElementById("chkDeNghi").checked = false;

    document.getElementById("lblNVXacNhan").innerHTML = "-";
    getCurrentDateTime("txtNgayXacNhan", "cboGioXacNhan", "cboPhutXacNhan");
    document.getElementById("chkDaThu").checked = false;
}

var localUS = "", localUSXN = "", localUSTC = "", localTenNV = "", localTenNVDN = "", localTenNVTC = "";
function infoBienNhan(inIDBN) {
    resetBienNhan();

    var idBN = "-";
    idBN = inIDBN;
    idBN = idBN.trim();
//    alert(idBN);

//0 ngayLP + "<s>" 
//1 gioLP + "<s>"
//2 phutLP + "<s>"
//3 maNVLP + "<s>"
//4 tenNVLP + "<s>"
//5 noiDungLP + "<s>"
//6 ngayDN + "<s>"
//7 gioDN + "<s>"
//8 phutDN + "<s>"
//9 maNVDN + "<s>"
//10 tenNVDN + "<s>"
//11 isDeNghi + "<s>"
//12 ngayXN + "<s>"
//13 gioXN + "<s>"
//14 phutXN + "<s>"
//15 maNVXN + "<s>"
//16 tenNVXN + "<s>"
//17 isXacNhan + "<s>"
//18 rs.getString("IDBN") + "<s>"                    
//19 rs.getString("NoiDungDeNghiXacNhan") + "<s>"  
//20 rs.getString("NoiDungTaiChinh");


    var strTemp = "";
    var res = "-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-";
    if (idBN.localeCompare("-1") !== 0 || idBN.localeCompare("-") !== 0) {
        var url = "myFunction/funBienNhan.jsp?caseName=infoBienNhan&idBN=" + idBN;
        res = show_data(url); //alert(res);         
    }
    strTemp = res.split('<s>');

    document.getElementById("lblIDBN").innerHTML = strTemp[18];

    localUS = strTemp[3];
    localTenNV = strTemp[4];
    document.getElementById("lblNVLap").innerHTML = localTenNV + " || (Mã: " + localUS + ")";
    document.getElementById("txtNoiDung").value = strTemp[5];
    document.getElementById("txtNgayLap").value = strTemp[0];
    document.getElementById("cboGioLap").value = strTemp[1];
    document.getElementById("cboPhutLap").value = strTemp[2];


    localUSXN = strTemp[9];
    localTenNVDN = strTemp[10];
    document.getElementById("lblNVDeNghi").innerHTML = localTenNVDN + " || (Mã: " + localUSXN + ")";
    document.getElementById("txtNgayDeNghi").value = strTemp[6];
    document.getElementById("cboGioDeNghi").value = strTemp[7];
    document.getElementById("cboPhutDeNghi").value = strTemp[8];
    document.getElementById("chkDeNghi").checked = JSON.parse(strTemp[11].toString());


    localUSTC = strTemp[15];
    localTenNVTC = strTemp[16];
    document.getElementById("lblNVXacNhan").innerHTML = localTenNVTC + " || (Mã: " + localUSTC + ")";
    document.getElementById("txtNgayXacNhan").value = strTemp[12];
    document.getElementById("cboGioXacNhan").value = strTemp[13];
    document.getElementById("cboPhutXacNhan").value = strTemp[14];
    document.getElementById("txtDeNghi").value = strTemp[19];
    document.getElementById("txtDaThu").value = strTemp[20];
    document.getElementById("chkDaThu").checked = JSON.parse(strTemp[17].toString());
}

function isCoQuyen(tabName) {
    var loginUS = "";
    loginUS = pubUserName;
    loginUS = loginUS.toLowerCase().trim();

    var createUS = "", createTenNV = "", strTemp = "", msInfo = "";
    strTemp = tabName.toString();
    strTemp = strTemp.trim();

    if (strTemp.localeCompare("xndenghi") === 0) {//Xác nhận Đề nghị
        createUS = localUSXN;
        createTenNV = localTenNVDN;
        msInfo = "xác nhận đề nghị";
    }
    else if (strTemp.localeCompare("xntaichinh") === 0) {//Xác nhận Tài chính
        createUS = localUSTC;
        createTenNV = localTenNVTC;
        msInfo = "xác nhận tài chính";
    }
    else //Lập phiếu đề nghị
    {
        createUS = localUS;
        createTenNV = localTenNV;
        msInfo = "lập phiếu";
    }
    createUS = createUS.toLowerCase().trim();

    var isAdmin = "";
    isAdmin = pubIsAdmin;
    isAdmin = isAdmin.toLowerCase().trim();

    var inID = "";
    inID = document.getElementById("lblIDBN").innerHTML.trim();
//    alert("loginUS: " + loginUS + " || isAdmin: " + isAdmin + " || inID: " + inID);
    if (loginUS.localeCompare(createUS) !== 0 && inID.localeCompare("-") !== 0) { //&& isAdmin.localeCompare("true") !== 0 
        alert("Thông báo quyền: \n\n\t Nội dung có Mã : ''" + inID + "'' được nhân viên  ''" + createTenNV + "'' " + msInfo + ". Bạn không được quyền cập nhật nội dung này." +
                "\n\n Chú ý: Chỉ có Nhân viên " + msInfo + " hoặc Quản trị viên mới được quyền cập nhật nội dung.");
        return false;
    }
    return true;
}

function capNhatXacNhan(chkName) {
    var tabName = "";
    tabName = chkName.toString();
    tabName = tabName.trim().toLowerCase();
    var idBN = "";
    idBN = document.getElementById("lblIDBN").innerHTML;
    idBN = idBN.toString().trim();
    if (idBN.localeCompare("-") === 0 || idBN.localeCompare("") === 0) {
        switch (tabName) {
            case "chkdenghi":
                getCurrentDateTime("txtNgayDeNghi", "cboGioDeNghi", "cboPhutDeNghi");
                document.getElementById("chkDeNghi").checked = false;
                break;
            case "chkdathu":
                getCurrentDateTime("txtNgayXacNhan", "cboGioXacNhan", "cboPhutXacNhan");
                document.getElementById("chkDaThu").checked = false;
                break;
        }
        alert("Chú ý: \n\n\t Vui lòng chọn thông tin biên nhận trước khi xác nhận !");
    } else {
        var noiDung = "", tabTemp = "";
        var isXacNhan = false;
        switch (tabName) {
            case "chkdenghi":
                tabTemp = "XNDeNghi";
                tabName = "deNghi";
                isXacNhan = document.getElementById("chkDeNghi").checked;
                noiDung = document.getElementById("txtDeNghi").value;
                break;
            case "chkdathu":
                tabTemp = "XNTaiChinh";
                tabName = "xacNhan";
                isXacNhan = document.getElementById("chkDaThu").checked;
                noiDung = document.getElementById("txtDaThu").value;
                break;
        }
        if (isCoQuyen(tabTemp))
            return;

        if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật xác nhận thông tin trên ?" +
                "\n\n\n Chú ý: Khi cập nhật xác nhận không đúng theo quy trình làm ảnh hưởng tới kết quả."))
        {
            $.ajax({
                type: "POST",
                url: "myFunction/funBienNhan.jsp",
                data: {
                    "maNV": pubMaNV,
                    "isXacNhan": isXacNhan,
                    "tabName": tabName,
                    "idBN": idBN,
                    "noiDung": noiDung,
                    "caseName": "capnhatXN"},
                success: function (data) {
                    var result = "";
                    result = data.trim();
                    if (!isNotNumber(result)) { //Successfull
                        timBienNhan();
                    } else {
                        alert("Thông báo kết quả: \n\n\t " + result);
                    }

                }
            });
        }
    }
}

function getNgayLapPhieu() {
    var pubDisplay = "";
    var isDisable = document.getElementById("chkNgayLapTim").checked;
    if (isDisable) {
        pubDisplay = "visible";
        getCurrentDateTime("tuNgayLapTim", null, null);
        getCurrentDateTime("denNgayLapTim", null, null);
        isDisable = false;
    } else {
        pubDisplay = "hidden";
        document.getElementById("tuNgayLapTim").value = "01/01/1990";
        document.getElementById("denNgayLapTim").value = "01/01/1990";
        isDisable = true;
    }
    document.getElementById("tuNgayLapTim").disabled = isDisable;
    document.getElementById("denNgayLapTim").disabled = isDisable;
    document.getElementById("picTuNgayLapTim").style.visibility = pubDisplay;
    document.getElementById("picDenNgayLapTim").style.visibility = pubDisplay;
}

function timNoiDung(tbName, txtFind) {
    var table = document.getElementById(tbName).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    else {
        // Declare variables 
        var input = "";
        input = document.getElementById(txtFind).value;
        input = input.toUpperCase();

        // Loop through all table rows, and hide those who don't match the search query
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].innerHTML.toUpperCase().indexOf(input) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }

//            td = rows[i].getElementsByTagName("td")[0];
//            if (td) {
//                if (td.innerHTML.toUpperCase().indexOf(input) > -1) {
//                    rows[i].style.display = "";
//                } else {
//                    rows[i].style.display = "none";
//                }
//            }
    }
}

function isErrorTangGiamSL(idKT, idBN) {
    var isError = false;

    var strIDKT = "";
    strIDKT = idKT.toString();
    strIDKT = strIDKT.trim();

    var strIDBN = "";
    strIDBN = idBN.toString();
    strIDBN = strIDBN.trim();

    if (strIDKT.localeCompare("") === 0 || strIDKT === null || strIDBN.localeCompare("") === 0 || strIDBN === null) {
        isError = true;
    }
    else {
        var isDaThu = document.getElementById("chkDaThu").checked;
        var isDaDeNghi = document.getElementById("chkDeNghi").checked;

        if (isDaThu === true || isDaDeNghi === true) {
            isError = true;
            alert("Chú ý: \n\n\t Không được phép cập nhật nội dung khoản thu khi biên nhận đã xác nhận.");
        }
    }

//    alert("strIDKT: " + strIDKT + " || strIDBN: " + strIDBN + " || isError: " + isError);
    return isError;
}

function tangSoLuong(idKT, idBN) {
    if (isErrorTangGiamSL(idKT, idBN))
        return;

    var strIDKT = "";
    strIDKT = idKT.toString();
    strIDKT = strIDKT.trim();

    var strIDBN = "";
    strIDBN = idBN.toString();
    strIDBN = strIDBN.trim();

    var tyLe = "";
//    var strGia = "", strSL = "", , strTG = "";
//    strGia = document.getElementById("spST" + strIDKT).innerHTML;
//    strSL = document.getElementById("spSL" + strIDKT).innerHTML;
//    strTG = document.getElementById("spTG" + strIDKT).innerHTML;
    tyLe = document.getElementById("cboTiLe" + strIDKT).value;

//    alert("strGia: " + strGia + " || strSL: " + strSL + " || strTiLe: " + tyLe + " || strTG: " + strTG);

    $.ajax({
        type: "POST",
        url: "myFunction/funBienNhan.jsp",
        data: {
            "idBN": strIDBN,
            "idKT": strIDKT,
            "tyLe": tyLe,
            "caseName": "tangKhoanThu"},
        success: function (data) {
            var result = "";
            result = data.trim();
            if (!isNotNumber(result)) { //Successfull
                listChiTietBienNhan(strIDBN, "-1", "01/01/1990");
                timBienNhan();
            } else {
                alert("Thông báo kết quả: \n\n\t " + result);
            }
        }
    });
}

function giamSoLuong(idKT, idBN) {
    if (isErrorTangGiamSL(idKT, idBN))
        return;

    var strIDKT = "";
    strIDKT = idKT.toString();
    strIDKT = strIDKT.trim();

    var strIDBN = "";
    strIDBN = idBN.toString();
    strIDBN = strIDBN.trim();

    var tyLe = "";
//    var strGia = "", strSL = "", , strTG = "";
//    strGia = document.getElementById("spST" + strIDKT).innerHTML;
//    strSL = document.getElementById("spSL" + strIDKT).innerHTML;
//    strTG = document.getElementById("spTG" + strIDKT).innerHTML;
    tyLe = document.getElementById("cboTiLe" + strIDKT).value;

//    alert("strGia: " + strGia + " || strSL: " + strSL + " || strTiLe: " + tyLe + " || strTG: " + strTG);

    $.ajax({
        type: "POST",
        url: "myFunction/funBienNhan.jsp",
        data: {
            "idBN": strIDBN,
            "idKT": strIDKT,
            "tyLe": tyLe,
            "caseName": "giamKhoanThu"},
        success: function (data) {
            var result = "";
            result = data.trim();
            if (!isNotNumber(result)) { //Successfull
                listChiTietBienNhan(strIDBN, "-1", "01/01/1990");
                timBienNhan();
            } else {
                alert("Thông báo kết quả: \n\n\t " + result);
            }
        }
    });
}

function changeMienGiam(idKT, idBN) {
    if (isErrorTangGiamSL(idKT, idBN))
        return;

    var strIDKT = "";
    strIDKT = idKT.toString();
    strIDKT = strIDKT.trim();

    var strIDBN = "";
    strIDBN = idBN.toString();
    strIDBN = strIDBN.trim();

    var tyLe = "";
//    var strGia = "", strSL = "", , strTG = "";
//    strGia = document.getElementById("spST" + strIDKT).innerHTML;
//    strSL = document.getElementById("spSL" + strIDKT).innerHTML;
//    strTG = document.getElementById("spTG" + strIDKT).innerHTML;
    tyLe = document.getElementById("cboTiLe" + strIDKT).value;

//    alert("strGia: " + strGia + " || strSL: " + strSL + " || strTiLe: " + tyLe + " || strTG: " + strTG);

    $.ajax({
        type: "POST",
        url: "myFunction/funBienNhan.jsp",
        data: {
            "idBN": strIDBN,
            "idKT": strIDKT,
            "tyLe": tyLe,
            "caseName": "tyLeKhoanThu"},
        success: function (data) {
            var result = "";
            result = data.trim();
            if (!isNotNumber(result)) { //Successfull
                listChiTietBienNhan(strIDBN, "-1", "01/01/1990");
                timBienNhan();
            } else {
                alert("Thông báo kết quả: \n\n\t " + result);
            }
        }
    });
}

function checkBoxAll() {
    var idBN = "";
    idBN = document.getElementById("lblIDBN").innerHTML;
    idBN = idBN.trim();

    var rows = document.getElementById('tbNDBienNhan').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if (rows.length !== 0 && idBN.localeCompare("-") === 0) {
        var isChecked = document.getElementById("myCheckBox").checked;
        //alert(isChecked);
        for (var i = 0; i < rows.length; i++)
        {
            var td = rows[i].getElementsByTagName("td");
            var chk = td[5].getElementsByTagName("input")[0];
            if (chk !== null && chk.type === "checkbox")
            {
                //alert(chk.checked +" "+ chk.id +" "+chk.value);
                chk.checked = isChecked;
            }
        }
    }
    else {
        document.getElementById("myCheckBox").checked = false;
    }
}

function funKhoanThu(idKT, idBN) {
    var isDaThu = document.getElementById("chkDaThu").checked;
    var isDaDeNghi = document.getElementById("chkDeNghi").checked;

    if (isDaThu === true || isDaDeNghi === true) {
        alert("Thông báo: \n\n\t Biên nhận đã được xác nhận. \n\n\n Chú ý: Không được phép xóa chi tiết nội dung khi biên nhận đã được xác nhận.");
    }
    else {
        //  alert("idKT :" + idKT + " || idBN: " + idBN);
        $.ajax({
            type: "POST",
            url: "myFunction/funBienNhan.jsp",
            data: {
                "idKT": idKT,
                "idBN": idBN,
                "caseName": "delChiTietKhoanThu"
            },
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    listChiTietBienNhan(idBN.toString(), "-1", "01/01/1990");
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function inDeNghi() {
    var idBN = "", idBDK = "";
    idBN = document.getElementById("lblIDBN").innerHTML;
    idBN = idBN.trim();
    if (idBN.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi in Đề nghị.");
        return;
    }
    else {
        idBDK = pubIDBDK;
        window.open("myFunction/funInAn.jsp?caseName=inDeNghi&idBDK=" + idBDK + "&idBN=" + idBN);
    }
}

function inDeNghiThuTien() {
    var idBN = "", idBDK = "";
    idBN = document.getElementById("lblIDBN").innerHTML;
    idBN = idBN.trim();
    if (idBN.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi in Đề nghị thu tiền.");
        return;
    }
    else {
        idBDK = pubIDBDK;
        window.open("myFunction/funInAn.jsp?caseName=inDeNghiThuTien&idBDK=" + idBDK + "&idBN=" + idBN);
    }
}