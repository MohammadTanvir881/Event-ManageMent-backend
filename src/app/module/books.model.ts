// import { Schema, model } from "mongoose";
// import { TBooks } from "./books/books.inheritance";

// const booksSchema = new Schema<TBooks>(
//   {
//     title: {
//       type: String,
//       required: [true, "Books Title Are Required"],
//     },
//     bookImage: {
//       type: String,
//       required: [true, "Book Image is required"],
//     },
//     author: {
//       type: String,
//       required: [true, "Author is Required"],
//     },

//     category: {
//       type: String,
//       required: [true, "Category is required"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     booksLink: {
//       type: String,
//       required: [true, "Books Link is Required"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // mongoose query middleware

// // filter the data before the finding result of all the books
// booksSchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// // filter the deleted single data
// booksSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

// export const Book = model<TBooks>("Book", booksSchema);
