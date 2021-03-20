import React from "react"
import { Grid, Button, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SearchBar from "./search_bar"
import Switch from "./switch"
import Select from "./select"
import { SORT_MODE } from "./const"

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    margin: 4,
  },
  searchBar: {
    width: 600,
  },
  pageSize: {
    width: 80,
  },
  sortMode: {
    width: 120,
  },
}))

export default function Form(props) {
  const classes = useStyles()

  const sizeSwitchEnabled =
    (process.env.THUMBNAIL_IMAGE_SMALL_ENABLE || "0") !== "0"

  const sizeSwitch = sizeSwitchEnabled && (
    <Grid item>
      <Switch
        checked={props.large}
        onChange={checked => {
          props.onChange({ name: "large", value: checked })
        }}
      />
    </Grid>
  )

  return (
    <Grid container spacing={2} direction="column" className={classes.root}>
      {sizeSwitch}

      <Grid item>
        <SearchBar
          onChange={keyword => {
            props.onChange({ name: "keyword", value: keyword })
          }}
          onClickSearch={props.onClickSearch}
        />
      </Grid>

      <Grid item container spacing={2} alignItems="center">
        <Grid item className={classes.pageSize}>
          <Select
            label="PageSize"
            value={props.pageSize}
            onChange={pageSize => {
              props.onChange({ name: "pageSize", value: pageSize })
            }}
          >
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={400}>400</MenuItem>
          </Select>
        </Grid>

        <Grid item className={classes.sortMode}>
          <Select
            label="Sort"
            value={props.sortMode}
            onChange={sortMode => {
              props.onChange({ name: "sortMode", value: sortMode })
            }}
          >
            <MenuItem value={SORT_MODE.name}>Name</MenuItem>
            <MenuItem value={SORT_MODE.lastused}>LastUsed</MenuItem>
            <MenuItem value={SORT_MODE.random}>Random</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Button
            disabled={!props.shuffleButton}
            variant="contained"
            color="secondary"
            onClick={e => {
              props.onClickShuffle()
            }}
          >
            Shuffle
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
