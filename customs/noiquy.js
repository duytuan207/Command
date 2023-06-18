import cron from 'node-cron'

const jobs = [
    {
        time: "0 * * * *", 
        message: () => `
        🤖 Đây Là Tin Nhắn Từ Hệ Thống 🤖

        1️⃣ Vui lòng không spam lệnh và tin nhắn.

        2️⃣ Tôn trọng quản trị viên và các thành viên khác.

        3️⃣ Không gửi các đường link độc hại, lừa đảo.

        4️⃣ Không được sử dụng ngôn ngữ thô tục, xúc phạm hoặc phản động.

        5️⃣ Hãy tuân thủ các yêu cầu của bot để giúp bot hoạt động hiệu quả và đảm bảo trải nghiệm sử dụng tốt nhất cho tất cả mọi người.

        >> Cảm ơn vì đã đọc, chúc mn sử dụng bot vui vẻ! <<

        `,
    },  
]

export default function autoSend() {
    cron.getTasks().forEach(task => task.stop());

    const timezone = global.config?.timezone || "Asia/Ho_Chi_Minh";
    if (!timezone) return;

    for (const job of jobs) {
        cron.schedule(job.time, () => {
            let i = 0;
            for (const tid of job.targetIDs || Array.from(global.data.threads.keys()) || []) {
                setTimeout(() => {
                    global.api.sendMessage({
                        body: job.message()
                    }, tid);
                }, (i++) * 300)
            }
        }, {
            timezone: timezone
        })
    }
}