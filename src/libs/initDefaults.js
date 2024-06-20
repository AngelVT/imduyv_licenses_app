import { User, Role, Group } from "../models/Users.models.js";
import { Type, Term, Zone, AuthUse, Validity, ExpeditionType, UrbanType } from "../models/License.models.js";
import { encryptPassword } from "./passwordCrypt.js";
import config from "../config.js";
import { consoleLogger, logger } from "../logger.js";

export const setDefaultRoles = async () => {
    try {
        await Role.sync();

        const count = await Role.count();

        if (count > 0) return;

        const createdRoles = await Promise.all([
            Role.create({ id: 1, role: 'system'}),
            Role.create({ id: 2, role: 'admin'}),
            Role.create({ id: 3, role: 'moderator'}),
            Role.create({ id: 4, role: 'user'})
        ]);

        consoleLogger.info("\n  Default roles have been set");
        logger.info("Default roles have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default user roles:\n    ${error}`);
    }
}

export const setDefaultGroups = async () => {
    try {
        await Group.sync();

        const count = await Group.count();

        if (count > 0) return;

        const createdGroup = await Promise.all([
            Group.create({ id: 1, group: 'all'}),
            Group.create({ id: 2, group: 'land_use'}),
            Group.create({ id: 3, group: 'urban'})
        ]);

        consoleLogger.info("\n  Default groups have been set");
        logger.info("Default groups have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default user groups:\n    ${error}`);
    }
}

export const setDefaultUsers = async () => {
    try {
        await User.sync();

        const count = await User.count();

        if (count > 0) return;

        const cryptPassword = await encryptPassword(config.SECRET);

        const createdUser = await User.create({
            name: "Usuario Admin",
            username: "dev",
            password: cryptPassword,
            roleId: 1,
            groupId: 1
        });

        consoleLogger.info("\n  Default user has been set");
        logger.info("Default user has been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default users:\n    ${error}`);
    }
}

export const setDefaultLicenseTypes = async () => {
    try {
        await Type.sync();

        const count = await Type.count();

        if (count > 0) return;

        const createdType = await Promise.all([
            Type.create({id: 1, licenseType: 'C'}),
            Type.create({id: 2, licenseType: 'LS'}),
            Type.create({id: 3, licenseType: 'LC'}),
            Type.create({id: 4, licenseType: 'LI'}),
            Type.create({id: 5, licenseType: 'LH'}),
            Type.create({id: 6, licenseType: 'SEG'}),
            Type.create({id: 7, licenseType: 'DP'})
        ]);

        consoleLogger.info("\n  Default license types have been set");
        logger.info("Default license types have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default license types:\n    ${error}`);
    }
}

export const setDefaultLicenseTerms = async () => {
    try {
        await Term.sync();

        const count = await Term.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Term.create({ id: 1, licenseTerm: 'corto'}),
            Term.create({ id: 2, licenseTerm: 'mediano'}),
            Term.create({ id: 3, licenseTerm: 'largo'})
        ]);

        consoleLogger.info("\n  Default license terms have been set");
        logger.info("Default license terms have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default terms:\n    ${error}`);
    }
}

export const setDefaultLicenseZones = async () => {
    try {
        await Zone.sync();

        const count = await Zone.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            Zone.create({ id: 1, licenseZone: 'Densidad muy baja (Unifamiliar)', licenseKey: 'H0.5'}),
            Zone.create({ id: 2, licenseZone: 'Densidad baja (Unifamiliar)', licenseKey: 'H1'}),
            Zone.create({ id: 3, licenseZone: 'Densidad media baja (Unifamiliar)', licenseKey: 'H1.5'}),
            Zone.create({ id: 4, licenseZone: 'Densidad media (Unifamiliar)', licenseKey: 'H2'}),
            Zone.create({ id: 5, licenseZone: 'Densidad media alta (Unifamiliar)', licenseKey: 'H2.5'}),
            Zone.create({ id: 6, licenseZone: 'Densidad alta (Unifamiliar)', licenseKey: 'H3'}),
            Zone.create({ id: 7, licenseZone: 'Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)', licenseKey: 'H3.5'}),
            Zone.create({ id: 8, licenseZone: 'Densidad muy alta 1 (multifamiliar)', licenseKey: 'H4'}),
            Zone.create({ id: 9, licenseZone: 'Densidad muy alta 2', licenseKey: 'H5'}),
            Zone.create({ id: 10, licenseZone: 'Mixto', licenseKey: 'MI'}),
            Zone.create({ id: 11, licenseZone: 'Corredor urbano mixto de baja densidad', licenseKey: 'CUMB'}),
            Zone.create({ id: 12, licenseZone: 'Corredor urbano mixto de media densidad', licenseKey: 'CUMM'}),
            Zone.create({ id: 13, licenseZone: 'Industria de bajo impacto', licenseKey: 'IB'}),
            Zone.create({ id: 14, licenseZone: 'Industria de medio impacto', licenseKey: 'IM'}),
            Zone.create({ id: 15, licenseZone: 'Industria de gran impacto', licenseKey: 'IG'}),
            Zone.create({ id: 16, licenseZone: 'Equipamiento Urbano', licenseKey: 'EU'}),
            Zone.create({ id: 17, licenseZone: 'Infraestructura urbana', licenseKey: 'IU'}),
            Zone.create({ id: 18, licenseZone: 'Reserva territorial futura', licenseKey: 'RT'}),
            Zone.create({ id: 19, licenseZone: 'Agricultura tecnificada', licenseKey: 'AT'}),
            Zone.create({ id: 20, licenseZone: 'Agroindustria', licenseKey: 'AI'}),
            Zone.create({ id: 21, licenseZone: 'Cuerpos de agua', licenseKey: 'CA'}),
            Zone.create({ id: 22, licenseZone: 'Conservación y restauración ambiental', licenseKey: 'CRA'}),
            Zone.create({ id: 23, licenseZone: 'Parque Hídrico', licenseKey: 'PH'})
        ]);

        consoleLogger.info("\n  Default license zones have been set");
        logger.info("Default license zones have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default zones:\n    ${error}`);
    }
}

export const setDefaultLicenseAuthUses = async () => {
    try {
        await AuthUse.sync();

        const count = await AuthUse.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            AuthUse.create({ id: 1, licenseAuthUse: 'Unifamiliar, plurifamiliar o multifamiliar'}),
            AuthUse.create({ id: 2, licenseAuthUse: 'Vivienda campestre o aislada'}),
            AuthUse.create({ id: 3, licenseAuthUse: 'Comercio básico'}),
            AuthUse.create({ id: 4, licenseAuthUse: 'Comercio especializado'}),
            AuthUse.create({ id: 5, licenseAuthUse: 'Comercio de medio impacto'}),
            AuthUse.create({ id: 6, licenseAuthUse: 'Comercio de impacto'}),
            AuthUse.create({ id: 7, licenseAuthUse: 'Centros comerciales'}),
            AuthUse.create({ id: 8, licenseAuthUse: 'Comercio de abasto'}),
            AuthUse.create({ id: 9, licenseAuthUse: 'Comercio temporal'}),
            AuthUse.create({ id: 10, licenseAuthUse: 'Servicios básicos'}),
            AuthUse.create({ id: 11, licenseAuthUse: 'Servicios especializados'}),
            AuthUse.create({ id: 12, licenseAuthUse: 'Servicios profesionales, técnicos y personales'}),
            AuthUse.create({ id: 13, licenseAuthUse: 'Talleres de servicio, reparación y mantenimiento'}),
            AuthUse.create({ id: 14, licenseAuthUse: 'Servicios colectivos'}),
            AuthUse.create({ id: 15, licenseAuthUse: 'Servicios de publicidad exterior'}),
            AuthUse.create({ id: 16, licenseAuthUse: 'Oficinas de pequeña escala'}),
            AuthUse.create({ id: 17, licenseAuthUse: 'Oficinas en general'}),
            AuthUse.create({ id: 18, licenseAuthUse: 'Centro recreativos y de espectáculos'}),
            AuthUse.create({ id: 19, licenseAuthUse: 'Centros sociales'}),
            AuthUse.create({ id: 20, licenseAuthUse: 'Centros deportivos y ecuestres'}),
            AuthUse.create({ id: 21, licenseAuthUse: 'Turismo'}),
            AuthUse.create({ id: 22, licenseAuthUse: 'Alojamiento'}),
            AuthUse.create({ id: 23, licenseAuthUse: 'Salud'}),
            AuthUse.create({ id: 24, licenseAuthUse: 'Educación'}),
            AuthUse.create({ id: 25, licenseAuthUse: 'Cultura'}),
            AuthUse.create({ id: 26, licenseAuthUse: 'Transporte'}),
            AuthUse.create({ id: 27, licenseAuthUse: 'Áreas verdes y deportivas'}),
            AuthUse.create({ id: 28, licenseAuthUse: 'Comunicaciones'}),
            AuthUse.create({ id: 29, licenseAuthUse: 'Servicios urbanos'}),
            AuthUse.create({ id: 30, licenseAuthUse: 'Religioso'}),
            AuthUse.create({ id: 31, licenseAuthUse: 'Equipamiento Regional'}),
            AuthUse.create({ id: 32, licenseAuthUse: 'Asistencia pública'}),
            AuthUse.create({ id: 33, licenseAuthUse: 'Comercio y abasto'}),
            AuthUse.create({ id: 34, licenseAuthUse: 'Equipamiento especial'}),
            AuthUse.create({ id: 35, licenseAuthUse: 'Industria casera'}),
            AuthUse.create({ id: 36, licenseAuthUse: 'Industria de bajo impacto'}),
            AuthUse.create({ id: 37, licenseAuthUse: 'Industria de medio impacto'}),
            AuthUse.create({ id: 38, licenseAuthUse: 'Industria textil'}),
            AuthUse.create({ id: 39, licenseAuthUse: 'Industria a base de minerales no metálicos'}),
            AuthUse.create({ id: 40, licenseAuthUse: 'Manufactura de sustancias químicas, productos derivados del petróleo y carbón'}),
            AuthUse.create({ id: 41, licenseAuthUse: 'Industria no contaminante'}),
            AuthUse.create({ id: 42, licenseAuthUse: 'Industria grande y/o pesada'}),
            AuthUse.create({ id: 43, licenseAuthUse: 'Almacenamientos, bodegas y depósitos'}),
            AuthUse.create({ id: 44, licenseAuthUse: 'Hidráulica'}),
            AuthUse.create({ id: 45, licenseAuthUse: 'Sanitaria'}),
            AuthUse.create({ id: 46, licenseAuthUse: 'Electricidad'}),
            AuthUse.create({ id: 47, licenseAuthUse: 'Gas natural y gas LP'}),
            AuthUse.create({ id: 48, licenseAuthUse: 'Estaciones de servicio'}),
            AuthUse.create({ id: 49, licenseAuthUse: 'Telecomunicaciones'}),
            AuthUse.create({ id: 50, licenseAuthUse: 'Vial'}),
            AuthUse.create({ id: 51, licenseAuthUse: 'Aprovechamiento Agropecuario'}),
            AuthUse.create({ id: 52, licenseAuthUse: 'Silvicultura'}),
            AuthUse.create({ id: 53, licenseAuthUse: 'Minería y extracción'})
        ]);

        consoleLogger.info("\n  Default license auth uses have been set");
        logger.info("Default license auth uses have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default auth uses:\n    ${error}`);
    }
}

export const setDefaultLicenseValidities = async () => {
    try {
        await Validity.sync();

        const count = await Validity.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Validity.create({ id: 1, licenseValidity: 'doce meses'}),
            Validity.create({ id: 2, licenseValidity: 'seis meses'})
        ]);

        consoleLogger.info("\n  Default license validities have been set");
        logger.info("Default license validities have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default validities:\n    ${error}`);
    }
}

