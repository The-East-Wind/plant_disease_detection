var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var fs = require('fs');
var flag;
var predicted;
var op_file;
function send_response(filename,res)
{
  fs.readFile(filename, function(err, data) 
        {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
}
function call_python(filename)
{
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python3',["e:\\output_name.py",filename]);
  pythonProcess.stdout.on('data', (data) => {
  predicted=data.toString();
  console.log(predicted);
  return predicted;
});
}

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) 
    {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/haria/' + files.filetoupload.name;
        predicted=call_python(newpath);
        fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        //res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write("Upload Success!!!Predicting....");
        //res.end();
        //console.log(predicted);
        if(predicted=="Healthy")
        {
          op_file = "healthy.html";
          console.log(0);
        }
        else if(predicted=="Disease")
        {
          op_file = "disease.html";
          console.log(1);
        }
        setTimeout(send_response,10000,op_file,res);
    });
 });
  } 
else {
            fs.readFile('Homepage.html', function(err, data) 
            {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
            
    /*res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
    */
  }
}).listen(8080); 