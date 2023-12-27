$.getScript("../js/model.js", function(){
    $.getScript("/js/template.js", function(){
        getFilesData();
        main(jsonData);
    });
});

let main = function(data){
    for(let keyFamille in data)
    {
        let famille = data[keyFamille];
        print_card_back("#listFamille", famille.imgSrc, keyFamille,  famille.cards.length);
        for(let keyCards in data[keyFamille].cards)
        {
            //console.log(data[keyFamille].cards[keyCards]);
        }
    }
};

let readDesc = function(desc){

}

let getFlag = function(desc, dico){
    let listFlag = [];

    return (listFlag);
}