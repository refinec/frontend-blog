import fs from "fs";
import path from "path";
/**
 * 把 markdown 目录结构 转换 为 vuepress-theme-reco 下 series 侧边栏数据
 */
export default function mdTree2Series() {
    const temp = [];
    const recursion = (dirPath, arr, type) => {
        const targetDir = path.resolve(__dirname, dirPath); // markdown文件存储地址
        const dirs = fs.readdirSync(targetDir, { encoding: 'utf8', withFileTypes: true });
        for (const dir of dirs) {
            const series = {};
            if (dir.isDirectory()) {
                if (['assets'].includes(dir.name)) {
                    continue;
                }
                series["text"] = dir.name;
                series["collapsible"] = false;
                series["children"] = [];
                recursion(`${dirPath}/${dir.name}`, series["children"], 2);
                arr.unshift(series);
            } else if (dir.isFile() && /\.md/ig.test(dir.name)) {
                const name = String(dir.name).replace('.md', '');
                if (['README'].includes(name)) {
                    continue;
                }
                series["text"] = name;
                if (type === 1) {
                    series["collapsible"] = false;
                    series["children"] = [{
                        text: name,
                        link: dirPath.replace("../docs", "/docs") + "/" + String(dir.name).replace('.md', '.html')
                    }];

                }
                if (type === 2) {
                    series["link"] = dirPath.replace("../docs", "/docs") + "/" + String(dir.name).replace('.md', '.html');
                }
                arr.push(series);
            } else {
                continue;
            }
        }
    }

    recursion("../docs", temp, 1);
    return temp;
}