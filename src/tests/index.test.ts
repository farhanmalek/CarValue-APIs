import app from "../app"; 
import request from "supertest";

//Car Value API Tests
describe("Car Value API", () => {
  it("return a correct value", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "Corolla", year: 2012 });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("carValue");
    expect(response.body.carValue).toEqual(9612);
  });

  it("should be able to handle numbers only, 911 2012", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "911", year: 2012 });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("carValue");
    expect(response.body.carValue).toEqual(3112);
  });

  it("should be able to handle hypens, such as P-1 2012", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "P-1", year: 2012 });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("carValue");
    expect(response.body.carValue).toEqual(3712);
  });

  it("should be able to handle negative years and return a an error", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "Camry", year: -2012 });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      "Please input a valid year above 1893."
    );
  });

  it("should be able to detect a year input lower than 1894 the first production car", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "Camry", year: 1893 });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      "Please input a valid year above 1893."
    );
  });

  it("should be able to handle spaces Mazda MX 5 2017.", async () => {
    const response = await request(app)
      .post("/carvalue")
      .send({ model: "MX 5", year: 2017 });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("carValue");
    expect(response.body.carValue).toEqual(6217);
  });
  it("should be able to handle missing inputs.", async () => {
    const response = await request(app).post("/carvalue").send({ year: 2010 });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Please input a model and year.");
  });
});

//Risk Rating API Tests
describe("Risk Rating API", () => {
  it("should take a string, identify keywords and return a risk rating", async () => {
    const response = await request(app)
      .post("/riskrating")
      .send({
        claimHistory:
          "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("riskRating");
    expect(response.body.riskRating).toEqual(3);
  });

  it("should correctly handle uppercase and lowercase letters", async () => {
    const response = await request(app)
      .post("/riskrating")
      .send({
        claimHistory:
          "My only claim was a CRASH into my house's garage door that left a SCRAtch on my car. There are no other crASHes.",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("riskRating");
    expect(response.body.riskRating).toEqual(3);
  });

  it("should handle an empty string and return the lowest risk rating of 1", async () => {
    const response = await request(app)
      .post("/riskrating")
      .send({
        claimHistory:
          "",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("riskRating");
    expect(response.body.riskRating).toEqual(1);
  });

  it("should detect that there are no key words, therefore return the lowest risk rating of 1", async () => {
    const response = await request(app)
      .post("/riskrating")
      .send({
        claimHistory:
          "I have had no claims in the last 3 years",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("riskRating");
    expect(response.body.riskRating).toEqual(1);
  });


  it("should return a risk rating of no more than 5", async () => {
    const response = await request(app)
      .post("/riskrating")
      .send({
        claimHistory:
          "My only claim was a crash into my house's garage door that left a scratch on my car. I also crashed again on xxx and then crashed again and then bumped and scratched.",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("riskRating");
    expect(response.body.riskRating).toEqual(5);
  });

//   it("should handle spelling mistakes, convert them to a valid sentence and return a risk rating", async () => {
//     const response = await request(app)
//       .post("/riskrating")
//       .send({
//         claimHistory:
//           "My only claim was a cras into my house's garage door that left a srach on my car. There are no other crashes.",
//       });
//     expect(response.status).toEqual(200);
//     expect(response.body).toHaveProperty("riskRating");
//     expect(response.body.riskRating).toEqual(3);
//   });
});

//Premium Quote API tests
describe("Premium Quote API", () => {
    it("should handle both correct inputs and return a valid response", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue:2311,
          riskRating:4
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("monthlyPremium");
      expect(response.body).toHaveProperty("yearlyPremium");
      expect(response.body.monthlyPremium).toEqual(7.7);
      expect(response.body.yearlyPremium).toEqual(92.44);

    })
    it("should handle an invalid risk rating", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue:2311,
          riskRating:0
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toEqual("Invalid Inputs provided. Ensure your inputs are numbers, both carValue and riskRating are supplied, and risk rating is between 1-5.")

    })
    it("should handle an invalid risk rating", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue:2311,
          riskRating:6
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toEqual("Invalid Inputs provided. Ensure your inputs are numbers, both carValue and riskRating are supplied, and risk rating is between 1-5.")

    })
    it("should handle an invalid input types", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue:"two thousand and twenty one",
          riskRating:"three"
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toEqual("Invalid Inputs provided. Ensure your inputs are numbers, both carValue and riskRating are supplied, and risk rating is between 1-5.")

    })
    it("should handle an numbers that are strings", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue:"2311",
          riskRating:"4"
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("monthlyPremium");
      expect(response.body).toHaveProperty("yearlyPremium");
      expect(response.body.monthlyPremium).toEqual(7.7);
      expect(response.body.yearlyPremium).toEqual(92.44);

    })
    it("should handle an invalid input types", async () => {
        const response = await request(app)
        .post("/quote")
        .send({
          carValue: 9231,
        });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toEqual("Invalid Inputs provided. Ensure your inputs are numbers, both carValue and riskRating are supplied, and risk rating is between 1-5.")

    })
})