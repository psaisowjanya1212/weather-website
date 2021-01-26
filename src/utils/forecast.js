const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1748bd9ee5281f02332da7a4e257db0b&query='+ latitude +',' + longitude + '&units=f'
    request({url,json:true},(error,{body})=>{
        //internet issue
        if(error){
            callback('Unable to connect to weather location',undefined)
        }
        //Cooridnates error(latitude longitude)
        else if(body.error){
            callback('unable to find location',undefined/*no data*/)
        }
        else{
            callback(undefined,'latitude: '+latitude+' longitude '+longitude+' humidity '+body.current.humidity)//,{                
                //latitude,//or latitude:latitude
                //longitude,//or longitude:longitude
                //humidity:body.current.humidity
            
        }
    })
}

module.exports=forecast