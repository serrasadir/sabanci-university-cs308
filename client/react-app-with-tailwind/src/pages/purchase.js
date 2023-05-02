import { useContext } from "react";
import { Cart } from "../context/Context"


export const Purchase = () => {

  const { state: { cart }, dispatch, } = useContext(Cart);

  return (
    <div>
        <p>afhsdjkfhskdjfhkjasdhfjkasldhfjkasdkjf</p>
    </div>
  )
}

