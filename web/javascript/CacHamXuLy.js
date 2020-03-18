/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setFocusText(nameID) {
    $("#" + nameID).focus();
    $("#" + nameID).select();
}

//Ham để định dạng lại số dạng N0 tham số truyền vào là input
function DinhDangSo(txt)
{
    number = txt.value;
    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(number)) {
        number = number.replace(rgx, '$1' + ',' + '$2');
    }
    txt.value = number;
}

//Hàm chỉ cho nhập số, tham số truyền vào là input 
function isNumberKey(evt) {
    var charCode = (evt.keyCode ? evt.keyCode : evt.which);
//    alert("evt.which: " + evt.which + " evt.keyCode: " + evt.keyCode + " charCode: " + charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function ChiNhapSo(txt)
{
    if (/\D/g.test(txt.value))
        txt.value = txt.value.replace(/\D/g, '');
}

function kiemTraNhapTien(txt)
{
    if (/[^\d]/g.test(txt.value))
        txt.value = txt.value.replace(/[^\d]/g, ''); //"123456789.12";//

    var dpos = txt.value.indexOf('.');
    var txtEnd = '';
    var strNumber = '';
    if (dpos != -1) {
        txtEnd = '.' + txt.value.substring(dpos + 1, txt.value.length);
        strNumber = txt.value.substring(0, dpos);
        //alert(strNumber +" "+ txtEnd);
    }
    else
        strNumber = txt.value;

    var rgx = /(\d+)(\d{3})/;//alert(strNumber +" >< "+ rgx.test(strNumber));    
    while (rgx.test(strNumber)) {
        strNumber = strNumber.replace(rgx, '$1' + ',' + '$2');
        //alert(strNumber);
    }

    txt.value = strNumber + txtEnd;
}

function kiemTraNhapThapPhan(txt)
{
    if (/[^\d\.]/g.test(txt.value))
        txt.value = txt.value.replace(/[^\d\.]/g, ''); //"123456789.12";//

    var dpos = txt.value.indexOf('.');
    var txtEnd = '';
    var strNumber = '';
    if (dpos != -1) {
        txtEnd = '.' + txt.value.substring(dpos + 1, txt.value.length);
        strNumber = txt.value.substring(0, dpos);
        //alert(strNumber +" "+ txtEnd);
    }
    else
        strNumber = txt.value;

    var rgx = /(\d+)(\d{3})/;//alert(strNumber +" >< "+ rgx.test(strNumber));    
    while (rgx.test(strNumber)) {
        strNumber = strNumber.replace(rgx, '$1' + ',' + '$2');
        //alert(strNumber);
    }

    txt.value = strNumber + txtEnd;
}

function init_reload() {
    setInterval(function () {
        if (getSession() === "null")
        {
            window.location.reload();
        }
    }, 7000);
}

function getSession()
{
    var url = "../pages/getSession.jsp";
    var res = "null";
    res = show_data(url);
    return res.trim();
}

function ktquyen(_idUser, _tenForm) {
    var url = "../pages/PhanQuyen/ChiTietPhanQuyen_Functions.jsp?caseName=ktquyen&idUser=" + _idUser + "&tenForm=" + _tenForm;
    var res = "null";
    res = show_data(url);
    res = res.trim(); // alert(_idUser +" || " + _tenForm +" || " + res);
    if (res.localeCompare("") !== 0)
    {
        alert(res);
        window.location = "FrmMain.jsp";
    }    
}

//Kiem tra hop le Ngay thang nam. -> isValidDate;daysInFebruary;daysInFebruary;stripCharsInBag;DaysArray
function isValidDate(dtStr, fieldName) {
    var dtCh = "/";
    var daysInMonth = DaysArray(12);
    var pos1 = dtStr.indexOf(dtCh);
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
    var strDay = dtStr.substring(0, pos1);
    var strMonth = dtStr.substring(pos1 + 1, pos2);
    var strYear = dtStr.substring(pos2 + 1);
    //alert(pos1 + " " + pos2 + " " + strDay + " " + strMonth + " " + strYear);
    var strYr = strYear;
    if (strDay.charAt(0) === "0" && strDay.length > 1)
        strDay = strDay.substring(1);
    if (strMonth.charAt(0) === "0" && strMonth.length > 1)
        strMonth = strMonth.substring(1);
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) === "0" && strYr.length > 1)
            strYr = strYr.substring(1);
    }

    var month = parseInt(strMonth);
    var day = parseInt(strDay);
    var year = parseInt(strYr);
    if (pos1 === -1 || pos2 === -1) {
        alert("Thông báo lỗi ''" + fieldName + "'' : \n\n\t " + fieldName + " phải tuân theo định dạng: ''dd/mm/yyyy''");
        return false;
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        alert("Thông báo lỗi ''" + fieldName + "'' : \n\n\t Vui lòng chọn tháng hợp lệ");
        return false;
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month === 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        alert("Thông báo lỗi ''" + fieldName + "'' : \n\n\t Vui lòng chọn ngày hợp lệ");
        return false;
    }
    if (strYear.length !== 4 || year === 0) {
        alert("Thông báo lỗi ''" + fieldName + "'' : \n\n\t Vui lòng chọn năm hợp lệ");
        return false;
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) !== -1 || isInteger(stripCharsInBag(dtStr, dtCh)) === false) {
        alert("Thông báo lỗi ''" + fieldName + "'' : \n\n\t " + fieldName + " phải tuân theo định dạng: ''dd/mm/yyyy''");
        return false;
    }
    return true;
}

