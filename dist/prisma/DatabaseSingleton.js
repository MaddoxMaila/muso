"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var DatabaseSingleton = /** @class */ (function () {
    function DatabaseSingleton() {
        /**
         * Never call this constructor directly in code, always call the static method "getDb"
         */
        DatabaseSingleton.db = new client_1.PrismaClient();
    }
    DatabaseSingleton.getDb = function () {
        /**
         * Main Singleton pattern logic.
         *
         */
        if (!DatabaseSingleton.db)
            new DatabaseSingleton();
        return DatabaseSingleton.db;
    };
    return DatabaseSingleton;
}());
exports.default = DatabaseSingleton;
//# sourceMappingURL=DatabaseSingleton.js.map