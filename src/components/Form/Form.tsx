import { useEffect, useState } from 'react'
import { setNewAddress, setUser, setUserUpdate } from '../../service/database'
import { cpfAlreadyExists, selectAddress } from '../../service/fuctions'
import { addressProps, user } from '../../service/types'
import { v4 as uuid } from 'uuid'

import styles from './form.module.scss'
import Alert from 'react-bootstrap/Alert'
import { ButtonsForm } from './ButtonsForm/ButtonsForm'
import { FormAddress } from './FormAddress/FormAddress'
import { FormUser } from './FormUser/ FormUser'

interface FormProps {
  users: user[],
  addressDefault: addressProps,

  userActive: user,
  addressActive: {
    userId: string,
    addressId: string
  }
}

export function Form({ users, userActive, addressDefault, addressActive }: FormProps) {

  //Campos Formulário
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [addressKey, setAddressKey] = useState('')
  const [address, setAddress] = useState<string>('')
  const [num, setNum] = useState<string>('')
  const [complement, setComplement] = useState<string>('')

  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [uf, setUf] = useState<string>('')
  const [cep, setCep] = useState<string>('')

  //Receptores de informações da tabela
  const { addressId, userId } = addressActive
  const { addressSelected, userSelected } = selectAddress(users, userId, addressId)

  const [updateUserBtn, setUpdateUserBtn] = useState<boolean>(false)
  const [newAdressBtn, setNewAddressBtn] = useState<boolean>(false)

  //Atualizando dados para criar um usuário
  useEffect(() => {

    setKey(userActive.key)
    setName(userActive.name)
    setCpf(userActive.cpf)

    setAddressKey(addressDefault?.key)
    setAddress(addressDefault?.address)
    setNum(addressDefault?.num)
    setComplement(addressDefault?.complement)
    setDistrict(addressDefault?.district)
    setCity(addressDefault?.city)
    setUf(addressDefault?.uf)
    setCep(addressDefault?.cep)

    setUpdateUserBtn(true)

  }, [addressDefault, userActive])

  //Atualizando dados para editar endereço do usuário
  useEffect(() => {
    setKey(userSelected?.key)
    setName(userSelected?.name)
    setCpf(userSelected?.cpf)

    setAddressKey(addressSelected?.key)
    setAddress(addressSelected?.address)
    setNum(addressSelected?.num)
    setComplement(addressSelected?.complement)
    setDistrict(addressSelected?.district)
    setCity(addressSelected?.city)
    setUf(addressSelected?.uf)
    setCep(addressSelected?.cep)

    setUpdateUserBtn(true)

  }, [addressSelected])

  //Resetando estado dos componentes
  useEffect(() => {
    setUpdateUserBtn(false)
    setNewAddressBtn(false)
    clearInputs()

  }, [users])

  //Controles do formulário
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const addressData = {
    address,
    num,
    complement,
    district,
    city,
    uf,
    cep
  }

  function clearInputs() {
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
    setUpdateUserBtn(false)
    clearInputs()
  }

  function cancelAddressEdit() {
    setNewAddressBtn(false)
    clearInputs()
  }

  //Reproduzir um alerta em tela
  function handleAlert(status, message) {
    setAlert(true)
    setStatus(status)
    setMessage(message)

    setTimeout(() => {
      setAlert(false)

    }, 4000)
  }

  function createUser() {
    if (!name || !cpf) {
      handleAlert('danger', 'Preencha todos os campos obrigatórios!')
      return
    }

    const validCpf = cpfAlreadyExists(users, cpf)

    if (validCpf) {
      handleAlert('danger', 'Esse CPF já foi cadastrado!')
      return
    }

    setUser({
      key: uuid() as string,
      name,
      cpf,
      endereco: addressData,
      addressKey: uuid()
    })

    clearInputs()
    handleAlert('success', 'Usuário Cadastrado com sucesso!')
  }


  function updateUser() {

    setUserUpdate({
      key,
      addressKey,
      name,
      cpf,
      endereco: addressData
    })

    clearInputs()
    handleAlert('success', 'Usuário atualizado com sucesso!')
  }

  function handleInputsNewAddress() {

    setAddress('')
    setNum('')
    setComplement('')
    setDistrict('')
    setCity('')
    setUf('')
    setCep('')

    setNewAddressBtn(true)
  }

  function addNewAddress() {

    setUpdateUserBtn(false)

    setNewAddress({
      key,
      addressKey: uuid() as string,

      endereco: addressData
    })

    clearInputs()
    handleAlert('success', 'Endereço atualizado com sucesso!')

  }

  return (
    <form
      className={styles.form}
    >

      {/* Alert com retornos */}
      {alert ?
        <div className={styles.alert}>
          <Alert variant={status}>
            {message}
          </Alert>
        </div>
        :
        <div className={styles.alert}>
        </div>
      }
      <div className={styles.row}>


        {/* Formulários */}
        <FormUser
          values={{
            name,
            cpf
          }}

          setValues={{
            setName,
            setCpf
          }}

        />

        <FormAddress
          values={{
            address,
            num,
            complement,
            district,
            city,
            uf,
            cep
          }}

          setValues={{
            setAddress,
            setNum,
            setComplement,
            setDistrict,
            setCity,
            setUf,
            setCep
          }}
        />
      </div>

      {/* Controles do Form */}
      <ButtonsForm

        stateButtons={{
          updateUserBtn,
          newAdressBtn
        }}

        functions={{
          updateUser,
          createUser,
          clearInputs,
          addNewAddress,
          cancelUserEdit,
          cancelAddressEdit,
          handleInputsNewAddress
        }}
      />
    </form>

  )
}
