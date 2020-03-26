const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee =mongoose.model('Employee')

router.get('/',(req, res) => {
    //res.send('Sample Test')
    res.render("employee/addOrEdit",{
        viewTitle : "Insert Employee"
    
    });
});

router.post('/',(req, res) => {
    insertRecord(req,res)
    
    
    });

    function insertRecord(req,res) {
        var employee = new Employee();
        employee.fullname = req.body.fullname;
        employee.email = req.body.emal;
        employee.mobile = req.body.mobile;
        employee.city = req.body.city;

        employee.save((err, doc) => {
            if(!err)
            res.redirect('employee/list');
            else {
                if(err.name == 'ValidationError'){
                    handleValidationError(err,req.body);
                    res.render("employee/addOrEdit",{
                        viewTitle : "Insert Employee",
                    employee: req.body
                    });
                }
                else
                    console.log('Error occur when saving : ' + err);

                
                
            }
        });
    }

    router.get('/list',(req, res) => {
        res.json("List Page");
    });

    function handleValidationError(err,body){
        for(field in err.errors) {
            switch (err.errors[field].path){
                case 'fullName':
                    body['fullNameError'] = err.errors[field].message;
                    break;
                    case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
                    default:
                        break;
            }
        }
    }

module.exports =router;