"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const validateRequest_1 = __importDefault(require("../utlis/validateRequest"));
const books_zodValidation_1 = __importDefault(require("./books.zodValidation"));
const auth_1 = __importDefault(require("../Auth/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin"), 
// upload.single("file"),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = JSON.parse(req.body.data);
//   console.log("from backend", req.body);
//   next();
// },
(0, validateRequest_1.default)(books_zodValidation_1.default), books_controller_1.booksController.createBookData);
router.get("/", books_controller_1.booksController.getBooksData);
router.get("/:bookId", books_controller_1.booksController.getSingleBookData);
router.put("/:bookId", (0, auth_1.default)("admin"), books_controller_1.booksController.updateBookData);
router.delete("/:bookId", (0, auth_1.default)("admin"), books_controller_1.booksController.deleteBookData);
exports.booksRoutes = router;
