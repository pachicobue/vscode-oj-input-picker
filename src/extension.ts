import * as vscode from 'vscode';
import { glob } from 'glob';
import { basename, dirname } from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('oj-testcase-manager.pickTestcase',
        () => pickTestcase()
    ));
}

async function getTestcaseList(testcaseDir: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        glob('*.in', { cwd: testcaseDir }, (err, files) => {
            if (err) { return reject(err); }
            resolve(files);
        });
    });
}

async function pickTestcase(): Promise<string | undefined> {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined || editor.document.languageId !== 'cpp') { return undefined; }
    const sourceName = editor.document.fileName;
    const basenameNoExt = basename(sourceName, '.cpp');
    const dirName = dirname(sourceName);
    const testcaseDir = `${dirName}/${basenameNoExt}_case`;
    console.log(sourceName, basenameNoExt, dirName, testcaseDir);
    return getTestcaseList(testcaseDir).then((files) => vscode.window.showQuickPick(files));
}

// This method is called when your extension is deactivated
export function deactivate() { }
