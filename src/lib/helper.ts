import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {

    const hash = await bcrypt.hash(password, 10)

    return hash
}

export const comparePassword = async (password: string, hash: string) => {

    const check = await bcrypt.compare(password, hash)

    return check
}