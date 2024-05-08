import crypto from "crypto";

export default function encrypt(plain) {
  const algorithm = "aes-256-cbc";
  const pass = process.env.SALT || "3mLn2Tm8rKCdlvAPsk7KX0SqanacjlfJ";
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, pass, iv);
  let encrypted = cipher.update(plain, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}
