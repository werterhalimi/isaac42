
$(function(){
    print_header();
});
let print_famille = function (parent, title, with_link = false){
    let printable = $(parent).html();
    let printable_2 = $("#ancre").html();
    let id_section = title.replaceAll(" ", "_");
    printable_2 += "<span class='ancre' data-id='#" + id_section + "'>" + title + "</span>";
    printable += "<h1><a href='type_list.html?type=" + id_section + "'>" + title + "</a></h1>";
    printable += "<section class='listCard' id='" + id_section + "'></section>";
    $(parent).html(printable);
    if(with_link)
        $("#ancre").html(printable_2);
    else
        $("#ancre").remove();
    return ("#" + id_section);
}

let print_card = function(parent, img, type, name, nb = 0){
    let printable = $(parent).html();
    let article = "<a" + " class='" + (type == "Rooms" ? "vertical" : "") + "' href='card_fiche.html?type=" + type.replaceAll(" ","_") +"&card=" + name.replaceAll(" ", "_") + "'>" + "<img src='" + img + "' title='" + name + "' alt='" + name + "'/>" + "<h3>" + name;
    article += "</h3>" + "</a>";
    printable += article;
    $(parent).html(printable);
}

let print_card_back = function(parent, img, text, nb = 0){
    let printable = $(parent).html();
    let article = "<a" + " class='" + (text == "Rooms" ? "vertical" : "") + "' href='type_list.html?type=" + text.replaceAll(" ","_") +"'>" + "<img src='" + img + "' title='" + text + "' alt='" + text + "'/>" + "<h3>" + text;
    if(nb > 0)
        article += " (" + nb + ")";
    article += "</h3>" + "</a>";
    printable += article;
    $(parent).html(printable);
}

let print_header = function()
{
    let printable = $("body").html();
    printable += "<header> <a href='index.html' id='logo' title='Logo'></a> <nav>";
    printable += "<a href='type_list.html'" + ">Liste des cartes</a>";
    printable += "<a href='dictionnaire.html'>Dictionnaire</a>";
    printable += "</nav></header>";
    $("body").html(printable);
}