import React, { useState } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    const uppercaseChars = lowercaseChars.toUpperCase();

    let characterPool = lowercaseChars;

    if (includeNumbers) characterPool += numbers;
    if (includeSpecialChars) characterPool += specialChars;
    if (includeUppercase) characterPool += uppercaseChars;

    if (characterPool.length === 0) {
      alert("Selecione pelo menos uma opção para gerar a senha.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Senha copiada para a área de transferência!");
  };

  return (
    <div className="password-generator">
      <h1>Gerador de Senhas Aleatórias</h1>

      <div className="settings">
        <label>
          Tamanho da Senha:
          <input
            type="number"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Incluir Números
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
          />
          Incluir Caracteres Especiais
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Incluir Letras Maiúsculas
        </label>
      </div>

      <button onClick={generatePassword}>Gerar Senha</button>

      {password && (
        <div className="password-display">
          <input type="text" value={password} readOnly />
          <button onClick={copyToClipboard}>Copiar</button>
        </div>
      )}
    </div>
  );
}

export default PasswordGenerator;
