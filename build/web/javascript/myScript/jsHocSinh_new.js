
function cboHocKy() {
    var url = "myFunction/funHocSinh_new.jsp?caseName=cboHocKy";
    var res = show_data(url);
    document.getElementById("cboHocKy").innerHTML = res;
    document.getElementById("cboHocKy1").innerHTML = res;
    document.getElementById("cboHocKy2").innerHTML = res;
}
function cboLoaiLop() {
    var url = "myFunction/funHocSinh_new.jsp?caseName=cboLoaiLop";
    var res = show_data(url);
    document.getElementById("cboLoaiLop").innerHTML = res;
    document.getElementById("cboLoaiLop1").innerHTML = res;
    document.getElementById("cboLoaiLop2").innerHTML = res;
    cboLop();
    cboLop1();
    cboLop2();
}
function cboLop() {
    var idLL = document.getElementById("cboLoaiLop").value;
    var url = "myFunction/funHocSinh_new.jsp?caseName=cboLop&idLL=" + idLL;
    var res = show_data(url); 
    document.getElementById("cboLop").innerHTML = res;
}
function cboLop1() {
    var idLL1 = document.getElementById("cboLoaiLop1").value;
    var url1 = "myFunction/funHocSinh_new.jsp?caseName=cboLop&idLL=" + idLL1;
    var res1 = show_data(url1);
    document.getElementById("cboLop1").innerHTML = res1;
}
function cboLop2() {
    var idLL2 = document.getElementById("cboLoaiLop2").value;
    var url2 = "myFunction/funHocSinh_new.jsp?caseName=cboLop&idLL=" + idLL2;
    var res2 = show_data(url2);
    document.getElementById("cboLop2").innerHTML = res2;
}
function showDMMaLop(){
    var idLL = document.getElementById("cboLoaiLop").value;
    var idLop = document.getElementById("cboLop").value;
    var idHK = document.getElementById("cboHocKy").value;
    if(idLL == -1 || idLop==-1 || idHK==-1){
        alert("Vui lòng chọn đầy đủ thông tin tìm kiếm");
    }
    var url = "myFunction/funHocSinh_new.jsp?caseName=danhmucmalop&idLL=" + idLL +"&idLop=" + idLop + "&idHK=" + idHK;
    var res = show_data(url);
    document.getElementById("cboMaLop").innerHTML = res;
}
function showTTLopHoc() {
    var MaLop = document.getElementById("cboMaLop").value;
    var url = "myFunction/funHocSinh_new.jsp?caseName=thongtinlophoc&MaLop=" + MaLop;
    var res = show_data(url);
    var strTemp = res.split('<s>');
    document.getElementById("txtTenLoaiLop").value = strTemp[0].trim();
    document.getElementById("txtTenLop").value = strTemp[1];
    document.getElementById("txtHocKy").value = strTemp[2];
    
    document.getElementById("txtTenLoaiLop_DKM").value = strTemp[0].trim();
    document.getElementById("txtTenLop_DKM").value = strTemp[1];
    document.getElementById("txtHocKy_DKM").value = strTemp[2];
    
    document.getElementById("txtTenLoaiLop_Upd").value = strTemp[0].trim();
    document.getElementById("txtTenLop_Upd_DK").value = strTemp[1];
    document.getElementById("txtHocKy_Upd").value = strTemp[2];
    
    document.getElementById("txtGhiChu_Upd").value = strTemp[3];
    document.getElementById("cboLoaiLop2").selectedIndex = parseInt(strTemp[4])-1;
    document.getElementById("cboLop2").selectedIndex = parseInt(strTemp[5])-1;
    document.getElementById("cboHocKy2").selectedIndex = parseInt(strTemp[6]);
    showDSHS();
}
function showDSHS(){
    var MaLop = document.getElementById("cboMaLop").value;
    var url = "myFunction/funHocSinh_new.jsp?caseName=DanhSachHS&MaLop=" + MaLop;
    var res = show_data(url);
    document.getElementById("dsHocSinh").innerHTML = res;
}
function showTT_Search(){
    showDMMaLop();
}
function xemTTHS(){
    var table = document.getElementById('tbDSHS').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var MSHS = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++){
        cells[ix].onclick = function () {
            if (this.cellIndex === 3) {
                MSHS = document.getElementById("tbDSHS").rows[this.parentNode.rowIndex].cells[1].id;
                var MaLop = document.getElementById("cboMaLop").value;
                var url = "myFunction/funHocSinh_new.jsp?caseName=thongtinchitiet_hs&MSHS=" + MSHS;
                var res = show_data(url);
                var strTemp = res.split('<s>');
                document.getElementById("lblMSHS").innerHTML = strTemp[0].trim();
                document.getElementById("txtHoTenHS_BDK").value = strTemp[1].trim();
                document.getElementById("txtTTMHS_BDK").value = strTemp[2].trim();
                document.getElementById("txtNgaySinhHS_BDK").value = strTemp[3].trim();
                document.getElementById("txtGioiTinhHS_BDK").value = strTemp[4].trim();
                document.getElementById("txtQuocTich_HS").value = strTemp[5].trim();
                document.getElementById("txtDiaChi_HS").value = strTemp[6].trim();
                document.getElementById("txtGhiChu_HS").value = strTemp[7].trim();
                document.getElementById("lblMSHS_SSK").innerHTML = strTemp[0].trim();
                document.getElementById("txtHoTenHS_SSK").value = strTemp[1].trim() + " || " + strTemp[2].trim();
                document.getElementById("txtNgaySinhHS_SSK").value = strTemp[3].trim();
                document.getElementById("txtGioiTinhHS_SSK").value = strTemp[4].trim();
                document.getElementById("txtDiaChi_HS_SSK").value = strTemp[6].trim();
                var url1 = "myFunction/funHocSinh_new.jsp?caseName=dslophoc_hs&MSHS=" + MSHS;
                var res1 = show_data(url1);
                document.getElementById("dsLopHoc").innerHTML = res1;  
                var url2 = "myFunction/funHocSinh_new.jsp?caseName=danhmucngaykham&MSHS=" + MSHS +"&MaLop=" + MaLop;
                var res2 = show_data(url2);
                document.getElementById("dsNgayKham").innerHTML = res2;
            }
        }
    }
    document.getElementById("txtTenLop_SSK").value = document.getElementById("txtTenLop").value;
}
function xemTTDK(){
    var table = document.getElementById('tbDSDK').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var IDBDK = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++){
        cells[ix].onclick = function () {
            if (this.cellIndex === 5) {
                IDBDK = document.getElementById("tbDSDK").rows[this.parentNode.rowIndex].cells[1].id;
                var url = "myFunction/funHocSinh_new.jsp?caseName=thongtinchitiet_dk&IDBDK=" + IDBDK;
                var res = show_data(url);
                var strTemp = res.split('<s>');
                document.getElementById("lblIDBDK").innerHTML = strTemp[0].trim();
                document.getElementById("txtLoaiLop_BDK").value = strTemp[1].trim();
                document.getElementById("txtTenLop_BDK").value = strTemp[2].trim();
                document.getElementById("txtNgayBD_BDK").value = strTemp[3].trim();
                document.getElementById("txtNgayKT_BDK").value = strTemp[4].trim();
                document.getElementById("txtGhiChu_BDK").value = strTemp[5].trim();
            }
        }
    }
}
function setTenLopHoc() {
    var el = "";
    el = document.getElementById('cboHocKy1');
    var strHK = el.options[el.selectedIndex].innerHTML;

    el = document.getElementById('cboLop1');
    var strLop = el.options[el.selectedIndex].innerHTML;

    document.getElementById("txtTenLop_DK").value = strLop + " - HKỳ: " + strHK;
    document.getElementById("txtTenLop_DK").select();
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


function Open_ThemLopHoc(){
    document.getElementById("divUpdateLopHoc").style.display = 'none';
    document.getElementById("divThemMoiLopHoc").style.display = 'block';
    document.getElementById("txtTenLop_DK").value = '';
    document.getElementById("txtGhiChu_DK").value = '';
}
function Close_ThemLopHoc(){
    document.getElementById("divThemMoiLopHoc").style.display = 'none';
}
function ThemLopHocMoi(){
    if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn thêm lớp học mới? \n" +
            "Chú ý: Tên lớp học không được trùng với tên đã có."))
    {
        var idHK = document.getElementById("cboHocKy1").value;
        var idLop = document.getElementById("cboLop1").value;
        var TenLH = document.getElementById("txtTenLop_DK").value;
        var ghiChu = document.getElementById("txtGhiChu_DK").value; 
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh_new.jsp",
            data: {
                "idHK": idHK,
                "idLop": idLop,
                "tenLop": TenLH,
                "ghiChu": ghiChu,
                "caseName": "themmoilophoc"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result == '0') {
                    alert("Thông báo kết quả: \n Thêm Lớp Học Thành Công");
                } else {
                    alert("Thông báo kết quả: \n " + result);
                }
            } 
        });
    }
}
function Open_UpdateLopHoc(){
    document.getElementById("divThemMoiLopHoc").style.display = 'none';
    document.getElementById("divUpdateLopHoc").style.display = 'block';
    document.getElementById("txtTenLop_Upd").value = document.getElementById("txtTenLop").value;
}
function Close_UpdateLopHoc(){
    document.getElementById("divUpdateLopHoc").style.display = 'none';
}
function UpdateLopHoc(){
    if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn cập nhật thông tin lớp học? \n" +
            "Chú ý: Tên mới không được trùng với tên đã có."))
    {
        var idHK = document.getElementById("cboHocKy2").value;
        var idLop = document.getElementById("cboLop2").value;
        var TenLH = document.getElementById("txtTenLop_Upd").value;
        var ghiChu = document.getElementById("txtGhiChu_Upd").value; 
        var maLop = document.getElementById("cboMaLop").value;
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh_new.jsp",
            data: {
                "idHK": idHK,
                "idLop": idLop,
                "tenLop": TenLH,
                "maLop": maLop,
                "ghiChu": ghiChu,
                "caseName": "updatelophoc"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result == '0') {
                    alert("Thông báo kết quả: \n Cập Nhật Lớp Học Thành Công");
                } else {
                    alert("Thông báo kết quả: \n " + result);
                }
            } 
        });
    }
}
function DeleteLopHoc(){
    var maLop = document.getElementById("cboMaLop").value;
    if(maLop == -1 || maLop == ''){
        alert("Không có thông tin mã lớp để xóa!")
    }else{
        if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn xóa thông tin có mã: ''" + maLop + "'' ?" +
                "\n Chú ý: Không xóa thông tin Lớp học khi đã sử dụng."))
        {
            $.ajax({
                type: "POST",
                url: "myFunction/funHocSinh_new.jsp",
                data: {
                    "maLop": maLop,
                    "caseName": "xoaLopHoc"
                },
                success: function (data) {
                    var result = "";
                    result = data.trim();
                    if (result == '0') {
                        alert("Thông báo kết quả: \n Xóa Thông Tin Thành Công");
                        location.reload();
                    } else {
                        alert("Thông báo kết quả: \n " + result);
                    }
                } 
            });
        }
    }
}
function Open_ThemDKM(){
    document.getElementById("divUpdateDK").style.display = 'none';
    document.getElementById("divThemDKMoi").style.display = 'block';
}

