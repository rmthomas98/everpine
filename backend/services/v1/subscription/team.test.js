const test = require("node:test");
const { createTeam } = require("./team");
const assert = require("assert");

test("CreateTeam should return an object", async () => {
  const data = {
    name: "ryan",
    company: "spacemon",
    avatar: null,
    user: {
      id: "clxkot2nl0000rjm7or7dkupd",
      email: "rmthomas1998@gmail.com",
    },
  };
  const team = await createTeam(
    data.name,
    data.company,
    data.avatar,
    data.user,
  );
  assert.strictEqual(team.name, data.name, "Name is not equal");
});
