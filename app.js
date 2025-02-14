// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle icon
  const themeIcon = document.querySelector('.theme-toggle i');
  themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update initial toggle icon
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
});

// Constants and Data
const LEAGUES_DATA = {
  bigFive: [
    {
      name: "الدوري الإنجليزي الممتاز",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      clubs: [
        { name: "مانشستر يونايتد", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
        { name: "مانشستر سيتي", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
        { name: "ليفربول", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
        { name: "تشيلسي", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
        { name: "أرسنال", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
        { name: "توتنهام", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" }
      ]
    },
    {
      name: "الدوري الإسباني",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/LaLiga.svg",
      clubs: [
        { name: "ريال مدريد", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
        { name: "برشلونة", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
        { name: "أتلتيكو مدريد", logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
        { name: "إشبيلية", logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg" },
        { name: "فالنسيا", logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg" }
      ]
    },
    {
      name: "الدوري الإيطالي",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
      clubs: [
        { name: "يوفنتوس", logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Juventus_2017_logo.svg" },
        { name: "إنتر ميلان", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" },
        { name: "ميلان", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg" },
        { name: "روما", logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg" },
        { name: "نابولي", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_logo.svg" }
      ]
    },
    {
      name: "الدوري الألماني",
      logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
      clubs: [
        { name: "بايرن ميونيخ", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
        { name: "بوروسيا دورتموند", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
        { name: "لايبزيغ", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg" },
        { name: "باير ليفركوزن", logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg" }
      ]
    },
    {
      name: "الدوري الفرنسي",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/Ligue_1_Uber_Eats.svg",
      clubs: [
        { name: "باريس سان جيرمان", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
        { name: "مارسيليا", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg" },
        { name: "ليون", logo: "https://upload.wikimedia.org/wikipedia/en/e/e2/Olympique_Lyonnais.svg" },
        { name: "موناكو", logo: "https://upload.wikimedia.org/wikipedia/en/5/58/AS_Monaco_FC.svg" }
      ]
    }
  ],
  arab: [
    {
      name: "الدوري السعودي",
      logo: "https://upload.wikimedia.org/wikipedia/ar/5/57/Saudi_Pro_League_2021.png",
      clubs: [
        { name: "الهلال", logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Al_Hilal_SFC.svg" },
        { name: "النصر", logo: "https://upload.wikimedia.org/wikipedia/en/d/d5/Al_Nassr_FC.svg" },
        { name: "الاتحاد", logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Al-Ittihad_Club.png" },
        { name: "الأهلي", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Al-Ahli_Saudi_FC_logo.svg" }
      ]
    },
    {
      name: "الدوري المصري",
      logo: "https://upload.wikimedia.org/wikipedia/ar/8/8c/Egyptian_Premier_League_Logo.png",
      clubs: [
        { name: "الأهلي", logo: "https://upload.wikimedia.org/wikipedia/en/d/dd/Al_Ahly_SC_logo.svg" },
        { name: "الزمالك", logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Zamalek_SC_logo.svg" },
        { name: "بيراميدز", logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Pyramids_FC_logo.png" }
      ]
    }
  ]
};

// Simplified post rendering
function createPostHTML(post) {
  const { author, avatar, time, content, media, views, reactions } = post;
  
  return `
    <div class="post-container">
      <div class="post-header">
        <div class="author-info">
          <img src="${avatar}" class="author-avatar" alt="${author}">
          <div class="author-details">
            <span class="author-name">${author}</span>
            <span class="post-time">
              <i class="far fa-clock"></i>
              ${formatDate(time)}
            </span>
          </div>
        </div>
      </div>
      
      <div class="post-content">
        <div class="message-text">${content}</div>
        ${media ? `
          <div class="post-media">
            ${media.video ? `
              <video controls playsinline>
                <source src="${media.video}" type="video/mp4">
              </video>
            ` : media.image ? `
              <img src="${media.image}" alt="Post media">
            ` : ''}
          </div>
        ` : ''}
      </div>
      
      <div class="post-footer">
        <div class="post-stat">
          <i class="far fa-eye"></i>
          <span>${views} مشاهدة</span>
        </div>
        <div class="post-stat">
          <i class="far fa-heart"></i>
          <span>${reactions} إعجاب</span>
        </div>
        <div class="post-stat">
          <i class="far fa-comment"></i>
          <span>${Math.floor(Math.random() * 10)} تعليق</span>
        </div>
      </div>
    </div>
  `;
}

// Functions
function createLeagueCard(league) {
  return `
      <div class="league-card" onclick="showLeaguePosts('${league.name}')" data-league="${league.name}">
          <img src="${league.logo}" alt="${league.name}" class="league-logo">
          <div class="league-info">
              <div class="league-name">${league.name}</div>
              <div class="league-stats">${league.clubs.length} نادي</div>
          </div>
      </div>
  `;
}

function createClubsGrid(clubs) {
  return `
      <div class="clubs-grid">
          ${clubs.map(club => `
              <div class="club-card">
                  <img src="${club.logo}" alt="${club.name}" class="club-logo">
                  <div class="club-name">${club.name}</div>
              </div>
          `).join('')}
      </div>
  `;
}

function populateLeagues() {
  const bigFiveContainer = document.getElementById('bigFiveLeagues');
  const arabContainer = document.getElementById('arabLeagues');
  
  if (bigFiveContainer) {
    bigFiveContainer.innerHTML = LEAGUES_DATA.bigFive.map(createLeagueCard).join('');
  }

  if (arabContainer) {
    arabContainer.innerHTML = LEAGUES_DATA.arab.map(createLeagueCard).join('');
  }
}

function showClubs(leagueName) {
  const modal = document.getElementById('clubsModal');
  const modalLeagueName = document.getElementById('modalLeagueName');
  const clubsList = document.getElementById('clubsList');
  
  if (!modal || !modalLeagueName || !clubsList) return;

  const league = [...LEAGUES_DATA.bigFive, ...LEAGUES_DATA.arab].find(l => l.name === leagueName);
  if (league) {
    modalLeagueName.textContent = league.name;
    clubsList.innerHTML = createClubsGrid(league.clubs);
    modal.style.display = 'block';
  }
}

function showLeaguePosts(leagueName) {
  const leagueData = [...LEAGUES_DATA.bigFive, ...LEAGUES_DATA.arab].find(l => l.name === leagueName);
  
  if (!leagueData) return;

  const postsElement = document.getElementById('posts');
  const communityPage = document.getElementById('communitiesPage');
  
  // Generate mock posts for the league
  const leaguePosts = generateLeaguePosts(leagueData);
  
  // Create league header with data attribute for styling
  const leagueHeader = `
    <div class="league-page-header" data-league="${leagueData.name}">
      <div class="league-cover-image"></div>
      <div class="league-header-content">
        <img src="${leagueData.logo}" alt="${leagueData.name}" class="league-header-logo">
        <div class="league-header-info">
          <h1>${leagueData.name}</h1>
          <div class="league-stats">
            <span><i class="fas fa-users"></i> ${(Math.random() * 500000).toFixed(0)} متابع</span>
            <span><i class="fas fa-futbol"></i> ${leagueData.clubs.length} نادي</span>
            <span><i class="fas fa-star"></i> الدوري المميز</span>
          </div>
        </div>
        <button class="follow-btn" onclick="toggleFollow(this)">
          <i class="fas fa-plus"></i> متابعة
        </button>
      </div>
    </div>
    <div class="league-posts" data-league="${leagueData.name}">
      ${leaguePosts}
    </div>
  `;

  // Switch to posts view
  communityPage.classList.remove('active');
  document.getElementById('homePage').classList.add('active');
  postsElement.innerHTML = leagueHeader;
}

function generateLeaguePosts(league) {
  // Generate mock posts related to the league
  const posts = [
    {
      author: league.name,
      avatar: league.logo,
      time: new Date().toISOString(),
      content: `آخر أخبار وتحديثات ${league.name}! تابعونا للمزيد من التفاصيل حول المباريات القادمة والنتائج.`,
      media: { image: league.logo },
      views: Math.floor(Math.random() * 10000),
      reactions: Math.floor(Math.random() * 1000)
    },
    {
      author: league.clubs[0].name,
      avatar: league.clubs[0].logo,
      time: new Date(Date.now() - 3600000).toISOString(),
      content: `استعدادات ${league.clubs[0].name} للمباراة القادمة في ${league.name}`,
      media: { image: league.clubs[0].logo },
      views: Math.floor(Math.random() * 8000),
      reactions: Math.floor(Math.random() * 800)
    }
  ];

  return posts.map(post => createPostHTML(post)).join('');
}

function toggleFollow(btn) {
  btn.classList.toggle('following');
  if (btn.classList.contains('following')) {
    btn.innerHTML = '<i class="fas fa-check"></i> متابَع';
  } else {
    btn.innerHTML = '<i class="fas fa-plus"></i> متابعة';
  }
}

// Tab Navigation
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const pages = document.querySelectorAll('.page');

  // Initialize pages
  function initializePages() {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('homePage').classList.add('active');
    
    // Initialize content based on active page
    const activePage = document.querySelector('.page.active');
    if (activePage.id === 'homePage') {
      displayMultiChannelPosts();
    } else if (activePage.id === 'communitiesPage') {
      populateLeagues();
    }
  }

  // Tab click handler
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show corresponding page
      const pageId = button.getAttribute('data-page') + 'Page';
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');

      // Initialize content based on active page
      if (pageId === 'homePage') {
        displayMultiChannelPosts();
      } else if (pageId === 'communitiesPage') {
        populateLeagues();
      } else if (pageId === 'trendingPage') {
        loadTrendingHashtags();
      }
    });
  });

  // Initialize the application
  initializePages();
  
  // Event listeners for modals
  document.querySelectorAll('.modal .close-button').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Click outside modal to close
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Function to load trending hashtags (placeholder)
function loadTrendingHashtags() {
  const trendingList = document.querySelector('.trending-list');
  const mockTrends = [
    { tag: 'ريال_مدريد', count: '125K' },
    { tag: 'برشلونة_اتلتيكو', count: '98K' },
    { tag: 'الدوري_السعودي', count: '87K' },
    { tag: 'ليفربول_مانشستر', count: '76K' },
    { tag: 'كأس_العالم', count: '65K' }
  ];

  trendingList.innerHTML = mockTrends.map(trend => `
      <div class="trending-item">
          <span class="hashtag">#${trend.tag}</span>
          <span class="trend-count">${trend.count} تغريدة</span>
      </div>
  `).join('');
}

// Channels and posts functionality
const channels = [
  {
    username: 'RealMadrIdArabic18',
    name: 'ريال مدريد بالعربي',
    description: 'أخبار ريال مدريد باللغة العربية'
  },
  {
    username: 'bein_fantasy',
    name: 'فانتازي الدوري',
    description: 'كل ما يخص الفانتازي والتحليلات'
  },
  {
    username: 'hassanalihsn',
    name: 'حسن علي',
    description: 'أخبار وتحليلات رياضية'
  },
  {
    username: 'Erupean_sportt',
    name: 'الكرة الأوروبية',
    description: 'متابعة الدوريات الأوروبية'
  }
];

const POST_COUNT = 10;

async function displayMultiChannelPosts() {
  const loadingElement = document.getElementById('loading');
  const postsElement = document.getElementById('posts');
  
  try {
    loadingElement.style.display = 'block';
    postsElement.innerHTML = '';
    
    // Create channel sections
    const channelSections = channels.map(channel => `
      <div class="channel-section" id="channel-${channel.username}">
        <div class="channel-header">
          <h2>${channel.name}</h2>
          <span class="channel-username">@${channel.username}</span>
        </div>
        <div class="channel-posts-slider">
          <div class="slider-container">
            <div class="posts-wrapper" id="posts-${channel.username}">
              <div class="loading-posts">جاري تحميل المنشورات...</div>
            </div>
          </div>
          <button class="slider-button prev" onclick="prevSlide('${channel.username}')">
            <i class="fas fa-chevron-right"></i>
          </button>
          <button class="slider-button next" onclick="nextSlide('${channel.username}')">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    `).join('');
    
    postsElement.innerHTML = channelSections;
    
    // Fetch posts for each channel
    channels.forEach(async (channel) => {
      try {
        const postIDs = await fetchLatestPosts(channel.username);
        const posts = await Promise.all(
          postIDs.slice(0, POST_COUNT).map(postID => fetchPostData(channel.username, postID))
        );
        
        const postsWrapper = document.getElementById(`posts-${channel.username}`);
        if (postsWrapper) {
          postsWrapper.innerHTML = posts.filter(Boolean).join('');
          initializeChannelSlider(channel.username);
        }
      } catch (error) {
        console.error(`Error fetching posts for ${channel.username}:`, error);
        const postsWrapper = document.getElementById(`posts-${channel.username}`);
        if (postsWrapper) {
          postsWrapper.innerHTML = '<div class="error-message">عذراً، حدث خطأ في تحميل المنشورات</div>';
        }
      }
    });
    
  } catch (error) {
    console.error('Error displaying posts:', error);
    postsElement.innerHTML = `
      <div class="error-message">
        <p>عذراً، حدث خطأ أثناء تحميل المنشورات.</p>
        <p>يرجى المحاولة مرة أخرى لاحقاً.</p>
      </div>`;
  } finally {
    loadingElement.style.display = 'none';
  }
}

function initializeChannelSlider(channelUsername) {
  const wrapper = document.querySelector(`#posts-${channelUsername} .posts-wrapper`);
  if (!wrapper) return;
  
  wrapper.scrollLeft = 0;
  updateSliderButtons(channelUsername);
}

function updateSliderButtons(channelUsername) {
  const wrapper = document.querySelector(`#posts-${channelUsername} .posts-wrapper`);
  const prevBtn = document.querySelector(`#channel-${channelUsername} .slider-button.prev`);
  const nextBtn = document.querySelector(`#channel-${channelUsername} .slider-button.next`);
  
  if (!wrapper || !prevBtn || !nextBtn) return;
  
  prevBtn.style.display = wrapper.scrollLeft > 0 ? 'block' : 'none';
  nextBtn.style.display = 
    wrapper.scrollLeft < (wrapper.scrollWidth - wrapper.clientWidth) ? 'block' : 'none';
}

function prevSlide(channelUsername) {
  const wrapper = document.querySelector(`#posts-${channelUsername} .posts-wrapper`);
  if (!wrapper) return;
  
  wrapper.scrollBy({
    left: -wrapper.clientWidth,
    behavior: 'smooth'
  });
  
  setTimeout(() => updateSliderButtons(channelUsername), 500);
}

function nextSlide(channelUsername) {
  const wrapper = document.querySelector(`#posts-${channelUsername} .posts-wrapper`);
  if (!wrapper) return;
  
  wrapper.scrollBy({
    left: wrapper.clientWidth,
    behavior: 'smooth'
  });
  
  setTimeout(() => updateSliderButtons(channelUsername), 500);
}

async function fetchPostData(channelUsername, postID) {
  const url = `https://t.me/${channelUsername}/${postID}?embed=1&mode=tme`;
  const proxyUrls = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://cors-anywhere.herokuapp.com/${url}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];
  
  let html = null;
  
  // Try each proxy until one works
  for (let proxyUrl of proxyUrls) {
    try {
      const response = await fetch(proxyUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
        }
      });
      
      if (!response.ok) continue;
      
      html = await response.text();
      break;
    } catch (error) {
      console.warn(`Proxy failed: ${proxyUrl}`, error);
      continue;
    }
  }
  
  if (!html) {
    throw new Error('All proxies failed');
  }

  try {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");

    // Extract all basic post information
    let author = doc.querySelector(".tgme_widget_message_author")?.innerText.trim() || "غير معروف";
    let profilePic = doc.querySelector(".tgme_widget_message_user img")?.src || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
    let time = doc.querySelector(".datetime")?.getAttribute("datetime") || "غير متوفر";
    let views = doc.querySelector(".tgme_widget_message_views")?.innerText.trim() || "غير متوفر";
    let reactions = [...doc.querySelectorAll(".tgme_widget_message_reaction")].map(e => e.innerText).join(" ") || "لا توجد تفاعلات";
    
    // Improved video extraction
    let videos = [];
    // Direct video elements
    doc.querySelectorAll("video").forEach(video => {
      if (video.src) videos.push(video.src);
    });
    
    // Find video links in attributes
    doc.querySelectorAll("[data-video]").forEach(el => {
      let videoUrl = el.getAttribute("data-video");
      if (videoUrl) videos.push(videoUrl);
    });
    
    // Look for CDN video links in the HTML
    const videoPattern = /https:\/\/cdn[0-9]\.cdn-telegram\.org\/file\/[^"'\s]+\.mp4/g;
    const htmlContent = doc.documentElement.innerHTML;
    const cdnVideos = htmlContent.match(videoPattern) || [];
    videos.push(...cdnVideos);

    // Remove duplicates and filter valid URLs
    videos = [...new Set(videos)].filter(url => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    });

    // Comments count (real-time)
    const commentsData = await fetchComments(channelUsername, postID);
    let replies = commentsData.count || "0 تعليق";

    // Content extraction with animated emoji support
    let content = doc.querySelector(".tgme_widget_message_text")?.innerHTML.trim() || "لا يوجد محتوى";
    
    // Handle animated emoji
    const tgsElements = doc.querySelectorAll(".tgme_widget_message_text .js-message_animated_emoji");
    tgsElements.forEach((elem, index) => {
      const tgsUrl = elem.getAttribute('data-document-url') || elem.getAttribute('data-sticker');
      if (tgsUrl) {
        const uniqueId = `tgs-${postID}-${index}`;
        content = content.replace(elem.outerHTML, `<div class="tgs-container" id="${uniqueId}" data-tgs-url="${tgsUrl}"></div>`);
      }
    });

    // Image extraction
    let images = [];
    doc.querySelectorAll(".tgme_widget_message_photo_wrap").forEach(el => {
      const bgImg = el.style.backgroundImage;
      const match = bgImg.match(/url\(['"]?(.*?)['"]?\)/);
      if (match && match[1]) images.push(match[1]);
    });
    
    // Direct images
    doc.querySelectorAll(".tgme_widget_message_photo img").forEach(img => {
      if (img.src) images.push(img.src);
    });

    // Clean and deduplicate images
    images = [...new Set(images.filter(Boolean))];

    let mediaHTML = "";
    
    // Add videos
    videos.forEach(videoUrl => {
      mediaHTML += `
          <div class="video-container">
              <video controls playsinline>
                  <source src="${videoUrl}" type="video/mp4">
                  متصفحك لا يدعم تشغيل الفيديو
              </video>
          </div>`;
    });
    
    // Add images
    images.forEach(img => {
      mediaHTML += `
          <img src="${img}" 
               alt="صورة" 
               loading="lazy" 
               onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMC04LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=';">`;
    });

    // Return complete post HTML
    return createPostHTML({
      author,
      avatar: profilePic,
      time,
      content,
      media: {
        video: videos[0],
        image: images[0]
      },
      views,
      reactions
    });
  } catch (error) {
    console.error(`Error fetching post ${postID}:`, error);
    return null;
  }
}

async function fetchComments(channelUsername, postID) {
  try {
    // تحسين جلب التعليقات بشكل مباشر
    const url = `https://t.me/${channelUsername}/${postID}?comment=1&embed=1`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // استخراج عدد التعليقات من صفحة المناقشة
    const commentsSection = doc.querySelector(".tgme_widget_message_replies");
    const commentsText = commentsSection?.innerText.trim();
    const commentsCount = commentsText?.match(/\d+/)?.[0] || "0";
    
    return {
      count: `${commentsCount} تعليق`,
      url: `https://t.me/${channelUsername}/${postID}`
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { count: "0 تعليق", url: `https://t.me/${channelUsername}/${postID}` };
  }
}

function formatDate(dateString) {
  if (!dateString) return "غير متوفر";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateString;
  }
}

function openComments(channelUsername, postID) {
  const modal = document.getElementById('commentsModal');
  const container = document.getElementById('commentsContainer');
  
  // Clear previous comments
  container.innerHTML = '';
  
  // Create and insert the Telegram comments widget
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?22';
  script.setAttribute('data-telegram-discussion', `${channelUsername}/${postID}`);
  script.setAttribute('data-comments-limit', '5');
  
  container.appendChild(script);
  
  // Show modal
  modal.style.display = 'block';
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

function closeCommentsModal() {
  const modal = document.getElementById('commentsModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const commentsModal = document.getElementById('commentsModal');
  const userProfileModal = document.getElementById('userProfileModal');
  
  if (event.target === commentsModal) {
    closeCommentsModal();
  }
  if (event.target === userProfileModal) {
    closeUserProfileModal();
  }
}

async function fetchLatestPosts(channelUsername) {
  try {
    const url = `https://t.me/s/${channelUsername}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // تحسين استخراج معرفات المنشورات
    const postElements = doc.querySelectorAll('.tgme_widget_message');
    
    if (!postElements.length) {
      console.warn('No posts found in the channel page');
      throw new Error('No posts found');
    }

    const postIDs = Array.from(postElements)
      .map(el => {
        const dataPost = el.getAttribute('data-post') || '';
        const match = dataPost.match(/\d+$/);
        return match ? match[0] : null;
      })
      .filter(Boolean)
      .slice(-POST_COUNT)
      .reverse();

    console.log('Found post IDs:', postIDs);
    return postIDs;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
}

async function displayPosts(channelUsername) {
  const loadingElement = document.getElementById('loading');
  const postsElement = document.getElementById('posts');
  
  try {
    loadingElement.style.display = 'block';
    
    // Display channel header
    const channel = channels.find(c => c.username === channelUsername) || {
      name: channelUsername,
      username: channelUsername,
      avatar: 'https://via.placeholder.com/48'
    };
    
    postsElement.innerHTML = `
      <div class="channel-header">
        <img src="${channel.avatar}" alt="${channel.name}">
        <div class="channel-info">
          <h2>${channel.name}</h2>
          <span class="username">@${channel.username}</span>
        </div>
      </div>
      <div class="posts-wrapper"></div>
    `;
    
    const postIDs = await fetchLatestPosts(channelUsername);
    const posts = await Promise.all(
      postIDs.map(postID => fetchPostData(channelUsername, postID))
    );
    
    const postsWrapper = postsElement.querySelector('.posts-wrapper');
    postsWrapper.innerHTML = posts.filter(Boolean).join('');
    
  } catch (error) {
    console.error('Error displaying posts:', error);
    postsElement.innerHTML = `
      <div class="error-message">
        <p>عذراً، حدث خطأ أثناء تحميل المنشورات.</p>
        <p>يرجى المحاولة مرة أخرى لاحقاً.</p>
      </div>
    `;
  } finally {
    loadingElement.style.display = 'none';
  }
}

// Update current channel index tracking
let currentChannelIndex = 0;

async function loadNextChannel() {
  currentChannelIndex = (currentChannelIndex + 1) % channels.length;
  await displayPosts(channels[currentChannelIndex].username);
}

// Initialize with first channel
document.addEventListener('DOMContentLoaded', async () => {
  await displayPosts(channels[0].username);
});

// Remove stories-related code and add slider functionality
let currentSlide = 0;
let posts = [];

function initializeSlider() {
  const postsContainer = document.getElementById('posts');
  if (!postsContainer) return;

  // Wrap existing posts in slider structure
  const posts = Array.from(postsContainer.children);
  if (posts.length === 0) return;

  const sliderHTML = `
    <div class="post-slider">
      <button class="slider-button prev" onclick="prevSlide()">
        <i class="fas fa-chevron-right"></i>
      </button>
      <button class="slider-button next" onclick="nextSlide()">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="slider-container">
        <div class="posts-wrapper">
          ${posts.map(post => post.outerHTML).join('')}
        </div>
      </div>
      <div class="slider-dots">
        ${posts.map((_, i) => `
          <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
        `).join('')}
      </div>
    </div>
  `;

  postsContainer.innerHTML = sliderHTML;
  updateSlidePosition();
}

function updateSlidePosition() {
  const wrapper = document.querySelector('.posts-wrapper');
  if (!wrapper) return;
  
  wrapper.style.transform = `translateX(${currentSlide * 100}%)`;
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  const totalSlides = document.querySelectorAll('.post-container').length;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
}

function prevSlide() {
  const totalSlides = document.querySelectorAll('.post-container').length;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlidePosition();
}

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchmove', e => {
  touchEndX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe right - show previous post
      prevSlide();
    } else {
      // Swipe left - show next post
      nextSlide();
    }
  }
});

// Add pull-to-refresh functionality
let touchStartY = 0;
let touchEndY = 0;
let pullStarted = false;
let pullIndicator = null;

function initializePullToRefresh() {
  const pullIndicator = document.createElement('div');
  pullIndicator.className = 'pull-indicator';
  pullIndicator.innerHTML = `
    <div class="pull-spinner">
      <i class="fas fa-sync-alt"></i>
    </div>
    <span>اسحب لتحديث القنوات</span>
  `;
  
  document.body.appendChild(pullIndicator);
  window.pullIndicator = pullIndicator;
  
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
}

function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
  pullStarted = window.scrollY === 0;
}

function handleTouchMove(e) {
  if (!pullStarted || !window.pullIndicator) return;
  
  touchEndY = e.touches[0].clientY;
  touchEndX = e.touches[0].clientX;
  
  const pullDistance = touchEndY - touchStartY;
  const horizontalDistance = Math.abs(touchEndX - touchStartX);
  
  // If pulling vertically (more vertical than horizontal movement)
  if (pullDistance > 0 && pullDistance > horizontalDistance) {
    window.pullIndicator.style.transform = `translateY(${Math.min(pullDistance, 150)}px)`;
    window.pullIndicator.style.opacity = Math.min(pullDistance / 150, 1);
    
    if (pullDistance > 100) {
      window.pullIndicator.querySelector('span').textContent = 'حرر للتحديث';
    }
    
    e.preventDefault();
  }
}

function handleTouchEnd() {
  if (!pullStarted || !window.pullIndicator) return;
  
  const pullDistance = touchEndY - touchStartY;
  
  if (pullDistance > 100) {
    window.pullIndicator.querySelector('.pull-spinner').classList.add('spinning');
    window.pullIndicator.querySelector('span').textContent = 'جاري التحديث...';
    
    // Load next channel
    loadNextChannel().then(() => {
      resetPullIndicator();
    });
  } else {
    resetPullIndicator();
  }
}

function resetPullIndicator() {
  if (!window.pullIndicator) return;
  
  window.pullIndicator.style.transform = 'translateY(0)';
  window.pullIndicator.style.opacity = '0';
  window.pullIndicator.querySelector('.pull-spinner').classList.remove('spinning');
  window.pullIndicator.querySelector('span').textContent = 'اسحب لتحديث القنوات';
  pullStarted = false;
}

// Update current channel indicator tracking
let currentChannelIndicator = null;

function updateCurrentChannelIndicator(channelUsername) {
  if (!currentChannelIndicator) {
    currentChannelIndicator = document.createElement('div');
    currentChannelIndicator.className = 'current-channel';
    document.body.appendChild(currentChannelIndicator);
  }
  
  const channelInfo = channels.find(c => c.username === channelUsername);
  currentChannelIndicator.innerHTML = `
    <i class="fas fa-broadcast-tower"></i>
    ${channelInfo ? channelInfo.name : channelUsername}
  `;
}

// Initialize pull-to-refresh
document.addEventListener('DOMContentLoaded', () => {
  initializePullToRefresh();
});

// Update search channel function
function searchChannel() {
  const channelInput = document.getElementById('channelInput');
  let input = channelInput.value.trim();
  
  // Check if input is a post URL
  if (input.includes('t.me/') && input.includes('/')) {
    try {
      const urlParts = input.split('t.me/')[1].split('/');
      const channelUsername = urlParts[0];
      const postID = urlParts[1];
      
      // Display single post if post ID exists
      if (postID) {
        const loadingElement = document.getElementById('loading');
        const postsElement = document.getElementById('posts');
        
        loadingElement.style.display = 'block';
        postsElement.innerHTML = '';
        
        const postHTML = fetchPostData(channelUsername, postID);
        if (postHTML) {
          postsElement.innerHTML = postHTML;
          initializeSlider();
        } else {
          throw new Error('Failed to load post');
        }
        
        loadingElement.style.display = 'none';
        return;
      }
      
      // If no post ID, show channel posts
      displayPosts(channelUsername);
      return;
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  }
  
  // Handle regular channel search
  let channelUsername = input;
  
  if (channelUsername === '') {
    displayMultiChannelPosts();
    return;
  }
  
  // Remove @ symbol if present
  channelUsername = channelUsername.replace('@', '');
  
  if (channelUsername) {
    displayPosts(channelUsername);
  } else {
    alert('الرجاء إدخال اسم القناة أو رابط المنشور');
  }
}

// Remove unused functions