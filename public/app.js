const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const input = document.getElementById('input');
const output = document.getElementById('output');

// const eventSource = new EventSource('http://localhost:8383/sse/');

// function updateMessage (message){
//     const list = document.getElementById('messages');
//     const item = document.createElement('p');
//     item.textContent = message;
//     list.appendChild(item);
// }

// eventSource.onmessage = function(event){
//     updateMessage(event.data);
// }

// eventScource.onerror = function(){
//     updateMessage('Server closed connection');
//     eventSource.close();
// }

const baseURL = 'http://localhost:8383/info/';

getBtn.addEventListener('click', getInfo);
postBtn.addEventListener('click', postInfo);

async function getInfo (e){
    e.preventDefault();
    const response = await fetch(baseURL).then(data => data.json());
    let rows = '';
        response.forEach(urlItem => {
            const row = `<tr><td>${urlItem.url}</td><td>${urlItem.salesForceSyntaxURL}</td></tr>`;
            rows+= row;
        })
        output.innerHTML = '';
    output.insertAdjacentHTML('beforeend', `<table>${rows}</table>`);
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
}