function Close_ThemDKM(){
    document.getElementById("divThemDKMoi").style.display = 'none';
}

function ThemDangKyMoi(){
    if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn thêm đăng ký mới? \n"))
    {
        var maLop = document.getElementById("cboMaLop").value;
        var msHS = document.getElementById("lblMSHS").innerHTML;
        
        var ngayBD = document.getElementById("txtNgayBD_DKM").value;
        var ngayKT = document.getElementById("txtNgayKT_DKM").value;
        var ghiChu = document.getElementById("txtGhiChuDK_DKM").value;

        var hoTen = document.getElementById("txtHoTenHS_DKM").value;
        var tenThanMat = document.getElementById("txtTenTMHS_DKM").value;
        var ngaySinh = document.getElementById("txtNgaySinhHS_DKM").value;
        var gioiTinh = document.getElementById("cboGioiTinhHS_DKM").value;
        var quocTich = document.getElementById("txtQuocTichHS_DKM").value;
        var diaChi = document.getElementById("txtDiaChiHS_DKM").value;
        var ghiChuHS = document.getElementById("txtGhiChuHS_DKM").value;
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh_new.jsp",
            data: {
                "msHS": msHS,
                "maLop": maLop,
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
                "caseName": "themdangkymoi"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result == '0') {
                    alert("Thông báo kết quả: \n Thêm Không Thành Công");
                } else {
                    alert("Thông báo kết quả: \n Thêm Đăng Ký Mới Thành Công");
                }
            } 
        });
    }
}

