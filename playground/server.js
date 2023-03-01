const http = require('http');

http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head></head><body>');
        res.write('<h1>Sample Node Server</h1><br/>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</body></html>');
        res.end();
    }else if(url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head></head><body>');
        res.write('<ul><li>User 1</li></ul>');
        res.write('</body></html>');
        res.end();
    }else if(url==='/create-user' && req.method=='POST'){
        const body =[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsed = Buffer.concat(body).toString();
            console.log(parsed.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
    }

}).listen(3000);
