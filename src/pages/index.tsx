import { FormUser } from '../components/FormUser/FormUser'
import styles from '../styles/home.module.scss'

import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react';
import { UsersList } from '../components/UsersList/UsersList';

interface userProps {
  key: string,
  name: string,
  cpf: number
}

export default function Home() {

  const [users, setUsers] = useState<userProps[]>()

  useEffect(() => {
    const db = getDatabase();
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

  return (
    <div className={styles.container}>
      <FormUser users={users} />

      <UsersList users={users} />
    </div>
  )
}
