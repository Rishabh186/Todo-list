const express=require('express')
const bodyparser=require('body-parser')
const ejs=require('ejs')
const app=express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine','ejs')

var newItems=["Buy food","Cook food"," Eat food"]
var workItems=[]

app.get('/',(req,res)=>{
    
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var today=new Date();
    var day=today.getDay();
    var d="";
      d=today.toLocaleDateString("en-US", options); 
    

     res.render('list',{listTitle:d,newListItems :newItems});
    
})


app.get('/work',(req,res)=>{
  res.render('list',{listTitle:"Work" ,newListItems:workItems})
})

app.post('/',(req,res)=>{
  if(req.body.list==='Work'){
    var newItem=req.body.item
    workItems.push(newItem)
    res.redirect('/work');
  }else{
    var item=req.body.item
    newItems.push(item)   
     res.redirect('/')
  }
 
})


app.listen(3000,(err)=>{
    if(err){
      throw err;
    }else{
      console.log("Server is running on port 3000")
    }
})