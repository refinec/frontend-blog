// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

// utils/mdTree2Serires.js
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "/Users/refine/\u5B66\u4E60\u8D44\u6599/frontend-blog/utils";
function mdTree2Series() {
  const temp = [];
  const recursion = (dirPath, arr, type) => {
    const targetDir = path.resolve(__vite_injected_original_dirname, dirPath);
    const dirs = fs.readdirSync(targetDir, { encoding: "utf8", withFileTypes: true });
    for (const dir of dirs) {
      const series = {};
      if (dir.isDirectory()) {
        if (["assets"].includes(dir.name)) {
          continue;
        }
        series["text"] = dir.name;
        series["collapsible"] = false;
        series["children"] = [];
        recursion(`${dirPath}/${dir.name}`, series["children"], 2);
        arr.unshift(series);
      } else if (dir.isFile() && /\.md/ig.test(dir.name)) {
        const name = String(dir.name).replace(".md", "");
        if (["README"].includes(name)) {
          continue;
        }
        series["text"] = name;
        if (type === 1) {
          series["collapsible"] = false;
          series["children"] = [{
            text: name,
            link: dirPath.replace("../docs", "/docs") + "/" + String(dir.name).replace(".md", ".html")
          }];
        }
        if (type === 2) {
          series["link"] = dirPath.replace("../docs", "/docs") + "/" + String(dir.name).replace(".md", ".html");
        }
        arr.push(series);
      } else {
        continue;
      }
    }
  };
  recursion("../docs", temp, 1);
  return temp;
}

// utils/cpDocs2Blogs.js
import fs2 from "fs/promises";
import path2 from "path";
var __vite_injected_original_dirname2 = "/Users/refine/\u5B66\u4E60\u8D44\u6599/frontend-blog/utils";
async function cpDocs2Blogs() {
  const targetDir = path2.resolve(__vite_injected_original_dirname2, "../blogs");
  const dirs = fs2.readdirSync(targetDir, { encoding: "utf8" });
  if (dirs) {
    dirs.forEach((fileOrDir) => {
      fs2.rm(targetDir + "/" + fileOrDir, { force: true, recursive: true }, (error) => {
        if (error)
          throw error;
      });
    });
  }
  const sourceDir = path2.resolve(__vite_injected_original_dirname2, "../docs");
  fs2.cp(sourceDir, targetDir, { preserveTimestamps: true, recursive: true }, (error) => {
    if (error)
      throw error;
  });
}

