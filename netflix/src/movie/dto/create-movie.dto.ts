import {
  Contains,
  IsAlphanumeric,
  IsCreditCard,
  IsEmpty,
  IsIn,
  IsLatLong,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  MinLength,
  NotContains,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';


export class CreateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;

  // 기본 validator
  // null || undefined
  // @IsDefined()
  // @IsOptional()
  // @Equals('yungiy')
  // @NotEquals('yungiy')
  // null || undefined || ''
  // @IsEmpty()
  // @IsNotEmpty()

  // 타입 validator
  // Array
  // @IsIn(['action', 'fantasy'])
  // @IsNotIn(['action', 'fantasy'])
  // Boolean
  // @IsBoolean
  // String
  // @IsString()
  // Int
  // @ISInt
  // IsArray() array의 유무 판단
  //@IsEnum()

  // 숫자 validator
  // @IsDivisible(5) number에 나눌 수 있는 수를 넣음
  // @IsNegative()
  // @Max()
  // @Min()

  // 문자 validator
  //@Contains('yungiy')
  // @NotContains('yungiy')

  // @IsAlphanumeric() 문자와 숫자로 이루어져 있는가?
  // @IsCreditCard() 실제로 존재할 수 있는 카드의 숫자가 들어왔는가?
  // @IsHexColor() 16진수 판별
  // @MaxLength(16)
  // @MinLength(4)
  // @IsUUID()
  // @IsLatLong() // 위도 경도
}
