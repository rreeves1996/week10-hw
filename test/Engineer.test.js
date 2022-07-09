const Engineer = require("../lib/Engineer");

const newEngineer = new Engineer("newName", "newId", "newEmail", "newGithub");

describe("Engineer", () => {
    describe("getName", () => {
        it("should return inputted name 'newName' when called", () => {
            expect(newEngineer.getName()).toBe("newName");
        })
    });
    describe("getId", () => {
        it("should return inputted ID 'newId' when called", () => {
            expect(newEngineer.getId()).toBe("newId");
        })
    });
    describe("getEmail", () => {
        it("should return inputted email 'newEmail' when called", () => {
            expect(newEngineer.getEmail()).toBe("newEmail");
        })
    });
    describe("getGithub", () => {
        it("should return inputted Github 'newGithub' when called", () => {
            expect(newEngineer.getGithub()).toBe("newGithub");
        })
    });
    describe("getRole", () => {
        it("should return defaulted role 'Engineer' when called", () => {
            expect(newEngineer.getRole()).toBe("Engineer");
        })
    });
});