/* 
 Document   : jsHocSinh
 Created on : July 12, 2018, 2:40:31 PM
 Author     : Sol
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

function getThongTinLopHoc(maLop) {
    var strIDForm = "";
    strIDForm = maLop.toString();
    strIDForm = strIDForm.trim();

    if (strIDForm.localeCompare("") === 0) {
        alert("Thông báo : \n\n\t Không xác định thông tin chức năng");
    }
    else {
        var url = "myFunction/funDesktop.jsp?caseName=getThongTinLopHoc&maLop=" + maLop;
        var res = show_data(url); //alert(res);

        var strTemp = res.split('<s>');
//        alert(strTemp[0] + " " + strTemp[1] + " " + strTemp[2] + " " + strTemp[3] + " " + strTemp[4] + " " + strTemp[5] 
//        + " " + strTemp[6] + " " + strTemp[7] + " " + strTemp[8] + " " + strTemp[9] + " " + strTemp[10]);

        document.getElementById("lblMaLop").innerHTML = strTemp[0];
        document.getElementById("txtFileThuMucCha").value = strTemp[9];
        document.getElementById("txtFileTenForm").value = strTemp[1];
        document.getElementById("txtFileTenLopHoc").value = strTemp[2];
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

function loadDSDiemDanh(idBDK) {
    var url = "myFunction/funHocSinh.jsp?caseName=dsDiemDanh&idBDK=" + idBDK;
    var res = show_data(url); //alert(url); 
    document.getElementById("dsDiemDanh").innerHTML = res;
    hiddenDiemDanh("tbDiemDanh");
}

function loadDSSoLienLac(idBDK) {
    var url = "myFunction/funHocSinh.jsp?caseName=dsSoLienLac&idBDK=" + idBDK;
    var res = show_data(url); //alert(url); 
    document.getElementById("dsSoLienLac").innerHTML = res;
    hiddenSoLienLac("tbSoLienLac");
}

function loadDSSoKhamSucKhoe(idBDK) {
    var url = "myFunction/funHocSinh.jsp?caseName=dsKhamSucKhoe&idBDK=" + idBDK;
    var res = show_data(url); //alert(url); 
    document.getElementById("dsSoSucKhoe").innerHTML = res;
    hiddenSoKhamSucKhoe("tbSoSucKhoe");
}

function loadChiTietKham(idSTDSK) {
    var url = "myFunction/funHocSinh.jsp?caseName=dsBoPhanCoThe&idSTDSK=" + idSTDSK;
    var res = show_data(url); //alert(url); 
    document.getElementById("dsChiTietSK").innerHTML = res;
}

function loadDSPhuHuynh(msHS) {
//    alert(msHS);
    var inMSHS = "";
    inMSHS = msHS;
    inMSHS = inMSHS.trim();

    var res = "";
    if (inMSHS.localeCompare("-") === 0)
        res = "";
    else {
        var url = "myFunction/funHocSinh.jsp?caseName=dsPhuHuynh&msHS=" + inMSHS;
        res = show_data(url); //alert(url); 
    }

    document.getElementById("dsPhuHuynh").innerHTML = res;
//    hiddenSoKhamSucKhoe("tbPhuHuynh");
}


function loadDSChuNhiem(maNV) {
//    alert(msHS);
    var inMaNV = "";
    inMaNV = maNV;
    inMaNV = inMaNV.trim();

    var res = "";
    if (inMaNV.localeCompare("-") === 0)
        res = "";
    else {
        var url = "myFunction/funHocSinh.jsp?caseName=dsChuNhiem&maNV=" + inMaNV;
        res = show_data(url); //alert(url); 
    }

    document.getElementById("dsChuNhiem").innerHTML = res;
}

function setGiaoVien(maNV) {
//0 rs.getString("MaNV") + "<s>"
//1 rs.getString("HoTenNV") + "<s>"
//2 ngaySinh + "<s>"
//3 strGT + "<s>"
//4 rs.getString("DiaChi") + "<s>"
//5 rs.getString("SoDT") + "<s>"
//6 rs.getString("Email") + "<s>"
//7 rs.getString("CMND") + "<s>"
//8 rs.getString("ChucDanh") + "<s>"
//9 rs.getString("GhiChu");

    funHuyCNL();

    var strTemp = "";
    var res = "-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-";
    if (maNV.localeCompare("-1") !== 0) {
        var url = "myFunction/funHocSinh.jsp?caseName=infoGiaoVien&maNV=" + maNV;
        res = show_data(url); //alert(res); 
        strTemp = res.split('<s>');
    }
    else {
        strTemp = res.split('<s>');
        getListRoot("-11");
    }

    var inMaNV = strTemp[0];

    document.getElementById("lblMaNV").innerHTML = inMaNV;
    document.getElementById("txtHoTenNV").value = strTemp[1];
    document.getElementById("txtNgaySinhNV").value = strTemp[2];

    if (strTemp[3].toString().localeCompare("Nam") === 0 || strTemp[3].toString().localeCompare("nam") === 0)
        document.getElementById("cboGioiTinhNV").value = "true";
    else
        document.getElementById("cboGioiTinhNV").value = "false";

    document.getElementById("txtDiaChiNV").value = strTemp[4];
    document.getElementById("txtDienThoaiNV").value = strTemp[5];
    document.getElementById("txtGmailNV").value = strTemp[6];
    document.getElementById("txtChucDanhNV").value = strTemp[8];
    document.getElementById("txtGhiChuNV").value = strTemp[9];

    loadDSChuNhiem(inMaNV);
}

function setThongTin(idBDK) {
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
//16 rs.getString("IDLL");    

    var strTemp = "";
    var res = "-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-<s>-";
    if (idBDK.localeCompare("-1") !== 0) {
        var url = "myFunction/funHocSinh.jsp?caseName=infoHocSinhDangKy&idBDK=" + idBDK;
        res = show_data(url); //alert(res); 
        strTemp = res.split('<s>');
        getListRoot(strTemp[0]);
    }
    else {
        strTemp = res.split('<s>');
        getListRoot("-1");
    }

    var nameTab = "";
    nameTab = $('#tabsB').find('li').find('.selected').attr('id');
    nameTab = nameTab.toLowerCase();
//    alert("selectTabB: " + nameTab + " || idBDK: " + idBDK);
    switch (nameTab) {
        case "ahocsinh": //Thông tin Học sinh
            funHuyHS();
            var msHS = strTemp[2];
            document.getElementById("lblMSHS").innerHTML = msHS;
            document.getElementById("txtHoTenHS").value = strTemp[3];
            document.getElementById("txtTenTMHS").value = strTemp[4];
            document.getElementById("txtQuocTichHS").value = strTemp[13];
            document.getElementById("txtDiaChiHS").value = strTemp[7];
            document.getElementById("txtGhiChuHS").value = strTemp[12];
            document.getElementById("txtNgaySinhHS").value = strTemp[5];

            if (strTemp[6].toString().localeCompare("Nam") === 0 || strTemp[6].toString().localeCompare("nam") === 0)
                document.getElementById("cboGioiTinhHS").value = "true";
            else
                document.getElementById("cboGioiTinhHS").value = "false";

            loadDSPhuHuynh(msHS);
            break;
        case "adangky": //Bảng Đăng Ký
            funHuyBDK();

            document.getElementById("lblMSHS_BDK").innerHTML = strTemp[2];
            document.getElementById("txtHoTenHS_BDK").value = strTemp[3];
            document.getElementById("txtTenTMHS_BDK").value = strTemp[4];
            document.getElementById("txtNgaySinhHS_BDK").value = strTemp[5];

            if (strTemp[6].toString().localeCompare("Nam") === 0 || strTemp[6].toString().localeCompare("nam") === 0)
                document.getElementById("cboGioiTinhHS_BDK").value = "true";
            else
                document.getElementById("cboGioiTinhHS_BDK").value = "false";

            document.getElementById("txtDiaChiHS_BDK").value = strTemp[7];
            document.getElementById("txtGhiChuHS_BDK").value = strTemp[12];
            document.getElementById("txtQuocTichHS_BDK").value = strTemp[13];

//            alert("MaLop: " + strTemp[0].trim() + " || TenLop: " + strTemp[1] + " || LoaiLop: " + strTemp[16].trim() + " || Lop: " + strTemp[15] + " || HocKy: " + strTemp[14]);
            document.getElementById("lblIDBDK").innerHTML = strTemp[8];
            document.getElementById("cboLoaiLop_BDK").value = strTemp[16].trim();
            document.getElementById("cboLop_BDK").value = strTemp[15].trim();
            document.getElementById("cboHocKy_BDK").value = strTemp[14].trim();

            cboLopHocBDK(strTemp[0].trim());
//            document.getElementById("cboLopHoc_BDK").value = strTemp[0].trim(); 

            document.getElementById("txtNgayBD_BDK").value = strTemp[9];
            document.getElementById("txtNgayKT_BDK").value = strTemp[10];
            document.getElementById("txtGhiChu_BDK").value = strTemp[11];
            break;
        case "adiemdanh":
            document.getElementById("lblMSHS_DD").innerHTML = strTemp[2];
            document.getElementById("lblHoTenHS_DD").innerHTML = strTemp[3] + " || (" + strTemp[4] + ")";
            document.getElementById("lblNgaySinhHS_DD").innerHTML = strTemp[5];
            document.getElementById("lblGioiTinhHS_DD").innerHTML = strTemp[6];
            document.getElementById("lblDiaChiHS_DD").innerHTML = strTemp[7];

            document.getElementById("lblMaLop_DD").innerHTML = strTemp[0]
            document.getElementById("lblTenLop_DD").innerHTML = strTemp[1];
            document.getElementById("lblNgayBDBDK_DD").innerHTML = strTemp[9];
            document.getElementById("lblNgayKTBDK_DD").innerHTML = strTemp[10];

            //Nhật ký Điểm danh
            funHuyDD();
            loadDSDiemDanh(idBDK);
            break;
        case "asolienlac":
            document.getElementById("lblMSHS_SLL").innerHTML = strTemp[2];
            document.getElementById("lblHoTenHS_SLL").innerHTML = strTemp[3] + " || (" + strTemp[4] + ")";
            document.getElementById("lblNgaySinhHS_SLL").innerHTML = strTemp[5];
            document.getElementById("lblGioiTinhHS_SLL").innerHTML = strTemp[6];
            document.getElementById("lblDiaChiHS_SLL").innerHTML = strTemp[7];

            document.getElementById("lblMaLop_SLL").innerHTML = strTemp[0]
            document.getElementById("lblTenLop_SLL").innerHTML = strTemp[1];
            document.getElementById("lblNgayBDBDK_SLL").innerHTML = strTemp[9];
            document.getElementById("lblNgayKTBDK_SLL").innerHTML = strTemp[10];

            //Danh sach So Lien Lac
            funHuySLL();
            loadDSSoLienLac(idBDK);
            break;
        case "asosuckhoe":
            document.getElementById("lblMSHS_SK").innerHTML = strTemp[2];
            document.getElementById("lblHoTenHS_SK").innerHTML = strTemp[3] + " || (" + strTemp[4] + ")";
            document.getElementById("lblNgaySinhHS_SK").innerHTML = strTemp[5];
            document.getElementById("lblGioiTinhHS_SK").innerHTML = strTemp[6];
            document.getElementById("lblDiaChiHS_SK").innerHTML = strTemp[7];

            document.getElementById("lblMaLop_SK").innerHTML = strTemp[0]
            document.getElementById("lblTenLop_SK").innerHTML = strTemp[1];
            document.getElementById("lblNgayBDBDK_SK").innerHTML = strTemp[9];
            document.getElementById("lblNgayKTBDK_SK").innerHTML = strTemp[10];

            //Nhật ký Khám sức khỏe
            loadChiTietKham("-1");
            loadDSSoKhamSucKhoe(idBDK);
            funHuySK();
            break;
    }
}

function resetNoiDungBDK(isHocSinh) {
//    alert(isHocSinh);
    isEditBDK = "";
    getCurrentDateTime("txtNgayBD_BDK", null, null, null);
    tinhNgayKT("txtNgayBD_BDK", "txtNgayKT_BDK", 10);

    document.getElementById("cboLopHoc_BDK").selectedIndex = 0;
    document.getElementById("lblIDBDK").innerHTML = "-";
    document.getElementById("txtGhiChu_BDK").value = "...";

    if (isHocSinh) {// Nhật ký đăng ký Lớp học
        document.getElementById("cboLoaiLop_BDK").selectedIndex = 0;
        document.getElementById("cboLop_BDK").selectedIndex = 0;
        document.getElementById("cboHocKy_BDK").selectedIndex = 0;
    } else {// Danh sách Học sinh đăng ký Lớp học
        document.getElementById("lblMSHS_BDK").innerHTML = "-";
        document.getElementById("txtHoTenHS_BDK").value = "";
        document.getElementById("txtTenTMHS_BDK").value = "";

        document.getElementById("txtDiaChiHS_BDK").value = "";
        document.getElementById("txtGhiChuHS_BDK").value = "...";
        document.getElementById("txtQuocTichHS_BDK").value = "Việt Nam";
        document.getElementById("cboGioiTinhHS_BDK").selectedIndex = 0;
        getCurrentDateTime("txtNgaySinhHS_BDK", null, null, null);
    }
}

function enableNoiDungBangDangKy(isHocSinh, isEnable, isEditBDK) {
    document.getElementById("txtHoTenHS_BDK").disabled = isEnable;
    document.getElementById("txtTenTMHS_BDK").disabled = isEnable;
    document.getElementById("txtNgaySinhHS_BDK").disabled = isEnable;
    document.getElementById("cboGioiTinhHS_BDK").disabled = isEnable;
    document.getElementById("txtQuocTichHS_BDK").disabled = isEnable;
    document.getElementById("txtDiaChiHS_BDK").disabled = isEnable;
    document.getElementById("txtGhiChuHS_BDK").disabled = isEnable;
    document.getElementById("cboLoaiLop_BDK").disabled = isEnable;
    document.getElementById("cboLop_BDK").disabled = isEnable;
    document.getElementById("cboHocKy_BDK").disabled = isEnable;
    document.getElementById("cboLopHoc_BDK").disabled = isEnable;
    document.getElementById("txtNgayBD_BDK").disabled = isEnable;
    document.getElementById("txtNgayKT_BDK").disabled = isEnable;
    document.getElementById("txtGhiChu_BDK").disabled = isEnable;

    document.getElementById("picNgaySinhHS_BDK").style.visibility = "hidden";
    document.getElementById("picNgayBD_BDK").style.visibility = "hidden";
    document.getElementById("picNgayKT_BDK").style.visibility = "hidden";

    $("#cboLoaiLop_BDK").removeClass().addClass("txtInput");
    $("#cboLop_BDK").removeClass().addClass("txtInput");
    $("#cboHocKy_BDK").removeClass().addClass("txtInput");
    $("#cboLopHoc_BDK").removeClass().addClass("txtInput");
    $("#txtNgayBD_BDK").removeClass().addClass("txtInput");
    $("#txtNgayKT_BDK").removeClass().addClass("txtInput");
    $("#txtGhiChu_BDK").removeClass().addClass("txtInput");

    $("#txtHoTenHS_BDK").removeClass().addClass("txtInput");
    $("#txtTenTMHS_BDK").removeClass().addClass("txtInput");
    $("#txtNgaySinhHS_BDK").removeClass().addClass("txtInput");
    $("#cboGioiTinhHS_BDK").removeClass().addClass("txtInput");
    $("#txtQuocTichHS_BDK").removeClass().addClass("txtInput");
    $("#txtDiaChiHS_BDK").removeClass().addClass("txtInput");
    $("#txtGhiChuHS_BDK").removeClass().addClass("txtInput");

    var pubDisplay = "hidden";
    if (isHocSinh) {// Nhật ký đăng ký Lớp học
        document.getElementById("txtHoTenHS_BDK").disabled = true;
        document.getElementById("txtTenTMHS_BDK").disabled = true;
        document.getElementById("txtNgaySinhHS_BDK").disabled = true;
        document.getElementById("cboGioiTinhHS_BDK").disabled = true;
        document.getElementById("txtQuocTichHS_BDK").disabled = true;
        document.getElementById("txtDiaChiHS_BDK").disabled = true;
        document.getElementById("txtGhiChuHS_BDK").disabled = true;

        if (isEnable) {
            $("#cboLoaiLop_BDK").removeClass().addClass("txtInput");
            $("#cboLop_BDK").removeClass().addClass("txtInput");
            $("#cboHocKy_BDK").removeClass().addClass("txtInput");
            $("#cboLopHoc_BDK").removeClass().addClass("txtInput");
            $("#txtNgayBD_BDK").removeClass().addClass("txtInput");
            $("#txtNgayKT_BDK").removeClass().addClass("txtInput");
            $("#txtGhiChu_BDK").removeClass().addClass("txtInput");

            pubDisplay = "hidden";
        }
        else {
            $("#cboLoaiLop_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#cboLop_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#cboHocKy_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#cboLopHoc_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtNgayBD_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtNgayKT_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtGhiChu_BDK").removeClass("txtInput").addClass("txtEdit");

            pubDisplay = "visible";
        }

        if (isEditBDK.localeCompare("edit") === 0) {
            document.getElementById("cboLoaiLop_BDK").disabled = true;
            document.getElementById("cboLop_BDK").disabled = true;
            document.getElementById("cboHocKy_BDK").disabled = true;
            document.getElementById("cboLopHoc_BDK").disabled = true;

            $("#cboLoaiLop_BDK").removeClass().addClass("txtInput");
            $("#cboLop_BDK").removeClass().addClass("txtInput");
            $("#cboHocKy_BDK").removeClass().addClass("txtInput");
            $("#cboLopHoc_BDK").removeClass().addClass("txtInput");
        }

        document.getElementById("picNgayBD_BDK").style.visibility = pubDisplay;
        document.getElementById("picNgayKT_BDK").style.visibility = pubDisplay;
    }
    else { //Danh sách Học sinh theo Lớp học
        document.getElementById("cboLoaiLop_BDK").disabled = true;
        document.getElementById("cboLop_BDK").disabled = true;
        document.getElementById("cboHocKy_BDK").disabled = true;
        document.getElementById("cboLopHoc_BDK").disabled = true;
//        document.getElementById("txtNgayBD_BDK").disabled = true;
//        document.getElementById("txtNgayKT_BDK").disabled = true;
//        document.getElementById("txtGhiChu_BDK").disabled = true;

        if (isEnable) {
            $("#txtHoTenHS_BDK").removeClass().addClass("txtInput");
            $("#txtTenTMHS_BDK").removeClass().addClass("txtInput");
            $("#txtNgaySinhHS_BDK").removeClass().addClass("txtInput");
            $("#cboGioiTinhHS_BDK").removeClass().addClass("txtInput");
            $("#txtQuocTichHS_BDK").removeClass().addClass("txtInput");
            $("#txtDiaChiHS_BDK").removeClass().addClass("txtInput");
            $("#txtGhiChuHS_BDK").removeClass().addClass("txtInput");

            $("#txtNgayBD_BDK").removeClass().addClass("txtInput");
            $("#txtNgayKT_BDK").removeClass().addClass("txtInput");
            $("#txtGhiChu_BDK").removeClass().addClass("txtInput");

            pubDisplay = "hidden";
        }
        else {
            $("#txtHoTenHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtTenTMHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtNgaySinhHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#cboGioiTinhHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtQuocTichHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtDiaChiHS_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtGhiChuHS_BDK").removeClass("txtInput").addClass("txtEdit");

            $("#txtNgayBD_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtNgayKT_BDK").removeClass("txtInput").addClass("txtEdit");
            $("#txtGhiChu_BDK").removeClass("txtInput").addClass("txtEdit");

            pubDisplay = "visible";
        }

        document.getElementById("picNgaySinhHS_BDK").style.visibility = pubDisplay;
        document.getElementById("picNgayBD_BDK").style.visibility = pubDisplay;
        document.getElementById("picNgayKT_BDK").style.visibility = pubDisplay;
    }
}

function xemBangDangKy(isHocSinh) {
//    alert("isHocSinh: " + isHocSinh);
    var table = document.getElementById('tbBangDangKy').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var idBDK = "";
    if (isHocSinh) { // Nhật ký đăng ký Lớp học      
        var cells = table.getElementsByTagName('td');
        for (ix = 0; ix < cells.length; ix++) {
            cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
                if (this.cellIndex === 5) {
                    idBDK = document.getElementById("tbBangDangKy").rows[this.parentNode.rowIndex].cells[0].id;
                    setThongTin(idBDK);
                }
            }
        }
    }
    else { // Danh sách Học sinh đăng ký Lớp học                
        var cells = table.getElementsByTagName('td');
        for (ix = 0; ix < cells.length; ix++) {
            cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
                if (this.cellIndex === 5) {
                    idBDK = document.getElementById("tbBangDangKy").rows[this.parentNode.rowIndex].cells[0].id;
                    setThongTin(idBDK);
                }
            }
        }
    }
}

function loadBangDanhKy(isHocSinh, inID) {
//    alert("isHocSinh: " + isHocSinh + " || inID: " + inID);
    if (isHocSinh) { // Nhật ký đăng ký Lớp học
        document.getElementById("tbBangDangKy").innerHTML =
                "<thead class='th-normal'>"
                + " <tr>"
                + "         <th width='3%'>STT</th>"
                + "         <th width='20%'>Tên Lớp</th>"
                + "         <th width='5%'>Ngày BĐ</th>"
                + "         <th width='5%'>Ngày KT</th>"
                + "         <th width='45%'>Ghi chú</th>"
                + "         <th width='2%'></th>"
                + " </tr>"
                + "</thead>"
                + "<tbody id='dsBangDangKy' class='tr-normal'></tbody>";
    }
    else { // Danh sách Học sinh đăng ký Lớp học
        document.getElementById("tbBangDangKy").innerHTML =
                "<thead class='th-normal'>"
                + " <tr>"
                + "         <th width='3%'>STT</th>"
                + "         <th width='20%'>Họ Tên</th>"
                + "         <th width='5%'>Ngày sinh</th>"
                + "         <th width='5%'>Giới tính</th>"
                + "         <th width='45%'>Địa chỉ</th>"
                + "         <th width='2%'></th>"
                + " </tr>"
                + "</thead>"
                + "<tbody id='dsBangDangKy' class='tr-normal'></tbody>";
    }
    var url = "myFunction/funHocSinh.jsp?caseName=dsBangDangKy&inID=" + inID + "&isHocSinh=" + isHocSinh;
    var res = show_data(url); //alert(res);
    document.getElementById("dsBangDangKy").innerHTML = res;
}

var pubIsHocSinh = false, pubMaLopBDK = "", pubMSHS = "";
function clickRoot() {
    $('#myDropdown li a').click(function () {
//        //Test
//        alert("tag <a>: id: " + $(this).attr("id") + " || text: " + $(this).text());
//        alert("tag <span>: id: " + $(this).find('span').attr("id") + " || text: " + $(this).find('span').text());

        var maLop = "";
        maLop = $(this).find('span').attr("id");
//        alert("maLop: " + maLop + " || maLop.indexOf: " + maLop.indexOf("<s>"));
        if (maLop.indexOf("<s>") !== -1) { //Chọn thông tin Học sinh
            var strTemp = "";
            strTemp = maLop.split("<s>");  // alert("maLop: " + strTemp[0] + " || BDK: " + strTemp[1] + " || MSHS: " + strTemp[2]);
            pubIDBDK = strTemp[1];
            pubMSHS = strTemp[2];

            pubIsHocSinh = true;
            setThongTin(pubIDBDK);
            loadBangDanhKy(pubIsHocSinh, pubMSHS);
        }
        else {
//            alert("maLop: " + maLop + " || maLop.indexOf('<sos>'): " + maLop.indexOf("<sos>") + " || maLop.indexOf('-11'): " + maLop.indexOf("-11"));
//            return;

            if (maLop.indexOf("<sos>") !== -1) { //Nhân viên Kidschool
                var maNV = "";
                maNV = maLop.split("<sos>"); // alert("maNV: " + maNV[1]);
                setGiaoVien(maNV[1]);
            }
            else if (maLop.indexOf("-11") === -1) { //Chọn thông tin Tên Lớp Học
                var url = "myFunction/funHocSinh.jsp?caseName=infoLopHoc&maLop=" + maLop;
                var res = show_data(url); //alert(res); 
                var strTemp = res.split('<s>');
//        alert("MaLop: " + strTemp[0] + " \n TenLop: " + strTemp[1] + " \n GhiChu: " + strTemp[2] + " \n IDLop: " + strTemp[3] + " \n IDHK: " + strTemp[4] + " \n IDLL: " + strTemp[5]);

                document.getElementById("lblMaLop").innerHTML = strTemp[0];
                document.getElementById("txtTenLocHoc").value = strTemp[1];
                document.getElementById("txtGhiChu").value = strTemp[2];

                document.getElementById("cboLoaiLop").value = strTemp[5];
                document.getElementById("cboLop").value = strTemp[3];
                document.getElementById("cboHocKy").value = strTemp[4];

                var nameTab = "";
                nameTab = $('#tabsB').find('li').find('.selected').attr('id');
                nameTab = nameTab.toLowerCase();
                //alert("selectTabB: " + nameTab);
                switch (nameTab) {
                    case "adangky": //Bảng Đăng Ký                    
                        document.getElementById("cboLoaiLop_BDK").value = strTemp[5];
                        document.getElementById("cboLop_BDK").value = strTemp[3];
                        document.getElementById("cboHocKy_BDK").value = strTemp[4];

                        pubIsHocSinh = false;
                        pubMaLopBDK = strTemp[0];

                        resetNoiDungBDK(pubIsHocSinh);
                        document.getElementById("lblIDBDK").innerHTML = pubMaLopBDK;
                        cboLopHocBDK(pubMaLopBDK);
                        loadBangDanhKy(pubIsHocSinh, pubMaLopBDK);
                        break;
                }
                getListRoot(maLop);
            }
        }
    });
}

function getListRoot(maLop) {
//    alert(maLop);
    var url = "myFunction/funHocSinh.jsp?caseName=listRoot&maLop=" + maLop;
    var res = show_data(url); //alert(res);

    document.getElementById("myDropdown").innerHTML = res;
    $("#myDropdown").find('i').removeClass("fa-lg").addClass("fa-fw");

    clickRoot();
}

function setTenLopHoc() {
    var el = "";
    el = document.getElementById('cboHocKy');
    var strHK = el.options[el.selectedIndex].innerHTML;

    el = document.getElementById('cboLop');
    var strLop = el.options[el.selectedIndex].innerHTML;

    document.getElementById("txtTenLocHoc").value = strLop + " - HKỳ: " + strHK;
    document.getElementById("txtTenLocHoc").select();
}

function resetNoiDungLopHoc() {
    document.getElementById("cboLoaiLop").selectedIndex = 0;
    document.getElementById("cboLop").selectedIndex = 0;
    document.getElementById("cboHocKy").selectedIndex = 0;

    document.getElementById("lblMaLop").innerHTML = "-";
    document.getElementById("txtTenLocHoc").value = "";
    document.getElementById("txtGhiChu").value = "...";

    isEdit = "";

    setTenLopHoc();
}

var pubIDF = "-1";
function noiDungLopHoc() {
    resetNoiDungLopHoc();
    var table = document.getElementById('tbLopHoc').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 10) {

                document.getElementById("lblMaLop").innerHTML = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[0].id;

                pubIDF = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[7].id;
                document.getElementById("txtFileThuMucCha").value = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[7].innerHTML;

                document.getElementById("txtFileTenForm").value = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("txtFileTenThuMuc").value = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("txtFileTenLopHoc").value = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].cells[3].innerHTML;

                var td = document.getElementById("tbLopHoc").rows[this.parentNode.rowIndex].getElementsByTagName("td");
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
                    alert("Thông báo kết quả: \n\n\t Cập nhật thành công.");
                    getListRoot("-1");
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
    document.getElementById("txtGhiChu").value = "...";
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
                    alert("Thông báo kết quả: \n\n\t Đã xóa thành công.");
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
    getListRoot("-1");
}

function enableNoiDungDiemDanh(isEnable) {
    document.getElementById("txtNghiBD_DD").disabled = isEnable;
    document.getElementById("txtNghiKT_DD").disabled = true; // isEnable;
    document.getElementById("chkCoPhepNghi").disabled = isEnable;
    document.getElementById("txtSoNgayNghi_DD").disabled = isEnable;
    document.getElementById("txtGhiChu_DD").disabled = isEnable;

    document.getElementById("txtNgayLap_DD").disabled = isEnable;
    document.getElementById("cboGioLap_DD").disabled = isEnable;
    document.getElementById("cboPhutLap_DD").disabled = isEnable;

    var pubDisplay = "hidden";
    if (isEnable) {
        $("#txtNghiBD_DD").removeClass().addClass("txtInput");
        $("#txtSoNgayNghi_DD").removeClass().addClass("txtInput");
//        $("#txtNghiKT_DD").removeClass().addClass("txtInput");
        $("#chkCoPhepNghi").removeClass().addClass("txtInput");

        $("#txtGhiChu_DD").removeClass().addClass("txtInput");
        $("#txtNgayLap_DD").removeClass().addClass("txtInput");
        $("#cboGioLap_DD").removeClass().addClass("txtInput");
        $("#cboPhutLap_DD").removeClass().addClass("txtInput");

        pubDisplay = "hidden";
    }
    else {
        $("#txtNghiBD_DD").removeClass().addClass("txtEdit");
        $("#txtSoNgayNghi_DD").removeClass().addClass("txtEdit");
//        $("#txtNghiKT_DD").removeClass().addClass("txtEdit");
        $("#chkCoPhepNghi").removeClass().addClass("txtEdit");

        $("#txtGhiChu_DD").removeClass().addClass("txtEdit");
        $("#txtNgayLap_DD").removeClass().addClass("txtEdit");
        $("#cboGioLap_DD").removeClass().addClass("txtEdit");
        $("#cboPhutLap_DD").removeClass().addClass("txtEdit");

        pubDisplay = "visible";
    }

    document.getElementById("picNghiBD_DD").style.visibility = pubDisplay;
    document.getElementById("picNgayLap_DD").style.visibility = pubDisplay;
}

function enableNoiDungSoSucKhoe(isEnable) {
    $("#tbChiTietSK").prop("disabled", isEnable);

    var rows = document.getElementById('tbChiTietSK').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if (rows.length !== 0) {
        for (var i = 0; i < rows.length; i++)
        {
            var td = rows[i].getElementsByTagName("td");
            var chk = td[1].getElementsByTagName("textarea")[0];
//            alert("chk.id: " + chk.id + " || chk.type: " + chk.type);

            $("#" + chk.id).prop("disabled", isEnable);
            if (isEnable) {
                $("#" + chk.id).removeClass().addClass("txtInput");
            }
            else {
                $("#" + chk.id).removeClass().addClass("txtEdit");
            }
        }
    }

    document.getElementById("txtCanNang_SK").disabled = isEnable;
    document.getElementById("txtChieuCao_SK").disabled = isEnable;
    document.getElementById("txtKetLuan_SK").disabled = isEnable;

    document.getElementById("txtNgayGN_SK").disabled = isEnable;
    document.getElementById("cboGioLap_SK").disabled = isEnable;
    document.getElementById("cboPhutLap_SK").disabled = isEnable;

    var pubDisplay = "hidden";
    if (isEnable) {
        $("#txtCanNang_SK").removeClass().addClass("txtInput");
        $("#txtChieuCao_SK").removeClass().addClass("txtInput");
        $("#txtKetLuan_SK").removeClass().addClass("txtInput");

        $("#txtNgayGN_SK").removeClass().addClass("txtInput");
        $("#cboGioLap_SK").removeClass().addClass("txtInput");
        $("#cboPhutLap_SK").removeClass().addClass("txtInput");

        pubDisplay = "hidden";
    }
    else {
        $("#txtCanNang_SK").removeClass().addClass("txtEdit");
        $("#txtChieuCao_SK").removeClass().addClass("txtEdit");
        $("#txtKetLuan_SK").removeClass().addClass("txtEdit");

        $("#txtNgayGN_SK").removeClass().addClass("txtEdit");
        $("#cboGioLap_SK").removeClass().addClass("txtEdit");
        $("#cboPhutLap_SK").removeClass().addClass("txtEdit");

        pubDisplay = "visible";
    }

    document.getElementById("picNgayGN_SK").style.visibility = pubDisplay;
}

function enableNoiDungSoLienLac(isEnable) {
    document.getElementById("txtCanNang_SLL").disabled = isEnable;
    document.getElementById("txtChieuCao_SLL").disabled = isEnable;
    document.getElementById("txtGhiNhanGV").disabled = isEnable;
    document.getElementById("txtGhiNhanPH").disabled = isEnable;


    document.getElementById("txtNgayGN_SLL").disabled = isEnable;
    document.getElementById("cboGioLap_SLL").disabled = isEnable;
    document.getElementById("cboPhutLap_SLL").disabled = isEnable;
    document.getElementById("cboThang_SLL").disabled = isEnable;

    var pubDisplay = "hidden";
    if (isEnable) {
        $("#txtCanNang_SLL").removeClass().addClass("txtInput");
        $("#txtChieuCao_SLL").removeClass().addClass("txtInput");
        $("#txtGhiNhanGV").removeClass().addClass("txtInput");
        $("#txtGhiNhanPH").removeClass().addClass("txtInput");

        $("#txtNgayGN_SLL").removeClass().addClass("txtInput");
        $("#cboGioLap_SLL").removeClass().addClass("txtInput");
        $("#cboPhutLap_SLL").removeClass().addClass("txtInput");
        $("#cboThang_SLL").removeClass().addClass("txtInput");

        pubDisplay = "hidden";
    }
    else {
        $("#txtCanNang_SLL").removeClass().addClass("txtEdit");
        $("#txtChieuCao_SLL").removeClass().addClass("txtEdit");
        $("#txtGhiNhanGV").removeClass().addClass("txtEdit");
        $("#txtGhiNhanPH").removeClass().addClass("txtEdit");

        $("#txtNgayGN_SLL").removeClass().addClass("txtEdit");
        $("#cboGioLap_SLL").removeClass().addClass("txtEdit");
        $("#cboPhutLap_SLL").removeClass().addClass("txtEdit");
        $("#cboThang_SLL").removeClass().addClass("txtEdit");

        pubDisplay = "visible";
    }

    document.getElementById("picNgayGN_SLL").style.visibility = pubDisplay;
}

function enableNoiDungChuNhiem(isEnable) {
    document.getElementById("txtHoTenNV").disabled = true;
    document.getElementById("txtNgaySinhNV").disabled = true;
    document.getElementById("cboGioiTinhNV").disabled = true;
    document.getElementById("txtDiaChiNV").disabled = true;
    document.getElementById("txtGhiChuNV").disabled = true;

    document.getElementById("txtDienThoaiNV").disabled = true;
    document.getElementById("txtGmailNV").disabled = true;
    document.getElementById("txtChucDanhNV").disabled = true;

    document.getElementById("cboLoaiLop_CNL").disabled = isEnable;
    document.getElementById("cboLop_CNL").disabled = isEnable;
    document.getElementById("cboHocKy_CNL").disabled = isEnable;
    document.getElementById("cboLopHoc_CNL").disabled = isEnable;

    document.getElementById("txtNgayBD_CNL").disabled = isEnable;
    document.getElementById("txtNgayKT_CNL").disabled = isEnable;
    document.getElementById("txtGhiChu_CNL").disabled = isEnable;

    var pubDisplay = "hidden";
    if (isEnable) {
        $("#cboLoaiLop_CNL").removeClass().addClass("txtInput");
        $("#cboLop_CNL").removeClass().addClass("txtInput");
        $("#cboHocKy_CNL").removeClass().addClass("txtInput");
        $("#cboLopHoc_CNL").removeClass().addClass("txtInput");

        $("#txtNgayBD_CNL").removeClass().addClass("txtInput");
        $("#txtNgayKT_CNL").removeClass().addClass("txtInput");
        $("#txtGhiChu_CNL").removeClass().addClass("txtInput");

        pubDisplay = "hidden";
    }
    else {
        $("#cboLoaiLop_CNL").removeClass().addClass("txtEdit");
        $("#cboLop_CNL").removeClass().addClass("txtEdit");
        $("#cboHocKy_CNL").removeClass().addClass("txtEdit");
        $("#cboLopHoc_CNL").removeClass().addClass("txtEdit");

        $("#txtNgayBD_CNL").removeClass().addClass("txtEdit");
        $("#txtNgayKT_CNL").removeClass().addClass("txtEdit");
        $("#txtGhiChu_CNL").removeClass().addClass("txtEdit");

        pubDisplay = "visible";
    }

    document.getElementById("picNgayBD_CNL").style.visibility = pubDisplay;
    document.getElementById("picNgayKT_CNL").style.visibility = pubDisplay;
}

function enableNoiDungHocSinh(isEnable) {
    //    $( "#cboGioiTinhHS" ).prop( "disabled", isEnable );
    document.getElementById("txtHoTenHS").disabled = isEnable;
    document.getElementById("txtTenTMHS").disabled = isEnable;
    document.getElementById("txtQuocTichHS").disabled = isEnable;
    document.getElementById("txtDiaChiHS").disabled = isEnable;
    document.getElementById("txtGhiChuHS").disabled = isEnable;

    document.getElementById("cboGioiTinhHS").disabled = isEnable;
    document.getElementById("txtNgaySinhHS").disabled = isEnable;

    var pubDisplay = "hidden";
    if (isEnable) {
        $("#txtHoTenHS").removeClass().addClass("txtInput");
        $("#txtTenTMHS").removeClass().addClass("txtInput");
        $("#txtQuocTichHS").removeClass().addClass("txtInput");
        $("#txtDiaChiHS").removeClass().addClass("txtInput");
        $("#txtGhiChuHS").removeClass().addClass("txtInput");
        $("#cboGioiTinhHS").removeClass().addClass("txtInput");
        $("#txtNgaySinhHS").removeClass().addClass("txtInput");

        pubDisplay = "hidden";
    }
    else {
        $("#txtHoTenHS").removeClass().addClass("txtEdit");
        $("#txtTenTMHS").removeClass().addClass("txtEdit");
        $("#txtQuocTichHS").removeClass().addClass("txtEdit");
        $("#txtDiaChiHS").removeClass().addClass("txtEdit");
        $("#txtGhiChuHS").removeClass().addClass("txtEdit");
        $("#cboGioiTinhHS").removeClass().addClass("txtEdit");
        $("#txtNgaySinhHS").removeClass().addClass("txtEdit");

        pubDisplay = "visible";
    }

    document.getElementById("picNgaySinhHS").style.visibility = pubDisplay;
}

function hiddenDiemDanh(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[5].style.display = 'none';
        cels[6].style.display = 'none';
        cels[7].style.display = 'none';
        cels[8].style.display = 'none';
        cels[9].style.display = 'none';
    }
}

function hiddenSoLienLac(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[4].style.display = 'none';
        cels[5].style.display = 'none';
        cels[6].style.display = 'none';
        cels[7].style.display = 'none';
        cels[8].style.display = 'none';
        cels[9].style.display = 'none';
    }
}

function hiddenSoKhamSucKhoe(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[2].style.display = 'none';
        cels[3].style.display = 'none';
    }
}

function hiddenHocSinh(idTable) {
    var tbl = document.getElementById(idTable);
    var rows = tbl.getElementsByTagName('tr');
    //alert(rows.length.toString());
    for (var row = 1; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td');
        cels[2].style.display = 'none';
        cels[5].style.display = 'none';
        cels[6].style.display = 'none';
        cels[7].style.display = 'none';
    }
}

function funHuySK() {
    resetNoiDungSK();
    enableNoiDungSoSucKhoe(true);
}

function funHuyDD() {
    resetNoiDungDD();
    enableNoiDungDiemDanh(true);
}

function funHuySLL() {
    resetNoiDungSLL();
    enableNoiDungSoLienLac(true);
}

function funHuyHS() {
    resetNoiDungHS();
    enableNoiDungHocSinh(true);
}

function funHuyCNL() {
    resetNoiDungCNL();
    enableNoiDungChuNhiem(true);
}

var isEditDD = "";
function funThemDD() {
    resetNoiDungDD();
    enableNoiDungDiemDanh(false);
    setFocusText("txtNghiBD_DD");
    isEditDD = "add";
}
function isErrorDiemDanh() {
    var isError = false;
    if (isEditDD.localeCompare("") === 0) {
        isError = true;
    }
    else {
        var idXPN = document.getElementById("lblIDXPN").innerHTML;
        idXPN = idXPN.trim();

        if (isEditDD.localeCompare("edit") === 0 && idXPN.localeCompare("-") === 0) {
            alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
            isError = true;
        }
        else {
            var nghiBD = "";
            nghiBD = document.getElementById("txtNghiBD_DD").value;
            nghiBD = nghiBD.trim();

            var nghiKT = "";
            nghiKT = document.getElementById("txtNghiKT_DD").value;
            nghiKT = nghiKT.trim();

            var soNgayNghi = "";
            soNgayNghi = document.getElementById("txtSoNgayNghi_DD").value;
            soNgayNghi = soNgayNghi.trim();
            if (nghiBD.localeCompare("") === 0 || nghiKT.localeCompare("") === 0 || soNgayNghi.localeCompare("") === 0) {
                alert("Chú ý: \n\n\t Thông tin ''Ngày nghỉ BD - Ngày nghỉ KT - Số ngày nghỉ'' không được trống trước khi cập nhật.");
                isError = true;
            }
        }
    }

    return isError;
}

function funXoaDD() {
    var idXPN = document.getElementById("lblIDXPN").innerHTML;
    idXPN = idXPN.trim();
    if (idXPN.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + idXPN + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idXPN": idXPN,
                "caseName": "delDiemDanh"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull                    
                    loadDSDiemDanh(pubIDBDK);
                    funHuyDD();
                    isEditDD = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoaBDK() {
    var idBDK = document.getElementById("lblIDBDK").innerHTML;
    idBDK = idBDK.trim();
    if (idBDK.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + idBDK + "'' ? \n\n\ Chú ý: Thông tin Học sinh sẽ bị xóa khi xoa ?????"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "isHocSinh": pubIsHocSinh,
                "idBDK": idBDK,
                "caseName": "delBangDangKy"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull     
                    if (pubIsHocSinh) {// Nhật ký đăng ký Lớp học
                        loadBangDanhKy(pubIsHocSinh, pubMSHS);
                    }
                    else {// Danh sách Học sinh đăng ký Lớp học                        
                        loadBangDanhKy(pubIsHocSinh, pubMaLopBDK);
                        getListRoot(pubMaLopBDK);
                    }
                    funHuyBDK();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funHuyBDK() {
    resetNoiDungBDK(pubIsHocSinh);
    enableNoiDungBangDangKy(pubIsHocSinh, true, "");
}

function funLuuBDK() {
    if (isErrorBangDangKy())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        var inMaLop = document.getElementById("cboLopHoc_BDK").value;
        var msHS = document.getElementById("lblMSHS_BDK").innerHTML;

        var inID = document.getElementById("lblIDBDK").innerHTML;
        var ngayBD = document.getElementById("txtNgayBD_BDK").value;
        var ngayKT = document.getElementById("txtNgayKT_BDK").value;
        var ghiChu = document.getElementById("txtGhiChu_BDK").value;

        var hoTen = document.getElementById("txtHoTenHS_BDK").value;
        var tenThanMat = document.getElementById("txtTenTMHS_BDK").value;
        var ngaySinh = document.getElementById("txtNgaySinhHS_BDK").value;
        var gioiTinh = document.getElementById("cboGioiTinhHS_BDK").value;
        var quocTich = document.getElementById("txtQuocTichHS_BDK").value;
        var diaChi = document.getElementById("txtDiaChiHS_BDK").value;
        var ghiChuHS = document.getElementById("txtGhiChuHS_BDK").value;

//        alert("isHocSinh: " + pubIsHocSinh + " || msHS: " + msHS + " || inMaLop: " + inMaLop);
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "isHocSinh": pubIsHocSinh,
                "msHS": msHS,
                "inMaLop": inMaLop,
                "inID": inID,
                "ngayBD": ngayBD,
                "ngayKT": ngayKT,
                "ghiChu": ghiChu,
                "hoTen": hoTen,
                "tenThanMat": tenThanMat,
                "ngaySinh": ngaySinh,
                "gioiTinh": gioiTinh,
                "quocTich": quocTich,
                "diaChi": diaChi,
                "ghiChuHS": ghiChuHS,
                "isEdit": isEditBDK,
                "caseName": "updateBangDangKy"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull      
                    if (pubIsHocSinh) {// Nhật ký đăng ký Lớp học
                        loadBangDanhKy(pubIsHocSinh, pubMSHS);
                    }
                    else {// Danh sách Học sinh đăng ký Lớp học
                        loadBangDanhKy(pubIsHocSinh, pubMaLopBDK);
                        getListRoot(pubMaLopBDK);
                    }

                    funHuyBDK();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

var isEditCNL = "";
function funThemCNL() {
    resetNoiDungCNL();

    isEditCNL = "add";
    enableNoiDungChuNhiem(false);
    setFocusText("txtNgayBD_CNL");
}

function funSuaCNL() {
    var idCNL = document.getElementById("lblIDCNL").innerHTML;
    idCNL = idCNL.trim();
    if (idCNL.localeCompare("") === 0 || idCNL.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi sửa.");
        return;
    } else {
        isEditCNL = "edit";
        enableNoiDungChuNhiem(false);
        setFocusText("txtNgayBD_CNL");
    }
}

function funXoaCNL() {
    var maNV = document.getElementById("lblMaNV").innerHTML;
    maNV = maNV.trim();

    var idCNL = document.getElementById("lblIDCNL").innerHTML;
    idCNL = idCNL.trim();
    if (idCNL.localeCompare("-") === 0 || maNV.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

//    alert("maNV: " + maNV + " || idCNL: " + idCNL);    
    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + idCNL + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idCNL": idCNL,
                "maNV": maNV,
                "caseName": "delChuNhiem"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull         
                    funHuyCNL();
                    loadDSChuNhiem(maNV);
                    isEditCNL = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function isErrorChuNhiem() {
    var isError = false; //alert(isEditCNL);
    if (isEditCNL.localeCompare("") === 0) {
        isError = true;
    }
    else {
        var idCNL = document.getElementById("lblIDCNL").innerHTML;
        idCNL = idCNL.trim();

        if (isEditCNL.localeCompare("edit") === 0 && idCNL.localeCompare("-") === 0) {
            alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
            isError = true;
        }
        else {
            idCNL = document.getElementById("cboLopHoc_CNL").value;
            idCNL = idCNL.trim(); //alert(idCNL);

            var ngayBD = "";
            ngayBD = document.getElementById("txtNgayBD_CNL").value;
            ngayBD = ngayBD.trim();

            var ngayKT = "";
            ngayKT = document.getElementById("txtNgayKT_CNL").value;
            ngayKT = ngayKT.trim();

            if (ngayBD.localeCompare("") === 0 || ngayKT.localeCompare("") === 0 || idCNL.localeCompare("") === 0) {
                alert("Chú ý: \n\n\t Thông tin ''Lớp Học - Ngày Bắt đầu - Ngày Kết thúc'' không được trống trước khi cập nhật.");
                isError = true;
            }
        }
    }
    return isError;
}

function funLuuCNL() {
    if (isErrorChuNhiem())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        var maNV = document.getElementById("lblMaNV").innerHTML;
        maNV = maNV.trim();

        var idCNL = document.getElementById("cboLopHoc_CNL").value;
        idCNL = idCNL.trim();

        var ngayBD = document.getElementById("txtNgayBD_CNL").value;
        var ngayKT = document.getElementById("txtNgayKT_CNL").value;
        var ghiChu = document.getElementById("txtGhiChu_CNL").value;
//        alert(maNV + " " + idCNL + " " + ngayBD + " " + " " + ngayKT + " " + ghiChu + " " + isEditCNL);
//        return;

        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "maNV": maNV,
                "idCNL": idCNL,
                "ngayBD": ngayBD,
                "ngayKT": ngayKT,
                "ghiChu": ghiChu,
                "isEdit": isEditCNL,
                "caseName": "updateChuNhiem"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    isEditCNL = "";
                    loadDSChuNhiem(maNV);
                    enableNoiDungChuNhiem(true);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

var isEditBDK = "";
function funThemBDK() {
    resetNoiDungBDK(pubIsHocSinh);
    document.getElementById("lblIDBDK").innerHTML = pubMaLopBDK;
    isEditBDK = "add";
    enableNoiDungBangDangKy(pubIsHocSinh, false, isEditBDK);

    if (pubIsHocSinh)
        setFocusText("txtNgayBD_BDK");
    else
        setFocusText("txtHoTenHS_BDK");
}

var isEditSK = "";
function funThemSK() {
    resetNoiDungSK();
    enableNoiDungSoSucKhoe(false);
    setFocusText("txtCanNang_SK");
    isEditSK = "add";
}

var isEditSLL = "";
function funThemSLL() {
    resetNoiDungSLL();
    enableNoiDungSoLienLac(false);
    setFocusText("txtCanNang_SLL");
    isEditSLL = "add";
}

function isErrorBangDangKy() {
    var isError = false;
    if (isEditBDK.localeCompare("") === 0) {
        isError = true;
    }
    else {
        var inID = document.getElementById("lblIDBDK").innerHTML;
        inID = inID.trim();

        if (isEditBDK.localeCompare("edit") === 0 && inID.localeCompare("-") === 0) {
            alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
            isError = true;
        }
        else {
            var hoTen = "";
            hoTen = document.getElementById("txtHoTenHS_BDK").value;
            hoTen = hoTen.trim();

            if (hoTen.localeCompare("") === 0 || hoTen.localeCompare("") === 0 || hoTen.localeCompare("") === 0) {
                alert("Chú ý: \n\n\t Thông tin ''Họ tên học sinh'' không được trống trước khi cập nhật.");
                isError = true;
            }
        }
    }
    return isError;
}

function isErrorSoLienLac() {
    var isError = false;
    if (isEditSLL.localeCompare("") === 0) {
        isError = true;
    }
    else {
        var idSLL = document.getElementById("lblIDSLL").innerHTML;
        idSLL = idSLL.trim();

        if (isEditSLL.localeCompare("edit") === 0 && idSLL.localeCompare("-") === 0) {
            alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
            isError = true;
        }
        else {
            var strCC = "";
            strCC = document.getElementById("txtChieuCao_SLL").value;
            strCC = strCC.trim();

            var strCN = "";
            strCN = document.getElementById("txtCanNang_SLL").value;
            strCN = strCN.trim();

            var strGNGV = "";
            strGNGV = document.getElementById("txtGhiNhanGV").value;
            strGNGV = strGNGV.trim();
            if (strCC.localeCompare("") === 0 || strCN.localeCompare("") === 0 || strGNGV.localeCompare("") === 0) {
                alert("Chú ý: \n\n\t Thông tin ''Chiều Cao - Cân Nặng - Đánh giá'' không được trống trước khi cập nhật.");
                isError = true;
            }
        }
    }
    return isError;
}


function funXoaSLL() {
    var idSLL = document.getElementById("lblIDSLL").innerHTML;
    idSLL = idSLL.trim();
    if (idSLL.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + idSLL + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idSLL": idSLL,
                "caseName": "delSoLienLac"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull                    
                    loadDSSoLienLac(pubIDBDK);
                    funHuySLL();
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funXoaSK() {
    var idSTDSK = document.getElementById("lblIDSTDSK").innerHTML;
    idSTDSK = idSTDSK.trim();
    if (idSTDSK.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + idSTDSK + "'' ?"))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idSTDSK": idSTDSK,
                "caseName": "delKhamSucKhoe"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull                    
                    loadDSSoKhamSucKhoe(pubIDBDK);
                    funHuySK();
                    isEditSK = "";
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funLuuSLL() {
    if (isErrorSoLienLac())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        var ngayGN = document.getElementById("txtNgayGN_SLL").value + " " + document.getElementById("cboGioLap_SLL").value + ":" + document.getElementById("cboPhutLap_SLL").value;

        var idSLL = document.getElementById("lblIDSLL").innerHTML;
        var inThang = document.getElementById("cboThang_SLL").value;
        var canNang = document.getElementById("txtCanNang_SLL").value;
        var chieuCao = document.getElementById("txtChieuCao_SLL").value;
        var ghiNhanGV = document.getElementById("txtGhiNhanGV").value;
        var ghiNhanPH = document.getElementById("txtGhiNhanPH").value;
//        alert(idSLL + " " + pubMaNV + " " + ngayGN + " " + " " + inThang + " " + canNang + " " + chieuCao + " " + ghiNhanGV + " " + ghiNhanPH + " " + isEditSLL); return;

        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idBDK": pubIDBDK,
                "idSLL": idSLL,
                "maNV": pubMaNV,
                "inThang": inThang,
                "ngayGN": ngayGN,
                "canNang": canNang,
                "chieuCao": chieuCao,
                "ghiNhanGV": ghiNhanGV,
                "ghiNhanPH": ghiNhanPH,
                "isEdit": isEditSLL,
                "caseName": "updateSoLienLac"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    isEditSLL = "";
                    loadDSSoLienLac(pubIDBDK);
                    enableNoiDungSoLienLac(true);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function isErrorKhamSucKhoe() {
    var isError = false;
    if (isEditSK.localeCompare("") === 0) {
        isError = true;
    }
    else {
        var idSTDSK = document.getElementById("lblIDSTDSK").innerHTML;
        idSTDSK = idSTDSK.trim();

        if (isEditSK.localeCompare("edit") === 0 && idSTDSK.localeCompare("-") === 0) {
            alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
            isError = true;
        }
        else {
            var strCC = "";
            strCC = document.getElementById("txtChieuCao_SK").value;
            strCC = strCC.trim();

            var strCN = "";
            strCN = document.getElementById("txtCanNang_SK").value;
            strCN = strCN.trim();

            var strKetLuan = "";
            strKetLuan = document.getElementById("txtKetLuan_SK").value;
            strKetLuan = strKetLuan.trim();
            if (strCC.localeCompare("") === 0 || strCN.localeCompare("") === 0 || strKetLuan.localeCompare("") === 0) {
                alert("Chú ý: \n\n\t Thông tin ''Chiều Cao - Cân Nặng - K.luận và C.dẫn'' không được trống trước khi cập nhật.");
                isError = true;
            }
        }
    }
    return isError;
}

function funLuuSK() {
    if (isErrorKhamSucKhoe())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        var idSTDSK = document.getElementById("lblIDSTDSK").innerHTML;
        var canNang = document.getElementById("txtCanNang_SK").value;
        var chieuCao = document.getElementById("txtChieuCao_SK").value;
        var ketLuan = document.getElementById("txtKetLuan_SK").value;
        var ngayLap = document.getElementById("txtNgayGN_SK").value + " " + document.getElementById("cboGioLap_SK").value + ":" + document.getElementById("cboPhutLap_SK").value;

        var listNDKham = "";
        var rows = document.getElementById('tbChiTietSK').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        if (rows.length !== 0) {
            for (var i = 0; i < rows.length; i++)
            {
                var td = rows[i].getElementsByTagName("td");
                var chk = td[1].getElementsByTagName("textarea")[0];
                listNDKham = listNDKham + td[1].id + "<s>" + $("#" + chk.id).val() + "<sol>";
                //  alert("chk.id: " + chk.id + " || chk.type: " + chk.type);
            }
        }
//        alert("listNDKham: " + listNDKham + " \n pubIDBDK: " + pubIDBDK + " \n idSTDSK: " + idSTDSK + " \n pubMaNVLap: " + pubMaNVLap + " \n pubMaBSSK: " + pubMaBSSK 
//                + " \n ngayLap: " + ngayLap + " \n canNang: " + canNang + " \n chieuCao: " + chieuCao + " \n ketLuan: " + ketLuan + " \n isEditSK: " + isEditSK);
//        return;

        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idBDK": pubIDBDK,
                "idSTDSK": idSTDSK,
                "listNDKham": listNDKham,
                "maNVLap": pubMaNVLap,
                "maNVKetLuan": pubMaBSSK,
                "ngayLap": ngayLap,
                "canNang": canNang,
                "chieuCao": chieuCao,
                "ketLuan": ketLuan,
                "isEdit": isEditSK,
                "caseName": "updateKhamSucKhoe"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    isEditSK = "";
                    loadDSSoKhamSucKhoe(pubIDBDK)
                    enableNoiDungSoSucKhoe(true);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function funLuuDD() {
    if (isErrorDiemDanh())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?"))
    {
        var ngayGN = document.getElementById("txtNgayLap_DD").value + " " + document.getElementById("cboGioLap_DD").value + ":" + document.getElementById("cboPhutLap_DD").value;

        var idXPN = document.getElementById("lblIDXPN").innerHTML;
        var ngayBD = document.getElementById("txtNghiBD_DD").value;
        var ngayKT = document.getElementById("txtNghiKT_DD").value;
        var ghiChu = document.getElementById("txtGhiChu_DD").value;
        var isPhep = document.getElementById("chkCoPhepNghi").checked;
//        alert(pubIDBDK + " " + idXPN + " " + ngayBD + " " + " " + ngayKT + " " + ghiChu + " " + isPhep + " " + isEditDD); return;

        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idBDK": pubIDBDK,
                "idXPN": idXPN,
                "maNV": pubMaNV,
                "ngayGN": ngayGN,
                "ngayBD": ngayBD,
                "ngayKT": ngayKT,
                "isPhep": isPhep,
                "ghiChu": ghiChu,
                "isEdit": isEditDD,
                "caseName": "updateDiemDanh"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    isEditDD = "";
                    loadDSDiemDanh(pubIDBDK);
                    enableNoiDungDiemDanh(true);
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

//function funThemHS() {
//    resetNoiDungHS();
//    enableNoiDungHocSinh(false);
//
//    setFocusText("txtHoTenHS");
//    isEditHS = "add";
//}

function funHuyCN() {
    enableNoiDungLopHoc(true, 'cancel');
    resetNoiDungLopHoc();
}

function funXoaCN() {
    var maLop = document.getElementById("lblMaLop").innerHTML;
    maLop = maLop.trim();
    if (maLop.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi xóa.");
        return;
    }

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn xóa thông tin có mã: ''" + maLop + "'' ?" +
            "\n\n\n Chú ý: Không xóa thông tin Lớp học khi đã sử dụng."))
    {
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "maLop": maLop,
                "caseName": "delLopHoc"
            },
            success: function (data) {
                var result = "";
                result = data.trim(); //alert(result);
                if (!isNotNumber(result)) { //Successfull
                    funHuyCN();
                    getListRoot("-1");
                } else {
                    alert("Thông báo kết quả: \n\n\t " + result);
                }
            }
        });
    }
}

function enableNoiDungLopHoc(isEnable, nameTab) {
//    $( "#cboLoaiLop" ).prop( "disabled", isEnable );
    var strTab = "";
    strTab = nameTab;
    strTab = strTab.toLowerCase();

    if (strTab.localeCompare("edit") === 0) {
        document.getElementById("cboLoaiLop").disabled = true;
        document.getElementById("cboLop").disabled = true;
        document.getElementById("cboHocKy").disabled = true;
    }
    else {
        document.getElementById("cboLoaiLop").disabled = isEnable;
        document.getElementById("cboLop").disabled = isEnable;
        document.getElementById("cboHocKy").disabled = isEnable;
    }

    document.getElementById("txtTenLocHoc").disabled = isEnable;
    document.getElementById("txtGhiChu").disabled = isEnable;

    if (isEnable) {
        $("#txtTenLocHoc").removeClass().addClass("txtInput");
        $("#txtGhiChu").removeClass().addClass("txtInput");
    }
    else {
        $("#txtTenLocHoc").removeClass("txtInput").addClass("txtEdit");
        $("#txtGhiChu").removeClass("txtInput").addClass("txtEdit");
    }
}

function funThemCN() {
    enableNoiDungLopHoc(false, 'add');
    resetNoiDungLopHoc();
    setFocusText("txtTenLocHoc");
    isEdit = "add";
}

function funSuaDD() {
    var idXPN = document.getElementById("lblIDXPN").innerHTML;
    idXPN = idXPN.trim();
    if (idXPN.localeCompare("") === 0 || idXPN.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t\t\t\t Vui lòng chọn thông tin trước khi sửa.");
        isEditDD = "";
    } else
    {
        enableNoiDungDiemDanh(false);
        setFocusText("txtNghiBD_DD");
        isEditDD = "edit";
    }
}

function funSuaSK() {
    var idSTDSK = document.getElementById("lblIDSTDSK").innerHTML;
    idSTDSK = idSTDSK.trim();

    if (idSTDSK.localeCompare("") === 0 || idSTDSK.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t\t\t\t Vui lòng chọn thông tin trước khi sửa.");
        isEditSK = "";
    } else
    {
        enableNoiDungSoSucKhoe(false);
        setFocusText("txtCanNang_SK");
        isEditSK = "edit";
    }
}

function funSuaSLL() {
    var idSLL = document.getElementById("lblIDSLL").innerHTML;
    idSLL = idSLL.trim();

    if (idSLL.localeCompare("") === 0 || idSLL.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t\t\t\t Vui lòng chọn thông tin trước khi sửa.");
        isEditSLL = "";
    } else
    {
        enableNoiDungSoLienLac(false);
        setFocusText("txtCanNang_SLL");
        isEditSLL = "edit";
    }
}

function funSuaCN() {
    var maLop = document.getElementById("lblMaLop").innerHTML;
    maLop = maLop.trim();

    if (maLop.localeCompare("") === 0 || maLop.localeCompare("-") === 0) {
        alert("Thông báo lỗi: \n\n\t\t\t\t Vui lòng chọn thông tin trước khi sửa.");
        isEdit = "";
    } else
    {
        enableNoiDungLopHoc(false, 'edit');
        setFocusText("txtTenLocHoc");
        isEdit = "edit";
    }
}

function funSuaBDK() {
    var idBDK = document.getElementById("lblIDBDK").innerHTML;
    idBDK = idBDK.trim();
    if (idBDK.localeCompare("") === 0 || idBDK.localeCompare("-") === 0) {
        alert("Thông báo chú ý: \n\n\t\t Vui lòng chọn thông tin trước khi sửa.");
        return;
    } else {
        isEditBDK = "edit";
        enableNoiDungBangDangKy(pubIsHocSinh, false, isEditBDK);

        if (pubIsHocSinh) // Nhật ký đăng ký Lớp học
            setFocusText("txtNgayBD_BDK");
        else // Danh sách Học sinh đăng ký Lớp học
            setFocusText("txtHoTenHS_BDK");
    }
}

function isErrorLopHoc() {
    var strTLH = "";
    strTLH = document.getElementById("txtTenLocHoc").value;
    strTLH = strTLH.trim();

    var maLop = document.getElementById("lblMaLop").innerHTML;
    maLop = maLop.trim();

    var isError = false;
    if (isEdit.localeCompare("") === 0) {
        isError = true;
    }
    else if (isEdit.localeCompare("edit") === 0 && maLop.localeCompare("-") === 0) {
        alert("Chú ý: \n\n\t Vui lòng chọn thông tin trước khi cập nhật.");
        isError = true;
    }
    else if (strTLH.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Vui lòng nhập Tên lớp học trước khi cập nhật.");
        isError = true;
    }

    return isError;
}

var isEdit = "";
function funLuuCN() {
    if (isErrorLopHoc())
        return;

    if (confirm("Xác nhận yêu cầu : \n\n\t\t Bạn thật sự muốn cập nhật thông tin trên ?" +
            "\n\n\n Chú ý: Tên lớp học không được trùng với tên đã có."))
    {
        var idHK = document.getElementById("cboHocKy").value;
        var idLop = document.getElementById("cboLop").value;
        var maLop = document.getElementById("lblMaLop").innerHTML;
        var TenLH = document.getElementById("txtTenLocHoc").value;
        var ghiChu = document.getElementById("txtGhiChu").value;
//        alert(idHK + " " + idLop + " " + maLop + " " + TenLH + " " + ghiChu + " " + isEdit); return;

        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh.jsp",
            data: {
                "idHK": idHK,
                "idLop": idLop,
                "maLop": maLop,
                "tenLop": TenLH,
                "ghiChu": ghiChu,
                "isEdit": isEdit,
                "caseName": "updateLopHoc"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (!isNotNumber(result)) { //Successfull
                    isEdit = "";
                    getListRoot("-1");
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

function funTimPQ() {
    var maNV = pubMaNV;
    var txtFind = "";
    txtFind = document.getElementById("txtFileTim").value;
    txtFind = txtFind.trim();

//    alert(maNV +" "+ txtFind);

    var url = "myFunction/funDesktop.jsp?caseName=phanQuyenTheoMaNV&maNV=" + maNV + "&txtFind=" + txtFind;
    var res = show_data(url); //alert(res); 

    document.getElementById("dsPhanQuyen").innerHTML = res;
    hiddenNhanVien("tbPhanQuyen");
}

var isShowTM = false;
function funShowTM() {
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

function huyTimLH() {

}

function funTimTM() {
//    var tenThuMuc = document.getElementById("txtThuMucTim").value;
//    var url = "myFunction/funDesktop.jsp?caseName=timThuMucLopHoc&tenThuMuc=" + tenThuMuc;
//    var res = show_data(url); //alert(res);
//
//    document.getElementById("myDropdown").innerHTML = res;
//    $("#myDropdown").find('i').removeClass("fa-lg").addClass("fa-fw");
//
//    clickRoot();
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

            resetNoiDungHS();
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

function resetNoiDungHS() {
    document.getElementById("lblMSHS").innerHTML = "-";
    document.getElementById("txtHoTenHS").value = "";
    document.getElementById("txtTenTMHS").value = "";
    document.getElementById("txtQuocTichHS").value = "Việt nam";
    document.getElementById("txtDiaChiHS").value = "";
    document.getElementById("txtGhiChuHS").value = "...";

    document.getElementById("cboGioiTinhHS").selectedIndex = 0;
    getCurrentDateTime("txtNgaySinhHS", null, null, null);
}

var pubIsChuNhiem = false;
function resetNoiDungCNL() {
    pubIsChuNhiem = true;

    document.getElementById("trLoaiLop_Tim").style.display = "none"; //"table-row";
    document.getElementById("trLop_Tim").style.display = "none"; //"table-row";
    document.getElementById("trHocKy_Tim").style.display = "none"; //"table-row";

//    if (isEditCNL.localeCompare("") === 0) {
//        document.getElementById("lblMaNV").innerHTML = "-";
//        document.getElementById("txtHoTenNV").value = "";
//        document.getElementById("txtDiaChiNV").value = "";
//        document.getElementById("txtGhiChuNV").value = "...";
//        document.getElementById("cboGioiTinhNV").selectedIndex = 0;
//        getCurrentDateTime("txtNgaySinhNV", null, null, null);
//
//        document.getElementById("txtDienThoaiNV").value = "";
//        document.getElementById("txtGmailNV").value = "";
//        document.getElementById("txtChucDanhNV").value = "";
//    }

    document.getElementById("lblIDCNL").innerHTML = "-";
    document.getElementById("cboLoaiLop_CNL").selectedIndex = 0;
    document.getElementById("cboLop_CNL").selectedIndex = 0;
    document.getElementById("cboHocKy_CNL").selectedIndex = 0;
    document.getElementById("cboLopHoc_CNL").selectedIndex = 0;
    getCurrentDateTime("txtNgayBD_CNL", null, null, null);
    tinhNgayKT("txtNgayBD_CNL", "txtNgayKT_CNL", 10);
    document.getElementById("txtGhiChu_CNL").value = "...";

    isEditCNL = "";
}

function xemChuNhiem(idLL, idLop, idHK, maLop) {
//    resetNoiDungHS();
    var table = document.getElementById('tbChuNhiem').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 5) {
                enableNoiDungChuNhiem(true);

                document.getElementById("lblIDCNL").innerHTML = maLop;

                document.getElementById("cboLoaiLop_CNL").value = idLL;
                document.getElementById("cboLop_CNL").value = idLop;
                document.getElementById("cboHocKy_CNL").value = idHK;
                cboLopHocCNL(maLop);

                document.getElementById("txtNgayBD_CNL").value = document.getElementById("tbChuNhiem").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("txtNgayKT_CNL").value = document.getElementById("tbChuNhiem").rows[this.parentNode.rowIndex].cells[3].innerHTML;
                document.getElementById("txtGhiChu_CNL").value = document.getElementById("tbChuNhiem").rows[this.parentNode.rowIndex].cells[4].innerHTML;

                isEditCNL = "";
            }
        };
    }
}

var pubIDBDK = "-1", pubMSHS = "-", pubMaLop = "-";
var pubHoTenNV = "-", pubMaNV = "-", pubTenKhoa = "-", pubMaKhoa = "-", pubUserName = "-";
function resetNoiDungSLL() {
    isEditSLL = "";

    document.getElementById("lblIDSLL").innerHTML = "-";
    document.getElementById("lblHoTenNV_SLL").innerHTML = pubHoTenNV + " || (" + pubMaNV + ")";

    document.getElementById("txtCanNang_SLL").value = "";
    document.getElementById("txtChieuCao_SLL").value = "";

    document.getElementById("txtGhiNhanGV").value = "...";
    document.getElementById("txtGhiNhanPH").value = "...";

    getCurrentDateTime("txtNgayGN_SLL", "cboGioLap_SLL", "cboPhutLap_SLL", "cboThang_SLL");
}

function resetNoiDungSK() {
    var rows = document.getElementById('tbChiTietSK').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if (rows.length !== 0) {
        var td = "", chk = "";
        for (var i = 0; i < rows.length; i++)
        {
            td = rows[i].getElementsByTagName("td");
            chk = td[1].getElementsByTagName("textarea")[0];
//            alert("chk.id: " + chk.id + " || chk.type: " + chk.type); value
            $("#" + chk.id).val("");
        }
    }

    pubMaNVLap = pubMaNV;
    pubMaBSSK = pubMaNV;

    document.getElementById("lblIDSTDSK").innerHTML = "-";
    document.getElementById("lblHoTenNV_SK").innerHTML = pubHoTenNV + " || (" + pubMaNVLap + ")";
    document.getElementById("lblHoTenBSKL_SK").innerHTML = pubHoTenNV + " || (" + pubMaBSSK + ")";

    document.getElementById("txtCanNang_SK").value = "";
    document.getElementById("txtChieuCao_SK").value = "";
    document.getElementById("txtKetLuan_SK").value = "";

    getCurrentDateTime("txtNgayGN_SK", "cboGioLap_SK", "cboPhutLap_SK", null);
}

function resetNoiDungDD() {
    document.getElementById("lblIDXPN").innerHTML = "-";
    document.getElementById("lblHoTenNV_DD").innerHTML = pubHoTenNV + " || (" + pubMaNV + ")";

    document.getElementById("txtSoNgayNghi_DD").value = "1";
    document.getElementById("txtGhiChu_DD").value = "...";
    document.getElementById("chkCoPhepNghi").checked = false;

    getCurrentDateTime("txtNgayLap_DD", "cboGioLap_DD", "cboPhutLap_DD", null);
    getCurrentDateTime("txtNghiBD_DD", null, null, null);
}

var pubIDXNP = "-", pubMaNVDD = "-";
function xemDiemDanh() {
    resetNoiDungDD();
    var table = document.getElementById('tbDiemDanh').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 10) {

                pubIDXNP = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("lblIDXPN").innerHTML = pubIDXNP;

                pubMaNVDD = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[6].id;
                document.getElementById("lblHoTenNV_DD").innerHTML = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[6].innerHTML + " || ( Mã NV: " + pubMaNVDD + ")";

                document.getElementById("txtNghiBD_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                document.getElementById("txtNghiKT_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[2].innerHTML;

                document.getElementById("txtSoNgayNghi_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[3].innerHTML;
                document.getElementById("txtGhiChu_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[5].innerHTML;

                document.getElementById("txtNgayLap_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[7].innerHTML;
                document.getElementById("cboGioLap_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[8].innerHTML;
                document.getElementById("cboPhutLap_DD").value = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].cells[9].innerHTML;

                var td = document.getElementById("tbDiemDanh").rows[this.parentNode.rowIndex].getElementsByTagName("td");
                var chk = td[4].getElementsByTagName("input")[0];
                if (chk !== null && chk.type === "checkbox")
                {
                    //alert(chk.checked + " " + chk.value);
                    document.getElementById("chkCoPhepNghi").checked = chk.checked;
                } else
                {
                    document.getElementById("chkCoPhepNghi").checked = "false";
                }
            }
        };
    }
}

var pubIDSTDSK = "-", pubMaNVLap = "-", pubMaBSSK = "-";
function xemKhamSucKhoe() {
    resetNoiDungSLL();
    var table = document.getElementById('tbSoSucKhoe').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 9) {

                pubIDSTDSK = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("lblIDSTDSK").innerHTML = pubIDSTDSK;

                pubMaNVLap = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[7].id;
                document.getElementById("lblHoTenNV_SK").innerHTML = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[7].innerHTML + " || ( Mã NV: " + pubMaNVLap + ")";

                pubMaBSSK = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[8].id;
                document.getElementById("lblHoTenBSKL_SK").innerHTML = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[8].innerHTML + " || ( Mã NV: " + pubMaBSSK + ")";

                document.getElementById("txtCanNang_SK").value = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[4].innerHTML;
                document.getElementById("txtChieuCao_SK").value = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[5].innerHTML;

                var tempNgayLap = "";
                tempNgayLap = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[1].innerHTML;
                tempNgayLap = tempNgayLap.split(" ");

                document.getElementById("txtNgayGN_SK").value = tempNgayLap[0].trim();
                document.getElementById("cboGioLap_SK").value = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("cboPhutLap_SK").value = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[3].innerHTML;

                document.getElementById("txtKetLuan_SK").value = document.getElementById("tbSoSucKhoe").rows[this.parentNode.rowIndex].cells[6].innerHTML;

                loadChiTietKham(pubIDSTDSK);
            }
        };
    }
}

var pubIDSLL = "-", pubMaNVSLL = "-";
function xemSoLienLac() {
    resetNoiDungSLL();
    var table = document.getElementById('tbSoLienLac').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;

    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++) {
        cells[ix].onclick = function () {
//            alert("This is Cell: " + this.cellIndex + " of Row: " + this.parentNode.rowIndex);
            if (this.cellIndex === 10) {
//                enableNoiDungHocSinh(true);

                pubIDSLL = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[0].id;
                document.getElementById("lblIDSLL").innerHTML = pubIDSLL;

                pubMaNVSLL = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[4].id;
                document.getElementById("lblHoTenNV_SLL").innerHTML = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[4].innerHTML + " || ( Mã NV: " + pubMaNVSLL + ")";

                document.getElementById("cboThang_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[1].innerHTML;

                document.getElementById("txtCanNang_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[2].innerHTML;
                document.getElementById("txtChieuCao_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[3].innerHTML;

                document.getElementById("txtGhiNhanGV").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[5].innerHTML;
                document.getElementById("txtGhiNhanPH").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[6].innerHTML;
                document.getElementById("txtNgayGN_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[7].innerHTML;

                document.getElementById("cboGioLap_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[8].innerHTML;
                document.getElementById("cboPhutLap_SLL").value = document.getElementById("tbSoLienLac").rows[this.parentNode.rowIndex].cells[9].innerHTML;

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

// 12.07.2018
function cboHocKy() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboHocKy";
    var res = show_data(url);
    document.getElementById("cboHocKy").innerHTML = res;

    //Bảng Đăng Ký
    document.getElementById("cboHocKy_BDK").innerHTML = res;

    //Tìm thông tin
    document.getElementById("cboHocKy_Tim").innerHTML = res;

    cboLopHocBDK("-1");
}

function cboHocKyCNL() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboHocKy";
    var res = show_data(url);
    document.getElementById("cboHocKy_CNL").innerHTML = res;

    cboLopHocCNL("-1");
}

function cboLoaiLopCNL() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboLoaiLop";
    var res = show_data(url);
    document.getElementById("cboLoaiLop_CNL").innerHTML = res;

    cboLopCNL();
}

function cboLopCNL() {
    var idLL = document.getElementById("cboLoaiLop_CNL").value;
//    alert(idLL); return;

    var url = "myFunction/funHocSinh.jsp?caseName=cboLop&idLL=" + idLL;
    var res = show_data(url); //alert(res);
    document.getElementById("cboLop_CNL").innerHTML = res;

    cboLopHocCNL("-1");
}

function cboLopHocCNL(maLop) {
    var idHK = $('#cboHocKy_CNL option').length;
    var idLop = $('#cboLop_CNL option').length;

//    alert(idHK + " " + idLop + " " + maLop);
    if (idHK !== 0 && idLop !== 0) {
        idHK = document.getElementById("cboHocKy_CNL").value;
        idLop = document.getElementById("cboLop_CNL").value;

        var url = "myFunction/funHocSinh.jsp?caseName=cboLopHoc&idHK=" + idHK + "&idLop=" + idLop;
        var res = "";
        res = show_data(url); //alert(res);
        document.getElementById("cboLopHoc_CNL").innerHTML = res;

        res = maLop.toString();
        res = res.trim();
        if (res.localeCompare("-1") !== 0)
            document.getElementById("cboLopHoc_CNL").value = res;
    }
    else
        document.getElementById("cboLopHoc_CNL").innerHTML = "";
}

function cboLoaiLop() {
    var url = "myFunction/funHocSinh.jsp?caseName=cboLoaiLop";
    var res = show_data(url);
    document.getElementById("cboLoaiLop").innerHTML = res;

    //Bảng Đăng Ký
    document.getElementById("cboLoaiLop_BDK").innerHTML = res;

    //Tìm thông tin
    document.getElementById("cboLoaiLop_Tim").innerHTML = res;

    cboLop();
}

function cboLop() {
    var idLL = document.getElementById("cboLoaiLop").value;
//    alert(idLL); return;

    var url = "myFunction/funHocSinh.jsp?caseName=cboLop&idLL=" + idLL;
    var res = show_data(url); //alert(res);
    document.getElementById("cboLop").innerHTML = res;

    //Bảng Đăng Ký
    idLL = document.getElementById("cboLoaiLop_BDK").value;
    url = "myFunction/funHocSinh.jsp?caseName=cboLop&idLL=" + idLL;
    res = show_data(url); //alert(res);
    document.getElementById("cboLop_BDK").innerHTML = res;

    //Tìm thông tin
    idLL = document.getElementById("cboLoaiLop_Tim").value;
    url = "myFunction/funHocSinh.jsp?caseName=cboLop&idLL=" + idLL;
    res = show_data(url); //alert(res);
    document.getElementById("cboLop_Tim").innerHTML = res;

    cboLopHocBDK("-1");
}

function cboLopHocBDK(maLop) {
    var idHK = $('#cboHocKy_BDK option').length;
    var idLop = $('#cboLop_BDK option').length;

//    alert(idHK + " " + idLop + " " + maLop);
    if (idHK !== 0 && idLop !== 0) {
        idHK = document.getElementById("cboHocKy_BDK").value;
        idLop = document.getElementById("cboLop_BDK").value;

        var url = "myFunction/funHocSinh.jsp?caseName=cboLopHoc&idHK=" + idHK + "&idLop=" + idLop;
        var res = "";
        res = show_data(url); //alert(res);
        document.getElementById("cboLopHoc_BDK").innerHTML = res;

        res = maLop;
        res = res.trim();
        if (res.localeCompare("-1") !== 0)
            document.getElementById("cboLopHoc_BDK").value = res;
    }
    else
        document.getElementById("cboLopHoc_BDK").innerHTML = "";
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

function getCurrentDateTime(varDate, varHour, varMinute, varMonth) {
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
    if (varMonth !== null && varMonth !== "") {
        var strTemp = "";
        strTemp = strResult[0].split("/"); //alert(parseInt(strTemp[1]));
        document.getElementById(varMonth).value = parseInt(strTemp[1]); //"month"
    }
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

            pubIDBDK = "-1";
            setThongTin(pubIDBDK);
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
        if (id === strId) {
            tabLinksB[id].className = 'selected';
            $("#div" + id).removeClass("hide");

            pubIDBDK = "-1";
            if (strId.localeCompare("ChuNhiem") === 0) {
                cboHocKyCNL();
                cboLoaiLopCNL();
                setGiaoVien("-1");
            }
            else {
                setThongTin(pubIDBDK);
            }
        } else {
            tabLinksB[id].className = '';
            $("#div" + id).addClass("hide");
        }
    }
    return false;
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

function autoTinhKTNghi() {
    var ngayBD = "";
    ngayBD = document.getElementById('txtNghiBD_DD').value;
    var strBD = ngayBD.split("/");

    var soNgay = document.getElementById('txtSoNgayNghi_DD').value;

    var date = new Date(parseInt(strBD[2]), parseInt(strBD[1]) - 1, parseInt(strBD[0]));
    var strDate = new Date(date);
    strDate.setDate(strDate.getDate() + parseInt(soNgay));

    var dd = strDate.getDate();
    var mm = strDate.getMonth() + 1;
    var yyyy = strDate.getFullYear();

    document.getElementById('txtNghiKT_DD').value = dd + '/' + mm + '/' + yyyy;
}

function tinhNgayKT(txtNgayBD, txtNgayKT, inSoNam) {
    var ngayBD = "";
    ngayBD = document.getElementById(txtNgayBD).value;
    var strBD = ngayBD.split("/");

    var soNam = "";
    soNam = inSoNam;

    var inDate = new Date(parseInt(strBD[2]), parseInt(strBD[1]) - 1, parseInt(strBD[0])); //alert("inDate: " + inDate + " || inDate.getMonth(): " + inDate.getMonth() + " || inDate.getDate(): " + inDate.getDate());
    var strDate = new Date(inDate.getFullYear() + parseInt(soNam), inDate.getMonth(), inDate.getDate());

    var dd = strDate.getDate();
    var mm = strDate.getMonth() + 1;
    var yyyy = strDate.getFullYear();

    document.getElementById(txtNgayKT).value = dd + '/' + mm + '/' + yyyy;
}

var isShowLH = true;
function showLopHoc() {
    if (isShowLH) {
        document.getElementById("tbQLLopHoc").style.display = "none";
        document.getElementById("hrLopHoc").style.display = "none";

        isShowLH = false;
    }
    else {
        document.getElementById("tbQLLopHoc").style.display = "table";
        document.getElementById("hrLopHoc").style.display = "block";

        isShowLH = true;
    }
    funHuyCN();
}

var isTimLH = true;
function showTimLH() {
    if (isTimLH) {
        document.getElementById("tbTimKiemLop").style.display = "none";
        isTimLH = false;
    }
    else {
        document.getElementById("tbTimKiemLop").style.display = "table";
        isTimLH = true;
    }
    huyTimLH();
}

//
//txtThuMucTim
//
// //Lay text cua Combobox
// var el = document.getElementById('cboNhapTaiKho');
// var nhapTaiKho = el.options[el.selectedIndex].innerHTML;