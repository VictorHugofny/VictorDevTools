import React, { useState } from "react";
import csv from "csvtojson";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactJson from 'react-json-view';

function CSVUploader() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [isFileActive, setIsFileActive] = useState(false);
  const [arquivoInserido, setArquivoInserido] = useState(false);
  const [separator, setSeparator] = useState(",");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    alert("JSON copiado para a área de transferência!");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setIsFileActive(!!selectedFile);
    setArquivoInserido(!!selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo CSV.");
      return;
    }

    try {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const csvContent = e.target.result;
        const json = await csv({ delimiter: separator }).fromString(csvContent);
        setJsonData(json);
        console.log("JSON convertido:", json);
      };

      fileReader.readAsText(file);
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      alert("Ocorreu um erro ao processar o arquivo.");
    }
  };

  const downloadJsonFile = () => {
    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = window.URL.createObjectURL(jsonBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-4">
      <h1>Conversor de CSV para JSON</h1>

      <div className="arquivo">
        <icon><h4>Envie um arquivo (📂) CSV formatado corretamente em UTF-8.</h4></icon>
        <input
          type="file"
          className="form-control"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>

      {arquivoInserido && (
        <div>
          <br></br>
          <label>
            Separador:
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="form-select"
            >
              <option value=",">Vírgula (,)</option>
              <option value=";">Ponto e vírgula (;)</option>
            </select>
          </label>
          
          <button
            className="converter btn btn-primary mt-2"
            onClick={handleUpload}
            disabled={!isFileActive}
          >
            Converter CSV para JSON
          </button>
        </div>
      )}

      {jsonData && (
        <div className="resultado">
          
          <div className="result">
            <h3>JSON Resultante:</h3>
            <div className="result">
            <button className="baixarJson" onClick={downloadJsonFile}>
              Baixar JSON em UTF-8
            </button>
            <button onClick={copyToClipboard}>
              Copiar Texto
            </button>
          </div>
            <ReactJson src={jsonData} theme="monokai" collapsed={false} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CSVUploader;
