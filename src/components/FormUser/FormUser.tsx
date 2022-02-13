
import { FormEvent, useState } from 'react'
import styles from './formUser.module.scss'
import { v4 as uuid } from 'uuid'
import { setUser, deleteUser, setUserUpdate } from '../../service/database'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import { cpfAlreadyExists, selectUserByKey } from '../../service/fuctions'
import { Input } from '../Input/Input'
import { Button } from '../Buttons/ Buttons'

interface formProps {
  users: {
    key: string,
    name: string,
    cpf: string,
    endereco: AddressProps[]
  }[]
}

type AddressProps = {
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string
}

export function FormUser({ users }: formProps) {

  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [atualizando, setAtualizando] = useState<boolean>(false)
  const [cancel, setCancel] = useState<boolean>(false)

  // const [user, setUser] = useState('')


  function createUser(event: FormEvent) {
    event.preventDefault()

    //validar se existe outro usuário com o mesmo cpf
    cpfAlreadyExists(users, cpf)

    setUser({
      key: uuid() as string,
      name,
      cpf
    })

    setName('')
    setCpf('')
  }


  function showUserData(userKey: string) {
    setAtualizando(true)
    setCancel(true)

    const user = selectUserByKey(users, userKey)

    setName(user.name)
    setCpf(user.cpf)
    setKey(user.key)
  }


  function updateUser() {
    setAtualizando(false)
    setCancel(false)

    setUserUpdate({
      key,
      name,
      cpf,
    })

    setName('')
    setCpf('')
  }

  function clearInput() {
    setName('')
    setCpf('')
  }

  function cancelUserEdit() {
    setAtualizando(false)
    setCancel(false)

    setName('')
    setCpf('')
  }

  const userKey = '7e7bfd72-299f-433d-a0df-6fceebf2da33'

  // function handleUser(userKey: string) {
  //   const user = users.find((data, index) => data.key === userKey)

  //   setUser(user)
  // }

  // console.log(user)

  return (
    <>
      <form className={styles.formUser}>

        <Input
          title={'Nome'}
          value={name}
          setData={setName}
          maxLength={22}
        />

        <Input
          title={'CPF'}
          value={cpf}
          setData={setCpf}
          maxLength={14}
        />

        <div className={styles.formButtons}>
          {
            !atualizando ?
              <Button
                type='delete'
                action={() => clearInput()}
              />

              :
              <Button
                type='clear'
                action={() => cancelUserEdit()}
              />

          }
          {
            !atualizando ?
              <Button
                type='create'
                action={createUser}
              />

              :
              <Button
                type='update'
                action={updateUser}
              />
          }
        </div>


      </form>


      <div className={styles.listContainer}>

        <div>
          <h4>Filtrar Usuário:</h4>
          <input
            type="text"
            onChange={(event) => event.target.value}
            maxLength={16}
          />
        </div>


        <h3>Lista de Usuários</h3>

        <div className={styles.usersContent}>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Endereço</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(data => (
                  <tr key={data.key}>
                    <td>{data.name}</td>
                    <td>{data.cpf}</td>
                    <td>{ }</td>
                    <td>
                      <div>
                        <button className={styles.editar} onClick={() => showUserData(data.key)}>
                          <span>Editar</span>

                          <AiTwotoneEdit />

                        </button>
                        <button className={styles.delete} onClick={() => deleteUser(data.key)}>

                          <span>Deletar</span>
                          <AiFillDelete />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}



