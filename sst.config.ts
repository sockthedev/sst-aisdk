/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-aisdk",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "sockthedev",
        },
      },
    }
  },
  async run() {
    const zone = "sst-aisdk.sockthe.dev"
    const domain = $app.stage === "production" ? zone : `${$app.stage}.${zone}`

    const router = new sst.aws.Router("Router", {
      domain: {
        name: domain,
        dns: sst.aws.dns(),
      },
    })

    new sst.aws.Function("Api", {
      handler: "pkgs/functions/src/api/handler.handler",
      timeout: `5 minutes`,
      memory: "512 MB",
      url: {
        router: {
          instance: router,
          path: "/api",
        },
        cors: false,
      },
    })

    new sst.aws.StaticSite("Website", {
      path: "./pkgs/ui",
      build: {
        output: "./dist",
        command: "pnpm build",
      },
      router: {
        instance: router,
        path: "/",
      },
    })
  },
})
