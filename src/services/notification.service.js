import { findLatestNotifications } from "../repositories/notification.repository.js";
import ValidationError from "../errors/ValidationError.js";

export async function requestLatestNotifications(group, permissions) {
    if (!group || !permissions) {
        throw new ValidationError('Request failed due to missing user information.',
            'Latest notifications request',
            `Request failed due to no user information was provided`);
    }

    let notifications = [];

    if (group === 'consultant' && (permissions.includes('consultant:comment') || permissions.includes('consultant:manage'))) {
        notifications = await findLatestNotifications(true);
    }

    if ((group === 'land_use' || group === 'all') && (permissions.includes('license:update') || permissions.includes('license:manage'))) {
        notifications = await findLatestNotifications(false);
    }

    return {
        notifications
    }
}