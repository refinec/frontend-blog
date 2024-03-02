// @ts-ignore
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
// import { readdir, readFile, writeFile, stat } from "fs/promises";
// @ts-ignore
import {copySync, emptyDirSync, ensureDirSync} from 'fs-extra/esm'
// @ts-ignore
import path from "path";

import { pinyin } from 'pinyin-pro';

const DocsPath = "../docs/docs";
const BlogsPath = "../docs/blogs";

const isDev = process.env.NODE_ENV === 'development';
/**
 * 给markdown文件头部添加 frontmatter
 * @param {string} filePath
 * @param {string} directoryPath
 */
function updateMarkdownFile(filePath: string, directoryPath: string) {
    try {
        const data = readFileSync(filePath, 'utf8');
        // 要检查的短语
        const phraseToCheck = 'categories:';
        // 如果已经存在frontmatter，则不写入
        if (data.includes(phraseToCheck)) {
            return;
        }
        const {name: fileName} = path.parse(filePath);
        const parentDirName = path.basename(path.dirname(filePath));
        const {birthtime: creationTime} = statSync(filePath);

        const relativePath = path.relative(directoryPath, filePath);
        const topLevelDirName = path.dirname(relativePath).split(path.sep)?.[0] || "";
        const newContent = `---
title: ${fileName}
date: ${new Date(creationTime).toLocaleString('zh-cn')}
tags:
 - ${parentDirName}
categories:
 - ${(!topLevelDirName || topLevelDirName === '.') ? '未归类' : topLevelDirName}
---

${data}`;

        writeFileSync(filePath, newContent, 'utf8');
    } catch (err) {
        console.error(`Error updating content for ${filePath}:`, err);
    }
}

/**
 * 递归处理docs目录，给markdown文件头部添加 frontmatter
 * @param {string} directoryPath
 * @param {string} topDirectoryPath
 */
function processDirectory(directoryPath: string, topDirectoryPath: string) {
    try {
        const files = readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const statInfo = statSync(filePath);
            if (statInfo.isDirectory()) {
                processDirectory(filePath, topDirectoryPath);
            } else if (statInfo.isFile() && path.extname(filePath).toLowerCase() === '.md') {
                updateMarkdownFile(filePath, topDirectoryPath);
            }
        }
    } catch (err) {
        console.error(`Error processing directory ${directoryPath}:`, err);
    }
}


/**
 * 把docs目录下的文件复制到blogs目录下
 */
const copyFiles = () => {
    const SrcDir = path.resolve(__dirname, DocsPath);
    const DestDir = path.resolve(__dirname, BlogsPath);
    // 1. 确保目标目录存在，如果不存在则创建
    ensureDirSync(DestDir);
    // 2. 清空目标目录
    emptyDirSync(DestDir);
    // 3.复制源目录到目标目录
    copySync(SrcDir, DestDir);
}

/**
 * 汉字转成拼音
 * @param str 
 * @returns str
 */
const hanziTopinyin = (str: string) => {
    return pinyin(str, { toneType: 'none', separator: '', v: true }) || "";
}
/**
 * 把 markdown 目录结构 转换 为 series 侧边栏目录
 */
const mdTree2Series = () => {
    const temp = [];
    const recursion = (dirPath: string, arr: any[], type: number) => {
        const targetDir = path.resolve(__dirname, decodeURIComponent(dirPath)); // markdown文件存储地址
        const dirs = readdirSync(targetDir, {encoding: 'utf8', withFileTypes: true});
        for (const dir of dirs) {
            const series = {};
            if (dir.isDirectory()) {
                if (['assets'].includes(dir.name)) {
                    continue;
                }
                series["text"] = dir.name;
                series["collapsible"] = false;
                series["children"] = [];
                // recursion(`${dirPath}/${encodeURIComponent(dir.name)}`, series["children"], 2);
                recursion(isDev ? `${dirPath}/${encodeURIComponent(dir.name)}` : `${dirPath}/${dir.name}`, series["children"], 2);
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
                        // link: dirPath.replace(DocsPath, "/docs/docs") + "/" + encodeURIComponent(String(dir.name).replace('.md', '.html'))
                        link: isDev ? (dirPath.replace(DocsPath, "/docs/docs") + "/" + encodeURIComponent(String(dir.name).replace('.md', '.html'))) : hanziTopinyin(dirPath.replace(DocsPath, "/docs/docs") + "/" + String(dir.name).replace('.md', '.html'))
                    }];
                }
                if (type === 2) {
                    // series["link"] = dirPath.replace(DocsPath, "/docs/docs") + "/" + encodeURIComponent(String(dir.name).replace('.md', '.html'));
                    series["link"] = isDev ? (dirPath.replace(DocsPath, "/docs/docs") + "/" + encodeURIComponent(String(dir.name).replace('.md', '.html'))) : hanziTopinyin(dirPath.replace(DocsPath, "/docs/docs") + "/" + String(dir.name).replace('.md', '.html'))
                }
                arr.push(series);
            }
        }
    }
    recursion(DocsPath, temp, 1);
    return temp;
}

export default () => {
    const DocsDir = path.resolve(__dirname, DocsPath);
    processDirectory(DocsDir, DocsDir);
    copyFiles();
    return mdTree2Series();
}

/**
 * 把docs目录下的文件复制到blogs目录下
 */
// export const cpDocs2Blogs = function () {
//     try {
//         // 1. 先清空blogs目录
//         const targetDir = path.resolve(__dirname, BlogsPath);
//         const dirs = readdirSync(targetDir, { encoding: 'utf8', withFileTypes: true });
//         dirs.forEach((fileOrDir: File) => {
//             rm(targetDir + "/" + fileOrDir.name, { force: true, recursive: true }, (error: Error) => {
//                 if (error) throw error;
//             });
//         })
//
//         // 2. 复制docs目录下的文件到blogs
//         const sourceDir = path.resolve(__dirname, DocsPath);
//         cp(sourceDir, targetDir, { preserveTimestamps: true, recursive: true }, (error: Error) => {
//             if (error) throw error;
//         })
//
//         // 3. 给blogs目录下所有markdown文件的头部添加文本
//
//     } catch (error) {
//         console.error("❎错误： ", error);
//     }
// }
