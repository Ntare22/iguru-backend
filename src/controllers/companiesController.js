import { v4 as uuid } from 'uuid';
import Models from '../database/models';

const { Companies } = Models;
class companiesController {
  static async add(req, res) {
    try {
      const { name, description, imageUrl } = req.body;
      const newCompany = await Companies.create({
        id: uuid(),
        name,
        description,
        imageUrl,
        active: true,
      });

      return res.status(201).json({
        status: 201,
        message: 'New insurance company was added successfully',
        data: newCompany,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default companiesController;
