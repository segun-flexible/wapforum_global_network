const numberWithDelimeter = (number) => {
    let Num = parseInt(number);
    return isNaN(Num) ? 0 : Num.toLocaleString();
}

module.exports = numberWithDelimeter