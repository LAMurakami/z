if(dwr==null)var dwr={};if(dwr.engine==null)dwr.engine={};if(DWREngine==null)var DWREngine=dwr.engine;dwr.engine.setErrorHandler=function(handler){dwr.engine._errorHandler=handler;};dwr.engine.setWarningHandler=function(handler){dwr.engine._warningHandler=handler;};dwr.engine.setTextHtmlHandler=function(handler){dwr.engine._textHtmlHandler=handler;}
dwr.engine.setTimeout=function(timeout){dwr.engine._timeout=timeout;};dwr.engine.setPreHook=function(handler){dwr.engine._preHook=handler;};dwr.engine.setPostHook=function(handler){dwr.engine._postHook=handler;};dwr.engine.setHeaders=function(headers){dwr.engine._headers=headers;};dwr.engine.setParameters=function(parameters){dwr.engine._parameters=parameters;};dwr.engine.XMLHttpRequest=1;dwr.engine.IFrame=2;dwr.engine.ScriptTag=3;dwr.engine.setRpcType=function(newType){if(newType!=dwr.engine.XMLHttpRequest&&newType!=dwr.engine.IFrame&&newType!=dwr.engine.ScriptTag){dwr.engine._handleError(null,{name:"dwr.engine.invalidRpcType",message:"RpcType must be one of dwr.engine.XMLHttpRequest or dwr.engine.IFrame or dwr.engine.ScriptTag"});return;}
dwr.engine._rpcType=newType;};dwr.engine.setHttpMethod=function(httpMethod){if(httpMethod!="GET"&&httpMethod!="POST"){dwr.engine._handleError(null,{name:"dwr.engine.invalidHttpMethod",message:"Remoting method must be one of GET or POST"});return;}
dwr.engine._httpMethod=httpMethod;};dwr.engine.setOrdered=function(ordered){dwr.engine._ordered=ordered;};dwr.engine.setAsync=function(async){dwr.engine._async=async;};dwr.engine.setActiveReverseAjax=function(activeReverseAjax){if(activeReverseAjax){if(dwr.engine._activeReverseAjax)return;dwr.engine._activeReverseAjax=true;dwr.engine._poll();}
else{if(dwr.engine._activeReverseAjax&&dwr.engine._pollReq)dwr.engine._pollReq.abort();dwr.engine._activeReverseAjax=false;}};dwr.engine.setPollType=function(newPollType){if(newPollType!=dwr.engine.XMLHttpRequest&&newPollType!=dwr.engine.IFrame){dwr.engine._handleError(null,{name:"dwr.engine.invalidPollType",message:"PollType must be one of dwr.engine.XMLHttpRequest or dwr.engine.IFrame"});return;}
dwr.engine._pollType=newPollType;};dwr.engine.defaultErrorHandler=function(message,ex){dwr.engine._debug("Error: "+ex.name+", "+ex.message,true);if(message==null||message=="")alert("A server error has occured. More information may be available in the console.");else if(message.indexOf("0x80040111")!=-1)dwr.engine._debug(message);else alert(message);};dwr.engine.defaultWarningHandler=function(message,ex){dwr.engine._debug(message);};dwr.engine.beginBatch=function(){if(dwr.engine._batch){dwr.engine._handleError(null,{name:"dwr.engine.batchBegun",message:"Batch already begun"});return;}
dwr.engine._batch=dwr.engine._createBatch();};dwr.engine.endBatch=function(options){var batch=dwr.engine._batch;if(batch==null){dwr.engine._handleError(null,{name:"dwr.engine.batchNotBegun",message:"No batch in progress"});return;}
dwr.engine._batch=null;if(batch.map.callCount==0)return;if(options)dwr.engine._mergeBatch(batch,options);if(dwr.engine._ordered&&dwr.engine._batchesLength!=0){dwr.engine._batchQueue[dwr.engine._batchQueue.length]=batch;}
else{dwr.engine._sendData(batch);}};dwr.engine.setPollMethod=function(type){dwr.engine.setPollType(type);};dwr.engine.setMethod=function(type){dwr.engine.setRpcType(type);};dwr.engine.setVerb=function(verb){dwr.engine.setHttpMethod(verb);};dwr.engine._origScriptSessionId="AAF4B8C3E8C8192D204964D437F973DC";dwr.engine._sessionCookieName="JSESSIONID";dwr.engine._allowGetForSafariButMakeForgeryEasier="false";dwr.engine._scriptTagProtection="throw 'allowScriptTagRemoting is false.';";dwr.engine._defaultPath="/booking/dwr";dwr.engine._scriptSessionId=null;dwr.engine._getScriptSessionId=function(){if(dwr.engine._scriptSessionId==null){dwr.engine._scriptSessionId=dwr.engine._origScriptSessionId+Math.floor(Math.random()*1000);}
return dwr.engine._scriptSessionId;};dwr.engine._errorHandler=dwr.engine.defaultErrorHandler;dwr.engine._warningHandler=dwr.engine.defaultWarningHandler;dwr.engine._preHook=null;dwr.engine._postHook=null;dwr.engine._batches={};dwr.engine._batchesLength=0;dwr.engine._batchQueue=[];dwr.engine._rpcType=dwr.engine.XMLHttpRequest;dwr.engine._httpMethod="POST";dwr.engine._ordered=false;dwr.engine._async=true;dwr.engine._batch=null;dwr.engine._timeout=0;dwr.engine._DOMDocument=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];dwr.engine._XMLHTTP=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];dwr.engine._activeReverseAjax=false;dwr.engine._pollType=dwr.engine.XMLHttpRequest;dwr.engine._outstandingIFrames=[];dwr.engine._pollReq=null;dwr.engine._pollCometInterval=200;dwr.engine._pollRetries=0;dwr.engine._maxPollRetries=0;dwr.engine._textHtmlHandler=null;dwr.engine._headers=null;dwr.engine._parameters=null;dwr.engine._postSeperator="\n";dwr.engine._defaultInterceptor=function(data){return data;}
dwr.engine._urlRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._contentRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._replyRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._nextBatchId=0;dwr.engine._propnames=["rpcType","httpMethod","async","timeout","errorHandler","warningHandler","textHtmlHandler"];dwr.engine._partialResponseNo=0;dwr.engine._partialResponseYes=1;dwr.engine._partialResponseFlush=2;dwr.engine._execute=function(path,scriptName,methodName,vararg_params){var singleShot=false;if(dwr.engine._batch==null){dwr.engine.beginBatch();singleShot=true;}
var batch=dwr.engine._batch;var args=[];for(var i=0;i<arguments.length-3;i++){args[i]=arguments[i+3];}
if(batch.path==null){batch.path=path;}
else{if(batch.path!=path){dwr.engine._handleError(batch,{name:"dwr.engine.multipleServlets",message:"Can't batch requests to multiple DWR Servlets."});return;}}
var callData;var lastArg=args[args.length-1];if(typeof lastArg=="function"||lastArg==null)callData={callback:args.pop()};else callData=args.pop();dwr.engine._mergeBatch(batch,callData);batch.handlers[batch.map.callCount]={exceptionHandler:callData.exceptionHandler,callback:callData.callback};var prefix="c"+batch.map.callCount+"-";batch.map[prefix+"scriptName"]=scriptName;batch.map[prefix+"methodName"]=methodName;batch.map[prefix+"id"]=batch.map.callCount;for(i=0;i<args.length;i++){dwr.engine._serializeAll(batch,[],args[i],prefix+"param"+i);}
batch.map.callCount++;if(singleShot)dwr.engine.endBatch();};dwr.engine._poll=function(overridePath){if(!dwr.engine._activeReverseAjax)return;var batch=dwr.engine._createBatch();batch.map.id=0;batch.map.callCount=1;batch.isPoll=true;if(navigator.userAgent.indexOf("Gecko/")!=-1){batch.rpcType=dwr.engine._pollType;batch.map.partialResponse=dwr.engine._partialResponseYes;}
else if(document.all){batch.rpcType=dwr.engine.IFrame;batch.map.partialResponse=dwr.engine._partialResponseFlush;}
else{batch.rpcType=dwr.engine._pollType;batch.map.partialResponse=dwr.engine._partialResponseNo;}
batch.httpMethod="POST";batch.async=true;batch.timeout=0;batch.path=(overridePath)?overridePath:dwr.engine._defaultPath;batch.preHooks=[];batch.postHooks=[];batch.errorHandler=dwr.engine._pollErrorHandler;batch.warningHandler=dwr.engine._pollErrorHandler;batch.handlers[0]={callback:function(pause){dwr.engine._pollRetries=0;setTimeout("dwr.engine._poll()",pause);}};dwr.engine._sendData(batch);if(batch.rpcType==dwr.engine.XMLHttpRequest){dwr.engine._checkCometPoll();}};dwr.engine._pollErrorHandler=function(msg,ex){dwr.engine._pollRetries++;dwr.engine._debug("Reverse Ajax poll failed (pollRetries="+dwr.engine._pollRetries+"): "+ex.name+" : "+ex.message);if(dwr.engine._pollRetries<dwr.engine._maxPollRetries){setTimeout("dwr.engine._poll()",10000);}
else{dwr.engine._debug("Giving up.");}};dwr.engine._createBatch=function(){var batch={map:{callCount:0,page:window.location.pathname+window.location.search,httpSessionId:dwr.engine._getJSessionId(),scriptSessionId:dwr.engine._getScriptSessionId()},charsProcessed:0,paramCount:0,headers:[],parameters:[],isPoll:false,headers:{},handlers:{},preHooks:[],postHooks:[],rpcType:dwr.engine._rpcType,httpMethod:dwr.engine._httpMethod,async:dwr.engine._async,timeout:dwr.engine._timeout,errorHandler:dwr.engine._errorHandler,warningHandler:dwr.engine._warningHandler,textHtmlHandler:dwr.engine._textHtmlHandler};if(dwr.engine._preHook)batch.preHooks.push(dwr.engine._preHook);if(dwr.engine._postHook)batch.postHooks.push(dwr.engine._postHook);var propname,data;if(dwr.engine._headers){for(propname in dwr.engine._headers){data=dwr.engine._headers[propname];if(typeof data!="function")batch.headers[propname]=data;}}
if(dwr.engine._parameters){for(propname in dwr.engine._parameters){data=dwr.engine._parameters[propname];if(typeof data!="function")batch.parameters[propname]=data;}}
return batch;}
dwr.engine._mergeBatch=function(batch,overrides){var propname,data;for(var i=0;i<dwr.engine._propnames.length;i++){propname=dwr.engine._propnames[i];if(overrides[propname]!=null)batch[propname]=overrides[propname];}
if(overrides.preHook!=null)batch.preHooks.unshift(overrides.preHook);if(overrides.postHook!=null)batch.postHooks.push(overrides.postHook);if(overrides.headers){for(propname in overrides.headers){data=overrides.headers[propname];if(typeof data!="function")batch.headers[propname]=data;}}
if(overrides.parameters){for(propname in overrides.parameters){data=overrides.parameters[propname];if(typeof data!="function")batch.map["p-"+propname]=""+data;}}};dwr.engine._getJSessionId=function(){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=cookies[i];while(cookie.charAt(0)==' ')cookie=cookie.substring(1,cookie.length);if(cookie.indexOf(dwr.engine._sessionCookieName+"=")==0){return cookie.substring(11,cookie.length);}}
return"";}
dwr.engine._checkCometPoll=function(){for(var i=0;i<dwr.engine._outstandingIFrames.length;i++){var text="";var iframe=dwr.engine._outstandingIFrames[i];try{text=dwr.engine._getTextFromCometIFrame(iframe);}
catch(ex){dwr.engine._handleWarning(iframe.batch,ex);}
if(text!="")dwr.engine._processCometResponse(text,iframe.batch);}
if(dwr.engine._pollReq){var req=dwr.engine._pollReq;var text=req.responseText;dwr.engine._processCometResponse(text,req.batch);}
if(dwr.engine._outstandingIFrames.length>0||dwr.engine._pollReq){setTimeout("dwr.engine._checkCometPoll()",dwr.engine._pollCometInterval);}};dwr.engine._getTextFromCometIFrame=function(frameEle){var body=frameEle.contentWindow.document.body;if(body==null)return"";var text=body.innerHTML;if(text.indexOf("<PRE>")==0||text.indexOf("<pre>")==0){text=text.substring(5,text.length-7);}
return text;};dwr.engine._processCometResponse=function(response,batch){if(batch.charsProcessed==response.length)return;if(response.length==0){batch.charsProcessed=0;return;}
var firstStartTag=response.indexOf("//#DWR-START#",batch.charsProcessed);if(firstStartTag==-1){batch.charsProcessed=response.length;return;}
var lastEndTag=response.lastIndexOf("//#DWR-END#");if(lastEndTag==-1){return;}
if(response.charCodeAt(lastEndTag+11)==13&&response.charCodeAt(lastEndTag+12)==10){batch.charsProcessed=lastEndTag+13;}
else{batch.charsProcessed=lastEndTag+11;}
var exec=response.substring(firstStartTag+13,lastEndTag);dwr.engine._receivedBatch=batch;dwr.engine._eval(exec);dwr.engine._receivedBatch=null;};dwr.engine._sendData=function(batch){batch.map.batchId=dwr.engine._nextBatchId++;dwr.engine._batches[batch.map.batchId]=batch;dwr.engine._batchesLength++;batch.completed=false;for(var i=0;i<batch.preHooks.length;i++){batch.preHooks[i]();}
batch.preHooks=null;if(batch.timeout&&batch.timeout!=0){batch.interval=setInterval(function(){dwr.engine._abortRequest(batch);},batch.timeout);}
if(batch.rpcType==dwr.engine.XMLHttpRequest){if(window.XMLHttpRequest){batch.req=new XMLHttpRequest();}
else if(window.ActiveXObject&&!(navigator.userAgent.indexOf("Mac")>=0&&navigator.userAgent.indexOf("MSIE")>=0)){batch.req=dwr.engine._newActiveXObject(dwr.engine._XMLHTTP);}}
var prop,request;if(batch.req){if(batch.async){batch.req.onreadystatechange=function(){dwr.engine._stateChange(batch);};}
if(batch.isPoll){dwr.engine._pollReq=batch.req;batch.req.batch=batch;}
var indexSafari=navigator.userAgent.indexOf("Safari/");if(indexSafari>=0){var version=navigator.userAgent.substring(indexSafari+7);if(parseInt(version,10)<400){if(dwr.engine._allowGetForSafariButMakeForgeryEasier=="true")batch.httpMethod="GET";else dwr.engine._handleWarning(batch,{name:"dwr.engine.oldSafari",message:"Safari GET support disabled. See getahead.org/dwr/server/servlet and allowGetForSafariButMakeForgeryEasier."});}}
batch.mode=batch.isPoll?dwr.engine._ModePlainPoll:dwr.engine._ModePlainCall;request=dwr.engine._constructRequest(batch);try{batch.req.open(batch.httpMethod,request.url,batch.async);try{for(prop in batch.headers){var value=batch.headers[prop];if(typeof value=="string")batch.req.setRequestHeader(prop,value);}
if(!batch.headers["Content-Type"])batch.req.setRequestHeader("Content-Type","text/plain");}
catch(ex){dwr.engine._handleWarning(batch,ex);}
batch.req.send(request.body);if(!batch.async)dwr.engine._stateChange(batch);}
catch(ex){dwr.engine._handleError(batch,ex);}}
else if(batch.rpcType!=dwr.engine.ScriptTag){var idname=batch.isPoll?"dwr-if-poll-"+batch.map.batchId:"dwr-if-"+batch.map["c0-id"];batch.div=document.createElement("div");batch.div.innerHTML="<iframe src='javascript:void(0)' frameborder='0' style='width:0px;height:0px;border:0;' id='"+idname+"' name='"+idname+"'></iframe>";document.body.appendChild(batch.div);batch.iframe=document.getElementById(idname);batch.iframe.batch=batch;batch.mode=batch.isPoll?dwr.engine._ModeHtmlPoll:dwr.engine._ModeHtmlCall;if(batch.isPoll)dwr.engine._outstandingIFrames.push(batch.iframe);request=dwr.engine._constructRequest(batch);if(batch.httpMethod=="GET"){batch.iframe.setAttribute("src",request.url);}
else{batch.form=document.createElement("form");batch.form.setAttribute("id","dwr-form");batch.form.setAttribute("action",request.url);batch.form.setAttribute("target",idname);batch.form.target=idname;batch.form.setAttribute("method",batch.httpMethod);for(prop in batch.map){var value=batch.map[prop];if(typeof value!="function"){var formInput=document.createElement("input");formInput.setAttribute("type","hidden");formInput.setAttribute("name",prop);formInput.setAttribute("value",value);batch.form.appendChild(formInput);}}
document.body.appendChild(batch.form);batch.form.submit();}}
else{batch.httpMethod="GET";batch.mode=batch.isPoll?dwr.engine._ModePlainPoll:dwr.engine._ModePlainCall;request=dwr.engine._constructRequest(batch);batch.script=document.createElement("script");batch.script.id="dwr-st-"+batch.map["c0-id"];batch.script.src=request.url;document.body.appendChild(batch.script);}};dwr.engine._ModePlainCall="/call/plaincall/";dwr.engine._ModeHtmlCall="/call/htmlcall/";dwr.engine._ModePlainPoll="/call/plainpoll/";dwr.engine._ModeHtmlPoll="/call/htmlpoll/";dwr.engine._constructRequest=function(batch){var request={url:batch.path+batch.mode,body:null};if(batch.isPoll==true){request.url+="ReverseAjax.dwr";}
else if(batch.map.callCount==1){request.url+=batch.map["c0-scriptName"]+"."+batch.map["c0-methodName"]+".dwr";}
else{request.url+="Multiple."+batch.map.callCount+".dwr";}
var sessionMatch=location.href.match(/jsessionid=([^?]+)/);if(sessionMatch!=null){request.url+=";jsessionid="+sessionMatch[1];}
var prop;if(batch.httpMethod=="GET"){batch.map.callCount=""+batch.map.callCount;request.url+="?";for(prop in batch.map){if(typeof batch.map[prop]!="function"){request.url+=encodeURIComponent(prop)+"="+encodeURIComponent(batch.map[prop])+"&";}}
request.url=request.url.substring(0,request.url.length-1);}
else{request.body="";for(prop in batch.map){if(typeof batch.map[prop]!="function"){request.body+=prop+"="+batch.map[prop]+dwr.engine._postSeperator;}}
request.body=dwr.engine._contentRewriteHandler(request.body);}
request.url=dwr.engine._urlRewriteHandler(request.url);return request;};dwr.engine._stateChange=function(batch){var toEval;if(batch.completed){dwr.engine._debug("Error: _stateChange() with batch.completed");return;}
var req=batch.req;try{if(req.readyState!=4)return;}
catch(ex){dwr.engine._handleWarning(batch,ex);dwr.engine._clearUp(batch);return;}
try{var reply=req.responseText;reply=dwr.engine._replyRewriteHandler(reply);var status=req.status;if(reply==null||reply==""){dwr.engine._handleWarning(batch,{name:"dwr.engine.missingData",message:"No data received from server"});}
else if(status!=200){dwr.engine._handleError(batch,{name:"dwr.engine.http."+status,message:req.statusText});}
else{var contentType=req.getResponseHeader("Content-Type");if(!contentType.match(/^text\/plain/)&&!contentType.match(/^text\/javascript/)){if(contentType.match(/^text\/html/)&&typeof batch.textHtmlHandler=="function"){batch.textHtmlHandler();}
else{dwr.engine._handleWarning(batch,{name:"dwr.engine.invalidMimeType",message:"Invalid content type: '"+contentType+"'"});}}
else{if(batch.isPoll&&batch.map.partialResponse==dwr.engine._partialResponseYes){dwr.engine._processCometResponse(reply,batch);}
else{if(reply.search("//#DWR")==-1){dwr.engine._handleWarning(batch,{name:"dwr.engine.invalidReply",message:"Invalid reply from server"});}
else{toEval=reply;}}}}}
catch(ex){dwr.engine._handleWarning(batch,ex);}
dwr.engine._callPostHooks(batch);dwr.engine._receivedBatch=batch;if(toEval!=null)toEval=toEval.replace(dwr.engine._scriptTagProtection,"");dwr.engine._eval(toEval);dwr.engine._receivedBatch=null;dwr.engine._clearUp(batch);};dwr.engine._remoteHandleCallback=function(batchId,callId,reply){var batch=dwr.engine._batches[batchId];if(batch==null){dwr.engine._debug("Warning: batch == null in remoteHandleCallback for batchId="+batchId,true);return;}
try{var handlers=batch.handlers[callId];if(!handlers){dwr.engine._debug("Warning: Missing handlers. callId="+callId,true);}
else if(typeof handlers.callback=="function")handlers.callback(reply);}
catch(ex){dwr.engine._handleError(batch,ex);}};dwr.engine._remoteHandleException=function(batchId,callId,ex){var batch=dwr.engine._batches[batchId];if(batch==null){dwr.engine._debug("Warning: null batch in remoteHandleException",true);return;}
var handlers=batch.handlers[callId];if(handlers==null){dwr.engine._debug("Warning: null handlers in remoteHandleException",true);return;}
if(ex.message==undefined)ex.message="";if(typeof handlers.exceptionHandler=="function")handlers.exceptionHandler(ex.message,ex);else if(typeof batch.errorHandler=="function")batch.errorHandler(ex.message,ex);};dwr.engine._remoteHandleBatchException=function(ex,batchId){var searchBatch=(dwr.engine._receivedBatch==null&&batchId!=null);if(searchBatch){dwr.engine._receivedBatch=dwr.engine._batches[batchId];}
if(ex.message==undefined)ex.message="";dwr.engine._handleError(dwr.engine._receivedBatch,ex);if(searchBatch){dwr.engine._receivedBatch=null;dwr.engine._clearUp(dwr.engine._batches[batchId]);}};dwr.engine._remotePollCometDisabled=function(ex,batchId){dwr.engine.setActiveReverseAjax(false);var searchBatch=(dwr.engine._receivedBatch==null&&batchId!=null);if(searchBatch){dwr.engine._receivedBatch=dwr.engine._batches[batchId];}
if(ex.message==undefined)ex.message="";dwr.engine._handleError(dwr.engine._receivedBatch,ex);if(searchBatch){dwr.engine._receivedBatch=null;dwr.engine._clearUp(dwr.engine._batches[batchId]);}};dwr.engine._remoteBeginIFrameResponse=function(iframe,batchId){if(iframe!=null)dwr.engine._receivedBatch=iframe.batch;dwr.engine._callPostHooks(dwr.engine._receivedBatch);};dwr.engine._remoteEndIFrameResponse=function(batchId){dwr.engine._clearUp(dwr.engine._receivedBatch);dwr.engine._receivedBatch=null;};dwr.engine._eval=function(script){if(script==null)return null;if(script==""){dwr.engine._debug("Warning: blank script",true);return null;}
return eval(script);};dwr.engine._abortRequest=function(batch){if(batch&&!batch.completed){clearInterval(batch.interval);dwr.engine._clearUp(batch);if(batch.req)batch.req.abort();dwr.engine._handleError(batch,{name:"dwr.engine.timeout",message:"Timeout"});}};dwr.engine._callPostHooks=function(batch){if(batch.postHooks){for(var i=0;i<batch.postHooks.length;i++){batch.postHooks[i]();}
batch.postHooks=null;}}
dwr.engine._clearUp=function(batch){if(!batch){dwr.engine._debug("Warning: null batch in dwr.engine._clearUp()",true);return;}
if(batch.completed=="true"){dwr.engine._debug("Warning: Double complete",true);return;}
if(batch.div)batch.div.parentNode.removeChild(batch.div);if(batch.iframe){for(var i=0;i<dwr.engine._outstandingIFrames.length;i++){if(dwr.engine._outstandingIFrames[i]==batch.iframe){dwr.engine._outstandingIFrames.splice(i,1);}}
batch.iframe.parentNode.removeChild(batch.iframe);}
if(batch.form)batch.form.parentNode.removeChild(batch.form);if(batch.req){if(batch.req==dwr.engine._pollReq)dwr.engine._pollReq=null;delete batch.req;}
if(batch.map&&batch.map.batchId){delete dwr.engine._batches[batch.map.batchId];dwr.engine._batchesLength--;}
batch.completed=true;if(dwr.engine._batchQueue.length!=0){var sendbatch=dwr.engine._batchQueue.shift();dwr.engine._sendData(sendbatch);}};dwr.engine._handleError=function(batch,ex){if(typeof ex=="string")ex={name:"unknown",message:ex};if(ex.message==null)ex.message="";if(ex.name==null)ex.name="unknown";if(batch&&typeof batch.errorHandler=="function")batch.errorHandler(ex.message,ex);else if(dwr.engine._errorHandler)dwr.engine._errorHandler(ex.message,ex);dwr.engine._clearUp(batch);};dwr.engine._handleWarning=function(batch,ex){if(typeof ex=="string")ex={name:"unknown",message:ex};if(ex.message==null)ex.message="";if(ex.name==null)ex.name="unknown";if(batch&&typeof batch.warningHandler=="function")batch.warningHandler(ex.message,ex);else if(dwr.engine._warningHandler)dwr.engine._warningHandler(ex.message,ex);dwr.engine._clearUp(batch);};dwr.engine._serializeAll=function(batch,referto,data,name){if(data==null){batch.map[name]="null:null";return;}
switch(typeof data){case"boolean":batch.map[name]="boolean:"+data;break;case"number":batch.map[name]="number:"+data;break;case"string":batch.map[name]="string:"+encodeURIComponent(data);break;case"object":if(data instanceof String)batch.map[name]="String:"+encodeURIComponent(data);else if(data instanceof Boolean)batch.map[name]="Boolean:"+data;else if(data instanceof Number)batch.map[name]="Number:"+data;else if(data instanceof Date)batch.map[name]="Date:"+data.getTime();else if(data&&data.join)batch.map[name]=dwr.engine._serializeArray(batch,referto,data,name);else batch.map[name]=dwr.engine._serializeObject(batch,referto,data,name);break;case"function":break;default:dwr.engine._handleWarning(null,{name:"dwr.engine.unexpectedType",message:"Unexpected type: "+typeof data+", attempting default converter."});batch.map[name]="default:"+data;break;}};dwr.engine._lookup=function(referto,data,name){var lookup;for(var i=0;i<referto.length;i++){if(referto[i].data==data){lookup=referto[i];break;}}
if(lookup)return"reference:"+lookup.name;referto.push({data:data,name:name});return null;};dwr.engine._serializeObject=function(batch,referto,data,name){var ref=dwr.engine._lookup(referto,data,name);if(ref)return ref;if(data.nodeName&&data.nodeType){return dwr.engine._serializeXml(batch,referto,data,name);}
var reply="Object_"+dwr.engine._getObjectClassName(data)+":{";var element;for(element in data){if(typeof data[element]!="function"){batch.paramCount++;var childName="c"+dwr.engine._batch.map.callCount+"-e"+batch.paramCount;dwr.engine._serializeAll(batch,referto,data[element],childName);reply+=encodeURIComponent(element)+":reference:"+childName+", ";}}
if(reply.substring(reply.length-2)==", "){reply=reply.substring(0,reply.length-2);}
reply+="}";return reply;};dwr.engine._errorClasses={"Error":Error,"EvalError":EvalError,"RangeError":RangeError,"ReferenceError":ReferenceError,"SyntaxError":SyntaxError,"TypeError":TypeError,"URIError":URIError};dwr.engine._getObjectClassName=function(obj){if(obj&&obj.constructor&&obj.constructor.toString)
{var str=obj.constructor.toString();var regexpmatch=str.match(/function\s+(\w+)/);if(regexpmatch&&regexpmatch.length==2){return regexpmatch[1];}}
if(obj&&obj.constructor){for(var errorname in dwr.engine._errorClasses){if(obj.constructor==dwr.engine._errorClasses[errorname])return errorname;}}
if(obj){var str=Object.prototype.toString.call(obj);var regexpmatch=str.match(/\[object\s+(\w+)/);if(regexpmatch&&regexpmatch.length==2){return regexpmatch[1];}}
return"Object";};dwr.engine._serializeXml=function(batch,referto,data,name){var ref=dwr.engine._lookup(referto,data,name);if(ref)return ref;var output;if(window.XMLSerializer)output=new XMLSerializer().serializeToString(data);else if(data.toXml)output=data.toXml;else output=data.innerHTML;return"XML:"+encodeURIComponent(output);};dwr.engine._serializeArray=function(batch,referto,data,name){var ref=dwr.engine._lookup(referto,data,name);if(ref)return ref;var reply="Array:[";for(var i=0;i<data.length;i++){if(i!=0)reply+=",";batch.paramCount++;var childName="c"+dwr.engine._batch.map.callCount+"-e"+batch.paramCount;dwr.engine._serializeAll(batch,referto,data[i],childName);reply+="reference:";reply+=childName;}
reply+="]";return reply;};dwr.engine._unserializeDocument=function(xml){var dom;if(window.DOMParser){var parser=new DOMParser();dom=parser.parseFromString(xml,"text/xml");if(!dom.documentElement||dom.documentElement.tagName=="parsererror"){var message=dom.documentElement.firstChild.data;message+="\n"+dom.documentElement.firstChild.nextSibling.firstChild.data;throw message;}
return dom;}
else if(window.ActiveXObject){dom=dwr.engine._newActiveXObject(dwr.engine._DOMDocument);dom.loadXML(xml);return dom;}
else{var div=document.createElement("div");div.innerHTML=xml;return div;}};dwr.engine._newActiveXObject=function(axarray){var returnValue;for(var i=0;i<axarray.length;i++){try{returnValue=new ActiveXObject(axarray[i]);break;}
catch(ex){}}
return returnValue;};dwr.engine._debug=function(message,stacktrace){var written=false;try{if(window.console){if(stacktrace&&window.console.trace)window.console.trace();window.console.log(message);written=true;}
else if(window.opera&&window.opera.postError){window.opera.postError(message);written=true;}}
catch(ex){}
if(!written){var debug=document.getElementById("dwr-debug");if(debug){var contents=message+"<br/>"+debug.innerHTML;if(contents.length>2048)contents=contents.substring(0,2048);debug.innerHTML=contents;}}};
if(dwr==null)var dwr={};if(dwr.util==null)dwr.util={};if(DWRUtil==null)var DWRUtil=dwr.util;dwr.util._escapeHtml=true;dwr.util.setEscapeHtml=function(escapeHtml){dwr.util._escapeHtml=escapeHtml;}
dwr.util._shouldEscapeHtml=function(options){if(options&&options.escapeHtml!=null){return options.escapeHtml;}
return dwr.util._escapeHtml;}
dwr.util.escapeHtml=function(original){var div=document.createElement('div');var text=document.createTextNode(original);div.appendChild(text);return div.innerHTML;}
dwr.util.unescapeHtml=function(original){var div=document.createElement('div');div.innerHTML=original.replace(/<\/?[^>]+>/gi,'');return div.childNodes[0]?div.childNodes[0].nodeValue:'';}
dwr.util.replaceXmlCharacters=function(original){original=original.replace("&","+");original=original.replace("<","\u2039");original=original.replace(">","\u203A");original=original.replace("\'","\u2018");original=original.replace("\"","\u201C");return original;}
dwr.util.containsXssRiskyCharacters=function(original){return(original.indexOf('&')!=-1||original.indexOf('<')!=-1||original.indexOf('>')!=-1||original.indexOf('\'')!=-1||original.indexOf('\"')!=-1);}
dwr.util.onReturn=function(event,action){if(!event)event=window.event;if(event&&event.keyCode&&event.keyCode==13)action();};dwr.util.selectRange=function(ele,start,end){ele=dwr.util._getElementById(ele,"selectRange()");if(ele==null)return;if(ele.setSelectionRange){ele.setSelectionRange(start,end);}
else if(ele.createTextRange){var range=ele.createTextRange();range.moveStart("character",start);range.moveEnd("character",end-ele.value.length);range.select();}
ele.focus();};if(document.getElementById){dwr.util.byId=function(){var elements=new Array();for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string'){element=document.getElementById(element);}
if(arguments.length==1){return element;}
elements.push(element);}
return elements;};}
else if(document.all){dwr.util.byId=function(){var elements=new Array();for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string'){element=document.all[element];}
if(arguments.length==1){return element;}
elements.push(element);}
return elements;};}
var $;if(!$){$=dwr.util.byId;}
dwr.util.toDescriptiveString=function(data,showLevels,options){if(showLevels===undefined)showLevels=1;var opt={};if(dwr.util._isObject(options))opt=options;var defaultoptions={escapeHtml:false,baseIndent:"",childIndent:"\u00A0\u00A0",lineTerminator:"\n",oneLineMaxItems:5,shortStringMaxLength:13,propertyNameMaxLength:30};for(var p in defaultoptions)if(!(p in opt))opt[p]=defaultoptions[p];if(typeof options=="number"){var baseDepth=options;opt.baseIndent=dwr.util._indent2(baseDepth,opt);}
var skipDomProperties={document:true,ownerDocument:true,all:true,parentElement:true,parentNode:true,offsetParent:true,children:true,firstChild:true,lastChild:true,previousSibling:true,nextSibling:true,innerHTML:true,outerHTML:true,innerText:true,outerText:true,textContent:true,attributes:true,style:true,currentStyle:true,runtimeStyle:true,parentTextEdit:true};function recursive(data,showLevels,indentDepth,options){var reply="";try{if(typeof data=="string"){var str=data;if(showLevels==0&&str.length>options.shortStringMaxLength)
str=str.substring(0,options.shortStringMaxLength-3)+"...";if(options.escapeHtml){var lines=str.split("\n");for(var i=0;i<lines.length;i++)lines[i]=dwr.util.escapeHtml(lines[i]);str=lines.join("\n");}
if(showLevels==0){str=str.replace(/\n|\r|\t/g,function(ch){switch(ch){case"\n":return"\\n";case"\r":return"";case"\t":return"\\t";}});}
else{str=str.replace(/\n|\r|\t/g,function(ch){switch(ch){case"\n":return options.lineTerminator+indent(indentDepth+1,options);case"\r":return"";case"\t":return"\\t";}});}
reply='"'+str+'"';}
else if(typeof data=="function"){reply="function";}
else if(dwr.util._isArray(data)){if(showLevels==0){if(data.length>0)
reply="[...]";else
reply="[]";}
else{var strarr=[];strarr.push("[");var count=0;for(var i=0;i<data.length;i++){if(!(i in data))continue;var itemvalue=data[i];if(count>0)strarr.push(", ");if(showLevels==1){if(count==options.oneLineMaxItems){strarr.push("...");break;}}
else{strarr.push(options.lineTerminator+indent(indentDepth+1,options));}
if(i!=count){strarr.push(i);strarr.push(":");}
strarr.push(recursive(itemvalue,showLevels-1,indentDepth+1,options));count++;}
if(showLevels>1)strarr.push(options.lineTerminator+indent(indentDepth,options));strarr.push("]");reply=strarr.join("");}}
else if(dwr.util._isObject(data)&&!dwr.util._isDate(data)){if(showLevels==0){reply=dwr.util._detailedTypeOf(data);}
else{var strarr=[];if(dwr.util._detailedTypeOf(data)!="Object"){strarr.push(dwr.util._detailedTypeOf(data));if(typeof data.valueOf()!="object"){strarr.push(":");strarr.push(recursive(data.valueOf(),1,indentDepth,options));}
strarr.push(" ");}
strarr.push("{");var isDomObject=dwr.util._isHTMLElement(data);var count=0;for(var prop in data){var propvalue=data[prop];if(isDomObject){if(!propvalue)continue;if(typeof propvalue=="function")continue;if(skipDomProperties[prop])continue;if(prop.toUpperCase()==prop)continue;}
if(count>0)strarr.push(", ");if(showLevels==1){if(count==options.oneLineMaxItems){strarr.push("...");break;}}
else{strarr.push(options.lineTerminator+indent(indentDepth+1,options));}
strarr.push(prop.length>options.propertyNameMaxLength?prop.substring(0,options.propertyNameMaxLength-3)+"...":prop);strarr.push(":");strarr.push(recursive(propvalue,showLevels-1,indentDepth+1,options));count++;}
if(showLevels>1&&count>0)strarr.push(options.lineTerminator+indent(indentDepth,options));strarr.push("}");reply=strarr.join("");}}
else{reply=""+data;}
return reply;}
catch(err){return(err.message?err.message:""+err);}}
function indent(count,options){var strarr=[];strarr.push(options.baseIndent);for(var i=0;i<count;i++){strarr.push(options.childIndent);}
return strarr.join("");};return recursive(data,showLevels,0,opt);}
dwr.util.useLoadingMessage=function(message){var loadingMessage;if(message)loadingMessage=message;else loadingMessage="Loading";dwr.engine.setPreHook(function(){var disabledZone=dwr.util.byId('disabledZone');if(!disabledZone){disabledZone=document.createElement('div');disabledZone.setAttribute('id','disabledZone');disabledZone.style.position="absolute";disabledZone.style.zIndex="1000";disabledZone.style.left="0px";disabledZone.style.top="0px";disabledZone.style.width="100%";disabledZone.style.height="100%";document.body.appendChild(disabledZone);var messageZone=document.createElement('div');messageZone.setAttribute('id','messageZone');messageZone.style.position="absolute";messageZone.style.top="0px";messageZone.style.right="0px";messageZone.style.background="red";messageZone.style.color="white";messageZone.style.fontFamily="Arial,Helvetica,sans-serif";messageZone.style.padding="4px";disabledZone.appendChild(messageZone);var text=document.createTextNode(loadingMessage);messageZone.appendChild(text);dwr.util._disabledZoneUseCount=1;}
else{dwr.util.byId('messageZone').innerHTML=loadingMessage;disabledZone.style.visibility='visible';dwr.util._disabledZoneUseCount++;}});dwr.engine.setPostHook(function(){dwr.util._disabledZoneUseCount--;if(dwr.util._disabledZoneUseCount==0){dwr.util.byId('disabledZone').style.visibility='hidden';}});};dwr.util.setHighlightHandler=function(handler){dwr.util._highlightHandler=handler;};dwr.util.yellowFadeHighlightHandler=function(ele){dwr.util._yellowFadeProcess(ele,0);};dwr.util._yellowFadeSteps=["d0","b0","a0","90","98","a0","a8","b0","b8","c0","c8","d0","d8","e0","e8","f0","f8"];dwr.util._yellowFadeProcess=function(ele,colorIndex){ele=dwr.util.byId(ele);if(colorIndex<dwr.util._yellowFadeSteps.length){ele.style.backgroundColor="#ffff"+dwr.util._yellowFadeSteps[colorIndex];setTimeout("dwr.util._yellowFadeProcess('"+ele.id+"',"+(colorIndex+1)+")",200);}
else{ele.style.backgroundColor="transparent";}};dwr.util.borderFadeHighlightHandler=function(ele){ele.style.borderWidth="2px";ele.style.borderStyle="solid";dwr.util._borderFadeProcess(ele,0);};dwr.util._borderFadeSteps=["d0","b0","a0","90","98","a0","a8","b0","b8","c0","c8","d0","d8","e0","e8","f0","f8"];dwr.util._borderFadeProcess=function(ele,colorIndex){ele=dwr.util.byId(ele);if(colorIndex<dwr.util._borderFadeSteps.length){ele.style.borderColor="#ff"+dwr.util._borderFadeSteps[colorIndex]+dwr.util._borderFadeSteps[colorIndex];setTimeout("dwr.util._borderFadeProcess('"+ele.id+"',"+(colorIndex+1)+")",200);}
else{ele.style.backgroundColor="transparent";}};dwr.util.focusHighlightHandler=function(ele){try{ele.focus();}
catch(ex){}};dwr.util._highlightHandler=null;dwr.util.highlight=function(ele,options){if(options&&options.highlightHandler){options.highlightHandler(dwr.util.byId(ele));}
else if(dwr.util._highlightHandler!=null){dwr.util._highlightHandler(dwr.util.byId(ele));}};dwr.util.setValue=function(ele,val,options){if(val==null)val="";if(options==null)options={};if(dwr.util._shouldEscapeHtml(options)&&typeof(val)=="string"){val=dwr.util.escapeHtml(val);}
var orig=ele;if(typeof ele=="string"){ele=dwr.util.byId(ele);if(ele&&ele.id!=orig)ele=null;}
var nodes=null;if(ele==null){nodes=document.getElementsByName(orig);if(nodes.length>=1)ele=nodes.item(0);}
if(ele==null){dwr.util._debug("setValue() can't find an element with id/name: "+orig+".");return;}
dwr.util.highlight(ele,options);if(dwr.util._isHTMLElement(ele,"select")){if(ele.type=="select-multiple"&&dwr.util._isArray(val))dwr.util._selectListItems(ele,val);else dwr.util._selectListItem(ele,val);return;}
if(dwr.util._isHTMLElement(ele,"input")){if(ele.type=="radio"||ele.type=="checkbox"){if(nodes&&nodes.length>=1){for(var i=0;i<nodes.length;i++){var node=nodes.item(i);if(node.type!=ele.type)continue;if(dwr.util._isArray(val)){node.checked=false;for(var j=0;j<val.length;j++)
if(val[i]==node.value)node.checked=true;}
else{node.checked=(node.value==val);}}}
else ele.checked=(val==true);}
else ele.value=val;return;}
if(dwr.util._isHTMLElement(ele,"textarea")){ele.value=val;return;}
if(val.nodeType){if(val.nodeType==9)val=val.documentElement;val=dwr.util._importNode(ele.ownerDocument,val,true);ele.appendChild(val);return;}
ele.innerHTML=val;};dwr.util._selectListItems=function(ele,val){var found=false;var i;var j;for(i=0;i<ele.options.length;i++){ele.options[i].selected=false;for(j=0;j<val.length;j++){if(ele.options[i].value==val[j]){ele.options[i].selected=true;}}}
if(found)return;for(i=0;i<ele.options.length;i++){for(j=0;j<val.length;j++){if(ele.options[i].text==val[j]){ele.options[i].selected=true;}}}};dwr.util._selectListItem=function(ele,val){var found=false;var i;for(i=0;i<ele.options.length;i++){if(ele.options[i].value==val){ele.options[i].selected=true;found=true;}
else{ele.options[i].selected=false;}}
if(found)return;for(i=0;i<ele.options.length;i++){if(ele.options[i].text==val){ele.options[i].selected=true;}
else{ele.options[i].selected=false;}}};dwr.util.getValue=function(ele,options){if(options==null)options={};var orig=ele;if(typeof ele=="string"){ele=dwr.util.byId(ele);if(ele&&ele.id!=orig)ele=null;}
var nodes=null;if(ele==null){nodes=document.getElementsByName(orig);if(nodes.length>=1)ele=nodes.item(0);}
if(ele==null){dwr.util._debug("getValue() can't find an element with id/name: "+orig+".");return"";}
if(dwr.util._isHTMLElement(ele,"select")){if(ele.type=="select-multiple"){var reply=new Array();for(var i=0;i<ele.options.length;i++){var item=ele.options[i];if(item.selected){var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){reply.push(item.value);}
else{reply.push(item.text);}}}
return reply;}
else{var sel=ele.selectedIndex;if(sel!=-1){var item=ele.options[sel];var valueAttr=item.getAttributeNode("value");if(valueAttr&&valueAttr.specified){return item.value;}
return item.text;}
else{return"";}}}
if(dwr.util._isHTMLElement(ele,"input")){if(ele.type=="radio"){if(nodes&&nodes.length>=1){for(var i=0;i<nodes.length;i++){var node=nodes.item(i);if(node.type==ele.type){if(node.checked)return node.value;}}}
return ele.checked;}
if(ele.type=="checkbox"){if(nodes&&nodes.length>=1){var reply=[];for(var i=0;i<nodes.length;i++){var node=nodes.item(i);if(node.type==ele.type){if(node.checked)reply.push(node.value);}}
return reply;}
return ele.checked;}
return ele.value;}
if(dwr.util._isHTMLElement(ele,"textarea")){return ele.value;}
if(dwr.util._shouldEscapeHtml(options)){if(ele.textContent)return ele.textContent;else if(ele.innerText)return ele.innerText;}
return ele.innerHTML;};dwr.util.getText=function(ele){ele=dwr.util._getElementById(ele,"getText()");if(ele==null)return null;if(!dwr.util._isHTMLElement(ele,"select")){dwr.util._debug("getText() can only be used with select elements. Attempt to use: "+dwr.util._detailedTypeOf(ele)+" from  id: "+orig+".");return"";}
var sel=ele.selectedIndex;if(sel!=-1){return ele.options[sel].text;}
else{return"";}};dwr.util.setValues=function(data,options){var prefix="";if(options&&options.prefix)prefix=options.prefix;if(options&&options.idPrefix)prefix=options.idPrefix;dwr.util._setValuesRecursive(data,prefix);};dwr.util._setValuesRecursive=function(data,idpath){if(dwr.util._isArray(data)&&data.length>0&&dwr.util._isObject(data[0])){for(var i=0;i<data.length;i++){dwr.util._setValuesRecursive(data[i],idpath+"["+i+"]");}}
else if(dwr.util._isObject(data)&&!dwr.util._isArray(data)){for(var prop in data){var subidpath=idpath?idpath+"."+prop:prop;if(dwr.util._isObject(data[prop])&&!dwr.util._isArray(data[prop])||dwr.util._isArray(data[prop])&&data[prop].length>0&&dwr.util._isObject(data[prop][0])){dwr.util._setValuesRecursive(data[prop],subidpath);}
else if(typeof data[prop]=="function"){}
else{if(dwr.util.byId(subidpath)!=null||document.getElementsByName(subidpath).length>=1){dwr.util.setValue(subidpath,data[prop]);}}}}};dwr.util.getValues=function(data,options){if(typeof data=="string"||dwr.util._isHTMLElement(data)){return dwr.util.getFormValues(data);}
else{var prefix="";if(options!=null&&options.prefix)prefix=options.prefix;if(options!=null&&options.idPrefix)prefix=options.idPrefix;dwr.util._getValuesRecursive(data,prefix);return data;}};dwr.util.getFormValues=function(eleOrNameOrId){var ele=null;if(typeof eleOrNameOrId=="string"){ele=document.forms[eleOrNameOrId];if(ele==null)ele=dwr.util.byId(eleOrNameOrId);}
else if(dwr.util._isHTMLElement(eleOrNameOrId)){ele=eleOrNameOrId;}
if(ele!=null){if(ele.elements==null){alert("getFormValues() requires an object or reference to a form element.");return null;}
var reply={};var name;var value;for(var i=0;i<ele.elements.length;i++){if(ele[i].type in{button:0,submit:0,reset:0,image:0,file:0})continue;if(ele[i].name){name=ele[i].name;value=dwr.util.getValue(name);}
else{if(ele[i].id)name=ele[i].id;else name="element"+i;value=dwr.util.getValue(ele[i]);}
reply[name]=value;}
return reply;}};dwr.util._getValuesRecursive=function(data,idpath){if(dwr.util._isArray(data)&&data.length>0&&dwr.util._isObject(data[0])){for(var i=0;i<data.length;i++){dwr.util._getValuesRecursive(data[i],idpath+"["+i+"]");}}
else if(dwr.util._isObject(data)&&!dwr.util._isArray(data)){for(var prop in data){var subidpath=idpath?idpath+"."+prop:prop;if(dwr.util._isObject(data[prop])&&!dwr.util._isArray(data[prop])||dwr.util._isArray(data[prop])&&data[prop].length>0&&dwr.util._isObject(data[prop][0])){dwr.util._getValuesRecursive(data[prop],subidpath);}
else if(typeof data[prop]=="function"){}
else{if(dwr.util.byId(subidpath)!=null||document.getElementsByName(subidpath).length>=1){data[prop]=dwr.util.getValue(subidpath);}}}}};dwr.util.addOptions=function(ele,data){ele=dwr.util._getElementById(ele,"addOptions()");if(ele==null)return;var useOptions=dwr.util._isHTMLElement(ele,"select");var useLi=dwr.util._isHTMLElement(ele,["ul","ol"]);if(!useOptions&&!useLi){dwr.util._debug("addOptions() can only be used with select/ul/ol elements. Attempt to use: "+dwr.util._detailedTypeOf(ele));return;}
if(data==null)return;var argcount=arguments.length;var options={};var lastarg=arguments[argcount-1];if(argcount>2&&dwr.util._isObject(lastarg)){options=lastarg;argcount--;}
var arg3=null;if(argcount>=3)arg3=arguments[2];var arg4=null;if(argcount>=4)arg4=arguments[3];if(!options.optionCreator&&useOptions)options.optionCreator=dwr.util._defaultOptionCreator;if(!options.optionCreator&&useLi)options.optionCreator=dwr.util._defaultListItemCreator;var text,value,li;if(dwr.util._isArray(data)){for(var i=0;i<data.length;i++){options.data=data[i];options.text=null;options.value=null;if(useOptions){if(arg3!=null){if(arg4!=null){options.text=dwr.util._getValueFrom(data[i],arg4);options.value=dwr.util._getValueFrom(data[i],arg3);}
else options.text=options.value=dwr.util._getValueFrom(data[i],arg3);}
else options.text=options.value=dwr.util._getValueFrom(data[i]);if(options.text!=null||options.value){var opt=options.optionCreator(options);opt.text=options.text;opt.value=options.value;ele.options[ele.options.length]=opt;}}
else{options.value=dwr.util._getValueFrom(data[i],arg3);if(options.value!=null){li=options.optionCreator(options);if(dwr.util._shouldEscapeHtml(options)){options.value=dwr.util.escapeHtml(options.value);}
li.innerHTML=options.value;ele.appendChild(li);}}}}
else if(arg4!=null){if(!useOptions){alert("dwr.util.addOptions can only create select lists from objects.");return;}
for(var prop in data){options.data=data[prop];options.value=dwr.util._getValueFrom(data[prop],arg3);options.text=dwr.util._getValueFrom(data[prop],arg4);if(options.text!=null||options.value){var opt=options.optionCreator(options);opt.text=options.text;opt.value=options.value;ele.options[ele.options.length]=opt;}}}
else{if(!useOptions){dwr.util._debug("dwr.util.addOptions can only create select lists from objects.");return;}
for(var prop in data){options.data=data[prop];if(!arg3){options.value=prop;options.text=data[prop];}
else{options.value=data[prop];options.text=prop;}
if(options.text!=null||options.value){var opt=options.optionCreator(options);opt.text=options.text;opt.value=options.value;ele.options[ele.options.length]=opt;}}}
dwr.util.highlight(ele,options);};dwr.util._getValueFrom=function(data,method){if(method==null)return data;else if(typeof method=='function')return method(data);else return data[method];};dwr.util._defaultOptionCreator=function(options){return new Option();};dwr.util._defaultListItemCreator=function(options){return document.createElement("li");};dwr.util.removeAllOptions=function(ele){ele=dwr.util._getElementById(ele,"removeAllOptions()");if(ele==null)return;var useOptions=dwr.util._isHTMLElement(ele,"select");var useLi=dwr.util._isHTMLElement(ele,["ul","ol"]);if(!useOptions&&!useLi){dwr.util._debug("removeAllOptions() can only be used with select, ol and ul elements. Attempt to use: "+dwr.util._detailedTypeOf(ele));return;}
if(useOptions){ele.options.length=0;}
else{while(ele.childNodes.length>0){ele.removeChild(ele.firstChild);}}};dwr.util.addRows=function(ele,data,cellFuncs,options){ele=dwr.util._getElementById(ele,"addRows()");if(ele==null)return;if(!dwr.util._isHTMLElement(ele,["table","tbody","thead","tfoot"])){dwr.util._debug("addRows() can only be used with table, tbody, thead and tfoot elements. Attempt to use: "+dwr.util._detailedTypeOf(ele));return;}
if(!options)options={};if(!options.rowCreator)options.rowCreator=dwr.util._defaultRowCreator;if(!options.cellCreator)options.cellCreator=dwr.util._defaultCellCreator;var tr,rowNum;if(dwr.util._isArray(data)){for(rowNum=0;rowNum<data.length;rowNum++){options.rowData=data[rowNum];options.rowIndex=rowNum;options.rowNum=rowNum;options.data=null;options.cellNum=-1;tr=dwr.util._addRowInner(cellFuncs,options);if(tr!=null)ele.appendChild(tr);}}
else if(typeof data=="object"){rowNum=0;for(var rowIndex in data){options.rowData=data[rowIndex];options.rowIndex=rowIndex;options.rowNum=rowNum;options.data=null;options.cellNum=-1;tr=dwr.util._addRowInner(cellFuncs,options);if(tr!=null)ele.appendChild(tr);rowNum++;}}
dwr.util.highlight(ele,options);};dwr.util._addRowInner=function(cellFuncs,options){var tr=options.rowCreator(options);if(tr==null)return null;for(var cellNum=0;cellNum<cellFuncs.length;cellNum++){var func=cellFuncs[cellNum];if(typeof func=='function')options.data=func(options.rowData,options);else options.data=func||"";options.cellNum=cellNum;var td=options.cellCreator(options);if(td!=null){if(options.data!=null){if(dwr.util._isHTMLElement(options.data))td.appendChild(options.data);else{if(dwr.util._shouldEscapeHtml(options)&&typeof(options.data)=="string"){td.innerHTML=dwr.util.escapeHtml(options.data);}
else{td.innerHTML=options.data;}}}
tr.appendChild(td);}}
return tr;};dwr.util._defaultRowCreator=function(options){return document.createElement("tr");};dwr.util._defaultCellCreator=function(options){return document.createElement("td");};dwr.util.removeAllRows=function(ele,options){ele=dwr.util._getElementById(ele,"removeAllRows()");if(ele==null)return;if(!options)options={};if(!options.filter)options.filter=function(){return true;};if(!dwr.util._isHTMLElement(ele,["table","tbody","thead","tfoot"])){dwr.util._debug("removeAllRows() can only be used with table, tbody, thead and tfoot elements. Attempt to use: "+dwr.util._detailedTypeOf(ele));return;}
var child=ele.firstChild;var next;while(child!=null){next=child.nextSibling;if(options.filter(child)){ele.removeChild(child);}
child=next;}};dwr.util.setClassName=function(ele,className){ele=dwr.util._getElementById(ele,"setClassName()");if(ele==null)return;ele.className=className;};dwr.util.addClassName=function(ele,className){ele=dwr.util._getElementById(ele,"addClassName()");if(ele==null)return;ele.className+=" "+className;};dwr.util.removeClassName=function(ele,className){ele=dwr.util._getElementById(ele,"removeClassName()");if(ele==null)return;var regex=new RegExp("(^|\\s)"+className+"(\\s|$)",'g');ele.className=ele.className.replace(regex,'');};dwr.util.toggleClassName=function(ele,className){ele=dwr.util._getElementById(ele,"toggleClassName()");if(ele==null)return;var regex=new RegExp("(^|\\s)"+className+"(\\s|$)");if(regex.test(ele.className)){ele.className=ele.className.replace(regex,'');}
else{ele.className+=" "+className;}};dwr.util.cloneNode=function(ele,options){ele=dwr.util._getElementById(ele,"cloneNode()");if(ele==null)return null;if(options==null)options={};var clone=ele.cloneNode(true);if(options.idPrefix||options.idSuffix){dwr.util._updateIds(clone,options);}
else{dwr.util._removeIds(clone);}
ele.parentNode.insertBefore(clone,ele);return clone;};dwr.util._updateIds=function(ele,options){if(options==null)options={};if(ele.id){ele.setAttribute("id",(options.idPrefix||"")+ele.id+(options.idSuffix||""));}
var children=ele.childNodes;for(var i=0;i<children.length;i++){var child=children.item(i);if(child.nodeType==1){dwr.util._updateIds(child,options);}}};dwr.util._removeIds=function(ele){if(ele.id)ele.removeAttribute("id");var children=ele.childNodes;for(var i=0;i<children.length;i++){var child=children.item(i);if(child.nodeType==1){dwr.util._removeIds(child);}}};dwr.util.cloneNodeForValues=function(templateEle,data,options){templateEle=dwr.util._getElementById(templateEle,"cloneNodeForValues()");if(templateEle==null)return null;if(options==null)options={};var idpath;if(options.idPrefix!=null)
idpath=options.idPrefix;else
idpath=templateEle.id||"";return dwr.util._cloneNodeForValuesRecursive(templateEle,data,idpath,options);};dwr.util._cloneNodeForValuesRecursive=function(templateEle,data,idpath,options){if(dwr.util._isArray(data)){var clones=[];for(var i=0;i<data.length;i++){var item=data[i];var clone=dwr.util._cloneNodeForValuesRecursive(templateEle,item,idpath+"["+i+"]",options);clones.push(clone);}
return clones;}
else
if(dwr.util._isObject(data)&&!dwr.util._isArray(data)){var clone=templateEle.cloneNode(true);if(options.updateCloneStyle&&clone.style){for(var propname in options.updateCloneStyle){clone.style[propname]=options.updateCloneStyle[propname];}}
dwr.util._replaceIds(clone,templateEle.id,idpath);templateEle.parentNode.insertBefore(clone,templateEle);dwr.util._cloneSubArrays(data,idpath,options);return clone;}
return null;};dwr.util._replaceIds=function(ele,oldidpath,newidpath){if(ele.id){var newId=null;if(ele.id==oldidpath){newId=newidpath;}
else if(ele.id.length>oldidpath.length){if(ele.id.substr(0,oldidpath.length)==oldidpath){var trailingChar=ele.id.charAt(oldidpath.length);if(trailingChar=="."||trailingChar=="["){newId=newidpath+ele.id.substr(oldidpath.length);}}}
if(newId){ele.setAttribute("id",newId);}
else{ele.removeAttribute("id");}}
var children=ele.childNodes;for(var i=0;i<children.length;i++){var child=children.item(i);if(child.nodeType==1){dwr.util._replaceIds(child,oldidpath,newidpath);}}};dwr.util._cloneSubArrays=function(data,idpath,options){for(prop in data){var value=data[prop];if(dwr.util._isArray(value)){if(value.length>0&&dwr.util._isObject(value[0])){var subTemplateId=idpath+"."+prop;var subTemplateEle=dwr.util.byId(subTemplateId);if(subTemplateEle!=null){dwr.util._cloneNodeForValuesRecursive(subTemplateEle,value,subTemplateId,options);}}}
else if(dwr.util._isObject(value)){dwr.util._cloneSubArrays(value,idpath+"."+prop,options);}}}
dwr.util._getElementById=function(ele,source){var orig=ele;ele=dwr.util.byId(ele);if(ele==null){dwr.util._debug(source+" can't find an element with id: "+orig+".");}
return ele;};dwr.util._isHTMLElement=function(ele,nodeName){if(ele==null||typeof ele!="object"||ele.nodeName==null){return false;}
if(nodeName!=null){var test=ele.nodeName.toLowerCase();if(typeof nodeName=="string"){return test==nodeName.toLowerCase();}
if(dwr.util._isArray(nodeName)){var match=false;for(var i=0;i<nodeName.length&&!match;i++){if(test==nodeName[i].toLowerCase()){match=true;}}
return match;}
dwr.util._debug("dwr.util._isHTMLElement was passed test node name that is neither a string or array of strings");return false;}
return true;};dwr.util._detailedTypeOf=function(x){var reply=typeof x;if(reply=="object"){reply=Object.prototype.toString.apply(x);reply=reply.substring(8,reply.length-1);}
return reply;};dwr.util._isObject=function(data){return(data&&typeof data=="object");};dwr.util._isArray=function(data){return(data&&data.join);};dwr.util._isDate=function(data){return(data&&data.toUTCString)?true:false;};dwr.util._importNode=function(doc,importedNode,deep){var newNode;if(importedNode.nodeType==1){newNode=doc.createElement(importedNode.nodeName);for(var i=0;i<importedNode.attributes.length;i++){var attr=importedNode.attributes[i];if(attr.nodeValue!=null&&attr.nodeValue!=''){newNode.setAttribute(attr.name,attr.nodeValue);}}
if(typeof importedNode.style!="undefined"){newNode.style.cssText=importedNode.style.cssText;}}
else if(importedNode.nodeType==3){newNode=doc.createTextNode(importedNode.nodeValue);}
if(deep&&importedNode.hasChildNodes()){for(i=0;i<importedNode.childNodes.length;i++){newNode.appendChild(dwr.util._importNode(doc,importedNode.childNodes[i],true));}}
return newNode;};dwr.util._debug=function(message,stacktrace){var written=false;try{if(window.console){if(stacktrace&&window.console.trace)window.console.trace();window.console.log(message);written=true;}
else if(window.opera&&window.opera.postError){window.opera.postError(message);written=true;}}
catch(ex){}
if(!written){var debug=document.getElementById("dwr-debug");if(debug){var contents=message+"<br/>"+debug.innerHTML;if(contents.length>2048)contents=contents.substring(0,2048);debug.innerHTML=contents;}}};
//customerprofile/dwr/interface/AddressValidationProcessor.js
if(dwr==null)var dwr={};if(dwr.engine==null)dwr.engine={};if(DWREngine==null)var DWREngine=dwr.engine;if(AddressValidationProcessor==null)var AddressValidationProcessor={};AddressValidationProcessor._path='/customerprofile/dwr';AddressValidationProcessor.getAddressValidation=function(p0,callback){dwr.engine._execute(AddressValidationProcessor._path,'AddressValidationProcessor','getAddressValidation',p0,callback);}



var showLoading = true;
var loadingMsg = null;
DWRUtil.useLoadingMessage = function()
{
DWREngine.setPreHook(function() { 

    var msgbox = document.getElementById('loadingbox');
    if (showLoading 
           && msgbox != null) {
        if (loadingMsg == null) { 
           loadingMsg = 'Loading';
        }
        msgbox.innerHTML=loadingMsg + '.<br><span class="oneMoment">One moment, please...</span>';

 		DeltaOverlayUtil.centerElement("", msgbox, 0, 0);
		msgbox.style.display = 'block';
    }
});
DWREngine.setPostHook(function() {
   hideLoadingMsg();
 });
};
function hideLoadingMsg() {
   var msgbox = document.getElementById('loadingbox');
   if (msgbox != null) {
       msgbox.innerHTML = '';
       msgbox.style.display = 'none';
	   msgbox.style.visibility = "hidden";
   }

}
function init() {
    DWRUtil.useLoadingMessage();
}  
function setLoadingMsg(msg) {
    showLoading = true; 
    loadingMsg = msg;
}
      


