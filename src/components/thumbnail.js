import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Slide, ToastContainer, toast } from "react-toastify"
import "./toastify/ReactToastify.css"
import ReactToolTip from "react-tooltip"
import { Grid } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import Image from "./image"
import Form from "./form"
import { SORT_MODE } from "./const"

function parseRegex(user_regex) {
  if (user_regex === undefined) {
    return undefined
  }
  var flags = user_regex.replace(/.*\/([gimy]*)$/, "$1")
  var pattern = user_regex.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1")
  return new RegExp(pattern, flags)
}

function getReplacer(pattern, replace) {
  return {
    regex: parseRegex(pattern) || /(.*)/,
    replace: replace || "![]($1)",
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function sortImages(edges, sortMode) {
  let nodes = [...edges]

  switch (sortMode) {
    case SORT_MODE.name:
      return nodes.sort(function (a, b) {
        return a.node.filename - b.node.filename
      })
    case SORT_MODE.lastused:
      const time = JSON.parse(localStorage.getItem("time")) || {}
      return nodes.sort(function (a, b) {
        const d =
          (time[b.node.filename] || "0") - (time[a.node.filename] || "0")
        return d
      })
    case SORT_MODE.random:
      return shuffle(nodes)
    default:
  }
}

function filterImages(data, keyword, large) {
  return data
    .filter(({ node }, index) => {
      if (keyword === "") {
        return true
      } else {
        return node.relativePath.includes(keyword)
      }
    })
    .filter(({ node }, index) => {
      if (large) {
        return node.attr === "large"
      } else {
        return node.attr === "small"
      }
    })
}

function pageImages(nodes, pageId, pageSize) {
  const pages = Math.ceil(nodes.length / pageSize)
  const page = Math.max(Math.min(pageId, pages + 1), 1)
  const min = (page - 1) * pageSize
  const max = page * pageSize - 1

  const filtered = nodes.filter(({ node }, index) => {
    if (index >= min && index <= max) {
      return true
    } else {
      return false
    }
  })

  return { nodes: filtered, pages, page }
}

const DEFAULT_PAGE_SIZE = 200
const DEFAULT_SORT_MODE = SORT_MODE.name

export default function Thumbnail(props) {
  const [state, setState] = useState({
    large: true,
    keyword: "",
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortMode: DEFAULT_SORT_MODE,
    nodes: [],
  })

  useEffect(() => {
    const pageSize = localStorage.getItem("pageSize") || DEFAULT_PAGE_SIZE
    const large = (localStorage.getItem("large") || "true") === "true"
    const sortMode = localStorage.getItem("sortMode") || DEFAULT_SORT_MODE
    setState(state => ({ ...state, pageSize, large, sortMode }))
  }, [])

  const data = useStaticQuery(graphql`
    query {
      allStamp {
        edges {
          node {
            attr
            filename
            relativePath
          }
        }
      }
    }
  `)
  const edges = data.allStamp.edges

  useEffect(() => {
    const sorted = sortImages(edges, state.sortMode)
    const filtered = filterImages(sorted, state.keyword, state.large)
    setState(state => ({ ...state, nodes: filtered }))
  }, [state.sortMode, state.keyword, state.large, edges])

  const onChange = event => {
    localStorage.setItem(event.name, event.value)
    setState({ ...state, [event.name]: event.value, page: 1 })
  }

  const onClickShuffle = event => {
    const nodes = shuffle(state.nodes)
    setState({ ...state, nodes })
  }

  const onClickSearch = () => {
    setState({ ...state, page: 1 })
  }

  const onPageChange = (event, page) => {
    setState({ ...state, page })
  }

  const onImageCopy = name => {
    const time = JSON.parse(localStorage.getItem("time")) || {}
    time[name] = Date.now().toString()
    localStorage.setItem("time", JSON.stringify(time))
    toast.info("Copied " + name, { autoClose: 2000 })
  }

  const { nodes, pages, page } = pageImages(
    state.nodes,
    state.page,
    state.pageSize
  )

  const { regex, replace } = state.large
    ? getReplacer(
        process.env.THUMBNAIL_IMAGE_LARGE_MATCH,
        process.env.THUMBNAIL_IMAGE_LARGE_MATCH_REPLACE
      )
    : getReplacer(
        process.env.THUMBNAIL_IMAGE_SMALL_MATCH,
        process.env.THUMBNAIL_IMAGE_SMALL_MATCH_REPLACE
      )

  const withShuffle = state.sortMode === SORT_MODE.random

  return (
    <Grid container alignItems="center" direction="column" spacing={4}>
      <Grid item>
        <Form
          large={state.large}
          pageSize={state.pageSize}
          sortMode={state.sortMode}
          shuffleButton={withShuffle}
          onChange={onChange}
          onClickShuffle={onClickShuffle}
          onClickSearch={onClickSearch}
        />
      </Grid>
      <Grid item>
        <Pagination
          count={pages}
          page={page}
          variant="outlined"
          color="primary"
          onChange={onPageChange}
        />
      </Grid>
      <ToastContainer
        transition={Slide}
        position="top-right"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Grid item container spacing={1}>
        {nodes.map(({ node }, index) => (
          <Grid item key={index}>
            <Image
              url={props.base + node.relativePath}
              filename={node.filename}
              regex={regex}
              replace={replace}
              onCopy={onImageCopy}
            />
          </Grid>
        ))}
      </Grid>
      <ReactToolTip delayShow={500} />
    </Grid>
  )
}
