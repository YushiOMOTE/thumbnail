import React, { useContext } from "react"
import {
  Grid,
  Button,
  MenuItem,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SearchBar from "./search_bar"
import Switch from "./switch"
import Select from "./select"
import { SORT_MODE } from "./const"
import { ThemeContext } from "../theme"
import Brightness4Icon from "@material-ui/icons/Brightness4"

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
        off="Small"
        on="Large"
        checked={props.large}
        onChange={checked => {
          props.onChange({ name: "large", value: checked })
        }}
      />
    </Grid>
  )

  const [darkMode, setDarkMode] = useContext(ThemeContext)

  return (
    <Grid container spacing={2} direction="column" className={classes.root}>
      <Grid item container spacing={2} alignItems="center">
        {sizeSwitch}

        <Grid item xs={7} />
        <Grid item xs={1}>
          <IconButton
            type="submit"
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          >
            <Brightness4Icon />
          </IconButton>
        </Grid>
      </Grid>

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
            color="primary"
            onClick={e => {
              props.onClickShuffle()
            }}
          >
            Shuffle
          </Button>
        </Grid>

        <Grid item>
          <FormControlLabel
            label="Favorite"
            control={
              <Checkbox
                label="Likes"
                checked={props.likes}
                color="secondary"
                onChange={event => {
                  props.onChange({ name: "likes", value: event.target.checked })
                }}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
