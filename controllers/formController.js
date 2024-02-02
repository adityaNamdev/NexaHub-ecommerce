const express = require('express');
const { validationResult } = require('express-validator');
const fs = require('fs');

const saveForm = (formData) => {
  const filePath = 'form_data.json';

  try {
    
    const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    existingData.push(formData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return true;
  } catch (error) {
    console.error('Error saving form data:', error);
    return false;
  }
};

const validateForm = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  saveForm,
  validateForm,
};
