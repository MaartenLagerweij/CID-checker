const postBtn = document.getElementById('post');
const input = document.getElementById('input');
const output = document.getElementById('output');

const baseURL = 'http://localhost:8383/info/';

postBtn.addEventListener('click', postInfo);

async function postInfo(e){
    e.preventDefault();
    if(input.value == '') return;
    let urlInput = input.value.split(/\n/);
    if(urlInput.length > 100) {
        output.innerHTML = '';
        return document.getElementById('max-100').classList.remove('display-none-button');
    } else {
        document.getElementById('max-100').classList.add('display-none-button');
    }
    console.log(urlInput);
    if(urlInput[urlInput.length-1] === '') urlInput.pop();
    output.innerHTML = `Creating CID url's for ${urlInput.length} pages... Loading...`;
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            urls: urlInput
        })
    })
    
    polling(urlInput);
}

function polling(urls){
    const lengthInputUrls = urls.length;

    const intervalId = setInterval(async () => {
        
        const response = await fetch(baseURL).then(data => data.json());
        
        console.log('polling', 'lengthInputUrls', lengthInputUrls, 'response.length', response.length)


        if(lengthInputUrls === response.length) {
            let rows = '';
            response.forEach(urlItem => {
                const row = `<tr><td>${urlItem.url}</td><td>${urlItem.salesForceSyntaxURL}</td></tr>`;
                rows+= row;
            })
            output.innerHTML = '';
            output.insertAdjacentHTML('beforeend', `<table>${rows}</table>`);
            clearInterval(intervalId)
        };
    }, 1000)
}