import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

import init from "../utils";
const seriesArr = init();
export default defineUserConfig({
  title: "Refinec's Blog",
  description: "前端笔记",
  theme: recoTheme({
    // algolia: {
    //   appId: 'DYXP6WPXJL',
    //   apiKey: '2cdddec5f0a3f1189c2309af0c837bb6',
    //   indexName: 'hallelujah',
    //   inputSelector: '搜索',
    //   algoliaOptions: { 'facetFilters': ["lang:$LANG"] },
    //   debug: false // Set debug to true if you want to inspect the dropdown
    // },

    style: "@vuepress-reco/style-default",
    logo: "https://avatars.githubusercontent.com/refinec",
    author: "refinec",
    authorAvatar: "https://avatars.githubusercontent.com/refinec",
    // repo: "https://github.com/refinec/FrontEndNotes",
    // docsRepo: "https://github.com/refinec/FrontEndNotes",
    // docsBranch: "master",
    docsDir: "/docs",
    sourceDir: '/docs',
    lastUpdatedText: "",
    assetsInclude: "**/*.awebp",

    catalogTitle: '目录',
    // 自动设置分类
    // autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    // autoAddCategoryToNavbar: {
    //   location: 0, // 默认 0
    //   categoryText: '分类', // 默认 categories
    //   tagText: '标签' // 默认 tags
    // },
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    // autoAddCategoryToNavbar: true,

    // 自动设置系列
    // autoSetSeries: true,
    // series 为原 sidebar
    series: {
      "/docs/": seriesArr,
    //   // "/docs/theme-reco/": [
    //   //   {
    //   //     text: "module one",
    //   //     children: ["home", "theme"],
    //   //   },
    //   //   {
    //   //     text: "module two",
    //   //     children: ["api", "plugin"],
    //   //   },
    //   // ],
    },
    navbar: [
      { icon: 'Home', text: "首页", link: "/" },
      { icon: 'Categories', text: "分类", link: "/categories/Docker/1/" },
      { icon: 'Tag', text: "标签", link: "/tags/docs/1/" },
      {
        icon: 'Document',
        text: "笔记",
        link: "/docs/docs/",
        // children: [
          // { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          // { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        // ],
      },
    ],
    // 公告
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

    // 评论
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
