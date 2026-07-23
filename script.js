/* ============================================================
   SCRIPT.JS — Portfolio logic
   ============================================================
   Reads the VIDEOS array from videos.js and builds:
     1. Hero section  — the featured video, plays inline on click
     2. Video grid    — all other YouTube videos, lightbox on click
     3. Instagram row — any instagram entries, links out to IG

   You should not need to edit this file.
   All content is managed in videos.js.
   ============================================================ */

(function () {
  'use strict';

  /* ── UTILITY FUNCTIONS ─────────────────────────────────────── */

  /**
   * Returns the best YouTube thumbnail URL for a video ID.
   * maxresdefault is 1280×720 but not guaranteed; falls back to hqdefault.
   */
  function ytThumb(id, quality) {
    return 'https://img.youtube.com/vi/' + id + '/' + (quality || 'maxresdefault') + '.jpg';
  }

  /**
   * Returns the privacy-friendly embed URL for a YouTube video.
   * Adds autoplay, minimal branding, and enables inline play on iOS.
   */
  function ytEmbedUrl(id) {
    return (
      'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white'
    );
  }

  /** Creates the SVG play-triangle button element. */
  function makePlayBtn(label) {
    var btn = document.createElement('button');
    btn.className = 'play-btn';
    btn.setAttribute('aria-label', label || 'Play video');
    /* Simple filled triangle — optical nudge (margin-left) centred visually */
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<polygon points="5,2 22,12 5,22"/>' +
      '</svg>';
    return btn;
  }

  /**
   * Creates an <img> with a lazy-load fallback chain:
   * maxresdefault.jpg → hqdefault.jpg → grey placeholder.
   */
  function makeThumbImg(src, alt) {
    var img = document.createElement('img');
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = src;
    img.onerror = function () {
      if (this.dataset.triedFallback) return;
      this.dataset.triedFallback = '1';
      /* Try hqdefault if maxresdefault is not available */
      if (src.indexOf('maxresdefault') !== -1) {
        this.src = src.replace('maxresdefault', 'hqdefault');
      }
    };
    return img;
  }


  /* ── LIGHTBOX ──────────────────────────────────────────────── */

  var lightbox       = document.getElementById('lightbox');
  var lightboxPlayer = document.getElementById('lightbox-player');
  var closeBtn       = lightbox.querySelector('.lightbox-close');
  var backdrop       = lightbox.querySelector('.lightbox-backdrop');
  var lastFocused    = null;   /* restore focus when the modal closes */

  /* Loads Instagram's embed script once, then processes pending blockquotes. */
  function injectInstagramEmbed(playerEl, url) {
    var bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', url);
    bq.setAttribute('data-instgrm-version', '14');
    bq.setAttribute('data-instgrm-captioned', '');
    bq.style.cssText = 'margin:0 auto;max-width:540px;width:100%;min-width:280px;';
    playerEl.appendChild(bq);

    if (!document.getElementById('ig-embed-script')) {
      var s = document.createElement('script');
      s.id  = 'ig-embed-script';
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
      /* embed.js auto-processes on load */
    } else if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }

  function openLightbox(video) {
    lastFocused = document.activeElement;

    /* Clear any previously playing video */
    var prevVideo = lightboxPlayer.querySelector('video');
    if (prevVideo) prevVideo.pause();
    lightboxPlayer.innerHTML = '';
    lightboxPlayer.classList.remove('is-vertical', 'is-instagram');

    if (video.source === 'local') {
      if (video.orientation === 'vertical') lightboxPlayer.classList.add('is-vertical');
      var vid = document.createElement('video');
      vid.src = video.file;
      vid.controls = true;
      vid.autoplay  = true;
      vid.setAttribute('playsinline', '');
      vid.setAttribute('preload', 'metadata');
      lightboxPlayer.appendChild(vid);

    } else if (video.source === 'instagram') {
      lightboxPlayer.classList.add('is-instagram');
      injectInstagramEmbed(lightboxPlayer, video.url);

    } else if (video.source === 'youtube') {
      if (video.orientation === 'vertical') lightboxPlayer.classList.add('is-vertical');
      var iframe = document.createElement('iframe');
      iframe.src = ytEmbedUrl(video.id);
      iframe.title = video.title || 'Video';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      lightboxPlayer.appendChild(iframe);
    }

    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    var vid = lightboxPlayer.querySelector('video');
    if (vid) vid.pause();
    lightboxPlayer.innerHTML = '';
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused) { lastFocused.focus(); }
  }

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  /* Close on Escape key; trap Tab focus inside the modal */
  document.addEventListener('keydown', function (e) {
    if (!lightbox.hasAttribute('hidden')) {
      if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    }
  });


  /* ── HERO SECTION ──────────────────────────────────────────── */

  function buildHero(video) {
    var section  = document.querySelector('.hero-section');

    var card     = document.createElement('div');
    card.className = 'hero-card ' + (video.orientation || 'vertical');

    var thumbDiv = document.createElement('div');
    thumbDiv.className = 'video-thumb';
    /* Keyboard access on the thumbnail container itself */
    thumbDiv.setAttribute('tabindex', '0');
    thumbDiv.setAttribute('role', 'button');
    thumbDiv.setAttribute('aria-label', 'Play ' + (video.title || 'Showreel'));

    var thumbSrc = video.thumbnail || (video.source === 'youtube' ? ytThumb(video.id) : null);
    var img      = thumbSrc ? makeThumbImg(thumbSrc, video.title || 'Showreel') : null;
    var playBtn  = makePlayBtn('Play ' + (video.title || 'Showreel'));

    if (img) thumbDiv.appendChild(img);
    thumbDiv.appendChild(playBtn);

    /* Title label below the card */
    var title = document.createElement('p');
    title.className = 'hero-title';
    title.textContent = video.title || '';

    card.appendChild(thumbDiv);
    card.appendChild(title);
    section.appendChild(card);

    /* Hero plays inline — poster + button swapped for the player in-place */
    var isPlaying = false;
    function playHeroInline() {
      if (isPlaying) return;
      isPlaying = true;

      if (img) img.remove();
      playBtn.remove();

      var player;
      if (video.source === 'local') {
        player = document.createElement('video');
        player.src = video.file;
        player.controls = true;
        player.autoplay  = true;
        player.setAttribute('playsinline', '');
      } else {
        /* YouTube */
        player = document.createElement('iframe');
        player.src = ytEmbedUrl(video.id);
        player.title = video.title || 'Showreel';
        player.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
        player.setAttribute('allowfullscreen', '');
      }
      thumbDiv.appendChild(player);

      /* Remove button role once iframe is in */
      thumbDiv.removeAttribute('tabindex');
      thumbDiv.removeAttribute('role');
      thumbDiv.removeAttribute('aria-label');
    }

    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      playHeroInline();
    });
    thumbDiv.addEventListener('click', playHeroInline);
    thumbDiv.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playHeroInline();
      }
    });
  }


  /* ── GRID SECTION ──────────────────────────────────────────── */

  function buildGrid(videos) {
    var grid = document.querySelector('.video-grid');

    videos.forEach(function (video) {
      var card = document.createElement('div');
      card.className = 'grid-card ' + (video.orientation || 'horizontal');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Play ' + (video.title || 'video'));

      var thumbDiv = document.createElement('div');
      thumbDiv.className = 'video-thumb';

      /* Thumbnail: YouTube auto-fetched; local/instagram need one in videos.js */
      if (video.thumbnail) {
        thumbDiv.appendChild(makeThumbImg(video.thumbnail, video.title || ''));
      } else if (video.source === 'youtube') {
        thumbDiv.appendChild(makeThumbImg(ytThumb(video.id), video.title || ''));
      } else {
        /* No thumbnail provided: IG gradient placeholder */
        var ph = document.createElement('div');
        ph.className = 'ig-placeholder';
        ph.setAttribute('aria-hidden', 'true');
        ph.innerHTML =
          '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<rect x="6" y="6" width="36" height="36" rx="10" fill="none" stroke="white" stroke-width="2.5"/>' +
            '<circle cx="24" cy="24" r="8" fill="none" stroke="white" stroke-width="2.5"/>' +
            '<circle cx="35" cy="13" r="2" fill="white"/>' +
          '</svg>';
        thumbDiv.appendChild(ph);
      }

      var playBtn = makePlayBtn('Open ' + (video.title || 'video'));

      /* Caption shown on hover */
      var caption = document.createElement('div');
      caption.className = 'video-caption';
      caption.setAttribute('aria-hidden', 'true');
      caption.textContent = video.title || '';

      thumbDiv.appendChild(playBtn);
      thumbDiv.appendChild(caption);
      card.appendChild(thumbDiv);
      grid.appendChild(card);

      /* Open the video — IG and YouTube both open in the lightbox now */
      function openVideo() {
        openLightbox(video);
      }

      card.addEventListener('click', openVideo);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openVideo();
        }
      });
    });
  }


  /* ── INSTAGRAM SECTION ─────────────────────────────────────── */
  /*
    IMPORTANT NOTE FOR MAINTAINERS
    ────────────────────────────────
    Instagram embeds (blockquote.instagram-media + embed.js) have
    significant limitations compared with YouTube:

      • No custom poster / thumbnail support.
      • Autoplay is blocked by IG and most browsers.
      • The IG embed.js script adds measurable page-weight.
      • IG frequently changes its embed API, breaking sites.

    RECOMMENDATION: Re-upload key clips to YouTube as "unlisted"
    videos and use source: "youtube" in videos.js for the best
    viewing experience and full control over thumbnails and playback.

    The section below renders a minimal link-out grid as a fallback.
  */
  function buildInstagram(videos) {
    var section = document.querySelector('.instagram-section');
    if (!videos.length) return;

    section.removeAttribute('hidden');

    var heading = document.createElement('h2');
    heading.textContent = 'Instagram';
    section.appendChild(heading);

    var igGrid = document.createElement('div');
    igGrid.className = 'instagram-grid';

    videos.forEach(function (video) {
      var card = document.createElement('div');
      card.className = 'instagram-card';

      var link = document.createElement('a');
      link.href = video.url || 'https://www.instagram.com/albi_hi';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = video.title ? video.title + ' ↗' : 'View on Instagram ↗';

      card.appendChild(link);
      igGrid.appendChild(card);
    });

    section.appendChild(igGrid);
  }


  /* ── INIT ──────────────────────────────────────────────────── */

  function init() {
    if (typeof VIDEOS === 'undefined' || !Array.isArray(VIDEOS)) {
      console.error('portfolio: VIDEOS array not found. Make sure videos.js is loaded before script.js.');
      return;
    }

    /* Split the data array into the three sections */
    var hero      = null;
    var gridItems = [];
    var igItems   = [];

    VIDEOS.forEach(function (video) {
      if (video.featured) {
        hero = video;
      } else if (video.source === 'instagram') {
        igItems.push(video);
      } else {
        gridItems.push(video);
      }
    });

    if (hero)              buildHero(hero);
    if (gridItems.length)  buildGrid(gridItems);
    if (igItems.length)    buildInstagram(igItems);
  }

  /* Kick off once the DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
