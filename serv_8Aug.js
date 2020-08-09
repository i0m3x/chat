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
                // const jsonResponse = { //this is a JSON obj we are creating
                //     "messages": data.toString(),
            
                // }
                // console.log("jsonResponse")
                console.log(data.toString())
                // if (err)
                resp.writeHead(200, { 'Content-Type': 'application/json' })
                
                resp.write(data.toString())
                
                
                resp.end()
                //     console.log(err)
                //     cb(err, data)
                //     return(JSON.parse(data.toString()))
                    
            })
        // console.log(msg1)
       
    } else if (path == '/messages' && req.method == 'POST'){




        console.log('post')
        // console.log(resp.body) 
        // const text = url.searchParams.get('text')
        // console.log("Here is line 41" +text)
        fs.readFile('messages.json', (err, data) => {
            let body =''

            //set encoding so buffer objs can be received

            req.setEncoding('utf8');

            //emit 'data', on is the event listener
            //like on ('click')
            req.on('data', (chunk) => { //opens up connection with curl -d
                body += chunk; //chunk is inside data
            });

            req.on('end', () => { //equivalent of .then
                const data = JSON.parse(body);
                console.log(data)
                console.log(typeof data)
                res.write(typeof data); //writing response, writeHead is header
                res.end();
                //setting an event listener - built in terminology for this specific listener

                //not really ending it

                try {   //https://nodejs.org/api/stream.html
                    const data = JSON.parse(body);
                    console.log(data)
                    console.log(typeof data)
                    res.write(typeof data); //writing response, writeHead is header
                    res.end();
                } catch (err) {
                    res.statusCode = 400;
                    return res.end(`error: ${err.message}`);
                }
                
             
            })


            // if (err) {
            //     res.write(500)
            //     resp.end()
            // }
            
            // data = JSON.parse(data)
            // const message = {
            //     text: text,
            //     username: data.username
            // }
            // data.messages.push(message)

            
        }
        )
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end()
        

    } else{ //(path == '/massages') 
        resp.writeHead(404)
        resp.write('Nice try, hehe')
        resp.end()
    }


})

server.listen(port)

// have it sorted by user,
//then have those separated by message

//each msg will have a date and time

//one user tied to many messages - one -to-many

//as a person adds, it gets added to db