function daysInFebruary(year) {
    return (((year % 4 === 0) && ((!(year % 100 === 0)) || (year % 400 === 0))) ? 29 : 28);
}

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (((c < "0") || (c > "9")))
            return false;
    }
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) === -1)
            returnString += c;
    }
    return returnString;
}

function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31;
        if (i === 4 || i === 6 || i === 9 || i === 11) {
            this[i] = 30;
        }
        if (i === 2) {
            this[i] = 29;
        }
    }
    return this;
}

var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function dochangchuc(so, daydu)
{
    var chuoi = "";
    chuc = Math.floor(so / 10);
    donvi = so % 10;
    if (chuc > 1) {
        chuoi = " " + mangso[chuc] + " mươi";
        if (donvi == 1) {
            chuoi += " mốt";
        }
    } else if (chuc == 1) {
        chuoi = " mười";
        if (donvi == 1) {
            chuoi += " một";
        }
    } else if (daydu && donvi > 0) {
        chuoi = " lẻ";
    }
    if (donvi == 5 && chuc >= 1) {
        chuoi += " lăm";
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
        chuoi += " " + mangso[ donvi ];
    }
    return chuoi;
}
function docblock(so, daydu)
{
    var chuoi = "";
    tram = Math.floor(so / 100);
    so = so % 100;
    if (daydu || tram > 0) {
        chuoi = " " + mangso[tram] + " trăm";
        chuoi += dochangchuc(so, true);
    } else {
        chuoi = dochangchuc(so, false);
    }
    return chuoi;
}
function dochangtrieu(so, daydu)
{
    var chuoi = "";
    trieu = Math.floor(so / 1000000);
    so = so % 1000000;
    if (trieu > 0) {
        chuoi = docblock(trieu, daydu) + " triệu";
        daydu = true;
    }
    nghin = Math.floor(so / 1000);
    so = so % 1000;
    if (nghin > 0) {
        chuoi += docblock(nghin, daydu) + " nghìn";
        daydu = true;
    }
    if (so > 0) {
        chuoi += docblock(so, daydu);
    }
    return chuoi;
}
function docso(so)
{
    if (so == 0)
        return mangso[0];
    var chuoi = "", hauto = "";
    do {
        ty = so % 1000000000;
        so = Math.floor(so / 1000000000);
        if (so > 0) {
            chuoi = dochangtrieu(ty, true) + hauto + chuoi;
        } else {
            chuoi = dochangtrieu(ty, false) + hauto + chuoi;
        }
        hauto = " tỷ";
    } while (so > 0);
    return chuoi;
}

function test(chuoi)
{
    return alert(chuoi);
}


//@author quyetdv
/**
 * Bo dau 1 ky tu
 * 
 * @param ch
 * @return
 */
