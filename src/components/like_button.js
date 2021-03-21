import React, { useState, useEffect } from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { IconButton } from "@material-ui/core"
import { storeLike, loadLike } from "./likes"

export default function LikeButton(props) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLiked(loadLike(props.name))
  }, [])

  useEffect(() => {
    storeLike(props.name, liked)
  }, [liked])

  const onClick = () => {
    setLiked(!liked)
  }

  return (
    <IconButton color="secondary" size="small" onClick={onClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
