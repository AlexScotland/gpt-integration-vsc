
// Export a class
exports.UIBuilder = class {
constructor() {
    // Your class constructor code here
}

 _build_list_object(li_item){
    return `<li>${li_item}</li>`
};

 build_given_item_list(list_of_items) {
    let html_str = "<ul>";
    for (var index = 0; index < list_of_items.length; index ++){
        html_str = html_str + this._build_list_object(list_of_items[index]);
    }
    html_str = html_str + "</ul>";
    return html_str
}
};