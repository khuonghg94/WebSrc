/* 
 Document   : jsChuSoHuu
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

function goHome() {
    window.location.replace("FrmMain.jsp");
}

function funSua() {
    var idCSH = document.getElementById("lblIDCSH").innerHTML;
    idCSH = idCSH.trim();

    if (idCSH.localeCompare("") === 0 || idCSH.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t Bạn chưa chọn thông tin chủ sở hửu. Vui lòng chọn thông tin chủ sở hửu trước khi sửa.");
        isEdit = "";
        return;
    } else
    {
        enableNoiDung(false);
        focusChuSoHuu("tenCSH");
        isEdit = "edit";
    }
}

function funThem() {
    enableNoiDung(false);
    resetNoiDung();
    focusChuSoHuu("tenCSH");
    isEdit = "add";

}

function funHuy() {
    isEdit = "";
    enableNoiDung(true);
    resetNoiDung();
}

var isEdit = "";
function funLuu() {
    if (isErrorChuSoHuu())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?" +
            "\n\n\n Chú ý: Tên loại vé cập nhật không được trùng với tên loại vé đã có."))
    {
        var idCSH = "";
        idCSH = document.getElementById("lblIDCSH").innerHTML;

        var tenCSH = "";
        tenCSH = document.getElementById("tenCSH").value;

        var diaChi = "";
        diaChi = document.getElementById("diaChi").value;

        var dienThoai = "";
        dienThoai = document.getElementById("dienThoaiCSH").value;

        var eMail = "";
        eMail = document.getElementById("eMail").value;

        $.ajax({
            type: "POST",
            url: "myFunction/funChuSoHuu.jsp",
            data: {
                "idCSH": idCSH,
                "tenCSH": tenCSH,
                "diaChi": diaChi,
                "dienThoai": dienThoai,
                "eMail": eMail,
                "isEdit": isEdit,
                "caseName": "capnhat"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Cập nhật thành công.");
                    danhSachChuSoHuu();
                    isEdit = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoa() {
    var idCSH = document.getElementById("lblIDCSH").innerHTML;
    idCSH = idCSH.trim();
    if (idCSH.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã ID: ''" + idCSH + "'' ?" +
            "\n\n\n Chú ý: Không được phép xóa tên chủ sở hửu khi đã sử dụng."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funChuSoHuu.jsp",
            data: {
                "idCSH": idCSH,
                "caseName": "xoa"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
                    funHuy();
                    danhSachChuSoHuu();
                    isEdit = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function danhSachChuSoHuu() {
    var url = "myFunction/funChuSoHuu.jsp?caseName=danhmuc";
    var res = show_data(url); //alert(res);

    document.getElementById("dsLoaiVe").innerHTML = res;

//            hiddenColumns("tbLoaiVe");
    enableNoiDung(true);
}

function resetNoiDung() {
    document.getElementById("lblIDCSH").innerHTML = "-";
    document.getElementById("tenCSH").value = "";
    document.getElementById("diaChi").value = "";
    document.getElementById("dienThoaiCSH").value = "";
    document.getElementById("eMail").value = "";

    isEdit = "";
}

function enableNoiDung(isEnable) {
    document.getElementById("tenCSH").disabled = isEnable;
    document.getElementById("diaChi").disabled = isEnable;
    document.getElementById("dienThoaiCSH").disabled = isEnable;
    document.getElementById("eMail").disabled = isEnable;
}

function noiDungChuSoHuu() {
    resetNoiDung();
    var table = document.getElementById('tbLoaiVe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            //alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 6) {
                document.getElementById("lblIDCSH").innerHTML = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("tenCSH").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("diaChi").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("dienThoaiCSH").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[3].innerHTML;
                document.getElementById("eMail").value = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[4].innerHTML;
            }
        };
    }
}

//        function hiddenColumns(idTable) {
//            var tbl = document.getElementById(idTable);
//            var rows = tbl.getElementsByTagName('tr');
//            //alert(rows.length.toString());
//            for (var row = 1; row < rows.length; row++) {
//                var cels = rows[row].getElementsByTagName('td');
//                cels[1].style.display = 'none';
//            }
//        }

function isNotNumber(varNumber) {
    //isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}

//Drop and Drap
function funDropAndDrap() {
    var theHandleGLV = document.getElementById("headerQBH");
    var theRootGLV = document.getElementById("divQBH");
    Drag.init(theHandleGLV, theRootGLV);
}

function getCurrentDateTime(varDate, varHour, varMinute) {
    var url = "myFunction/funGetCurrentDateTime.jsp?caseName=getCurrentDateTime";
    var res = "null";
    res = show_data(url); //Format "dd/M/yyyy H:m:s"
    //  //Test
    //  alert(res.trim());
    //  return;

    var strResult = res.split("<sos>");
//            //Test
//            alert(res.trim() + " " + strResult[0] + " " + strResult[1] + " " + strResult[2] + " " + strResult[3]);
//            return;

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
    document.getElementById("dialog_Calendar").style.display = "none";
}

function showDiaLog() {
    hiddenDiaLog();
    document.getElementById("dialog_Calendar").style.display = "block";
}

function disabledQuayBanHang(isDisable) {
    document.getElementById("smsTenQuay").disabled = isDisable;
    document.getElementById("smsDienThoai").disabled = isDisable;
    document.getElementById("chkThuocVTTU").disabled = isDisable;
    document.getElementById("tbQuayBanHang").disabled = !isDisable;
}

var pubIDCSHSMS = "-1";
function noiDungCSHSMS() {
    resetNoiDung();
    var table = document.getElementById('tbLoaiVe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var idCSH = "";
    var tenLoaVe = "";
    var diaChi = "";

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            //alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 5) {
                idCSH = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[0].id;
                tenLoaVe = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                diaChi = document.getElementById("tbLoaiVe").rows[this.parentNode.rowIndex].cells[2].innerHTML;


                pubIDCSHSMS = idCSH;
                document.getElementById("smsIDCSH").innerHTML = idCSH;
                document.getElementById("smsTenCSH").innerHTML = tenLoaVe;
                document.getElementById("smsDiaChi").innerHTML = diaChi;

                loadQuayBanHang(pubIDCSHSMS);
            }
        };
    }
}

function getScrollXY(event, valueName) {
//    alert("pageX: " + event.pageX + " pageY: " + event.pageY + " screen.width * screen.height");
//    alert("popW: " + popW + " screen.width: " + screen.width + " screen.width - popW : " + (screen.width - popW) + " Left : " + varLeft + " Top : " + varTop);

    var s = document.getElementById(valueName);
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

function hiddenDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "true");
    $("#divMyDialog").addClass("hidden");
}

function showDialogModal() {
    $("#divMyDialog").attr("aria-hidden", "false");
    $("#divMyDialog").removeClass("hidden");
}

function hiddenMessage_QuayBanHang(valueName) {
    //alert(valueName);                

    document.getElementById(valueName).style.display = "none";
    resetQuayBanHang();
    disabledQuayBanHang(true);
    hiddenDialogModal();
}

function showMessage_QuayBanHang(event, valueName) {
//    alert(valueName +" pageX: "+ event.pageX +" pageY: "+ event.pageY);   

    hiddenMessage_QuayBanHang(valueName);
    getScrollXY(event, valueName);
    document.getElementById(valueName).style.display = "block";
    noiDungCSHSMS();
    showDialogModal();
}

function focusChuSoHuu(nameID) {
    var nameID_ = "";
    nameID_ = nameID;
    nameID_ = nameID_.toLocaleLowerCase();
    nameID_ = nameID_.trim();
    switch (nameID_) {
        case "tencsh":
            document.getElementById("tenCSH").focus();
            break;
        case "diaChi":
            document.getElementById("diaChi").focus();
            break;
        case "dienthoaicsh":
            document.getElementById("dienThoaiCSH").focus();
            break;
        case "email":
            document.getElementById("eMail").focus();
            break;
    }
}

function focusQuayBanHang(nameID) {
    var nameID_ = "";
    nameID_ = nameID;
    nameID_ = nameID_.toLocaleLowerCase();
    nameID_ = nameID_.trim();
    switch (nameID_) {
        case "smstenquay":
            document.getElementById("smsTenQuay").focus();
            break;
        case "smsdienthoai":
            document.getElementById("smsDienThoai").focus();
            break;
    }
}

function funSuaSMS() {    
    var idQBH = document.getElementById("smsIDQBH").innerHTML;
    idQBH = idQBH.trim();    
    
    if (idQBH.localeCompare("") === 0 || idQBH.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t Bạn chưa chọn thông tin quầy. Vui lòng chọn thông tin quầy trước khi sửa.");
        isAddSMS = "";
        return;
    } else
    {
        disabledQuayBanHang(false);
        focusQuayBanHang("smsTenQuay");
        isAddSMS = "edit";
    }
}

var isAddSMS = "";
function funThemSMS() {
    disabledQuayBanHang(false);
    resetQuayBanHang();
    focusQuayBanHang("smsTenQuay");
    isAddSMS = "add";
}

function funHuySMS() {
    loadQuayBanHang(pubIDCSHSMS);
    disabledQuayBanHang(true);
    resetQuayBanHang();
    isAddSMS = "";
}

function noiDungQuayBanHang() {
    var table = document.getElementById('tbQuayBanHang').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
//            alert("OK baby");

    resetQuayBanHang();
    disabledQuayBanHang(true);

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
            if (this.cellIndex === 4) {
//                        alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);

                document.getElementById("smsIDQBH").innerHTML = document.getElementById("tbQuayBanHang").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("smsTenQuay").value = document.getElementById("tbQuayBanHang").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("smsDienThoai").value = document.getElementById("tbQuayBanHang").rows[this.parentNode.rowIndex].cells[2].innerHTML;

                var td = document.getElementById("tbQuayBanHang").rows[this.parentNode.rowIndex].getElementsByTagName("td");
                var chk = td[3].getElementsByTagName("input")[0];
                if (chk !== null && chk.type === "checkbox")
                {
                    //alert(chk.checked + " " + chk.value);
                    document.getElementById("chkThuocVTTU").checked = chk.checked;
                } else
                {
                    document.getElementById("chkThuocVTTU").checked = false;
                }
            }
        };
    }
}

function loadQuayBanHang(pubIDCSHSMS) {
    var idCSH = pubIDCSHSMS;
    idCSH = idCSH.trim();
//            alert(idCSH);
    if (idCSH.localeCompare("-") === 0 || idCSH.localeCompare("-1") === 0)
        return;

    var url = "myFunction/funQuayBanHang.jsp?caseName=danhmuc&idCSH=" + idCSH;
    var res = show_data(url);
    document.getElementById("dsQuayBanHang").innerHTML = res;
}

function resetQuayBanHang() {
    document.getElementById("smsIDQBH").innerHTML = "-";
    document.getElementById("smsTenQuay").value = "";
    document.getElementById("smsDienThoai").value = "";
    document.getElementById("chkThuocVTTU").checked = false;
}

function funDongSMS(valueName) {
    hiddenMessage_QuayBanHang(valueName);
    danhSachChuSoHuu();
}

function isErrorChuSoHuu() {
    var isError = false;

    var idCSH = "";
    idCSH = document.getElementById("lblIDCSH").innerHTML;
    idCSH = idCSH.trim();

    var tenCSH = "";
    tenCSH = document.getElementById("tenCSH").value;
    tenCSH = tenCSH.trim();

    if (isEdit.localeCompare("") === 0) {
        isError = true;
    } else if (idCSH.localeCompare("-") === 0 && isEdit.localeCompare("edit") === 0) {
        alert("Chú ý: \n\n\t Bạn chưa chọn thông tin chủ sở hửu. Vui lòng chọn chủ sở hửu trước khi yêu cầu cập nhật thông tin.");
        focusChuSoHuu("tenCSH");
        isError = true;
    } else if (tenCSH.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Tên chủ sở hửu không được để trống. Vui lòng nhập tên chủ sở hửu trước khi yêu cầu cập nhật thông tin.");
        focusChuSoHuu("tenCSH");
        isError = true;
    }

    return isError;
}

function isErrorQuayBanHang() {
    var isError = false;

    var smsIDQBH = "";
    smsIDQBH = document.getElementById("smsIDQBH").innerHTML;
    smsIDQBH = smsIDQBH.trim();

    var smsTenQuay = "";
    smsTenQuay = document.getElementById("smsTenQuay").value;
    smsTenQuay = smsTenQuay.trim();

    if (isAddSMS.localeCompare("") === 0) {
        isError = true;
    } else if (smsIDQBH.localeCompare("-") === 0 && isAddSMS.localeCompare("edit") === 0) {
        alert("Chú ý: \n\n\t Bạn chưa chọn thông tin Tên quầy. Vui lòng chọn Tên quầy trước khi yêu cầu cập nhật thông tin.");
        focusQuayBanHang("smsTenQuay");
        isError = true;
    } else if (smsTenQuay.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Tên quầy không được để trống. Vui lòng nhập tên quầy trước khi yêu cầu cập nhật thông tin.");
        focusQuayBanHang("smsTenQuay");
        isError = true;
    }

    return isError;
}

function funLuuSMS() {
    if (isErrorQuayBanHang())
        return;

    if (confirm("Xác nhận yêu cầu: \n\n\t Bạn thật sự muốn cập nhật thông tin Quầy bán hàng ?"))
    {
        var idCSH = document.getElementById("smsIDCSH").innerHTML;
        var idQBH = document.getElementById("smsIDQBH").innerHTML;
        var smsTenQuay = document.getElementById("smsTenQuay").value;
        var smsDienThoai = document.getElementById("smsDienThoai").value;

        var quayVTTU = document.getElementById("chkThuocVTTU").checked;
        //  alert(isAddSMS +" "+ idCSH +" "+ idQBH +" "+ smsTenQuay +" "+ smsDienThoai +" "+ quayVTTU);

        $.ajax({
            type: "POST",
            url: "myFunction/funQuayBanHang.jsp",
            data: {
                "idCSH": idCSH,
                "idQBH": idQBH,
                "smsTenQuay": smsTenQuay,
                "smsDienThoai": smsDienThoai,
                "quayVTTU": quayVTTU,
                "caseName": isAddSMS},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Đã thêm thành công.");
                    funHuySMS();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoaSMS() {
    var idQBH = document.getElementById("smsIDQBH").innerHTML;
    idQBH = idQBH.trim();

    if (idQBH.localeCompare("") === 0 || idQBH.localeCompare("-") === 0)
        return;

    if (confirm("Xác nhận yêu cầu: \n\n\t Bạn thật sự muốn xóa thông tin quầy có mã: ''" + idQBH + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funQuayBanHang.jsp",
            data: {
                "idQBH": idQBH,
                "caseName": "del"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
                    funHuySMS();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}
