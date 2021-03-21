import React, { useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { IconButton, Box, Tooltip } from "@material-ui/core"
import LikeButton from "./like_button"

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
    setSelected(true)
  }

  const onMouseOut = e => {
    setSelected(false)
  }

  const markdown = url.replace(props.regex, props.replace)
  const backgroundImage = "url(" + props.url + ")"
  const border = selected ? "2px solid #008cba" : "none"

  const likeStyle = {
    position: "absolute",
    right: "2%",
    top: "2%",
  }

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onFocus={onMouseOver}
      onBlur={onMouseOut}
      style={{ position: "relative" }}
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
      <Box style={likeStyle}>
        <LikeButton name={props.filename} />
      </Box>
    </Box>
  )
}
