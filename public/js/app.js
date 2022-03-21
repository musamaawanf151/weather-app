console.log('client side')



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const message1 = document.querySelector('#message1')

const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit',(e)=>{
    message1.textContent = 'Loaaading....'

    message2.textContent = ' '

    e.preventDefault()
    console.log(search.value)
    fetch('/weather?address=' +search.value).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent = data.error
            console.log(data.error);

        }
        else{

            message1.textContent = data.location
            message2.textContent = data.weather
            // console.log(data)    
        }
        
    })
    })
    console.log('hello')
})