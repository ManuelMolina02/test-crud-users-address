import { firebaseApp } from "./firebase";
import { getDatabase, ref, set, remove, update } from "firebase/database";

//iniciando firebase e banco de dados
firebaseApp()
export const db = getDatabase();

//definindo interface de usuário
export interface UserProps {
  key: string,
  name: string,
  cpf: string
  endereco?: addressProps
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
export function setUser({ key, name, cpf, endereco }: UserProps) {
  // validar se dados no form são existentes
  // se não existir nada apenas pare a execução
  if (!name || !cpf) {
    alert('Name or CPF is not defined!')
    return;
  }

  set(ref(db, `users/${key}`), {
    name,
    cpf,
    endereco
  })
}

//Atualizando um usuário
export function setUserUpdate({ key, name, cpf, endereco }) {
  set(ref(db, `users/${key}`), {
    name,
    cpf,
    endereco
  })
}

//Deletando um usuário
export function deleteUser(key: string) {
  remove(ref(db, `users/${key}`))
}


//Criar um endereço
// export function setAddress(key: string, addressKey: string, endereco: addressProps) {
//   update(ref(db, `users/${key}/endereco`), {
//     [addressKey]: {
//       address: endereco.address,
//       num: endereco.num,
//       complement: endereco.complement,
//       district: endereco.district,
//       city: endereco.city,
//       uf: endereco.uf,
//       cep: endereco.cep
//     }

//   })
// }


