const fs = require('fs');
const path = require('path');

const files = [
  "apps/user/src/app/api/user-state/route.ts",
  "apps/user/src/app/api/sponsors/route.ts",
  "apps/user/src/app/api/proposals/route.ts",
  "apps/user/src/app/api/events/route.ts",
  "apps/user/src/app/api/activities/route.ts",
  "apps/admin/src/app/api/users/route.ts",
  "apps/admin/src/app/api/sponsors/route.ts",
  "apps/admin/src/app/api/proposals/route.ts",
  "apps/admin/src/app/api/events/route.ts"
];

for (const file of files) {
  const filePath = path.resolve("d:/College/Sem 2/Fitness_Challenge", file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes("export const dynamic")) {
      content = 'export const dynamic = "force-dynamic";\n\n' + content;
      fs.writeFileSync(filePath, content, "utf-8");
      console.log("Updated", file);
    } else {
      console.log("Skipped", file);
    }
  } else {
    console.log("Not found:", file);
  }
}
