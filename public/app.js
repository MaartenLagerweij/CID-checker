const postBtn = document.getElementById('post');
const input = document.getElementById('input');
const output = document.getElementById('output');

const baseURL = 'http://localhost:8383/info/';

postBtn.addEventListener('click', postInfo);

function polling(){
    const lengthInputUrls = input.value.split(/\n/).length;

    const intervalId = setInterval(async () => {

        const response = await fetch(baseURL).then(data => data.json());

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

async function postInfo(e){
    e.preventDefault();
    if(input.value == '') return;
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            urls: input.value
        })
    })
    
    polling();
}