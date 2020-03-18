/* 
 * 28.09.2017
 * by Sol
 */

var pubMaNV = "";
function inThe() {
    var slTrang = document.getElementById("slTrang").value;
//    alert("soTrang: " + slTrang + " || maNV :" + pubMaNV);
    document.getElementById("iFrameForm").src = "myFunction/funInThe.jsp?caseName=inThe&soTrang=" + slTrang + "&maNV=" + pubMaNV;
}

function ktSoTrangIn() {
    var strSoTrang = "";
    strSoTrang = document.getElementById("slTrang").value;
    strSoTrang = strSoTrang.trim();

    var isError = false;
    var inSoTrang = 1;
    if (strSoTrang.localeCompare("") === 0) {
        alert("Chú ý: \n\n\t Số trang in không được để trống. \n\n\t Vui lòng nhập số trang in trước khi xác nhận lệnh in !!");
        isError = true;
    }
    else
    {
        inSoTrang = parseInt(strSoTrang);
        if (inSoTrang < 1) {
            alert("Chú ý: \n\n\t Số trang in phải ít nhất 1 trang. \n\n\t Vui lòng nhập lại số trang in trước khi xác nhận lệnh in !!");
            isError = true;
        }
        else if (inSoTrang > 100) {
            alert("Chú ý: \n\n\t Số trang in không vượt quá 100 trang cho 1 lần in, làm hệ thống chạy chậm. \n\n\t Vui lòng nhập lại số trang in trước khi xác nhận lệnh in !!");
            isError = true;
        }
    }

    if (!isError) {
        inThe();
    }
    else {
        document.getElementById("slTrang").value = "1";
        inSoTrang = 1;
    }
}