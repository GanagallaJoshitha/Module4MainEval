const { supabase } = require('../config/supabase.js');

exports.addVehicle = async (req, res) => {
    const { name, registration_number, allowed_passengers, rate_per_km, owner_id} = req.body;

    if(!name || !registration_number || !allowed_passengers || !rate_per_km || !owner_id) 
        return res.status(400).json({ error: "All fields are required." });
        const { data} = await supabase.from("vehicles").select("*").eq("registration_number", registration_number);
        if(data.length > 0) 
            return res.status(400).json({ error: "Registration number already exists." });
        await supabase.from("vehicles").insert([{ name, registration_number, allowed_passengers, rate_per_km, owner_id }]);
        return res.status(201).json({ message: "Vehicle added successfully." });
    };
    exports.assignDriver = async (req, res) => {
        const { vehicleId} = req.params;
        const { driverId} = req.body;
        await
    supabase.from("vehicles").update({ driver_id}).eq("id", vehicleId);
    res.status(200).json({ message: "Driver assigned successfully." });
    }

