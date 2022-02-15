interface InputProps {
  title: string,
  value: string,
  setData: (data: string) => void,
  maxLength?: number,
  require?: boolean
}

export function Input({ title, value, setData, maxLength, require }: InputProps) {
  return (
    <div>
      <label>{title} {require ? <p>*Obrigatório</p> : ''}</label>
      <input
        type="text"
        required

        value={value}
        onChange={(event) => setData(event.target.value)}
        maxLength={maxLength}
      />
    </div>

  )
}