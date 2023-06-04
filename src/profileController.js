import { successResponseBuilder } from "./helpers/responseBuilder.js";
import User from "./userModel.js";





export const updateProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = {
            nama: req.body.nama,
            nim: req.body.nim,
            prodi: req.body.prodi,
            fakultas: req.body.fakultas,
        };

        const result = await User.findByIdAndUpdate(id, body);

        result
            ? res.status(200).json(successResponseBuilder({ user: result }))
            : res.status(404).send({ message: "Data not found." });
    } catch (error) {
        next(err);
    }
};