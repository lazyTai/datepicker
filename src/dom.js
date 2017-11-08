function query(str) {
    var el = document.querySelector(str) || document.querySelector('body');
    return el
}

export {
    query
}