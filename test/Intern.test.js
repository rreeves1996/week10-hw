const Intern = require("../lib/Intern");

const newIntern = new Intern("newName", "newId", "newEmail", "newSchool");

describe("Intern", () => {
    describe("getName", () => {
        it("should return inputted name 'newName' when called", () => {
            expect(newIntern.getName()).toBe("newName");
        })
    });
    describe("getId", () => {
        it("should return inputted ID 'newId' when called", () => {
            expect(newIntern.getId()).toBe("newId");
        })
    });
    describe("getEmail", () => {
        it("should return inputted email 'newEmail' when called", () => {
            expect(newIntern.getEmail()).toBe("newEmail");
        })
    });
    describe("getSchool", () => {
        it("should return inputted School 'newSchool' when called", () => {
            expect(newIntern.getSchool()).toBe("newSchool");
        })
    });
    describe("getRole", () => {
        it("should return defaulted role 'Intern' when called", () => {
            expect(newIntern.getRole()).toBe("Intern");
        })
    });
});