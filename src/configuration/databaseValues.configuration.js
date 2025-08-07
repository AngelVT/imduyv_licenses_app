import { pool } from "./database.configuration.js";
import { User, Role, Group, Permission, UserPermissions } from "../models/Users.models.js";
import { Type, Term, Zone, AuthUse, Validity, ExpeditionType, UrbanType, LandUseLicense, UrbanLicense } from "../models/License.models.js";
import { LegacyLicense, LegacyType } from "../models/LandLegacy.models.js";
import { InstituteAdministration, LicensesAdministration, MunicipalAdministration, YearOf } from "../models/Administration.models.js";
import { encryptPassword } from "../utilities/password.utilities.js";
import * as logger from "../utilities/logger.utilities.js";
import { ZONE_DATA } from "../resources/data/appZonesData.js";
import { PCU_DATA } from "../resources/data/appPCUData.js";
import { createZoneDataTable, createPCUDataTable} from "../repositories/geo.repository.js";
import { ADMIN_PASSWORD } from "./environment.configuration.js";

const createSchemas = async () => {
    try {
        pool.query('CREATE EXTENSION IF NOT EXISTS postgis');
        pool.query('CREATE EXTENSION IF NOT EXISTS unaccent');
        pool.query('CREATE SCHEMA IF NOT EXISTS users');
        pool.query('CREATE SCHEMA IF NOT EXISTS administration');
        pool.query('CREATE SCHEMA IF NOT EXISTS licenses');
        pool.query('CREATE SCHEMA IF NOT EXISTS legacy');
        pool.query('CREATE SCHEMA IF NOT EXISTS geographic');

        logger.logConsoleInfo("Schemas established successfully");
        logger.logServerInfo("Schemas established successfully", 
        `Schema -> users
        Schema -> administration
        Schema  -> licenses`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing schemas:\n    ${error}`);
        logger.logServerWarning(`Error establishing schemas`, `-${error}`);
    }
}

const setDefaultRoles = async () => {
    try {
        await Role.sync();

        const count = await Role.count();

        if (count > 0) return;

        const createdRoles = await Promise.all([
            Role.create({ role_id: 1, role: 'system'}),
            Role.create({ role_id: 2, role: 'admin'}),
            Role.create({ role_id: 3, role: 'moderator'}),
            Role.create({ role_id: 4, role: 'user'})
        ]);

        logger.logConsoleInfo("Default roles have been set");
        logger.logServerInfo("Default roles have been set", 
        `Role -> System
        Role -> Admin
        Role -> Moderator
        Role -> User`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default user roles:\n    ${error}`);
        logger.logServerWarning(`Error establishing default user roles`, `-${error}`);
    }
}

