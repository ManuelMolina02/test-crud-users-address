
import { deleteUser } from '../../service/database';
import styles from './usersList.module.scss'

interface usersListProps {
  users: {
    key: string,
    name: string,
    cpf: number
  }[]
}

export function UsersList({ users }: usersListProps) {

  return (

    <div className={styles.listContainer}>
      <h3>Lista de Usuários</h3>

      <div>
        {
          users.map(data => (
            <div key={data.key} className={styles.itemList}>

              <div>
                <h4>Nome:</h4>
                <p>{data.name}</p>
              </div>

              <div>
                <h4>Cpf:</h4>
                <p>{data.cpf}</p>
              </div>

              <div className={styles.buttonsItemList}>
                <button onClick={() => console.log(`editar um usuário ${data.key}`)}>editar</button>
                <button onClick={() => deleteUser(data.key)}>excluir</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>

  )
}