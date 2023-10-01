export const generateUserID = (lastUserID: number) => {
  if (!lastUserID) {
    lastUserID = 1
  } else {
    lastUserID++
  }

  return String(lastUserID).padStart(5, '0')
}
