
import { FormEvent, useState } from 'react'
import styles from './formUser.module.scss'
import { v4 as uuid } from 'uuid'

interface UserProps {
  id: string,
  name: string,
  cpf: string
}


export function FormUser() {

  const [users, setUsers] = useState<UserProps[]>([])

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  function handleData(event: FormEvent) {

    //validar se dados no form são existentes
    //se não existir nada apenas pare a execução
    if (!name || !cpf) {
      return
    }

    //validar se existe outro usuário com o mesmo cpf

    const user = {
      id: uuid(),
      name,
      cpf
    }

    setUsers(
      [...users,
        user
      ])

    setName('')
    setCpf('')
  }

  console.log(users)

  //editar user
  function handleUserSelected(id: string) {
    let nameUpdate = '112331'
    let cpfUpdate = '123132123'

    let user = users.map(data => data.id === id ? {
      id: data.id,
      name: nameUpdate ? nameUpdate : data.name,
      cpf: cpfUpdate ? cpfUpdate : data.cpf
    } : data)

    setUsers(user)
  }

  //deletar usuário
  function deletedUserSelected(id: string) {
    const filteredUsers = users.filter(data => data.id !== id)
    setUsers(filteredUsers)
  }

  return (
    <>
      <form className={styles.formUser}>

        <div>
          <label htmlFor="">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}

          />
        </div>

        <div>
          <label htmlFor="">CPF</label>
          <input
            type="text"
            required
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </div>

        <button onClick={handleData}>Enviar</button>

      </form>




      <div className={styles.listContainer}>
        <h3>Lista de Usuários</h3>

        <div>
          {
            users.map(data => (
              <div key={data.id} className={styles.itemList}>

                <div>
                  <h4>Nome:</h4>
                  <p>{data.name}</p>
                </div>

                <div>

                  <h4>Cpf:</h4>
                  <p>{data.cpf}</p>

                </div>

                <div className={styles.buttonsItemList}>
                  <button onClick={() => handleUserSelected(data.id)}>editar</button>
                  <button onClick={() => deletedUserSelected(data.id)}>excluir</button>

                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}  