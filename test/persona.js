var Buffer = require("buffer/").Buffer;
var should = require("should");
var persona = require("../index.js");

describe("Persona JS", function () {

	it("should be ok", function () {
		(persona).should.be.ok;
	});

	it("should be object", function () {
		(persona).should.be.type("object");
	});

	it("should have properties", function () {
		var properties = ["transaction", "signature", "vote", "delegate", "crypto"];

		properties.forEach(function (property) {
			(persona).should.have.property(property);
		});
	});

});
