import React, { useState, useEffect } from "react"
import Thumbnail from "../components/thumbnail"
import { Helmet } from "react-helmet"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { ThemeContext } from "../theme"

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
})

export default function Home() {
  const [base, setBase] = useState(process.env.THUMBNAIL_IMAGE_BASE_URL)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setDarkMode(
      darkMode => localStorage.getItem("darkMode") === "true" || false
    )
    setBase(base => base || window.location.href)
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  return (
    <div>
      <ThemeContext.Provider value={[darkMode, setDarkMode]}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Helmet>
            <title>{process.env.THUMBNAIL_TITLE || "Thumbnail"}</title>
          </Helmet>
          <Thumbnail base={base} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  )
}
