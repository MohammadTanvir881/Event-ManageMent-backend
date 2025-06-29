import { sendImageToCloudinary } from "../utlis/sendImageToCloudinary";
import { Types } from "mongoose"; // Import ObjectId from mongoose
import { IBooks } from "./books.inheritance";
import { Books } from "./books.model";

// find all the books data from DB
const getBooksDataFromDb = async (query: Record<string, unknown>) => {
  const result = await Books.find();
  return result;
};

// find a single book data here

const getSingleBookDataFromDb = async (id: string) => {
  // const result = await Book.findOne({ _id: id });
  const objectId = new Types.ObjectId(id);
  const result = await Books.aggregate([{ $match: { _id: objectId } }]);

  if (result.length === 0) {
    throw Error("Book not found");
  }

  console.log(result);
  return result;
};

// create a new book data in DB

const createBookDataIntoDB = async (books: IBooks) => {
  //send image to cloudinary
  const imageName = `${books?.title}-${books?.author}`;
  // const path = file?.path;
  // const { secure_url }: any = await sendImageToCloudinary(imageName, path);

  // books.bookImage = secure_url;

  const result = await Books.create(books);
  return result;
};

// update the book data here
const updateBookDataIntoDb = async (
  id: string,
  updateData: Record<string, any>
) => {
  const result = await Books.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return result;
};

// delete the book data here
const deleteDataFromDB = async (id: string) => {
  const result = await Books.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const bookServices = {
  getBooksDataFromDb,
  createBookDataIntoDB,
  getSingleBookDataFromDb,
  updateBookDataIntoDb,
  deleteDataFromDB,
};
