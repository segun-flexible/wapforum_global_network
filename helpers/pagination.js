//GET NEXT OFFSET
exports.getNextOffset = (currentPage,limit) => {
    if (currentPage) {
        let page = parseInt(currentPage);
        
        if (page <= 1) {
            return 0
        } else {
            return (page - 1) * (parseInt(limit) || parseInt(process.env.LIMIT))
        }
    } else {
        return 0
    }
}



exports.paginateData = (limit, totalItems) => {
    let arr = [];

    for (i = 1; i <= Math.ceil(totalItems / parseInt(limit)); i++){
        arr.push(i)
    }
    return arr
}

