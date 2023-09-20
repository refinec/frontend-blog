import { error } from "console";
import fs from "fs"
/**
 * 把 markdown 目录结构 转换 为 vuepress-theme-reco 下 series 侧边栏数据
 */
export default function mdTree2Series() {
    const targetDir = "../docs/"; // markdown文件存储地址
    fs.readdirSync(targetDir, { encoding: 'utf8' }, (error, files) => {
        console.log('files :>> ', files);
    })
}