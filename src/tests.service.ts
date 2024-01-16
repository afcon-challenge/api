import { Glob } from "bun";

const tests: Record<string, { input: string; output: string }> = {};

export const GetProblemTestCases = async () => {
  if (Object.keys(tests).length > 0) return tests;

  const input = new Glob("*.in");
  const output = new Glob("*.out");
  const TESTS_DIRECTORY = "src/tests";

  for await (const file of input.scan(TESTS_DIRECTORY)) {
    const content = await Bun.file(`${TESTS_DIRECTORY}/${file}`).text();
    const index = file.split(".")[0];
    tests[index] = { input: content, output: "" };
  }

  for await (const file of output.scan(TESTS_DIRECTORY)) {
    const content = await Bun.file(`${TESTS_DIRECTORY}/${file}`).text();
    const index = file.split(".")[0];
    tests[index] = { ...tests[index], output: content };
  }

  return tests;
};
