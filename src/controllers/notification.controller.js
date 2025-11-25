import { requestHandler } from '../utilities/request.utilities.js';
import * as logger from '../utilities/logger.utilities.js';
import * as notificationService from '../services/notification.service.js';

export const getLatestNotifications = requestHandler(
    async (req, res) => {
        const { group, permissions } = req.user;

        const response = await notificationService.requestLatestNotifications(group, permissions);

        res.status(200).json(response);

        logger.logRequestInfo('Latest Notifications request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Latest 30 notification requested`);
    }
);