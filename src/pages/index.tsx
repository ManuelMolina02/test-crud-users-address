import { FormUser } from '../components/FormUser/FormUser'

import { UsersList } from '../components/UsersList/UsersList';
import { useGetUsers } from '../hooks/useGetUsers';

import styles from '../styles/home.module.scss'


export default function Home() {

  const users = useGetUsers()

  return (
    <div className={styles.container}>
      <FormUser users={users} />

      <UsersList users={users} />
    </div>
  )
}
