/* 
 Document   : jsQuanTri
 Created on : Jun 19, 2017, 10:18:00 AM
 Author     : sol
 */

function hiddenColumns(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[4].style.display = 'none';
        cels[7].style.display = 'none';
        cels[8].style.display = 'none';
        cels[9].style.display = 'none';
    }
}

function getThongTinChucNang(idForm) {
    var strIDForm = "";
    strIDForm = idForm.toString();
    strIDForm = strIDForm.trim();

    if (strIDForm.localeCompare("") === 0) {
        alert("Thông báo : \n\n\t Không xác định thông tin chức năng");
    }
    else {
        var url = "myFunction/funDesktop.jsp?caseName=getThongTinChucNang&idForm=" + idForm;
        var res = show_data(url); //alert(res);

        var strTemp = res.split('<s>');
//        alert(strTemp[0] + " " + strTemp[1] + " " + strTemp[2] + " " + strTemp[3] + " " + strTemp[4] + " " + strTemp[5] 
//        + " " + strTemp[6] + " " + strTemp[7] + " " + strTemp[8] + " " + strTemp[9] + " " + strTemp[10]);

        document.getElementById("lblIDFile").innerHTML = strTemp[0];
        document.getElementById("txtFileThuMucCha").value = strTemp[9];
        document.getElementById("txtFileTenForm").value = strTemp[1];
        document.getElementById("txtFileTenChucNang").value = strTemp[2];
        document.getElementById("txtFileTenThuMuc").value = strTemp[3];
        document.getElementById("chkDaKhoa").checked = strTemp[4];
        document.getElementById("chkDesktop").checked = strTemp[5];
        document.getElementById("cboIconFile").value = strTemp[10]; // alert(strTemp[10]);        

        pubIDF = strTemp[7];
    }
}

var pubF = "0";
function getThongTinThuMuc(idLCN) {
    var strIDLCN = "";
    strIDLCN = idLCN.toString();
    strIDLCN = strIDLCN.trim();

    if (strIDLCN.localeCompare("") === 0) {
        alert("Thông báo : \n\n\t Không xác định thông tin thư mục");
    }
    else {
        var url = "myFunction/funDesktop.jsp?caseName=getThongTinThuMuc&idLCN=" + idLCN;
        var res = show_data(url); //alert(res);

        var strTemp = res.split('<s>');
//        alert(strTemp[0] + " " + strTemp[1] + " " + strTemp[2] + " " + strTemp[3] + " " + strTemp[4] + " " + strTemp[5]);

        document.getElementById("txtThuMucCha").value = strTemp[5];

        document.getElementById("lblIDLCN").innerHTML = strTemp[0];
        document.getElementById("txtThuMuc").value = strTemp[1];
        document.getElementById("txtGhiChu").value = strTemp[2];

        var className = strTemp[3];
        $("#txtIconTM").removeClass().addClass(className);

        pubF = strTemp[4];
    }
}

