module.exports = {

    user: (app, req, res) => {

        //Asserts to validate data
        req.assert('name', 'O nome é obrigatório!').notEmpty();
        req.assert('email', 'O email está inválido! ').notEmpty().isEmail();

        let errors = req.validationErrors(); // Looking for some error

        if (errors) { // Checking if there's any error (Data validation)
            app.utils.error.send(errors, req, res);
            return false;

        }else{

            return true;
            
        }

    }

}