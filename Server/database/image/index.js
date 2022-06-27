import mongooose from "mongoose";

const ImageSchema = new mongooose.Schema({
    images: [
        {
            location: { type: String, required: true },
        },
    ],
},
{
    timestamps: true,
}
);

export const ImageModel = mongooose.model("Images", ImageSchema);