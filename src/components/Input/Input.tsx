import { FormEvent, useCallback } from "react"
import { maskInputCep, maskInputCpf } from "../../service/fuctions"

interface InputProps {
  title: string,
  value: string,
  setData: (data: string) => void,
  maxLength?: number,
  require?: boolean,
  mask?: 'cpf' | 'cep',

}

export function Input({ title, value, setData, maxLength, require, mask }: InputProps) {


  const handleKeyUp = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (mask === 'cpf') {
      maskInputCpf(event)
    }

    if (mask === 'cep') {
      maskInputCep(event)
    }
  }, [mask])


  return (
    <div>
      <label>{title} {require ? <p>*Obrigatório</p> : ''}</label>
      <input
        type="text"
        required

        value={value}
        onChange={(event) => setData(event.target.value)}
        onKeyUp={handleKeyUp}
        maxLength={maxLength}
      />
    </div>

  )
}