import express, { NextFunction, Request, Response } from "express";
import { booksController } from "./books.controller";
import validateRequest from "../utlis/validateRequest";
import auth from "../Auth/auth";
import { upload } from "../utlis/sendImageToCloudinary";
import { BooksZodValidation } from "./books.zodValidation";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  // upload.single("file"),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   console.log("from backend", req.body);
  //   next();
  // },
  validateRequest(BooksZodValidation.BooksValidationSchema),
  booksController.createBookData
);
router.get("/", booksController.getBooksData);
router.get("/:bookId", booksController.getSingleBookData);
router.put("/:bookId", auth("admin"), booksController.updateBookData);
router.delete("/:bookId", auth("admin"), booksController.deleteBookData);

export const booksRoutes = router;
