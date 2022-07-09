const Manager = require("../lib/Manager");

const newManager = new Manager("newName", "newId", "newEmail", "newOfficeNumber");

describe("Manager", () => {
    describe("getName", () => {
        it("should return inputted name 'newName' when called", () => {
            expect(newManager.getName()).toBe("newName");
        })
    });
    describe("getId", () => {
        it("should return inputted ID 'newId' when called", () => {
            expect(newManager.getId()).toBe("newId");
        })
    });
    describe("getEmail", () => {
        it("should return inputted email 'newEmail' when called", () => {
            expect(newManager.getEmail()).toBe("newEmail");
        })
    });
    describe("newOfficeNumber", () => {
        it("should return inputted office number 'newOfficeNumber' when called", () => {
            expect(newManager.getOfficeNumber()).toBe("newOfficeNumber");
        })
    });
    describe("getRole", () => {
        it("should return defaulted role 'Manager' when called", () => {
            expect(newManager.getRole()).toBe("Manager");
        })
    });
});