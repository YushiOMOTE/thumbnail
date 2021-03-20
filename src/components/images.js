import React, { useState, useEffect } from "react"

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

  return { filtered, pages, page }
}

export default function Images({ nodes, pageId, pageSize, onChange }) {
  const { filtered, pages, page } = pageImages(nodes, pageId, pageSize)

  return (
    <Grid container>
      <Grid item>
        <Pagination
          count={pages}
          page={page}
          variant="outlined"
          color="primary"
          onChange={(_, page) => onChange(page)}
        />
      </Grid>
      <Grid item container spacing={1}>
        {filtered.map(({ node }, index) => (
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
    </Grid>
  )
}
