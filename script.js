const tickerMessages = [
  '<span class="team-name">ليفربول:</span> <span class="player-name">محمد صلاح</span> يقود خط الهجوم | <span class="player-name">فان دايك</span> يقود خط الدفاع',
  '<span class="team-name">إيفرتون:</span> <span class="player-name">كالفرت-لوين</span> جاهز للمباراة | <span class="player-name">بيكفورد</span> في حراسة المرمى',
  'إحصائيات الفريقين في الدوري | <span class="news-item">متابعة حية للمباراة</span> | أخر استعدادات الفريقين'
];

let currentMessageIndex = 0;
const tickerContent = document.getElementById('ticker-content');

setInterval(() => {
  currentMessageIndex = (currentMessageIndex + 1) % tickerMessages.length;
  tickerContent.style.opacity = '0';
  
  setTimeout(() => {
    tickerContent.innerHTML = tickerMessages[currentMessageIndex];
    tickerContent.style.opacity = '1';
  }, 500);
}, 180000);

const playButton = document.getElementById('playButton');
const youtubePlayer = document.getElementById('youtubePlayer');
const popup = document.getElementById('popup');
let clickCount = 0;
let isPlayed = false;

playButton.addEventListener('click', function () {
  clickCount++;
  
  if (clickCount === 1) {
    // First click - redirect to the provided URL
    window.location.href = 'https://www.effectiveratecpm.com/jxn3eb514?key=6190bee5dd50481bd84dd51bdb987985';
  } else if (clickCount === 2) {
    // Second click - show stream
    if (!isPlayed) {
      youtubePlayer.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}', 
        '*'
      );
      isPlayed = true;
    }
    popup.style.display = "flex";
  }
});