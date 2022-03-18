import express  from 'express';
import { fileURLToPath } from 'url';
import forecast  from "./utills/forecast.js";
import geocode from "./utills/geocode.js";

import path  from "path";   
import  hbs from 'hbs'

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename =fileURLToPath(import.meta.url)

const public_dir = path.join(__dirname, "../public");
const views_dir = path.join(public_dir,'..','templates','views')
const partials_dir = path.join(public_dir,'..','templates','partials')

app.set('views',views_dir)
app.set("view engine", "hbs");
app.use(express.static(public_dir));
hbs.registerPartials(partials_dir)

app.get('', (req, res) => {
  res.render('index',{
    'title':'Weather',
    'name':'Muhammad Usama'
  });
});

app.get('/help', (req, res) => {
  res.render('help',{
    'title':'Help',
    'name':'Muhammad Usama'
  })
});

app.get('/weather',(req,res)=>{

  if (!req.query.address){
    res.send({
      'error':'Please provide address '
    })
  }
  
  else {
    geocode(req.query.address, (error, {lat,lng,location}={}) => {
      if (error) {
        return res.send({error})
      }
      forecast(lat, lng, (error, forecast_data) => {
        if (error) {
          return res.send({error})
        }
        res.send({
          'location': location,
          'weather' : forecast_data,
          'address':req.query.address
        })
      });
    });
    
  }

})

app.get("/about", (req, res) => {
  res.render('about',{
    'title':'About',
    'name':'Muhammad Usama'
  })
});

app.get("/help/*", (req, res) => {
  res.render('404',{
    'title':'Help', 
    'name':'Muhammad Usama',
    'error':'Article Not Found'
  })
});

app.get("*", (req, res) => {
  res.render('404',{
    'title':'404',
    'name':'Muhammad Usama',
    'error':'404 Page Not Found'
  })
});
app.listen("3000", () => {
  console.log("app started");
});
