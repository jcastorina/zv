function table (h,w){
    var row = [];
    var col = [];
    var k = 0;
    for(var i = 0; i < w; i ++){
        for(var j = 0; j < h; j++){
            row[j] = {'_':'_'};
            k += 1;

        }
       //col[i] = row.splice(0,h);
       col[i] = row.splice(0)
    }
    return col;
}

module.exports = { table }