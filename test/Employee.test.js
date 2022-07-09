const Employee = require("../lib/Employee");

const newEmployee = new Employee("newName", "newId", "newEmail");

describe("Employee", () => {
    describe("getName", () => {
        it("should return inputted name 'newName' when called", () => {
            expect(newEmployee.getName()).toBe("newName");
        })
    });
    describe("getId", () => {
        it("should return inputted ID 'newId' when called", () => {
            expect(newEmployee.getId()).toBe("newId");
        })
    });
    describe("getEmail", () => {
        it("should return inputted email 'newEmail' when called", () => {
            expect(newEmployee.getEmail()).toBe("newEmail");
        })
    });
    describe("getRole", () => {
        it("should return defaulted role 'Employee' when called", () => {
            expect(newEmployee.getRole()).toBe("Employee");
        })
    });
});