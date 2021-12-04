import database from '../server/src/models';

class VariationService {
  static async getAllVariations() {
    return database.Variation.findAll();
  }

  static async getVariationById(variation) {
    return database.Variation.findByPk(variation);
  }

  static async addVariation(variation) {
    return database.Variation.create(variation);
  }

  static async updateVariation(id, updateVariation) {
    const variation = await database.Variation.findByPk(id);

    if (variation) {
      const updatedVariation = await database.Variation.update(
        updateVariation,
        {
          where: { id: Number(id) },
          returning: true,
          plain: true,
        }
      );

      return updatedVariation[1];
    }
    return null;
  }

  static async deleteVariation(id) {
    const variation = await database.Variation.findByPk(id);

    if (variation) {
      const deletedVariation = await database.Variation.destroy({
        where: { id: Number(id) },
      });
      return deletedVariation;
    }
    return null;
  }
}

export default VariationService;
