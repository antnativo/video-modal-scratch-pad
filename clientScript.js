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
iframe.style.left="0px";
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
                        iframeDoc.head.innerHTML ='<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">';
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
/*document.getElementById("ntv_toggle").addEventListener("click", function(e){   
    var doc = document; 
    if(doc.getElementById("ntv-iframe") != null){                
        doc.getElementById("ntv-iframe").style.display = (doc.getElementById("ntv-iframe").style.display == "none") ? "block" : "none" ;
    }
},false);*/





document.getElementById("ntv_toggle").addEventListener("click", function(e){   
    var doc = document; 
    if(doc.getElementById("ntv-iframe") != null){      
        document.body.style.position = (doc.getElementById("ntv-iframe").style.display == "none")  ? "fixed" : "inherit" ;          
        doc.getElementById("ntv-iframe").style.display = (doc.getElementById("ntv-iframe").style.display == "none") ? "block" : "none" ;
    }
},false);
window.addEventListener("orientationchange", function (event){
     var doc = document; 
    if( ((window.orientation == 90) || (window.orientation ==  -90)) && doc.getElementById("ntv-iframe").style.display == "block"){
        doc.body.style.position="inherit";
    }else if(((window.orientation == 0) || (window.orientation ==  180)) && doc.getElementById("ntv-iframe").style.display == "block"){
        doc.body.style.position="fixed";
    }else{
        doc.body.style.position="inherit";
    }
}, false); 

var meta = document.createElement("meta");
meta.name="viewport";meta.id="viewport";meta.content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
document.head.appendChild(meta);




/******************** INSERT CONTENT INTO IFRAME USING PRDOM QUERY ***********************************************/


function insertMobileIframeContent(nodeId,styleUrl,bodyInnerHtml){
    var iframeNode = prdom.query("#" + nodeId),
    iframeNodeContent = iframeNode.contents()[0];
    prdom.query(iframeNodeContent).find("#ntv_cancel").click( function(event){
        (typeof event.preventDefault != "undefined" ) ? event.preventDefault() : event.returnValue = false;
        iframeNode.css("display" , "none");
    },false);
}


/******************* TEST ON IPHONE  *******************************************************************************/
var iframe = document.createElement("iframe");
iframe.id = "ntv-iframe";
iframe.width = "100%";
iframe.height="100%";
iframe.style.top="0px";
iframe.style.left="0px";
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

