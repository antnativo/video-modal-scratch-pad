/******************** INSERT CONTENT INTO IFRAME USING PRDOM QUERY ***********************************************/


function insertMobileIframeContent(nodeId,styleUrl,bodyInnerHtml){
    var iframeNode = prdom.query("#" + nodeId),
        iframeNodeContent = iframeNode.contents()[0];
    prdom.query(iframeNodeContent).find("#ntv_cancel").click( function(event){
        (typeof event.preventDefault != "undefined" ) ? event.preventDefault() : event.returnValue = false;
        iframeNode.css("display" , "none");
    },false);
}