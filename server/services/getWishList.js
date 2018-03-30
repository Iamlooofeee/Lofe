import User from '../models/user';
import House from '../models/house';

export default async (req, res) => {
	let _id = req.body.session;

	let wishList, houses;
	try {
		wishList = await User.findOne({ _id }, { email: 0, password: 0, username: 0, __v: 0, _id: 0 });
		// const arraId = wishList.wishList;
		// for (let i = 0; i < arrayId.length; i++) {
		// 	houses[0] = await House.find({ "_id": arraId[0] });
		// }
		// res.send(houses);
		res.send(wishList)
	} catch ({ message }) {
		return next({
			status: 402,
			message
		});
	}
};

// const arraId = wishList.wishList;

