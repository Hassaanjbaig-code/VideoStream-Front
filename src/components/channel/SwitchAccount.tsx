import React from "react"
import { SignAnotheProps } from "../../vite-env"

const SwitchAccount: React.FC<SignAnotheProps> = ({close}) => {
  return (
    <div>
        <button type="button" onClick={close}>
            Close
        </button>
    </div>
  )
}

export default SwitchAccount