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
              padding: 24px 0;
              display: flex;
              gap: 12px;
              justify-content: center;
              align-items: center;
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
                </a>
                <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
                </a>
                <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8 10a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1m3-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-3.66c.305-.344.82-.748 1.393-.993c.333-.142.834-.2 1.182-.09a.55.55 0 0 1 .293.188c.052.07.132.226.132.555v4a1 1 0 0 0 2 0v-4c0-.67-.17-1.266-.524-1.744a2.54 2.54 0 0 0-1.301-.907c-.902-.283-1.901-.126-2.568.16a6 6 0 0 0-.623.312A1 1 0 0 0 11 9M8 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2"/></g></svg>
                </a>
                <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><mask id="lineMdYoutubeFilled0"><g fill="none" fill-opacity="0" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" stroke-dasharray="64" stroke-dashoffset="64" d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path fill="#000" stroke="none" d="M12 11L12 12L12 13z"><animate fill="freeze" attributeName="d" begin="1.1s" dur="0.2s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"/><set fill="freeze" attributeName="fill-opacity" begin="1.1s" to="1"/></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdYoutubeFilled0)"/></svg>
                </a>
                <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m12.942 14.413l-2.56-2.66L5.45 14.48l5.406-5.736l2.56 2.66l4.93-2.727zM11.899 2C6.432 2 2 6.144 2 11.257c0 2.908 1.434 5.503 3.678 7.2V22l3.378-1.874c.9.252 1.855.388 2.843.388c5.468 0 9.9-4.145 9.9-9.257c0-5.113-4.432-9.257-9.9-9.257"/></svg>
                </a>
                <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"/></svg>
                </a>
                <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
                </a>
                <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.676 2.628a21.9 21.9 0 0 0-9.555 0l-.339.075a4.9 4.9 0 0 0-3.684 3.58a19.5 19.5 0 0 0 0 9.577a4.9 4.9 0 0 0 3.444 3.52l.465 2.776a.5.5 0 0 0 .826.29l2.731-2.443a22 22 0 0 0 6.112-.487l.34-.075a4.9 4.9 0 0 0 3.684-3.58a19.5 19.5 0 0 0 0-9.577a4.9 4.9 0 0 0-3.685-3.58zM7.965 6.202a.82.82 0 0 0-.537.106h-.014c-.375.22-.713.497-1.001.823c-.24.277-.37.557-.404.827c-.02.16-.006.322.041.475l.018.01c.27.793.622 1.556 1.052 2.274a13.4 13.4 0 0 0 2.03 2.775l.024.034l.038.028l.023.027l.028.024a13.6 13.6 0 0 0 2.782 2.04c1.155.629 1.856.926 2.277 1.05v.006c.123.038.235.055.348.055a1.6 1.6 0 0 0 .964-.414c.325-.288.6-.627.814-1.004v-.007c.201-.38.133-.738-.157-.981A12 12 0 0 0 14.41 13c-.448-.243-.903-.096-1.087.15l-.393.496c-.202.246-.568.212-.568.212l-.01.006c-2.731-.697-3.46-3.462-3.46-3.462s-.034-.376.219-.568l.492-.396c.236-.192.4-.646.147-1.094a12 12 0 0 0-1.347-1.88a.75.75 0 0 0-.44-.263M12.579 5a.5.5 0 0 0 0 1c1.265 0 2.315.413 3.146 1.205c.427.433.76.946.978 1.508c.219.563.319 1.164.293 1.766a.5.5 0 0 0 1 .042a5.4 5.4 0 0 0-.361-2.17a5.4 5.4 0 0 0-1.204-1.854l-.01-.01C15.39 5.502 14.085 5 12.579 5m-.034 1.644a.5.5 0 0 0 0 1h.017c.912.065 1.576.369 2.041.868c.477.514.724 1.153.705 1.943a.5.5 0 0 0 1 .023c.024-1.037-.31-1.932-.972-2.646V7.83c-.677-.726-1.606-1.11-2.724-1.185l-.017-.002zm-.019 1.675a.5.5 0 1 0-.052.998c.418.022.685.148.853.317c.169.17.295.443.318.87a.5.5 0 1 0 .998-.053c-.032-.6-.22-1.13-.605-1.52c-.387-.39-.914-.58-1.512-.612" clip-rule="evenodd"/></svg>
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
              display: flex;
              gap: 12px;
              border-radius: 16px;
              justify-content: space-between;
              align-items: center;
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
                <div style="display: flex; justify-content: space-between;  align-items: center; width: 100%; padding: 0 12px;">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="40px" viewBox="0 0 384 512"><path fill="#344054" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9c8.4 0 7.6 36.9 2 46.9m-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7c18.3-7 39-17.2 62.9-21.9c-12.7-9.6-24.9-23.4-34.5-40.8M86.1 428.1c0 .8 13.2-5.4 34.9-40.2c-6.7 6.3-29.1 24.5-34.9 40.2M248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24m-8 171.8c-20-12.2-33.3-29-42.7-53.8c4.5-18.5 11.6-46.6 6.2-64.2c-4.7-29.4-42.4-26.5-47.8-6.8c-5 18.3-.4 44.1 8.1 77c-11.6 27.6-28.7 64.6-40.8 85.8c-.1 0-.1.1-.2.1c-27.1 13.9-73.6 44.5-54.5 68c5.6 6.9 16 10 21.5 10c17.9 0 35.7-18 61.1-61.8c25.8-8.5 54.1-19.1 79-23.2c21.7 11.8 47.1 19.5 64 19.5c29.2 0 31.2-32 19.7-43.4c-13.9-13.6-54.3-9.7-73.6-7.2M377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9m-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9c37.1 15.8 42.8 9 42.8 9"/></svg>

                    <div>
                      <p style="font-size: 14px; font-weight: 500; color: #344054;">User_Application.pdf</p>
                      <p style="font-size: 14px; font-weight: 400; color: #344054; text-align: left;">200 KB</p>
                    </div>
                  </div>

                  <div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
                </a>
                <a href="https://www.instagram.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
                </a>
                <a  href="https://www.linkedin.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8 10a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1m3-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-3.66c.305-.344.82-.748 1.393-.993c.333-.142.834-.2 1.182-.09a.55.55 0 0 1 .293.188c.052.07.132.226.132.555v4a1 1 0 0 0 2 0v-4c0-.67-.17-1.266-.524-1.744a2.54 2.54 0 0 0-1.301-.907c-.902-.283-1.901-.126-2.568.16a6 6 0 0 0-.623.312A1 1 0 0 0 11 9M8 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2"/></g></svg>
                </a>
                <a href="https://www.youtube.com" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><mask id="lineMdYoutubeFilled0"><g fill="none" fill-opacity="0" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" stroke-dasharray="64" stroke-dashoffset="64" d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path fill="#000" stroke="none" d="M12 11L12 12L12 13z"><animate fill="freeze" attributeName="d" begin="1.1s" dur="0.2s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"/><set fill="freeze" attributeName="fill-opacity" begin="1.1s" to="1"/></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdYoutubeFilled0)"/></svg>
                </a>
                <a href="https://m.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m12.942 14.413l-2.56-2.66L5.45 14.48l5.406-5.736l2.56 2.66l4.93-2.727zM11.899 2C6.432 2 2 6.144 2 11.257c0 2.908 1.434 5.503 3.678 7.2V22l3.378-1.874c.9.252 1.855.388 2.843.388c5.468 0 9.9-4.145 9.9-9.257c0-5.113-4.432-9.257-9.9-9.257"/></svg>
                </a>
                <a href="https://telegram.me/yourusername" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"/></svg>
                </a>
                <a href="https://wa.me/yourphonenumber" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
                </a>
                <a href="viber://chat?number=01715378419" style="text-decoration: none; color: #6B7280;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.676 2.628a21.9 21.9 0 0 0-9.555 0l-.339.075a4.9 4.9 0 0 0-3.684 3.58a19.5 19.5 0 0 0 0 9.577a4.9 4.9 0 0 0 3.444 3.52l.465 2.776a.5.5 0 0 0 .826.29l2.731-2.443a22 22 0 0 0 6.112-.487l.34-.075a4.9 4.9 0 0 0 3.684-3.58a19.5 19.5 0 0 0 0-9.577a4.9 4.9 0 0 0-3.685-3.58zM7.965 6.202a.82.82 0 0 0-.537.106h-.014c-.375.22-.713.497-1.001.823c-.24.277-.37.557-.404.827c-.02.16-.006.322.041.475l.018.01c.27.793.622 1.556 1.052 2.274a13.4 13.4 0 0 0 2.03 2.775l.024.034l.038.028l.023.027l.028.024a13.6 13.6 0 0 0 2.782 2.04c1.155.629 1.856.926 2.277 1.05v.006c.123.038.235.055.348.055a1.6 1.6 0 0 0 .964-.414c.325-.288.6-.627.814-1.004v-.007c.201-.38.133-.738-.157-.981A12 12 0 0 0 14.41 13c-.448-.243-.903-.096-1.087.15l-.393.496c-.202.246-.568.212-.568.212l-.01.006c-2.731-.697-3.46-3.462-3.46-3.462s-.034-.376.219-.568l.492-.396c.236-.192.4-.646.147-1.094a12 12 0 0 0-1.347-1.88a.75.75 0 0 0-.44-.263M12.579 5a.5.5 0 0 0 0 1c1.265 0 2.315.413 3.146 1.205c.427.433.76.946.978 1.508c.219.563.319 1.164.293 1.766a.5.5 0 0 0 1 .042a5.4 5.4 0 0 0-.361-2.17a5.4 5.4 0 0 0-1.204-1.854l-.01-.01C15.39 5.502 14.085 5 12.579 5m-.034 1.644a.5.5 0 0 0 0 1h.017c.912.065 1.576.369 2.041.868c.477.514.724 1.153.705 1.943a.5.5 0 0 0 1 .023c.024-1.037-.31-1.932-.972-2.646V7.83c-.677-.726-1.606-1.11-2.724-1.185l-.017-.002zm-.019 1.675a.5.5 0 1 0-.052.998c.418.022.685.148.853.317c.169.17.295.443.318.87a.5.5 0 1 0 .998-.053c-.032-.6-.22-1.13-.605-1.52c-.387-.39-.914-.58-1.512-.612" clip-rule="evenodd"/></svg>
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
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi,</p>
        <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you!</p>
      </div>
    `,
  };

  return mailOptions;
};

module.exports = {
  verifySuccessMail,
  sendPasswordResetEmail,
  emailVerifyMailForApplicant,
};