var pubIDForm = "-";
function clickRoot() {
    $('#myRoot li a').click(function () {
//        //Test
//        alert("tag <a>: id: " + $(this).attr("id") + " || text: " + $(this).text());
//        alert("tag <span>: id: " + $(this).find('span').attr("id") + " || text: " + $(this).find('span').text());

        var strTen = $(this).find('span').text();

        var strID = " ";
        strID = $(this).find('span').attr("id");

        var strTemp = strID.split('||');
//          alert(strTemp[0] + " " + strTemp[1]  + " " + strTemp);

        //Chức năng
        if (isShowCN) {
            funHuyCN();

            if (strTemp.length > 1) {
                getThongTinChucNang(strTemp[0]);
            } else if (strTemp.length == 1 && strID.localeCompare("-101") !== 0) { // Thêm mới chức năng                
                pubIDF = strID;
                document.getElementById("txtFileThuMucCha").value = strTen;
            } else if (strTemp.length == 1 && strID.localeCompare("-101") === 0) { // Thêm mới chức năng                
                pubIDF = "-1";
                document.getElementById("txtFileThuMucCha").value = "";
//                alert("Chú ý : \n\n\t Không được phép xác định thư mục Root làm thư mục cha cho chức năng. Vui lòng chọn lại thư mục cha khác !");
            }
        }

        //Danh sách Thư mục
        if (isShowTM) {
//            alert("isShowTM: " + isShowTM + " || strID: " + strID + " || isEditTM: " + isEditTM + " || strTemp.length: " + strTemp.length);

            if (strTemp.length == 1 && strID.localeCompare("-101") !== 0 && isEditTM.localeCompare("add") !== 0) {
                resetNoiDungThuMuc();
                getThongTinThuMuc(strID);
            }
            else if (strTemp.length == 1 && strID.localeCompare("-101") !== 0 && isEditTM.localeCompare("add") === 0) {
                resetNoiDungThuMuc();
                document.getElementById("txtThuMucCha").value = strTen;
                isEditTM = "add";
                pubF = strID;
            }
        }

        //Nội dung Thư mục
        if (isShowPQ && strTemp.length > 1) {
            var url = "myFunction/funDesktop.jsp?caseName=getThongTinChucNang&idForm=" + strTemp[0];
            var res = show_data(url); //alert(res); 

            var strTemp = res.split('<s>');
//        alert("IDForm: " + strTemp[0] + " " + strTemp[1] + " " + strTemp[2] + " " + strTemp[3] + " " + strTemp[4] + " " + strTemp[5] 
//        + " " + strTemp[6] + " " + strTemp[7] + " " + strTemp[8] + " " + strTemp[9] + " " + strTemp[10]);

            document.getElementById("lblIDPQ").innerHTML = "-";
            document.getElementById("txtTenThuMucNV").value = strTemp[3];
            document.getElementById("txtTenChucNangNV").value = strTemp[2];
            isEditPQ = "add";
            pubIDForm = strTemp[0];
            enableChucNangPQ("luu");
        }
    });
}

function getListRoot() {
    var url = "myFunction/funDesktop.jsp?caseName=listRoot";
    var res = show_data(url); //alert(res);

    document.getElementById("myDropdown").innerHTML = res;
    $("#myDropdown").find('i').removeClass("fa-lg").addClass("fa-fw");

    clickRoot();
    enableNoiDungThuMuc(true);
}

function resetNoiDungChucNang(varTabName) {
    var tabName = "";
    tabName = varTabName;
    tabName = tabName.trim();
    if (tabName.localeCompare("") === 0) {
        document.getElementById("txtFileThuMucCha").value = "";
        pubIDF = "-1";
    }

    document.getElementById("lblIDFile").innerHTML = "-";

    document.getElementById("txtFileTenForm").value = "";
    document.getElementById("txtFileTenChucNang").value = "";
    document.getElementById("txtFileTenThuMuc").value = "";
    document.getElementById("cboIconFile").selectedIndex = 0;
    document.getElementById("chkDaKhoa").checked = false;
    document.getElementById("chkDesktop").checked = false;

    document.getElementById("txtFileTim").value = "";
    isEdit = "";
}

