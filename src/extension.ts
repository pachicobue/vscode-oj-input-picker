import * as vscode from 'vscode';
import { basename, dirname } from 'path';
import { glob } from 'glob';
import { existsSync } from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('oj-testcase-manager.pickTestcase', () => {
        return pickTestcase();
    });
    context.subscriptions.push(disposable);
}

async function pickTestcase() {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        vscode.window.showErrorMessage('No active editor!');
        return;
    }
    const language = editor.document.languageId;
    if (language !== "cpp") {
        vscode.window.showErrorMessage('C++ only supported!');
        return;
    }
    const sourceFile = editor.document.fileName;
    const sourceDir = dirname(sourceFile);
    const basenameNoExt = basename(sourceFile, '.cpp');
    const testcaseDir = `${sourceDir}/${basenameNoExt}_case`;
    if (!existsSync(testcaseDir)) {
        vscode.window.showErrorMessage(`${testcaseDir} not found!`);
        return;
    }
    return new Promise<string[]>((resolve, reject) => {
        glob('*.in', { cwd: testcaseDir }, (err, files) => {
            if (err) {
                vscode.window.showErrorMessage('Error during collecting testcase!');
                return reject(err);
            }
            resolve(files);
        });
    }).then((files) => {
        return vscode.window.showQuickPick(files);
    }).then((testCase) => {
        return testCase;
    });
}

// This method is called when your extension is deactivated
export function deactivate() { }
