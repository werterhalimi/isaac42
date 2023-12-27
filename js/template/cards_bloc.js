let print_card = function(parent, img, text, nb = 0){
    let printable = $(parent).html();
    let article = "<a" + " class='" + (text == "Rooms" ? "vertical" : "") + "' href='type_list.html?type=" + text.replaceAll(" ","_") +"'>" + "<img src='" + img + "' title='" + text + "' alt='" + text + "'/>" + "<h3>" + text;
    if(nb > 0)
        article += " (" + nb + ")";
    article += "</h3>" + "</a>";
    printable += article;
    $(parent).html(printable);
}