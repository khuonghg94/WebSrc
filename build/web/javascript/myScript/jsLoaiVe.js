/* 
 Document   : jsLoaiVe
 Created on : July 10, 2018, 10:18:00 AM
 Author     : sol
 */

var pubMaNV = "-", pubHoTenNV = "-", pubTenKhoa = "-", pubMaKhoa = "-", pubUserName = "-";

function goHome() {
    window.location.replace("FrmMain.jsp");
}

function funSua() {
    var idLoaiVe = document.getElementById("lblIDKT").innerHTML;
    idLoaiVe = idLoaiVe.trim();
    if (idLoaiVe.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn thông tin trước khi sửa.");
    }
    else {
        enableNoiDung(false);
        funFocusKhoanThu("tenKhoanThu");
        isEdit = "true";
    }
}

function funThem() {
    enableNoiDung(false);
    resetNoiDung();
    focusLoaiVe("tenKhoanThu");
    isEdit = "false";
}

function funHuy() {
    isEdit = "";
    enableNoiDung(true);
    resetNoiDung();
}
function isErrorLoaiVe() {
    var isError = false;
    var idLoaiVe = document.getElementById("lblIDKT").innerHTML;
    idLoaiVe = idLoaiVe.trim();
    var tenKhoanThu = "";
    tenKhoanThu = document.getElementById("tenKhoanThu").value;
    tenKhoanThu = tenKhoanThu.trim();
    if (isEdit.localeCompare("") === 0) {
        isError = true;
    } else if (idLoaiVe.localeCompare("-") === 0 && idLoaiVe.localeCompare("edit") === 0) {
        alert("Chú ý: \n\n\t Bạn chưa chọn thông tin. Vui lòng chọn thông tin khi cập nhật.");
        focusChuSoHuu("tenKhoanThu");
        isError = true;
    } else if (tenKhoanThu.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Tên khoản thu không được để trống. Vui lòng nhập thông tin.");
        focusChuSoHuu("tenKhoanThu");
        isError = true;
    }

    return isError;
}


