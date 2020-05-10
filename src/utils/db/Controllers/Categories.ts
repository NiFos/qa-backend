import { Category } from "../Models/category";

export async function getCategories() {
  return await Category.find();
}
export async function getCategoryById(id: string) {
  return await Category.findById(id);
}

export async function createCategory(title: string, img: string) {
  const category = new Category();
  category.title = title;
  category.img = img;
  await category.save();
  return category._id;
}