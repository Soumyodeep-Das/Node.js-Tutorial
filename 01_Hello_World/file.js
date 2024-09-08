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

