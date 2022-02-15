import { FormEvent } from "react";
import { Button } from "../../Buttons/ Buttons";
import styles from './buttonsForm.module.scss'


interface buttonsFormProps {
  stateButtons: {
    updateUserBtn: boolean,
    newAdressBtn: boolean
  }
  functions: {
    updateUser: () => void
    clearInputs: () => void
    cancelUserEdit: () => void
    cancelAddressEdit: () => void
    createUser: (event: FormEvent<Element>) => void
    addNewAddress: (event: FormEvent<Element>) => void
    handleInputsNewAddress: (event: FormEvent<Element>) => void
  }
}

export function ButtonsForm({ functions, stateButtons }: buttonsFormProps) {


  return (
    <>
      <div className={styles.formButtons}>
        {
          !stateButtons.updateUserBtn ?
            <Button
              type='clear'
              action={() => functions.clearInputs()}
            />

            :
            <Button
              type='delete'
              action={() => functions.cancelUserEdit()}
            />
        }
        {
          !stateButtons.updateUserBtn ?
            <Button
              type='create'
              action={functions.createUser}
            />

            :

            <>
              <Button
                type='update'
                action={functions.updateUser}
              />
              {
                !stateButtons.newAdressBtn ?
                  <div className={styles.btnUpdateAddress}>

                    <Button
                      type='updateAddress'
                      action={functions.handleInputsNewAddress}
                    />

                  </div>

                  :
                  <div className={styles.btnUpdateAddress}>
                    <Button
                      type='delete'
                      action={() => functions.cancelAddressEdit()}
                    />

                    <Button
                      type='updateAddress'
                      action={functions.addNewAddress}
                    />
                  </div>
              }

            </>
        }
      </div>


    </>
  )
}