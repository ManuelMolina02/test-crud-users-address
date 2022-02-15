import { Input } from "../../Input/Input";
import styles from './formUser.module.scss'


interface formUserProps {
  values: {
    name: string,
    cpf: string
  }

  setValues: {
    setName: (data: string) => void,
    setCpf: (data: string) => void
  }
}

export function FormUser({ values, setValues }: formUserProps) {
  return (
    <div className={styles.formUser}>
      <h2>Cadastro de Usuário <span>*Campos Obrigatórios</span></h2>
      <div>

        <Input
          title={'Nome'}
          value={values.name}
          setData={setValues.setName}
          maxLength={22}
          require={false}
        />

        <Input
          title={'CPF'}
          value={values.cpf}
          setData={setValues.setCpf}
          maxLength={14}
          require={false}

        />
      </div>

    </div>

  )
}