require("dotenv").config();

//VARS

const mp = new Map();

//UTILS

function key(r, c) {
  return `${r},${c}`;
}

async function user_check() {
  const api = process.env.api_key_1;
  const username = "-GrandMaster-";

  const no_of_submissions = 1;

  // const user1 =
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${username}&from=1&count=${no_of_submissions}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "OK") {
        const res = data.result;
        console.log(res);
      }
    });
}

async function get_all_problems() {
  const res = await fetch(`https://codeforces.com/api/problemset.problems`);
  const data = await res.json();
  // console.log(data);

  const problems = data.result.problems;
  // console.log(problems);
  return problems;
}

async function app() {
  const problems = await get_all_problems();
  //console.log(problems);
}
app();
