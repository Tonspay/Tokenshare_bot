const menu = require("./menu");

function pathRouter(data) {
    var ret = {
        command: "unknown",
        params: []
    }
    if(data)
    {
        var tmp_0 = data.split(" ");
        if (tmp_0.length > 0) {
            var tmp_1 = tmp_0[0].split("/");
            if (tmp_1.length > 1) {
                ret.command = tmp_1[1]
            }else
            {
                ret.params.push(data)
            }
            for (var i = 1; i < tmp_0.length; i++) {
                ret.params.push(tmp_0[i])
            }
        }else
        {
            ret.params.push(data)
        }
        return ret;
    }
    return false;
}


module.exports = {
    menu,
    pathRouter
}