function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

module.exports = {
    addFn: add,
    subFn: sub,
}

exports.mul = (a,b) => a*b;