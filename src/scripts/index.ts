import * as vscode from 'vscode';

/**
 * 处理快捷键事件
 */
export default async (editor: vscode.TextEditor) => {
  const {
    selection: { active }, 
    document: { lineAt },
  } = editor;

  // 获取光标所在行的文本
  const { text, range } = lineAt(active);
  console.log('文本：', text, range.end);

  // 异步需要等待修改编辑器完成
  await editor.edit(async (edit) => {
    edit.insert(range.end, '() {}');
  });

  // 光标定位
  let newPosition = lineAt(active).range.end;
  console.log('new position', newPosition);
  editor.selection = new vscode.Selection(newPosition, newPosition);

};