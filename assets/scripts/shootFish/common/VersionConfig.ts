export default class VersionConfig {
    static readonly CP_NAME_R99 = "R99";
    static readonly CP_NAME_VIP52 = "VIP52";
    static readonly CP_NAME_XXENG = "XXENG";
    static readonly CP_NAME_MANVIP = "MANVIP";
    static readonly CP_NAME_R99_2 = "R99_2";
    static readonly CP_NAME_HT68 = "HT68";
    static readonly CP_NAME_F69 = "F69";
    static readonly CP_NAME_88KING = "88KING";
    static readonly CP_NAME_MARBLES99 = "MARBLES99";
    static readonly CP_NAME_SIN99 = "SIN99";
    static readonly CP_NAME_TEST = "TEST";
    static readonly CP_NAME_DOM99 = "DOM99";

    static VersionName = "";
    static CPName = "";
}
if (cc.sys.isNative) {
    let versionConfig = cc.sys.localStorage.getItem("VersionConfig");
    if (versionConfig != null) {
        versionConfig = JSON.parse(versionConfig);
        VersionConfig.VersionName = versionConfig["VersionName"];
        VersionConfig.CPName = versionConfig["CPName"];
    }
} else {
    VersionConfig.VersionName = "1.0.0";
    VersionConfig.CPName = VersionConfig.CP_NAME_HT68;
    // VersionConfig.CPName = VersionConfig.CP_NAME_TEST;
}