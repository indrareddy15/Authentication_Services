import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import generateJwtToken from "../utils/tokerService.js"


class AuthService {
    signUp = async (payload, res) => {
        const { email, password, firstName, lastName } = payload
        try {
            const hashedPwd = await bcrypt.hash(password, 10)
            const user = new User({ email, password: hashedPwd, firstName, lastName })

            const token = generateJwtToken(user._id, res)
            await user.save()
            return token
        } catch (error) {
            console.error('Failed to sign up:', error);
            throw error
        }
    }

    login = async (payload, res) => {
        const { email, password } = payload
        try {

            const user = await User.findOne({ email })
            if (!user) {
                throw new Error('User not found')
            }
            const isMatched = await bcrypt.compare(password, user.password)
            if (!isMatched) {
                throw new Error('Incorrect password');
            }
            const token = generateJwtToken(user._id, res);
            return { user, token };
        } catch (error) {
            console.error('Failed to login:', error);
            throw error
        }
    }
}


export default AuthService;