import { Term, Zone, AuthUse, Validity, ExpeditionType, UrbanType } from '../models/License.models.js';

export const validate = async (obj) => {
    if (obj.term) {
        const terms = await Term.findAll({
            where: {
                id: obj.term
            }
        });

        if(terms.length == 0) {
            return null;
        }
    }

    if (obj.zone) {
        const zones = await Zone.findAll({
            where: {
                id: obj.zone
            }
        });

        if(zones.length == 0) {
            return null;
        }
    }

    if (obj.authUse) {
        const authUses = await AuthUse.findAll({
            where: {
                id: obj.authUse
            }
        });

        if(authUses.length == 0) {
            return null;
        }
    }

    if (obj.validity) {
        const validities = await Validity.findAll({
            where: {
                id: obj.validity
            }
        });

        if(validities.length == 0) {
            return null;
        }
    }

    if (obj.expeditionType) {
        const expeditionTypes = await ExpeditionType.findAll({
            where: {
                id: obj.expeditionType
            }
        });

        if(expeditionTypes.length == 0) {
            return null;
        }
    }

    if (obj.urbanType) {
        const urbanTypes = await UrbanType.findAll({
            where: {
                id: obj.urbanType
            }
        });

        if(urbanTypes.length == 0) {
            return null;
        }
    }

    if (!obj.term && !obj.zone && !obj.authUse && !obj.validity && !obj.expeditionType && !obj.urbanType) {
        return null;
    }

    return true;
}