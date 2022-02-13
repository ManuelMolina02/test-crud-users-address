import { useGetUsers } from '../hooks/useGetUsers';
import { Form } from '../components/Form/Form';
import { Table } from '../components/Table/Table';

import styles from '../styles/home.module.scss'
import { useState } from 'react';


export default function Home() {

  const users = useGetUsers()


  const [userSelected, setUserSelected] = useState({} as any)

  function showUserData(key: string) {

    const user = users.find(data => data.key === key)
    setUserSelected(user)
  }



  return (
    <div className={styles.container}>
      <Form users={users} userSelected={userSelected} />

      <Table users={users} showUserData={showUserData} />

    </div>
  )
}
