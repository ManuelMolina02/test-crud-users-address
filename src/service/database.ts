import { firebaseApp } from "./firebase";
import { getDatabase, ref, set, remove, update } from "firebase/database";
import { v4 as uuid } from 'uuid'

//iniciando firebase e banco de dados
firebaseApp()
export const db = getDatabase();

//definindo interface de usuário
export interface UserProps {
  key: string,
  name: string,
  cpf: string
  endereco?: addressProps,
  addressKey: string
}

type addressProps = {
  address: string,
  num: string,
  complement: string,
  district: string,
  city: string,
  uf: string,
  cep: string
}


// -> Queries banco de dados

//Criar um novo usuário
export function setUser({ key, name, cpf, endereco, addressKey }: UserProps) {
  if (addressKey === undefined) {
    addressKey = uuid()
  }


  set(ref(db, `users/${key}`), {
    name,
    cpf,
    endereco: { [addressKey]: endereco }
  })


}

//Atualizando um usuário
export function setUserUpdate({ key, name, cpf, endereco, addressKey }) {

  update(ref(db, `users/${key}`), {
    name,
    cpf,
    endereco: { [addressKey]: endereco }
  })

}

//Deletar usuário
export function deleteUser(key: string) {
  remove(ref(db, `users/${key}`))
}


interface props {
  key: string,
  addressKey: string,
  endereco: addressProps
}

//Criar endereço
export function setNewAddress({ key, endereco, addressKey }: props) {
  update(ref(db, `users/${key}/endereco`), {
    [addressKey]: {
      address: endereco.address,
      num: endereco.num,
      complement: endereco.complement,
      district: endereco.district,
      city: endereco.city,
      uf: endereco.uf,
      cep: endereco.cep
    }
  })
}

//Editar um endereço
export function updateAddress({ key, endereco, addressKey }: props) {
  update(ref(db, `users/${key}/endereco`), {
    [addressKey]: {
      address: endereco.address,
      num: endereco.num,
      complement: endereco.complement,
      district: endereco.district,
      city: endereco.city,
      uf: endereco.uf,
      cep: endereco.cep
    }
  })
}


//Deletar endereço
export function deleteAddress(key: string, keyAddress: string) {
  remove(ref(db, `users/${key}/endereco/${keyAddress}`))
}

