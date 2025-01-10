# TypeORM
## TypeORM 특성
1. OOP를 사용해서 데이터베이스 테이블을 클래스로 관리할 수 있게 해주는 ORM 이다.
2. 다양한 데이터베이스를 지원한다. Mysql, Postgresql, SQLite Oracle, MongoDB 
3. Active Record와 Data Mapper 패턴을 모두 지원한다. 
4. 자체적으로 마이그레이션 기능을 지원하며 점진적인 데이터베이스 구조 변경과 버져닝을 모두 지원한다. 
5. Eager & Lazy 로딩을 모두 지원하기 때문에 어떤 방식으로 데이터를 불러올지 완전한 컨트롤이 가능하다. 

## DataSource 
사용할 데이터베이스 지정 및 정보 제공 역할

```
const PostgresDataSource = new DtaSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [
    // TS 엔터티 겍체 입력
  ] 
})
```

### Entity
- @Entitiy Annotation을 사용하면 클래스를 테이블로 관리할 수 있다. 
- @Column Annotation을 사용하면 테이블의 칼럼을 생성할 수 있다. 
- @PrimaryGeneratedColumn은 자동 생성되는 칼릉르 생성할 수 있다.

```
@
```