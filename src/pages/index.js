import React, { useState, useEffect } from "react"
import Thumbnail from "../components/thumbnail"
import { Helmet } from "react-helmet"
import "./index.css"

export default function Home() {
  const [base, setBase] = useState(process.env.THUMBNAIL_IMAGE_BASE_URL)

  useEffect(() => {
    setBase(base => base || window.location.href)
  }, [])

  return (
    <div>
      <Helmet>
        <title>{process.env.THUMBNAIL_TITLE || "Thumbnail"}</title>
      </Helmet>
      <Thumbnail base={base} />
    </div>
  )
}
