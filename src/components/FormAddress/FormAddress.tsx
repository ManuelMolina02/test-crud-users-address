import { FormEvent, useState } from "react";
import { setAddress } from "../../service/database";
import { Button } from "../Buttons/ Buttons";
import { Input } from "../Input/Input";
import styles from './formAddress.module.scss'
import { v4 as uuid } from 'uuid'

export function FormAddress() {

  const [rua, setRua] = useState<string>('')
  const [bairro, setBairro] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')
  const [estado, setEstado] = useState<string>('')
  const [cep, setCep] = useState<string>('')


  const [atualizando, setAtualizando] = useState<boolean>(false)
  const [cancel, setCancel] = useState<boolean>(false)

  function createAddress(event: FormEvent) {
    event.preventDefault()

    const userkey = '7e7bfd72-299f-433d-a0df-6fceebf2da33'
    const addressKey = uuid() as string
    const endereco = {
      rua,
      bairro,
      cidade,
      estado,
      cep,
    }

    setAddress(userkey, addressKey, endereco)

    setRua('')
    setBairro('')
    setCidade('')
    setEstado('')
    setCep('')

  }

  function clearInput() {
    setRua('')
    setBairro('')
    setCidade('')
    setEstado('')
    setCep('')

  }

  function cancelUserEdit() {
    setAtualizando(false)
    setCancel(false)

    setRua('')
    setBairro('')
    setCidade('')
    setEstado('')
    setCep('')

  }

  return (
    <>
      <form className={styles.formCard}>

        <Input
          title={'Rua'}
          value={rua}
          setData={setRua}
          maxLength={22}
        />

        <Input
          title={'Bairro'}
          value={bairro}
          setData={setBairro}
          maxLength={14}
        />

        <Input
          title={'Cidade'}
          value={cidade}
          setData={setCidade}
          maxLength={14}
        />

        <Input
          title={'Estado'}
          value={estado}
          setData={setEstado}
          maxLength={14}
        />
        <Input
          title={'CEP'}
          value={cep}
          setData={setCep}
          maxLength={14}
        />

        <div className={styles.formButtons}>

          <Button
            type='clear'
            action={clearInput}
          />

          <Button
            type='create'
            action={createAddress}
          />

        </div>

      </form>





    </>
  )
}