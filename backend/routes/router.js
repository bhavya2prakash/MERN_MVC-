const express = require('express');
const router = express.Router();
const userController = require('../controllers/controllers');
//Create Route
router.post('/user/create',userController.CreateUser);
  
  
  //Get all route
  router.get('/user/getAll',userController.GetAllUser);
  
  //Update Route
  router.put('/user/edit',userController.UpdateUser);
  
  // Delete Route
  router.delete('/user/delete/',userController.DeleteUser);
  
  //Login Route
  router.post('/login',userController.LoginUser);
  
  
 
  
 
  module.exports = router;