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

    const {data} = await supabase.from("trips").insert([{
        customer_id,
        vehicle_id,
        start_date,
        end_date,
        location,
        distance_km,
        passengers,
        isCompleted: false, tripCost : 0
    }]);

    await supabase.from("vehicles").update({isAvailable: false}).eq("id", vehicle_id);
    res.status(201).json({message: "Trip created successfully", trip: data[0]});
};

exports.endTrip = async (req, res) => {
    const {trip_id} = req.params;
    const { data: tripData} = await supabase.from("trips").select("*").eq("id", trip_id);
    const trip = tripData[0];
    if(!trip) return res.status(400).json({ error: "Trip not found." });

    const { data: vehicleData} = await supabase.from("vehicles").select("*").eq("id", trip.vehicle_id);
    const vehicle = vehicleData[0];
    const tripCost = trip.distance_km * vehicle.cost_per_km;
    await supabase.from("trips").update({isCompleted: true, tripCost}).eq("id", trip_id);
    await supabase.from("vehicles").update({isAvailable: true}).eq("id", trip.vehicle_id);
    res.status(200).json({message: "Trip ended successfully", tripCost});
};
