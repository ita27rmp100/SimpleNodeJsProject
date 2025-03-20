let http = require('http')
let fsModule = require('fs')
let qs = require('querystring')
let requesIP = require('request-ip')
let port = process.env.PORT || 2700

let myHTTP = http.createServer(
    function(req,res){
        let ipaddr = requesIP.getClientIp(req)
        let date = new Date()
        date = date.toGMTString()
        const len = date.length + ipaddr.length
        let _ = ""
        for(i=0;i<=len+2;i++){
            _ += "-"
        }

        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(` <strong>Your IP Address is : </strong> ${ipaddr}`)
            fsModule.appendFile('dataUsers.txt',`|${date}|${ipaddr}| \n${_}\n`, function(err) {
                if (err) throw err;
                console.log('Text appended to file\n');
            });
        }
)
myHTTP.listen(port)