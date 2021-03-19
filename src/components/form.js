import React from "react"
import {
  Grid,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Button,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { SORT_MODE } from "./const"

export default function Form(props) {
  const sizeSwitchEnabled =
    (process.env.THUMBNAIL_IMAGE_SMALL_ENABLE || "0") !== "0"

  const sizeSwitch = sizeSwitchEnabled && (
    <Grid item container component="label" spacing={1} alignItems="center">
      <Grid item>Small</Grid>
      <Grid item>
        <Switch
          checked={props.large}
          onChange={e => {
            props.onChange({ name: "large", value: e.target.checked })
          }}
          color="primary"
        />
      </Grid>
      <Grid item>Large</Grid>
    </Grid>
  )

  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      {sizeSwitch}
      <Grid item>
        <Paper
          style={{
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            style={{ width: 500, merginLeft: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
            onChange={e => {
              props.onChange({ name: "keyword", value: e.target.value })
            }}
          />
          <Divider style={{ height: 28, margin: 4 }} orientation="vertical" />
          <IconButton
            style={{ padding: 10 }}
            type="submit"
            aria-label="search"
            onClick={props.onClickSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item container spacing={2} alignItems="center">
        <Grid item>PageSize</Grid>
        <Grid item>
          <Select
            style={{ width: 80 }}
            variant="outlined"
            defaultValue={50}
            value={props.pageSize}
            onChange={e => {
              props.onChange({ name: "pageSize", value: e.target.value })
            }}
          >
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={400}>400</MenuItem>
          </Select>
        </Grid>
        <Grid item>Sort</Grid>
        <Grid item>
          <Select
            style={{ width: 150 }}
            variant="outlined"
            value={props.sortMode}
            onChange={e => {
              props.onChange({ name: "sortMode", value: e.target.value })
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