export const setDefaultLicenseExpeditionTypes = async () => {
    try {
        await ExpeditionType.sync();

        const count = await ExpeditionType.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            ExpeditionType.create({ id: 1, licenseExpType: 'nueva'}),
            ExpeditionType.create({ id: 2, licenseExpType: 'renovacion'})
        ]);

        consoleLogger.info("\n  Default license expedition types have been set");
        logger.info("Default license expedition types have been set");


    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default expedition types:\n    ${error}`);
    }
}

export const setDefaultUrbanLicenseTypes = async () => {
    try {
        await UrbanType.sync();

        const count = await UrbanType.count();

        if (count > 0) return;

        const createdType = await Promise.all([
            UrbanType.create({ id: 1, licenseType: 'CUS'}),
            UrbanType.create({ id: 2, licenseType: 'LUS'}),
            UrbanType.create({ id: 3, licenseType: 'LSUB'}),
            UrbanType.create({ id: 4, licenseType: 'LFUS'}),
            UrbanType.create({ id: 5, licenseType: 'PLF'}),
            UrbanType.create({ id: 6, licenseType: 'LF'}),
            UrbanType.create({ id: 7, licenseType: 'RLF'}),
            UrbanType.create({ id: 8, licenseType: 'CRPC'})
        ]);

        consoleLogger.info("\n  Default urban license types have been set");
        logger.info("Default urban license types have been set");

    } catch (error) {
        consoleLogger.warning(`\n  Error stablishing default urban types:\n    ${error}`);
    }
}