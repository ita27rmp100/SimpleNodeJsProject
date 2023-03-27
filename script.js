let http = require('http')
let fsModule = require('fs')
let qs = require('querystring')
let requesIP = require('request-ip')
let port = process.env.PORT || 2700
let htmlCode = fsModule.readFileSync('index.html')

let myHTTP = http.createServer(
    function(req,res){
        let clientIP = requesIP.getClientIp(req)
        let date = new Date()
        res.end(htmlCode)
        if (req.method=='POST'){
            let body = ''
            req.on('data',function(data){
                body = body + data
            })
            req.on('end',function(){
                let post = qs.parse(body)
                // console.log(`Hello ${post.name} , your IP Adress is ${clientIP} .`)
                fsModule.appendFile('dataUsers.txt',`New use from ${post.name} at ${date} . His/her IP Adress is : '${clientIP}' \n`, function(err) {
                    if (err) throw err;
                    console.log('Text appended to file\n');
                  });
            })
        }
    }
)
myHTTP.listen(port)