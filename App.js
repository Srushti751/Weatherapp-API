const express = require('express')
const app =express()
const request = require('request')
const PORT = 5400;

let w_url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=18e8bd93f2d43432751f1e7c0bf0cf59`

// app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'));

// app.set('views','./src/views');
app.set('view engine','ejs')

function getWeather(url){
    var options = {
        url:w_url,
        headers:{
            'User-Agent': 'request'
        }
    };

    return new Promise(function(resolve, reject){

        request.get(options, function(err,resp,body){
            if(err){
                reject(err);
            }
            else{
                resolve(body);
            }
        })
    })
}



app.get('/',(req,res)=>{
    var dataPromise = getWeather();

    dataPromise.then(JSON.parse)
                .then(function(result){
                    // res.send(result)
                    res.render('main',{result,title:'***Weather App***'})
                })
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`work on http://localhost:${PORT}`)
})