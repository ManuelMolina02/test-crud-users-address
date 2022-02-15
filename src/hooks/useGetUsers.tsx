import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../service/database";
import { addressProps } from "../service/types";

interface userProps {
  key: string,
  name: string,
  cpf: string,
  endereco?: addressProps[]
}[]


export function useGetUsers() {
  const [users, setUsers] = useState<userProps[]>([])

  useEffect(() => {
    const users = ref(db, 'users');

    //OnValue -> ler dados em um caminho e detectar alterações.
    onValue(users, results => {
      const dataUsers = Object.entries<userProps>(results.val() ?? {})
        //criando obj de retorno 
        .map(([key, value]) => {


          if (value.endereco === undefined) {
            const addressData = []

            return {
              key: key,
              name: value.name,
              cpf: value.cpf,
              endereco: addressData
            }

          } else {

            const addressData = Object.entries(value.endereco).map(([key, value]) => {
              return {
                key,
                address: value.address,
                num: value.num,
                complement: value.complement,
                district: value.district,
                city: value.city,
                uf: value.uf,
                cep: value.cep
              }
            })

            return {
              key: key,
              name: value.name,
              cpf: value.cpf,
              endereco: addressData
            }
          }
        })

      setUsers(dataUsers)
    })


  }, [])

  return users
}

