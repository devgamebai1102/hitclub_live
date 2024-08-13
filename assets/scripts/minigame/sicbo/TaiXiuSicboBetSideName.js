(function () {
    cc.TaiXiuSicboBetSideName = cc.Class({
        extends: cc.Component,

        properties: {
        },

        GetTuCuoc: function(betside) {
            let tucuoc = "";
            switch (betside) {
                case 0: tucuoc = "TÀI"; break;
                case 1: tucuoc = "XỈU"; break;
                case 2: tucuoc = "CHẴN"; break;
                case 3: tucuoc = "LẺ"; break;
                case 4: tucuoc = "CẶP 1-1"; break;
                case 5: tucuoc = "CẶP 2-2"; break;
                case 6: tucuoc = "CẶP 3-3"; break;
                case 7: tucuoc = "BỘ 1-1-1"; break;
                case 8: tucuoc = "BỘ 2-2-2"; break;
                case 9: tucuoc = "BỘ 3-3-3"; break;
                case 10: tucuoc = "BỘ 4-4-4"; break;
                case 11: tucuoc = "BỘ 5-5-5"; break;
                case 12: tucuoc = "BỘ 6-6-6"; break;
                case 13: tucuoc = "CẶP 4-4"; break;
                case 14: tucuoc = "CẶP 5-5"; break;
                case 15: tucuoc = "CẶP 6-6"; break;
                case 16: tucuoc = "TỔNG 4"; break;
                case 17: tucuoc = "TỔNG 5"; break;
                case 18: tucuoc = "TỔNG 6"; break;
                case 19: tucuoc = "TỔNG 7"; break;
                case 20: tucuoc = "TỔNG 8"; break;
                case 21: tucuoc = "TỔNG 9"; break;
                case 22: tucuoc = "TỔNG 10"; break;
                case 23: tucuoc = "TỔNG 11"; break;
                case 24: tucuoc = "TỔNG 12"; break;
                case 25: tucuoc = "TỔNG 13"; break;
                case 26: tucuoc = "TỔNG 14"; break;
                case 27: tucuoc = "TỔNG 15"; break;
                case 28: tucuoc = "TỔNG 16"; break;
                case 29: tucuoc = "TỔNG 17"; break;
                case 30: tucuoc = "CẶP 1-2"; break;
                case 31: tucuoc = "CẶP 1-3"; break;
                case 32: tucuoc = "CẶP 1-4"; break;
                case 33: tucuoc = "CẶP 1-5"; break;
                case 34: tucuoc = "CẶP 1-6"; break;
                case 35: tucuoc = "CẶP 2-3"; break;
                case 36: tucuoc = "CẶP 2-4"; break;
                case 37: tucuoc = "CẶP 2-5"; break;
                case 38: tucuoc = "CẶP 2-6"; break;
                case 39: tucuoc = "CẶP 3-4"; break;
                case 40: tucuoc = "CẶP 3-5"; break;
                case 41: tucuoc = "CẶP 3-6"; break;
                case 42: tucuoc = "CẶP 4-5"; break;
                case 43: tucuoc = "CẶP 4-6"; break;
                case 44: tucuoc = "CẶP 5-6"; break;
                case 45: tucuoc = "NHẤT"; break;
                case 46: tucuoc = "NHỊ"; break;
                case 47: tucuoc = "TAM"; break;
                case 48: tucuoc = "TỨ"; break;
                case 49: tucuoc = "NGŨ"; break;
                case 50: tucuoc = "LỤC"; break;
                case 51: tucuoc = "BỘ BA BẤT KỲ"; break;
            }

            return tucuoc;
        }
    });
}).call(this);
