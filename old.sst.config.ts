/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      home: "aws",
      name: "sst-aisdk",
      providers: {
        aws: {
          profile: $dev ? "sockthedev" : undefined,
          region: "ap-southeast-1",
        },
      },
    }
  },
  async run() {
    const domain = "sst-aisdk.sockthe.dev"

    const router = new sst.aws.Router("Router", {
      domain: {
        name: domain,
        dns: sst.aws.dns(),
      },
    })

    const site = new sst.aws.StaticSite("Website", {
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
