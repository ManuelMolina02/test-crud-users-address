import { FormEvent, useEffect, useState } from 'react'
import { setUser, setUserUpdate } from '../../service/database'
import { cpfAlreadyExists, handleAddressObj, selectUserByKey } from '../../service/fuctions'
import { v4 as uuid } from 'uuid'

import { Button } from '../Buttons/ Buttons'
import { Input } from '../Input/Input'

import styles from './form.module.scss'


interface FormProps {
  users: {
    key: string,
    name: string,
    cpf: string,
    endereco?: addressProps | any
  }[],


  userSelected: {
    key: string,
    name: string,
    cpf: string,
    endereco?: addressProps | undefined
  }
}

type addressProps = {
  address: string,
  num: string,
  complement: string,
  district: string,
  city: string,
  uf: string,
  cep: string
}



export function Form({ users, userSelected }: FormProps) {

  //Campos Formulário

  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [address, setAddress] = useState<string>('')
  const [num, setNum] = useState<string>('')
  const [complement, setComplement] = useState<string>('')

  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [uf, setUf] = useState<string>('')
  const [cep, setCep] = useState<string>('')

  useEffect(() => {

    setUpdateButton(true)

    setKey(userSelected.key)
    setName(userSelected.name)
    setCpf(userSelected.cpf)

    if (!userSelected.endereco) {
      setAddress('')
      setNum('')
      setComplement('')
      setDistrict('')
      setCity('')
      setUf('')
      setCep('')
    } else {
      setAddress(userSelected.endereco[0].address)
      setNum(userSelected.endereco[0].num)
      setComplement(userSelected.endereco[0].complement)
      setDistrict(userSelected.endereco[0].district)
      setCity(userSelected.endereco[0].city)
      setUf(userSelected.endereco[0].uf)
      setCep(userSelected.endereco[0].cep)
    }

  }, [userSelected])



  //Controlando estados de botões
  const [updateButton, setUpdateButton] = useState<boolean>(false)


  function createUser(event: FormEvent) {
    event.preventDefault()


    //validar campos obrigatórios
    if (!name || !cpf) {
      alert("Preencha todos os campos obrigatórios")
      return
    }

    //validar se existe outro usuário com o mesmo cpf
    const validCpf = cpfAlreadyExists(users, cpf)

    if (validCpf) {
      alert('Esse CPF já foi cadastrado')
      return
    }

    const enderecoObj: addressProps[] = [{
      address,
      num,
      complement,
      district,
      city,
      uf,
      cep
    }]

    const endereco = handleAddressObj(enderecoObj)

    setUser({
      key: uuid() as string,
      name,
      cpf,
      endereco
    })

    setName('')
    setCpf('')
  }

  function updateUser() {
    setUpdateButton(false)

    const enderecoObj: addressProps[] = [{
      address,
      num,
      complement,
      district,
      city,
      uf,
      cep
    }]

    const endereco = handleAddressObj(enderecoObj)

    setUserUpdate({
      key,
      name,
      cpf,
      endereco
    })

    setName('')
    setCpf('')
  }

  function clearInput() {
    setName('')
    setCpf('')

    setAddress('')
    setNum('')
    setComplement('')
    setDistrict('')
    setCity('')
    setUf('')
    setCep('')
  }

  function cancelUserEdit() {
    setUpdateButton(false)

    setName('')
    setCpf('')

    setAddress('')
    setNum('')
    setComplement('')
    setDistrict('')
    setCity('')
    setUf('')
    setCep('')
  }


  return (
    <form
      className={styles.form}
    >

      <div className={styles.row}>

        <div className={styles.formUser}>
          <h2>Cadastro de Usuário <span>*Campos Obrigatórios</span></h2>
          <div>

            <Input
              title={'Nome'}
              value={name}
              setData={setName}
              maxLength={22}
              require={false}
            />

            <Input
              title={'CPF'}
              value={cpf}
              setData={setCpf}
              maxLength={14}
              require={false}

            />
          </div>

        </div>

        <div className={styles.formAddress}>
          <h2>Endereço <span>(Opcional)</span></h2>
          <div>
            <div>
              <Input
                title={'Rua'}
                value={address}
                setData={setAddress}
                maxLength={22}
                require={false}
              />

              <Input
                title={'Número'}
                value={num}
                setData={setNum}
                maxLength={14}
                require={false}
              />


              <Input
                title={'Complemento'}
                value={complement}
                setData={setComplement}
                maxLength={14}
                require={false}
              />
            </div>


            <div>
              <Input
                title={'Bairro'}
                value={district}
                setData={setDistrict}
                maxLength={14}
                require={false}
              />


              <Input
                title={'Cidade'}
                value={city}
                setData={setCity}
                maxLength={14}
                require={false}
              />


              <Input
                title={'UF'}
                value={uf}
                setData={setUf}
                maxLength={14}
                require={false}
              />

              <Input
                title={'CEP'}
                value={cep}
                setData={setCep}
                maxLength={14}
                require={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formButtons}>
        {
          !updateButton ?
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
          !updateButton ?
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


  )
}