function Open_UpdateDK(){
    document.getElementById("txtNgayBD_Upd").value = document.getElementById("txtNgayBD_BDK").value;
    document.getElementById("txtNgayKT_Upd").value = document.getElementById("txtNgayKT_BDK").value;
    document.getElementById("txtGhiChuDK_Upd").value = document.getElementById("txtGhiChu_BDK").value;
    document.getElementById("divThemDKMoi").style.display = 'none';
    document.getElementById("divUpdateDK").style.display = 'block';
    document.getElementById("txtHoTenHS_Upd").value = document.getElementById("txtHoTenHS_BDK").value;
    document.getElementById("txtTenTMHS_Upd").value = document.getElementById("txtTTMHS_BDK").value;
    document.getElementById("txtNgaySinhHS_Upd").value = document.getElementById("txtNgaySinhHS_BDK").value;
    if(document.getElementById("txtGioiTinhHS_BDK").value.toString().trim()=="Nam"){
        document.getElementById("cboGioiTinhHS_Upd").selectedIndex = 1;
    }else{
        document.getElementById("cboGioiTinhHS_Upd").selectedIndex = 2;
    }
    document.getElementById("txtQuocTichHS_Upd").value = document.getElementById("txtQuocTich_HS").value;
    document.getElementById("txtDiaChiHS_Upd").value = document.getElementById("txtDiaChi_HS").value;
    document.getElementById("txtGhiChuHS_Upd").value = document.getElementById("txtGhiChu_HS").value;
}

