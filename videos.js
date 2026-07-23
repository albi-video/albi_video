// ============================================================
//  VIDEOS.JS — THE ONLY FILE YOU NEED TO EDIT
// ============================================================
//
//  How to manage your portfolio:
//    • Add a new video: copy one of the objects below, paste at the
//      end of the array, and update the fields.
//    • Remove a video: delete its object (and the trailing comma).
//    • Reorder videos: move objects up or down in the array.
//
//  FIELDS
//  ──────
//  id          YouTube video ID — the string after "v=" in the URL
//              e.g. https://youtu.be/uHweuu7igDU  →  "uHweuu7igDU"
//
//  source      "youtube"   → YouTube embed (privacy-friendly, auto-thumbnail)
//              "local"     → self-hosted .mp4 — best for Instagram Reels
//                            drop the file in assets/videos/ and set "file"
//              "instagram" → official Instagram embed widget (shows full post UI)
//
//  file        Path to a local video file (only for source: "local"), e.g.:
//                "assets/videos/myreel.mp4"
//
//  orientation "vertical"   → 9:16 tall card  (portrait / Reels)
//              "horizontal" → 16:9 wide card  (standard YouTube)
//
//  featured    true  → becomes the hero showreel card (only one!)
//              false → goes into the grid below
//
//  title       Caption shown on hover and in the lightbox.
//
//  thumbnail   Path to a poster image shown before the video plays, e.g.:
//                "assets/thumbs/myreel.jpg"
//              Set to null for YouTube (auto-fetched). Required for local/instagram.
//
//  url         Full URL — only needed for source: "instagram" (the post URL).
// ============================================================

const VIDEOS = [
  // ── HERO SHOWREEL (featured: true) ───────────────────────────
  {
    id: 'U4hNBKAJgqU',
    source: 'youtube',
    orientation: 'horizontal',
    featured: true,
    title: 'Showreel 2026',
    thumbnail: null,
    url: 'https://youtu.be/U4hNBKAJgqU',
  },

  // ── GRID VIDEOS (featured: false) ────────────────────────────
  //
  // HOW TO ADD A SELF-HOSTED VIDEO (best for Instagram Reels):
  //   1. Download the .mp4 from Instagram (your own video)
  //   2. Drop it in:  assets/videos/myreel.mp4
  //   3. Take a screenshot for the poster: assets/thumbs/myreel.jpg
  //   4. Add an entry like this:
  //
  // {
  //   source:      "local",
  //   file:        "assets/videos/myreel.mp4",
  //   orientation: "vertical",
  //   featured:    false,
  //   title:       "Reel — Title",
  //   thumbnail:   "assets/thumbs/myreel.jpg",
  // },

  {
    id: 'v2dmGEdX13g',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Wantme brand',
    thumbnail: null,
    url: 'https://youtu.be/v2dmGEdX13g',
  },
  {
    id: 'oGIj3T-ZO_0',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Mercedes Prague Fashion Week',
    thumbnail: null,
    url: 'https://youtu.be/oGIj3T-ZO_0',
  },

  {
    id: 'ufd6NLMxrig',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Denisa and Jan wedding',
    thumbnail: null,
    url: 'https://youtu.be/ufd6NLMxrig',
  },
  // {
  //   id:          "insta",
  //   source:      "instagram",
  //   orientation: "vertical",
  //   featured:    false,
  //   title:       "Reel — Behind the scenes",
  //   thumbnail:   "assets/thumbs/bts.jpg",   // optional but recommended
  //   url:         "https://www.instagram.com/reel/DNiIhl6MYQO/?igsh=cjl6ZnZjeW83MnVt"
  // },
  // https://www.instagram.com/reel/DNiIhl6MYQO/?igsh=cjl6ZnZjeW83MnVt

  {
    id: '_xpMkIMGfK4',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Czech Volleyball Federation — Social media videos', //
    thumbnail: null,
    url: 'https://youtu.be/_xpMkIMGfK4',
  },
  {
    id: 'TgArI-Qg90Q',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Videoclip Bez teba to nejde LARA MORR',
    thumbnail: null,
    url: 'https://youtu.be/TgArI-Qg90Q',
  },
  {
    id: 'e4kIygABjrw',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Lagem ring',
    thumbnail: null,
    url: 'https://youtu.be/e4kIygABjrw',
  },
  {
    id: 'OEVA5Ac6bJk',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Dance video visual "Chrysalis" by DIANA HUONG NGUYEN',
    thumbnail: null,
    url: 'https://youtu.be/OEVA5Ac6bJk',
  },
  {
    id: 'wSCdv56Dp5M',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Dance video project',
    thumbnail: null,
    url: 'https://youtu.be/wSCdv56Dp5M',
  },
  {
    id: 'Gz1DHgW3RYQ',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'VeroniCouture Boutque & Atelier',
    thumbnail: null,
    url: 'https://youtu.be/Gz1DHgW3RYQ',
  },

  {
    id: 'Bxcsn60iWXE',
    source: 'youtube',
    orientation: 'horizontal',
    featured: false,
    title: 'Dance visual by Natalie Helt',
    thumbnail: null,
    url: 'https://youtu.be/Bxcsn60iWXE',
  },

  {
    id: '1TEVOtqQm-M',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Influencer campaign for Furiosa',
    thumbnail: null,
    url: 'https://youtu.be/1TEVOtqQm-M',
  },
  {
    id: 'AIuaNs89III',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Visuals for Natalie Kocendova',
    thumbnail: null,
    url: 'https://youtu.be/AIuaNs89III',
  },
  {
    id: 'D_JvdycGfFg',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Pilates reformer promo video',
    thumbnail: null,
    url: 'https://youtu.be/D_JvdycGfFg',
  },
  {
    id: 'Nv7Fb9uIS0Y',
    source: 'youtube',
    orientation: 'vertical',
    featured: false,
    title: 'Influencer campaign - Fanta',
    thumbnail: null,
    url: 'https://youtu.be/Nv7Fb9uIS0Y',
  },
];
