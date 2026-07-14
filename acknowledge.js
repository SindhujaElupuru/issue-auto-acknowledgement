console.log("=================================");
console.log("CIAM Auto Acknowledgement Debug");
console.log("=================================");

console.log(
  "VELA_GIT_TOKEN FOUND:",
  !!process.env.VELA_GIT_TOKEN
);

if (process.env.VELA_GIT_TOKEN) {
  console.log(
    "VELA_GIT_TOKEN LENGTH:",
    process.env.VELA_GIT_TOKEN.length
  );
}

console.log("=================================");