function boDauKyTu(ch) {
//    // Mang cac ky tu goc co dau
//    var SOURCE_CHARACTERS = ['À', 'Á', 'Â', 'Ã', 'È', 'É',
//        'Ê', 'Ì', 'Í', 'Ò', 'Ó', 'Ô', 'Õ', 'Ù', 'Ú', 'Ý', 'à', 'á', 'â',
//        'ã', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 'õ', 'ù', 'ú', 'ý',
//        'Ă', 'ă', 'Đ', 'đ', 'Ĩ', 'ĩ', 'Ũ', 'ũ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ạ',
//        'ạ', 'Ả', 'ả', 'Ấ', 'ấ', 'Ầ', 'ầ', 'Ẩ', 'ẩ', 'Ẫ', 'ẫ', 'Ậ', 'ậ',
//        'Ắ', 'ắ', 'Ằ', 'ằ', 'Ẳ', 'ẳ', 'Ẵ', 'ẵ', 'Ặ', 'ặ', 'Ẹ', 'ẹ', 'Ẻ',
//        'ẻ', 'Ẽ', 'ẽ', 'Ế', 'ế', 'Ề', 'ề', 'Ể', 'ể', 'Ễ', 'ễ', 'Ệ', 'ệ',
//        'Ỉ', 'ỉ', 'Ị', 'ị', 'Ọ', 'ọ', 'Ỏ', 'ỏ', 'Ố', 'ố', 'Ồ', 'ồ', 'Ổ',
//        'ổ', 'Ỗ', 'ỗ', 'Ộ', 'ộ', 'Ớ', 'ớ', 'Ờ', 'ờ', 'Ở', 'ở', 'Ỡ', 'ỡ',
//        'Ợ', 'ợ', 'Ụ', 'ụ', 'Ủ', 'ủ', 'Ứ', 'ứ', 'Ừ', 'ừ', 'Ử', 'ử', 'Ữ',
//        'ữ', 'Ự', 'ự', ];
//
//    // Mang cac ky tu thay the khong dau
//    var DESTINATION_CHARACTERS = ['A', 'A', 'A', 'A', 'E',
//        'E', 'E', 'I', 'I', 'O', 'O', 'O', 'O', 'U', 'U', 'Y', 'a', 'a',
//        'a', 'a', 'e', 'e', 'e', 'i', 'i', 'o', 'o', 'o', 'o', 'u', 'u',
//        'y', 'A', 'a', 'D', 'd', 'I', 'i', 'U', 'u', 'O', 'o', 'U', 'u',
//        'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A',
//        'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'E', 'e',
//        'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E',
//        'e', 'I', 'i', 'I', 'i', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o',
//        'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O',
//        'o', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u',
//        'U', 'u', 'U', 'u', ];
    var SOURCE_CHARACTERS =
            ['À', 'Á', 'Â', 'Ã', 'Ả', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Ă', 'Ặ', 'Ẵ', 'Ẳ', 'Ằ', 'Ạ', 'Ắ',
                'à', 'á', 'â', 'ã', 'ạ', 'ả', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ',
                'È', 'É', 'Ê', 'Ẹ', 'Ẻ', 'Ẽ', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ',
                'ệ', 'ễ', 'ể', 'ề', 'ế', 'ẽ', 'ẻ', 'ẹ', 'è', 'é', 'ê',
                'Ò', 'Ó', 'Ô', 'Õ', 'Ơ', 'Ọ', 'Ỏ', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ',
                'ợ', 'ò', 'ó', 'ô', 'õ', 'ơ', 'ọ', 'ỏ', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ớ', 'ờ', 'ở', 'ỡ',
                'Ù', 'Ú', 'Ũ', 'Ư', 'Ụ', 'Ủ', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự',
                'ự', 'ù', 'ú', 'ữ', 'ử', 'ừ', 'ứ', 'ủ', 'ụ', 'ư', 'ũ',
                'Ì', 'Í', 'Ĩ', 'Ỉ', 'Ị',
                'ị', 'ĩ', 'ì', 'í', 'ỉ',
                'Đ', 'đ',
                'Ỳ', 'Ý', 'Ỹ',
                'ỳ', 'ý', 'ỹ'];

    // Mang cac ky tu thay the khong dau
    var DESTINATION_CHARACTERS =
            ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
                'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
                'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U',
                'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u',
                'I', 'I', 'I', 'I', 'I',
                'i', 'i', 'i', 'i', 'i',
                'D', 'd',
                'Y', 'Y', 'Y',
                'y', 'y', 'y'];

    var index = 0;
    index = SOURCE_CHARACTERS.indexOf(ch);
    if (index === -1)
        return ch;
    else
        return DESTINATION_CHARACTERS[index];
}

///**
// * Bo dau 1 chuoi
// * 
// * @param s
// * @return
// */
function boDauChuoi(str) {
    var sb = "";
    sb = str;
    sb = sb.trim();
    sb = str.split("");

    var strResult = "";
    for (var i = 0; i < sb.length; i++) {
        strResult = strResult + boDauKyTu(sb[i]);
    }
    return strResult;
}

//03.09.2016 //Hàm kiểm tra nhập ID phim 
function KiemTraNhapIDPhim(txt)
{
    if (/[^\d\;]/g.test(txt.value))
        txt.value = txt.value.replace(/[^\d\;]/g, '');
    //alert(txt.value);
}

//10.07.2018 //Tự động cộng ngày Kết thúc từ ngày Bắt đầu
function autoThemNamKetThuc(soNam, inNgayBD, outNgayKT)
{
    var inYear = soNam;
    var strBD = "1/1/2018";
    strBD = document.getElementById(inNgayBD).value;

    var strTemp = strBD.split('/');
    inYear = inYear + parseInt(strTemp[2]);

    document.getElementById(outNgayKT).value = strTemp[0] + "/" + strTemp[1] + "/" + inYear;
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