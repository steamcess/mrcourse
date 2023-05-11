var format = require('date-fns/format')

function formatDate(value){
    let newDate = format(value, 'ddd MMM yyyy')
    return newDate;
}

module.exports = {formatDate};