const setDefaultGroups = async () => {
    try {
        await Group.sync();

        const count = await Group.count();

        if (count > 0) return;

        const createdGroup = await Promise.all([
            Group.create({ group_id: 1, group: 'all'}),
            Group.create({ group_id: 2, group: 'land_use'}),
            Group.create({ group_id: 3, group: 'urban'}),
            Group.create({ group_id: 4, group: 'consultant'})
        ]);

        logger.logConsoleInfo("Default groups have been set");
        logger.logServerInfo("Default groups have been set",
        `Group -> All
        Group -> Land Use
        Group -> Urban`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default user groups:\n    ${error}`);
        logger.logServerWarning(`Error establishing default user groups`, `-${error}`);
    }
}

const setDefaultPermissions = async () => {
    try {
        await Permission.sync();

        const count = await Permission.count();

        if (count > 0) return;

        const createdGroup = await Promise.all([
            Permission.create({ permission_id: 1, permission: 'license:manage'}),
            Permission.create({ permission_id: 2, permission: 'license:approve'}),
            Permission.create({ permission_id: 3, permission: 'license:lock'}),
            Permission.create({ permission_id: 4, permission: 'license:unlock'}),
            Permission.create({ permission_id: 5, permission: 'license:read'}),
            Permission.create({ permission_id: 6, permission: 'license:create'}),
            Permission.create({ permission_id: 7, permission: 'license:update'}),
            Permission.create({ permission_id: 8, permission: 'license:delete'}),
            Permission.create({ permission_id: 9, permission: 'user:manage'}),
            Permission.create({ permission_id: 10, permission: 'user:read'}),
            Permission.create({ permission_id: 11, permission: 'user:create'}),
            Permission.create({ permission_id: 12, permission: 'user:update'}),
            Permission.create({ permission_id: 13, permission: 'user:delete'}),
            Permission.create({ permission_id: 14, permission: 'administration:manage'}),
            Permission.create({ permission_id: 15, permission: 'administration:read'}),
            Permission.create({ permission_id: 16, permission: 'administration:create'}),
            Permission.create({ permission_id: 17, permission: 'administration:update'}),
            Permission.create({ permission_id: 18, permission: 'administration:delete'}),
            Permission.create({ permission_id: 19, permission: 'consultant:manage'}),
            Permission.create({ permission_id: 20, permission: 'consultant:read'})
        ]);

        logger.logConsoleInfo("Default permissions have been set");
        logger.logServerInfo("Default permissions have been set",
        `Permission -> license:manage
        Permission -> license:approve
        Permission -> license:lock
        Permission -> license:unlock
        Permission -> license:read
        Permission -> license:create
        Permission -> license:update
        Permission -> license:delete
        Permission -> user:manage
        Permission -> user:read
        Permission -> user:create
        Permission -> user:update
        Permission -> user:delete
        Permission -> administration:manage
        Permission -> administration:read
        Permission -> administration:create
        Permission -> administration:update
        Permission -> administration:delete
        Permission -> consultant:manage
        Permission -> consultant:read`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default user groups:\n    ${error}`);
        logger.logServerWarning(`Error establishing default user groups`, `-${error}`);
    }
}

const setDefaultUsers = async () => {
    try {
        await User.sync();

        await UserPermissions.sync();

        const count = await User.count();

        if (count > 0) return;

        const cryptPassword = await encryptPassword(ADMIN_PASSWORD);

        const createdUser = await User.create({
            name: "Administrador De Sistema",
            username: "sysadmin",
            password: cryptPassword,
            roleId: 1,
            groupId: 1
        });

        createdUser.addPermissions([1,9,14,19]);

        logger.logConsoleInfo("Default user has been set");
        logger.logServerInfo("Default user has been set", 
        'User name -> Usuario Admin');

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default users:\n    ${error}`);
        logger.logServerWarning(`Error establishing default users`, `-${error}`);
    }
}

const setDefaultLicenseTypes = async () => {
    try {
        await Type.sync();

        const count = await Type.count();

        if (count > 0) return;

        const createdType = await Promise.all([
            Type.create({ license_type_id: 1, licenseType: 'C'}),
            Type.create({ license_type_id: 2, licenseType: 'LS'}),
            Type.create({ license_type_id: 3, licenseType: 'LC'}),
            Type.create({ license_type_id: 4, licenseType: 'LI'}),
            Type.create({ license_type_id: 5, licenseType: 'SEG'}),
            Type.create({ license_type_id: 6, licenseType: 'DP'}),
        ]);

        logger.logConsoleInfo("Default license types have been set");
        logger.logServerInfo("Default license types have been set",
        `Land use type -> C
        Land use type -> LS
        Land use type -> LC
        Land use type -> LI
        Land use type -> SEG
        Land use type -> DP`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default land use license types:\n    ${error}`);
        logger.logServerWarning(`Error establishing default land use license types`, `-${error}`);
    }
}

