const fs = require('fs')

// create a file
// Synchoronous call
// fs.writeFileSync('./test.txt', "Hey there")

//Asynchronous
// fs.writeFile('./test2.txt', 'Hello from test 2', (err) => {})


// read file
// const contacts = fs.readFileSync("./contact.txt", 'utf-8')
// console.log(contacts)

// fs.readFile('./contact.txt', 'utf-8', (err, result) => {
//     if (err){
//         console.log(err)
//     } else (
//         console.log(result)
//     )
// })

// append
// fs.appendFileSync('./text.txt', "Hey there\n")

// delete
// fs.unlinkSync('./text.txt')

// stats
// console.log(fs.statSync('./math.js'))

// create directory
// fs.mkdirSync('./temp')

// delete directory
// fs.rmdirSync('./temp')



// Blocking and Non-Blocking Concept

// Sync | Blocking
// fs.writeFileSync("./test/txt", "Hello World");

// Default thread pool size depends on the CPU cores and threads

// Async | Non-Blocking
// fs.writeFile("./text.txt", "Hello World Async", (err) => {});

