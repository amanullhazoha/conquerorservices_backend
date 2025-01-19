const emailVerifyMailForApplicant = ({ email, user_name, otp, message }) => {
  return {
    from: process.env.EMAIL_SENDER_ACCOUNT,
    to: email,
    text: message,
    subject: "Email verification for applicant",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Template</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fff;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              margin: 0;
              padding: 0;
            }

            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #f9fafb;
              padding: 24px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
            }
            .email-header img {
              max-width: 150px;
            }
            .email-body {
              padding: 16px;
              margin-top: 20px;
              border-radius: 16px;
              background: #ffffff;
            }
            .email-body h2 {
              font-size: 30px;
              font-weight: 700;
              color: #111928;
              margin-top: 0;
              text-align: center;
              margin-bottom: 32px;
            }

            .email-body p {
              font-size: 16px;
              font-weight: 400;
              color: #374151;
              line-height: 24px;
            }

            .otp {
              width: 100%;
              padding: 24px 0;
              text-align: center;
            }

            .otp p {
              text-align: center;
              font-size: 30px;
              font-weight: 700;
              color: #ff5a1f;
              display: inline-block;
              margin: 0 8px;
            }

            .otp-title {
              font-weight: 600;
              font-size: 14px;
              color: #111928;
              cursor: pointer;
            }

            .copy-code {
              font-weight: 600;
              font-size: 14px;
              color: #00a8ff;
              cursor: pointer;
            }

            .support-text {
              font-size: 14px;
              color: #666;
            }

            .email-footer {
              text-align: center;
              margin-top: 32px;
            }

            .email-footer h3 {
              text-align: center;
              margin-top: 30px;
              color: #374151;
              font-size: 20px;
              font-weight: 700;
            }

            .email-footer .link {
              color: #374151;
              font-size: 14px;
              font-weight: 600;
            }

            .social-icons {
              gap: 16px;
              display: flex;
              margin: 20px 0 32px 0;
              justify-content: center;
            }
            .social-icons img {
              width: 30px;
              margin: 0 5px;
            }
            .email-footer .address {
              margin-top: 15px;
            }
          </style>
        </head>

        <body>
          <div class="email-container">
            <div class="email-header">
              <img src="https://capi.conquerror.com/images/conqueror_logo.png" alt="Conqueror Services L.L.C" />
            </div>

            <div class="email-body">
              <h2>Use this code to verify your email</h2>
              <p>Dear ${user_name},</p>
              <p>
                We have received a request to access your account. To complete the
                process, please use the following One-Time Password (OTP) to proceed:
              </p>

              <div class="otp">
                <span class="otp-title">Your OTP:</span>

                <p id="otp-code">${otp}</p>

                <span class="copy-code" onclick="copyToClipboard()">Copy Code</span>
              </div>

              <p class="support-text">
                This OTP is valid for the next 3 minutes. If you did not request this,
                please contact our support team immediately.
              </p>

              <p>Thank you for using our services.</p>

              <p style="margin-top: 24px">
                Best regards,<br />Conqueror Services Support Team
              </p>
            </div>

            <div class="email-footer">
              <h3>CONNECT WITH</h3>

              <div class="social-icons">
                <a href="https://www.facebook.com"  style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/Facebook.png" alt="facebook" />
                </a>

                <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/instagram.png" alt="instagram" />
                </a>

                <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/linkedin.png" alt="linkedin" />
                </a>

                <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/youtube.png" alt="youtube" />
                </a>

                <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/facebookA_icon.png" alt="facebook" />
                </a>

                <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/telegram.png" alt="telegram" />
                </a>

                <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/whatsapp.png" alt="whatsapp" />
                </a>

                <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/viber.png" alt="viber" />
                </a>
              </div>

              <p style="margin-bottom: 16px">
                <a href="#" class="link">Homepage</a> |
                <a href="#" class="link">Help Center</a> |
                <a href="#" class="link">Forgot your password?</a>
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                You're receiving this email because you're a valued member of
                Conqueror Services.
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 8px;
                "
              >
                If you'd prefer not to receive marketing emails, you can
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                <a href="#" style="color: #374151">unsubscribe here</a>.
              </p>

              <p style="font-size: 14px; font-weight: 500; color: #374151">
                Have questions? Read our
                <a href="#" style="color: #374151">Privacy Policy</a>
                or Terms of Use,
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                or visit the <a href="#" style="color: #374151">Help Center</a> or
                <a href="#" style="color: #374151">+97142837636</a> for assistance.
              </p>

              <div >
                <p style="font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 8px;"></p>
                  Conqueror Services L.L.C
                </p>

                <p style="font-size: 14px; font-weight: 600; color: #374151">City Pharmacy Bld, Port Saeed, Dubai</p>
              </div>
            </div>
          </div>

          <script>
            function copyToClipboard() {
              const otpCode = document.getElementById('otp-code').innerText;
  
              const tempInput = document.createElement('textarea');
              tempInput.value = otpCode;
              document.body.appendChild(tempInput);
  
  
              tempInput.select();
              tempInput.setSelectionRange(0, 99999);
  
              document.execCommand('copy');
  
              document.body.removeChild(tempInput);
            }
          </script>
        </body>
      </html>
    `,
  };
};

const verifySuccessMail = ({ email, user_name, message }) => {
  return {
    from: process.env.EMAIL_SENDER_ACCOUNT,
    text: message,
    to: email,
    subject: `${user_name} successfully verified`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Template</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fff;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              margin: 0;
              padding: 0;
            }

            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #f9fafb;
              padding: 24px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
            }
            .email-header img {
              max-width: 150px;
            }
            .email-body {
              padding: 16px;
              margin-top: 20px;
              border-radius: 16px;
              background: #ffffff;
            }
            .email-body h2 {
              font-size: 30px;
              font-weight: 700;
              color: #111928;
              margin-top: 0;
              text-align: center;
              margin-bottom: 32px;
            }

            .email-body p {
              font-size: 16px;
              font-weight: 400;
              color: #374151;
              line-height: 24px;
            }

            .otp {
              margin: 16px 0;
              border: 1px solid #F3F4F6;
              padding: 24px 0;
              /* display: flex; */
              /* gap: 12px; */
              border-radius: 16px;
              /* justify-content: space-between; */
              /* align-items: center; */
            }

            .otp p {
              text-align: center;
              font-size: 30px;
              font-weight: 700;
              color: #ff5a1f;
            }

            .otp-title {
              font-weight: 600;
              font-size: 14px;
              color: #111928;
              cursor: pointer;
            }

            .copy-code {
              font-weight: 600;
              font-size: 14px;
              color: #00a8ff;
              cursor: pointer;
            }

            .support-text {
              font-size: 14px;
              color: #666;
            }

            .email-footer {
              text-align: center;
              margin-top: 32px;
            }

            .email-footer h3 {
              text-align: center;
              margin-top: 30px;
              color: #374151;
              font-size: 20px;
              font-weight: 700;
            }

            .email-footer .link {
              color: #374151;
              font-size: 14px;
              font-weight: 600;
            }

            .social-icons {
              gap: 16px;
              display: flex;
              margin: 20px 0 32px 0;
              justify-content: center;
            }
            .social-icons img {
              width: 30px;
              margin: 0 5px;
            }
            .email-footer .address {
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <img src="https://capi.conquerror.com/images/conqueror_logo.png" alt="Conqueror Services L.L.C" />
            </div>

            <div class="email-body">
              <h2>Verification Successful - Access Your PDF Now</h2>
              <p>Dear ${user_name},</p>
              <p>
                  Congratulations! Your account verification was successful. We’re excited to have you on board.
              </p>
              <p>
                  As a part of the process, attached is your requested PDF document. Please download it below:
              </p>

              <div class="otp">
                <div style="display: inline-block; width: 100%; margin: auto 0;">
                  <div style="display: inline-block; text-align: left; width: 74%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="40px" viewBox="0 0 384 512"><path fill="#344054" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9c8.4 0 7.6 36.9 2 46.9m-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7c18.3-7 39-17.2 62.9-21.9c-12.7-9.6-24.9-23.4-34.5-40.8M86.1 428.1c0 .8 13.2-5.4 34.9-40.2c-6.7 6.3-29.1 24.5-34.9 40.2M248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24m-8 171.8c-20-12.2-33.3-29-42.7-53.8c4.5-18.5 11.6-46.6 6.2-64.2c-4.7-29.4-42.4-26.5-47.8-6.8c-5 18.3-.4 44.1 8.1 77c-11.6 27.6-28.7 64.6-40.8 85.8c-.1 0-.1.1-.2.1c-27.1 13.9-73.6 44.5-54.5 68c5.6 6.9 16 10 21.5 10c17.9 0 35.7-18 61.1-61.8c25.8-8.5 54.1-19.1 79-23.2c21.7 11.8 47.1 19.5 64 19.5c29.2 0 31.2-32 19.7-43.4c-13.9-13.6-54.3-9.7-73.6-7.2M377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9m-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9c37.1 15.8 42.8 9 42.8 9"/></svg>

                    <div style="display: inline-block;">
                      <p style="font-size: 14px; font-weight: 500; color: #344054;">User_Application.pdf</p>
                      <p style="font-size: 14px; font-weight: 400; color: #344054; text-align: left;">200 KB</p>
                    </div>
                  </div>

                  <div style="text-align: right; display: inline-block; width: 25%;">
                    <a href="https://capi.conquerror.com/images/test.pdf" target="_blank" download class="copy-code" style="text-decoration: none; display: flex; gap: 6px; align-items: center; padding: 6px 15px; background: #00a8ff; color: white; border-radius: 50px; border: 4px solid #C3DDFD">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                      <span>Download</span>
                    </a>
                  </div>
                </div>

              </div>

              <p class="support-text">
                  Feel free to reach out if you have any questions or need further assistance.
              </p>

              <p>Thank you for choosing Conquerorservices 🧡</p>

              <p style="margin-top: 24px">
                Best regards,<br />Conqueror Services Support Team
              </p>
            </div>

            <div class="email-footer">
              <h3>CONNECT WITH</h3>

              <div class="social-icons">
                <a href="https://www.facebook.com"  style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/Facebook.png" alt="facebook" />
                </a>

                <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/instagram.png" alt="instagram" />
                </a>

                <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/linkedin.png" alt="linkedin" />
                </a>

                <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/youtube.png" alt="youtube" />
                </a>

                <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/facebookA_icon.png" alt="facebook" />
                </a>

                <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/telegram.png" alt="telegram" />
                </a>

                <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                 <img src="https://capi.conquerror.com/images/whatsapp.png" alt="whatsapp" />
                </a>

                <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/viber.png" alt="viber" />
                </a>
              </div>

              <p style="margin-bottom: 16px">
                <a href="#" class="link">Homepage</a> |
                <a href="#" class="link">Help Center</a> |
                <a href="#" class="link">Forgot your password?</a>
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                You're receiving this email because you're a valued member of
                Conqueror Services.
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 8px;
                "
              >
                If you'd prefer not to receive marketing emails, you can
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                <a href="#" style="color: #374151">unsubscribe here</a>.
              </p>

              <p style="font-size: 14px; font-weight: 500; color: #374151">
                Have questions? Read our
                <a href="#" style="color: #374151">Privacy Policy</a>
                or Terms of Use,
              </p>

              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                "
              >
                or visit the <a href="#" style="color: #374151">Help Center</a> or
                <a href="#" style="color: #374151">+97142837636</a> for assistance.
              </p>

              <div >
                <p style="font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 8px;"></p>
                  Conqueror Services L.L.C
                </p>

                <p style="font-size: 14px; font-weight: 600; color: #374151">City Pharmacy Bld, Port Saeed, Dubai</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

const sendPasswordResetEmail = ({ to, token }) => {
  const resetLink = `${process.env.FRONTEND_PORTAL_BASE_URL}/forgot-password?token=${token}&step=2 `;

  const mailOptions = {
    from: process.env.EMAIL_SENDER_ACCOUNT,
    to: to,
    text: "Password Reset Request",
    subject: "Password Reset Request",
    html: `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Template</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
            margin: 0;
            padding: 0;
            }

            .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #f9fafb;
            padding: 24px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
            text-align: center;
            }
            .email-header img {
            max-width: 150px;
            }
            .email-body {
            padding: 16px;
            margin-top: 20px;
            border-radius: 16px;
            background: #ffffff;
            }
            .email-body h2 {
            font-size: 30px;
            font-weight: 700;
            color: #111928;
            margin-top: 0;
            text-align: center;
            margin-bottom: 32px;
            }

            .email-body p {
            font-size: 16px;
            font-weight: 400;
            color: #374151;
            line-height: 24px;
            }

            .support-text {
            font-size: 14px;
            color: #666;
            }

            .email-footer {
            text-align: center;
            margin-top: 32px;
            }

            .email-footer h3 {
            text-align: center;
            margin-top: 30px;
            color: #374151;
            font-size: 20px;
            font-weight: 700;
            }

            .email-footer .link {
            color: #374151;
            font-size: 14px;
            font-weight: 600;
            }

            .social-icons {
            gap: 16px;
            display: flex;
            margin: 20px 0 32px 0;
            justify-content: center;
            }
            .social-icons img {
            width: 30px;
            margin: 0 5px;
            }
            .email-footer .address {
            margin-top: 15px;
            }
        </style>
        </head>
        <body>
        <div class="email-container">
            <div class="email-header">
            <img src="https://capi.conquerror.com/images/conqueror_logo.png" alt="Conqueror Services L.L.C" />
            </div>

            <div class="email-body">
            <h2>Reset Your Password</h2>
            <p>Dear ${user_name},</p>
            <p>
                We’ve received a request to reset your password for your account on Conqueror Services. Click the link below to create a new password:
            </p>

            <div style="text-align: center; display: inline-block; width: 100%; padding-top: 20px; padding-bottom: 20px;">
                <a href="${resetLink}" target="_blank" download class="copy-code" style="text-decoration: none; text-align: center; padding: 8px 15px; background: #C81E1E; color: white; border-radius: 6px;">
                <img src="https://capi.conquerror.com/images/Key.png" alt="Key" />
                <span>Rest My Password</span>
                </a>
            </div>


            <p class="support-text">
                If you didn’t request this, please ignore this email or contact our <a href="/" style="text-decoration: none;">Support Team</a>.
            </p>

            <p>We’re here to ensure your account stays safe!</p>

            <p style="margin-top: 24px">
                Best regards,<br />Conqueror Services Support Team
            </p>
            </div>

            <div class="email-footer">
            <h3>CONNECT WITH</h3>

            <div class="social-icons">
                <a href="https://www.facebook.com"  style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/Facebook.png" alt="facebook" />
                </a>

                <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/instagram.png" alt="instagram" />
                </a>

                <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/linkedin.png" alt="linkedin" />
                </a>

                <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/youtube.png" alt="youtube" />
                </a>

                <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/facebookA_icon.png" alt="facebook" />
                </a>

                <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/telegram.png" alt="telegram" />
                </a>

                <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/whatsapp.png" alt="whatsapp" />
                </a>

                <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                <img src="https://capi.conquerror.com/images/viber.png" alt="viber" />
                </a>
            </div>

            <p style="margin-bottom: 16px">
                <a href="#" class="link">Homepage</a> |
                <a href="#" class="link">Help Center</a> |
                <a href="#" class="link">Forgot your password?</a>
            </p>

            <p
                style="
                font-size: 14px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 16px;
                "
            >
                You're receiving this email because you're a valued member of
                Conqueror Services.
            </p>

            <p
                style="
                font-size: 14px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 8px;
                "
            >
                If you'd prefer not to receive marketing emails, you can
            </p>

            <p
                style="
                font-size: 14px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 16px;
                "
            >
                <a href="#" style="color: #374151">unsubscribe here</a>.
            </p>

            <p style="font-size: 14px; font-weight: 500; color: #374151">
                Have questions? Read our
                <a href="#" style="color: #374151">Privacy Policy</a>
                or Terms of Use,
            </p>

            <p
                style="
                font-size: 14px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 16px;
                "
            >
                or visit the <a href="#" style="color: #374151">Help Center</a> or
                <a href="#" style="color: #374151">+97142837636</a> for assistance.
            </p>

            <div >
                <p style="font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 8px;"></p>
                Conqueror Services L.L.C
                </p>

                <p style="font-size: 14px; font-weight: 600; color: #374151">City Pharmacy Bld, Port Saeed, Dubai</p>
            </div>
            </div>
        </div>
        </body>
    </html>
  `,
  };

  return mailOptions;
};

const oneTimePassword = ({ to, user_name, password }) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER_ACCOUNT,
    to: to,
    text: "One Time Password",
    subject: "One Time Password",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${user_name}</p>

        <p>Your one time password is : ${password}</p>
     
        <p>Thank you!</p>
      </div>
    `,
  };

  return mailOptions;
};

