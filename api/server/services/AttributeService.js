import database from '../src/models';

class AttributeService {
  static async getAllAttributes() {
    return database.Attribute.findAll();
  }

  static async getAttributeById(attribute) {
    return database.Attribute.findByPk(attribute);
  }

  static async addAttribute(attribute) {
    return database.Attribute.create(attribute);
  }

  static async updateAttribute(id, updateAttribute) {
    const attribute = await database.Attribute.findByPk(id);

    if (attribute) {
      const updatedAttribute = await database.Attribute.update(
        updateAttribute,
        {
          where: { id: Number(id) },
          returning: true,
          plain: true,
        }
      );

      return updatedAttribute[1];
    }
    return null;
  }

  static async deleteAttribute(id) {
    const attribute = await database.Attribute.findByPk(id);

    if (attribute) {
      const deletedAttribute = await database.Attribute.destroy({
        where: { id: Number(id) },
      });
      return deletedAttribute;
    }
    return null;
  }
}

export default AttributeService;
