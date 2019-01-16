(function(mod){if("object"==("undefined"===typeof exports?"undefined":babelHelpers.typeof(exports))&&"object"==("undefined"===typeof module?"undefined":babelHelpers.typeof(module)))mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";var languages={mscgen:{keywords:["msc"],options:["hscale","width","arcgradient","wordwraparcs"],constants:["true","false","on","off"],attributes:["label","idurl","id","url","linecolor","linecolour","textcolor","textcolour","textbgcolor","textbgcolour","arclinecolor","arclinecolour","arctextcolor","arctextcolour","arctextbgcolor","arctextbgcolour","arcskip"],brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]},xu:{keywords:["msc","xu"],options:["hscale","width","arcgradient","wordwraparcs","wordwrapentities","watermark"],constants:["true","false","on","off","auto"],attributes:["label","idurl","id","url","linecolor","linecolour","textcolor","textcolour","textbgcolor","textbgcolour","arclinecolor","arclinecolour","arctextcolor","arctextcolour","arctextbgcolor","arctextbgcolour","arcskip","title","deactivate","activate","activation"],brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box","alt","else","opt","break","par","seq","strict","neg","critical","ignore","consider","assert","loop","ref","exc"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]},msgenny:{keywords:null,options:["hscale","width","arcgradient","wordwraparcs","wordwrapentities","watermark"],constants:["true","false","on","off","auto"],attributes:null,brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box","alt","else","opt","break","par","seq","strict","neg","critical","ignore","consider","assert","loop","ref","exc"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]}};CodeMirror.defineMode("mscgen",function(_,modeConfig){var language=languages[modeConfig&&modeConfig.language||"mscgen"];return{startState:startStateFn,copyState:copyStateFn,token:produceTokenFunction(language),lineComment:"#",blockCommentStart:"/*",blockCommentEnd:"*/"}});CodeMirror.defineMIME("text/x-mscgen","mscgen");CodeMirror.defineMIME("text/x-xu",{name:"mscgen",language:"xu"});CodeMirror.defineMIME("text/x-msgenny",{name:"mscgen",language:"msgenny"});function wordRegexpBoundary(pWords){return new RegExp("\\b("+pWords.join("|")+")\\b","i")}function wordRegexp(pWords){return new RegExp("("+pWords.join("|")+")","i")}function startStateFn(){return{inComment:!1,inString:!1,inAttributeList:!1,inScript:!1}}function copyStateFn(pState){return{inComment:pState.inComment,inString:pState.inString,inAttributeList:pState.inAttributeList,inScript:pState.inScript}}function produceTokenFunction(pConfig){return function(pStream,pState){if(pStream.match(wordRegexp(pConfig.brackets),!0,!0)){return"bracket"}if(!pState.inComment){if(pStream.match(/\/\*[^\*\/]*/,!0,!0)){pState.inComment=!0;return"comment"}if(pStream.match(wordRegexp(pConfig.singlecomment),!0,!0)){pStream.skipToEnd();return"comment"}}if(pState.inComment){if(pStream.match(/[^\*\/]*\*\//,!0,!0))pState.inComment=!1;else pStream.skipToEnd();return"comment"}if(!pState.inString&&pStream.match(/\"(\\\"|[^\"])*/,!0,!0)){pState.inString=!0;return"string"}if(pState.inString){if(pStream.match(/[^\"]*\"/,!0,!0))pState.inString=!1;else pStream.skipToEnd();return"string"}if(!!pConfig.keywords&&pStream.match(wordRegexpBoundary(pConfig.keywords),!0,!0))return"keyword";if(pStream.match(wordRegexpBoundary(pConfig.options),!0,!0))return"keyword";if(pStream.match(wordRegexpBoundary(pConfig.arcsWords),!0,!0))return"keyword";if(pStream.match(wordRegexp(pConfig.arcsOthers),!0,!0))return"keyword";if(!!pConfig.operators&&pStream.match(wordRegexp(pConfig.operators),!0,!0))return"operator";if(!!pConfig.constants&&pStream.match(wordRegexp(pConfig.constants),!0,!0))return"variable";if(!pConfig.inAttributeList&&!!pConfig.attributes&&pStream.match(/\[/,!0,!0)){pConfig.inAttributeList=!0;return"bracket"}if(pConfig.inAttributeList){if(null!==pConfig.attributes&&pStream.match(wordRegexpBoundary(pConfig.attributes),!0,!0)){return"attribute"}if(pStream.match(/]/,!0,!0)){pConfig.inAttributeList=!1;return"bracket"}}pStream.next();return"base"}}});