"use client";

import { useEffect, useRef, useState } from "react";
import { sanitizeArticleHtml } from "../../lib/local-cms";
import styles from "./admin.module.css";

type Command = "bold" | "italic" | "underline" | "justifyLeft" | "justifyCenter" | "justifyRight" | "insertUnorderedList" | "insertOrderedList" | "undo" | "redo";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const [activeFormat, setActiveFormat] = useState("p");

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) editor.innerHTML = value;
    // The editor is remounted for each article. Do not rewrite its DOM while typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sync = () => onChange(sanitizeArticleHtml(editorRef.current?.innerHTML ?? ""));
  const rememberSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) selectionRef.current = selection.getRangeAt(0).cloneRange();
  };
  const restoreSelection = () => {
    editorRef.current?.focus();
    if (selectionRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(selectionRef.current);
    }
  };
  const run = (command: Command) => {
    restoreSelection();
    document.execCommand(command, false);
    sync();
    rememberSelection();
  };
  const formatBlock = (tag: string) => {
    restoreSelection();
    document.execCommand("formatBlock", false, tag);
    setActiveFormat(tag);
    sync();
    rememberSelection();
  };

  return <div className={styles.richEditor}>
    <div className={styles.richToolbar} role="toolbar" aria-label="Article formatting">
      <select aria-label="Text style" value={activeFormat} onChange={(event) => formatBlock(event.target.value)}>
        <option value="p">Paragraph</option><option value="h2">Heading 1</option><option value="h3">Heading 2</option><option value="blockquote">Quote</option>
      </select>
      <span className={styles.toolbarDivider} />
      {([ ["bold", "bi-type-bold", "Bold"], ["italic", "bi-type-italic", "Italic"], ["underline", "bi-type-underline", "Underline"] ] as const).map(([command, icon, label]) => <button key={command} type="button" title={label} aria-label={label} onMouseDown={(event) => event.preventDefault()} onClick={() => run(command)}><i className={`bi ${icon}`} /></button>)}
      <span className={styles.toolbarDivider} />
      {([ ["justifyLeft", "bi-text-left", "Align left"], ["justifyCenter", "bi-text-center", "Align center"], ["justifyRight", "bi-text-right", "Align right"] ] as const).map(([command, icon, label]) => <button key={command} type="button" title={label} aria-label={label} onMouseDown={(event) => event.preventDefault()} onClick={() => run(command)}><i className={`bi ${icon}`} /></button>)}
      <span className={styles.toolbarDivider} />
      {([ ["insertUnorderedList", "bi-list-ul", "Bulleted list"], ["insertOrderedList", "bi-list-ol", "Numbered list"], ["undo", "bi-arrow-counterclockwise", "Undo"], ["redo", "bi-arrow-clockwise", "Redo"] ] as const).map(([command, icon, label]) => <button key={command} type="button" title={label} aria-label={label} onMouseDown={(event) => event.preventDefault()} onClick={() => run(command)}><i className={`bi ${icon}`} /></button>)}
    </div>
    <div ref={editorRef} className={styles.richCanvas} contentEditable suppressContentEditableWarning role="textbox" aria-label="Article body" aria-multiline="true" data-placeholder="Write your article here. Select text to format it..." onInput={() => { sync(); rememberSelection(); }} onBlur={sync} onMouseUp={rememberSelection} onKeyUp={rememberSelection} />
    <div className={styles.richHint}>The article title is the page H1. The toolbar headings become H2 and H3 in the article.</div>
  </div>;
}
