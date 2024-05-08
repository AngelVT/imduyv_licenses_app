import { User, Role, Group } from "../models/Users.models.js";
import { Type, Term, Zone, AuthUse, Validity, ExpeditionType } from "../models/License.models.js";
import { encryptPassword } from "./passwordCrypt.js";
import config from "../config.js";

export const setDefaultRoles = async () => {
    try {
        await Role.sync();

        const count = await Role.count();

        if (count > 0) return;

        const createdRoles = await Promise.all([
            Role.create({ role: 'admin'}),
            Role.create({ role: 'moderator'}),
            Role.create({ role: 'user'})
        ]);

        console.log("Default roles have been set: ");
        createdRoles.forEach(
            role => {
                console.log(`The following role was created: ${role.role}`);
            }
        );

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultGroups = async () => {
    try {
        await Group.sync();

        const count = await Group.count();

        if (count > 0) return;

        const createdGroup = await Promise.all([
            Group.create({ group: 'all'}),
            Group.create({ group: 'land_use'}),
            Group.create({ group: 'urban'})
        ]);

        console.log("Default groups have been set: ");
        createdGroup.forEach(
            group => {
                console.log(`The following group was created: ${group.group}`);
            }
        );

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
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

        console.log("Default user has been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseTypes = async () => {
    try {
        await Type.sync();

        const count = await Type.count();

        if (count > 0) return;

        const createdType = await Promise.all([
            Type.create({ licenseType: 'C'}),
            Type.create({ licenseType: 'LS'}),
            Type.create({ licenseType: 'LC'}),
            Type.create({ licenseType: 'LI'}),
            Type.create({ licenseType: 'LH'}),
            Type.create({ licenseType: 'SEG'}),
            Type.create({ licenseType: 'DP'})
        ]);

        console.log("Default license types have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseTerms = async () => {
    try {
        await Term.sync();

        const count = await Term.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Term.create({ licenseTerm: 'corto'}),
            Term.create({ licenseTerm: 'mediano'})
        ]);

        console.log("Default license terms have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseZones = async () => {
    try {
        await Zone.sync();

        const count = await Zone.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            Zone.create({ licenseZone: 'Densidad muy baja (Unifamiliar)', licenseKey: 'H0.5'}),
            Zone.create({ licenseZone: 'Densidad baja (Unifamiliar)', licenseKey: 'H1'}),
            Zone.create({ licenseZone: 'Densidad media baja (Unifamiliar)', licenseKey: 'H1.5'}),
            Zone.create({ licenseZone: 'Densidad media (Unifamiliar)', licenseKey: 'H2'}),
            Zone.create({ licenseZone: 'Densidad media alta (Unifamiliar)', licenseKey: 'H2.5'}),
            Zone.create({ licenseZone: 'Densidad alta (Unifamiliar)', licenseKey: 'H3'}),
            Zone.create({ licenseZone: 'Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)', licenseKey: 'H3.5'}),
            Zone.create({ licenseZone: 'Densidad muy alta 1 (multifamiliar)', licenseKey: 'H4'}),
            Zone.create({ licenseZone: 'Densidad muy alta 2', licenseKey: 'H5'}),
            Zone.create({ licenseZone: 'Mixto', licenseKey: 'MI'}),
            Zone.create({ licenseZone: 'Corredor urbano mixto de baja densidad', licenseKey: 'CUMB'}),
            Zone.create({ licenseZone: 'Corredor urbano mixto de media densidad', licenseKey: 'CUMM'}),
            Zone.create({ licenseZone: 'Industria de bajo impacto', licenseKey: 'IB'}),
            Zone.create({ licenseZone: 'Industria de medio impacto', licenseKey: 'IM'}),
            Zone.create({ licenseZone: 'Industria de gran impacto', licenseKey: 'IG'}),
            Zone.create({ licenseZone: 'Equipamiento Urbano', licenseKey: 'EU'}),
            Zone.create({ licenseZone: 'Infraestructura urbana', licenseKey: 'IU'}),
            Zone.create({ licenseZone: 'Reserva territorial futura', licenseKey: 'RT'}),
            Zone.create({ licenseZone: 'Agricultura tecnificada', licenseKey: 'AT'}),
            Zone.create({ licenseZone: 'Agroindustria', licenseKey: 'AI'}),
            Zone.create({ licenseZone: 'Cuerpos de agua', licenseKey: 'CA'}),
            Zone.create({ licenseZone: 'Conservación y restauración ambiental', licenseKey: 'CRA'}),
            Zone.create({ licenseZone: 'Parque Hídrico', licenseKey: 'PH'})
        ]);

        console.log("Default license zones have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseAuthUses = async () => {
    try {
        await AuthUse.sync();

        const count = await AuthUse.count();

        if (count > 0) return;

        const createdZone = await Promise.all([
            AuthUse.create({ licenseAuthUse: 'Unifamiliar, plurifamiliar o multifamiliar'}),
            AuthUse.create({ licenseAuthUse: 'Vivienda campestre o aislada'}),
            AuthUse.create({ licenseAuthUse: 'Comercio básico'}),
            AuthUse.create({ licenseAuthUse: 'Comercio especializado'}),
            AuthUse.create({ licenseAuthUse: 'Comercio de medio impacto'}),
            AuthUse.create({ licenseAuthUse: 'Comercio de impacto'}),
            AuthUse.create({ licenseAuthUse: 'Centros comerciales'}),
            AuthUse.create({ licenseAuthUse: 'Comercio de abasto'}),
            AuthUse.create({ licenseAuthUse: 'Comercio temporal'}),
            AuthUse.create({ licenseAuthUse: 'Servicios básicos'}),
            AuthUse.create({ licenseAuthUse: 'Servicios especializados'}),
            AuthUse.create({ licenseAuthUse: 'Servicios profesionales, técnicos y personales'}),
            AuthUse.create({ licenseAuthUse: 'Talleres de servicio, reparación y mantenimiento'}),
            AuthUse.create({ licenseAuthUse: 'Servicios colectivos'}),
            AuthUse.create({ licenseAuthUse: 'Servicios de publicidad exterior'}),
            AuthUse.create({ licenseAuthUse: 'Oficinas de pequeña escala'}),
            AuthUse.create({ licenseAuthUse: 'Oficinas en general'}),
            AuthUse.create({ licenseAuthUse: 'Centro recreativos y de espectáculos'}),
            AuthUse.create({ licenseAuthUse: 'Centros sociales'}),
            AuthUse.create({ licenseAuthUse: 'Centros deportivos y ecuestres'}),
            AuthUse.create({ licenseAuthUse: 'Turismo'}),
            AuthUse.create({ licenseAuthUse: 'Alojamiento'}),
            AuthUse.create({ licenseAuthUse: 'Salud'}),
            AuthUse.create({ licenseAuthUse: 'Educación'}),
            AuthUse.create({ licenseAuthUse: 'Cultura'}),
            AuthUse.create({ licenseAuthUse: 'Transporte'}),
            AuthUse.create({ licenseAuthUse: 'Áreas verdes y deportivas'}),
            AuthUse.create({ licenseAuthUse: 'Comunicaciones'}),
            AuthUse.create({ licenseAuthUse: 'Servicios urbanos'}),
            AuthUse.create({ licenseAuthUse: 'Religioso'}),
            AuthUse.create({ licenseAuthUse: 'Equipamiento Regional'}),
            AuthUse.create({ licenseAuthUse: 'Asistencia pública'}),
            AuthUse.create({ licenseAuthUse: 'Comercio y abasto'}),
            AuthUse.create({ licenseAuthUse: 'Equipamiento especial'}),
            AuthUse.create({ licenseAuthUse: 'Industria casera'}),
            AuthUse.create({ licenseAuthUse: 'Industria de bajo impacto'}),
            AuthUse.create({ licenseAuthUse: 'Industria de medio impacto'}),
            AuthUse.create({ licenseAuthUse: 'Industria textil'}),
            AuthUse.create({ licenseAuthUse: 'Industria a base de minerales no metálicos'}),
            AuthUse.create({ licenseAuthUse: 'Manufactura de sustancias químicas, productos derivados del petróleo y carbón'}),
            AuthUse.create({ licenseAuthUse: 'Industria no contaminante'}),
            AuthUse.create({ licenseAuthUse: 'Industria grande y/o pesada'}),
            AuthUse.create({ licenseAuthUse: 'Almacenamientos, bodegas y depósitos'}),
            AuthUse.create({ licenseAuthUse: 'Hidráulica'}),
            AuthUse.create({ licenseAuthUse: 'Sanitaria'}),
            AuthUse.create({ licenseAuthUse: 'Electricidad'}),
            AuthUse.create({ licenseAuthUse: 'Gas natural y gas LP'}),
            AuthUse.create({ licenseAuthUse: 'Estaciones de servicio'}),
            AuthUse.create({ licenseAuthUse: 'Telecomunicaciones'}),
            AuthUse.create({ licenseAuthUse: 'Vial'}),
            AuthUse.create({ licenseAuthUse: 'Aprovechamiento Agropecuario'}),
            AuthUse.create({ licenseAuthUse: 'Silvicultura'}),
            AuthUse.create({ licenseAuthUse: 'Minería y extracción'})
        ]);

        console.log("Default license auth uses have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseValidities = async () => {
    try {
        await Validity.sync();

        const count = await Validity.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            Validity.create({ licenseValidity: 'doce meses'}),
            Validity.create({ licenseValidity: 'seis meses'})
        ]);

        console.log("Default license validities have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultLicenseExpeditionTypes = async () => {
    try {
        await ExpeditionType.sync();

        const count = await ExpeditionType.count();

        if (count > 0) return;

        const createdTerm = await Promise.all([
            ExpeditionType.create({ licenseExpType: 'nueva'}),
            ExpeditionType.create({ licenseExpType: 'renovacion'})
        ]);

        console.log("Default license expedition types have been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}