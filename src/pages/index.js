import * as React from "react"
import { navigate } from "gatsby"

const IndexPage = () => {
  React.useEffect(() => {
    navigate("/welcome/")
  }, [])

  return null
}

export default IndexPage
