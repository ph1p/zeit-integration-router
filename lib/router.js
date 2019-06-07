"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var integration_utils_1 = require("@zeit/integration-utils");
var route_parser_1 = __importDefault(require("route-parser"));
var RouterClass = /** @class */ (function () {
    /**
     * Start path
     * @param path
     */
    function RouterClass(path) {
        if (path === void 0) { path = '/'; }
        this.path = path;
        this.routes = [];
        this.previousPath = path;
        this.currentPath = path;
    }
    /**
     * Adds a route
     * @param path
     * @param fn
     */
    RouterClass.prototype.add = function (path, fn, silent) {
        if (silent === void 0) { silent = false; }
        this.routes.push({
            path: new route_parser_1.default(path),
            realPath: path,
            fn: fn,
            silent: silent
        });
    };
    /**
     * get a specfic route
     * @param handler
     * @param path
     */
    RouterClass.prototype.getRenderedRoute = function (handler, path, router) {
        if (path === void 0) { path = this.currentPath; }
        var route = this.getRouteByPath(path);
        return route
            ? route.fn({ handler: handler, router: router, htm: integration_utils_1.htm, params: route.path.match(path) || {} })
            : (function () { return integration_utils_1.htm(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Sorry, but this page does not exist :/"], ["Sorry, but this page does not exist :/"]))); })();
    };
    /**
     * Get route by path from route array
     * @param path
     */
    RouterClass.prototype.getRouteByPath = function (path) {
        return this.routes.find(function (route) { return route.path.match(path); });
    };
    /**
     * The uiHook-wrapper
     *
     * @returns
     * @memberof ZeitRouter
     */
    RouterClass.prototype.uiHook = function (callback) {
        var _this = this;
        var self = this;
        return integration_utils_1.withUiHook(function (handler) { return __awaiter(_this, void 0, void 0, function () {
            var metadata, isSilentRoute, navigate, renderRoute, router;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, handler.zeitClient.getMetadata()];
                    case 1:
                        metadata = _a.sent();
                        delete metadata.currentPath;
                        delete metadata.previousPath;
                        return [4 /*yield*/, handler.zeitClient.setMetadata(metadata)];
                    case 2:
                        _a.sent();
                        isSilentRoute = self.getRouteByPath(metadata.currentPath) &&
                            self.getRouteByPath(metadata.currentPath).silent &&
                            handler.payload.action === 'view';
                        if (!!metadata.currentPath) return [3 /*break*/, 4];
                        metadata.currentPath = self.currentPath;
                        metadata.previousPath = self.currentPath;
                        return [4 /*yield*/, handler.zeitClient.setMetadata(metadata)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(handler.payload.action.startsWith('/') || isSilentRoute)) return [3 /*break*/, 6];
                        self.previousPath = isSilentRoute
                            ? self.previousPath
                            : self.currentPath;
                        self.currentPath = isSilentRoute
                            ? self.previousPath
                            : handler.payload.action;
                        metadata.currentPath = self.currentPath;
                        metadata.previousPath = self.previousPath;
                        return [4 /*yield*/, handler.zeitClient.setMetadata(metadata)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        navigate = function (path) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(path !== metadata.currentPath)) return [3 /*break*/, 2];
                                        self.currentPath = path;
                                        self.previousPath = self.currentPath;
                                        metadata.currentPath = self.currentPath;
                                        metadata.previousPath = self.previousPath;
                                        return [4 /*yield*/, handler.zeitClient.setMetadata(metadata)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); };
                        renderRoute = function (path) {
                            return self.getRenderedRoute(handler, path, {
                                renderRoute: renderRoute,
                                navigate: navigate
                            });
                        };
                        router = {
                            get currentPath() {
                                return metadata.currentPath;
                            },
                            get previousPath() {
                                return metadata.previousPath;
                            },
                            /**
                             * get the current route
                             */
                            get currentRoute() {
                                return self.getRenderedRoute(handler, metadata.currentPath, {
                                    navigate: navigate,
                                    renderRoute: renderRoute
                                });
                            },
                            renderRoute: renderRoute,
                            navigate: navigate
                        };
                        return [2 /*return*/, callback(handler, router)];
                }
            });
        }); });
    };
    return RouterClass;
}());
exports.ZeitRouter = RouterClass;
var templateObject_1;
