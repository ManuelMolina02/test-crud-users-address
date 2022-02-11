
import { FormEvent, useState } from 'react'
import styles from './formUser.module.scss'
import { v4 as uuid } from 'uuid'

import { createUser, deleteUser } from '../../service/database'

interface formProps {
  users: {
    key: string,
    name: string,
    cpf: number
  }[]
}

export function FormUser({ users }: formProps) {

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState(0)


  function createNewUser(event: FormEvent) {
    event.preventDefault()
    // validar se dados no form são existentes
    // se não existir nada apenas pare a execução
    if (!name || !cpf) {
      alert('Name or CPF is not defined!')
      return;
    }

    //validar se existe outro usuário com o mesmo cpf
    const cpfAlreadyExists = users.some(user => user.cpf === cpf)

    if (cpfAlreadyExists) {
      alert('CPF already exists!')
      return;
    }

    createUser({
      key: uuid() as string,
      name,
      cpf
    })

    setName('')
    setCpf(0)
  }


  return (
    <>
      <form onSubmit={createNewUser} className={styles.formUser}>

        <div>
          <label>Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}

            maxLength={16}
          />
        </div>

        <div>
          <label>CPF</label>
          <input
            type="number"
            required
            value={cpf}
            onChange={(event) => setCpf(Number(event.target.value))}

            maxLength={12}
          />
        </div>

        <button onClick={createNewUser}>Enviar</button>

      </form>

    </>
  )
}



