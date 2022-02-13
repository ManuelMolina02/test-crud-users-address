import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { deleteUser, UserProps } from "../../service/database";
import styles from './table.module.scss'

interface tableProps {
  users: {
    key: string,
    name: string,
    cpf: string,
    endereco: AddressProps[]
  }[],
  showUserData: (key: string) => void
}

type AddressProps = {
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string
}

export function Table({ users, showUserData }: tableProps) {

  return (
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
                  <td>{data.endereco ? 'X' : ''}</td>
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
  )
}

