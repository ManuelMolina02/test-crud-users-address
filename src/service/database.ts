import { firebaseApp } from "./firebase";
import { getDatabase, ref, set, remove } from "firebase/database";

//iniciando firebase e banco de dados
firebaseApp()
export const db = getDatabase();

//definindo interface de usuário
interface UserProps {
  key: string,
  name: string,
  cpf: string
}


// -> Queries banco de dados

export function setUserCreation({ key, name, cpf }: UserProps) {
  // validar se dados no form são existentes
  // se não existir nada apenas pare a execução
  if (!name || !cpf) {
    alert('Name or CPF is not defined!')
    return;
  }

  set(ref(db, `users/${key}`), {
    name,
    cpf
  })
}

export function setUserUpdate({ key, name, cpf }) {
  set(ref(db, `users/${key}`), {
    name,
    cpf
  })
}

export function deleteUser(key: string) {
  remove(ref(db, `users/${key}`))
}
