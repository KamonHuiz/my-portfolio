/* ==========================================================================
   NỘI DUNG TRANG CHỦ
   Toàn bộ chữ ở trang chủ nằm trong file này. Sửa thoải mái, nhớ giữ dấu
   nháy " " và dấu phẩy ở cuối mỗi dòng.
   ========================================================================== */

export const hero = {
  image: "/images/wud.jpg",
  alt: "Watt'up Debuggers club",
  caption:
    "Shoutout to my lovely club Watt'up Debuggers that I and my highschool friends founded on 5 August 2023.",
};

export const about = {
  /** Câu tiêu đề lớn ở đầu phần giới thiệu */
  headline: "I'm Kamon Nguyen. I teach machines to see, and I write about what they show me.",

  /** Mỗi chuỗi là một đoạn văn. Thêm đoạn mới = thêm một dòng "..." */
  paragraphs: [
    "Hi, I'm Gia Huy — most people online know me as Kamon. I'm a student and a builder, currently spending most of my waking hours on artificial intelligence, especially the parts of it that deal with images and video.",
    "I founded Watt'up Debuggers with a group of high school friends in August 2023, because we wanted a place where people who like breaking things apart could do it together instead of alone. That club is still one of the things I'm proudest of.",
    "These days I read papers, train models, lose arguments with CUDA, and write down whatever I learn so that future me doesn't have to learn it twice. This site is where that writing lives.",
  ],

  portrait: "/images/huy.jpg",
  portraitAlt: "Portrait of Kamon Nguyen",
  /** File PDF nằm trong thư mục public/ */
  resume: "/Kamon-Nguyen-CV.pdf",
};

/** Section "What I love" — thêm/bớt/sửa thoải mái */
export const whatILove = [
  {
    title: "Computer Vision",
    body: "Detection, segmentation, tracking — anything that turns raw pixels into something a machine can reason about. This is my home turf.",
  },
  {
    title: "Multimodal Learning",
    body: "Models that read an image and talk about it, or read a sentence and draw it. The moment two modalities click together still feels like magic.",
  },
  {
    title: "Deep Learning Systems",
    body: "Training loops, mixed precision, data pipelines, squeezing a model onto hardware that really shouldn't be able to run it.",
  },
  {
    title: "Generative Models",
    body: "Diffusion, GANs, and the strange, beautiful failure modes they produce when you push them somewhere they weren't meant to go.",
  },
  {
    title: "Edge AI & Robotics",
    body: "Making models small and fast enough to live on a device that moves through the real world instead of a datacenter.",
  },
  {
    title: "Teaching & Writing",
    body: "Explaining a hard idea until it feels obvious. If I can't write it down clearly, I probably don't understand it yet.",
  },
];
