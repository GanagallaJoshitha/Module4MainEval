const {supabase} = require('../config/supabase.js');

exports.createTrip = async (req, res) => {
    const {customer_id, vehicle_id, start_date, end_date, location, distance_km, passengers} = req.body;
    const { data: vehicleData} = await supabase.from("vehicles").select("*").eq("id", vehicle_id)
    const vehicle = vehicleData[0];
    if(!vehicle)
        return res.status(400).json({ error: "Vehicle not found." });
    if(!vehicle.isAvailable)
        return res.status(400).json({ error: "Vehicle not available" });
    if(passengers > vehicle.allowed_passengers)
        return res.status(400).json({ error: "Number of passengers exceeds vehicle capacity." });
}


