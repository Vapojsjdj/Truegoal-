// Function to scroll comments box to bottom
function scrollCommentsToBottom() {
  const commentsBox = document.getElementById('commentsBox');
  const observer = new MutationObserver((mutations) => {
    // Check if the Telegram widget iframe has been added
    const iframe = commentsBox.querySelector('iframe');
    if (iframe) {
      // Wait for iframe to load
      iframe.addEventListener('load', () => {
        // Give a small delay to ensure comments are loaded
        setTimeout(() => {
          commentsBox.scrollTop = commentsBox.scrollHeight;
        }, 1000);
      });
      observer.disconnect(); // Stop observing once iframe is found
    }
  });

  // Start observing the comments box for changes
  observer.observe(commentsBox, {
    childList: true,
    subtree: true
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', scrollCommentsToBottom);