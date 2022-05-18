const {toBeSuccessfulResult, toBeHaveTestData} = require("./Test4zMatchers")
expect.extend({
    toBeHaveTestData,
    toBeSuccessfulResult
});
