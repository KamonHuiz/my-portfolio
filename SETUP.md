# Hướng dẫn dùng website

Viết cho người chưa từng làm web. Cứ làm theo đúng thứ tự là được.

---

## 1. Chạy website trên máy để xem thử

Mở terminal ngay trong thư mục này rồi gõ:

```bash
npm run dev
```

Mở trình duyệt vào **http://localhost:3000**. Sửa file nào là trang tự tải lại luôn,
không cần tắt đi bật lại. Muốn dừng thì bấm `Ctrl + C` trong terminal.

Lần đầu chạy mà báo thiếu gì đó thì gõ `npm install` trước.

---

## 2. Sửa nội dung ở đâu

Đây là bảng tra cứu quan trọng nhất. **Bạn gần như chỉ cần đụng vào các file này.**

| Muốn sửa gì | Mở file nào |
| --- | --- |
| Tên, mô tả, link Facebook/GitHub/LinkedIn/Threads, menu trên cùng | `data/site.ts` |
| Chữ ở trang chủ: ảnh CLB + caption, đoạn giới thiệu, mục "What I love" | `data/profile.ts` |
| Danh sách Projects | `data/projects.ts` |
| Các mục ở trang News | `content/news.md` |
| Danh sách List 100 | `content/list100.md` |
| Bài viết blog | thư mục `content/blog/` |
| Màu sắc, cỡ chữ toàn site | `app/globals.css` (phần đầu file) |
| Ảnh, file CV | thư mục `public/` |

Trong mỗi file đều có ghi chú tiếng Việt ở đầu, đọc là hiểu ngay.

### Lưu ý khi sửa file `.ts`

Nội dung nằm giữa hai dấu nháy `"..."`, cuối mỗi dòng có dấu phẩy `,`.
Nếu chữ của bạn có dấu nháy kép, đổi thành nháy đơn hoặc thêm dấu `\` phía trước.
Sửa sai thì terminal sẽ báo lỗi đỏ — cứ ctrl+Z là về như cũ.

---

## 3. Viết một bài blog mới

**Bước 1.** Tạo file mới trong `content/blog/`, đặt tên không dấu, không khoảng trắng.
Ví dụ `content/blog/toi-hoc-yolo.md`. Tên file chính là đường dẫn:
`yoursite.com/blog/toi-hoc-yolo`.

**Bước 2.** Dán khung này vào đầu file rồi sửa:

```markdown
---
title: "Tiêu đề bài viết"
description: "Một câu mô tả ngắn, hiện ở trang danh sách và khi share link."
date: "2026-08-19"
tags: ["computer-vision", "notes"]
cover: ""
draft: false
---

Nội dung bài viết bắt đầu từ đây.
```

Giải thích:

- `date` phải đúng dạng `"NĂM-THÁNG-NGÀY"`. Bài mới nhất tự lên đầu danh sách.
- `cover` là ảnh bìa, ví dụ `"/images/blog/anh-bia.jpg"`. Không có thì để `""`.
- `draft: true` = bài nháp, chỉ bạn thấy khi chạy `npm run dev`, deploy lên sẽ tự ẩn.

**Bước 3.** Viết nội dung bằng Markdown:

```markdown
## Tiêu đề mục lớn
### Tiêu đề mục nhỏ

Chữ **in đậm**, chữ *in nghiêng*, `code ngắn`.

- Gạch đầu dòng
- Gạch đầu dòng nữa

1. Đánh số
2. Đánh số nữa

