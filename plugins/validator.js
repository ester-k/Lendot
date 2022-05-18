const Validator = {
    name: 'Validator',
    checkForm(form) {
        let errors = {};
        for (let field in form) {
            console.log(`${field}: ${form[field]}`);
            if (form[field] == "") {
                if (!errors[field]) errors[field] = [];
                if (!errors[field].includes(field + " is required."))
                    errors[field].push(field + " is required.");
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
                    if (!validatePhoneNumber(form[field])) {
                        if (!errors[field]) errors[field] = [];
                        if (!errors[field].includes("Invalid Phone"))
                            errors[field].push("Invalid Phone");
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

        return errors;
    }
}

export default ({ app }, inject) => {
    inject('Validator', Validator)
}