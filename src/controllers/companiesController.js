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
  static async edit(req, res) {
    try {
      const {
        body: { name, description, imageUrl },
        query: { id },
      } = req;

      const found = await Companies.findOne({ where: { id } });
      if (!found) {
        return res.status(404).json({
          status: 404,
          error: 'Insurance company not found',
          data: found,
        });
      }
      const newCompany = await Companies.update(
        {
          name,
          description,
          imageUrl,
        },
        { where: { id }, returning: true }
      );

      return res.status(200).json({
        status: 200,
        message: 'Insurance company was updated successfully',
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
