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
  const user = selectUserByKey(listUsers, userId)
  const address = selectUserByKey(user?.endereco, addressId)

  return address
}
