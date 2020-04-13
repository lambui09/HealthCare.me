const Favorite = require('../models/Favorite');
const getAllFavorites = async(req, res) =
>
{
    const page = +req.query.page || 1;
    const page_size = 10;
    const skip = page_size * (page - 1);
    const limit = page_size;
    let favorites = [];
    try {
        favorites = await
        Favorite.find().skip(skip).limit(limit);
    } catch (error) {
        console.log(error);
        favorites = [];
    }
    let total_favorites = [];
    try {
        total_favorites = await
        Favorite.countDocuments();
    } catch (error) {
        console.log(error);
        total_favorites = [];
    }
    const total_page = Math.ceil(total_favorites / page_size);

    return res.status(200).json({
        success: true,
        data: {
            favorites,
        },
        meta: {
            page,
            page_size: favorites.length,
            total_page,
            total_size: total_favorites,
        },
    });
}
;
module.exports = {
    getAllFavorites,
};