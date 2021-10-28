//Create variables here
var dogimg
var dog
var dogimg1
var database
var foodS
var foodStock
var foodOBJ
var feed 
var addFood
function preload()
{
	//load images here
  dogimg=loadImage("images/dogimg.png");
  dogimg1=loadImage("images/dogimg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);
  foodOVJ = new Food()
  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(FeedDog)
  addFood = createButton("add the food")
  addFood.position(800,95)
  addFood.mousePressed(AddFoods)
  addFood.size(60,60)
  feed.size(60,60)
  dog=createSprite(250,300,150,150);
  dog.addImage("standing", dogimg);
  dog.scale=0.15;
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
}


function draw() {  
  background("white")
  if(keyDown(UP_ARROW))
  {
    writeStock(foodS)
    dog.addImage("dogimg1",dogimg1)
  }
  drawSprites();
  //add styles here
  text("Pres up arrow key to feed the dog",130,10)
  text(mouseX+","+mouseY,mouseX,mouseY);
}
// function readStock reads value fromm database.
function readStock(data)
{
foodS=data.val()
}
// function writeStock writes the value in database
function writeStock(x)
{
if(x<=0)
{
x=0
}
else
{
x=x-1
}
database.ref("/").update({Food:x})
}

function FeedDog()
{
dog.addImage("dogimage",dogimg1)
if(foodOVJ.getFoodStock()<=0)
  {
foodOVJ.updateFoodStock(foodOVJ.getFoodStock()*0)


  }
  else{

    foodOVJ.updateFoodStock(foodOVJ.getFoodStock()*-1)
   
       }

database.ref("/").update({
Food:foodOVJ.getFoodStock()


})



}


function AddFoods(){
foodS++
database.ref("/").update({
Food:foodS
  
  
  })




}