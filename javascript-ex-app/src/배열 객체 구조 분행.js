// 배열 구조 분해 할당
const animals = ["강아지","고양이","오리"];

// 전체 출력 
const [dog, cat, duck] = animals;
console.log(dog, cat, duck);

// 강아지, 고양이 출력
const [dog1, , duck1] = animals;
console.log(dog1, duck1);

// 배열에 없는걸 받는경우 
// cow에출력값 undefined
const [dog2, cat2, duck2, cow] = animals;
console.log(dog2, cat2, duck2, cow);

// 배열에 없는걸 받는경우 cow 초기화 방법
// cow에출력값
// 소 출력 
const [dog3, cat3, duck3, cow1 = "소"]  = animals;
console.log(dog3, cat3, duck3, cow1);

// 배열에 없는걸 받는경우 초기화 오류가 발생하는 경우
// 오리 소 출력
const [dog4, cat4, duck4 = "꽥꽥", cow2 = "소"]  = animals;
console.log(duck4, cow2);

// 배열 구조 분해 할당
const animals1 = ["강아지","고양이","오리", "소"];

// 배열-> 배열속에  배열 사용
// 강아지 고양이 ['오리','소']
const [dog5, cat5, ...rest] = animals1;
console.log(dog5, cat5, rest);

// TIP 1 - 변수 값 교환하기
let a = 1;
let b = 2;

let temp = a; // temp = 1
a = b; // a = 2
b = temp; // b = 1
console.log(a,b);

//--->위에 보다 더 쉽게 변경 가능하다
[a, b] = [b, a];
console.log(a,b);

// TIP 2 - 함수에서 반환된 배열을 구조 분해 할당하기
function getAnimals(){
    return ["강아지", "고양이", "오리"];
}

const animals2 = getAnimals();

const dog6 = animals2[0];
const cat6 = animals2[1];

console.log(dog6, cat6);

//--->위에 보다 더 쉽게 변경 가능하다
const [dog7, cat7] = getAnimals();
console.log(dog7, cat7);

// 객체 구조 분행 할당
const taimals = {
    dog: "강아지",
    cat: "고양이",
    duck: "오리",
};

const tdog = taimals.dog;
const tcat = taimals.cat;
const tduck = taimals.duck;

const { tdog1, tcat1, tduck1} = taimals;
console.log(tdog1, tcat1, tduck1);

// 출력
// 멍멍이 고양이
// 강아지
const ttdog = "멍멍이";
const { tcat2, ttdog: dogNane } = taimals;
console.log(tdog, tcat);
console.log(dogNane);

// 구조체 없는 선언 할경우 
// 출력
// 강아지 고양이
// undefinde
const { tdog3, tcat3, cow3 } = taimals;
console.log(tdog3, tcat3);
console.log(cow3);

// 구조체 없는 선언 할 경우   
// 출력
// 강아지 고양이
// 소
const { tdog4, tcat4 = "야옹야옹", cow4 = "소" } = taimals;
console.log(tdog4, tcat4);
console.log(cow4);

//TIP 2 -  함수의 매개변술를 전달된 객체를 구조 부해 할당

const user = { name: "철수", age: 25};

// function prinUser(user) {
//     console.log(`${user.name}님은 ${user.age}살 이예요`);
// }

function prinUser({ name, age } ) {
    console.log(`${name}님은 ${age}살 이예요`);
}

prinUser(user);