const setDefaultLicenseTerms = async () => {
    try {
        await Term.sync();

        const count = await Term.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Term.create({ license_term_id: 1, licenseTerm: 'corto'}),
            Term.create({ license_term_id: 2, licenseTerm: 'mediano'}),
            Term.create({ license_term_id: 3, licenseTerm: 'largo'}),
            Term.create({ license_term_id: 4, licenseTerm: 'n/a'})
        ]);

        logger.logConsoleInfo("Default license terms have been set");
        logger.logServerInfo("Default license terms have been set", 
        `Term -> Corto
        Term -> Mediano
        Term -> Largo`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default terms:\n    ${error}`);
        logger.logServerWarning(`Error establishing default terms`, `-${error}`);
    }
}

const setDefaultLicenseZones = async () => {
    try {
        await Zone.sync();

        const count = await Zone.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            Zone.create({ license_zone_id: 1, licenseZone: 'Densidad muy baja (Unifamiliar)', licenseKey: 'H0.5'}),
            Zone.create({ license_zone_id: 2, licenseZone: 'Densidad baja (Unifamiliar)', licenseKey: 'H1'}),
            Zone.create({ license_zone_id: 3, licenseZone: 'Densidad media baja (Unifamiliar)', licenseKey: 'H1.5'}),
            Zone.create({ license_zone_id: 4, licenseZone: 'Densidad media (Unifamiliar)', licenseKey: 'H2'}),
            Zone.create({ license_zone_id: 5, licenseZone: 'Densidad media alta (Unifamiliar)', licenseKey: 'H2.5'}),
            Zone.create({ license_zone_id: 6, licenseZone: 'Densidad alta (Unifamiliar)', licenseKey: 'H3'}),
            Zone.create({ license_zone_id: 7, licenseZone: 'Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)', licenseKey: 'H3.5'}),
            Zone.create({ license_zone_id: 8, licenseZone: 'Densidad muy alta 1 (multifamiliar)', licenseKey: 'H4'}),
            Zone.create({ license_zone_id: 9, licenseZone: 'Densidad muy alta 2', licenseKey: 'H5'}),
            Zone.create({ license_zone_id: 10, licenseZone: 'Mixto', licenseKey: 'MI'}),
            Zone.create({ license_zone_id: 11, licenseZone: 'Corredor urbano mixto de baja densidad', licenseKey: 'CUMB'}),
            Zone.create({ license_zone_id: 12, licenseZone: 'Corredor urbano mixto de media densidad', licenseKey: 'CUMM'}),
            Zone.create({ license_zone_id: 13, licenseZone: 'Industria de bajo impacto', licenseKey: 'IB'}),
            Zone.create({ license_zone_id: 14, licenseZone: 'Industria de medio impacto', licenseKey: 'IM'}),
            Zone.create({ license_zone_id: 15, licenseZone: 'Industria de gran impacto', licenseKey: 'IG'}),
            Zone.create({ license_zone_id: 16, licenseZone: 'Equipamiento Urbano', licenseKey: 'EU'}),
            Zone.create({ license_zone_id: 17, licenseZone: 'Infraestructura urbana', licenseKey: 'IU'}),
            Zone.create({ license_zone_id: 18, licenseZone: 'Reserva territorial futura', licenseKey: 'RT'}),
            Zone.create({ license_zone_id: 19, licenseZone: 'Agricultura tecnificada', licenseKey: 'AT'}),
            Zone.create({ license_zone_id: 20, licenseZone: 'Agroindustria', licenseKey: 'AI'}),
            Zone.create({ license_zone_id: 21, licenseZone: 'Cuerpos de agua', licenseKey: 'CA'}),
            Zone.create({ license_zone_id: 22, licenseZone: 'Conservación y restauración ambiental', licenseKey: 'CRA'}),
            Zone.create({ license_zone_id: 23, licenseZone: 'Parque Hídrico', licenseKey: 'PH'})
        ]);

        logger.logConsoleInfo("\n  Default license zones have been set");
        logger.logServerInfo("Default license zones have been set",
        `Zone -> Densidad muy baja (Unifamiliar) Key -> H0.5
        Zone -> Densidad baja (Unifamiliar) Key -> H1
        Zone -> Densidad media baja (Unifamiliar) Key -> H1.5
        Zone -> Densidad media (Unifamiliar) Key -> H2
        Zone -> Densidad media alta (Unifamiliar) Key -> H2.5
        Zone -> Densidad alta (Unifamiliar) Key -> H3
        Zone -> Densidad alta (multifamiliar dúplex, tríplex y cuádruplex) Key -> H3.5
        Zone -> Densidad muy alta 1 (multifamiliar) Key -> H4
        Zone -> Densidad muy alta 2 Key -> H5
        Zone -> Mixto Key -> MI
        Zone -> Corredor urbano mixto de baja densidad Key -> CUMB
        Zone -> Corredor urbano mixto de media densidad Key -> CUMM
        Zone -> Industria de bajo impacto Key -> IB
        Zone -> Industria de medio impacto Key -> IM
        Zone -> Industria de gran impacto Key -> IG
        Zone -> Equipamiento Urbano Key -> EU
        Zone -> Infraestructura urbana Key -> IU
        Zone -> Reserva territorial futura Key -> RT
        Zone -> Agricultura tecnificada Key -> AT
        Zone -> Agroindustria Key -> AI
        Zone -> Cuerpos de agua Key -> CA
        Zone -> Conservación y restauración ambiental Key -> CRA
        Zone -> Parque Hídrico Key -> PH`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default zones:\n    ${error}`);
        logger.logServerWarning(`Error establishing default zones`, `-${error}`);
    }
}

