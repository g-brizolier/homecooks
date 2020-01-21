var currentSlot = 0
const nbr_tags = 8
var nameReg = /^[0-9a-zA-Z' ]+$/;
var numbersReg = /^[0-9.]+$/

home = function()
{    
    alert('Home, sweet home!')
}

window.onload = function() {
    const size = window.innerWidth/10
    for (let index = 1; index < 6; index++){
       document.getElementById('img'+index).height= size
       document.getElementById('img'+index).width= size       
    }
    
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        currentSlot = localStorage.key( i )
        var onloadcontent= localStorage.getItem( currentSlot ).split(',"*",')
        document.getElementById('modifySlot'+currentSlot).style.display='inline'
        document.getElementById('useSlot'+currentSlot).style.display='none'
        document.getElementById('deleteSlot'+currentSlot).style.display='inline'
        var dish = []
        dish.push(onloadcontent[0].slice(2,-1))
        dish.push( onloadcontent[1].slice(1,-1))
        dish.push(onloadcontent[5].slice(1,-1))
        createDish(dish)
       // alert("img"+localStorage.key(i))
       // alert(onloadcontent[0].slice(2,-1))
        //document.getElementById('name'+indice).innerHTML= onloadcontent[0].slice(2,-1)
        //document.getElementById('img'+indice).src=  onloadcontent[1].slice(1,-1) ;
       
    }
}


addNewDish = function(slot)
{
    // if (currentSpot >10){
    //     document.getElementById("warning").style.display = 'inline' 
       
    // }
  //  else{
      currentSlot = slot
        document.getElementById("createDish").style.display = 'inline' 
        document.getElementById("dishList").style.display = 'none' 
   
 //   }
}


back = function()
{ var tagsInForm = document.getElementsByClassName('tag')
    for (let index = 0; index < nbr_tags; index++) { 
      tagsInForm[index].checked = false
      document.getElementById(tagsInForm[index].value+'label').style.backgroundColor = 'grey';
    }  
    document.getElementById("dishList").style.display = 'inline-block' 
    document.getElementById("createDish").style.display = 'none' 
}

loadImage = function(event)
{  
    var image = document.getElementById('output')
    image.src = URL.createObjectURL(event.target.files[0])
    image.style.display ='inline'
}

tagCheck = function(idString) //only for design
{   
    status = document.getElementById(idString).checked
    if (status == 'true'){
        document.getElementById(idString+'label').style.backgroundColor = 'grey'; 
    }
    else if (status == 'false') {
        document.getElementById(idString+'label').style.backgroundColor = 'lightgrey'; 
    }
}

saveDish = function()
{
if(testForm())
{
   saveDishValid()
}
else{
    alert('This Dish is not valid')
}
}

saveDishValid = function()
{   
    var newDish = []
    var newDishDisplay = []
    var name = document.getElementById('name').value
    //var imageUrl = document.getElementById('output').src
    var image = getBase64Image(document.getElementById('output'))
    var description = document.getElementById('description').value
    var ingredients = document.getElementById('ingredients').value
    var price = document.getElementById('price').value
    var quantity = document.getElementById('quantity').value
    var tags = []
    var tagsInForm = document.getElementsByClassName('tag')
    for (let index = 0; index < nbr_tags; index++) {
        if(tagsInForm[index].checked == true){
            tags.push(tagsInForm[index].value)
            tags.push('*')
        }  
      tagsInForm[index].checked = false
    }  

    newDishDisplay.push(name)
    newDish.push(name)
    newDish.push('*')
   // newDishDisplay.push(imageUrl)
    ///newDish.push(imageUrl)
    newDishDisplay.push(image)
    newDish.push(image)
    newDish.push('*')
    newDish.push(description)
    newDish.push('*')
    newDish.push(ingredients)
    newDish.push('*')
    newDish.push(price)
    newDish.push('*')
    newDishDisplay.push(quantity)
    newDish.push(quantity)
    newDish.push('*')
    newDish.push(tags)
    localStorage.setItem(currentSlot, JSON.stringify(newDish))
//alert(document.getElementsByClassName('tag')[1].value)
//alert(document.querySelector('.tag :checked').val())
    document.getElementById('output').style.display='none'
    document.getElementById('modifySlot'+currentSlot).style.display='inline'
    document.getElementById('useSlot'+currentSlot).style.display='none'
    document.getElementById('deleteSlot'+currentSlot).style.display='inline'
    createDish(newDishDisplay)
    back()
}

