const scriptURL = 'https://script.google.com/macros/s/AKfycbxwyPI9T-WULl9LkziF8IasK0dtPKT-NWURmei20B-VjZfbyiaJWKP_N88p2VcCZbEAQw/exec'
const form = document.forms['bitacora']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert('COMMENT SENT', response))
        .catch(error => alert('ERROR', error.message))
})