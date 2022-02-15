// Filtros e validações
export function cpfAlreadyExists(listUsers, cpf) {
  const cpfAlreadyExists = listUsers.some(user => user.cpf === cpf)

  return cpfAlreadyExists
}

export function selectUserByKey(listUsers, userKey) {
  const user = listUsers?.find(data => data.key === userKey)

  return user
}

export function selectAddress(listUsers, userId, addressId) {
  const userSelected = selectUserByKey(listUsers, userId)
  const addressSelected = selectUserByKey(userSelected?.endereco, addressId)


  return { addressSelected, userSelected }
}



//Mascaras de Input
export function maskInputCpf(event: React.FormEvent<HTMLInputElement>) {
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
  event.currentTarget.value = String(value)

  return event
}

export function maskInputCep(event: React.FormEvent<HTMLInputElement>) {
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  event.currentTarget.value = value

  return event
}
