
export function clearInput(inputOne, inputTwo) {
  inputOne('')
  inputTwo('')
}

export function cancelUserEdit(inputOne, inputTwo, statusOne, statusTwo) {
  statusOne(false)
  statusTwo(false)

  inputOne('')
  inputTwo('')
}



export function cpfAlreadyExists(listUsers, cpf) {
  const cpfAlreadyExists = listUsers.some(user => user.cpf === cpf)

  return cpfAlreadyExists
}

export function selectUserByKey(listUsers, userKey) {
  const user = listUsers.find(data => data.key === userKey)

  return user
}