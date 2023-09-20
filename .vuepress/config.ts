import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Refinec's Blog",
  description: "前端笔记",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "refinec",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/refinec",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // autoSetSeries: true,
    // series 为原 sidebar
    series: {
      "/docs/": [
        {
          text: "工作集",
          children: [
            {
              text: "工具集",
              link: "/docs/工作集/工具集.html"
            },
            {
              text: "所有",
              link: "/docs/工作集/所有.html"
            },
            {
              text: "css常用样式集",
              link: "/docs/工作集/css常用样式集.html"
            },
            {
              text: "CSS问题集",
              link: "/docs/工作集/CSS问题集.html"
            }
          ],
        },
        // {
        //   text: "module two",
        //   children: ["api", "plugin"],
        // },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      // { text: "分类", link: "/categories/reco/1/" },
      // { text: "标签", link: "/tags/tag1/1/" },
      {
        text: "文档", link: "/docs/"
        // children: [
        //   { text: "工作集", link: "/docs/工作集/" },
        //   { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        // ],
      },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
