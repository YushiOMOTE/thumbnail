import React, { useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { IconButton, Box, Tooltip } from "@material-ui/core"

const style = {
  width: "100px",
  height: "100px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "transparent",
  borderRadius: "10%",
  border: "none",
  outline: "none",
}

function removeExtraSlash(s) {
  return s.replace(/([^:]\/)\/+/g, "$1")
}

export default function Image(props) {
  const [selected, setSelected] = useState(false)
  const url = removeExtraSlash(props.url)

  const onMouseOver = e => {
    console.log("Over")
    setSelected(true)
  }

  const onMouseOut = e => {
    console.log("Out")
    setSelected(false)
  }

  const markdown = url.replace(props.regex, props.replace)
  const backgroundImage = "url(" + props.url + ")"
  const border = selected ? "2px solid #008cba" : "none"

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onFocus={onMouseOver}
      onBlur={onMouseOut}
    >
      <CopyToClipboard
        text={markdown}
        onCopy={() => props.onCopy(props.filename)}
      >
        <Tooltip title={props.filename}>
          <IconButton
            style={{ ...style, backgroundImage, border }}
            aria-label="copy"
            data-tip={props.filename}
          />
        </Tooltip>
      </CopyToClipboard>
    </Box>
  )
}