const interviewMeetingScheduled = ({ to, user_name, meeting_type, data }) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER_ACCOUNT,
    to: to,
    text: "Interview Meeting scheduled",
    subject: "Interview Meeting scheduled",
    // html: `
    //   <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    //     <h2 style="color: #333;">Password Reset Request</h2>
    //     <p>Hi ${user_name}</p>

    //     <p>Meeting Type : ${meeting_type}</p>

    //     ${
    //       meeting_type === "online"
    //         ? `
    //       <p>Meeting Time : ${data?.time}</p>
    //       <p>Meeting Data : ${data?.scheduled_at}</p>
    //       <p>Time Zone : ${data?.zonecountry}</p>
    //       <p>Zoom Link : ${data?.meetingurl}</p>
    //     `
    //         : `
    //       <p>Meeting Time : ${data?.time}</p>
    //       <p>Meeting Data : ${data?.scheduled_at}</p>
    //       <p>Time Zone : ${data?.zonecountry}</p>
    //       <p>Address : ${data?.address}</p>
    //       <p>State / Province : ${data?.state}</p>
    //       <p>City / District : ${data?.city}</p>
    //       <p>Police Station : ${data?.police_station}</p>
    //       <p>Post Office : ${data?.post_office}</p>
    //       <p>Required Document : ${data?.required_document}</p>
    //       `
    //     }

    //     <p>Meeting Type : ${data?.message}</p>

    //     <p>Thank you!</p>
    //   </div>
    // `,
    html: `
      <!DOCTYPE html>
      <html lang="en">
          <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Template</title>
          <style>
              body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fff;
              }

              h1,
              h2,
              h3,
              h4,
              h5,
              h6,
              p {
              margin: 0;
              padding: 0;
              }

              .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #f9fafb;
              padding: 24px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .email-header {
              text-align: center;
              }
              .email-header img {
              max-width: 150px;
              }
              .email-body {
              padding: 16px;
              margin-top: 20px;
              border-radius: 16px;
              background: #ffffff;
              }
              .email-body h2 {
              font-size: 30px;
              font-weight: 700;
              color: #111928;
              margin-top: 0;
              text-align: center;
              margin-bottom: 32px;
              }

              .email-body p {
              font-size: 16px;
              font-weight: 400;
              color: #374151;
              line-height: 24px;
              }

              .support-text {
              font-size: 14px;
              color: #666;
              }

              .email-footer {
              text-align: center;
              margin-top: 32px;
              }

              .email-footer h3 {
              text-align: center;
              margin-top: 30px;
              color: #374151;
              font-size: 20px;
              font-weight: 700;
              }

              .email-footer .link {
              color: #374151;
              font-size: 14px;
              font-weight: 600;
              }

              .social-icons {
              gap: 16px;
              display: flex;
              margin: 20px 0 32px 0;
              justify-content: center;
              }
              .social-icons img {
              width: 30px;
              margin: 0 5px;
              }
              .email-footer .address {
              margin-top: 15px;
              }
          </style>
          </head>
          <body>
          <div class="email-container">
              <div class="email-header">
              <img src="https://capi.conquerror.com/images/conqueror_logo.png" alt="Conqueror Services L.L.C" />
              </div>

              <div class="email-body">
              <h2>Your Interview Has Been Scheduled</h2>
              <p>Hi ${user_name},</p>

              <p>
                  We are excited to invite you for an interview for the [Job Title] position at Conqueror Services! Below are the details:
              </p>
                  
              <p style="margin-top: 20px; margin-bottom: 20px;">
                  <b>Date:</b> [Insert Date]<br />
                  <b>Time:</b> [Insert Time]<br />
                  <b>Location:</b> [Physical Address or Virtual Link]
              </p>

              <div style="text-align: center; display: inline-block; width: 100%; padding-top: 20px; padding-bottom: 20px;">
                  <a href="https://capi.conquerror.com/images/test.pdf" target="_blank" class="copy-code" style="text-decoration: none; text-align: center; padding: 8px 15px; background: #C81E1E; color: white; border-radius: 6px;">
                      <span>Cancel</span>
                  </a> 

                  <a href="https://capi.conquerror.com/images/test.pdf" target="_blank" class="copy-code" style="text-decoration: none; text-align: center; padding: 8px 15px; background: transparent; border: 1px solid #6B7280; color: black; border-radius: 6px; margin-left: 10px; margin-right: 10px;">
                      <img src="https://capi.conquerror.com/images/Key.png" alt="Key" />
                      <span>Re Schedule My Interview</span>
                  </a> 

                  <a href="https://capi.conquerror.com/images/test.pdf" target="_blank" class="copy-code" style="text-decoration: none; text-align: center; padding: 8px 15px; background: #046C4E; color: white; border-radius: 6px;">
                      <img src="https://capi.conquerror.com/images/Key.png" alt="Key" />
                      <span>Confirm My Interview</span>
                  </a> 
              </div>


              <p class="support-text">
                  If you have any concerns or specific requests, feel free to contact us at [email or phone number].
              </p>

              <p>We sincerely apologize for any inconvenience and appreciate your understanding.</p>

              <p style="margin-top: 24px">
                  Best regards,<br /> Recruitment Team <br /> Conqueror Services
              </p>
              </div>

              <div class="email-footer">
              <h3>CONNECT WITH</h3>

              <div class="social-icons">
                  <a href="https://www.facebook.com"  style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/Facebook.png" alt="facebook" />
                  </a>

                  <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/instagram.png" alt="instagram" />
                  </a>

                  <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/linkedin.png" alt="linkedin" />
                  </a>

                  <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/youtube.png" alt="youtube" />
                  </a>

                  <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/facebookA_icon.png" alt="facebook" />
                  </a>

                  <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/telegram.png" alt="telegram" />
                  </a>

                  <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/whatsapp.png" alt="whatsapp" />
                  </a>

                  <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                  <img src="https://capi.conquerror.com/images/viber.png" alt="viber" />
                  </a>
              </div>

              <p style="margin-bottom: 16px">
                  <a href="#" class="link">Homepage</a> |
                  <a href="#" class="link">Help Center</a> |
                  <a href="#" class="link">Forgot your password?</a>
              </p>

              <p
                  style="
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 16px;
                  "
              >
                  You're receiving this email because you're a valued member of
                  Conqueror Services.
              </p>

              <p
                  style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 8px;
                  "
              >
                  If you'd prefer not to receive marketing emails, you can
              </p>

              <p
                  style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                  "
              >
                  <a href="#" style="color: #374151">unsubscribe here</a>.
              </p>

              <p style="font-size: 14px; font-weight: 500; color: #374151">
                  Have questions? Read our
                  <a href="#" style="color: #374151">Privacy Policy</a>
                  or Terms of Use,
              </p>

              <p
                  style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 16px;
                  "
              >
                  or visit the <a href="#" style="color: #374151">Help Center</a> or
                  <a href="#" style="color: #374151">+97142837636</a> for assistance.
              </p>

              <div >
                  <p style="font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 8px;"></p>
                  Conqueror Services L.L.C
                  </p>

                  <p style="font-size: 14px; font-weight: 600; color: #374151">City Pharmacy Bld, Port Saeed, Dubai</p>
              </div>
              </div>
          </div>
          </body>
      </html>
    `,
  };

  return mailOptions;
};

module.exports = {
  oneTimePassword,
  verifySuccessMail,
  sendPasswordResetEmail,
  interviewMeetingScheduled,
  emailVerifyMailForApplicant,
};
