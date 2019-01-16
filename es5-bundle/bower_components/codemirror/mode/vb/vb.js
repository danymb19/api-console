(function(mod){if("object"==("undefined"===typeof exports?"undefined":babelHelpers.typeof(exports))&&"object"==("undefined"===typeof module?"undefined":babelHelpers.typeof(module)))mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";CodeMirror.defineMode("vb",function(conf,parserConf){var ERRORCLASS="error";function wordRegexp(words){return new RegExp("^(("+words.join(")|(")+"))\\b","i")}var singleOperators=/^[\+\-\*\/%&\\|\^~<>!]/,singleDelimiters=/^[\(\)\[\]\{\}@,:`=;\.]/,doubleOperators=/^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(\/\/)|(\*\*))/,doubleDelimiters=/^((\+=)|(\-=)|(\*=)|(%=)|(\/=)|(&=)|(\|=)|(\^=))/,tripleDelimiters=/^((\/\/=)|(>>=)|(<<=)|(\*\*=))/,identifiers=/^[_A-Za-z][_A-Za-z0-9]*/,openingKeywords=["class","module","sub","enum","select","while","if","function","get","set","property","try"],middleKeywords=["else","elseif","case","catch"],endKeywords=["next","loop"],operatorKeywords=["and","or","not","xor","in"],wordOperators=wordRegexp(operatorKeywords),commonKeywords=["as","dim","break","continue","optional","then","until","goto","byval","byref","new","handles","property","return","const","private","protected","friend","public","shared","static","true","false"],commontypes=["integer","string","double","decimal","boolean","short","char","float","single"],keywords=wordRegexp(commonKeywords),types=wordRegexp(commontypes),stringPrefixes="\"",opening=wordRegexp(openingKeywords),middle=wordRegexp(middleKeywords),closing=wordRegexp(endKeywords),doubleClosing=wordRegexp(["end"]),doOpening=wordRegexp(["do"]),indentInfo=null;CodeMirror.registerHelper("hintWords","vb",openingKeywords.concat(middleKeywords).concat(endKeywords).concat(operatorKeywords).concat(commonKeywords).concat(commontypes));function indent(_stream,state){state.currentIndent++}function dedent(_stream,state){state.currentIndent--}function tokenBase(stream,state){if(stream.eatSpace()){return null}var ch=stream.peek();if("'"===ch){stream.skipToEnd();return"comment"}if(stream.match(/^((&H)|(&O))?[0-9\.a-f]/i,!1)){var floatLiteral=!1;if(stream.match(/^\d*\.\d+F?/i)){floatLiteral=!0}else if(stream.match(/^\d+\.\d*F?/)){floatLiteral=!0}else if(stream.match(/^\.\d+F?/)){floatLiteral=!0}if(floatLiteral){stream.eat(/J/i);return"number"}var intLiteral=!1;if(stream.match(/^&H[0-9a-f]+/i)){intLiteral=!0}else if(stream.match(/^&O[0-7]+/i)){intLiteral=!0}else if(stream.match(/^[1-9]\d*F?/)){stream.eat(/J/i);intLiteral=!0}else if(stream.match(/^0(?![\dx])/i)){intLiteral=!0}if(intLiteral){stream.eat(/L/i);return"number"}}if(stream.match(stringPrefixes)){state.tokenize=tokenStringFactory(stream.current());return state.tokenize(stream,state)}if(stream.match(tripleDelimiters)||stream.match(doubleDelimiters)){return null}if(stream.match(doubleOperators)||stream.match(singleOperators)||stream.match(wordOperators)){return"operator"}if(stream.match(singleDelimiters)){return null}if(stream.match(doOpening)){indent(stream,state);state.doInCurrentLine=!0;return"keyword"}if(stream.match(opening)){if(!state.doInCurrentLine)indent(stream,state);else state.doInCurrentLine=!1;return"keyword"}if(stream.match(middle)){return"keyword"}if(stream.match(doubleClosing)){dedent(stream,state);dedent(stream,state);return"keyword"}if(stream.match(closing)){dedent(stream,state);return"keyword"}if(stream.match(types)){return"keyword"}if(stream.match(keywords)){return"keyword"}if(stream.match(identifiers)){return"variable"}stream.next();return ERRORCLASS}function tokenStringFactory(delimiter){var singleline=1==delimiter.length,OUTCLASS="string";return function(stream,state){while(!stream.eol()){stream.eatWhile(/[^'"]/);if(stream.match(delimiter)){state.tokenize=tokenBase;return OUTCLASS}else{stream.eat(/['"]/)}}if(singleline){if(parserConf.singleLineStringErrors){return ERRORCLASS}else{state.tokenize=tokenBase}}return OUTCLASS}}function tokenLexer(stream,state){var style=state.tokenize(stream,state),current=stream.current();if("."===current){style=state.tokenize(stream,state);if("variable"===style){return"variable"}else{return ERRORCLASS}}var delimiter_index="[({".indexOf(current);if(-1!==delimiter_index){indent(stream,state)}if("dedent"===indentInfo){if(dedent(stream,state)){return ERRORCLASS}}delimiter_index="])}".indexOf(current);if(-1!==delimiter_index){if(dedent(stream,state)){return ERRORCLASS}}return style}var external={electricChars:"dDpPtTfFeE ",startState:function startState(){return{tokenize:tokenBase,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:!1}},token:function token(stream,state){if(stream.sol()){state.currentIndent+=state.nextLineIndent;state.nextLineIndent=0;state.doInCurrentLine=0}var style=tokenLexer(stream,state);state.lastToken={style:style,content:stream.current()};return style},indent:function indent(state,textAfter){var trueText=textAfter.replace(/^\s+|\s+$/g,"");if(trueText.match(closing)||trueText.match(doubleClosing)||trueText.match(middle))return conf.indentUnit*(state.currentIndent-1);if(0>state.currentIndent)return 0;return state.currentIndent*conf.indentUnit},lineComment:"'"};return external});CodeMirror.defineMIME("text/x-vb","vb")});