document.addEventListener('DOMContentLoaded', function() {
    const notifications = [
        "📧 1 Davet Mektubunuz Var.<br/><a href='https://kick.com/ekipgamestv' target='_blank'>kick.com/EkipGamesTV</a>",
        "Discord'a gelmeyi unutmayın.<br/><a href='https://discord.gg/Scsxdnv3xw' target='_blank'>Ekip Games™</a>",
        "Man Cityliner - v1.54<br/><a href='https://www.ekipgames.com/p/neoplan-cityliner.html' target='_blank'>Mod'u İndir</a>",
        "Neoplan Tourliner C13 - v1.54<br/><a href='https://www.ekipgames.com/p/neoplan-tourliner-c13.html' target='_blank'>Mod'u İndir</a>",
        "Man Lion's 2023 - v1.54<br/><a href='https://www.ekipgames.com/p/yeni-man-lions.html' target='_blank'>Mod'u İndir</a>",
        "Yeni Tourismo 16RHD 2020 - v1.54<br/><a href='https://www.ekipgames.com/p/yeni-tourismo-16rhd-2020.html' target='_blank'>Mod'u İndir</a>",
        "Travego SE 15SHD - v1.54<br/><a href='https://www.ekipgames.com/p/travego-se-15shd.html' target='_blank'>Mod'u İndir</a>",
        "Travego SE 17SHD - v1.54<br/><a href='https://www.ekipgames.com/p/travego-se-17shd.html' target='_blank'>Mod'u İndir</a>",
        "2023 Travego 15SHD - v1.54<br/><a href='https://www.ekipgames.com/p/2023-travego-15shd.html' target='_blank'>Mod'u İndir</a>",
        "Setra S531DT - v1.54<br/><a href='https://www.ekipgames.com/p/setra-s531dt.html' target='_blank'>Mod'u İndir</a>",
        "Temsa Safir 2 VIP - v1.54<br/><a href='https://www.ekipgames.com/p/temsa-safir-2-vip.html#google_vignette' target='_blank'>Mod'u İndir</a>",
        "Temsa Safir Plus HD 13 - v1.54<br/><a href='https://www.ekipgames.com/p/temsa-safir-plus-hd-13.html' target='_blank'>Mod'u İndir</a>",
        "Temsa Maraton 3 VIP - v1.54<br/><a href='https://www.ekipgames.com/p/temsa-maraton-3-vip.html' target='_blank'>Mod'u İndir</a>",
        "Grand Utopia 1:1 - v1.54<br/><a href='https://www.ekipgames.com/p/grand-utopia.html' target='_blank'>Mod'u İndir</a>",
        "OyuncuyusBisMap - v1.54<br/><a href='https://www.ekipgames.com/p/turkiye-yks-haritasi.html' target='_blank'>Mod'u İndir</a>",
        "ATS ve ETS2 Kış Modu<br/><a href='https://www.ekipgames.com/p/ats-ve-ets2-kis-modu.html' target='_blank'>Mod'u İndir</a>",
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
