# vscode-oj-input-picker
テストケース一覧取得＆選択 を行うための拡張機能

## インストール
1. vsixファイル出力
    ```sh
    $ git clone git@github.com:pachicobue/vscode-oj-input-picker.git
    $ npm install
    $ npx vsce package
    ```
2. vscodeで「VSIXからのインストール」をする
3. extensionのフォルダで `npm install` する
    ```sh
    $ cd ~/.vscode-server-insiders/extensions/pachicobue.vscode-oj-input-picker-0.0.1/
    $ npm install
    ```
    - (なんかこれをしないとコマンドが実行できない)
