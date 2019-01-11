import { clear, format } from 'cpf'

export const mask = cpf => {
  return format(cpf)
}

export const unmask = cpf => {
  return clear(cpf)
}
