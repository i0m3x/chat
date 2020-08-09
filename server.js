// Should every message have its own file? NO
// Should every message be appended to one file? YES
// What metadata should we store along with the message (date/time, etc.)? USERNAME
// What format should we store data (one line per message, csv, JSON, etc.)? json file

const http = require('http') //package
const port = 8001
const fs = require('fs')    //package

const server = http.createServer((req, resp) => {
    const url = new URL('https://' + port + req.url)
    const path = url['pathname']
   
    if (path == '/messages' && req.method == 'GET') {
            console.log(req.body)
            fs.readFile("messages.json",(err, data) => {

                console.log(data.toString())
                // if (err)
                resp.writeHead(200, { 'Content-Type': 'application/json' })
                
                resp.write(data.toString())

                resp.end()

            })
       
    } else if (path == '/messages' && req.method == 'POST'){

            let body =''

            req.setEncoding('utf8');

            req.on('data', (chunk) => { 
                body += chunk; 

            req.on('end', () => { 
                try {   
                    console.log(body)
                    const data = JSON.parse(body); //now prepared to write to file
                    console.log(data)
                    console.log(data.username)
                    console.log(data.text)
                    console.log(typeof data)
                    resp.write(typeof data); 
                    resp.end();
                } catch (err) {
                    console.log('badJSON')
                    resp.statusCode = 400;

                    return resp.end(`error: ${err.message}`);
                }
            })
        }
        )
    } 
})
server.listen(port)
