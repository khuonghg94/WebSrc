/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function show_data(url){ 
        xmlHttp=GetXmlHttpObject();
        if (xmlHttp===null){
            alert ("Browser does not support HTTP Request");
            return null;
        } 
        xmlHttp.open("GET",url,false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
}
function GetXmlHttpObject(){
    var xmlHttp=null;
    try{
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }catch (e){
    //Internet Explorer
        try{
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}
