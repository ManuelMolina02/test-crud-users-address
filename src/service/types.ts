export type user = {
  key: string,
  name: string,
  cpf: string,
  endereco?: addressProps[] | any
}

export type addressProps = {
  key: string,
  address: string,
  num: string,
  complement: string,
  district: string,
  city: string,
  uf: string,
  cep: string
}