// .vuepress/config.ts
var seriesArr = mdTree2Series();
cpDocs2Blogs();
var config_default = defineUserConfig({
  title: "Refinec's Blog",
  description: "\u524D\u7AEF\u7B14\u8BB0",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "refinec",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/refinec",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    assetsInclude: "**/*.awebp",
    // 自动设置分类
    // autoSetSeries: true,
    // series 为原 sidebar
    series: {
      "/docs/": seriesArr
    },
    navbar: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u5206\u7C7B", link: "/categories/reco/1/" },
      { text: "\u6807\u7B7E", link: "/tags/tag1/1/" },
      {
        text: "\u6587\u6863",
        link: "/docs/"
        // children: [
        //   { text: "工作集", link: "/docs/工作集/" },
        //   { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        // ],
      }
    ]
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
  })
  // debug: true,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZ1ZXByZXNzL2NvbmZpZy50cyIsICJ1dGlscy9tZFRyZWUyU2VyaXJlcy5qcyIsICJ1dGlscy9jcERvY3MyQmxvZ3MuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmVmaW5lL1x1NUI2Nlx1NEU2MFx1OEQ0NFx1NjU5OS9mcm9udGVuZC1ibG9nLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JlZmluZS9cdTVCNjZcdTRFNjBcdThENDRcdTY1OTkvZnJvbnRlbmQtYmxvZy8udnVlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yZWZpbmUvJUU1JUFEJUE2JUU0JUI5JUEwJUU4JUI1JTg0JUU2JTk2JTk5L2Zyb250ZW5kLWJsb2cvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lT3B0aW9ucyB9IGZyb20gXCJ2dWVwcmVzc1wiO1xuaW1wb3J0IHJlY29UaGVtZSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtcmVjb1wiO1xuaW1wb3J0IG1kVHJlZTJTZXJpZXMgZnJvbSBcIi4uL3V0aWxzL21kVHJlZTJTZXJpcmVzXCI7XG5pbXBvcnQgY3BEb2NzMkJsb2dzIGZyb20gXCIuLi91dGlscy9jcERvY3MyQmxvZ3NcIjtcbmNvbnN0IHNlcmllc0FyciA9IG1kVHJlZTJTZXJpZXMoKTtcbmNwRG9jczJCbG9ncygpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xuICB0aXRsZTogXCJSZWZpbmVjJ3MgQmxvZ1wiLFxuICBkZXNjcmlwdGlvbjogXCJcdTUyNERcdTdBRUZcdTdCMTRcdThCQjBcIixcbiAgdGhlbWU6IHJlY29UaGVtZSh7XG4gICAgc3R5bGU6IFwiQHZ1ZXByZXNzLXJlY28vc3R5bGUtZGVmYXVsdFwiLFxuICAgIGxvZ286IFwiL2xvZ28ucG5nXCIsXG4gICAgYXV0aG9yOiBcInJlZmluZWNcIixcbiAgICBhdXRob3JBdmF0YXI6IFwiL2hlYWQucG5nXCIsXG4gICAgZG9jc1JlcG86IFwiaHR0cHM6Ly9naXRodWIuY29tL3JlZmluZWNcIixcbiAgICBkb2NzQnJhbmNoOiBcIm1haW5cIixcbiAgICBkb2NzRGlyOiBcImV4YW1wbGVcIixcbiAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXCIsXG4gICAgYXNzZXRzSW5jbHVkZTogXCIqKi8qLmF3ZWJwXCIsXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU4QkJFXHU3RjZFXHU1MjA2XHU3QzdCXG4gICAgLy8gYXV0b1NldFNlcmllczogdHJ1ZSxcbiAgICAvLyBzZXJpZXMgXHU0RTNBXHU1MzlGIHNpZGViYXJcbiAgICBzZXJpZXM6IHtcbiAgICAgIFwiL2RvY3MvXCI6IHNlcmllc0FycixcbiAgICB9LFxuICAgIG5hdmJhcjogW1xuICAgICAgeyB0ZXh0OiBcIlx1OTk5Nlx1OTg3NVwiLCBsaW5rOiBcIi9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIlx1NTIwNlx1N0M3QlwiLCBsaW5rOiBcIi9jYXRlZ29yaWVzL3JlY28vMS9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIlx1NjgwN1x1N0I3RVwiLCBsaW5rOiBcIi90YWdzL3RhZzEvMS9cIiB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NjU4N1x1Njg2M1wiLCBsaW5rOiBcIi9kb2NzL1wiXG4gICAgICAgIC8vIGNoaWxkcmVuOiBbXG4gICAgICAgIC8vICAgeyB0ZXh0OiBcIlx1NURFNVx1NEY1Q1x1OTZDNlwiLCBsaW5rOiBcIi9kb2NzL1x1NURFNVx1NEY1Q1x1OTZDNi9cIiB9LFxuICAgICAgICAvLyAgIHsgdGV4dDogXCJ2dWVwcmVzcy10aGVtZS1yZWNvXCIsIGxpbms6IFwiL2Jsb2dzL290aGVyL2d1aWRlXCIgfSxcbiAgICAgICAgLy8gXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICAvLyBidWxsZXRpbjoge1xuICAgIC8vICAgYm9keTogW1xuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgLy8gICAgICAgY29udGVudDogYFx1RDgzQ1x1REY4OVx1RDgzQ1x1REY4OVx1RDgzQ1x1REY4OSByZWNvIFx1NEUzQlx1OTg5OCAyLnggXHU1REYyXHU3RUNGXHU2M0E1XHU4RkQxIEJldGEgXHU3MjQ4XHU2NzJDXHVGRjBDXHU1NzI4XHU1M0QxXHU1RTAzIExhdGVzdCBcdTcyNDhcdTY3MkNcdTRFNEJcdTUyNERcdTRFMERcdTRGMUFcdTUxOERcdTY3MDlcdTU5MjdcdTc2ODRcdTY2RjRcdTY1QjBcdUZGMENcdTU5MjdcdTVCQjZcdTUzRUZcdTRFRTVcdTVDM0RcdTYwQzVcdTVDMURcdTlDOUNcdTRFODZcdUZGMENcdTVFNzZcdTRFMTRcdTVFMENcdTY3MUJcdTU5MjdcdTVCQjZcdTU3MjggUVEgXHU3RkE0XHU1NDhDIEdpdEh1YiBcdThFMEFcdThEQzNcdTUzQ0RcdTk5ODhcdTRGN0ZcdTc1MjhcdTRGNTNcdTlBOENcdUZGMENcdTYyMTFcdTRGMUFcdTU3MjhcdTdCMkNcdTRFMDBcdTY1RjZcdTk1RjRcdTU0Q0RcdTVFOTRcdTMwMDJgLFxuICAgIC8vICAgICAgIHN0eWxlOiBcImZvbnQtc2l6ZTogMTJweDtcIixcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIHR5cGU6IFwiaHJcIixcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIHR5cGU6IFwidGl0bGVcIixcbiAgICAvLyAgICAgICBjb250ZW50OiBcIlFRIFx1N0ZBNFwiLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgLy8gICAgICAgY29udGVudDogYFxuICAgIC8vICAgICAgIDx1bD5cbiAgICAvLyAgICAgICAgIDxsaT5RUVx1N0ZBNDFcdUZGMUExMDM3Mjk2MTA0PC9saT5cbiAgICAvLyAgICAgICAgIDxsaT5RUVx1N0ZBNDJcdUZGMUExMDYxNTYxMzk1PC9saT5cbiAgICAvLyAgICAgICAgIDxsaT5RUVx1N0ZBNDNcdUZGMUE5NjI2ODc4MDI8L2xpPlxuICAgIC8vICAgICAgIDwvdWw+YCxcbiAgICAvLyAgICAgICBzdHlsZTogXCJmb250LXNpemU6IDEycHg7XCIsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICB0eXBlOiBcImhyXCIsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICB0eXBlOiBcInRpdGxlXCIsXG4gICAgLy8gICAgICAgY29udGVudDogXCJHaXRIdWJcIixcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgIC8vICAgICAgIGNvbnRlbnQ6IGBcbiAgICAvLyAgICAgICA8dWw+XG4gICAgLy8gICAgICAgICA8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS92dWVwcmVzcy1yZWNvL3Z1ZXByZXNzLXRoZW1lLXJlY28tbmV4dC9pc3N1ZXNcIj5Jc3N1ZXM8YS8+PC9saT5cbiAgICAvLyAgICAgICAgIDxsaT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXByZXNzLXJlY28vdnVlcHJlc3MtdGhlbWUtcmVjby1uZXh0L2Rpc2N1c3Npb25zLzFcIj5EaXNjdXNzaW9uczxhLz48L2xpPlxuICAgIC8vICAgICAgIDwvdWw+YCxcbiAgICAvLyAgICAgICBzdHlsZTogXCJmb250LXNpemU6IDEycHg7XCIsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICB0eXBlOiBcImhyXCIsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICB0eXBlOiBcImJ1dHRvbmdyb3VwXCIsXG4gICAgLy8gICAgICAgY2hpbGRyZW46IFtcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgdGV4dDogXCJcdTYyNTNcdThENEZcIixcbiAgICAvLyAgICAgICAgICAgbGluazogXCIvZG9jcy9vdGhlcnMvZG9uYXRlLmh0bWxcIixcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgXSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIF0sXG4gICAgLy8gfSxcbiAgICAvLyBjb21tZW50Q29uZmlnOiB7XG4gICAgLy8gICB0eXBlOiAndmFsaWUnLFxuICAgIC8vICAgLy8gb3B0aW9ucyBcdTRFMEUgMS54IFx1NzY4NCB2YWxpbmVDb25maWcgXHU5MTREXHU3RjZFXHU0RTAwXHU4MUY0XG4gICAgLy8gICBvcHRpb25zOiB7XG4gICAgLy8gICAgIC8vIGFwcElkOiAneHh4JyxcbiAgICAvLyAgICAgLy8gYXBwS2V5OiAneHh4JyxcbiAgICAvLyAgICAgLy8gcGxhY2Vob2xkZXI6ICdcdTU4NkJcdTUxOTlcdTkwQUVcdTdCQjFcdTUzRUZcdTRFRTVcdTY1MzZcdTUyMzBcdTU2REVcdTU5MERcdTYzRDBcdTkxOTJcdTU0RTZcdUZGMDEnLFxuICAgIC8vICAgICAvLyB2ZXJpZnk6IHRydWUsIC8vIFx1OUE4Q1x1OEJDMVx1NzgwMVx1NjcwRFx1NTJBMVxuICAgIC8vICAgICAvLyBub3RpZnk6IHRydWUsXG4gICAgLy8gICAgIC8vIHJlY29yZElQOiB0cnVlLFxuICAgIC8vICAgICAvLyBoaWRlQ29tbWVudHM6IHRydWUgLy8gXHU5NjkwXHU4NUNGXHU4QkM0XHU4QkJBXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0pLFxuICAvLyBkZWJ1ZzogdHJ1ZSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmVmaW5lL1x1NUI2Nlx1NEU2MFx1OEQ0NFx1NjU5OS9mcm9udGVuZC1ibG9nL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcmVmaW5lL1x1NUI2Nlx1NEU2MFx1OEQ0NFx1NjU5OS9mcm9udGVuZC1ibG9nL3V0aWxzL21kVHJlZTJTZXJpcmVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yZWZpbmUvJUU1JUFEJUE2JUU0JUI5JUEwJUU4JUI1JTg0JUU2JTk2JTk5L2Zyb250ZW5kLWJsb2cvdXRpbHMvbWRUcmVlMlNlcmlyZXMuanNcIjtpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuLyoqXG4gKiBcdTYyOEEgbWFya2Rvd24gXHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0IFx1OEY2Q1x1NjM2MiBcdTRFM0EgdnVlcHJlc3MtdGhlbWUtcmVjbyBcdTRFMEIgc2VyaWVzIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjU3MFx1NjM2RVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZFRyZWUyU2VyaWVzKCkge1xuICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICBjb25zdCByZWN1cnNpb24gPSAoZGlyUGF0aCwgYXJyLCB0eXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldERpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGRpclBhdGgpOyAvLyBtYXJrZG93blx1NjU4N1x1NEVGNlx1NUI1OFx1NTBBOFx1NTczMFx1NTc0MFxuICAgICAgICBjb25zdCBkaXJzID0gZnMucmVhZGRpclN5bmModGFyZ2V0RGlyLCB7IGVuY29kaW5nOiAndXRmOCcsIHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XG4gICAgICAgIGZvciAoY29uc3QgZGlyIG9mIGRpcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IHt9O1xuICAgICAgICAgICAgaWYgKGRpci5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKFsnYXNzZXRzJ10uaW5jbHVkZXMoZGlyLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXJpZXNbXCJ0ZXh0XCJdID0gZGlyLm5hbWU7XG4gICAgICAgICAgICAgICAgc2VyaWVzW1wiY29sbGFwc2libGVcIl0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXJpZXNbXCJjaGlsZHJlblwiXSA9IFtdO1xuICAgICAgICAgICAgICAgIHJlY3Vyc2lvbihgJHtkaXJQYXRofS8ke2Rpci5uYW1lfWAsIHNlcmllc1tcImNoaWxkcmVuXCJdLCAyKTtcbiAgICAgICAgICAgICAgICBhcnIudW5zaGlmdChzZXJpZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXIuaXNGaWxlKCkgJiYgL1xcLm1kL2lnLnRlc3QoZGlyLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IFN0cmluZyhkaXIubmFtZSkucmVwbGFjZSgnLm1kJywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChbJ1JFQURNRSddLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXJpZXNbXCJ0ZXh0XCJdID0gbmFtZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzZXJpZXNbXCJjb2xsYXBzaWJsZVwiXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZXJpZXNbXCJjaGlsZHJlblwiXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogZGlyUGF0aC5yZXBsYWNlKFwiLi4vZG9jc1wiLCBcIi9kb2NzXCIpICsgXCIvXCIgKyBTdHJpbmcoZGlyLm5hbWUpLnJlcGxhY2UoJy5tZCcsICcuaHRtbCcpXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllc1tcImxpbmtcIl0gPSBkaXJQYXRoLnJlcGxhY2UoXCIuLi9kb2NzXCIsIFwiL2RvY3NcIikgKyBcIi9cIiArIFN0cmluZyhkaXIubmFtZSkucmVwbGFjZSgnLm1kJywgJy5odG1sJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHNlcmllcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjdXJzaW9uKFwiLi4vZG9jc1wiLCB0ZW1wLCAxKTtcbiAgICByZXR1cm4gdGVtcDtcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9yZWZpbmUvXHU1QjY2XHU0RTYwXHU4RDQ0XHU2NTk5L2Zyb250ZW5kLWJsb2cvdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yZWZpbmUvXHU1QjY2XHU0RTYwXHU4RDQ0XHU2NTk5L2Zyb250ZW5kLWJsb2cvdXRpbHMvY3BEb2NzMkJsb2dzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yZWZpbmUvJUU1JUFEJUE2JUU0JUI5JUEwJUU4JUI1JTg0JUU2JTk2JTk5L2Zyb250ZW5kLWJsb2cvdXRpbHMvY3BEb2NzMkJsb2dzLmpzXCI7aW1wb3J0IGZzIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY3BEb2NzMkJsb2dzKCkge1xuICAgIC8vIDEuIFx1NTE0OFx1NkUwNVx1N0E3QWJsb2dzXHU3NkVFXHU1RjU1XG4gICAgY29uc3QgdGFyZ2V0RGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9ibG9nc1wiKTtcbiAgICBjb25zdCBkaXJzID0gZnMucmVhZGRpclN5bmModGFyZ2V0RGlyLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgaWYgKGRpcnMpIHtcbiAgICAgICAgZGlycy5mb3JFYWNoKGZpbGVPckRpciA9PiB7XG4gICAgICAgICAgICBmcy5ybSh0YXJnZXREaXIgKyBcIi9cIiArIGZpbGVPckRpciwgeyBmb3JjZTogdHJ1ZSwgcmVjdXJzaXZlOiB0cnVlIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyAyLiBcdTU5MERcdTUyMzZkb2NzXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0XHU2NTg3XHU0RUY2XHU1MjMwYmxvZ3NcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2RvY3NcIik7XG4gICAgZnMuY3Aoc291cmNlRGlyLCB0YXJnZXREaXIsIHsgcHJlc2VydmVUaW1lc3RhbXBzOiB0cnVlLCByZWN1cnNpdmU6IHRydWUgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgfSlcblxuICAgIC8vIDMuIFx1N0VEOWJsb2dzXHU3NkVFXHU1RjU1XHU0RTBCXHU2MjQwXHU2NzA5bWFya2Rvd25cdTY1ODdcdTRFRjZcdTc2ODRcdTU5MzRcdTkwRThcdTZERkJcdTUyQTBcdTY1ODdcdTY3MkNcblxuXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVSxTQUFTLHdCQUF3QjtBQUV2VyxPQUFPLGVBQWU7OztBQ0ZvVCxPQUFP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Q1osU0FBUztBQUFBLElBQ1QsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSWYsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLEVBQUUsTUFBTSxnQkFBTSxNQUFNLElBQUk7QUFBQSxNQUN4QixFQUFFLE1BQU0sZ0JBQU0sTUFBTSxzQkFBc0I7QUFBQSxNQUMxQyxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxnQkFBZ0I7QUFBQSxNQUNwQztBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQU0sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLcEI7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW9FRixDQUFDO0FBQUE7QUFFSCxDQUFDOyIsCiAgIm5hbWVzIjogWyJmcyIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiZnMiXQp9Cg==
