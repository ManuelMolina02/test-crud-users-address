import { useGetUsers } from '../hooks/useGetUsers';
import { Form } from '../components/Form/Form';
import { Table } from '../components/Table/Table';

import styles from '../styles/home.module.scss'
import { useState } from 'react';
import { deleteAddress } from '../service/database';
import { selectUserByKey } from '../service/fuctions';

export default function Home() {

  const users = useGetUsers()

  const [userSelected, setUserSelected] = useState({} as any)
  const [addressDefault, setAddressDefault] = useState({} as any)

  const [userId, setUserId] = useState('')
  const [addressId, setAddressId] = useState('')

  let addressActive = { userId, addressId }


  //Buscando dados do user active
  function showUserData(key: string) {

    const user = selectUserByKey(users, key)
    const address = user.endereco[0]

    setUserSelected(user)
    setAddressDefault(address)
  }

  //Buscando dados do address active
  function showAddress(userId: string): void {
    setUserId(userId)
  }

  function handleAddressId(addressId: string) {
    setAddressId(addressId)
  }

  function deleteAddre(addressId: string) {
    deleteAddress(userId, addressId)
  }


  return (
    <div className={styles.container}>
      <Form
        users={users}
        userActive={userSelected}
        addressDefault={addressDefault}
        addressActive={addressActive}
      />

      <Table
        users={users}
        showUserData={showUserData}
        showAddress={showAddress}
        handleAddressId={handleAddressId}
        deleteAddre={deleteAddre}
      />

    </div>
  )
}
