import database from '../src/models';

class CategoryTwoService {
  static async addCategory(category) {
    try {
      return await database.CategoryLevelTwo.create(category);
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories() {
    try {
      return await database.CategoryLevelTwo.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(category) {
    try {
      return await database.CategoryLevelTwo.findByPk(category);
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(id, updateCategory) {
    try {
      const category = await database.CategoryLevelTwo.findByPk(id);

      if (category) {
        const updatedCategory = await database.CategoryLevelTwo.update(updateCategory, {
          where: { id: Number(id) },
          returning: true,
          plain: true,
        });

        return updatedCategory[1];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      const category = await database.CategoryLevelTwo.findByPk(id);

      if (category) {
        const deletedCategory = await database.CategoryLevelTwo.destroy({
          where: { id: Number(id) }
        });
        return deletedCategory;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryTwoService;
