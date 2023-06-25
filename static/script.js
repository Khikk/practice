const result = document.querySelector('#result')
const search = document.querySelector('#search')
const input = document.querySelector('#searchInput')
const render = document.querySelector('#download')

function update() {
    render.innerHTML = '<h2>Скачанные файлы</h2>'
    Object.entries(localStorage).forEach(i => {
        render.innerHTML += `<a href="#" class="content">${i[0]}</a><br>`
    })

    const content = document.querySelectorAll('.content')

    content.forEach(i => {
        i.addEventListener('click', (e) => {
            e.preventDefault()
            const windowO = window.open('', 'name','width=600,height=400')
            windowO.document.body.innerHTML = localStorage[e.target.innerText]
        })
    })
}

update()

search.addEventListener('submit', (e) => {
    e.preventDefault()
    const word = input.value
    axios.post('http://127.0.0.1:3000/', {string: word})
    .then(function (response) {
        console.log(response);
        if (typeof(response.data) == 'string') {
            result.innerText = response.data
        } else {
            result.innerText = ''
            response.data.forEach(i => {
                result.innerHTML += `<a href="#" class="link">${i}</a><br>`
            })
            const links = document.querySelectorAll('.link')
            links.forEach(i => {
                i.addEventListener('click', async ev => {
                    nameFile = ev.target.innerText
                    let content = (await axios.get(`http://127.0.0.1:3000/api/files/${nameFile}`)).data
                    content = content.replaceAll(/(\r\n|\n|\r|\t)/gm, "")
                    localStorage.setItem(nameFile, content)
                    update()
                })
            })
        }
    })
    .catch(function (error) {
        console.log(error);
    });
})
