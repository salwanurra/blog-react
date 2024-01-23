import jwt from "jsonwebtoken"
import { db } from "../db.js"


export const updateProfile = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        // const userId = req.params.id
        const q = "UPDATE users SET `username`=?, `email`=?, `job`=?, `desc`=? WHERE `id` = ?"
        const values = [
            req.body.username,
            req.body.email,
            // userInfo.password,
            // userInfo.img,
            req.body.job,
            req.body.desc,
        ]

        db.query(q, [...values, req.params.id], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("Profile has been updated.")
        })
    })
}