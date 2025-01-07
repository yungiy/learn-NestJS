# Class Transformer

## Class Transformer 특성
1. TS Decorator를 사용해서 클래스를 변환한다. 
2. 직렬화, 역직렬화 그리고 인스턴스로 변환을 담당한다.
3. 중첩된 객체에도 매우 쉽게 적용 가능하다. 
4. 커스텀 Transformer로 어떤 변환이든 가능하다. 
5. Class Validator를 제작한 개발자가 시작한 프로젝트다.

## Class Transformer 적용 예제
```
class User {
  @Exclude()
  name: string;

  @Transform(
    ({vlaue}) => value.toUpperCase()
  )
  email.string;
}
```
Class Transformer에서 제공해주는 어떤 Transformer든 검증하고 싶은 프로퍼티에 Decorator로 제공해주면 된다. 


## 중첩 클래스 변환
```
class Address {
  city : string;
  country: string;
}

class User {
  @Exclude()
  name: string;

  @Type(()=> Address)
  addresss: Address
}
```
중첩된 객체 타입을 Type 데코레이터에 제공해준다. 

```
const plainUser = {
  name: 'yun' , address : {
    city: 'seoul', country: 'korea'
  }
};

const user = plainToClass(User, plainUser);

// User {address: Address {city: 'seoul', country: 'korea'}} 
console.log(user)
```

plainToClass를 실행하면 중접된 객체되 Type 데코레이터에 입력된 클래스의 인스턴스로 변환된다. 


## Custom Transformer

```
class User {
  @Exclude()
  name: string;

  @Transform(
    ({value}) => vlaue.toLowerCase(),
  )
  email: string;
}
```
Transform 데코레이터는 적용된 프로퍼티의 값을 전달인자로 제공해주며 ㅎ변환하고 싶은 형태로 값을 반환해주면 된다. 

```
const plainUser = {
  name: 'yuniy' ,
  email: 'YUN@EXAMPLE.COM',
};

const User = plainToClass(
  User, plainUser
);

// YUN@EXAMPLE.COM
console.log(user, email);

```
plainToClass를 실행하면 중접된 객체도 Type 데코레이터에 입력된 클래스의 인스턴스로 변환된다. 