const setDefaultLicenseAuthUses = async () => {
    try {
        await AuthUse.sync();

        const count = await AuthUse.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            AuthUse.create({ license_authUse_id: 1, licenseAuthUse: 'Unifamiliar, plurifamiliar o multifamiliar'}),
            AuthUse.create({ license_authUse_id: 2, licenseAuthUse: 'Vivienda campestre o aislada'}),
            AuthUse.create({ license_authUse_id: 3, licenseAuthUse: 'Comercio básico'}),
            AuthUse.create({ license_authUse_id: 4, licenseAuthUse: 'Comercio especializado'}),
            AuthUse.create({ license_authUse_id: 5, licenseAuthUse: 'Comercio de medio impacto'}),
            AuthUse.create({ license_authUse_id: 6, licenseAuthUse: 'Comercio de impacto'}),
            AuthUse.create({ license_authUse_id: 7, licenseAuthUse: 'Centros comerciales'}),
            AuthUse.create({ license_authUse_id: 8, licenseAuthUse: 'Comercio de abasto'}),
            AuthUse.create({ license_authUse_id: 9, licenseAuthUse: 'Comercio temporal'}),
            AuthUse.create({ license_authUse_id: 10, licenseAuthUse: 'Servicios básicos'}),
            AuthUse.create({ license_authUse_id: 11, licenseAuthUse: 'Servicios especializados'}),
            AuthUse.create({ license_authUse_id: 12, licenseAuthUse: 'Servicios profesionales, técnicos y personales'}),
            AuthUse.create({ license_authUse_id: 13, licenseAuthUse: 'Talleres de servicio, reparación y mantenimiento'}),
            AuthUse.create({ license_authUse_id: 14, licenseAuthUse: 'Servicios colectivos'}),
            AuthUse.create({ license_authUse_id: 15, licenseAuthUse: 'Servicios de publicidad exterior'}),
            AuthUse.create({ license_authUse_id: 16, licenseAuthUse: 'Oficinas de pequeña escala'}),
            AuthUse.create({ license_authUse_id: 17, licenseAuthUse: 'Oficinas en general'}),
            AuthUse.create({ license_authUse_id: 18, licenseAuthUse: 'Centro recreativos y de espectáculos'}),
            AuthUse.create({ license_authUse_id: 19, licenseAuthUse: 'Centros sociales'}),
            AuthUse.create({ license_authUse_id: 20, licenseAuthUse: 'Centros deportivos y ecuestres'}),
            AuthUse.create({ license_authUse_id: 21, licenseAuthUse: 'Turismo'}),
            AuthUse.create({ license_authUse_id: 22, licenseAuthUse: 'Alojamiento'}),
            AuthUse.create({ license_authUse_id: 23, licenseAuthUse: 'Salud'}),
            AuthUse.create({ license_authUse_id: 24, licenseAuthUse: 'Educación'}),
            AuthUse.create({ license_authUse_id: 25, licenseAuthUse: 'Cultura'}),
            AuthUse.create({ license_authUse_id: 26, licenseAuthUse: 'Transporte'}),
            AuthUse.create({ license_authUse_id: 27, licenseAuthUse: 'Áreas verdes y deportivas'}),
            AuthUse.create({ license_authUse_id: 28, licenseAuthUse: 'Comunicaciones'}),
            AuthUse.create({ license_authUse_id: 29, licenseAuthUse: 'Servicios urbanos'}),
            AuthUse.create({ license_authUse_id: 30, licenseAuthUse: 'Religioso'}),
            AuthUse.create({ license_authUse_id: 31, licenseAuthUse: 'Equipamiento Regional'}),
            AuthUse.create({ license_authUse_id: 32, licenseAuthUse: 'Asistencia pública'}),
            AuthUse.create({ license_authUse_id: 33, licenseAuthUse: 'Comercio y abasto'}),
            AuthUse.create({ license_authUse_id: 34, licenseAuthUse: 'Equipamiento especial'}),
            AuthUse.create({ license_authUse_id: 35, licenseAuthUse: 'Industria casera'}),
            AuthUse.create({ license_authUse_id: 36, licenseAuthUse: 'Industria de bajo impacto'}),
            AuthUse.create({ license_authUse_id: 37, licenseAuthUse: 'Industria de medio impacto'}),
            AuthUse.create({ license_authUse_id: 38, licenseAuthUse: 'Industria textil'}),
            AuthUse.create({ license_authUse_id: 39, licenseAuthUse: 'Industria a base de minerales no metálicos'}),
            AuthUse.create({ license_authUse_id: 40, licenseAuthUse: 'Manufactura de sustancias químicas, productos derivados del petróleo y carbón'}),
            AuthUse.create({ license_authUse_id: 41, licenseAuthUse: 'Industria no contaminante'}),
            AuthUse.create({ license_authUse_id: 42, licenseAuthUse: 'Industria grande y/o pesada'}),
            AuthUse.create({ license_authUse_id: 43, licenseAuthUse: 'Almacenamientos, bodegas y depósitos'}),
            AuthUse.create({ license_authUse_id: 44, licenseAuthUse: 'Hidráulica'}),
            AuthUse.create({ license_authUse_id: 45, licenseAuthUse: 'Sanitaria'}),
            AuthUse.create({ license_authUse_id: 46, licenseAuthUse: 'Electricidad'}),
            AuthUse.create({ license_authUse_id: 47, licenseAuthUse: 'Gas natural y gas LP'}),
            AuthUse.create({ license_authUse_id: 48, licenseAuthUse: 'Estaciones de servicio'}),
            AuthUse.create({ license_authUse_id: 49, licenseAuthUse: 'Telecomunicaciones'}),
            AuthUse.create({ license_authUse_id: 50, licenseAuthUse: 'Vial'}),
            AuthUse.create({ license_authUse_id: 51, licenseAuthUse: 'Aprovechamiento Agropecuario'}),
            AuthUse.create({ license_authUse_id: 52, licenseAuthUse: 'Silvicultura'}),
            AuthUse.create({ license_authUse_id: 53, licenseAuthUse: 'Minería y extracción'}),
            AuthUse.create({ license_authUse_id: 54, licenseAuthUse: 'Sanitaria'})
        ]);

        logger.logConsoleInfo("Default license auth uses have been set");
        logger.logServerInfo("Default license auth uses have been set",
        `Authorized use -> Unifamiliar, plurifamiliar o multifamiliar
        Authorized use -> Vivienda campestre o aislada
        Authorized use -> Comercio básico
        Authorized use -> Comercio especializado
        Authorized use -> Comercio de medio impacto
        Authorized use -> Comercio de impacto
        Authorized use -> Centros comerciales
        Authorized use -> Comercio de abasto
        Authorized use -> Comercio temporal
        Authorized use -> Servicios básicos
        Authorized use -> Servicios especializados
        Authorized use -> Servicios profesionales, técnicos y personales
        Authorized use -> Talleres de servicio, reparación y mantenimiento
        Authorized use -> Servicios colectivos
        Authorized use -> Servicios de publicidad exterior
        Authorized use -> Oficinas de pequeña escala
        Authorized use -> Oficinas en general
        Authorized use -> Centro recreativos y de espectáculos
        Authorized use -> Centros sociales
        Authorized use -> Centros deportivos y ecuestres
        Authorized use -> Turismo
        Authorized use -> Alojamiento
        Authorized use -> Salud
        Authorized use -> Educación
        Authorized use -> Cultura
        Authorized use -> Transporte
        Authorized use -> Áreas verdes y deportivas
        Authorized use -> Comunicaciones
        Authorized use -> Servicios urbanos
        Authorized use -> Religioso
        Authorized use -> Equipamiento Regional
        Authorized use -> Asistencia pública
        Authorized use -> Comercio y abasto
        Authorized use -> Equipamiento especial
        Authorized use -> Industria casera
        Authorized use -> Industria de bajo impacto
        Authorized use -> Industria de medio impacto
        Authorized use -> Industria textil
        Authorized use -> Industria a base de minerales no metálicos
        Authorized use -> Manufactura de sustancias químicas, productos derivados del petróleo y carbón
        Authorized use -> Industria no contaminante
        Authorized use -> Industria grande y/o pesada
        Authorized use -> Almacenamientos, bodegas y depósitos
        Authorized use -> Hidráulica
        Authorized use -> Sanitaria
        Authorized use -> Electricidad
        Authorized use -> Gas natural y gas LP
        Authorized use -> Estaciones de servicio
        Authorized use -> Telecomunicaciones
        Authorized use -> Vial
        Authorized use -> Aprovechamiento Agropecuario
        Authorized use -> Silvicultura
        Authorized use -> Minería y extracción`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default auth uses:\n    ${error}`);
        logger.logServerWarning(`Error establishing default authorized uses`, `-${error}`);
    }
}

const setDefaultLicenseValidities = async () => {
    try {
        await Validity.sync();

        const count = await Validity.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Validity.create({ license_validity_id: 1, licenseValidity: 'seis meses'}),
            Validity.create({ license_validity_id: 2, licenseValidity: 'doce meses'})
        ]);

        logger.logConsoleInfo("Default license validities have been set");
        logger.logServerInfo("Default license validities have been set",
        `Validity -> Seis meses
        Validity -> Doce meses`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default validities:\n    ${error}`);
        logger.logServerWarning(`Error establishing default validities`, `-${error}`);
    }
}

