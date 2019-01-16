(function(mod){if("object"==typeof exports&&"object"==typeof module)mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";CodeMirror.registerHelper("wordChars","r",/[\w.]/);CodeMirror.defineMode("r",function(config){function wordObj(words){for(var res={},i=0;i<words.length;++i)res[words[i]]=!0;return res}var commonAtoms=["NULL","NA","Inf","NaN","NA_integer_","NA_real_","NA_complex_","NA_character_","TRUE","FALSE"],commonBuiltins=["list","quote","bquote","eval","return","call","parse","deparse"],commonKeywords=["if","else","repeat","while","function","for","in","next","break"],commonBlockKeywords=["if","else","repeat","while","function","for"];CodeMirror.registerHelper("hintWords","r",commonAtoms.concat(commonBuiltins,commonKeywords));var atoms=wordObj(commonAtoms),builtins=wordObj(commonBuiltins),keywords=wordObj(commonKeywords),blockkeywords=wordObj(commonBlockKeywords),opChars=/[+\-*\/^<>=!&|~$:]/,curPunc;function tokenBase(stream,state){curPunc=null;var ch=stream.next();if("#"==ch){stream.skipToEnd();return"comment"}else if("0"==ch&&stream.eat("x")){stream.eatWhile(/[\da-f]/i);return"number"}else if("."==ch&&stream.eat(/\d/)){stream.match(/\d*(?:e[+\-]?\d+)?/);return"number"}else if(/\d/.test(ch)){stream.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/);return"number"}else if("'"==ch||"\""==ch){state.tokenize=tokenString(ch);return"string"}else if("`"==ch){stream.match(/[^`]+`/);return"variable-3"}else if("."==ch&&stream.match(/.[.\d]+/)){return"keyword"}else if(/[\w\.]/.test(ch)&&"_"!=ch){stream.eatWhile(/[\w\.]/);var word=stream.current();if(atoms.propertyIsEnumerable(word))return"atom";if(keywords.propertyIsEnumerable(word)){if(blockkeywords.propertyIsEnumerable(word)&&!stream.match(/\s*if(\s+|$)/,!1))curPunc="block";return"keyword"}if(builtins.propertyIsEnumerable(word))return"builtin";return"variable"}else if("%"==ch){if(stream.skipTo("%"))stream.next();return"operator variable-2"}else if("<"==ch&&stream.eat("-")||"<"==ch&&stream.match("<-")||"-"==ch&&stream.match(/>>?/)){return"operator arrow"}else if("="==ch&&state.ctx.argList){return"arg-is"}else if(opChars.test(ch)){if("$"==ch)return"operator dollar";stream.eatWhile(opChars);return"operator"}else if(/[\(\){}\[\];]/.test(ch)){curPunc=ch;if(";"==ch)return"semi";return null}else{return null}}function tokenString(quote){return function(stream,state){if(stream.eat("\\")){var ch=stream.next();if("x"==ch)stream.match(/^[a-f0-9]{2}/i);else if(("u"==ch||"U"==ch)&&stream.eat("{")&&stream.skipTo("}"))stream.next();else if("u"==ch)stream.match(/^[a-f0-9]{4}/i);else if("U"==ch)stream.match(/^[a-f0-9]{8}/i);else if(/[0-7]/.test(ch))stream.match(/^[0-7]{1,2}/);return"string-2"}else{var next;while(null!=(next=stream.next())){if(next==quote){state.tokenize=tokenBase;break}if("\\"==next){stream.backUp(1);break}}return"string"}}}var ALIGN_YES=1,ALIGN_NO=2,BRACELESS=4;function push(state,type,stream){state.ctx={type:type,indent:state.indent,flags:0,column:stream.column(),prev:state.ctx}}function setFlag(state,flag){var ctx=state.ctx;state.ctx={type:ctx.type,indent:ctx.indent,flags:ctx.flags|flag,column:ctx.column,prev:ctx.prev}}function pop(state){state.indent=state.ctx.indent;state.ctx=state.ctx.prev}return{startState:function(){return{tokenize:tokenBase,ctx:{type:"top",indent:-config.indentUnit,flags:ALIGN_NO},indent:0,afterIdent:!1}},token:function(stream,state){if(stream.sol()){if(0==(3&state.ctx.flags))state.ctx.flags|=ALIGN_NO;if(state.ctx.flags&BRACELESS)pop(state);state.indent=stream.indentation()}if(stream.eatSpace())return null;var style=state.tokenize(stream,state);if("comment"!=style&&0==(state.ctx.flags&ALIGN_NO))setFlag(state,ALIGN_YES);if((";"==curPunc||"{"==curPunc||"}"==curPunc)&&"block"==state.ctx.type)pop(state);if("{"==curPunc)push(state,"}",stream);else if("("==curPunc){push(state,")",stream);if(state.afterIdent)state.ctx.argList=!0}else if("["==curPunc)push(state,"]",stream);else if("block"==curPunc)push(state,"block",stream);else if(curPunc==state.ctx.type)pop(state);else if("block"==state.ctx.type&&"comment"!=style)setFlag(state,BRACELESS);state.afterIdent="variable"==style||"keyword"==style;return style},indent:function(state,textAfter){if(state.tokenize!=tokenBase)return 0;var firstChar=textAfter&&textAfter.charAt(0),ctx=state.ctx,closing=firstChar==ctx.type;if(ctx.flags&BRACELESS)ctx=ctx.prev;if("block"==ctx.type)return ctx.indent+("{"==firstChar?0:config.indentUnit);else if(ctx.flags&ALIGN_YES)return ctx.column+(closing?0:1);else return ctx.indent+(closing?0:config.indentUnit)},lineComment:"#"}});CodeMirror.defineMIME("text/x-rsrc","r")});