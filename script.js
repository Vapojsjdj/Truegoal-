let timerRunning = false;
let inactivityTimer;
let totalInactiveTime = 0;
let lastActiveTime;
let activityCheckInterval;
let timerInterval;

function updateTimerDisplay() {
    document.getElementById('inactiveTimeCounter').textContent = `${totalInactiveTime}s`;
}

function startTimer() {
    localStorage.removeItem('lastVisitDuration');
    localStorage.removeItem('countdownCompleted');
    
    const startTime = new Date();
    lastActiveTime = startTime;
    
    document.getElementById('timerDisplay').style.display = 'block';
    
    const videoUrl = 'https://youtu.be/84i8sGUc2AA?si=1QQxN0WnRtUimC41';
    const popupWindow = window.open(videoUrl, 'Timer', 'width=800,height=600,resizable=yes,location=yes,status=yes,scrollbars=yes');
    
    if (popupWindow) {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                startInactivityTimer();
            } else {
                stopInactivityTimer();
            }
        });

        popupWindow.addEventListener('blur', () => {
            startInactivityTimer();
        });
        
        popupWindow.addEventListener('focus', () => {
            stopInactivityTimer();
        });

        const checkInterval = setInterval(() => {
            if (popupWindow.closed) {
                clearInterval(checkInterval);
                stopInactivityTimer();
                
                if (totalInactiveTime < 80) {  
                    document.getElementById('passwordContainer').style.display = 'none';
                } else {
                    document.getElementById('passwordContainer').style.display = 'block';
                }
            }
        }, 1000);
    } else {
        alert('Please enable popups for this site to continue.');
    }
}

function startInactivityTimer() {
    if (!inactivityTimer) {
        lastActiveTime = new Date();
        inactivityTimer = setInterval(() => {
            totalInactiveTime++;
            updateTimerDisplay();
            
            if (totalInactiveTime >= 80) {  
                document.getElementById('passwordContainer').style.display = 'block';
            }
        }, 1000);
    }
}

function stopInactivityTimer() {
    if (inactivityTimer) {
        clearInterval(inactivityTimer);
        inactivityTimer = null;
        lastActiveTime = new Date();
    }
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === 'ZEROBAN') {
        document.getElementById('downloadBtn').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function downloadFile() {
    if (totalInactiveTime < 80) {
        document.getElementById('downloadError').style.display = 'block';
        return;
    }
    const password = document.getElementById('passwordInput').value;
    if (password !== 'ZEROBAN') {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }
    
    window.location.href = 'https://www.mediafire.com/file/2n16zebunmdh8nq/ZEROBAN_MODMENU.apk/file';
}