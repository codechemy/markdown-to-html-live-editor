import { useState, useEffect, useCallback, useMemo } from "react";
import io from "socket.io-client";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./App.css";

const socket = io("http://localhost:3001");

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [showRawHTML, setShowRawHTML] = useState(false);

  const handleHtmlUpdate = useCallback((data) => {
    setHtml(data.html);
  }, []);

  useEffect(() => {
    socket.on("html", handleHtmlUpdate);

    return () => {
      socket.off("html", handleHtmlUpdate);
      socket.disconnect();
    };
  }, [handleHtmlUpdate]);

  const handleInputChange = useCallback((event) => {
    const newMarkdown = event.target.value;
    setMarkdown(newMarkdown);

    // Emit Markdown changes to the server
    socket.emit("markdown", { markdown: newMarkdown });
  }, []);

  const handleReset = useCallback(() => {
    setMarkdown("");
  }, []);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
      alert("HTML copied to clipboard.");
    } catch (err) {
      console.error("Unable to copy text to clipboard.", err);
    }
  }, [html]);

  const handleShowRawHTML = useCallback(() => {
    setShowRawHTML((prev) => !prev);
  }, []);

  const previewButtonsClass = useMemo(() => `preview--buttons ${!html && "hidden"}`, [html]);

  return (
    <div className="mdml--container">
      <h2 id="mdml">MarkDown to HTML editor (MDML)</h2>
      <div className="mdml--wrapper">
        <section className="mdml--textarea__container">
          <textarea
            value={markdown}
            className="mdml--textarea"
            onChange={handleInputChange}
            placeholder="Type your Markdown here..."
          />
          <button className="mdml--button" onClick={handleReset}>
            Reset
          </button>
        </section>
        <section className="mdml--preview__container">
          {showRawHTML ? (
            <div className="mdml--preview">
              <SyntaxHighlighter customStyle={{background:"transparent"}} language="html" style={docco}>
                {html}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div
              className="mdml--preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
          <section className={previewButtonsClass}>
            <button className="mdml--button" onClick={handleCopyToClipboard}>
              Copy HTML
            </button>
            <button className="mdml--button" onClick={handleShowRawHTML}>
              {showRawHTML ? "Show parsed HTML" : "Show raw HTML"}
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default App;
