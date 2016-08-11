"use strict";

import { expect } from "chai";
import { Util } from "../../src/utils/util";
// import MockLocation = require("../mocks/MockLocation");

// let location: Location;

describe("Util", () => {

    describe("getCtxCallback", () => {
        it("Should create contextual callback", () => {
            let func = function(a) { this.num = this.num + a; };
            let ctx = { num: 1 };
            let callback = Util.getCtxCallback(ctx, func, 7);
            expect(callback).to.exist;
            expect(callback).to.be.a("function");
            // this call will update ctx var inside the callback
            callback();
            expect(ctx.num).to.eq(8);
        });
    });

    describe("dateAdd", () => {
        it("Should add 5 minutes to a date", () => {
            let testDate = new Date();
            let checkDate = new Date(testDate.toLocaleString());
            checkDate.setMinutes(testDate.getMinutes() + 5);
            expect(Util.dateAdd(testDate, "minute", 5).getMinutes()).to.eq(checkDate.getMinutes());
        });

        it("Should add 2 years to a date", () => {
            let testDate = new Date();
            let checkDate = new Date(testDate.toLocaleString());
            checkDate.setFullYear(testDate.getFullYear() + 2);
            expect(Util.dateAdd(testDate, "year", 2).getFullYear()).to.eq(checkDate.getFullYear());
        });
    });

    describe("stringInsert", () => {
        it("Should insert the string cat into dog at index 2 resulting in docatg", () => {
            expect(Util.stringInsert("dog", 2, "cat")).to.eq("docatg");
        });
    });

    describe("combinePaths", () => {
        it("Should combine the paths '/path/', 'path2', 'path3' and '/path4' to be path/path2/path3/path4", () => {
            expect(Util.combinePaths("/path/", "path2", "path3", "/path4")).to.eq("path/path2/path3/path4");
        });

        it("Should combine the paths 'http://site/path/' and '/path4/page.aspx' to be http://site/path/path4/page.aspx", () => {
            expect(Util.combinePaths("http://site/path/", "/path4/page.aspx")).to.eq("http://site/path/path4/page.aspx");
        });
    });

    describe("getRandomString", () => {
        it("Should produce a random string of length 5", () => {
            let j = Util.getRandomString(5);
            expect(j).to.exist;
            expect(j).to.be.a("string");
            expect(j).to.have.length(5);
        });

        it("Should produce a random string of length 27", () => {
            let j = Util.getRandomString(27);
            expect(j).to.exist;
            expect(j).to.be.a("string");
            expect(j).to.have.length(27);
        });
    });

    describe("getGUID", () => {
        it("Should produce a GUID matching the expected pattern", () => {
            expect(Util.getGUID()).to.match(/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i);
        });
    });

    describe("isFunction", () => {
        it("Should find that a function is a function", () => {
            expect(Util.isFunction(function() { return; })).to.be.true;
        });

        it("Should find that a non-function is not a function", () => {
            expect(Util.isFunction({ val: 0 })).to.be.false;
        });
    });
});
