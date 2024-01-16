export type TCreateJudge0Submission = {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
};

export type TJudge0SubmissionResponse = {
  status_id: keyof typeof JUDGE0_STATUS;
};

export const JUDGE0_STATUS = {
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};

const JUDGE0_BASE_URL = "https://judge0.uk.to";

export const CreateJudge0Submissions = async (
  args: TCreateJudge0Submission[]
) => {
  const response = await fetch(`${JUDGE0_BASE_URL}/submissions/batch`, {
    body: JSON.stringify({ submissions: args }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return (await response.json()) as { token: string }[];
};

export const GetJudge0Submissions = async (args: { token: string }[]) => {
  const tokens = args.map(({ token }) => token).join(",");
  const response = await fetch(
    `${JUDGE0_BASE_URL}/submissions/batch/?tokens=${tokens}&fields=status_id`
  );
  return (await response.json()) as {
    submissions: TJudge0SubmissionResponse[];
  };
};

export const GetVerdictOfSubmissions = (
  submissions: TJudge0SubmissionResponse[]
): string => {
  // if all are accepted, return accepted
  // if all are pending, return pending
  // else return wrong answer

  const firstStatus = submissions[0].status_id;

  const allPending = submissions.every(
    (submission) => submission.status_id < 3 // in queue, or processing
  );
  if (allPending) return "PENDING";

  const allWithSameStatus = submissions.every(
    (submission) => submission.status_id === firstStatus
  );
  if (allWithSameStatus)
    return JUDGE0_STATUS[firstStatus].toUpperCase().split(" ").join("_");

  const firstNonPending = submissions.find(({ status_id }) => status_id > 2);
  return firstNonPending
    ? JUDGE0_STATUS[firstNonPending.status_id]
        .toUpperCase()
        .split(" ")
        .join("_")
    : "UNKNOWN_VERDICT";
};

type TJudge0Language = { id: number; name: string };
let JUDGE0_LANGUAGES: TJudge0Language[] | null = null;

export async function GetJudge0Languages() {
  if (!JUDGE0_LANGUAGES) {
    const response = await fetch(`${JUDGE0_BASE_URL}/languages`);
    JUDGE0_LANGUAGES = (await response.json()) as TJudge0Language[];
  }

  return JUDGE0_LANGUAGES;
}
