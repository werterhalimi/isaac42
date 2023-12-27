$.getScript("../js/model.js", function(){
    $.getScript("/js/template.js", function(){
        getFilesData();
        main();
    });
});

$(function(){
    $('body').on('click', ".ancre", function (e) {
        e.preventDefault();

        let target = $($(this).attr('data-id'));

        if (target.length) {
            let speed = ((target.offset().top - $(document).scrollTop())/4);
            if(speed < 0)
                speed *= -1;
            $('html, body').animate({
                scrollTop: target.offset().top - 170 // Subtract 50 pixels to adjust for the header
            }, speed);
        }
    });
})

let main = function(){
    let data = jsonData;
    let param = getParam("type");
    console.log(param);
    if(param == "") {
        for (let keyFamille in data) {
            let famille = data[keyFamille];
            let group = print_famille("main", keyFamille, true);
            for (let keyCards in famille.cards) {
                let card = famille.cards[keyCards];
                print_card(group, card.img, keyFamille, card.cardName);
            }
        }
    }else{
        let keyFamille = param.replaceAll("_", " ");
        let famille = data[keyFamille];
        let group = print_famille("main", keyFamille);
        for (let keyCards in famille.cards) {
            let card = famille.cards[keyCards];
            print_card(group, card.img, keyFamille, card.cardName);
        }
    }
}

let getParam = function (val)
{
    let listParam;

    listParam = window.location.href.split("?")[1];
    console.log(typeof listParam);
    if(typeof(listParam) != "undefined")
        listParam = listParam.split("&");
    for(let key in listParam){
        let param = listParam[key].split("=");
        if(param[0] == val)
            return param[1];
    }
    return "";
}