function Close_UpdateDK(){
    document.getElementById("divUpdateDK").style.display = 'none';
}

function UpdateThongTinDK(){
    if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn cập nhật thông tin đăng ký? \n"))
    {
        var idBDK = document.getElementById("lblIDBDK").innerHTML;
        var ngayBD = document.getElementById("txtNgayBD_Upd").value;
        var ngayKT = document.getElementById("txtNgayKT_Upd").value;
        var ghiChu = document.getElementById("txtGhiChuDK_Upd").value;

        var hoTen = document.getElementById("txtHoTenHS_Upd").value;
        var tenThanMat = document.getElementById("txtTenTMHS_Upd").value;
        var ngaySinh = document.getElementById("txtNgaySinhHS_Upd").value;
        var gioiTinh = document.getElementById("cboGioiTinhHS_Upd").value;
        var quocTich = document.getElementById("txtQuocTichHS_Upd").value;
        var diaChi = document.getElementById("txtDiaChiHS_Upd").value;
        var ghiChuHS = document.getElementById("txtGhiChuHS_Upd").value;
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh_new.jsp",
            data: {
                "idBDK": idBDK,
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
                "caseName": "suahocsinhdangky"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result == '0') {
                    alert("Thông báo kết quả: \n Cập Nhật Thành Công");
                } else {
                    alert("Thông báo kết quả: \n Cập Nhật Không Thành Công");
                }
            } 
        });
    }
}
function showTabDangKy(){
    $("#divDangKy").removeClass("hide");
    $("#divSoSucKhoe").addClass("hide"); 
}
function showTabSoSucKhoe(){
    $("#divDangKy").addClass("hide");
    $("#divSoSucKhoe").removeClass("hide");  
}
function xemChiTietKham(){
    var table = document.getElementById('tbdsNgayKham').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var IDSTDSK = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++){
        cells[ix].onclick = function () {
            if (this.cellIndex === 4) {
                IDSTDSK = document.getElementById("tbdsNgayKham").rows[this.parentNode.rowIndex].cells[1].id;
                document.getElementById("lblIDSTDSK_SSK").innerHTML = IDSTDSK;
                var url = "myFunction/funHocSinh_new.jsp?caseName=chitietkham&IDSTDSK=" + IDSTDSK;
                var res = show_data(url);
                var strTemp = res.split('<s>');
                document.getElementById("txtNgayKham_SSK").value = strTemp[0].trim();
                document.getElementById("txtCanNang_SSK").value = strTemp[1].trim();
                document.getElementById("txtChieuCao_SSK").value = strTemp[2].trim();
                document.getElementById("txtKetLuan_SSK").value = strTemp[3].trim();
                document.getElementById("txtMaNVLap_SSK").value = strTemp[4].trim();
                document.getElementById("txtMaNVKL_SSK").value = strTemp[5].trim();
                var url1 = "myFunction/funHocSinh_new.jsp?caseName=chitietkham_bophan&IDSTDSK=" + IDSTDSK;
                var res1 = show_data(url1);
                document.getElementById("dsChiTietSK").innerHTML = res1;  
            }
        }
    }
}
function cboNhanVien(){
    var url = "myFunction/funHocSinh_new.jsp?caseName=cbonhanvien";
    var res = show_data(url);
    document.getElementById("cboNVLap").innerHTML = res;
    document.getElementById("cboNVKL").innerHTML = res;
}
function cboNhanVien_Upd(){
    var url = "myFunction/funHocSinh_new.jsp?caseName=cbonhanvien";
    var res = show_data(url);
    document.getElementById("cboNVLap1").innerHTML = res;
    document.getElementById("cboNVKL1").innerHTML = res;
}