var isEdit = "";
function funLuu() {
    if (isErrorLoaiVe()) {
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin?" +
            "\n\n\n Chú ý: Tên khoản thu không được trùng với tên đã có."))
    {
        var idKT = document.getElementById("lblIDKT").innerHTML;
        var tenKhoanThu = document.getElementById("tenKhoanThu").value;
        var batBuoc = document.getElementById("chkBatBuoc").checked;
        var soLan = document.getElementById("soLan").value;
        var ghiChu = document.getElementById("ghiChu").value;
        $.ajax({
            type: "POST",
            url: "myFunction/funLoaiVe.jsp",
            data: {
                "idKT": idKT,
                "tenKhoanThu": tenKhoanThu,
                "batBuoc": batBuoc,
                "soLan": soLan,
                "ghiChu": ghiChu,
                "isEdit": isEdit,
                "caseName": "capnhat"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    danhSachLoaiVe();
                    isEdit = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoa() {
    var idLoaiVe = document.getElementById("lblIDKT").innerHTML;
    idLoaiVe = idLoaiVe.trim();
    if (idLoaiVe.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã ID: ''" + idLoaiVe + "'' ?" +
            "\n\n\n Chú ý: Không được phép xóa Khoản thu khi đã sử dụng."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funLoaiVe.jsp",
            data: {
                "idLoaiVe": idLoaiVe,
                "caseName": "xoa"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    funHuy();
                    danhSachLoaiVe();
                    isEdit = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function danhSachLoaiVe() {
    var url = "myFunction/funLoaiVe.jsp?caseName=danhMuc";
    var res = show_data(url); //alert(res);

    document.getElementById("dsLoaiVe").innerHTML = res;
    hiddenColumns("tbLoaiVe");
    enableNoiDung(true);
}

function resetNoiDung() {
    document.getElementById("lblIDKT").innerHTML = "-";
    document.getElementById("tenKhoanThu").value = "";
    document.getElementById("soLan").value = "1";
    document.getElementById("ghiChu").value = "";
    document.getElementById("chkBatBuoc").checked = false;
    isEdit = "";
}

function enableNoiDung(isEnable) {
    document.getElementById("tenKhoanThu").disabled = isEnable;
    document.getElementById("chkBatBuoc").disabled = isEnable;
    document.getElementById("soLan").disabled = isEnable;
    document.getElementById("ghiChu").disabled = isEnable;

    if (isEnable) {
        $("#ghiChu").removeClass().addClass("txtInput");
        $("#soLan").removeClass().addClass("txtInput");
        $("#tenKhoanThu").removeClass().addClass("txtInput");
    }
    else {
        $("#ghiChu").removeClass("txtInput").addClass("txtEdit");
        $("#soLan").removeClass("txtInput").addClass("txtEdit");
        $("#tenKhoanThu").removeClass("txtInput").addClass("txtEdit");
    }
}

function noiDungLoaiVe() {
    resetNoiDung();
    var table = document.getElementById('tbLoaiVe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            //alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 5) {
                document.getElementById("lblIDKT").innerHTML = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[1].id;
                document.getElementById("tenKhoanThu").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("soLan").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[6].innerHTML;
                document.getElementById("ghiChu").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[7].innerHTML;

                var td = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].getElementsByTagName("td");
                var chk = td[3].getElementsByTagName("input")[0];
                if (chk !== null && chk.type === "checkbox")
                {
                    //alert(chk.checked + " " + chk.value);
                    document.getElementById("chkBatBuoc").checked = chk.checked;
                } else
                {
                    document.getElementById("chkBatBuoc").checked = "false";
                }
            }
        };
    }
}

function hiddenColumns(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[1].style.display = 'none';
        cels[6].style.display = 'none';
        cels[7].style.display = 'none';
    }
}

function isNotNumber(varNumber) {
    //isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}

//Drop and Drap
function funDropAndDrap() {
    var theRoot = document.getElementById("dialog_Calendar");
    Drag.init(theRoot);
    var theHandleGLV = document.getElementById("headerGiaLoaiVe");
    var theRootGLV = document.getElementById("divGiaLoaiVe");
    Drag.init(theHandleGLV, theRootGLV);
}

function getCurrentDateTime(varDate, varHour, varMinute) {
    var url = "myFunction/funGetCurrentDateTime.jsp?caseName=getCurrentDateTime";
    var res = "null";
    res = show_data(url); //Format "dd/MM/yyyy H:m:s"
    //  //Test
    //  alert(res.trim());
    //  return;

    var strResult = res.split("<sos>");
//    //Test
//    alert(res.trim() + " " + strResult[0] + " " + strResult[1] + " " + strResult[2] + " " + strResult[3]);
//    return;

    document.getElementById(varDate).value = strResult[0]; //"dd/MM/yyyy"
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
    //$(".mopCalendar").mopCalendar("");
    document.getElementById("dialog_Calendar").style.display = "none";
}

function showDiaLog() {
    hiddenDiaLog();
    document.getElementById("dialog_Calendar").style.display = "block";
}

function disabledGiaLoaiVe(isDisable) {
    document.getElementById("smsGiaLoaiVe").disabled = isDisable;
    document.getElementById("smsNgayBD").disabled = isDisable;
    document.getElementById("smsNgayKT").disabled = isDisable;
    document.getElementById("tbGiaLoaiVe").disabled = !isDisable;

    if (isDisable) {
        $("#smsGiaLoaiVe").removeClass().addClass("txtInput");
        $("#smsNgayBD").removeClass().addClass("txtInput");
        $("#smsNgayKT").removeClass().addClass("txtInput");
    }
    else {
        $("#smsGiaLoaiVe").removeClass("txtInput").addClass("txtEdit");
        $("#smsNgayBD").removeClass("txtInput").addClass("txtEdit");
        $("#smsNgayKT").removeClass("txtInput").addClass("txtEdit");
    }
}

var pubIDKTSMS = "-1";
function noiDungLoaiVeSMS() {
    resetNoiDung();

    var table = document.getElementById('tbLoaiVe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var idLoaiVe = "";
    var tenKhoanThu = "";
    var veTronGoi = false;
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            //alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 4) {
                idLoaiVe = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[0].id;
                tenKhoanThu = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                var td = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].getElementsByTagName("td");
                var chk = td[3].getElementsByTagName("input")[0];
                if (chk !== null && chk.type === "checkbox")
                {
                    veTronGoi = chk.checked;
                } else
                {
                    veTronGoi = false;
                }
 
                pubIDKTSMS = idLoaiVe;
                document.getElementById("smsIDKT").innerHTML = pubIDKTSMS;
                document.getElementById("smsTenLoaiVe").innerHTML = tenKhoanThu;
                document.getElementById("chkSmsBatBuoc").checked = veTronGoi;
                loadGiaLoaiVe(pubIDKTSMS);
            }
        };
    }
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
    y = event.pageY - 50;
    s.style.top = y + "px";
}

function hiddenDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "true");
    $("#divMyDialog").addClass("hidden");
