import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class EgyptianIdValidator implements ValidatorConstraintInterface {
  validate(
    nationalId: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (!/^\d{14}$/.test(nationalId)) {
      return false;
    }

    // Extract birthdate parts
    const century =
      nationalId[0] === '2' ? '19' : nationalId[0] === '3' ? '20' : null;
    if (!century) return false;

    const year = parseInt(century + nationalId.substring(1, 3), 10);
    const month = parseInt(nationalId.substring(3, 5), 10);
    const day = parseInt(nationalId.substring(5, 7), 10);

    // Validate date
    const birthDate = new Date(year, month - 1, day);
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() + 1 !== month ||
      birthDate.getDate() !== day
    ) {
      return false;
    }

    // Validate governorate code (1-31 for valid governorates)
    const governorateCode = parseInt(nationalId.substring(7, 9), 10);
    if (governorateCode < 1 || governorateCode > 31) {
      return false;
    }

    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Invalid Egyptian National Id';
  }
}

export function IsEgyptianId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EgyptianIdValidator,
    });
  };
}
