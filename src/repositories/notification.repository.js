import { Notification } from "../models/Notification.model.js";
import { User } from "../models/Users.models.js";

export async function saveNotifications(data, internal = true) {
    const { fullInvoice, url, commenter } = data;
    return await Notification.create({
        url,
        fullInvoice,
        internal,
        commenter
    });
}

export async function findLatestNotifications(internal = true) {
    const notifications = await Notification.findAll({
        where: {
            internal
        },
        limit: 30,
        order: [['createdAt', 'DESC']],
        include: {
            model: User,
            attributes: ['name','username']
        },
        attributes: ['notification_uuid', 'url', 'fullInvoice', 'createdAt'],
        raw: true,
        nest: true
    });

    return notifications.reverse();
}