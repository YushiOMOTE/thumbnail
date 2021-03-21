export function loadLike(name) {
  return localStorage.getItem(`like:${name}`) === "true"
}

export function storeLike(name, liked) {
  localStorage.setItem(`like:${name}`, liked)
}
