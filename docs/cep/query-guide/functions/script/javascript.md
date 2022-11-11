---
title: javascript (Script)
---

This extension allows you to include JavaScript functions within the Query Language.

Syntax

    define function <FunctionName>[javascript] return <type> {
        // Script code
    };

## Example 1

    define function concatJ[JavaScript] return string {"  var str1 = data[0];
     var str2 = data[1];
     var str3 = data[2];
     var res = str1.concat(str2,str3);
     return res;
    };

This JS function will consume 3 var variables, concatenate them and will return as a string
