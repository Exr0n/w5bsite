// place files you want to import through the `$lib` alias in this folder.

export const zip = (a, b) => a.map((x, i) => [x, b[i]])
export const formatDate = d => d.toLocaleTimeString('en-us', {
    day: 'numeric', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'
}).replace(', ', " '")