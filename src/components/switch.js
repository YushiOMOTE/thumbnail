import React from "react"
import { Typography, Grid, Switch as UiSwitch } from "@material-ui/core"

export default function Switch(props) {
  return (
    <Typography component="div">
      <Grid container spacing={1} alignItems="center">
        <Grid item>{props.off}</Grid>
        <Grid item>
          <UiSwitch
            checked={props.checked}
            onChange={e => {
              props.onChange(e.target.checked)
            }}
            color="primary"
          />
        </Grid>
        <Grid item>{props.on}</Grid>
      </Grid>
    </Typography>
  )
}
