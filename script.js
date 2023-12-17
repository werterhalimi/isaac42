const elements = document.querySelectorAll(".CardTypeIconSection")
const ret = {}
const iframe = document.createElement('iframe')
document.querySelector("#menu-main-menu").append(iframe)
const recursvie = (i) =>  {
    if (i === elements.length) {
        console.error('finis')
        fetchCard(0)
        return
    } 
    
    const element = elements[i];
    const img = element.querySelector('img')
    const name = element.querySelector('h3')
    const a = element.querySelector('a')
    iframe.onload = () => {
         if (ret[name.textContent])
             ret[name.textContent].cards.push(...[...iframe.contentWindow.document.body.querySelectorAll("#cardGrid > div")].map(c => 
                 ({a: c.querySelector('a').href ,img: c.querySelector('img').getAttribute('data-src')})))
        else
             ret[name.textContent] = {imgSrc: img.src, cards: [...iframe.contentWindow.document.body.querySelectorAll("#cardGrid > div")].map(c => ({a: c.querySelector('a').href,img: c.querySelector('img').getAttribute('data-src')}))}
        const next = iframe.contentWindow.document.body.querySelector("#CardsearchNav > nav > div > span")
        if (next && next.nextElementSibling) iframe.src = next.nextElementSibling.href
        else recursvie(i + 1)
    }
    
    iframe.src = a.href

}
recursvie(0)
const cardIframe = document.createElement('iframe')
document.querySelector("#menu-main-menu").append(cardIframe)


const fetchCard = (i) => {
    const keys = Object.keys(ret);
    if (i === keys.length) {
        console.error(ret)
        return
    }
    debugger
    const cardType = ret[keys[i]];
    const cards = cardType.cards;
    let cardIndex = 0;
    cardIframe.onload = () => {
        const statsElement = cardIframe.contentWindow.document.body.querySelector("#StatTable");
       let stats = statsElement ? [...statsElement.querySelectorAll('tr')].map(c => (
    {alt: c.querySelector('img').alt,
     value:c.querySelector('td.value').textContent,
    })) : null
        const cardName = cardIframe.contentWindow.document.body.querySelector("#PageContent > main > h1").textContent
        let cardDesc = cardIframe.contentWindow.document.body.querySelector("#CardInfo")
        let relatedCard = cardIframe.contentWindow.document.body.querySelector("#CharitemBox > div.relatedCard > a")
        relatedCard = relatedCard ? relatedCard.childNodes[2].textContent : null
        if (cardDesc) {
            const originSet = cardDesc.querySelector('#OriginSet')
            const cardType = [...originSet.querySelectorAll('p')].map(c => c.textContent)
            originSet.remove()
            cardDesc.querySelectorAll('br, img, noscript').forEach(c => c.remove())
            const description = cardDesc.textContent.replaceAll('\t','').replaceAll('\n', '').replaceAll('\\', '')
            cardDesc = {description, cardType}
        }
        
        ret[keys[i]].cards[cardIndex] = {stats, cardName,cardDesc, ...ret[keys[i]].cards[cardIndex], relatedCard}
        if (cards[cardIndex + 1] && cards[cardIndex + 1].a)
            cardIframe.src = cards[++cardIndex].a
        else
            fetchCard(i + 1)
        
    }
    cardIframe.src = cards[cardIndex].a
}





