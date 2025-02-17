console.log(this);
console.log(this === module.exports);
console.log(this === exports);

//화살표 함수의 결과 true, false

const whatIsThis = () =>{
    console.log('function', this === exports, this === global);
} 

whatIsThis();