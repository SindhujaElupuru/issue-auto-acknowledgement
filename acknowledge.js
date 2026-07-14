const axios = require("axios");

const TOKEN = process.env.GITHUB_TOKEN;

const OWNER = "SindhujaElupuru";
const REPO = "issue-auto-acknowledgement";

const BOT_MARKER = "<!-- CIAM-AUTO-ACK -->";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json"
};

async function run() {
  const issuesResp = await axios.get(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues`,
    { headers }
  );

  for (const issue of issuesResp.data) {

    // Skip pull requests
    if (issue.pull_request) {
      continue;
    }

    const commentsResp = await axios.get(
      issue.comments_url,
      { headers }
    );

    const alreadyExists = commentsResp.data.some(
      comment => comment.body?.includes("CIAM-AUTO-ACK")
    );

    if (alreadyExists) {
      console.log(
        `Issue #${issue.number} already acknowledged`
      );
      continue;
    }

    await axios.post(
      issue.comments_url,
      {
        body: `${BOT_MARKER}

Hi @${issue.user.login}, thank you for contacting the CIAM team!

We have received your issue and are currently taking a look. A team member will follow up with you as soon as possible.

In the meantime, please make sure you've provided all requested details so we can assist you efficiently.`
      },
      { headers }
    );

    console.log(
      `Acknowledged Issue #${issue.number}`
    );
  }
}

run().catch(error => {
  console.error(
    error.response?.data || error.message
  );
});