var iframeDoc = iframe.contentWindow.document;
var responseText =  '<style>body{overflow: auto !important; margin: 0px !important; display: inline !important; font-family: Arial, Helvetica, sans-serif !important;}button#ntv_toggle{position:fixed !important; top:0px !important; left:0px !important; z-index:999999 !important; background-color:#fff !important;}.ntv_hide{bottom:-500px !important; display:none !important;}.ntv_show{bottom:0px !important;}.ntv_modalHide{display: none !important;}#ntv-share-background{min-width: 100% !important; min-height: 100% !important; position: fixed !important; background: rgba(0,0,0,0.5) !important; z-index: 99999 !important; top: 0px !important; left:0px !important;}#ntv-share-area{font-size:14px !important; position: fixed !important; height: auto !important; border-radius: 5px !important; padding: 0px !important; left:0px !important; right:0px !important; background: none !important; z-index:999999 !important; width: 95% !important; max-width: 450px !important; margin: auto !important; height:100%; /**********/ bottom: 20px !important;}#ntv-share-buttons{margin-bottom:15px !important; height: auto !important; align-content: center !important; background: none !important; position: inherit !important; bottom:100px !important; width:100% !important;}#ntv-share-buttons button.ntv-button{width: 23% !important; margin-left:1.25% !important;}button,button.ntv-button{-webkit-writing-mode: none!important; -webkit-appearance: button !important; margin: 0em 0em 0em 0em !important; font: 11px Arial, Helvetica, sans-serif !important; text-rendering: auto !important; letter-spacing: normal !important; word-spacing: normal !important; text-transform: none !important; text-indent: 0px !important; text-shadow: none !important; font-size:1em !important; border: solid 1px #000 !important; font-family: Arial, Helvetica, sans-serif !important; color: #000 !important; font-size: 100% !important; padding: 1em 1em !important; background-color: #fff !important; text-decoration: none !important; border-radius: 5px !important; display: inline-block !important; line-height: normal !important; white-space: nowrap !important; vertical-align: middle !important; text-align: center !important; cursor: pointer !important; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important; height:auto !important;}button#ntv-btn-cancel-share{width:100% !important; height:100px !important; border-radius: 5px !important; background: #fff !important; position: inherit !important; bottom:10px !important;}/*************************************************************************/#ntv_sharecard{font-size: 14px !important; max-width: 500px !important; height:100% !important; bottom:0px !important; height:auto !important; /***********/ width: 95% !important; margin: auto auto !important; position: relative !important; top: 25% !important; bottom: 25% !important;}.ntv_sections{width:100% !important; background-color:#fff !important; margin-top:3px !important; margin-bottom:3px !important; padding-top:3px !important; padding-bottom:3px !important;}#ntv_preview{top:0px !important; width: 100% !important; /*height: 49% !important; min-height: 49px !important;*/ border-top-left-radius: 5px !important; border-top-right-radius: 5px !important; margin-top:0px !important;}#ntv_preview .ntv_content{margin-top:5px !important;}#ntv_preview .ntv_video-title{margin-top: 10px !important;}#ntv_preview img.ntv_preview_image{width:100% !important;}#ntv_description{width: 100% !important; /*height: 29% !important;*/ font-size: .65em !important;}#ntv_description a{clear: both; color:#000 !important; margin-top:10px !important; font-weight: bold !important; display: block !important;}#ntv_share{width: 100% !important; /*height: 19% !important; min-height: 19px !important;*/ border-bottom-left-radius: 5px !important; border-bottom-right-radius: 5px !important;}#ntv_share #ntv_sharetitle{text-align: center !important; width:100% !important; font-weight: 50% !important; font-size: .8em !important; color:#777 !important;}#ntv_share .ntv_wrappers{width:24% !important; display:inline-block !important; align-content: center !important;}#ntv_share .ntv_socialsharetitle{font-size:.75em !important; text-align: center !important;}#ntv_share a{display: block !important; width: 71px !important; height:71px !important; border-radius: 10px !important; margin: 0px auto !important;}#ntv_share a#ntv_facebook{background: url(http://s.ntv.io/img/player-sprite.png) !important;}#ntv_share a#ntv_twitter{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -72px 0px !important;}#ntv_share a#ntv_pintrest{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -216px 0px !important;}#ntv_share a#ntv_linkedin{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -144px 0px !important;}#ntv_share #ntv_sharetitle{margin-top: 5px !important;}#ntv_cancel{margin-top:10px !important; border-radius: 5px !important; padding: 10px 0px !important; background: #fff !important; font-size: 1.2em !important; display: block !important; text-decoration: none !important; width:100% !important; color:#000 !important; cursor: pointer !important; text-align: center !important;}.ntv_content{margin: 10px 10px !important;}@media screen and (min-width:375px){#ntv_share a{display: block !important; width: 71px !important; height:71px !important; border-radius: 15px !important; margin: 0px auto !important;}}@media screen and (max-width:374px){#ntv_share .ntv_wrappers{width:23.8% !important; display:inline-block !important;}#ntv_share a{display: block !important; width: 40px !important; height: 40px !important; border-radius: 5px !important;}#ntv_share a#ntv_facebook{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -0px -72px !important;}#ntv_share a#ntv_twitter{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -40px -72px !important;}#ntv_share a#ntv_pintrest{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -121px -72px !important;}#ntv_share a#ntv_linkedin{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -81px -72px !important;}}@media screen and (max-height:481px){#sharecard{font-size: 14px !important; width: 100% !important; max-width: 500px !important; height: 100% !important; margin: 0px auto !important; position: fixed !important; top: 0px !important; height: auto !important; height: 400px !important;}.ntv_sections{width: 100% !important; background-color: #fff !important; margin-top: 2px !important; margin-bottom: 2px !important; padding-top: 2px !important; padding-bottom: 2px !important;}#ntv_cancel{margin-top: 10px !important; border-radius: 5px !important; padding: 10px 0px !important; background: #fff !important; font-size: 1.2em !important; display: block !important; text-decoration: none !important; width: 100% !important; color: #000 !important; cursor: pointer !important; text-align: center !important; height: auto !important;}}@media screen and (max-width:799px){#ntv_sharecard{font-size: 14px !important; width: 95% !important; max-width: none !important; height: 100% !important; /*position: fixed !important;*/ bottom: 0px !important; /*height: auto !important;*/}}@media screen and (max-width:799px) and (min-width:667px) and (orientation: landscape){#ntv-share-area{bottom: none !important; position: absolute !important; height: auto !important; width: 95% !important; max-width: 400px !important;}#ntv_sharecard{max-width: 95% !important; /*max-height: 100px !important;*/ position: relative !important;}.ntv_content{margin: 2px 20px !important;}#ntv_share .ntv_wrappers{width:23.8% !important; display:inline-block !important;}#ntv_share a{display: block !important; width: 40px !important; height: 40px !important; border-radius: 5px !important;}#ntv_share a#ntv_facebook{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -0px -72px !important;}#ntv_share a#ntv_twitter{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -40px -72px !important;}#ntv_share a#ntv_pintrest{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -121px -72px !important;}#ntv_share a#ntv_linkedin{background: url(http://s.ntv.io/img/player-sprite.png) !important; background-position: -81px -72px !important;}}@media screen and (max-width:666px) and (min-width:479px) and (orientation: landscape){#ntv-share-area{position: absolute !important;}#ntv_sharecard{max-width: 100% !important;}.ntv_content{margin: 10px 10px !important; height: 100% !important;}#ntv_preview{min-height: 49px !important;}#ntv_sharecard{position:relative !important;}}@media screen and (min-width:800px){#ntv_sharecard{position: relative !important; max-width: 95% !important; top:10px !important;}}</style><div id="ntv-share-background" class=""></div><div id="ntv-share-area" class=""> <div id="ntv_sharecard"> <div id="ntv_preview" class="ntv_sections"> <div class="ntv_content"><!--video-- id="ntv_video" poster="http://ntvimg-a.akamaihd.net/4F015E1713204059B9F5C9ABC8ECC02F.png?mode=crop&width=480&height=169" controls src="" style="width:100%;"> <p> Can not display video </p></video--> <img src="//ntvimg-a.akamaihd.net/4F015E1713204059B9F5C9ABC8ECC02F.png?mode=crop&width=480&height=169" class="ntv_preview_image"> <div class="ntv_video-title"> A Test Nativo Message A Test Nativo Message A Test Nativo Message A Test Nativo Message </div></div></div><div id="ntv_description" class="ntv_sections"> <div class="ntv_content"> <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate orci ut pellentesque aliquet. Cras auctor nisl nisi, </div><a href="#">Click Out Link Text</a> </div></div><div id="ntv_share" class="ntv_sections"> <div id="ntv_sharetitle">SHARE VIDEO</div><div class="ntv_content"> <div class="ntv_wrappers"> <a href="#" id="ntv_facebook"></a> <div class="ntv_socialsharetitle">facebook</div></div><div class="ntv_wrappers"> <a href="#" id="ntv_twitter"></a> <div class="ntv_socialsharetitle">twitter</div></div><div class="ntv_wrappers"> <a href="#" id="ntv_pintrest"></a> <div class="ntv_socialsharetitle">pintrest</div></div><div class="ntv_wrappers"> <a href="#" id="ntv_linkedin"></a> <div class="ntv_socialsharetitle">linkedin</div></div></div></div><a href="#" rel="nofollow" id="ntv_cancel" class="ntv_sections">Cancel</a> </div>';


