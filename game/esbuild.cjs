const esbuild = require("esbuild");

const IS_WATCH_MODE = process.argv[2] === "--watch";

const TARGET_ENTRIES = [
  {
    target: "es2020",
    entryPoints: ["src/client/index.ts"],
    outfile: "dist/client.js",
  },
  {
    target: "node16",
    entryPoints: ["src/server/index.ts"],
    platform: "node",
    outfile: "dist/server.js",
  },
];

const buildBundle = async () => {
  try {
    const baseOptions = {
      logLevel: "info",
      bundle: true,
      charset: "utf8",
      minifyWhitespace: true,
      absWorkingDir: process.cwd(),
    };

    for (const targetOpts of TARGET_ENTRIES) {
      const mergedOpts = { ...baseOptions, ...targetOpts };

      if (IS_WATCH_MODE) {
        const context = await esbuild.context(mergedOpts);
        await context.watch();
        continue;
      }

      const { errors } = await esbuild.build(mergedOpts);

      if (errors.length) {
        console.error(`[ESBuild] Bundle failed with ${errors.length} errors`);
        process.exit(1);
      }
    }
  } catch (e) {
    console.log("[ESBuild] Build failed with error");
    console.error(e);
    process.exit(1);
  }
};

buildBundle().catch(() => process.exit(1));
