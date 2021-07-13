exports.getDataFromObject = (mainObj, arrayOfPreferedObj) => {
    let returnObj = {};

    arrayOfPreferedObj.forEach(ar => {
        mainObj[ar] && (returnObj[ar] = mainObj[ar])
    });

    return returnObj
}