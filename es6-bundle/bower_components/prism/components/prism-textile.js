(function(Prism){var modifierRegex="(?:\\([^|)]+\\)|\\[[^\\]]+\\]|\\{[^}]+\\})+",modifierTokens={css:{pattern:/\{[^}]+\}/,inside:{rest:Prism.languages.css}},"class-id":{pattern:/(\()[^)]+(?=\))/,lookbehind:!0,alias:"attr-value"},lang:{pattern:/(\[)[^\]]+(?=\])/,lookbehind:!0,alias:"attr-value"},punctuation:/[\\\/]\d+|\S/};Prism.languages.textile=Prism.languages.extend("markup",{phrase:{pattern:/(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,lookbehind:!0,inside:{"block-tag":{pattern:/^[a-z]\w*(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()])*\./,inside:{modifier:{pattern:/(^[a-z]\w*)(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()])+(?=\.)/,lookbehind:!0,inside:modifierTokens},tag:/^[a-z]\w*/,punctuation:/\.$/}},list:{pattern:/^[*#]+(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?\s+.+/m,inside:{modifier:{pattern:/(^[*#]+)(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+/,lookbehind:!0,inside:modifierTokens},punctuation:/^[*#]+/}},table:{pattern:/^(?:(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()^~])+\.\s*)?(?:\|(?:(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()^~_]|[\\\/]\d+)+\.)?[^|]*)+\|/m,inside:{modifier:{pattern:/(^|\|(?:\r?\n|\r)?)(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()^~_]|[\\\/]\d+)+(?=\.)/,lookbehind:!0,inside:modifierTokens},punctuation:/\||^\./}},inline:{pattern:/(\*\*|__|\?\?|[*_%@+\-^~])(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?.+?\1/,inside:{bold:{pattern:/(^(\*\*?)(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=\2)/,lookbehind:!0},italic:{pattern:/(^(__?)(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=\2)/,lookbehind:!0},cite:{pattern:/(^\?\?(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=\?\?)/,lookbehind:!0,alias:"string"},code:{pattern:/(^@(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=@)/,lookbehind:!0,alias:"keyword"},inserted:{pattern:/(^\+(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=\+)/,lookbehind:!0},deleted:{pattern:/(^-(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=-)/,lookbehind:!0},span:{pattern:/(^%(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?).+?(?=%)/,lookbehind:!0},modifier:{pattern:/(^\*\*|__|\?\?|[*_%@+\-^~])(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+/,lookbehind:!0,inside:modifierTokens},punctuation:/[*_%?@+\-^~]+/}},"link-ref":{pattern:/^\[[^\]]+\]\S+$/m,inside:{string:{pattern:/(\[)[^\]]+(?=\])/,lookbehind:!0},url:{pattern:/(\])\S+$/,lookbehind:!0},punctuation:/[\[\]]/}},link:{pattern:/"(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?[^"]+":.+?(?=[^\w\/]?(?:\s|$))/,inside:{text:{pattern:/(^"(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+)?)[^"]+(?=")/,lookbehind:!0},modifier:{pattern:/(^")(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+/,lookbehind:!0,inside:modifierTokens},url:{pattern:/(:).+/,lookbehind:!0},punctuation:/[":]/}},image:{pattern:/!(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()])*[^!\s()]+(?:\([^)]+\))?!(?::.+?(?=[^\w\/]?(?:\s|$)))?/,inside:{source:{pattern:/(^!(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()])*)[^!\s()]+(?:\([^)]+\))?(?=!)/,lookbehind:!0,alias:"url"},modifier:{pattern:/(^!)(?:(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+|[<>=()])+/,lookbehind:!0,inside:modifierTokens},url:{pattern:/(:).+/,lookbehind:!0},punctuation:/[!:]/}},footnote:{pattern:/\b\[\d+\]/,alias:"comment",inside:{punctuation:/\[|\]/}},acronym:{pattern:/\b[A-Z\d]+\([^)]+\)/,inside:{comment:{pattern:/(\()[^)]+(?=\))/,lookbehind:!0},punctuation:/[()]/}},mark:{pattern:/\b\((?:TM|R|C)\)/,alias:"comment",inside:{punctuation:/[()]/}}}}});var nestedPatterns={inline:Prism.languages.textile.phrase.inside.inline,link:Prism.languages.textile.phrase.inside.link,image:Prism.languages.textile.phrase.inside.image,footnote:Prism.languages.textile.phrase.inside.footnote,acronym:Prism.languages.textile.phrase.inside.acronym,mark:Prism.languages.textile.phrase.inside.mark};Prism.languages.textile.tag.pattern=/<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;Prism.languages.textile.phrase.inside.inline.inside.bold.inside=nestedPatterns;Prism.languages.textile.phrase.inside.inline.inside.italic.inside=nestedPatterns;Prism.languages.textile.phrase.inside.inline.inside.inserted.inside=nestedPatterns;Prism.languages.textile.phrase.inside.inline.inside.deleted.inside=nestedPatterns;Prism.languages.textile.phrase.inside.inline.inside.span.inside=nestedPatterns;Prism.languages.textile.phrase.inside.table.inside.inline=nestedPatterns.inline;Prism.languages.textile.phrase.inside.table.inside.link=nestedPatterns.link;Prism.languages.textile.phrase.inside.table.inside.image=nestedPatterns.image;Prism.languages.textile.phrase.inside.table.inside.footnote=nestedPatterns.footnote;Prism.languages.textile.phrase.inside.table.inside.acronym=nestedPatterns.acronym;Prism.languages.textile.phrase.inside.table.inside.mark=nestedPatterns.mark})(Prism);