//            $("divMain").attr("tabindex", "0");
}

function showDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "false");
    $("#divMyDialog").removeClass("hidden");
}

function hiddenMessage_GiaLoaiVe(valueName) {
    //alert(valueName);                 
    document.getElementById(valueName).style.display = "none";
    resetGiaLoaiVe();
    disabledGiaLoaiVe(true);
    hiddenDialogModal();
}

function showMessage_GiaLoaiVe(event, valueName) {
//    alert(valueName +" pageX: "+ event.pageX +" pageY: "+ event.pageY);   

    hiddenMessage_GiaLoaiVe(valueName);
    getScrollXY(event, valueName);
    document.getElementById(valueName).style.display = "block";
    noiDungLoaiVeSMS();
    showDialogModal();
}

function focusLoaiVe(nameID) {
    var nameID_ = "";
    nameID_ = nameID;
    nameID_ = nameID_.toLocaleLowerCase();
    nameID_ = nameID_.trim();
    switch (nameID_) {
        case "tenloaive":
            document.getElementById("tenKhoanThu").focus();
            break;
    }
}

function focusGiaLoaiVe(nameID) {
    var nameID_ = "";
    nameID_ = nameID;
    nameID_ = nameID_.toLocaleLowerCase();
    nameID_ = nameID_.trim();
    switch (nameID_) {
        case "smsngaybd":
            document.getElementById("smsNgayBD").focus();
            break;
        case "smsngaykt":
            document.getElementById("smsNgayKT").focus();
            break;
        case "smsgialoaive":
            document.getElementById("smsGiaLoaiVe").focus();
            document.getElementById("smsGiaLoaiVe").select();
            break;
    }
}

var ngayBDSMS_old = "01/01/1990", ngayKTSMS_old = "01/01/1990";
function funSuaSMS() {
    alert("Không có chức năng sửa Giá");
}

var isAddSMS = "";
function funThemSMS() {
    disabledGiaLoaiVe(false);
    focusGiaLoaiVe("smsGiaLoaiVe");
    resetGiaLoaiVe();
    isAddSMS = "add";
}

function funHuySMS() {
    loadGiaLoaiVe(pubIDKTSMS);
    disabledGiaLoaiVe(true);
    resetGiaLoaiVe();
    isAddSMS = "";
}

function noiDungGiaLoaiVe() {
    var table = document.getElementById('tbGiaLoaiVe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    resetGiaLoaiVe();
    disabledGiaLoaiVe(true);
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            if (this.cellIndex === 3) {
//                        alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
                document.getElementById("smsIDGia").innerHTML = document.getElementById("tbGiaLoaiVe").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("smsNgayBD").value = document.getElementById("tbGiaLoaiVe").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("smsNgayKT").value = document.getElementById("tbGiaLoaiVe").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                var td = rows[this.parentNode.rowIndex - 1].getElementsByTagName("td");
                var chk = td[3].getElementsByTagName("a")[0];
                document.getElementById("smsGiaLoaiVe").value = chk.innerHTML;
            }
        };
    }
}

function loadGiaLoaiVe(pubIDKTSMS) {
    var idLoaiVe = pubIDKTSMS;
    idLoaiVe = idLoaiVe.trim();
    // alert(idLoaiVe);
    if (idLoaiVe.localeCompare("-") === 0 || idLoaiVe.localeCompare("-1") === 0)
        return;
    var url = "myFunction/funGiaVe.jsp?caseName=danhmuc&idLoaiVe=" + idLoaiVe;
    var res = show_data(url);
    document.getElementById("dsGiaLoaiVe").innerHTML = res;
}

function resetGiaLoaiVe() {
    document.getElementById("smsIDGia").innerHTML = "-";
    document.getElementById("smsGiaLoaiVe").value = "0";
    getCurrentDateTime("smsNgayBD", null, null);
    autoThemNamKetThuc(10, "smsNgayBD", "smsNgayKT");
//    getCurrentDateTime("smsNgayKT", null, null);
}

function funDongSMS(valueName) {
    hiddenMessage_GiaLoaiVe(valueName);
    danhSachLoaiVe();
}

