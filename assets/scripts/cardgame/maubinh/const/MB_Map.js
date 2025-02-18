/*
 * Generated by BeChicken
 * on 9/11/2019
 * version v1.0
 */
(function () {
    cc.MB_MONEY_TYPES = {
        COIN: 0,
        STAR: 1
    };

    cc.MB_RESULT_TYPES = {
        NORMAL: -100,
        LAM_SAP: -10,
        SAP_BA_CHI: -9,//thua cả 3 chi nhưng không phải binh lủng
        SAM_CHI_CUOI: -7,
        CU_LU_CHI_GIUA: -6,
        TU_QUY_CHI_DAU: -5,
        THUNG_PHA_SANH_CHI_DAU: -4,
        TU_QUY_CHI_GIUA: -3,
        THUNG_PHA_SANH_CHI_GIUA: -2,
        BINH_LUNG: -1,
        MAU_THAU: 0,//Không có liên kết
        DOI: 1,//Có 1 đôi
        THU: 2,//Có 2 đôi
        SAM_CO: 3,//Có 1 bộ ba
        SANH: 4,//5 quân liên tiếp nhau
        THUNG: 5,//Cùng chất
        CU_LU: 6,//1 bộ 3 và 1 bộ đôi
        TU_QUY: 7,//4 quân giống nhau
        THUNG_PHA_SANH: 8,//Dây liên tiếp cùng chất ko có A
        THUNG_PHA_SANH_LON: 9,//Dây liên tiếp cùng chất có A và không có 2
        BA_SANH: 10,//3 chi mỗi chi 1 sảnh
        BA_THUNG: 11,//3 chi mỗi chi 1 thùng
        LUC_PHE_BON: 12,//có 6 đôi và 1 lẻ
        NAM_DOI_MOT_SAM: 13,// bài có 5 đôi và 1 sám cô
        DONG_HOA: 14,//Cùng màu
        SANH_RONG: 15,//từ 2-A ko đồng chất
        RONG_CUON: 16,//từ 2-A đồng chất
    };
    cc.MB_RESULT_NAME_UI = {
        //MauBinh Dac Biet
        "-7": "sam_chi_cuoi",
        "-6": "cu_lu_chi_giua",
        "-5": "tu_quy_chi_dau",
        "-4": "thung_pha_sanh_chi_dau",
        "-3": "tu_quy_chi_dau",
        "-2": "thung_pha_sanh_chi_giua",
        //Binh lung
        "-100": "",
        "-10": "thang_ba_chi",
        "-9": "thua_sap_ham",
        "-1": "binh_lung",

        "0": "mau_thau",
        "1": "doi",
        "2": "thu",
        "3": "xam",
        "4": "sanh",
        "5": "thung",
        "6": "cu_lu",
        "7": "tu_quy",
        "8": "thung_pha_sanh",
        "9": "thung_pha_sanh_dai",
        //MauBinh Animation
        "10": "ba_sanh",
        "11": "ba_thung",
        "12": "luc_phe_bon",
        "13": "5_doi_1_xam",
        "14": "dong_hoa",
        "15": "sanh_rong",
        "16": "rong_cuon",

    };
    cc.MB_PLAYER_STATE_UI = {
        DANG_XEP: "dang_xep",
        THANG: "thang",
        THUA: "thua",
        HOA: "hoa",
        SAN_SANG: "san_sang"
    };

    cc.MB_SORT_CHI = {
        NORMAL: 0,
        BINH_LUNG: 1,
        TOI_TRANG: 2
    };
    cc.MB_SORT_CHI_BINH_LUNG_UI =  {
        1: 'binh_lung',
        2: 'mau_binh',
    }
}).call(this)