// function display()
// {
//     console.log("A");
// }

// function dd()
// {
//     console.log("B")
// }

// module.exports = {display,dd};


// exports.display = ()=>{
//     console.log("A")
// }

// exports.dd = ()=>{
//     console.log("B")
// }

// exports.a = 60



export  default function display()
{
    console.log("hello");
    console.log("jhshshjshhjs");
    let obj = {a:"hee",b:"haan"}
    for(let a in obj){
        console.log(`${a}:${obj[a]}`)
    }
}