import React from "react"
import { makeStyles } from "@material-ui/core"
import { Paper, InputBase, Divider, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function SearchBar(props) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "Search" }}
        onChange={e => {
          props.onChange(e.target.value)
        }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        type="submit"
        aria-label="search"
        onClick={props.onClickSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