function isErrorGiaLoaiVe() {
    var isError = false;
    var smsNgayBD = document.getElementById("smsNgayBD").value;
    var smsNgayKT = document.getElementById("smsNgayKT").value;
    var smsGiaLoaiVe = "";
    smsGiaLoaiVe = document.getElementById("smsGiaLoaiVe").value;
    smsGiaLoaiVe = smsGiaLoaiVe.trim();
    if (!isValidDate(smsNgayBD, "Ngày bắt đầu")) {
        isError = true;
        focusGiaLoaiVe("smsNgayBD");
    } else if (!isValidDate(smsNgayKT, "Ngày kết thúc"))
    {
        isError = true;
        focusGiaLoaiVe("smsNgayKT");
    } else if (smsGiaLoaiVe.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Giá không được để trống. Vui lòng nhập giá khi cập nhật thông tin.");
        isError = true;
        focusGiaLoaiVe("smsGiaLoaiVe");
    } else if (isAddSMS.localeCompare("") === 0) {
        isError = true;
    }

    return isError;
}

function funLuuSMS() {
    if (isErrorGiaLoaiVe())
        return;
    if (confirm("Xác nhận yêu cầu: \n\n\t Bạn thật sự muốn cập nhật thông tin giá ?"))
    {
        var idKT = document.getElementById("smsIDKT").innerHTML;
        var idGiaLoaiVe = document.getElementById("smsIDGia").innerHTML;
        var soTien = document.getElementById("smsGiaLoaiVe").value;
        var ngayBD = document.getElementById("smsNgayBD").value;
        var ngayKT = document.getElementById("smsNgayKT").value;
        //alert(idLoaiVe + " " + idGiaLoaiVe + " " + ngayBD + " " + ngayKT + " " + ngayBDSMS_old + " " + ngayKTSMS_old + " " + soTien + " " + isAddSMS);
        //alert(isAddSMS);

        var kiemTraNgay = true;
        if (ngayBDSMS_old === ngayBD && ngayKTSMS_old === ngayKT) {
            kiemTraNgay = false;
            //alert(kiemTraNgay);
        }

        $.ajax({
            type: "POST",
            url: "myFunction/funGiaVe.jsp",
            data: {
                "idKT": idKT,
                "idGiaLoaiVe": idGiaLoaiVe,
                "ngayBD": ngayBD,
                "ngayKT": ngayKT,
                "soTien": soTien,
                "kiemTraNgay": kiemTraNgay,
                "caseName": isAddSMS},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    funHuySMS();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoaSMS() {
    var idGiaLoaiVe = document.getElementById("smsIDGia").innerHTML;
    idGiaLoaiVe = idGiaLoaiVe.trim();
    if (idGiaLoaiVe.localeCompare("") === 0 || idGiaLoaiVe.localeCompare("-") === 0)
        return;
    if (confirm("Xác nhận yêu cầu: \n\n\t Bạn thật sự muốn xóa thông tin giá có mã: ''" + idGiaLoaiVe + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funGiaVe.jsp",
            data: {
                "idGiaLoaiVe": idGiaLoaiVe,
                "caseName": "del"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    funHuySMS();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function keyDown(event, idName) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '9' || keycode == '13' || keycode == '0') {
//        alert('You pressed a "Tab" Or "Enter" Or "Fouce"  key in textbox ' + keycode);

        var idName_ = "";
        idName_ = idName;
        idName_ = idName_.toLowerCase();
        idName_ = idName_.trim();
        switch (idName_) {
            case "smsngaybd":
                var ngayBD = document.getElementById("smsNgayBD").value;
                if (!isValidDate(ngayBD, "Ngày bắt đầu"))
                    funFocusKhoanThu("smsNgayBD");
                else
                    autoThemNamKetThuc(10, "smsNgayBD", "smsNgayKT");
                break;
                
            case "smsngaykt":
                var ngayKT = document.getElementById("smsNgayKT").value;
                if (!isValidDate(ngayKT, "Ngày kết thúc"))
                    funFocusKhoanThu("smsNgayKT");
                break;
        }
        event.preventDefault();
    }
}

function funFocusKhoanThu(nameID) {
    var nameID_ = "";
    nameID_ = nameID;
    nameID_ = nameID_.toLowerCase();
    nameID_ = nameID_.trim();

    switch (nameID_) {
        case "smsngaybd":
            document.getElementById("smsNgayBD").disabled = false;
//            document.getElementById("smsNgayBD").focus();
            getCurrentDateTime("smsNgayBD", null, null);
            document.getElementById("smsNgayBD").select();
            break;
        case "smsngaykt":
            document.getElementById("smsNgayKT").disabled = false;
//            document.getElementById("smsNgayKT").focus();
            getCurrentDateTime("smsNgayKT", null, null);
            document.getElementById("smsNgayKT").select();
            break;
            //Khoản thu ----------------------------------------------
        case "tenkhoanthu":
            document.getElementById("tenKhoanThu").select();
            break;
    }
}