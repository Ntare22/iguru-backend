import Models from '../database/models';

const { Vehicles } = Models;

class vehiclesController {
  static async addVehicle(req, res) {
    try {
      const { Brand, PlateNumber, Year, VehicleType, Version } = req.body;
      const newVehicle = await Vehicles.create({
        Brand,
        PlateNumber,
        Year,
        VehicleType,
        Version,
      });

      return res.status(201).json({
        status: 201,
        message: 'New vehicle was added successfully',
        data: newVehicle,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default vehiclesController;
