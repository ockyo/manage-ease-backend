const nodemailer = require("nodemailer");

// Cấu hình transporter theo SMTP của bạn
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "angelkmedia.bot@gmail.com", pass: "mgut cnna hwxq xayf" }
});

exports.sendResetPasswordEmail = async (to, resetUrl) => {
    await transporter.sendMail({
        to,
        subject: "Đặt lại mật khẩu",
        html: `
        <div style="background: #f4f4f7; padding: 32px 0;">
            <div style="max-width: 420px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;">
            <h2 style="margin: 0 0 12px; color: #2563eb; font-size: 22px; font-weight: bold; text-align: center;">Đặt lại mật khẩu</h2>
            <p style="color: #222; margin: 12px 0 28px; text-align: center;">
                Bạn vừa gửi yêu cầu đặt lại mật khẩu cho tài khoản của mình.<br>
                Nhấn vào nút bên dưới để đặt lại mật khẩu mới:
            </p>
            <div style="text-align: center; margin: 36px 0;">
                <a href="${resetUrl}" target="_blank"
                style="
                    display: inline-block;
                    padding: 12px 32px;
                    background: #2563eb;
                    color: #fff;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 500;
                    text-decoration: none;
                    box-shadow: 0 2px 6px rgba(37,99,235,0.09);
                    transition: background 0.2s;
                "
                >Đặt lại mật khẩu</a>
            </div>
            <p style="color: #888; font-size: 13px; margin-top: 40px; text-align: center;">
                Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.<br>
                Liên hệ quản trị viên nếu cần hỗ trợ thêm.<br><br>
                <span style="color: #bdbdbd;">&copy; ${new Date().getFullYear()} Angelk Media</span>
            </p>
            </div>
        </div>
        `
    });
};


