
type addressProps = {
  address: string,
  num: string,
  complement: string,
  district: string,
  city: string,
  uf: string,
  cep: string
}


// Filtros e validações
export function cpfAlreadyExists(listUsers, cpf) {
  const cpfAlreadyExists = listUsers.some(user => user.cpf === cpf)

  return cpfAlreadyExists
}

export function selectUserByKey(listUsers, userKey) {
  const user = listUsers.find(data => data.key === userKey)

  return user
}


export function handleAddressObj(enderecoObj) {

  let endereco = enderecoObj.map((data) => {
    const validNull = Object.values(data).findIndex(data => data === '')

    if (validNull === 0) {
      return []
    }

    if (validNull === 1) {
      alert('Preencha todos os campo de endereço.')
      return
    }

    alert('Endereço cadastrado com sucesso!')

    return {
      address: data.address,
      num: data.num,
      complement: data.complement,
      district: data.district,
      city: data.city,
      uf: data.uf,
      cep: data.cep
    }
  })


  return endereco
}