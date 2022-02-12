
import { deleteUser } from '../../service/database';
import styles from './usersList.module.scss'

interface usersListProps {
  users: {
    key: string,
    name: string,
    cpf: string
  }[]
}

export function UsersList({ users }: usersListProps) {


  return (
    // <div className={styles.listContainer}>

    //   <div>
    //     <h4>Filtrar Usuário:</h4>
    //     <input
    //       type="text"
    //       onChange={(event) => event.target.value}
    //       maxLength={16}
    //     />
    //   </div>


    //   <h3>Lista de Usuários</h3>

    //   <div className={styles.usersList}>

    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Nome</th>
    //           <th>CPF</th>
    //           <th>Options</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {
    //           users.map(data => (
    //             <tr key={data.key}>
    //               <td>{data.name}</td>
    //               <td>{data.cpf}</td>
    //               <td>
    //                 <button className={styles.editar} onClick={() => console.log(data.key)}>Editar</button>
    //                 <button className={styles.delete} onClick={() => deleteUser(data.key)}>Deletar</button>
    //               </td>
    //             </tr>
    //           ))
    //         }

    //       </tbody>
    //     </table>

    //   </div>



    // </div>

    <>
    </>

  )
}