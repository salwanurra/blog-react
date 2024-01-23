import express from "express"
import { updateProfile } from "../controllers/user.js"

const router = express.Router()
router.put("/edit/:id/:username", updateProfile)

export default router