const CHANNELS = {
  main: 'RealMadrIdArabic18',
  football1: 'Troll_Football_Telegram',
  football2: 'Offsideahdaff',
  football3: 'RealMadridNews015',
  football4: 'irq_etd',
  football5: 'hassanalihsn',
  football6: 'sky_sports_football_updates',
  football7: 'Europa_king1',
  football8: 'Espn_Football_News_UK',
  football9: 'bein_fantasy',
  football10: 'mcfciraq1'
};

const CHANNEL_NAMES = {
  main: 'ريال مدريد',
  football1: 'Troll Football',
  football2: 'Offside Goals',
  football3: 'Real Madrid News',
  football4: 'ETD Sports',
  football5: 'Hassan Ali',
  football6: 'Sky Sports',
  football7: 'Europa King',
  football8: 'ESPN Football',
  football9: 'BeIN Fantasy',
  football10: 'Man City Iraq'
};

const PROXY_URLS = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

const NUM_POSTS = 5;
let currentPostIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let progressTimeout = null;
const PROGRESS_DURATION = 5000;
let currentChannel = 'main';

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  setupTouchEvents();
  setupKeyboardEvents();
  setupProgressBars();
});

function setupProgressBars() {
  const container = document.createElement('div');
  container.className = 'progress-container';
  
  for (let i = 0; i < NUM_POSTS; i++) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = '<div class="progress-bar-fill"></div>';
    container.appendChild(bar);
  }
  
  document.querySelector('.container').prepend(container);
  startProgress();
}

function startProgress() {
  clearTimeout(progressTimeout);
  
  // Reset all progress bars
  document.querySelectorAll('.progress-bar').forEach((bar, index) => {
    bar.classList.remove('active');
    if (index < currentPostIndex) {
      bar.querySelector('.progress-bar-fill').style.width = '100%';
    } else if (index > currentPostIndex) {
      bar.querySelector('.progress-bar-fill').style.width = '0';
    }
  });
  
  // Activate current progress bar
  const currentBar = document.querySelectorAll('.progress-bar')[currentPostIndex];
  if (currentBar) {
    currentBar.classList.add('active');
    
    // Set timeout to go to next post
    progressTimeout = setTimeout(() => {
      if (currentPostIndex < NUM_POSTS - 1) {
        navigatePost(1);
      }
    }, PROGRESS_DURATION);
  }
}

function setupTouchEvents() {
  const container = document.querySelector('.container');
  
  // Add touch areas
  const prevNav = document.createElement('div');
  prevNav.className = 'story-nav prev';
  prevNav.addEventListener('click', () => navigatePost(-1));
  
  const nextNav = document.createElement('div');
  nextNav.className = 'story-nav next';
  nextNav.addEventListener('click', () => navigatePost(1));
  
  container.appendChild(prevNav);
  container.appendChild(nextNav);
  
  // Touch events
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchEndX = touchStartX;
    touchEndY = touchStartY;
  });
  
  container.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal movement if it's greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      const posts = document.querySelectorAll('.post-container');
      const currentPost = posts[currentPostIndex];
      
      if (currentPost) {
        const transform = Math.max(Math.min(-diffX, 100), -100);
        currentPost.style.transform = `translateX(${transform}px)`;
      }
    }
  });
  
  container.addEventListener('touchend', () => {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const posts = document.querySelectorAll('.post-container');
    const currentPost = posts[currentPostIndex];
    
    if (currentPost) {
      currentPost.style.transform = '';
      
      // Handle horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        navigatePost(diffX > 0 ? 1 : -1);
      }
      // Handle vertical swipe (swipe up)
      else if (diffY > 100) { // Swipe up threshold
        switchChannel();
      }
    }
  });
}

function setupKeyboardEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigatePost(-1);
    if (e.key === 'ArrowRight') navigatePost(1);
  });
}

function navigatePost(direction) {
  const posts = document.querySelectorAll('.post-container');
  if (!posts.length) return;
  
  const newIndex = currentPostIndex + direction;
  if (newIndex < 0 || newIndex >= posts.length) return;
  
  posts[currentPostIndex].classList.remove('active');
  currentPostIndex = newIndex;
  posts[currentPostIndex].classList.add('active');
  
  startProgress();
}

async function switchChannel() {
  // Get all channel keys
  const channels = Object.keys(CHANNELS);
  // Find current channel index
  const currentIndex = channels.indexOf(currentChannel);
  // Get next channel (or wrap around to first)
  const nextIndex = (currentIndex + 1) % channels.length;
  currentChannel = channels[nextIndex];
  
  currentPostIndex = 0;
  await loadPosts();
  
  // Show channel switch indicator
  const indicator = document.createElement('div');
  indicator.className = 'channel-switch-indicator';
  indicator.textContent = CHANNEL_NAMES[currentChannel];
  document.body.appendChild(indicator);
  
  setTimeout(() => {
    indicator.remove();
  }, 2000);
}

async function loadPosts() {
  const loadingElement = document.getElementById('loading');
  const postsElement = document.getElementById('posts');
  
  try {
    loadingElement.style.display = 'block';
    postsElement.innerHTML = '';
    
    const postIDs = await fetchPostIDs();
    if (postIDs.length) {
      const postsHTML = await Promise.all(postIDs.map(fetchPostData));
      postsElement.innerHTML = postsHTML.join('');
      
      const firstPost = document.querySelector('.post-container');
      if (firstPost) {
        firstPost.classList.add('active');
      }
      setupMediaControls();
    }
  } catch (error) {
    console.error('Error loading posts:', error);
    postsElement.innerHTML = '<div class="error-message">عذراً، حدث خطأ في تحميل المنشورات</div>';
  } finally {
    loadingElement.style.display = 'none';
  }
}

