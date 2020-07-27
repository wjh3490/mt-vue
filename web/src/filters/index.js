export function filterNum (res) {
  if (res > 99) {
    res = 99 + '+'
  }
  return res
}