function Open_ThemKSKM(){
    document.getElementById("divUpdateKhamSK").style.display = 'none';
    document.getElementById("divThemKhamSK").style.display = 'block';
    var url = "myFunction/funHocSinh_new.jsp?caseName=bophancothe_all";
    var res = show_data(url);
    document.getElementById("dsBoPhan").innerHTML = res;
    cboNhanVien();
}

function Close_ThemKSKM(){
    document.getElementById("divThemKhamSK").style.display = 'none';
}

function ThemKhamSucKhoe(){
    if (confirm("Xác nhận yêu cầu : Bạn thật sự muốn thêm thông tin khám sức khỏe ?"))
    {
        var tenLop = document.getElementById("txtTenLop_SSK").value;
        var maLop = document.getElementById("cboMaLop").value;
        var MSHS = document.getElementById("lblMSHS_SSK").innerHTML;
        var ngayKham = document.getElementById("txtNgayKham_AddKSK").value + " " + document.getElementById("cbohour_AddSSK").value + ":" + document.getElementById("cbominute_AddSSK").value;
        var canNang = document.getElementById("txtCanNang_AddSSK").value;
        var chieuCao = document.getElementById("txtChieuCao_AddSSK").value;
        var ketLuan = document.getElementById("txtKetLuan_AddSSK").value;
        var ghiChu = document.getElementById("txtGhiChu_AddSSK").value;
        var maNVLap = document.getElementById("cboNVLap").value;
        var maNVKetLuan = document.getElementById("cboNVKL").value;
        var listNDKham = "";
        var rows = document.getElementById('tbnoidungKham').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        if (rows.length !== 0) {
            for (var i = 0; i < rows.length; i++)
            {
                var td = rows[i].getElementsByTagName("td");
                var chk = td[1].getElementsByTagName("textarea")[0];
                listNDKham = listNDKham + td[1].id + "<s>" + document.getElementById("txt" + td[1].id).value + "<sol>";
            }
        }
        $.ajax({
            type: "POST",
            url: "myFunction/funHocSinh_new.jsp",
            data: {
                "tenLop": tenLop,
                "maLop": maLop,
                "MSHS": MSHS,
                "listNDKham": listNDKham,
                "maNVLap": maNVLap,
                "maNVKetLuan": maNVKetLuan,
                "ngayKham": ngayKham,
                "canNang": canNang,
                "chieuCao": chieuCao,
                "ketLuan": ketLuan,
                "ghiChu": ghiChu,
                "caseName": "themsotheodoisuckhoe"},
            success: function (data) {
                var result = "";
                result = data.trim();
                if (result == '0') {
                    alert("Thông báo kết quả: \n Thêm Không Thành Công");
                } else {
                    alert("Thông báo kết quả: \n Thêm Thành Công");
                }
            }
        });
    }
}


