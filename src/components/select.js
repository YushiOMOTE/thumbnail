import React from "react"
import { FormControl, InputLabel, Select as UiSelect } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  select: {
    width: "100%",
  },
}))

export default function Select(props) {
  const classes = useStyles()

  return (
    <FormControl className={classes.root}>
      <InputLabel>{props.label}</InputLabel>
      <UiSelect
        className={classes.select}
        label={props.label}
        value={props.value}
        color="primary"
        onChange={e => {
          props.onChange(e.target.value)
        }}
      >
        {props.children}
      </UiSelect>
    </FormControl>
  )
}