var pubIDF = "-1";
function noiDungChucNang() {
    resetNoiDungChucNang("");
    var table = document.getElementById('tbChucNang').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

//    var className = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 10) {

                aleft(tbChucNang);

                document.getElementById("lblIDFile").innerHTML = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[0].id;

                pubIDF = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[7].id;
                document.getElementById("txtFileThuMucCha").value = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[7].innerHTML;

                document.getElementById("txtFileTenForm").value = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("txtFileTenThuMuc").value = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("txtFileTenChucNang").value = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[3].innerHTML;

//                className = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].cells[4].innerHTML;
//                $("#txtIconFile").removeClass().addClass(className); document.getElementById("cboIconFile").value = strTemp[10];

                var td = document.getElementById("tbChucNang").rows[this.parentNode.rowIndex].getElementsByTagName("td");
                var chk5 = td[5].getElementsByTagName("input")[0];
                if (chk5 !== null && chk5.type === "checkbox")
                {
                    //alert(chk5.checked + " " + chk5.value);
                    document.getElementById("chkDaKhoa").checked = chk5.checked;
                } else
                {
                    document.getElementById("chkDaKhoa").checked = false;
                }

                var chk6 = td[6].getElementsByTagName("input")[0];
                if (chk6 !== null && chk6.type === "checkbox")
                {
                    //alert(chk6.checked + " " + chk6.value);
                    document.getElementById("chkDesktop").checked = chk6.checked;
                } else
                {
                    document.getElementById("chkDesktop").checked = false;
                }
            }

            isShowCN = false;
            funShowCN();
        };
    }
}

function isErrorThuMuc() {
    var strThuMuc = "";
    strThuMuc = document.getElementById("txtThuMuc").value;
    strThuMuc = strThuMuc.trim();

    var strThuMucCha = "";
    strThuMucCha = document.getElementById("txtThuMucCha").value;
    strThuMucCha = strThuMucCha.trim();


    var idLCN = document.getElementById("lblIDLCN").innerHTML;
    idLCN = idLCN.trim();

    var isError = false;
    if (isEditTM.localeCompare("") === 0) {
        isError = true;
    }
    else if (isEditTM.localeCompare("edit") === 0 && idLCN.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t Vui lòng chọn thư mục trước khi cập nhật thông tin.");
        isError = true;
    }
    else if (strThuMucCha.localeCompare("") === 0) { //pubIDF.localeCompare("-1") === 0 || 
        alert("Chú ý: \n\n\t Vui lòng xác định thư mục cha trước khi cập nhật thông tin.");
        isError = true;
    }
    else if (strThuMuc.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng nhập tên thư mục trước khi cập nhật thông tin.");
        isError = true;
    }


    return isError;
}

var isEditTM = "";
function funLuuTM() {
    if (isErrorThuMuc())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?" +
            "\n\n\n Chú ý: Tên thư mục cập nhật không được trùng với tên thư mục đã có."))
    {
        var idLCN = document.getElementById("lblIDLCN").innerHTML;

        var txtThuMuc = document.getElementById("txtThuMuc").value;
        var txtGhiChu = document.getElementById("txtGhiChu").value;
        var txtIcon = $("#txtIconTM").attr('class');

        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idF": pubF,
                "idLCN": idLCN,
                "txtThuMuc": txtThuMuc,
                "txtGhiChu": txtGhiChu,
                "txtIcon": txtIcon,
                "isEdit": isEditTM,
                "caseName": "updateThuMuc"
            },
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Cập nhật thành công.");
                    getListRoot();
                    isEditTM = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function resetNoiDungThuMuc() {
//    "add"
    document.getElementById("txtThuMucCha").value = "Root";
    pubF = "0"; // <-> Root

    document.getElementById("lblIDLCN").innerHTML = "-";
    document.getElementById("txtThuMuc").value = "";
    document.getElementById("txtGhiChu").value = "";
    $("#txtIconTM").removeClass().addClass("fa fa-folder fa-lg");
    document.getElementById("txtThuMucTim").value = "";
    isEditTM = "";
}

