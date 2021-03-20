import React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import Tooltip from "@material-ui/core/Tooltip"

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
  const url = removeExtraSlash(props.url)

  const onMouseOver = e => {
    e.currentTarget.style.border = "2px solid #008cba"
  }

  const onMouseOut = e => {
    e.currentTarget.style.border = "none"
  }

  const markdown = url.replace(props.regex, props.replace)

  return (
    <Tooltip title={props.filename}>
      <CopyToClipboard
        text={markdown}
        onCopy={() => props.onCopy(props.filename)}
      >
        <button
          style={{ ...style, backgroundImage: "url(" + props.url + ")" }}
          aria-label="copy"
          data-tip={props.filename}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onFocus={onMouseOver}
          onBlur={onMouseOut}
        />
      </CopyToClipboard>
    </Tooltip>
  )
}
