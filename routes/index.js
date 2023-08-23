var express = require('express');
var router = express.Router();
var session;
const credential={email:"jaseelta1@gmail.com",
password:"helo123"}

let products = [{
  image: "https://m.media-amazon.com/images/I/51UuPZLMaCL._AC_SX679_.jpg",
  CardTitle: "APPLE iPhone 13 (Midnight, 128 GB)",
  discription: "Super Retina XDR Display5G A15 Bionic Chip 15.4 cm (6.1 inch) all‑screen OLED Display Pro 12 MP Camera System: Telephoto, Wide and Ultra Wide Cameras MagSafe wireless charging up to 15W ",
  price:"€ 1,155",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://m.media-amazon.com/images/I/61o9g6JTFRL._AC_SY550_.jpg",
  CardTitle: "ASUS ROG Phone 6 Pro 5G 512GB  White",
  discription: "Qualcomm Snapdragon 8 Plus Gen 1, 18 GB|512 GB 50 MP + 13 MP + 5 MP Triple Rear Camera 12 MP Front Camera  65W Charging AMOLED Android 12",
  price:"€ 1,122",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://m.media-amazon.com/images/I/81qOD8EZTjL._AC_SX679_.jpg",
  CardTitle: "OnePlus 10 Pro | 5G Android Smartphone |128GB",
  discription: "12 GB RAM,  6.7 Inches; 120 Hz QHD+ Fluid AMOLED, 48MP + 50MP+8MP | 32MP Front Camera, 5000 mAh with 80W SuperVOOC, Qualcomm Snapdragon 8 Gen 1",
  price:"€ 518",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://i.gadgets360cdn.com/products/large/Pixel-7-Pro-643x800-1665067249.jpg?downsize=*:420&output-quality=80",
  CardTitle: "Google Pixel 7 Pro (Obsidian, 128 GB)",
  discription: "12 GB RAM,17.02 cm (6.7 inch) Quad HD+ Display, 50MP + 48MP + 12MP | 10.8MP Front Camera, 4926 mAh Battery, Google Tensor G2 Processor, 1 year Domestic Warranty",
  price:"€ 764",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://images.samsung.com/in/smartphones/galaxy-z-flip4/buy/26_Flip4_Bespoke_ColorSelection_top5_silver_white_white_PC.png",
  CardTitle: " Samsung Galaxy Z Flip4 5G (Bespoke Edition, 128GB Storage) ",
  discription: "8 GB RAM | 128 GB ROM, 17.02 cm (6.7 inch) Full HD+ Display 12MP + 12MP | 10MP Front Camera, 3700 mAh Lithium Ion Battery, Qualcomm Snapdragon 8+ Gen 1 Processor",
  price:"€ 662",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://m.media-amazon.com/images/I/61lWkGr0RiL._SX522_.jpg",
  CardTitle: "iQOO 9 Pro 5G (Legend, 256GB Storage|Dark Cruise)",
  discription: " Rear Camera: 50 MP + 50 MP + 16 MP Front Camera: 16 MP 12 GB RAM and 256 GB 120W Flash-charge,4700 mAh Li-Polymer battery, 1 Year Manufacturer Warranty ",
  price:"€ 649",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://www.notebookcheck.net/fileadmin/_processed_/webp/Notebooks/News/_nc3/Screenshot_2022_01_25_153338-q82-w240-h.webp",
  CardTitle: "HUAWEI P50 Pro - 128GB (Cocoa Gold)",
  discription: "8GB 6.60-inch OLED, Qualcomm Snapdragon 888  Front Camera 13MP,Rear Camera 50MP + 40MP + 13MP + 64MP, 4360mAh Lithium Ion Battery 1 Year Domestic Warranty",
  price:"€ 626",
  button: "Add to Trolley",
  buynow:"Buy Now"
},
{
  image: "https://m.media-amazon.com/images/I/71NEXxpUZaL._SX679_.jpg",
  CardTitle: "Nothing Phone 1  256GB , (Black)",
  discription: "12 GB RAM | 256 GB ROM, 16.64 cm (6.55 inch) Full HD+ 6.55in 120Hz OLED Display, 50MP + 50MP | 16MP Front Camera, Qualcomm Snapdragon 778G+, 4500 mAh  Lithium Ion Battery 1 Year Manufacturer Warranty",
  price:"€ 549.99",
  button: "Add to Trolley",
  buynow:"Buy Now"
}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  session=req.session
  if(session.user){
  res.redirect('/home')

}else{
  res.render('index',{title:'Login page'});
}

});

router.post('/login', function (req, res) {
  
  // console.log(req.body)
  if (req.body.email == credential.email && req.body.password == credential.password) {
    session=req.session;
    req.session.user = req.body.email;
    res.redirect('/home')
  // } else if (req.body.email == "" && req.body.password == "") {
  //   res.render('index', { nullcheck: ' Username and password required !!!' })
  }else {
    res.render('index', { login: 'Invalid Credentials' })
   
  }
})
// home page
router.get('/home', (req, res) => {
  session=req.session;
  if (session.user) {
    res.render('home', { user: req.session.user, products })
  } else {
    res.redirect('/')
  }
})
// home page post
router.post('/home', (req, res) => {
  
  if (req.session.user) {
    session=req.session;
    session.user=req.body.email;
    res.render('home', { user: req.session.user, products })
  } else {
    res.redirect('/')
  }

})

//router for logout
router.get('/logout', (req, res) => {
  req.session.destroy() ;
     res.redirect('/')
})

module.exports = router;
