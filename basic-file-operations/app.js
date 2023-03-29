const fs = require("fs");

try {

    //Reading a file
    fs.readFile("abc1.txt", "utf-8",(err, data) => {
        if (err) throw err;
        console.log(data);
        console.log("-----------read from file complete----------");
    });

    //Write to the file
    //it will create new file if not exist
    const str = "new overwritten data to file.";
    fs.writeFile("abc2.txt", str, (err, data) => {
        if (err) throw err;
        console.log("-----------written to the file.----------");
    });

    //Append to file
    const apndStr = "\nappend this to file."
    fs.appendFile("abc2.txt", apndStr, (err, data) => {
        if (err) throw err;
        console.log("-----------appended to the file.----------");
    });

    //Reading data from file using stream
    const read = fs.ReadStream("readstr.txt","utf-8");
    read.on("data", (chunk) => {
        console.log(chunk);
    });

    //Writing data to file using stream
    const data = "some sample streamed data to write.";

    const write = fs.createWriteStream("writestr.txt");
    write.write(data);
    write.end();

    write.on("finish", () => {
        console.log("-----------write using stream completed-----------");
    });

    //piping the streams
    const readStream = fs.createReadStream("f1.txt","utf-8");
    const writeStream = fs.createWriteStream("f2.txt");
    readStream.pipe(writeStream);
}
catch (err) {
    console.log(err);
}