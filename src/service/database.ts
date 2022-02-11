import { getDatabase, ref, set, remove } from "firebase/database";
import { firebaseApp } from "./ firebase";

firebaseApp()
export const db = getDatabase();

interface createUserProps {
  key: string,
  name: string,
  cpf: number
}

export function createUser({ key, name, cpf }: createUserProps) {
  set(ref(db, 'users/' + key), {
    key,
    name,
    cpf
  })
}

export function deleteUser(key: string) {

  remove(ref(db, `users/${key}`))
}