if(/Android/.test(window.navigator.userAgent)){
    responseText = responseText + '<link href="//localhost:8080/inline-android.css" rel="stylesheet" type="text/css" media="screen"/>';
}
iframeDoc.head.innerHTML ='<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">';
iframeDoc.body.innerHTML = responseText;
iframeDoc.getElementById("ntv_cancel").addEventListener("click", function(e){   
    var event = e || window.event;             
    (typeof event.preventDefault != "undefined" ) ? event.preventDefault() : event.returnValue = false;
    document.body.style.position="fixed";
    document.getElementById("ntv-iframe").style.display = "none";                            
},false);





document.getElementById("ntv_toggle").addEventListener("click", function(e){   
    var doc = document; 
    if(doc.getElementById("ntv-iframe") != null){      
        document.body.style.position = (doc.getElementById("ntv-iframe").style.display == "none")  ? "fixed" : "inherit" ;          
        doc.getElementById("ntv-iframe").style.display = (doc.getElementById("ntv-iframe").style.display == "none") ? "block" : "none" ;
    }
},false);
window.addEventListener("orientationchange", function (event){
     var doc = document; 
    if( ((window.orientation == 90) || (window.orientation ==  -90)) && doc.getElementById("ntv-iframe").style.display == "block"){
        doc.body.style.position="inherit";
    }else if(((window.orientation == 0) || (window.orientation ==  180)) && doc.getElementById("ntv-iframe").style.display == "block"){
        doc.body.style.position="fixed";
    }else{
        doc.body.style.position="inherit";
    }
}, false); 

var meta = document.createElement("meta");
meta.name="viewport";meta.id="viewport";meta.content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
document.head.appendChild(meta);
//var iframeMeta = meta.cloneNode(true);
//prdom.query(prdom.query(prdom.query(prdom.query("iframe#ntv-iframe")).contents()[0]).head).append(iframeMeta);


/******************** Track Gesture on iPhone ***********************/
function resize(scale){
    prdom.query(prdom.query("iframe#ntv-iframe"))
        .attr("width",(window.innerWidth -((window.innerWidth - window.screen.width) / (scale.toFixed(2) *100) ))+"px");
}
window.ongestureend =function(e){
    console.log("Gesture End");
    console.log(e); 
    scale = e.scale;
    setTimeout(function(){resize(e.scale);},1000)

}

prdom.query(prdom.query("iframe#ntv-iframe")).ongestureend = function(e){
        console.log("Gesture End");
        console.log(e); 
        scale = e.scale;
        setTimeout(function(){resize(e.scale);},1000)
}




window.addEventListener("gesturestart",function(e){console.log("Gesture Start");console.log(e);},false)
window.addEventListener("gesturechange",function(e){console.log("Gesture Update");console.log(e);},false);
window.addEventListener("gestureend",function(e){console.log("Gesture End");console.log(e);},false);

document.body.style.position="fixed";