function funXoaTM() {
    var idLCN = document.getElementById("lblIDLCN").innerHTML;
    idLCN = idLCN.trim();
    if (idLCN.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn tên thư mục trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thư mục có mã ID: ''" + idLCN + "'' ?" +
            "\n\n\n Chú ý: Không được phép xóa thư mục khi đã sử dụng."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idLCN": idLCN,
                "caseName": "delThuMuc"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
                    funHuyTM();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function enableNoiDungThuMuc(isEnable) {
    document.getElementById("txtThuMucCha").disabled = true;
    document.getElementById("txtThuMuc").disabled = isEnable;
    document.getElementById("txtGhiChu").disabled = isEnable;

    if (isEnable) {
        $("#txtThuMuc").removeClass().addClass("txtInput");
        $("#txtGhiChu").removeClass().addClass("txtInput");
    }
    else {
        $("#txtThuMuc").removeClass("txtInput").addClass("txtEdit");
        $("#txtGhiChu").removeClass("txtInput").addClass("txtEdit");
    }
}

function funThemTM() {
    enableNoiDungThuMuc(false);
    resetNoiDungThuMuc();
    setFocusText("txtThuMuc");
    isEditTM = "add";
}

function funSuaTM() {
    var idLCN = document.getElementById("lblIDLCN").innerHTML;
    idLCN = idLCN.trim();

    if (idLCN.localeCompare("") === 0 || idLCN.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t Bạn chưa chọn thông tin thư mục. Vui lòng chọn thông tin thư mục trước khi sửa.");
        isEdit = "";
    } else
    {
        enableNoiDungThuMuc(false);
        setFocusText("txtThuMuc");
        isEditTM = "edit";
    }
}

function funHuyTM() {
    resetNoiDungThuMuc();
    getListRoot();
}

function funHuyCN() {
    enableNoiDungChucNang(true);
    resetNoiDungChucNang("");
}

function funXoaCN() {
    var idForm = document.getElementById("lblIDFile").innerHTML;
    idForm = idForm.trim();
    if (idForm.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn thông tin chức năng trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa chức năng có mã ID: ''" + idForm + "'' ?" +
            "\n\n\n Chú ý: Không được phép xóa chức năng khi đã sử dụng."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idForm": idForm,
                "caseName": "delChucNang"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
                    funHuyCN();
                    getListRoot();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function enableNoiDungChucNang(isEnable) {
    document.getElementById("txtFileThuMucCha").disabled = true;

    document.getElementById("txtFileTenForm").disabled = isEnable;
    document.getElementById("txtFileTenChucNang").disabled = isEnable;
    document.getElementById("txtFileTenThuMuc").disabled = isEnable;
    document.getElementById("chkDaKhoa").disabled = isEnable;
    document.getElementById("chkDesktop").disabled = isEnable;
    document.getElementById("cboIconFile").disabled = isEnable;

    if (isEnable) {
        $("#txtFileTenForm").removeClass().addClass("txtInput");
        $("#txtFileTenChucNang").removeClass().addClass("txtInput");
        $("#txtFileTenThuMuc").removeClass().addClass("txtInput");
    }
    else {
        $("#txtFileTenForm").removeClass("txtInput").addClass("txtEdit");
        $("#txtFileTenChucNang").removeClass("txtInput").addClass("txtEdit");
        $("#txtFileTenThuMuc").removeClass("txtInput").addClass("txtEdit");
    }
}

function funThemCN() {
    enableNoiDungChucNang(false);
    resetNoiDungChucNang("add");
    setFocusText("txtFileTenForm");
    isEdit = "add";
}

function funSuaCN() {
    var idForm = document.getElementById("lblIDFile").innerHTML;
    idForm = idForm.trim();

    if (idForm.localeCompare("") === 0 || idForm.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t Bạn chưa chọn thông tin chức năng. Vui lòng chọn thông tin chức năng trước khi sửa.");
        isEdit = "";
    } else
    {
        enableNoiDungChucNang(false);
        setFocusText("txtFileTenForm");
        isEdit = "edit";
    }
}

function isErrorChucNang() {
    var strThuMuc = "";
    strThuMuc = document.getElementById("txtFileThuMucCha").value;
    strThuMuc = strThuMuc.trim();

    var strenForm = "";
    strenForm = document.getElementById("txtFileTenForm").value;
    strenForm = strenForm.trim();

    var strTenThuMuc = "";
    strTenThuMuc = document.getElementById("txtFileTenThuMuc").value;
    strTenThuMuc = strTenThuMuc.trim();

    var strTenChucNang = "";
    strTenChucNang = document.getElementById("txtFileTenChucNang").value;
    strTenChucNang = strTenChucNang.trim();

    var idForm = document.getElementById("lblIDFile").innerHTML;
    idForm = idForm.trim();

    var isError = false;
    if (isEdit.localeCompare("") === 0) {
        isError = true;
    }
    else if (isEdit.localeCompare("edit") === 0 && idForm.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t Vui lòng chọn chức năng trước khi cập nhật thông tin.");
        isError = true;
    }
    else if (pubIDF.localeCompare("-1") === 0 || strThuMuc.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng xác định Thư mục cha trước khi cập nhật thông tin chức năng.");
        isError = true;
    }
    else if (strenForm.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng nhập Tên Form trước khi cập nhật thông tin.");
        isError = true;
    }
    else if (strTenThuMuc.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng nhập Tên thư mục trước khi cập nhật thông tin.");
        isError = true;
    }
    else if (strTenChucNang.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng nhập Tên chức năng trước khi cập nhật thông tin.");
        isError = true;
    }

    return isError;
}

var isEdit = "";
function funLuuCN() {
    if (isErrorChucNang())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?" +
            "\n\n\n Chú ý: Tên chức năng cập nhật không được trùng với tên chức năng đã có."))
    {
        var idForm = document.getElementById("lblIDFile").innerHTML;
        var txtTenForm = document.getElementById("txtFileTenForm").value;
        var txtTenChucNang = document.getElementById("txtFileTenChucNang").value;
        var txtTenThuMuc = document.getElementById("txtFileTenThuMuc").value;
        var txtIcon = document.getElementById("cboIconFile").value;

        var isDaKhoa = document.getElementById("chkDaKhoa").checked;
        var isDesktop = document.getElementById("chkDesktop").checked;

        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idLCN": pubIDF,
                "idForm": idForm,
                "txtTenForm": txtTenForm,
                "txtTenChucNang": txtTenChucNang,
                "txtTenThuMuc": txtTenThuMuc,
                "txtIcon": txtIcon,
                "isDaKhoa": isDaKhoa,
                "isDesktop": isDesktop,
                "isEdit": isEdit,
                "caseName": "updateChucNang"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Cập nhật thành công.");
                    isEdit = "";
                    getListRoot();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function isNotNumber(varNumber) {
    //isNaN() – Stands for “is Not a Number”, if variable is not a number, it return true, else return false.
    return isNaN(varNumber);
}

//function funTimPQ() {
//    var maNV = pubMaNV;
//    var txtFind = "";
//    txtFind = document.getElementById("txtFileTim").value;
//    txtFind = txtFind.trim();
//
////    alert(maNV +" "+ txtFind);
//
//    var url = "myFunction/funDesktop.jsp?caseName=phanQuyenTheoMaNV&maNV=" + maNV + "&txtFind=" + txtFind;
//    var res = show_data(url); //alert(res); 
//
//    document.getElementById("dsPhanQuyen").innerHTML = res;
//    hiddenNhanVien("tbPhanQuyen");
//}

function enableChucNangPQ(tabName) {
    document.getElementById("iLuuPQ").style.display = "none";
    document.getElementById("iXoaPQ").style.display = "none";

    var varTab = "";
    varTab = tabName.toString();
    varTab = varTab.trim().toLowerCase();
    if (varTab.localeCompare("luu") === 0) {
        document.getElementById("iLuuPQ").style.display = "block";
    } else if (varTab.localeCompare("xoa") === 0) {
        document.getElementById("iXoaPQ").style.display = "block";
    }
}

var isShowTM = false;
function funShowTM() {
    //Option
    document.getElementById("tbQLChucNang").style.display = "none";
    document.getElementById("hrChucNang").style.display = "none";

    isShowCN = false;
    funHuyCN();

    if (isShowTM) {
        document.getElementById("tbQLThuMuc").style.display = "none";
        document.getElementById("hrThuMuc").style.display = "none";

        isShowTM = false;
    }
    else {
        document.getElementById("tbQLThuMuc").style.display = "table";
        document.getElementById("hrThuMuc").style.display = "block";

        isShowTM = true;
        funHuyTM();
    }
}

var isShowCN = false;
function funShowCN() {
    //Folder
    document.getElementById("tbQLThuMuc").style.display = "none";
    document.getElementById("hrThuMuc").style.display = "none";

    isShowTM = false;
    funHuyTM();

    if (isShowCN) {
        document.getElementById("tbQLChucNang").style.display = "none";
        document.getElementById("hrChucNang").style.display = "none";

        isShowCN = false;
    }
    else {
        document.getElementById("tbQLChucNang").style.display = "table";
        document.getElementById("hrChucNang").style.display = "block";

        isShowCN = true;
        funHuyCN();
    }
}

function funTimTM() {
    var tenThuMuc = document.getElementById("txtThuMucTim").value;
    var url = "myFunction/funDesktop.jsp?caseName=timThuMucChucNang&tenThuMuc=" + tenThuMuc;
    var res = show_data(url); //alert(res);

    document.getElementById("myDropdown").innerHTML = res;
    $("#myDropdown").find('i').removeClass("fa-lg").addClass("fa-fw");

    clickRoot();
}

function getTreeNhanVien() {
    var url = "myFunction/funDesktop.jsp?caseName=treeNhanVien";
    var res = show_data(url); //alert(res);

    document.getElementById("nvDropdown").innerHTML = res;
    clickNhanVien();
}

function hiddenNhanVien(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[1].style.display = 'none';
        cels[4].style.display = 'none';
        cels[5].style.display = 'none';
        cels[6].style.display = 'none';
    }
}

var pubMaNV = "", pubMaDV = "", pubIDUser = "";
function clickNhanVien() {
    $('#nvRoot li a').click(function () {
//        //Test
//        alert("tag <a>: id: " + $(this).attr("id") + " || text: " + $(this).text());
//        alert("tag <span>: id: " + $(this).find('span').attr("id") + " || text: " + $(this).find('span').text());

        var strTen = $(this).find('span').text();
        var strID = $(this).find('span').attr("id");
//        alert(strTen + " " + strID);

        var strTemp = strID.split('||');
        if (strTemp.length > 1) {
//            alert("maDV : " + strTemp[0] + " maNV : "+ strTemp[1] + " " + strTemp);

            resetNoiDungPQ();
            isShowPQ = false;
            pubMaNV = strTemp[1];
            pubMaDV = strTemp[0];

            funShowPQ();
        }
    });
}

function getThongTinNhanVienPQ(varMaNV, varMaDV) {
    var maNV = "";
    maNV = varMaNV;
    maNV = maNV.trim();

    var maDV = "";
    maDV = varMaDV;
    maDV = maDV.trim();

//    alert(maNV + " " + maDV);
    if (maNV.localeCompare("") === 0 || maNV.localeCompare("-") === 0 || maDV.localeCompare("") === 0 || maDV.localeCompare("-") === 0) {
        return;
    }

    var url = "myFunction/funDesktop.jsp?caseName=thongTinNhanVien&maNV=" + maNV + "&maDV=" + maDV;
    var res = show_data(url); //alert(res);
    var strNV = res.split('<s>');
//          alert(strNV[0] + " " + strNV[1]  + " " + strTemp); 

    pubIDUser = strNV[0];
    pubMaNV = strNV[3];
    pubMaDV = strNV[5];

    document.getElementById("txtHoTenNV").value = strNV[4];
    document.getElementById("txtDonViNV").value = strNV[6];
    document.getElementById("chkAdminNV").checked = strNV[2];
}

function getDanhSachPQ(varMaNV) {
    var maNV = "";
    maNV = varMaNV;
    maNV = maNV.trim();

    var txtFind = "";
    var url = "myFunction/funDesktop.jsp?caseName=phanQuyenTheoMaNV&maNV=" + maNV + "&txtFind=" + txtFind;
    var res = show_data(url); //alert(res); 

    document.getElementById("dsPhanQuyen").innerHTML = res;
    hiddenNhanVien("tbPhanQuyen");
}

function resetNoiDungPQ() {
    document.getElementById("lblIDPQ").innerHTML = "-";
    document.getElementById("txtTenThuMucNV").value = "";
    document.getElementById("txtTenChucNangNV").value = "";

    isEditPQ = "";
}

var pubIDPQ = "-";
function getNoiDungPQ() {
    resetNoiDungPQ();
    var table = document.getElementById('tbPhanQuyen').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 7) {
                pubIDPQ = document.getElementById("tbPhanQuyen").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("lblIDPQ").innerHTML = pubIDPQ;

                document.getElementById("txtTenThuMucNV").value = document.getElementById("tbPhanQuyen").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("txtTenChucNangNV").value = document.getElementById("tbPhanQuyen").rows[this.parentNode.rowIndex].cells[3].innerHTML;

                isEditPQ = "";
                enableChucNangPQ("xoa");
            }
        };
    }
}

