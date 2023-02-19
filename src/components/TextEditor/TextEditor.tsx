import { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon-block";

function TextEditor() {
  return (
    <div className="input bg-white rounded-sm w-full h-full">
      <CKEditor
        editor={BalloonEditor}
        className={"bg-danger btn"}
        data="<p>How good are u?</p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event: any, editor: any) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}

export default TextEditor;
