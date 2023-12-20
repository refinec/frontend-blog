import fs from "fs";
import path from "path";

export default async function cpDocs2Blogs() {
    try {
        // 1. 先清空blogs目录
        const targetDir = path.resolve(__dirname, "../blogs");
        const dirs = fs.readdirSync(targetDir, { encoding: 'utf8', withFileTypes: true });
        dirs.forEach(fileOrDir => {
            fs.rm(targetDir + "/" + fileOrDir.name, { force: true, recursive: true }, (error) => {
                if (error) throw error;
            });
        })

        // 2. 复制docs目录下的文件到blogs
        const sourceDir = path.resolve(__dirname, "../docs");
        fs.cp(sourceDir, targetDir, { preserveTimestamps: true, recursive: true }, (error) => {
            if (error) throw error;
        })

        // 3. 给blogs目录下所有markdown文件的头部添加文本


    } catch (error) {
        console.error("❎错误： ", error);
    }
}