import {
  IsNotEmpty,
  IsOptional,
  registerDecorator,
  ValidateByOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// custom validator
@ValidatorConstraint()
class PasswordValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    // 비밀 번호 길이는 4-8
    return value.length > 4 && value.length < 8;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '비밀번호의 길이는 4~8자 여야합니다. 입력값 : ($value)';
  }
}

function IsPasswordValid(validationOptions?: ValidateByOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: PasswordValidator,
    });
  };
}

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  @IsPasswordValid()
  test: string;
}
