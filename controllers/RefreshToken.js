import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const refreshToken = async (req, res) => {
  try {
    // ابتدا از کوکی، اگر نبود از body می‌خوانیم (fallback برای Safari iOS که cross-site cookie را block می‌کند)
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return res.sendStatus(401);

    const user = await Users.findAll({
      where: {
        refresh_token: token,
      },
    });
    if (!user[0]) return res.sendStatus(403);

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const isAdmin = user[0].isAdmin;
        const accsessToken = jwt.sign(
          { userId, name, email, isAdmin },
          process.env.ACCSESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        res.json({ accsessToken });
      }
    );
  } catch (error) {
    console.log(`we have som error : 
        ${error}`);
  }
};
