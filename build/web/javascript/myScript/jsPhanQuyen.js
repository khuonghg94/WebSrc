
function cboPhong(){
    var url = "myFunction/funPhanQuyen.jsp?caseName=cbophong";
    var res = show_data(url);
    document.getElementById("cboDonVi").innerHTML = res;
}
function danhmucForm(){
    var url = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form";
    var res = show_data(url);
    document.getElementById("dsForm").innerHTML = res;
}
function TimKiem(){
    var idPhong = document.getElementById("cboDonVi").value;
    var hoTen = document.getElementById("txtTenNV").value;
    if(idPhong == -1){
        var url = "myFunction/funPhanQuyen.jsp?caseName=dstk_hoten&hoTen=" + hoTen;
        var res = show_data(url);
        document.getElementById("dsTimKiem").innerHTML = res;
    }else{
        var url = "myFunction/funPhanQuyen.jsp?caseName=dstk_hoten_idphong&hoTen=" + hoTen +"&idPhong=" + idPhong;
        var res = show_data(url);
        document.getElementById("dsTimKiem").innerHTML = res;
    }
}
function HuyTimKiem(){
    location.reload();
}
var pub_MaNV = '';
function xemCTPQ(){
    var table = document.getElementById('tbDSTK').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    if (rows.length === 0)
        return;
    var maNV = "";
    var tenNV = "";
    var tenPhong = "";
    var cells = table.getElementsByTagName('td');
    for (ix = 0; ix < cells.length; ix++){
        cells[ix].onclick = function () {
            if (this.cellIndex === 4) {
                maNV = document.getElementById("tbDSTK").rows[this.parentNode.rowIndex].cells[2].id;
                pub_MaNV = maNV;
                tenNV = document.getElementById("tbDSTK").rows[this.parentNode.rowIndex].cells[3].id;
                tenPhong = document.getElementById("tbDSTK").rows[this.parentNode.rowIndex].cells[1].id;
                var url1 = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_ccq&maNV=" + maNV;
                var res1 = show_data(url1);
                document.getElementById("dsForm").innerHTML = res1;
                var url = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_manv&maNV=" + maNV;
                var res = show_data(url);
                document.getElementById("dsForm_DCQ").innerHTML = res;
                document.getElementById("lblTenNV").innerHTML = tenNV;
                document.getElementById("lblTenPhong").innerHTML = tenPhong;
            }
        }
    }
}

function themQuyen(){
    var tenNV = document.getElementById('lblTenNV').innerHTML;
    if (tenNV == '-'){
        alert('Vui lòng chọn thông tin nhân viên!');
    }
    else{
        var table = document.getElementById('tbDMucForm').getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');
        if (rows.length === 0)
            return;
        var maNV = pub_MaNV;
        var idForm = "";
        var cells = table.getElementsByTagName('td');
        for (ix = 0; ix < cells.length; ix++){
            cells[ix].onclick = function () {
                if (this.cellIndex === 3) {
                    idForm = document.getElementById("tbDMucForm").rows[this.parentNode.rowIndex].cells[1].id;
                    $.ajax({
                        type: "POST",
                        url: "myFunction/funPhanQuyen.jsp",
                        data: {
                            "idForm": idForm,
                            "maNV": maNV,
                            "caseName": "themphanquyen"
                        },
                        success: function (data) {
                            var result = "";
                            result = data.trim();
                            if (result == '0') {
                                //alert("Thông báo kết quả: \n Thêm Quyền Thành Công");
                                var url = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_manv&maNV=" + maNV;
                                var res = show_data(url);
                                document.getElementById("dsForm_DCQ").innerHTML = res;
                                var url1 = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_ccq&maNV=" + maNV;
                                var res1 = show_data(url1);
                                document.getElementById("dsForm").innerHTML = res1;
                            } else {
                                alert("Thông báo kết quả: \n " + result);
                            }
                        } 
                    });
                }
            }
        }
    }
}
function thuhoiQuyen(){
    var tenNV = document.getElementById('lblTenNV').innerHTML;
    if (tenNV == '-'){
        alert('Vui lòng chọn thông tin nhân viên!');
    }
    else{
        var table = document.getElementById('tbDMucForm_DCQ').getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');
        if (rows.length === 0)
            return;
        var idPhanQuyen = "";
        var maNV = pub_MaNV;
        var cells = table.getElementsByTagName('td');
        for (ix = 0; ix < cells.length; ix++){
            cells[ix].onclick = function () {
                if (this.cellIndex === 3) {
                    idPhanQuyen = document.getElementById("tbDMucForm_DCQ").rows[this.parentNode.rowIndex].cells[0].id;
                    $.ajax({
                        type: "POST",
                        url: "myFunction/funPhanQuyen.jsp",
                        data: {
                            "idPhanQuyen": idPhanQuyen,
                            "caseName": "xoaphanquyen"
                        },
                        success: function (data) {
                            var result = "";
                            result = data.trim();
                            if (result == '0') {
                                //alert("Thông báo kết quả: \n Xóa Quyền Thành Công");
                                var url = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_manv&maNV=" + maNV;
                                var res = show_data(url);
                                document.getElementById("dsForm_DCQ").innerHTML = res;
                                var url1 = "myFunction/funPhanQuyen.jsp?caseName=dmuc_form_ccq&maNV=" + maNV;
                                var res1 = show_data(url1);
                                document.getElementById("dsForm").innerHTML = res1;
                            } else {
                                alert("Thông báo kết quả: \n " + result);
                            }
                        } 
                    });
                }
            }
        }
    }
}


