const add = (a,b,cb)=>{
    setTimeout(()=>{
        cb(a+b);
    },2000);
}
add(2,4,(data)=>console.log(data));