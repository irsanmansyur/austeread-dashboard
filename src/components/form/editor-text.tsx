import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";

export default function EditorText({ textHtml, onChange, height = 200, folder }: { textHtml: string; onChange?(htmlValue: string): void; height?: number; folder: string }) {
  const [html, setHtml] = useState(textHtml);
  const editorRef = useRef();
  const [images, setImages] = useState([]);
  const onEditorChange = (valueHtml: string) => {
    if (onChange) onChange(valueHtml);
  };
  useEffect(() => {
    return () => {};
  }, [folder]);
  const uploadImageHanlder = async (blobInfo: any, progress: any) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());
    formData.append("folder", folder);
    return "";
  };

  return (
    <>
      <Editor
        onInit={(_, editor: any) => (editorRef.current = editor)}
        initialValue={html}
        onEditorChange={onEditorChange}
        init={{
          height,
          menubar: false,
          plugins: ["image", "code"],
          toolbar:
            "undo redo | blocks | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image | code",
          image_list: images,
          images_upload_handler: uploadImageHanlder,
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          image_title: true,
          relative_urls: false,
          image_prepend_url: "http://",
        }}
      />
    </>
  );
}
