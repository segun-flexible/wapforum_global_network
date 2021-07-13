const filterEmptyObj = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(v => v[1] !== undefined));
}


module.exports = filterEmptyObj