async function fetchPostIDs() {
  const url = `https://t.me/s/${CHANNELS[currentChannel]}`;
  const proxyUrl = `${PROXY_URLS[0]}${encodeURIComponent(url)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error('Network response was not ok');
  
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  const posts = Array.from(doc.querySelectorAll('.tgme_widget_message')).reverse();
  return posts.slice(0, NUM_POSTS).map(post => {
    const dataPost = post.getAttribute('data-post') || '';
    const match = dataPost.match(/\d+$/);
    return match ? match[0] : null;
  }).filter(id => id);
}

async function fetchPostData(postID) {
  const url = `https://t.me/${CHANNELS[currentChannel]}/${postID}?embed=1`;
  let html = null;

  for (let proxyUrl of PROXY_URLS) {
    try {
      const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
      if (response.ok) {
        html = await response.text();
        break;
      }
    } catch (error) {
      console.warn(`Proxy failed: ${proxyUrl}`, error);
    }
  }

  if (!html) throw new Error('All proxies failed');

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const author = doc.querySelector(".tgme_widget_message_author")?.innerText.trim() || "غير معروف";
  const avatar = doc.querySelector(".tgme_widget_message_user img")?.src || "https://via.placeholder.com/48";
  const time = doc.querySelector(".datetime")?.getAttribute("datetime") || "";
  const content = doc.querySelector(".tgme_widget_message_text")?.innerHTML.trim() || "";
  const views = doc.querySelector(".tgme_widget_message_views")?.innerText.trim() || "0";

  let media = "";
  const mediaGroup = doc.querySelector(".tgme_widget_message_grouped_wrap");
  const singleVideo = doc.querySelector("video");
  const singleImage = doc.querySelector(".tgme_widget_message_photo_wrap");

  if (mediaGroup) {
    // Handle multiple media items
    const mediaItems = Array.from(mediaGroup.querySelectorAll('.tgme_widget_message_photo_wrap, video'));
    if (mediaItems.length > 0) {
      media = `
        <div class="post-media media-gallery">
          <div class="media-slider">
            ${mediaItems.map((item, index) => {
              if (item.tagName.toLowerCase() === 'video') {
                return `
                  <div class="media-slide">
                    <video controls playsinline src="${item.src}"></video>
                  </div>
                `;
              } else {
                const bgImage = item.style.backgroundImage.match(/url\(['"](.+)['"]\)/)?.[1];
                return bgImage ? `
                  <div class="media-slide">
                    <img src="${bgImage}" alt="صورة ${index + 1}">
                  </div>
                ` : '';
              }
            }).join('')}
          </div>
          ${mediaItems.length > 1 ? `
            <div class="media-counter">${mediaItems.length}</div>
            <div class="media-nav">
              <button class="media-prev">‹</button>
              <button class="media-next">›</button>
            </div>
          ` : ''}
        </div>
      `;
    }
  } else if (singleVideo && singleVideo.src) {
    media = `
      <div class="post-media">
        <video controls playsinline>
          <source src="${singleVideo.src}" type="video/mp4">
        </video>
      </div>
    `;
  } else if (singleImage) {
    const bgImage = singleImage.style.backgroundImage.match(/url\(['"](.+)['"]\)/)?.[1];
    if (bgImage) {
      media = `
        <div class="post-media">
          <img src="${bgImage}" alt="صورة المنشور">
        </div>
      `;
    }
  }

  return `
    <div class="post-container">
      <div class="post-header">
        <div class="author-info">
          <img src="${avatar}" class="author-avatar" alt="${author}">
          <div class="author-details">
            <span class="author-name">${author}</span>
            <span class="post-time" dir="ltr">
              <i class="far fa-clock"></i>
              ${formatDate(time)}
            </span>
          </div>
        </div>
      </div>
      <div class="post-content">
        ${media}
        ${content ? `<div class="message-text">${content}</div>` : ''}
      </div>
      <div class="post-footer">
        <div class="post-stat" dir="ltr">
          ${views} <i class="far fa-eye"></i>
        </div>
      </div>
    </div>
  `;
}

function setupMediaControls() {
  document.querySelectorAll('.media-gallery').forEach(gallery => {
    const slider = gallery.querySelector('.media-slider');
    const slides = gallery.querySelectorAll('.media-slide');
    let currentSlide = 0;

    function showSlide(index) {
      const offset = index * -100;
      slider.style.transform = `translateX(${offset}%)`;
      currentSlide = index;
    }

    gallery.querySelector('.media-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentSlide > 0) showSlide(currentSlide - 1);
    });

    gallery.querySelector('.media-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
    });

    // Add touch support for media gallery
    let startX = 0;
    let currentX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      e.stopPropagation();
    });

    slider.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      if (Math.abs(diff) > 20) {
        e.stopPropagation();
      }
    });

    slider.addEventListener('touchend', (e) => {
      const diff = currentX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide > 0) {
          showSlide(currentSlide - 1);
        } else if (diff < 0 && currentSlide < slides.length - 1) {
          showSlide(currentSlide + 1);
        }
      }
      e.stopPropagation();
    });
  });
}

function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    // Using en-US locale for English numerals
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateString;
  }
}