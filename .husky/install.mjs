// ./.husky/install.mjs
//
// Official instructions on skipping husky install in prod/CI environments.
if (process.env.NODE_ENV === "production" || process.env.CI) {
  console.log(
    "Husky > Skipping Git hooks installation in production environment",
  );
  process.exit(0);
}

const husky = (await import("husky")).default;
console.log("Husky > Installing Git hooks");
console.log(husky());