[Chữ hiển thị](https://dia-chi-link)

![Chú thích ảnh](/images/blog/ten-anh.jpg)

> Câu trích dẫn

```python
print("khối code có tô màu, nhớ ghi tên ngôn ngữ sau ba dấu ```")
```
```

Các tiêu đề `##` và `###` tự động chui vào mục lục bên phải bài viết.

**Bước 4.** Lưu file, xem lại ở `localhost:3000/blog`, ưng thì đẩy lên GitHub (phần 6).

---

## 4. Bật phần bình luận (Giscus) — làm 1 lần duy nhất

Bình luận được lưu trong phần Discussions của repo GitHub, hoàn toàn miễn phí và không quảng cáo.

1. Vào repo `https://github.com/KamonHuiz/my-portfolio` > tab **Settings** >
   kéo xuống mục **Features** > tick vào ô **Discussions**.
2. Cài app giscus cho repo: mở https://github.com/apps/giscus > **Install** >
   chọn repo `my-portfolio`.
3. Mở https://giscus.app, kéo xuống phần cấu hình:
   - Ô **Repository**: gõ `KamonHuiz/my-portfolio`
   - **Page ↔ Discussions Mapping**: chọn **Discussion title contains page pathname**
   - **Discussion Category**: chọn **Announcements**
4. Kéo xuống dưới cùng, phần code mẫu có 2 dòng:
   ```
   data-repo-id="R_xxxxxxxxxx"
   data-category-id="DIC_xxxxxxxxxx"
   ```
5. Copy 2 giá trị đó vào file `.env.local` ở máy bạn:
   ```
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxx
   NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxx
   ```
   (Chưa có file `.env.local` thì copy file `.env.example` ra rồi đổi tên.)
6. Dán y hệt 3 dòng đó vào Vercel: **Settings > Environment Variables**.

Chưa làm bước này thì trang vẫn chạy bình thường, chỗ bình luận chỉ hiện dòng nhắc.

---

## 5. Bật bộ đếm lượt xem (Upstash) — làm 1 lần duy nhất

1. Vào https://console.upstash.com, đăng nhập bằng GitHub (miễn phí).
2. Bấm **Create Database**:
   - Type: **Redis**
   - Region: chọn **Singapore** (gần Việt Nam nhất)
   - Bấm Create.
3. Vào database vừa tạo, kéo xuống phần **REST API**, bấm **.env** để hiện 2 dòng:
   ```
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AXxxxxxx...
   ```
4. Copy vào file `.env.local`, và dán vào Vercel **Settings > Environment Variables**.

Cách hoạt động: mỗi người mở một bài viết thì view +1, và cùng một người mở lại
trong vòng 24 giờ thì không cộng thêm (chống F5 ăn gian). Chưa cấu hình thì
số view luôn hiện 0, không lỗi gì cả.

---

## 5b. Hiện số lượt bình luận ở danh sách blog (không bắt buộc)

Số bình luận được đếm từ GitHub Discussions, mà GitHub bắt buộc phải có token
mới cho hỏi. Không làm bước này thì trang blog vẫn chạy, chỉ là chỗ số bình
luận sẽ không hiện ra.

1. Vào https://github.com/settings/tokens?type=beta > **Generate new token**.
2. Đặt tên bất kỳ, mục **Repository access** chọn **Public Repositories (read-only)**.
3. Bấm Generate, copy chuỗi token (chỉ hiện một lần duy nhất).
4. Dán vào `.env.local` và vào Vercel **Settings > Environment Variables**:
   ```
   GITHUB_TOKEN=github_pat_xxxxxxxx
   ```

Số bình luận được hỏi lại tối đa 5 phút một lần nên không sợ chạm giới hạn của GitHub.

---

## 6. Đưa website lên mạng (Vercel) — miễn phí

### Lần đầu tiên

**Bước 1 — Đẩy code lên GitHub:**

```bash
git add .
git commit -m "Update website"
git push -u origin main
```

**Bước 2 — Nối với Vercel:**

1. Vào https://vercel.com, bấm **Sign up** > **Continue with GitHub**.
2. Bấm **Add New... > Project**.
3. Tìm repo `my-portfolio` > bấm **Import**.
4. Vercel tự nhận ra đây là Next.js, không cần đổi gì. Bấm **Deploy**.
5. Chờ khoảng 1–2 phút. Xong sẽ có link dạng `my-portfolio-xxx.vercel.app`.
6. Vào **Settings > Environment Variables**, dán các biến ở phần 4 và 5 vào,
   trong đó `NEXT_PUBLIC_SITE_URL` điền chính link vercel vừa nhận được.
7. Vào tab **Deployments**, bấm dấu `...` ở bản mới nhất > **Redeploy** để áp dụng.

### Những lần sau

Chỉ cần 3 dòng này, Vercel tự build lại và cập nhật trang trong khoảng 1 phút:

```bash
git add .
git commit -m "Thêm bài viết mới"
git push
```

### Muốn dùng tên miền riêng

Mua domain (Namecheap, Porkbun, ~250k/năm) rồi vào Vercel **Settings > Domains**,
dán tên miền vào, Vercel sẽ chỉ bạn khai báo DNS. HTTPS được cấp tự động, miễn phí.

---

## 7. Gặp lỗi thì làm gì

| Hiện tượng | Cách xử lý |
| --- | --- |
| Terminal báo lỗi đỏ sau khi sửa file `.ts` | Thường là thiếu dấu `"` hoặc dấu `,`. Ctrl+Z về trạng thái cũ. |
| Ảnh không hiện | Ảnh phải nằm trong `public/`, và đường dẫn viết bắt đầu bằng `/`, ví dụ `/images/abc.jpg` |
| Bài viết mới không hiện | Kiểm tra `draft: false` và `date` đúng dạng `"2026-08-19"` |
| Trang trắng, kẹt lúc dev | `Ctrl + C` rồi chạy lại `npm run dev` |
| Sửa mãi không thấy đổi | Xoá thư mục `.next` rồi chạy lại `npm run dev` |
| Vercel báo build failed | Chạy `npm run build` ở máy trước, lỗi sẽ hiện y hệt và dễ đọc hơn |

---

## 8. Cấu trúc thư mục (để biết cái gì nằm đâu)

```
PortfolioWebsite/
├── app/                     ← các trang của website
│   ├── page.tsx                trang chủ
│   ├── projects/page.tsx       trang Projects
│   ├── blog/page.tsx           danh sách blog
│   ├── blog/[slug]/page.tsx    một bài blog cụ thể
│   ├── news/page.tsx           trang News
│   ├── list100/page.tsx        trang List 100
│   ├── api/views/[slug]/       API đếm lượt xem
│   └── globals.css             MÀU SẮC & CỠ CHỮ toàn site
│
├── components/              ← các mảnh giao diện dùng lại nhiều nơi
│   ├── Navbar.tsx              thanh điều hướng trên cùng
│   ├── Footer.tsx              chân trang
│   ├── ThemeToggle.tsx         nút Dark/Light
│   ├── Comments.tsx            khung bình luận
│   └── ViewCounter.tsx         số lượt xem
│
├── content/                 ← NỘI DUNG BẠN VIẾT
│   ├── blog/*.md               bài viết
│   ├── news.md                 tin tức
│   └── list100.md              danh sách 100 việc
│
├── data/                    ← THÔNG TIN BẠN KHAI BÁO
│   ├── site.ts                 tên, link mạng xã hội, menu
│   ├── profile.ts              nội dung trang chủ
│   └── projects.ts             danh sách project
│
├── lib/                     ← phần xử lý bên trong, không cần đụng tới
└── public/                  ← ảnh và file tải về (CV.pdf)
```
