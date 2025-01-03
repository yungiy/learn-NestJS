# HTTO & REST API
## HTTP 란?

- 클라이언트와 서버가 통신하는 방법 중 하나
- 클라이언트가 요청을 보내면 서버가 응답을 반환
- 요청과 응답의 구조화된 데이터를 보낼 때 일반적으로 JSON 구조 사용

## JSON

- js 객체 또는 다른 언어의 map과 구조가 매우 비슷
- 요처와 응답의 body에 사용되는 구조
- 보낼때 String으로 변환하고 다시 JSON으로 변환
- key, value 짝으로 이뤄져 있음
- key는 string만 허용됨
- value는 숫자 string 중첩된 JSON 그리고 List 등이 허용

## HTTP의 구성 요소

- URL : 요청을 보내는 주소
- Method : 요청의 종류/타입 (GE/POST/PATCH/DELETE)
- Header : 요청의 메타 데이터
- Body: 요청에 관련된 데이터

### Method

- 같은 URL에 여러개의 메서드가 존재할 수 있다.
- GET 요청은 데이터를 조회할 때 사용 한다.
- POST 요청은 데이터를 생성할 때 사용한다.
- PUT 요청은 데이터를 업데이트 또는 생성할 때 사용한다.
- PATCH 요청은 데이터를 업데이트할 때 사용한다.
- DELETE 요청은 데이터를 삭제할 때 사용한다.
- 이 외에도 많은 메서드가 존재하지만 잘 사용하지 않는다.
- 메서드는 정해진 목적대로 사용해야 하지만 개발자가 마음대로 기능을 정의할 수 있기 때문에 **강제되는 부분은 아니다.**

### Header란?
- Header는 메타 데이터를 정의한다.
- 메타 데이터는 데이터에 대한 데이터, 즉 요청에 대한 정보를 정의한다.
- 흔한 예제로 쿠키, 인증 토큰, 요청의 바이트 길이, 요청/응답을 보낸 호스트, 요청할 때 사용된 클라이언트 타입과 버전 등을 정의한다.
- key/value 형태로 정의되고 key, value 모두 string 형태다.
- 라이브러리/프레임워크/환경에 의해 자동 생성되는 값들이 많고 직접 값을 변경하는 경우는 Body보다 상대적으로 적다.

```
Host: blog.codefactory.ai
Cookie: xxx;yyy;zzz
User-Agent: Mozilla/5.0 AppleWebKit/537.36
Accept: application/json
```

### Body란?
- Body는 요청에 대한 로직 수행에 직접적으로 필요한 정보를 정의한다.
- 만약에 새로운 블로그 글을 생성하는 POST 요청을 한다면 이 글을 생성할 때 필요한 제목, 내용 등의 모든 데이터를 Body에 입력하게 된다.
- 일반적으로 JSON 구조를 사용한다.
- Header와 가장 큰 자이점은 Header는 요청 자체에 대한 정보를 담고 있고 Body는 요청을 수행하는데 필요한 데이터를 담고 있다는 것이다.
```
{
  ‘name’: ‘yungiy’,
  ‘age’: 25,
  ‘occupation’: ‘student’
}
```

## HTTP 응답의 구성요소
- Status Code : 응답의 종류
- Header : 응답의 메타 데이터
- Body : 응답에 관련된 데이터

### Status Code 
- Status Code는 응답의 상태를 분류해 준다.
- 100~599 까지의 숫자를 사용한다. 
- 100-199 Infomation Response (정보 응답)
- 200~299 Successful Response (성공 응답)
- 300~399 Redirection Message (리다이렉션 메세지)
- 400~499 Client Error Response (클라이언트 에러 응답)
- 500~599 Server Error Response (서버 에러 응답)

### 주요 Status Code 정리
- 200 (OK) - 문제없이 요청이 잘 실행됨
- 201 (Created) - 문제없이 데이터 생성이 잘 됨 (POST 요청에서 많이 사용)
- 301 (Moved Permanently) - 리소스가 영구적으로 이동됨
- 400 (Bad Request) - 요청이 잘못됨 (필수 값 부족 등)
- 401 (Unauthorized) - 인증 토큰/키가 잘못됨
- 403 (Forbidden) - 접근 불가능한 리소스로 401과 달리 인증은 된 상태
- 404 (Not Found) - 존재하지 않는 리소스
- 405 (Method Not Allowed) - 허가 되지않은 요청 Method
- 500 (Internal Server Error) - 알 수 없는 서버 에러

### REST API 키포인트
- 균일한 인터페이스 -> 표준 형식으로 정보를 제공한다.
- 무상태(Stateless) -> 모든 요청은 각각 독립적이다.
- 계층화 시스템 -> 서버는 어러 개층으로 구성될 수 있다.
- 캐시 가능성 -> 공통되는 정보를 캐싱할 수 있다.
- 온디맨드 코드 -> 서버로부터 스크립트를 받아 클라이언트에서 실행할 수 있다.

## REST API
- GET은 데이터를 조회하는데 사용한다.
- POST는 데이터를 생성하는데 사용한다.
- PUT은 데이터를 업데이트 하거나 생성 하는데 사용한다.
- PATCH는 데이터를 부분적으로 업데이트 하는데 사용한다.
- DELETE는 데이터를 삭제하는데 사용한다.
- URL 경로는 요청하는 리소스의 정확한 정보를 기재한다.
- 하나의 요청이 성공하기 전에 특정 선행 요청이 없어야 한다. 
- 결국 HTTP를 설계된 의도대로 규격화해서 API를 만드는게 REST API다.