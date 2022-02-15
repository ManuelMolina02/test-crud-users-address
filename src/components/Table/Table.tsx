
import { addressProps, user } from "../../service/types";
import { deleteUser } from "../../service/database";

import styles from './table.module.scss'
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { FaRegAddressCard } from 'react-icons/fa'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'

interface tableProps {
  users: user[],
  showUserData: (key: string) => void
  showAddress: (userId: string) => void
  handleAddressId: (addresId: string) => void
  deleteAddre: (addresId: string) => void
}

export function Table({ users, showUserData, showAddress, handleAddressId, deleteAddre }: tableProps) {

  //Componente collapse personalizado
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(''),
    );

    return (
      <div
        className={styles.iconAddress}
        onClick={decoratedOnClick}
      >
        {children}
      </div>
    );
  }

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

        <Accordion className={styles.customAccordion} flush>

          {
            users.map(data => (
              <Card key={data.key}>
                <Card.Header>

                  <div >
                    <CustomToggle eventKey={data.key}> {<FaRegAddressCard onClick={() => showAddress(data.key)} />}</CustomToggle>
                  </div>

                  <div className={styles.accordionContent}>
                    {data.name}
                  </div>


                  <div className={styles.accordionContent}>
                    {data.cpf}
                  </div>

                  <div className={`${styles.accordionContent} ${styles.buttonsItemList}`} >
                    <button className={styles.editar} onClick={() => showUserData(data.key)}>
                      <span>Editar</span>

                      <AiTwotoneEdit />

                    </button>
                    <button className={styles.delete} onClick={() => deleteUser(data.key)}>

                      <span>Deletar</span>
                      <AiFillDelete />

                    </button>
                  </div>

                </Card.Header>

                <Accordion.Collapse eventKey={data.key}>
                  <Card.Body bsPrefix={` py-3 ps-2 w-100`} style={{ backgroundColor: '#313142' }}>{

                    data.endereco?.map((data: addressProps) => (
                      <div key={data.key} className={styles.collapseContent}>
                        <div>
                          <label>Rua: </label>
                          <span>{data.address}</span>
                        </div>

                        <div>
                          <label>Número: </label>
                          <span>{data.num}</span>
                        </div>

                        <div>
                          <label>Complemento: </label>
                          <span>{data.complement}</span>
                        </div>

                        <div>
                          <label>Bairro: </label>
                          <span>{data.district}</span>
                        </div>

                        <div>
                          <label>Cidade: </label>
                          <span>{data.city}</span>
                        </div>

                        <div>
                          <label>UF: </label>
                          <span>{data.uf}</span>
                        </div>

                        <div>
                          <label>CEP: </label>
                          <span>{data.cep}</span>
                        </div>


                        <button className={styles.updateAddress} onClick={() => handleAddressId(data.key)}>
                          <AiTwotoneEdit />
                        </button>

                        <button className={styles.deleteAddress} onClick={() => deleteAddre(data.key)}>
                          <AiFillDelete />
                        </button>

                      </div>
                    ))
                  }</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))
          }
        </Accordion>

      </div>
    </div>
  )
}

