var https = require("https")
var fs = require("fs")

var options = {
    hostname: 'opensky-network.org',
    port: 443,
    path: '/api/states/all',
    method: 'GET'
}

/*
    hostname: 'opensky-network.org',
    port: 443,
    path: '/api/states/all',
    method: 'GET'
*/

async function f1(country){
    console.log('Start Request and wait for termination')
    var x = await sendReq(options, country)
    console.log('Done Waiting. Response log:\n')
    s = JSON.stringify(x)
    console.log(s)
}

f1('United States')

module.exports = {
    create(str){
        return new scoreBoard(str)
    },
    tallyPrint(names, scores){
        t = new scoreBoard(names)
        t.tallyScore(scores)
        return t.printBoard()
    }
}

function sendReq(opts, origin){
    var i = 0;
    var outStr = ""
    var s = ""
    return new Promise(resolve => {
        var req = https.request(opts, function(response){
        
        outStr += '{init:\'Response started\''

        if(response.statusCode == 404){
            outStr = giveErr('Server not found', 404)
            resolve((outStr))  
        }

        outStr += ',StatusCode:\'' + response.statusCode + '\''

        response.setEncoding("UTF-8")

        response.once("data", function(chunk){
         //   console.log(chunk)
        })

        response.on("data", function(chunk){
            s += chunk
        })

        response.on("end", function(){
            outStr += ',fin:\'Response ended\''
            s = JSON.parse(s)
            for (var e in s['states']){
                if(s['states'][e][2] == origin){
                    //console.log(s['states'][e])
                    i++
                }
            }
            outStr += (',country:\'' + origin + '\'')
            outStr += (',numFlights:\'' + i + '\'}');
            resolve((outStr))  
        })

    })
    req.on('error', function(error){
        outStr = giveErr(error['errno'])
        resolve((outStr))   
    })

    req.end();
    })
    
}

function giveErr(str, errCode=-1){
    var r = '{errRes:\''+ str + '\'';
    if(errCode != -1)
        r += ',Error Code:\'' + errCode + '\''
    r += '}'
    return r
}

function wait5sec(x){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 5000)
    })
}