class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        switch(this.role){
        case "Engineer":
            return "Engineer";
        case "Intern":
            return "Intern";
        case "Manager":
            return "Manager";
        default:
            return "Employee";
        };
    }
}

module.exports = Employee;