const setDefaultLicenseExpeditionTypes = async () => {
    try {
        await ExpeditionType.sync();

        const count = await ExpeditionType.count();

        if (count > 0) return;

        const createdExpeditionType = await Promise.all([
            ExpeditionType.create({ license_expedition_type_id: 1, licenseExpType: 'nueva'}),
            ExpeditionType.create({ license_expedition_type_id: 2, licenseExpType: 'renovacion'})
        ]);

        logger.logConsoleInfo("Default license expedition types have been set");
        logger.logServerInfo("Default license expedition types have been set",
        `Expedition type -> Nueva
        Expedition type -> Renovación`
        );


    } catch (error) {
        logger.logConsoleWarning(`Error establishing default expedition types:\n    ${error}`);
        logger.logServerWarning(`Error establishing default expedition types`, `-${error}`);
    }
}

const setDefaultUrbanLicenseTypes = async () => {
    try {
        await UrbanType.sync();

        const count = await UrbanType.count();

        if (count > 0) return;

        const createdType = await Promise.all([
            UrbanType.create({ license_urban_type_id: 1, licenseType: 'CUS'}),
            UrbanType.create({ license_urban_type_id: 2, licenseType: 'LUS'}),
            UrbanType.create({ license_urban_type_id: 3, licenseType: 'LSUB'}),
            UrbanType.create({ license_urban_type_id: 4, licenseType: 'LFUS'}),
            UrbanType.create({ license_urban_type_id: 5, licenseType: 'PLF'}),
            UrbanType.create({ license_urban_type_id: 6, licenseType: 'LF'}),
            UrbanType.create({ license_urban_type_id: 7, licenseType: 'RLF'}),
            UrbanType.create({ license_urban_type_id: 8, licenseType: 'CRPC'}),
            UrbanType.create({ license_urban_type_id: 9, licenseType: 'LUH'})
        ]);

        logger.logConsoleInfo("Default urban license types have been set");
        logger.logServerInfo("Default urban license types have been set",
        `Urban type -> CUS
        Urban type -> LUS
        Urban type -> LSUB
        Urban type -> LFUS
        Urban type -> PLF
        Urban type -> LF
        Urban type -> RLF
        Urban type -> CRPC
        Urban type -> LUH`);

    } catch (error) {
        logger.logConsoleWarning(`Error establishing default urban license types:\n    ${error}`);
        logger.logServerWarning(`Error establishing default urban license types`, `-${error}`);
    }
}