function funTimDV() {
    var tenNhap = document.getElementById("txtDonViTim").value;
    var url = "myFunction/funDesktop.jsp?caseName=timCayNhanVien&tenNhap=" + tenNhap;
    var res = show_data(url); //alert(res);

    document.getElementById("nvDropdown").innerHTML = res;
    clickNhanVien();
}

var isShowPQ = false;
function funShowPQ() {
    if (isShowPQ) {
        document.getElementById("txtHoTenNV").value = "";
        document.getElementById("txtDonViNV").value = "";
        document.getElementById("chkAdminNV").checked = false;

        pubIDPQ = "-";
        document.getElementById("lblIDPQ").innerHTML = "-";
        document.getElementById("txtTenThuMucNV").value = "";
        document.getElementById("txtTenChucNangNV").value = "";

        document.getElementById("tbQLPhanQuyen").style.display = "none";
        document.getElementById("hrPhanQuyen").style.display = "none";

        isEditPQ = "";
        isShowPQ = false;
    }
    else {
        document.getElementById("tbQLPhanQuyen").style.display = "table";
        document.getElementById("hrPhanQuyen").style.display = "block";

        isShowPQ = true;
        enableChucNangPQ("");

        // Lấy thông tin  Nhân viên        
        getThongTinNhanVienPQ(pubMaNV, pubMaDV);

        // Lấy danh sách phân quyền theo Nhân viên
        getDanhSachPQ(pubMaNV);
    }
}

