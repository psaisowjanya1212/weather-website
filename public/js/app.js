const weatherForm = document.querySelector('form')
const search=document.querySelector('input')

const successMsg=document.querySelector('#successMsg')
const errorMsg=document.querySelector('#errorMsg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    successMsg.textContent='Loading...'
    errorMsg.textContent=''
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        errorMsg.textContent=data.error
        else{
            successMsg.textContent=data.location+' '+data.forecast
            //console.log(data.forecast)
        }
    })
})

})