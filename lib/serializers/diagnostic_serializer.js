function serialize_html(diagnostic_list){
    let return_list = [];
    for(var x = 0; x < diagnostic_list.length; x ++){
        let html_string = `<div class='diagnostic' id=${x}>`
        let diagnostic = diagnostic_list[x];
        html_string= html_string +`<h2>File: ${diagnostic[0]}</h2><br>`
        for(var y = 0; y < diagnostic[1].length; y ++){
            html_string= html_string + _create_html_string(diagnostic[1][y], x, y);
        }
        html_string= html_string +"</div>"
        return_list.push(html_string)
    }
    return return_list
}

function _create_html_string(diagnostic, file_index, problem_index){
    return `<div id="${file_index}-${problem_index}">
    <h3>Problem: ${diagnostic.message} - ${diagnostic.severity}</h3><br>
    <span name="code_lines">${diagnostic.range.start.line + 1} - ${diagnostic.range.start.character + 1} </span><br>
    <span style="display:none" id="question-${file_index}-${problem_index}">My Code has this error: ${diagnostic.message}, How would I fix this?</span>
    <button onclick="send_question('question-${file_index}-${problem_index}')">Fix Problem</button>
    </div>
    `
}


exports.diagnostic_html_serialize = serialize_html;