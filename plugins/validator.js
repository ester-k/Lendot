const Validator = {
    name: 'Validator',
    checkForm(form) {
        let errors = {};
        for (let field in form) {
            console.log(`${field}: ${form[field]}`);
            if (form[field] == "" || form[field] == "-Select-") {
                if (!errors[field]) errors[field] = [];
                if (!errors[field].includes("Required Field"))
                    errors[field].push("Required Field");
            } else {
                if (field == "email") {
                    if (!validEmail(form[field])) {
                        if (!errors[field]) errors[field] = [];
                        if (!errors[field].includes("Invalid Email"))
                            errors[field].push("Invalid Email");
                    }
                }
                if (field == "phone") {
                    if (!validatePhoneNumber(form[field])) {
                        if (!errors[field]) errors[field] = [];
                        if (!errors[field].includes("Invalid Phone"))
                            errors[field].push("Invalid Phone");
                    }
                }
                if (field == "zip") {
                    if (!validateZip(form[field])) {
                        if (!errors[field]) errors[field] = [];
                        if (!errors[field].includes("Invalid Phone"))
                            errors[field].push("Invalid Zip Code");
                    }
                }
                let input = document.querySelector('input[name=' + field + ']');
                if (input) {
                    if (input.getAttribute("data-valid") == "num")
                        if (!validateNumber(form[field])) {
                            if (!errors[field]) errors[field] = [];
                            if (!errors[field].includes("Invalid Number"))
                                errors[field].push("Invalid Number");
                        }
                }

            }
        }

        function validEmail(email) {
            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validatePhoneNumber(input_str) {
            var re = /^\d{10}$/;
            return re.test(input_str);
        }

        function validateZip(input_str) {
            var re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            return re.test(input_str);
        }

        function validateNumber(input_str) {
            var re = (/\d+/g);
            return re.test(input_str);
        }


        return errors;
    }
}

export default ({ app }, inject) => {
    inject('Validator', Validator)
}