import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/user.js"
import nodemailer from "nodemailer"

const otpStorage = new Map()

export async function SignUp(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !password || !email || !confirmPassword) {
      res.json(404).json({ message: "All the fields must be filled in order to continue furthur" })
    }

    if (password != confirmPassword) {
      return res.status(404).json({ message: "Password doesnt match" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage.set(email, {
      otp,
      name,
      email,
      hashedPassword
    })


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: '"convo_chat" <Convoo-chat@gmail.com>',
      to: email,
      subject: "Verify OTP to continue",
      text: "Your OTP is :<br> ", // Plain-text version of the message
      html: `<div style="
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    ">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="400" cellpadding="0" cellspacing="0" style="
              background: #ffffff;
              border-radius: 8px;
              padding: 20px;
            ">
              <tr>
                <td style="text-align: center;">
                  <h2 style="color: #333;">Billing System</h2>
                  <p style="color: #555; font-size: 14px;">
                    Your OTP is
                  </p>

                  <div style="
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    background: #f0f4ff;
                    padding: 12px 20px;
                    border-radius: 6px;
                    color: #1a73e8;
                    display: inline-block;
                  ">
                    ${otp}
                  </div>
                   <p style="
                    margin-top: 20px;
                    color: #777;
                    font-size: 12px;
                  ">
                    This OTP is valid for 5 minutes.
                  </p>

                  <p style="
                    margin-top: 10px;
                    color: #999;
                    font-size: 11px;
                  ">
                    Please do not share this OTP with anyone.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`, // HTML version of the message
    });

    return res.status(200).json({ message: "OTP sent successfully" })

  } catch (err) {
    return res.status(500).json({ message: err })
  }
}


export async function VerifyOtp(req, res) {
  try {
    const { email, otp } = req.body
    const sentOTP = otpStorage.get(email)

    if (!sentOTP) {
      return res.status(400).json({ message: "OTP expired or invalid email" });
    }

    if (sentOTP.otp === otp) {
      await userModel.create({
        name: sentOTP.name,
        email: sentOTP.email,
        password: sentOTP.hashedPassword
      })

      const user = await userModel.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "User not created" })
      }
      const token = jwt.sign({ email, id: user._id.toString() }, process.env.JWT_SECRET,{expiresIn:"7d"})
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
      })
      otpStorage.delete(email);
      return res.status(200).json({ message: "User created successfully" })

    }
    else {
      return res.status(404).json({ message: "OTP doesnt match" })
    }
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export async function SignIn(req, res) {
  try {
    const { email, password } = req.body
    const ExistingUser = await userModel.findOne({ email })
    if (!ExistingUser) {
      return res.status(400).json({ message: "Incorrect Email or Password" })
    }
    const isMatch = await bcrypt.compare(password, ExistingUser.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Email or Password" })
    }
    const token = jwt.sign({ email, id: ExistingUser._id.toString() }, process.env.JWT_SECRET,{ expiresIn: "7d" })
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict"
    })
    return res.status(200).json({ message: "Sign In complete" })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}