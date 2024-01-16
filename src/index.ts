import { Elysia, t } from "elysia";
import {
  CreateSubmission,
  FindSubmissionById,
  PostSubmissionCreation,
} from "./submission.service";
import { GetJudge0Languages } from "./judge0.service";

const app = new Elysia()
  .post(
    "/submissions",
    async ({ body, set }) => {
      const submission = await CreateSubmission({
        username: body.name,
        sourceCode: body.sourceCode,
        languageId: body.languageId,
      });
      set.status = 201;
      return submission;
    },
    {
      body: t.Object({
        name: t.String(),
        sourceCode: t.String(),
        languageId: t.Number(),
      }),
    }
  )
  .get(
    "/submissions/:id",
    async ({ params, set }) => {
      const submission = await FindSubmissionById(params.id);
      if (!submission) {
        set.status = 404;
        return { error: "Submission not found" };
      }
      return { verdict: submission.verdict };
    },
    { params: t.Object({ id: t.String() }) }
  )
  .get("/languages", async ({ set }) => {
    set.headers["Cache-Control"] = "public, max-age=3600";
    return await GetJudge0Languages();
  })
  .onError(({ error, set }) => {
    set.status = 500;
    console.error(error);
    return { error: "Internal server error" };
  })
  .listen(process.env.PORT ?? 3000, (server) => {
    console.log(server.url.href);
  });