const setGeographicData = async () => {
    try {
        const zoneSecFeatures = ZONE_DATA.features;
        const pcuFeatures = PCU_DATA.features;

        if (await createZoneDataTable(zoneSecFeatures)) {
            logger.logConsoleInfo("Zone Sec Geographic data loaded in the DB.");
            logger.logServerInfo("Zone Sec Geographic data loaded in the DB");
        }

        if (await createPCUDataTable(pcuFeatures)) {
            logger.logConsoleInfo("PCU Geographic data loaded in the DB.");
            logger.logServerInfo("PCU Geographic data loaded in the DB");
        }

    } catch (error) {
        logger.logConsoleWarning(`Error establishing geographic data:\n    ${error}`);
        logger.logServerWarning(`Error establishing geographic data`, `-${error}`);
    }
}

const syncModels = async () => {
    try {
        await LandUseLicense.sync();
        await LegacyType.sync();
        await LegacyLicense.sync();
        await UrbanLicense.sync();
        await MunicipalAdministration.sync();
        await InstituteAdministration.sync();
        await LicensesAdministration.sync();
        await YearOf.sync();
    } catch (error) {
        logger.logConsoleWarning(`Error synchronizing models:\n    ${error}`);
        logger.logServerWarning(`Error synchronizing models`, `-${error}`);
    }
}

export const setDBDefaults = async () => {
    await createSchemas();
    await setDefaultRoles();
    await setDefaultGroups();
    await setDefaultPermissions();
    await setDefaultUsers();
    await setDefaultLicenseTypes();
    await setDefaultLicenseTerms();
    await setDefaultLicenseZones();
    await setDefaultLicenseAuthUses();
    await setDefaultLicenseValidities();
    await setDefaultLicenseExpeditionTypes();
    await setDefaultUrbanLicenseTypes();
    await setGeographicData();
    await syncModels();
}