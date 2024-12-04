const mongoose = require('mongoose');
const createError = require('http-errors');
const user = require('../Model/model'); // Ensure this is correctly imported
const { successResponse } = require('./responseController');
const findUserById = require('../services/findUserById');






const getUsers = async(req, res, next) => {  
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + '.*',
            'i');

        const filter = {
            isAdmin: {$ne: true},
            $or:[
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {phone: {$regex: searchRegExp}},
            ]
        };

        const options = {password: 0};

        const users = await user.find(filter, options)
        .limit(limit)
        .skip((page-1)*limit);

        const count = await user.find(filter). countDocuments();

        if (!users) throw createError(404, 'no users found');

        return successResponse(res, {
            statusCode: 200,
            message: 'users was returned successfully',
            payload: {
                users,
                pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 >0 ? page-1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ?
                page + 1 : null, 
            },
            },
        })
    } catch (error) {
        next(error);
    }
  };



  const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const fetchedUser = await findUserById(id)

        // Respond with success
        return successResponse(res, {
            statusCode: 200,
            message: 'User was returned successfully',
            payload: { user: fetchedUser },
        });
    } catch (error) {
       
    }
};


  module.exports = {getUsers, getUser};