import React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

function removeExtraSlash(s) {
  return s.replace(/([^:]\/)\/+/g, "$1")
}

export default function Image(props) {
  var url = removeExtraSlash(props.url)

  var style = {
    width: "100px",
    height: "100px",
    backgroundImage: "url(" + url + ")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "transparent",
    borderRadius: "10%",
    border: "none",
    outline: "none",
  }

  const onMouseOver = e => {
    e.currentTarget.style.border = "2px solid #008cba"
  }

  const onMouseOut = e => {
    e.currentTarget.style.border = "none"
  }

  var markdown = url.replace(props.regex, props.replace)

  return (
    <CopyToClipboard
      text={markdown}
      onCopy={() => props.onCopy(props.filename)}
    >
      <button
        aria-label="copy"
        data-tip={props.filename}
        style={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onFocus={onMouseOver}
        onBlur={onMouseOut}
      />
    </CopyToClipboard>
  )
}
