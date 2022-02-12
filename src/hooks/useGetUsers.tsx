import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../service/database";

interface userProps {
  key: string,
  name: string,
  cpf: string
}

export function useGetUsers() {
  const [users, setUsers] = useState<userProps[]>([])

  useEffect(() => {
    const users = ref(db, 'users');

    //OnValue -> ler dados em um caminho e detectar alterações.
    onValue(users, results => {
      const dataUsers = Object.entries<userProps>(results.val() ?? {})
        //criando obj de retorno 
        .map(([key, value]) => {
          return {
            key: key,
            name: value.name,
            cpf: value.cpf
          }
        })

      setUsers(dataUsers)
    })

  }, [])

  return users
}