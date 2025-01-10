import AuthService from "../services/auth.service.js"


const authServiceInstance = new AuthService()

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const { user, token } = await authServiceInstance.signUp({ email, password, firstName, lastName })

        res.status(201).json({
            message: "User registered successfully",
            // user,
            token,
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to sign up",
            error: error.message,
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const { user, token } = await authServiceInstance.login({ email, password })
        res.status(200).json({
            message: "User logged in successfully",
            user,
            token,
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to login",
            error: error.message,
        });
    }
}

export default { signup, login }