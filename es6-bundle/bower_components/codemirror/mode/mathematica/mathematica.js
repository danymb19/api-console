(function(mod){if("object"==typeof exports&&"object"==typeof module)mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";CodeMirror.defineMode("mathematica",function(_config,_parserConfig){var Identifier="[a-zA-Z\\$][a-zA-Z0-9\\$]*",pBase="(?:\\d+)",pFloat="(?:\\.\\d+|\\d+\\.\\d*|\\d+)",pFloatBase="(?:\\.\\w+|\\w+\\.\\w*|\\w+)",pPrecision="(?:`(?:`?"+pFloat+")?)",reBaseForm=new RegExp("(?:"+pBase+"(?:\\^\\^"+pFloatBase+pPrecision+"?(?:\\*\\^[+-]?\\d+)?))"),reFloatForm=new RegExp("(?:"+pFloat+pPrecision+"?(?:\\*\\^[+-]?\\d+)?)"),reIdInContext=/(?:`?)(?:[a-zA-Z\$][a-zA-Z0-9\$]*)(?:`(?:[a-zA-Z\$][a-zA-Z0-9\$]*))*(?:`?)/;function tokenBase(stream,state){var ch;ch=stream.next();if("\""===ch){state.tokenize=tokenString;return state.tokenize(stream,state)}if("("===ch){if(stream.eat("*")){state.commentLevel++;state.tokenize=tokenComment;return state.tokenize(stream,state)}}stream.backUp(1);if(stream.match(reBaseForm,!0,!1)){return"number"}if(stream.match(reFloatForm,!0,!1)){return"number"}if(stream.match(/(?:In|Out)\[[0-9]*\]/,!0,!1)){return"atom"}if(stream.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::usage)/,!0,!1)){return"meta"}if(stream.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::[a-zA-Z\$][a-zA-Z0-9\$]*):?/,!0,!1)){return"string-2"}if(stream.match(/([a-zA-Z\$][a-zA-Z0-9\$]*\s*:)(?:(?:[a-zA-Z\$][a-zA-Z0-9\$]*)|(?:[^:=>~@\^\&\*\)\[\]'\?,\|])).*/,!0,!1)){return"variable-2"}if(stream.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+[a-zA-Z\$][a-zA-Z0-9\$]*/,!0,!1)){return"variable-2"}if(stream.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+/,!0,!1)){return"variable-2"}if(stream.match(/_+[a-zA-Z\$][a-zA-Z0-9\$]*/,!0,!1)){return"variable-2"}if(stream.match(/\\\[[a-zA-Z\$][a-zA-Z0-9\$]*\]/,!0,!1)){return"variable-3"}if(stream.match(/(?:\[|\]|{|}|\(|\))/,!0,!1)){return"bracket"}if(stream.match(/(?:#[a-zA-Z\$][a-zA-Z0-9\$]*|#+[0-9]?)/,!0,!1)){return"variable-2"}if(stream.match(reIdInContext,!0,!1)){return"keyword"}if(stream.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%)/,!0,!1)){return"operator"}stream.next();return"error"}function tokenString(stream,state){var next,end=!1,escaped=!1;while(null!=(next=stream.next())){if("\""===next&&!escaped){end=!0;break}escaped=!escaped&&"\\"===next}if(end&&!escaped){state.tokenize=tokenBase}return"string"};function tokenComment(stream,state){var prev,next;while(0<state.commentLevel&&null!=(next=stream.next())){if("("===prev&&"*"===next)state.commentLevel++;if("*"===prev&&")"===next)state.commentLevel--;prev=next}if(0>=state.commentLevel){state.tokenize=tokenBase}return"comment"}return{startState:function(){return{tokenize:tokenBase,commentLevel:0}},token:function(stream,state){if(stream.eatSpace())return null;return state.tokenize(stream,state)},blockCommentStart:"(*",blockCommentEnd:"*)"}});CodeMirror.defineMIME("text/x-mathematica",{name:"mathematica"})});