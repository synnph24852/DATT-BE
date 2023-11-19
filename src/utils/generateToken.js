import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (data, expiresIn) => {
    const token = jwt.sign(data, process.env.PRIVATE_KEY, { expiresIn: expiresIn || "1h" });
    return token;
};

export default generateToken;
