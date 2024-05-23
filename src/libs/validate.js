import { Term, Zone, AuthUse, Validity, ExpeditionType, UrbanType } from '../models/License.models.js';
import { User, Group, Role } from '../models/Users.models.js';

export const validate = async (license) => {
    if (license.term) {
        const terms = await Term.findAll({
            where: {
                id: license.term
            }
        });

        if(terms.length == 0) {
            return null;
        }
    }

    if (license.zone) {
        const zones = await Zone.findAll({
            where: {
                id: license.zone
            }
        });

        if(zones.length == 0) {
            return null;
        }
    }

    if (license.authUse) {
        const authUses = await AuthUse.findAll({
            where: {
                id: license.authUse
            }
        });

        if(authUses.length == 0) {
            return null;
        }
    }

    if (license.validity) {
        const validities = await Validity.findAll({
            where: {
                id: license.validity
            }
        });

        if(validities.length == 0) {
            return null;
        }
    }

    if (license.expeditionType) {
        const expeditionTypes = await ExpeditionType.findAll({
            where: {
                id: license.expeditionType
            }
        });

        if(expeditionTypes.length == 0) {
            return null;
        }
    }

    if (license.urbanType) {
        const urbanTypes = await UrbanType.findAll({
            where: {
                id: license.urbanType
            }
        });

        if(urbanTypes.length == 0) {
            return null;
        }
    }

    if (!license.term && !license.zone && !license.authUse && !license.validity && !license.expeditionType && !license.urbanType) {
        return null;
    }

    return true;
}

export const validateUserInfo = async (user) => {
    if (user.username) {
        const username = await User.findOne({
            where: {
                username: user.username
            }
        });

        if(!username == null) {
            return null;
        }
    }

    if (user.role) {
        const role = await Role.findByPk(user.role);

        if (role == null) {
            return null;
        }
    }

    if (user.group) {
        const group = await Group.findByPk(user.group);

        if (group == null) {
            return null;
        }
    }

    if (!user.username && !user.role && !user.group) {
        return null;
    }

    return true;
}