/*********************************** DOM EXTENSION ******************************************* */
var css = document.createElement("link");
css.type="text/css";
css.rel="stylesheet";
css.href="http://localhost:8080/mock.css";
document.body.appendChild(css);
if(/Android/.test(window.navigator.userAgent)){
    var link = document.createElement("link");
    link.href = "//localhost:8080/iframe-android.css";
    link.rel="stylesheet";
    link.type="text/css";
    link.media="screen";
    document.body.appendChild(link);
}
css.onload = function (e) {
    var xhr = new XMLHttpRequest;
    xhr.open("get","http://localhost:8080/mock.html",true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState ==4){
                        if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304){
                            var ntvShareSpan = document.createElement("span");
                            ntvShareSpan.innerHTML = xhr.responseText;
                            document.body.appendChild(ntvShareSpan);
                        }
                    }
                };

    xhr.onload =function(){
        var js = document.createElement("script");
        js.src = "http://localhost:8080/mock.js";
        document.body.appendChild(js);
    };
   xhr.send(null);
};
/*********************************** IFRAME ******************************************* */


var iframe = document.createElement("iframe");
iframe.src = "http://localhost:8080/iframe?p=4F015E1713204059B9F5C9ABC8ECC02F&vid=D7DF73B1BD4E4DDBB80D31EBA2525C35";
iframe.id = "ntv-iframe";
iframe.width = "100%";
iframe.height="100%";
iframe.style.top="0px";
iframe.style.position = "fixed";
iframe.style.zIndex ="9999";
iframe.style.display= "none";
document.body.appendChild(iframe);


var button = document.createElement("button");
button.style.position ="fixed";
button.style.top="0px";
button.style.left="0px";
button.id = "ntv_toggle";
button.innerText = "toggle";
button.style.width = "100px";
button.style.height="50px";
button.style.zIndex = "99999";
button.style.backgroundColor="#fff";
document.body.appendChild(button);

document.getElementById("ntv_toggle").addEventListener("click", function(e){    
    (/(none)/.test(iframe.style.display) ) ? iframe.style.display= "block" : iframe.style.display= "none" ;
    if(iframe.style.display== "block"){
        iframe.contentWindow.postMessage("Shown","http://localhost:8080/iframe?p=4F015E1713204059B9F5C9ABC8ECC02F&vid=D7DF73B1BD4E4DDBB80D31EBA2525C35");
    }
},false);

window.onmessage =function(event){
    if(event.origin == "http://localhost:8080"){
        (event.data) ? (iframe.style.display= "none") : "";
    }        
};


/************************* NATIVE IFRAME *******************************************************/

var iframe = document.createElement("iframe");
iframe.id = "ntv-iframe";
iframe.width = "100%";
iframe.height="100%";
iframe.style.top="0px";
iframe.style.position = "fixed";
iframe.style.zIndex ="9999";
iframe.style.display= "none";
document.body.appendChild(iframe);

var button = document.createElement("button");
button.style.position ="fixed";
button.style.top="0px";
button.style.left="0px";
button.id = "ntv_toggle";
button.innerText = "toggle";
button.style.width = "100px";
button.style.height="50px";
button.style.zIndex = "99999";
button.style.backgroundColor="#fff";
document.body.appendChild(button);


var xhr = new XMLHttpRequest;
xhr.open("get","http://localhost:8080/inline.html",true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState ==4){
                    if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304){
                        
                        var iframeDoc = iframe.contentWindow.document;
                        console.log(window.navigator.userAgent.match(/Android/gi) instanceof Array);
                        var responseText =  xhr.responseText;
                        if(/Android/.test(window.navigator.userAgent)){
                            responseText = responseText + '<link href="//localhost:8080/inline-android.css" rel="stylesheet" type="text/css" media="screen"/>';
                        }
                        iframeDoc.body.innerHTML = responseText;
                        iframeDoc.getElementById("ntv_cancel").addEventListener("click", function(e){   
                            var event = e || window.event;             
                            (typeof event.preventDefault != "undefined" ) ? event.preventDefault() : event.returnValue = false;
                            document.getElementById("ntv-iframe").style.display = "none";                            
                        },false);
                        
                    }
                }
            };
xhr.send(null);
document.getElementById("ntv_toggle").addEventListener("click", function(e){   
    var doc = document; 
    if(doc.getElementById("ntv-iframe") != null){                
        doc.getElementById("ntv-iframe").style.display = (doc.getElementById("ntv-iframe").style.display == "none") ? "block" : "none" ;
    }
},false);

