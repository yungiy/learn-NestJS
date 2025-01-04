# Class Validator

## Class Validator 특성
1. TS Decorator를 사용해서 클래스를 검증한다. (Validate)
2. 동기, 비동기 방식 모두 지원한다.
3. Class Validator 자체적으로 제공해주는 Validator들을 사용할 수 있다.
4. 커스텀 Validator를 쉽게 만들 수 있다.
5. 커스텀 에러 메세지를 반환할 수 있다.

## Class Validator 적용 예제
```
class User {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```
class Validator에서 제공해주는 어떤 Validator든 검증하고 싶은 프로퍼티에 Decorator로 제공해주면 된다.

```
const user = new User();
user.name = '';
user.email = 'invalid-email';

validate(user).then(errors => { // 여기서 에러 반환 })
```
validate()는 함수로 객체를 검증했을 때 Class Validator에 부합하지 않은 값이 입력됐다면 해당되는 에러가 반환된다. 

## 기본 제공 Class Validator
1. 공통 Validator
  - @Isdefined
  - @IsOptional
  - @Equals
  - @NotEquals

2. 타입 Validator
3. 숫자 Validator
4. 문자 Validator