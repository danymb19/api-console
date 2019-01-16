(function(mod){if("object"==("undefined"===typeof exports?"undefined":babelHelpers.typeof(exports))&&"object"==("undefined"===typeof module?"undefined":babelHelpers.typeof(module)))mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";CodeMirror.defineMode("troff",function(){var words={};function tokenBase(stream){if(stream.eatSpace())return null;var sol=stream.sol(),ch=stream.next();if("\\"===ch){if(stream.match("fB")||stream.match("fR")||stream.match("fI")||stream.match("u")||stream.match("d")||stream.match("%")||stream.match("&")){return"string"}if(stream.match("m[")){stream.skipTo("]");stream.next();return"string"}if(stream.match("s+")||stream.match("s-")){stream.eatWhile(/[\d-]/);return"string"}if(stream.match("(")||stream.match("*(")){stream.eatWhile(/[\w-]/);return"string"}return"string"}if(sol&&("."===ch||"'"===ch)){if(stream.eat("\\")&&stream.eat("\"")){stream.skipToEnd();return"comment"}}if(sol&&"."===ch){if(stream.match("B ")||stream.match("I ")||stream.match("R ")){return"attribute"}if(stream.match("TH ")||stream.match("SH ")||stream.match("SS ")||stream.match("HP ")){stream.skipToEnd();return"quote"}if(stream.match(/[A-Z]/)&&stream.match(/[A-Z]/)||stream.match(/[a-z]/)&&stream.match(/[a-z]/)){return"attribute"}}stream.eatWhile(/[\w-]/);var cur=stream.current();return words.hasOwnProperty(cur)?words[cur]:null}function tokenize(stream,state){return(state.tokens[0]||tokenBase)(stream,state)};return{startState:function startState(){return{tokens:[]}},token:function token(stream,state){return tokenize(stream,state)}}});CodeMirror.defineMIME("text/troff","troff");CodeMirror.defineMIME("text/x-troff","troff");CodeMirror.defineMIME("application/x-troff","troff")});