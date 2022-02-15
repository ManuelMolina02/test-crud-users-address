import { Input } from "../../Input/Input";
import styles from './formAddress.module.scss'

interface formAddressProps {
  values: {
    address: string,
    num: string,
    complement: string,
    district: string,
    city: string,
    uf: string,
    cep: string,
  }

  setValues: {
    setAddress: (data: string) => void,
    setNum: (data: string) => void,
    setComplement: (data: string) => void,
    setDistrict: (data: string) => void,
    setCity: (data: string) => void,
    setUf: (data: string) => void,
    setCep: (data: string) => void,
  }

}

export function FormAddress({ values, setValues }: formAddressProps) {
  return (
    <div className={styles.formAddress}>
      <h2>Endereço <span>(Opcional)</span></h2>
      <div>
        <div>
          <Input
            title={'Rua'}
            value={values.address}
            setData={setValues.setAddress}
            maxLength={22}
            require={false}
          />

          <Input
            title={'Número'}
            value={values.num}
            setData={setValues.setNum}
            maxLength={5}
            require={false}
          />

          <Input
            title={'Complemento'}
            value={values.complement}
            setData={setValues.setComplement}
            maxLength={8}
            require={false}
          />
        </div>


        <div>
          <Input
            title={'Bairro'}
            value={values.district}
            setData={setValues.setDistrict}
            maxLength={14}
            require={false}
          />

          <Input
            title={'Cidade'}
            value={values.city}
            setData={setValues.setCity}
            maxLength={18}
            require={false}
          />

          <Input
            title={'UF'}
            value={values.uf}
            setData={setValues.setUf}
            maxLength={2}
            require={false}
          />

          <Input
            title={'CEP'}
            value={values.cep}
            setData={setValues.setCep}
            maxLength={9}
            require={false}
            mask="cep"
          />
        </div>
      </div>
    </div>
  )
}