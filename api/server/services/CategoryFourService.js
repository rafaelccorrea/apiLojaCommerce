import database from '../src/models';

class CategoryFourService {
  static async addCategory(category) {
    try {
      return await database.CategoryLevelFour.create(category);
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories() {
    try {
      return await database.CategoryLevelFour.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(category) {
    try {
      return await database.CategoryLevelFour.findByPk(category);
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(id, updateCategory) {
    try {
      const category = await database.CategoryLevelFour.findByPk(id);

      if (category) {
        const updatedCategory = await database.CategoryLevelFour.update(updateCategory, {
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
      const category = await database.CategoryLevelFour.findByPk(id);

      if (category) {
        const deletedCategory = await database.CategoryLevelFour.destroy({
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

export default CategoryFourService;