var isEditPQ = "";
function funXoaPQ() {
    var idPQ = document.getElementById("lblIDPQ").innerHTML;
    idPQ = idPQ.trim();
    if (idPQ.localeCompare("-") === 0 || pubMaNV.localeCompare("") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải xác định thông tin người dùng và chọn nội dung phân quyền trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin phân quyền có mã ID: ''" + idPQ + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idPQ": idPQ,
                "caseName": "delPhanQuyen"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
//                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
                    resetNoiDungPQ();
                    getDanhSachPQ(pubMaNV);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funLuuPQ() {
    var idUser = "";
    var idForm = "";

    idUser = pubIDUser;
    idUser = idUser.trim();

    idForm = pubIDForm;
    idForm = idForm.trim();
    if (idUser.localeCompare("-") === 0 || idUser.localeCompare("") === 0 || idForm.localeCompare("-") === 0 || idForm.localeCompare("") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Bạn phải chọn chức năng và thông tin người dùng trước khi cấp quyền.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funDesktop.jsp",
            data: {
                "idUser": idUser,
                "idForm": idForm,
                "caseName": "addPhanQuyen"
            },
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull 
//                    alert("Thông báo kết quả: \n\n\t Cập nhật thành công.");
                    getDanhSachPQ(pubMaNV);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}