import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateJudge0Submissions,
  GetJudge0Submissions,
  GetVerdictOfSubmissions,
} from "./judge0.service";
import { GetProblemTestCases } from "./tests.service";

const prisma = new PrismaClient();

export const CreateSubmission = async (
  args: Prisma.SubmissionUncheckedCreateInput
) => {
  const dbSubmission = await prisma.submission.create({ data: args });
  PostSubmissionCreation(dbSubmission);
  return dbSubmission;
};

export const FindSubmissionById = async (id: string) => {
  return await prisma.submission.findUnique({ where: { id } });
};

export const PostSubmissionCreation = async (submission: {
  id: string;
  sourceCode: string;
  languageId: number;
}) => {
  GetProblemTestCases()
    .then(async (testCases) => {
      const judge0Submissions = await CreateJudge0Submissions(
        Object.entries(testCases).map(([_, { input, output }]) => ({
          source_code: submission.sourceCode,
          language_id: submission.languageId,
          stdin: input,
          expected_output: output,
        }))
      );
      await HandleSubmissions(judge0Submissions, submission.id);
    })
    .catch(console.error);
};

export const HandleSubmissions = async (
  args: { token: string }[],
  databaseId: string,
  retries = 0,
  MAX_RETRIES = 20
) => {
  if (retries > MAX_RETRIES) return;
  const { submissions } = await GetJudge0Submissions(args);
  console.log(
    `[${databaseId}][${retries}] ${submissions.map(
      ({ status_id }) => status_id
    )}`
  );
  const verdict = GetVerdictOfSubmissions(submissions);
  console.log(`[${databaseId}][${retries}] ${verdict}`);
  if (verdict === "PENDING") {
    setTimeout(() => HandleSubmissions(args, databaseId, retries + 1), 6_000);
  } else {
    await prisma.submission.update({
      where: { id: databaseId },
      data: { verdict },
    });
  }
};
