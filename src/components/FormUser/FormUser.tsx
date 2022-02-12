
import { FormEvent, useState } from 'react'
import styles from './formUser.module.scss'
import { v4 as uuid } from 'uuid'
import { setUserCreation, deleteUser, setUserUpdate } from '../../service/database'
import { AiTwotoneEdit, AiFillDelete, AiOutlineClear } from 'react-icons/ai'
import { MdClear } from 'react-icons/md'
import { cancelUserEdit, clearInput, cpfAlreadyExists, selectUserByKey } from '../../service/fuctions'

interface formProps {
  users: {
    key: string,
    name: string,
    cpf: string
  }[]
}

export function FormUser({ users }: formProps) {

  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [atualizando, setAtualizando] = useState<boolean>(false)
  const [cancel, setCancel] = useState<boolean>(false)


  function userCreate(event: FormEvent) {
    event.preventDefault()

    //validar se existe outro usuário com o mesmo cpf
    cpfAlreadyExists(users, cpf)

    setUserCreation({
      key: uuid() as string,
      name,
      cpf
    })

    clearInput(setName, setCpf)
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

    clearInput(setName, setCpf)
  }

  return (
    <>
      <form className={styles.formUser}>

        <div>
          <label>Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}

            maxLength={22}
          />
        </div>

        <div>
          <label>CPF</label>
          <input
            type="text"
            required
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}

            maxLength={14}
          />
        </div>

        <div className={styles.formButtons}>
          {
            !atualizando ?
              <button
                className={styles.clearData}
                onClick={() => clearInput(setName, setCpf)}>
                <AiOutlineClear />

              </button>

              : <button
                className={styles.clearData}
                onClick={() => cancelUserEdit(setName, setCpf, setAtualizando, setCancel)}>
                <MdClear />
              </button>

          }
          {
            !atualizando ?
              <button
                className={styles.createUser}
                onClick={userCreate}>Criar</button>
              : <button
                className={styles.updateUser}
                onClick={updateUser}>Atualizar</button>
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

        <div className={styles.usersList}>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(data => (
                  <tr key={data.key}>
                    <td>{data.name}</td>
                    <td>{data.cpf}</td>
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



