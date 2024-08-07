// Generate a random token
 export default function generateToken(length = 8, count = 1) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokens = [];

  for (let i = 0; i < count; i++) {
    let token = "";
    for (let j = 0; j < length; j++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    tokens.push(token);
  }

  return tokens;
}