createDish = function(newDish)
{   
    document.getElementById('name'+currentSlot).innerHTML = newDish[0]
    //document.getElementById('img'+currentSlot).src = newDish[1]
    document.getElementById('img'+currentSlot).setAttribute(
        'src', 'data:image/png;base64,'+newDish[1]
    );
    document.getElementById('quantity'+currentSlot).innerHTML = 'Quantity left: '+newDish[2]
}

modify = function(slotnumber)
{
currentSlot = slotnumber
var content = localStorage.getItem(currentSlot).split(',"*"') //can't use this symbol
var name = content[0] .slice(2,-1)
var imageUrl = content[1].slice(2,-1)
var description = content[2].slice(2,-1)
var ingredients = content[3].slice(2,-1)
var price = content[4].slice(2,-1)
var quantity = content[5].slice(2,-1)
var tags = []
tags.push(content[6].slice(3,-1))
for (let index = 7; index < content.length-1; index++) {
    tags.push(content[index].slice(2,-1)) 
}
document.getElementById('name').value = name
//document.getElementById('output').src = imageUrl
document.getElementById('output').setAttribute(
    'src', 'data:image/png;base64,'+imageUrl
);
document.getElementById('output').style.display = 'inline'
document.getElementById('description').value = description 
document.getElementById('ingredients').value = ingredients
document.getElementById('price').value = price
document.getElementById('quantity').value = quantity
for (let index = 0; index < tags.length; index++) {
    var tag= tags[index]
    document.getElementById(tag).checked=true 
    document.getElementById(tag+'label').style.backgroundColor = 'lightgrey';   
}
addNewDish(currentSlot)
}


deleteDish = function(slot)
{   currentSlot = slot
    localStorage.removeItem(currentSlot)
    document.getElementById('modifySlot'+currentSlot).style.display='none'
    document.getElementById('useSlot'+currentSlot).style.display='inline'
    document.getElementById('deleteSlot'+currentSlot).style.display='none'
    location.reload()
}


testForm = function()
{
    var name = document.getElementById('name').value
    //var imageUrl = document.getElementById('output').src
    // var image = getBase64Image(document.getElementById('output'))
    var description = document.getElementById('description').value
    var ingredients = document.getElementById('ingredients').value
    var price = document.getElementById('price').value
    var quantity = document.getElementById('quantity').value
    var tags = []
    var tagsInForm = document.getElementsByClassName('tag')
    for (let index = 0; index < nbr_tags; index++) {
        if(tagsInForm[index].checked == true){
             tags.push(tagsInForm[index].value)
         }  
     } 
    //VERIFICATION
    var photoStatus = document.getElementById('output').style.display
    if(description.match(/^[ ]*$/) || name.match(/^[ ]*$/) || ingredients.match(/^[ ]*$/) ){
        alert('You must leave no blanks!')
        return false
    }

    else if(name.match(nameReg) == null){
        alert('The name of your dish must be composed of numbers or letters')
        return false
    }

   else if(description.match('[*]') != null || ingredients.match('[*]') != null){
        alert('Invalid character is used: *')
        return false
    }

    else if(price.match(numbersReg) == null || quantity.match(numbersReg) == null){
        alert('You must type numbers and , for Price and Quantity')
    }
    else if (tags.length == 0) {
        alert('You must select at least one tag')
        return false
    }
    else if (photoStatus != 'inline'){
        alert('You must upload a photo of your dish! (best formats : png & jpg)')
        return false
    }

    else{
        alert('Dish added!')
        return true
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
