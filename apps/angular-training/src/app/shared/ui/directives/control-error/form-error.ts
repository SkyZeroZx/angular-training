import { InjectionToken } from '@angular/core';
import { ControlErrors } from './interface/control-error.interface';

export const defaultErrors: ControlErrors<unknown> = {
  required: () => `Este campo es requerido`,
  min: () => 'Este campo no cumple el valor minimo',
  max: () => 'Este campo no cumple el valor maximo',
  minlength: ({ requiredLength }: any) =>
    `Se requiere minimo ${requiredLength} caracteres`,
  maxlength: ({ requiredLength }: any) =>
    `El maximo de caracteres permitos es ${requiredLength}`,
  alreadyExist: () => 'Ya esta registrado previamente',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
