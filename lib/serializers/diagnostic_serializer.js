function serialize_html(diagnostic_list){
    let return_list = [];
    for(var x = 0; x < diagnostic_list.length; x ++){
        let html_string = `<div class='diagnostic' id=${x}>`
        let diagnostic = diagnostic_list[x];
        html_string= html_string +`<h2>File: ${diagnostic[0]}</h2><br>`
        for(var y = 0; y < diagnostic[1].length; y ++){
            html_string= html_string + _create_html_string(diagnostic[1][y], x);
        }
        html_string= html_string +"</div>"
        return_list.push(html_string)
    }
    return return_list
}

function _create_html_string(diagnostic, index){
    return `<h3>Problem: ${diagnostic.message} - ${diagnostic.severity}</h3><br>
    <span name="code">${diagnostic.range.start.line + 1} - ${diagnostic.range.start.character + 1} </span><br>
    <button name="fix_diagnostic-${index}">Fix Problem</button>
    `
}


exports.diagnostic_html_serialize = serialize_html;