function uuid(len: number) {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
  let uuid: any[] = []
  let radix = chars.length
  for (let i = 0; i < len; i++) {
    uuid[i] = chars[0 | (Math.random() * radix)]
  }
  return uuid.join("")
}

export function getCode() {
  return uuid(4) + "-" + uuid(4) + "-" + uuid(4) + "-" + uuid(4)
}
