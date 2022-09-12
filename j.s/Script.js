//////////////// Variables //////////////////
const $=document
let shoppingListContainer=_q('.shoppingListContainer')
let shoppingCardContainer=_q('.shoppingCard-container')
let purchaseBtn=_q('.purchaseBtn')
let totalPriceTag=_q('.totalPrice')
let shoppingCardFragment=$.createDocumentFragment()
let targetList=[];
let x=0;
let newBoxDiv,newTrElem;
const shoppingCardDB=[
    {id:1,imageSrc:'img/shoe_1.png',title:'Training shoes 1',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:129.99},
    {id:2,imageSrc:'img/shoe_2.png',title:'Training shoes 2',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:69.99},
    {id:3,imageSrc:'img/shoe_3.png',title:'Training shoes 3',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:198.99},
    {id:4,imageSrc:'img/shoe_4.png',title:'Training shoes 4',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:110.99},
    {id:5,imageSrc:'img/shoe_5.png',title:'Training shoes 5',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:35.99},
    {id:6,imageSrc:'img/shoe_6.png',title:'Training shoes 6',description:'The Nike SuperRep Go shoes combine comfortable foam cushioning.',price:80.99}
]
//////////////// Variables //////////////////
/////////////// catching elements functions//////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
/////////////// catching elements functions//////////////////
////////// add to favorite///////////////
function clearShoppingList() {
    shoppingListContainer.innerHTML=''
    targetList=[]
    let allBoxes=$.querySelectorAll('.box')
    allBoxes.forEach(function (box) {
        box.classList.remove('active')
        box.children[3].innerHTML='Add to card'
    })
    totalPriceUpdate(targetList)
}
function quantityHandler(e) {
    totalPriceUpdate(targetList)
}
function totalPriceUpdate(tgList) {
    let updatePrice=0;
    tgList.forEach(function (item) {
        updatePrice+=Number(item.children[4].children[0].value)*Number(item.children[2].children[0].innerHTML)
    })
    totalPriceTag.innerHTML=`${updatePrice.toFixed(2)}`

}
function addToFavorite(e){
    let whichItem=e.target.dataset.id
    let targetShoppingCard=shoppingCardDB[whichItem]
    let parent=e.target.parentElement
    if(!parent.classList.contains('active')){
        parent.classList.add('active')
        generateTrForTable((targetShoppingCard.id)-1,targetShoppingCard.imageSrc,targetShoppingCard.title,targetShoppingCard.price)
        totalPriceUpdate(targetList)
        e.target.innerHTML='Remove Item'

    }else{
        removeItemByUsingButton((targetShoppingCard.id)-1)
        totalPriceUpdate(targetList)
        e.target.innerHTML='Add to favorite'
       parent.classList.remove('active')
    }

}
function removeItemByUsingButton(id){
    let allTrElement=document.querySelectorAll('.itemContainer')
    allTrElement.forEach(function (tr) {
        if(tr.getAttribute('data-id')===`${id}`){
            tr.remove()
        }
    })
    let index=targetList.findIndex(function (item) {
        return id===Number(item.getAttribute('data-id'))
    })
    targetList.splice(index,1)
    totalPriceUpdate(targetList)
}
function generateTrForTable(id,imgSource,cardTitle,cardPrice) {
    newTrElem=$.createElement('tr')
    newTrElem.setAttribute('data-id',`${id}`)
    newTrElem.className='itemContainer'
    newTrElem.insertAdjacentHTML('beforeend','<td class="pt-1"><img alt="product picture" src='+imgSource+'><p class="d-inline-block m-0 ms-1">'+cardTitle+'</p></td><td></td><td><span>'+cardPrice+'</span>$</td><td></td><td><input class="form-control form-control-sm d-inline-block w-25 me-2" min="1" type="number" oninput="quantityHandler(event)" value="1" data-index='+x+' ><button class="btn btn-danger btn-sm" onclick="removeItemInShoppingList(event)">Remove</button></td>')

    targetList.push(newTrElem)
    shoppingListContainer.append(newTrElem)
    console.log(targetList)
    x++
}
function removeItemInShoppingList(e) {
    let trId=e.target.parentElement.parentElement.dataset.id
    let allAddToCardBtn=$.querySelectorAll('.add-to-card')
    allAddToCardBtn.forEach(function (btn) {
        if(btn.getAttribute('data-id')===`${trId}`){
            btn.parentElement.classList.remove('active')
            btn.innerHTML='Add to card'
        }
    })
    let index=targetList.findIndex(function (item) {
        return trId===item.getAttribute('data-id')
    })
    targetList.splice(index,1)
    e.target.parentElement.parentElement.remove()

    totalPriceUpdate(targetList)

}
function fillStar(e) {
    let parent=e.target.parentElement.parentElement
    let whichItem=e.target.parentElement.parentElement.children[3].dataset.id
    let targetShoppingCard=shoppingCardDB[whichItem]
    if(!parent.classList.contains('active')){
        parent.classList.add('active')
        generateTrForTable((targetShoppingCard.id)-1,targetShoppingCard.imageSrc,targetShoppingCard.title,targetShoppingCard.price)
        totalPriceUpdate(targetList)
        e.target.parentElement.parentElement.children[3].innerHTML='Remove Item'

    }else{
        removeItemByUsingButton((targetShoppingCard.id)-1)
        e.target.parentElement.parentElement.children[3].innerHTML='Add to favorite'
        parent.classList.remove('active')
    }


}
function prepareShoppingCard() {
    let i=0
    shoppingCardDB.forEach(function (card) {
        generateShoppingCard(card.imageSrc,card.title,card.description,card.price,i)
        i++
    })
    shoppingCardContainer.append(shoppingCardFragment)

}
function generateShoppingCard(imageSource,title,description,price,i) {
    newBoxDiv=$.createElement('div')
    newBoxDiv.className='box'

    newBoxDiv.insertAdjacentHTML('beforeend','<div class="show_product"><i class="fa-regular fa-star star" onclick="fillStar(event)"></i><i class="fa-solid fa-star star" onclick="fillStar(event)"></i><img alt="product pic" class="product_pic" src='+imageSource+'></div><div class="box_content"><h3 class="title text-start">'+title+'</h3><p class="description text-start">'+description+'</p></div><span class="text-center my-2">'+price+'$</span><button class="add-to-card" onclick="addToFavorite(event)" data-id='+i+'>Add to card</button>')

    shoppingCardFragment.append(newBoxDiv)


}
window.addEventListener('load',prepareShoppingCard)
purchaseBtn.addEventListener('click',clearShoppingList)