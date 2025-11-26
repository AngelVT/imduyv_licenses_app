const notificationTab = document.createElement('span');
const notificationPanel = document.getElementById('notification-panel');
if (!localStorage.getItem('notifications_history')) {
    localStorage.setItem('notifications_history', JSON.stringify([]))
}

const notificationsHistory = JSON.parse(localStorage.getItem('notifications_history'));

notificationTab.id = 'notification-tab';
notificationTab.innerHTML = 
`<div class="tab-icon">
    <i class="bi ${notificationsHistory.some(n => n.read === false) ? 'bi-bell-fill' : 'bi-bell'}"></i>
</div>

<div id="notification-panel">
    <ul class="notification-list">
    </ul>
</div>`;

document.body.appendChild(notificationTab);

const notifIcon = document.getElementById('notification-tab').querySelector('i');
const notifList = document.getElementById('notification-panel').querySelector('ul');
const notifSound = new Audio('/public/sound/notification.mp3');

function createNotification(data) {
    const { notification_uuid, fullInvoice, url, createdAt, user } = data;

    let notif = notificationsHistory.find(n => n.notification_uuid === notification_uuid);

    if (!notif) {
        if (notificationsHistory.length === 30) {
            notificationsHistory.shift();
        }

        notificationsHistory.push({
            notification_uuid,
            read: false
        });

        localStorage.setItem('notifications_history', JSON.stringify(notificationsHistory));
    }

    const notification = document.createElement('li');
    notification.id = `notif_${notification_uuid}`

    const notificationLink = document.createElement('a');

    const notificationInfo = document.createElement('p');
    notificationInfo.innerHTML = `<span class="bi-person-circle"> ${user.username}</span><span class="bi-calendar-event"> ${new Date(createdAt).toLocaleString()}</span>`;

    notification.classList.add('notification-item');

    notif = notificationsHistory.find(n => n.notification_uuid === notification_uuid);

    if (notif.read === false) {
        notification.classList.add('unread');
    }

    notificationLink.innerText = `Hay un comentario nuevo de ${user.name} en la licencia ${fullInvoice?.replaceAll('_', '/')}.`;
    notificationLink.target = '_blank';
    notificationLink.href = url;

    notification.appendChild(notificationLink);
    notification.appendChild(notificationInfo);
    notifList.appendChild(notification);

    notificationLink.addEventListener('click', () => {
        notification.classList.remove('unread');
        notif.read = true;

        if (notificationsHistory.some(n => n.read === false)) {
            notifIcon.classList.remove('bi-bell');
            notifIcon.classList.add('bi-bell-fill');
        } else {
            notifIcon.classList.add('bi-bell');
            notifIcon.classList.remove('bi-bell-fill');
        }

        localStorage.setItem('notifications_history', JSON.stringify(notificationsHistory));
    });
}

const socket = io("/", {
    transports: ["websocket"],
    withCredentials: true
});

socket.on("new_comment", (data) => {
    notifIcon.classList.remove('bi-bell');
    notifIcon.classList.add('bi-bell-fill');
    createNotification(data);
    notifSound.currentTime = 0;
    notifSound.play();
});

async function getLatestNotifications() {
    const res = await fetch(`/app/notification/latest`, {
        method: 'GET',
        credentials: 'include',
    });

    const response = await res.json();

    if (!res.ok) {
        console.warn(response.msg);
    }

    for (const n of response.notifications) {
        createNotification(n);
    }
}

getLatestNotifications();