document.addEventListener('DOMContentLoaded', function() {
    const notifications = [
        "🟢Kick kanalını Takip Et<br/>🔗<a href='https://kick.com/ekipgamestv' target='_blank'>kick.com/EkipGamesTV</a>",
        "🟣Twitch kanalını Takip Et<br/>🔗<a href='https://www.twitch.tv/ekipgamestv' target='_blank'>twitch.tv/EkipGamesTV</a>",
        "💰Web Sitemizi Destekle.<br/>🔗<a href='https://donate.bynogame.com/ekipgamestv' target='_blank'>ByNoGame</a>",
        "Euro Truck Simulator 2 v1.55 Çıktı<br/><a href='https://www.ekipgames.com/2025/07/Euro-Truck-Simulator-2-v1-55.html' target='_blank'>Şimdi İncele</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/neoplan-cityliner.html' target='_blank'>Neoplan Cityliner</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/neoplan-tourliner-c13.html' target='_blank'>Neoplan Tourliner C13</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/yeni-man-lions.html' target='_blank'>Man Lion's 2023</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/2023-travego-15shd.html' target='_blank'>2023 Travego 15SHD</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/setra-516hd.html' target='_blank'>Setra S516HD</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/setra-s531dt.html' target='_blank'>Setra S531DT</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/temsa-safir-2-vip.html#google_vignette' target='_blank'>Temsa Safir 2 VIP</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/temsa-safir-plus-hd-13.html' target='_blank'>Temsa Safir Plus HD 13</a>",
        "🚌Yeni Otobüs Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/temsa-maraton-3-vip.html' target='_blank'>Temsa Maraton 3 VIP</a>",
        "🗺️Yeni Harita Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/grand-utopia.html' target='_blank'>Grand Utopia 1:1</a>",
        "🗺️Yeni Harita Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/tasiyici-map.htmll' target='_blank'>Taşıyıcı Map</a>",
        "🗺️Yeni Harita Mod'u Yayınlandı.<br/>🔗<a href='https://www.ekipgames.com/p/oyuncuyusbis-map.html' target='_blank'>OyuncuyusBisMap</a>",
    ];

    let currentIndex = parseInt(localStorage.getItem('currentNotificationIndex')) || 0;
    let lastUpdateTime = parseInt(localStorage.getItem('lastUpdateTime')) || Date.now();
    let notificationInterval;
    let pauseStartTime;
    let hideTimeout;
    let notificationCount = notifications.length;
    let remainingTime = notificationCount * 10000;
    let startTime;

    function updateNotification() {
        const now = Date.now();
        const notificationContent = document.getElementById('notification-content');
        if (notificationContent) {
            if (currentIndex >= notifications.length) {
                currentIndex = 0;
            }
            notificationContent.innerHTML = notifications[currentIndex];
            notificationContent.style.display = 'block';
        } else {
            console.error("Element with ID 'notification-content' not found.");
        }

        currentIndex = (currentIndex + 1) % notifications.length;
        localStorage.setItem('currentNotificationIndex', currentIndex);
        updateNotificationCount();

        lastUpdateTime = now;
        localStorage.setItem('lastUpdateTime', lastUpdateTime);
    }

    function updateNotificationCount() {
        const countElement = document.querySelector('.notification-no');
        if (countElement) {
            countElement.textContent = notifications.length;
        } else {
            console.error("Element with class 'notification-no' not found.");
        }
    }

    function hideNotificationFor10Minutes() {
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;
        const hideUntil = now + tenMinutes;

        localStorage.setItem('notification-hide-until', hideUntil);
        const notificationBox = document.getElementById('notification-box');
        if (notificationBox) {
            notificationBox.style.display = 'none';
        } else {
            console.error("Element with ID 'notification-box' not found.");
        }
    }

    function checkNotificationVisibility() {
        const hideUntil = localStorage.getItem('notification-hide-until');
        const now = Date.now();

        if (hideUntil && now < hideUntil) {
            document.getElementById('notification-box').style.display = 'none';
        } else {
            document.getElementById('notification-box').style.display = 'block';
            localStorage.removeItem('notification-hide-until');
        }
    }

    function startNotificationInterval() {
        notificationInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - lastUpdateTime;

            if (elapsed >= 10000) {
                updateNotification();
            }
        }, 1000);
    }

    function stopNotificationInterval() {
        clearInterval(notificationInterval);
        pauseStartTime = Date.now();
    }

    function resumeNotificationInterval() {
        const now = Date.now();
        const pauseDuration = now - pauseStartTime;

        lastUpdateTime += pauseDuration;
        localStorage.setItem('lastUpdateTime', lastUpdateTime);

        startNotificationInterval();
    }

    function autoHideNotification() {
        startTime = Date.now();
        hideTimeout = setTimeout(() => {
            const notificationBox = document.getElementById('notification-box');
            if (notificationBox) {
                notificationBox.style.display = 'none';
            } else {
                console.error("Element with ID 'notification-box' not found.");
            }
        }, remainingTime);
    }

    function pauseAutoHide() {
        clearTimeout(hideTimeout);
        const now = Date.now();
        remainingTime -= (now - startTime);
    }

    function resumeAutoHide() {
        startTime = Date.now();
        autoHideNotification();
    }

    setTimeout(() => {
        checkNotificationVisibility();
        updateNotification();
        startNotificationInterval();
        autoHideNotification();
    }, 2000);

    const closeButton = document.getElementById('close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideNotificationFor10Minutes();
            notifications.splice(currentIndex, 1);
            notificationCount = notifications.length;
            remainingTime = notificationCount * 10000;
            updateNotificationCount();

            if (currentIndex >= notificationCount) {
                currentIndex = 0;
            }
            updateNotification();
        });
    } else {
        console.error("Element with ID 'close-notification' not found.");
    }

    const notificationBox = document.getElementById('notification-box');
    if (notificationBox) {
        notificationBox.addEventListener('mouseenter', function() {
            stopNotificationInterval();
            pauseAutoHide();
        });

        notificationBox.addEventListener('mouseleave', function() {
            resumeNotificationInterval();
            resumeAutoHide();
        });
    } else {
        console.error("Element with ID 'notification-box' not found.");
    }
});
