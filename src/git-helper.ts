import * as exec from "@actions/exec";

export async function getCommitMessage(sha: string): Promise<string> {
  let message = "";

  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        message += data.toString();
      }
    }
  };

  const args: string[] = ["rev-list", "--format=%B", "--max-count=1", sha];

  await exec.exec("git", args, options);
  message.trim();

  return message;
}