function Open_UpdateKSK(){
    document.getElementById("divUpdateKhamSK").style.display = 'block';
    document.getElementById("divThemKhamSK").style.display = 'none';
    cboNhanVien_Upd();
    var substring = document.getElementById("txtNgayKham_SSK").value.toString().trim().split(" ");
    var hms = substring[1].split(":");
    var hour = parseInt(hms[0]);
    var minute = parseInt(hms[1]);
    $(cboNVLap1).find('option[value='+ document.getElementById("txtMaNVLap_SSK").value.toString().trim() +']').attr('selected','selected');
    $(cboNVKL1).find('option[value='+ document.getElementById("txtMaNVKL_SSK").value.toString().trim() +']').attr('selected','selected');
    document.getElementById("txtNgayKham_UpdateSSK").value = substring[0];
    document.getElementById("cbohour_UpdateSSK").selectedIndex = hour;
    document.getElementById("cbominute_UpdateSSK").selectedIndex = minute;
    document.getElementById("txtCanNang_UpdateSSK").value = document.getElementById("txtCanNang_SSK").value;
    document.getElementById("txtChieuCao_UpdateSSK").value = document.getElementById("txtChieuCao_SSK").value;
    document.getElementById("txtKetLuan_UpdateSSK").value = document.getElementById("txtKetLuan_SSK").value;
    var IDSTDSK = document.getElementById("lblIDSTDSK_SSK").innerHTML;
    var url = "myFunction/funHocSinh_new.jsp?caseName=chitietkham_upd&IDSTDSK=" + IDSTDSK;
    var res = show_data(url);
    document.getElementById("chitietkham_upd").innerHTML = res;
}

function Close_CapNhatKSK(){
    document.getElementById("divUpdateKhamSK").style.display = 'none';
}

function CapNhatKhamSucKhoe(){
    
}

function inTDSK(){
    var idSTDSK = "";
    idSTDSK = document.getElementById("lblIDSTDSK_SSK").innerHTML;
    idSTDSK = idSTDSK.trim();
    if (idSTDSK.localeCompare("-") === 0) {
        alert("Chú ý: Vui lòng chọn thông tin trước khi in sổ theo dõi sức khỏe.");
        return;
    }
    else {
        window.open("myFunction/funInAn_new.jsp?caseName=intdsk&IDSSK=" + idSTDSK);
    }
}